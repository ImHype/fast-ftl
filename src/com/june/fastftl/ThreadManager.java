package com.june.fastftl;

import com.june.fastftl.impl.Render;
import com.june.fastftl.model.Result;

import java.io.*;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * ThreadManager
 *
 * @author ziyuan
 * @since 2017-03-28
 */
public enum ThreadManager {

    INSTANCE;

    private final ThreadFactory threadFactory = new ThreadFactory() {

        private AtomicInteger index = new AtomicInteger(1);

        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r, "RenderThread --" + index.getAndIncrement());
            return t;
        }
    };

    private static final int CORE_SIZE = 5;

    private final ExecutorService pool = Executors.newFixedThreadPool(CORE_SIZE, threadFactory);

    public void submit(Runnable r) {
        pool.submit(r);
    }

    public void shutDown() {
        pool.shutdown();
    }

    public static class AsyncTask implements Runnable {

        private final Socket client;

        private final Render render;

        public AsyncTask(Socket client, Render render) {
            this.client = client;
            this.render = render;
        }

        @Override
        public void run() {
            InputStreamReader inSR = null;
            OutputStreamWriter outSW = null;

            try {
                inSR = new InputStreamReader(client.getInputStream(), "UTF-8");
                BufferedReader br = new BufferedReader(inSR);

                outSW = new OutputStreamWriter(client.getOutputStream(), "UTF-8");
                BufferedWriter bw = new BufferedWriter(outSW);

                String msg;

                while ((msg = br.readLine()) != null) {
                    msg = msg.trim();

                    Result result = Render.resolve(msg, render);
                    String returnValue = result.toString();
                    bw.write(returnValue + " \r\n");
                    bw.flush();
                }
            } catch (Exception e) {
                //ignore
            } finally {
                assert inSR != null;
                assert outSW != null;
                try {
                    inSR.close();
                    outSW.close();
                    client.close();
                } catch (IOException e) {
                    //ignore
                }
            }
        }
    }
}

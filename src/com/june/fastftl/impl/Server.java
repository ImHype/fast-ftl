package com.june.fastftl.impl;

import com.june.fastftl.ThreadManager;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * Created by june on 2017/1/22.
 */
@SuppressWarnings("InfiniteLoopStatement")
public class Server {

    private final Render render;

    private final int port;

    public Server(int port, Render render) {
        this.render = render;
        this.port = port;
    }

    public void start() throws Exception {
        ServerSocket serverSocket;

        try {
            serverSocket = new ServerSocket(port, 5);
        } catch (UnknownHostException e) {
            throw new Exception("[I] UnknownHostException is in used!");
        } catch (IOException e) {
            throw new Exception("[I] Port is in used!");
        }

        while (true) {
            Socket client = serverSocket.accept();
            ThreadManager.INSTANCE.submit(new ThreadManager.AsyncTask(client, render));
        }
    }
}

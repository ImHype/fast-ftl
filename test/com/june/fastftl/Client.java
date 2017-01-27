package com.june.fastftl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

/**
 * Created by june on 2017/1/22.
 */
public class Client {
    public Client() {

    }
    public void request(int port, String msg) {
        try {
            Socket socket = new Socket("127.0.0.1", port);
            socket.setSoTimeout(60000);

            PrintWriter printWriter = new PrintWriter(socket.getOutputStream(),true);
            printWriter.println(msg);
            printWriter.flush();

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String result = bufferedReader.readLine();
            System.out.println("Server say : " + result);

            printWriter.close();
            bufferedReader.close();
            socket.close();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}

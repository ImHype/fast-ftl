package com.june.fastftl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Objects;

/**
 * Created by june on 2017/1/22.
 */
public class Server {
    public Server(int port, Render render) {
        try {
            ServerSocket serverSocket = new ServerSocket(port);

            while (true) {
                Socket _socket = serverSocket.accept();

                BufferedReader _bufferedReader = new BufferedReader(new InputStreamReader(_socket.getInputStream()));
                String _message = _bufferedReader.readLine();

//                HashMap<String, HashMap> source =

                String _html = render.render(_message, "");
                PrintWriter printWriter = new PrintWriter(_socket.getOutputStream());

                printWriter.print(_html);
                printWriter.flush();

                printWriter.close();
                _bufferedReader.close();
                _socket.close();
            }

        } catch (Exception e) {
            System.out.println("Exception:" + e);
        } finally {

        }
    }
}

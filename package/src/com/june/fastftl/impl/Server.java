package com.june.fastftl.impl;

import com.june.fastftl.model.Result;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;



/**
 * Created by june on 2017/1/22.
 */
public class Server {

    public Server(int port, Render render) {
        while (true) {
            try {
                ServerSocket serverSocket = new ServerSocket(port);
                Socket _socket = serverSocket.accept();
                PrintWriter _printWriter = new PrintWriter(_socket.getOutputStream());
                BufferedReader _bufferedReader = new BufferedReader(new InputStreamReader(_socket.getInputStream()));

                String _tpl = _bufferedReader.readLine();
                Result _result = render.render(_tpl);

                _printWriter.print(_result.toString());
                _printWriter.flush();
                _printWriter.close();
                _bufferedReader.close();
                _socket.close();
            } catch (Exception e) {
                System.out.println("Exception:" + e);
            }
        }
    }
}

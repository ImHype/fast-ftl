package com.june.fastftl.impl;

import com.june.fastftl.model.Result;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Created by june on 2017/1/22.
 */
@SuppressWarnings("InfiniteLoopStatement")
public class Server {

    @SuppressWarnings("unchecked")
    public Server(int port, Render render) throws Exception {
        ServerSocket serverSocket;

        try {
            serverSocket = new ServerSocket(port);

        } catch (IOException e) {
            throw new Exception("[I] Port is in used!");
        }

        while (true) {
            Socket socket = serverSocket.accept();
            OutputStream outputStream = socket.getOutputStream();
            PrintWriter printWriter = new PrintWriter(outputStream);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            String msg = bufferedReader.readLine();

            Result result = this.resolve(msg, render);
            String _returnValue = result.toString();
            printWriter.write(_returnValue);

            try {
                printWriter.flush();
                bufferedReader.close();
                printWriter.close();
                socket.close();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

    @SuppressWarnings("unchecked")
    private Result resolve(String _msg, Render render) {
        Result result = new Result("");
        result.setError("");
        Map<String, Object> jsonObject;

        JSONParser jsonParser = new JSONParser();

        try {
            jsonObject = (Map<String, Object>) jsonParser.parse(_msg);
        } catch (ParseException e) {
            return reject(e.toString());
        }

        String template = String.valueOf(jsonObject.get("template"));

        Map<String, Object> mockData;
        try {
            mockData = (Map<String, Object>) jsonObject.get("data");
            if (mockData != null)
                result = render.render(template, mockData);
            else
                throw new Exception("[I] No Mock Data");
        } catch (Exception e) {
            result = render.render(template);
        }

        return result;
    }

    public Result reject (String msg){
        Result result = new Result("");
        result.setError(msg);
        return result;
    }
}

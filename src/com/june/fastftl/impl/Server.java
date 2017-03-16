package com.june.fastftl.impl;

import com.june.fastftl.model.Result;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;
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
            serverSocket = new ServerSocket(port, 5);
        } catch (UnknownHostException e) {
            throw new Exception("[I] UnknownHostException is in used!");
        } catch (IOException e) {
            throw new Exception("[I] Port is in used!");
        }

        while (true) {

            Socket client = serverSocket.accept();

            InputStreamReader inSR = null;
            OutputStreamWriter outSW = null;

            try {
                inSR = new InputStreamReader(client.getInputStream(), "UTF-8");
                BufferedReader br = new BufferedReader(inSR);

                outSW = new OutputStreamWriter(client.getOutputStream(), "UTF-8");
                BufferedWriter bw = new BufferedWriter(outSW);

                String msg = "";

                while ((msg = br.readLine()) != null) {
                    msg = msg.trim();

                    Result result = this.resolve(msg, render);
                    String returnValue = result.toString();
                    bw.write(returnValue + " \r\n");
                    bw.flush();
                }
            } finally {
                assert inSR != null;
                inSR.close();

                assert outSW != null;
                outSW.close();
                client.close();
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

    public Result reject(String msg) {
        Result result = new Result("");
        result.setError(msg);
        return result;
    }
}

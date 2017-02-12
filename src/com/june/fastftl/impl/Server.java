package com.june.fastftl.impl;

import com.june.fastftl.model.Result;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
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
        ServerSocket _serverSocket;

        try {
            _serverSocket = new ServerSocket(port);

        } catch (IOException e) {
            throw new Exception("[I] Port is in used!");
        }

        while (true) {
            Socket _socket = _serverSocket.accept();

            PrintWriter _printWriter = new PrintWriter(_socket.getOutputStream());
            BufferedReader _bufferedReader = new BufferedReader(new InputStreamReader(_socket.getInputStream()));

            String _msg = _bufferedReader.readLine();

            Result _result = this.resolve(_msg, render);
            String _returnValue = _result.toString();
            _printWriter.write(_returnValue);

            try {
                _printWriter.flush();
                _bufferedReader.close();
                _printWriter.close();
                _socket.close();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

    @SuppressWarnings("unchecked")
    private Result resolve(String _msg, Render render) throws Exception {
        Result _result;
        Map<String, Object> _jsonObject;

        JSONParser jsonParser = new JSONParser();

        try {
            _jsonObject = (Map<String, Object>) jsonParser.parse(_msg);
        } catch (ParseException e) {
            throw new Exception("[I] JSON Parsed Error!");
        }

        String _template = String.valueOf(_jsonObject.get("template"));

        Map<String, Object> _mockData;
        try {
            _mockData = (Map<String, Object>) _jsonObject.get("data");
            if (_mockData != null)
                _result = render.render(_template, _mockData);
            else
                throw new Exception("[I] No Mock Data");
        } catch (Exception e) {
            _result = render.render(_template);
        }

        return _result;
    }
}

package com.june.fastftl.model;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.Map;

/**
 * Created by june on 2017/1/23.
 */
public class Config {

    // 端口
    private int port;

    // 根路径
    private String root;

    // 默认 encoding
    private String defaultEncoding = "utf-8";

    // URLEscapingCharset
    private String URLEscapingCharset = "utf-8";

    // 数字格式化方式
    private String numberFormat = "0.##########";


    public Config(String[] args) throws Exception {
        String msg = args[0];
        JSONParser jsonParser = new JSONParser();
        Map<String, Object> jsonObject = null;
        try {
            jsonObject = (Map<String, Object>) jsonParser.parse(msg);
            configSet(jsonObject);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    private void configSet(Map jsonObject) {
        long port = (Long) jsonObject.get("port");
        setPort((int) port);
        setRoot((String) jsonObject.get("root"));

        if (jsonObject.get("defaultEncoding") != null) {
            setDefaultEncoding((String) jsonObject.get("defaultEncoding"));
        }

        if (jsonObject.get("URLEscapingCharset") != null) {
            setURLEscapingCharset((String) jsonObject.get("urlEscapingCharsetSet"));
        }

        if (jsonObject.get("numberFormat") != null) {
            setNumberFormat((String) jsonObject.get("numberFormat"));
        }
    }


    public int getPort() {
        return port;
    }

    private void setPort(int port) {
        this.port = port;
    }

    public String getRoot() {
        return root;
    }

    private void setRoot(String root) {
        this.root = root;
    }

    public String getDefaultEncoding() {
        return defaultEncoding;
    }

    private void setDefaultEncoding(String defaultEncoding) {
        this.defaultEncoding = defaultEncoding;
    }

    public String getURLEscapingCharset() {
        return URLEscapingCharset;
    }

    private void setURLEscapingCharset(String URLEscapingCharset) {
        this.URLEscapingCharset = URLEscapingCharset;
    }

    public String getNumberFormat() {
        return numberFormat;
    }

    private void setNumberFormat(String numberFormat) {
        this.numberFormat = numberFormat;
    }
}
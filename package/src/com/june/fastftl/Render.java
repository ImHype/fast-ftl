package com.june.fastftl;
import java.io.*;
import java.util.*;
import freemarker.template.*;

/**
 * Created by june on 2017/1/22.
 */
public class Render {
    private String root;
    private Configuration _config;

    public Render (String root) {
        _config = new Configuration(Configuration.VERSION_2_3_0);
        try {
            _config.setDirectoryForTemplateLoading(new File(root));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String render (String template, String mockDataString) {
        Map<String, String> mockData = new HashMap<String, String>();
        mockData.put("user", "Jack");

        StringWriter sw = new StringWriter();

        try {

            Template t = _config.getTemplate(template);
            t.process(mockData, sw);
            return sw.toString();

        } catch (IOException | TemplateException e) {
            e.printStackTrace();
        }

        return "";
    }
}

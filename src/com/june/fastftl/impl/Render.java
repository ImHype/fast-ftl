package com.june.fastftl.impl;

import java.io.*;
import java.util.*;

import com.june.fastftl.model.Result;
import com.june.fastftl.service.RenderService;
import freemarker.template.*;

/**
 * Created by june on 2017/1/22.
 */
public class Render implements RenderService {
    private Configuration _config;

    public Render(String root) {
        _config = new Configuration(Configuration.VERSION_2_3_0);
        try {
            _config.setDirectoryForTemplateLoading(new File(root));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Result render(String template, Map mockData) {
        Result result = new Result(template);
        HashMap emptyMap = new HashMap();
        StringWriter sw = new StringWriter();

        try {
            Template t = _config.getTemplate(template, "utf-8");
            t.process((mockData != null) ? mockData : emptyMap, sw);
            result.setContent(sw.toString());
        } catch (Exception e) {
            result.setError(e.toString());
        }

        return result;
    }

    public Result render(String template) {
        return this.render(template, null);
    }
}

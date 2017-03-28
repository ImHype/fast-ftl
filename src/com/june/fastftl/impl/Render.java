package com.june.fastftl.impl;

import com.june.fastftl.model.Result;
import freemarker.cache.FileTemplateLoader;
import freemarker.cache.MultiTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by june on 2017/1/22.
 */

public final class Render {

    private Configuration config;

    /**
     * 分隔符 ","
     *
     * @param root
     * @throws IOException
     */
    public Render(String root) {
        config = new Configuration(Configuration.VERSION_2_3_0);
        config.setDefaultEncoding("utf-8");

        List<TemplateLoader> loaders = new ArrayList<TemplateLoader>();

        try {
            String[] list = root.split(",");

            for (String dir : list) {
                loaders.add(new FileTemplateLoader(new File(dir)));
            }

            MultiTemplateLoader multiTemplateLoader = new MultiTemplateLoader(
                    loaders.toArray(
                            new TemplateLoader[loaders.size()]
                    )
            );
            config.setTemplateLoader(multiTemplateLoader);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Result render(String template, Map mockData) {
        Result result = new Result(template);
        HashMap emptyMap = new HashMap();
        StringWriter sw = new StringWriter();

        try {
            Template t = config.getTemplate(template, "utf-8");
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

    @SuppressWarnings("unchecked")
    public static Result resolve(String msg, Render render) {
        Result result = new Result("");
        result.setError("");
        Map<String, Object> jsonObject;

        JSONParser jsonParser = new JSONParser();

        try {
            jsonObject = (Map<String, Object>) jsonParser.parse(msg);
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

    public static Result reject(String msg) {
        Result result = new Result("");
        result.setError(msg);
        return result;
    }
}

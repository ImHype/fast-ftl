package com.june.fastftl.impl;

import com.june.fastftl.model.Config;
import com.june.fastftl.model.Result;
import com.june.fastftl.service.RenderService;
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
import java.util.*;

/**
 * Created by june on 2017/1/22.
 */

public final class Render implements RenderService {

    private Configuration config;

    public Render(Config cfg) {
        config = new Configuration(Configuration.VERSION_2_3_0);
        config.setDefaultEncoding(cfg.getDefaultEncoding());
        config.setNumberFormat(cfg.getNumberFormat());
        config.setURLEscapingCharset(cfg.getURLEscapingCharset());
        config.setTemplateUpdateDelayMilliseconds(cfg.getTemplateUpdateDelayMilliseconds());
        config.setTemplateLoader(this.getTemplateLoader(cfg.getRoot()));
    }

    /**
     * @param root
     * @throws IOException
     * @return
     */
    private MultiTemplateLoader getTemplateLoader(String root) {
        List<TemplateLoader> loaders = new ArrayList<TemplateLoader>();
        String[] list = root.split(",");

        for (String dir : list) {
            try {
                loaders.add(new FileTemplateLoader(new File(dir)));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return new MultiTemplateLoader(
                loaders.toArray(
                        new TemplateLoader[loaders.size()]
                )
        );
    }

    @Override
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

    @Override
    public Result render(String template) {
        return this.render(template, null);
    }

    @SuppressWarnings("unchecked")
    public static Result resolve(String msg, Render render) {
        JSONParser jsonParser = new JSONParser();
        Result result;
        Map<String, Object> jsonObject;
        String signture;
        String template;
        Map<String, Object> mockData;

        try {
            jsonObject = (Map<String, Object>) jsonParser.parse(msg);
        } catch (ParseException e) {
            return reject(e.toString());
        }

        template = String.valueOf(jsonObject.get("template"));

        try {
            mockData = (Map<String, Object>) jsonObject.get("data");
            if (mockData == null)
                throw new Exception("Missing render data");
            else
                result = render.render(template, mockData);
        } catch (Exception e) {
            result = render.render(template);
        }

        signture = String.valueOf(jsonObject.get("signture"));

        if (signture == null) {
            result.setError("Missing signture");
            return result;
        }

        result.setSignture(signture);
        return result;
    }

    private static Result reject(String msg) {
        Result result = new Result();
        result.setError(msg);
        return result;
    }
}

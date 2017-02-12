package com.june.fastftl.impl;

import java.io.*;
import java.util.*;

import com.june.fastftl.model.Result;
import com.june.fastftl.service.RenderService;
import freemarker.cache.FileTemplateLoader;
import freemarker.cache.MultiTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.*;

/**
 * Created by june on 2017/1/22.
 */

public class Render implements RenderService {
    private Configuration _config;

    /**
     * 分隔符 ","
     *
     * @param root
     * @throws IOException
     */
    public Render(String root) {
        _config = new Configuration(Configuration.VERSION_2_3_0);
        List<TemplateLoader> _loaders = new ArrayList<TemplateLoader>();

        try {
            String[] list = root.split(",");

            for (String dir : list) {
                _loaders.add(new FileTemplateLoader(new File(dir)));
            }

            MultiTemplateLoader multiTemplateLoader = new MultiTemplateLoader(
                    _loaders.toArray(
                            new TemplateLoader[_loaders.size()]
                    )
            );
            _config.setTemplateLoader(multiTemplateLoader);
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

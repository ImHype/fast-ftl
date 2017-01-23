package com.june.fastftl.model;
import com.alibaba.fastjson.JSON;

/**
 * Created by june on 2017/1/23.
 */
public class Result {
    private String error;
    private String content;


    private String template;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public String getTemplate() {
        return template;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}

package com.june.fastftl.model;
import com.alibaba.fastjson.JSON;

/**
 * Created by june on 2017/1/23.
 */
public class Result {
    private String error;
    private String content;
    private String template;
    private String signture;

    public String getSignture() {
        return signture;
    }

    public void setSignture(String signture) {
        this.signture = signture;
    }

    public Result (String template) {
        this.setTemplate(template);
    }

    public Result () {
        this.setTemplate("");
    }

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

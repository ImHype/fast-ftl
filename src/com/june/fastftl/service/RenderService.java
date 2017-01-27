package com.june.fastftl.service;

import com.june.fastftl.model.Result;
import org.json.simple.JSONObject;

import java.util.Map;

/**
 * Created by june on 2017/1/23.
 */
public interface RenderService {
    public Result render (String template, Map mockData);
}

package com.june.fastftl.service;

import com.june.fastftl.impl.Render;
import com.june.fastftl.model.Result;

import java.util.Map;

/**
 * Created by junyu on 2017/5/18.
 */
public interface RenderService {
    Result render(String template, Map mockData);
    Result render(String template);
}

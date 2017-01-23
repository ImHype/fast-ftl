package com.june.fastftl;

import com.june.fastftl.Main;

/**
 * Created by june on 2017/1/23.
 */
public class MainTest {
    public static void main(String[] args){
        String[] arg = new String[1];
        arg[0] = "/Users/june/Desktop/Projects/kaola/haitaowap/src/main/webapp/WEB-INF/template";

        try {
            Main.main(arg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

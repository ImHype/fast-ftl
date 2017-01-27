package com.june.fastftl;

import com.june.fastftl.model.Config;
import com.june.fastftl.impl.Render;
import com.june.fastftl.impl.Server;

/**
 * Created by june on 2017/1/22.
 */


public class Main {
    public Main () {}

    public static void main (String[] args) throws Exception {
        Config config = new Config(args);

        Render render = new Render(config.getRoot());

        System.out.println("[D] built in " + config.getPort());

        new Server(config.getPort(), render);
    }
}

package com.june.fastftl.model;

/**
 * Created by june on 2017/1/23.
 */
public class Config {
    private int port;
    private String root;

    public int getPort() {
        return port;
    }

    private void setPort(int port) {
        this.port = port;
    }

    public String getRoot() {
        return root;
    }

    private void setRoot(String root) {
        this.root = root;
    }

    public Config(String[] args) throws Exception {
        switch (args.length) {
            case 0:
                throw new Exception("Firt argument must need. it's your root");
            case 1:
                throw new Exception("Second argument must need. it's your port");
            default:
                this.setRoot(args[0]);
                this.setPort(Integer.valueOf(args[1]));
        }
    }
}
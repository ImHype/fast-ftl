/**
 * Created by june on 2017/1/23.
 */
"use strict";
var path = require('path');
var expect = require('chai').expect;
var {Render} = require('../dist/index');
var fastFtl = Render({
    root: __dirname, // 根路径
    defaultEncoding: "utf-8", // 默认 encoding
    URLEscapingCharset: "utf-8", // URLEscapingCharset
    numberFormat: "0.##########" // 数字格式化方式
});

describe('parse', function () {
    it('相对路径 parse', function (done) {
        fastFtl.parse('test.ftl', {
            name: "Jack"
        }).then(data => {
            expect(/你好, Jack/g.test(data)).to.be.equal(!!1);
            done();
        }).catch(e => {
            done(e);
        });
    });

    it('绝对路径 parse', function (done) {
        fastFtl.parse(path.join(__dirname, 'test.ftl'), {
            name: "Jack"
        }).then(data => {
            expect(/你好, Jack/g.test(data)).to.be.equal(!!1);
            done();
        }).catch(e => {
            done(e);
        });
    });
});
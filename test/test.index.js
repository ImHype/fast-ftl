/**
 * Created by june on 2017/1/23.
 */
"use strict";
var expect = require('chai').expect;
var FastFTL = require('../dist/index').default;
var fastFtl = FastFTL({
    root: __dirname
});

describe('parse', function () {
    it('parse', function (done) {
        fastFtl.parse('test.ftl', {
            name: "Jack"
        }).then(data => {
            expect(/你好, Jack/g.test(data.content)).to.be.equal(!!1);
            done();
        }).catch(e => {
            done(e);
        });
    });
});
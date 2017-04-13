/**
 * Created by june on 2017/1/23.
 */
"use strict";
var expect = require('chai').expect;
var util = require('../lib/util');

describe('util', function () {
    describe('#findPorts', function () {
        it('should be two ports', function (done) {
            util.findPorts().then(function (ports) {
                expect(ports.length).to.be.equal(2);
                done();
            });
        });
    });


    describe('#findPortExclude', function () {
        it('should be one port and exclude 8000', function (done) {
            util.findPortExclude(8000).then(function (port) {
                expect(port !== 8000).to.be.equal(true);
                done();
            });
        });
    });

});
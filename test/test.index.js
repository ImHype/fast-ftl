/**
 * Created by june on 2017/1/23.
 */
"use strict";
var FastFTL = require('../dist/index').default;
var fastFtl = FastFTL({
    root: __dirname
});
fastFtl.parse('test.ftl', {
    YourName: "Jack"
}).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e)
});

fastFtl.parse('test.ftl', {
    YourName: "June"
}).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e)
});
/**
 * Created by june on 2017/1/23.
 */
"use strict";
var Index = require('../dist/index').default;

var index = Index({});

setTimeout(()=>{
    index.parse('test.ftl')
        .then(data => {
            console.log(data);
        });
}, 1000)
/**
 * Created by june on 2017/1/23.
 */
"use strict";
var Index = require('../dist/index').default;

var index = Index({
    root: "/Users/june/Desktop/Projects/kaola/haitaowap/src/main/webapp/WEB-INF/template/"
});

index.parse('test.ftl', {
    a: "1"
})
    .then(data => {
        console.log(data);
    });
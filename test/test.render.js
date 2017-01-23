/**
 * Created by june on 2017/1/23.
 */
"use strict";
var Render = require('../dist/Render').default;
var render = new Render();


render
    .parse('test.ftl')
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log(e);
    });
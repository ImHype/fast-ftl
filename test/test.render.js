/**
 * Created by june on 2017/1/23.
 */
"use strict";
var Render = require(`..\\dist\\Render`).default;
var render = new Render({port: 8005});

render
    .parse('test.ftl', {
        name: "均与"
    })
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log(e);
    });

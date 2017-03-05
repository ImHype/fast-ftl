/**
 * Created by june on 2017/1/23.
 */
"use strict";
// var rRender = require(`C:\\Users\\hzxujunyu\\AppData\\Roaming\\npm\\node_modules\\foxman\\node_modules\\fast-ftl\\dist\\Render`).default;
var Render = require(`..\\dist\\Render`).default;
// var rrender = new rRender({port: 8005});
var render = new Render({port: 8005});


// render
//     .parse('test.ftl', {
//         name: "均与"
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(e => {
//         console.log(e);
//     });
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

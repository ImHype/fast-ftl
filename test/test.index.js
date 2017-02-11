/**
 * Created by june on 2017/1/23.
 */
"use strict";
var Index = require('../dist/index').default;

var index = Index({
    root: __dirname
});

setTimeout(function () {
  index.parse('test.ftl', {
      YourName: "Jack"
  }).then(data => {
      console.log(data);
  }).catch(e => {
      console.log(e)
  });
}, 500);

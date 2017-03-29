# Fast-FTL

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

The Freemaker parsing service in Node.js

[中文 README](./README-zh_CN.md)

## Process
![](http://note.youdao.com/yws/public/resource/e9a827d44244bc8b89eeb9bb0d3f9c3c/xmlnote/2B03796BC2624CA18FD89F593D67D36F/11721)

## How to use
```bash
npm i fast-ftl -S
```
#### Step 1 - Import 
##### 1. Import in es2015+
```javascript
import Render from "fast-ftl";
```

##### 2. Require in CommonJS
```javascript
const {Render} = require("fast-ftl");
```
or
```javascript
var Render = require("fast-ftl").Render;
```

#### Step 2 - Init Fast-FTL
```javascript
var render = Render({
    root: path.join(__dirname, 'pages'), 
    paths: [
        path.join(__dirname, 'common')
    ], // Support MultiTemplateLoader
    defaultEncoding: "utf-8", 	 // 默认 encoding
    urlEscapingCharsetSet: "utf-8", // URLEscapingCharset
    numberFormat: "0.##########" // 数字格式化方式
});
```

| property | Fast-FTL | Spring | defaultValue
| ------| ------ | ------ | ------ |
| defaultEncoding | defaultEncoding | default_encoding | utf-8 |
| urlEscapingCharsetSet | urlEscapingCharsetSet | url_escaping_charset | utf-8 |
| numberFormat | numberFormat | number_format | 0.########## |

#### Step 3 - Parse file
```javascript
render.parse("test.ftl", {
    YourName: "Jack"
}).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e)
});
```
## Features
1. Fast: use Socket to invoke Java Freemarker Parser, not in Teminal.
2. Support MultiTemplate Directory.
3. Simple API, base on Promise.

## LICENSE
[![license][license-image]][license-url]


[npm-url]: https://npmjs.org/package/fast-ftl
[npm-image]: https://img.shields.io/npm/v/fast-ftl.svg
[license-url]: https://github.com/ImHype/Fast-FTL/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/imhype/Fast-FTL.svg
[travis-image]: https://travis-ci.org/ImHype/Fast-FTL.svg?branch=master
[travis-url]: https://travis-ci.org/ImHype/Fast-FTL

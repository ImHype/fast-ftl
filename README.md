# Fast-FTL

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

The Freemaker parsing service in Node.js

[中文 README](./README-zh_CN.md)

## How to use
```bash
npm i fast-ftl --save
```
#### Step 1 - Import 
##### 1. Import in es2015+
```javascript
import FastFTL from "fast-ftl";
```

##### 2. Require in CommonJS
```javascript
var FastFTL = require("fast-ftl").default;
```

#### Step 2 - Init Fast-FTL
```javascript
var fastFtl = FastFTL({
    root: [__dirname, `${__dirname}/pages`] // Support MultiTemplateLoader
});
```

#### Step 3 - Parse file
```javascript
fastFtl.parse("test.ftl", {
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

# Fast-FTL

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

基于 Socket 服务的 Freemarker 解析器

## 过程原理图
![](http://note.youdao.com/yws/public/resource/e9a827d44244bc8b89eeb9bb0d3f9c3c/xmlnote/2B03796BC2624CA18FD89F593D67D36F/11721)

## 如何开始？
```bash
npm i fast-ftl -S
```
### 第 1 步、引入 
#### 1. es2015+ 中引入
```javascript
import Render from "fast-ftl";
```

#### 2. CommonJS 中引入
```javascript
const {Render} = require("fast-ftl");
```
或者
```javascript
var Render = require("fast-ftl").Render;
```


#### 第 2 步、初始化
```javascript
var render = Render({
    root: path.join(__dirname, 'pages'), 
    paths: [
        path.join(__dirname, 'common') 
    ]  // 支持多 root 解析，传入 数组即可, 排在前面的会优先查找
});
```

#### 第 3 步、调用
```javascript
render.parse("test.ftl", {
    YourName: "Jack"
}).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e)
});
```

## 特色
1. 调用快，因为 `Fast-FTL` 通知 `Java` 解析是通过 `Socket` 通信的；而非使用命令行，需要经过 `Terminal` 调用，且每次只F初始化一遍 `Java` 对象
2. 支持多 `root template directory` 的设定，排在前面的 `path` 会优先查找
3. API 简易，基于 `Promise`，文件**encoding** 只支持 `utf-8` 

## LICENSE
[![license][license-image]][license-url]


[npm-url]: https://npmjs.org/package/fast-ftl
[npm-image]: https://img.shields.io/npm/v/fast-ftl.svg
[license-url]: https://github.com/ImHype/Fast-FTL/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/imhype/Fast-FTL.svg
[travis-image]: https://travis-ci.org/ImHype/Fast-FTL.svg?branch=master
[travis-url]: https://travis-ci.org/ImHype/Fast-FTL

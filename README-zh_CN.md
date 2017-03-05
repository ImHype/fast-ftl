# Fast-FTL

[![NPM version][npm-image]][npm-url]

> 基于 Socket 服务的 Freemarker 解析器

## 如何开始？
```bash
npm i fast-ftl --save
```
### 第 1 步、引入 
#### 1. es2015+ 中引入
```javascript
import FastFTL from "fast-ftl";
```

#### 2. CommonJS 中引入
```javascript
var FastFTL = require("fast-ftl").default;
```

#### 第 2 步、初始化
```javascript
var path = require("path");
var fastFtl = FastFTL({
    root: [
        __dirname, // 需要填写绝对路径
        path.join(__dirname, "") // 需要填写绝对路径
    ].join(",") // 支持多 root 解析 "," 隔开
});
```

#### 第 3 步、调用
```javascript
var relativeToRoot = "test.ftl"; // 相对 "root" 的路径
var mockData = { 
   YourName: "Jack" 
};
fastFtl.parse(relativeToRoot, mockData).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e)
});
```

## 特色
1. 调用快，因为 `Fast-FTL` 通知 `Java` 解析是通过 `Socket` 通信的；而非使用命令行，需要经过 `Terminal` 调用，且每次只F初始化一遍 `Java` 对象
2. 支持多 `root template directory` 的设定
3. API 简易，基于 `Promise`，文件**encoding** 只支持 `utf-8` 

## LICENSE
[![license][license-image]][license-url]


[npm-url]: https://npmjs.org/package/fast-ftl
[npm-image]: https://img.shields.io/npm/v/fast-ftl.svg
[license-url]: https://github.com/ImHype/Fast-FTL/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/imhype/Fast-FTL.svg

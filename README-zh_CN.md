<div align="center">
  <h1>fast-ftl</h1>
  <p>基于 Socket 服务的 Freemarker 解析器</p>
  <a href="https://www.npmjs.com/package/fast-ftl">
    <img src="https://img.shields.io/npm/v/fast-ftl.svg?style=flat-square" alt="NPM version">
  </a>
  <a href="https://travis-ci.org/imhype/fast-ftl">
    <img src="https://travis-ci.org/ImHype/Fast-FTL.svg?branch=master" alt="build">
  </a>
  <!--<a href="https://codecov.io/gh/imhype/fast-ftl">
    <img src="https://img.shields.io/codecov/c/github/imhype/fast-ftl.svg?style=flat-square" alt="build">
  </a>-->
  <a href="https://www.npmjs.com/package/fast-ftl">
    <img src="https://img.shields.io/npm/dm/fast-ftl.svg?style=flat-square" alt="download">
  </a>
  <a href="https://nodejs.org">
    <img src="https://img.shields.io/node/v/fast-ftl.svg?style=flat-square" alt="node">
  </a>
  <a href="https://github.com/imhype/fast-ftl/blob/master/CODE_OF_CONDUCT.md">
    <img src="https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square" alt="Code of Conduct">
  </a>
  <a href="https://github.com/imhype/fast-ftl/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/imhype/fast-ftl.svg?style=flat-square" alt="license">
  </a>
</div>



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
    ], // Support MultiTemplateLoader
    defaultEncoding: "utf-8", 	 // 默认 encoding
    urlEscapingCharsetSet: "utf-8", // URLEscapingCharset
    numberFormat: "0.##########", // 数字格式化方式
    templateUpdateDelay: 0 // milliseconds 为单位
});
```

| property | Fast-FTL | defaultValue|
| ------| ------ | ------ |
| default_encoding | defaultEncoding | utf-8 |
| url_escaping_charset | urlEscapingCharsetSet | utf-8 |
| number_format | numberFormat | 0.########## |
| template_update_delay(Milliseconds)| templateUpdateDelay | 0 |


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
1. 调用快，源于**Fast-FTL**的freemarker解析机制：  
	在Java端建立Socket监听服务，Node.js将需要解析的模板和数据发送给Java端，Java端接收请求并进行解析后将结果返回给Node.js端。好处是，无重复初始化Freemarker自身类的开销
2. 支持多**root template directory**的设定：  
	paths参数配置的目录下的文件，允许root下的模板直接通过 /xxx.ftl 的方式访问对应ftl，优先级按降序
3. API 简易，基于 `Promise`，文件**encoding**只支持**utf-8** 




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
    numberFormat: "0.##########", // 数字格式化方式
    templateUpdateDelay: 0 // milliseconds 为单位
});
```

| property | Fast-FTL | defaultValue|
| ------| ------ | ------ |
| default_encoding | defaultEncoding | utf-8 |
| url_escaping_charset | urlEscapingCharsetSet | utf-8 |
| number_format | numberFormat | 0.########## |
| template_update_delay(Milliseconds)| templateUpdateDelay | 0 |

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

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/10825163?v=3" width="80px;"/><br /><sub>君羽</sub>](https://github.com/imhype)<br />[💻](https://github.com/imhype/fast-ftl/commits?author=ImHype) 🔌 🚇 [📖](https://github.com/imhype/fast-ftl/commits?author=ImHype)<br> [⚠️](https://github.com/imhype/fast-ftl/commits?author=ImHype) [🐛](https://github.com/imhype/fast-ftl/issues?q=author%3AImHype) 💡 | [<img src="https://avatars0.githubusercontent.com/u/12047600?v=3&s=400" width="80px;"/><br /><sub>carryxyh</sub>](https://github.com/carryxyh)<br />[💻](https://github.com/imhype/fast-ftl/commits/java?author=carryxyh) <br><br> |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->


## LICENSE
[![license][license-image]][license-url]


[license-url]: https://github.com/ImHype/Fast-FTL/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/imhype/Fast-FTL.svg

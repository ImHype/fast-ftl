# Fast-FTL

[![NPM version][npm-image]][npm-url]


> Not Only Freemarker integration for NodeJS，but also the service of Freemarker integration.

## How to use
```bash
npm i freemarker -save
```

#### Render template
```javascript
const Freemarker = require('fast-ftl');

const freemarker = new Freemarker({
  root: "/path/to/template/"
});

freemarker.parse('test.ftl', {
    a: "1"
}).then(data => {
  console.log(data);
}).catch(e => {
  // reject e
});
```
## LICENSE
[![license][license-image]][license-url]

[license-url]: https://github.com/ImHype/Fast-FTL/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/imhype/Fast-FTL.svg

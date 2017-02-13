# Fast-FTL

[![NPM version][npm-image]][npm-url]


> The Freemaker parsing service in Node.js

## How to use
```bash
npm i fast-ftl --save
```

#### Import in es6
```javascript
import FastFTL from 'fast-ftl';
```

#### Import in es5
```javascript
var FastFTL = require('fast-ftl').default;
```

#### Init Fast-FTL
```javascript
var fastFtl = FastFTL({
    root: [__dirname, `${__dirname}/pages`].join(',') // Support MultiTemplateLoader
});
```

#### Parse file
```javascript
fastFtl.parse('test.ftl', {
    YourName: ‘Jack’
}).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e)
});
```

## LICENSE
[![license][license-image]][license-url]


[npm-url]: https://npmjs.org/package/fast-ftl
[npm-image]: https://img.shields.io/npm/v/fast-ftl.svg
[license-url]: https://github.com/ImHype/Fast-FTL/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/imhype/Fast-FTL.svg

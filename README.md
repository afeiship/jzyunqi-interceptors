# jzyunqi-interceptors
> Interceptors for jzyunqi/yw.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/jzyunqi-interceptors
```

## usage
```js
import jzyunqiInterceptors from '@jswork/jzyunqi-interceptors';

// usage
const opts = {
  interceptors: [
    ...jzyunqiInterceptors,
    { type: 'response', fn: 'xxx' }
  ]
};

httpSchema({
  // ...
}, opts);
```

## license
Code released under [the MIT license](https://github.com/afeiship/jzyunqi-interceptors/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/jzyunqi-interceptors
[version-url]: https://npmjs.org/package/@jswork/jzyunqi-interceptors

[license-image]: https://img.shields.io/npm/l/@jswork/jzyunqi-interceptors
[license-url]: https://github.com/afeiship/jzyunqi-interceptors/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/jzyunqi-interceptors
[size-url]: https://github.com/afeiship/jzyunqi-interceptors/blob/master/dist/jzyunqi-interceptors.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/jzyunqi-interceptors
[download-url]: https://www.npmjs.com/package/@jswork/jzyunqi-interceptors

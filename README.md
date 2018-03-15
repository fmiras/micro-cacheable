# micro-cache
[![NPM version](https://img.shields.io/npm/v/cache-micro.svg)](https://www.npmjs.com/package/cache-micro)
[![Build Status](https://travis-ci.org/fmiras/cache-micro.svg?branch=master)](https://travis-ci.org/fmiras/cache-micro)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat/)
[![Greenkeeper badge](https://badges.greenkeeper.io/fmiras/cache-micro.svg)](https://greenkeeper.io/)

cache-micro is an utility for data caching focused on [micro framework](https://github.com/zeit/micro). The problem that solves this package is to save the already requested data in-memory to have it available for a configurated time without processing it again. 

## Usage

```bash
cd my-micro-project/
npm install --save cache-micro
```

and add use the package like this:

```javascript
// index.js
const cache = require('cache-micro')

const microFn = (req, res) => {
  return new Date()
}

module.exports = cache(60 * 60 * 1000, microFn)
```

then just run your microservice normally and it will return the same result for an hour (first param as miliseconds)

## Why?
I worked on a project with micro using it for making web-scrapping workers that take too long the first time to get the data, and users requested often the same data so with this I can save a lot of requests, processing and time making requests of +5000ms only take 50ms.

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of cache-micro, just link it to the dependencies: `npm link cache-micro`. Instead of the default one from npm, node will now use your clone of cache-micro!

## Credits

Thanks to [ZEIT](https://zeit.co) Team for giving us [micro](https://github.com/zeit/micro) to make our life easier!

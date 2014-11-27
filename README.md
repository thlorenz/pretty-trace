# flush-all [![build status](https://secure.travis-ci.org/thlorenz/flush-all.png)](http://travis-ci.org/thlorenz/flush-all)

Calls `fflush(NULL)` to [flush](http://www.gnu.org/software/libc/manual/html_node/Flushing-Buffers.html) all open buffers.

```js
var flushAll = require('flush-all');
flushAll();
```

## Installation

    npm install flush-all

## License

MIT

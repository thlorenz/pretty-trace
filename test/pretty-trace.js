'use strict';
/*jshint asi: true */

var test = require('tape')
  , pretty = require('../')

function surroundWith(start, end) {
  return function surround(x) {
    return start + x + end;
  }
}

var testTheme = {
    raw      : surroundWith('-raw ', ' raw-')
  , number   : surroundWith('-number ', ' number-')
  , address  : surroundWith('-address ', ' address-')
  , symbol   : surroundWith('-symbol ', ' symbol-')
  , location : surroundWith('-location ', ' location-')
}

test('\nlldb trace single line', function (t) {
  var p;
  var inAtLine = '#0  0x00000001000049a6 in node::FSEventWrap::Start(v8::FunctionCallbackInfo<v8::Value> const&) at /Users/thlorenz/dev/js/node/src/fs_event_wrap.cc:115'
  var inLine = '#6  0x00001226b6542c13 in LazyCompile:~FSWatcher.start fs.js:1067 ()'

  p = pretty.line(inAtLine, testTheme)

  t.equal(p
    , '-number #0 number- ' +
      '-address 0x00000001000049a6 address- ' +
      'in -symbol node::FSEventWrap::Start(v8::FunctionCallbackInfo<v8::Value> const symbol- ' +
      'at -location Users/thlorenz/dev/js/node/src/fs_event_wrap.cc:115 location-'
    , 'correctly prettifies "#x 0x0000 in ... at ..." type trace'
  )

  p = pretty.line(inLine, testTheme)

  t.equal(p
    , '-number #6 number- ' +
      '-address 0x00001226b6542c13 address- ' +
      'in -symbol LazyCompile:~FSWatcher.start fs.js:1067 () symbol-'
    , 'correclty prettifies "#x 0x0000 in ..." type trace'
  )
  t.end()
})

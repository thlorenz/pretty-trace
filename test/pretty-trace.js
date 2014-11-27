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

test('\ninstruments callgraph single line', function (t) {
  var p;
  var unresolvedLine = '67.0ms   97.1%,0, ,         0x38852ff1decf'
  var resolvedLine = '67.0ms   97.1%,0, ,     node::TimerWrap::OnTimeout(uv_timer_s*)'
  
  p = pretty.line(unresolvedLine, testTheme)
  t.equal(p
    , '-number 67.0 number- ' + 
      'ms-location    97.1% location- ' +
      '-address          0x38852ff1decf address-'
    , 'correctly prettifies unresolved callgraph line'
  )

  p = pretty.line(resolvedLine, testTheme)
  t.equal(p
    , '-number 67.0 number- ms' + 
      '-location    97.1% location- ' + 
      '-symbol      node::TimerWrap::OnTimeout(uv_timer_s*) symbol-'
    , 'correctly prettifies resolved callgraph line'
  )

  t.end()
})

test('\n`perf script` result single line', function (t) {
  var p;
  var execLine = '        89dd46 v8::internal::UseIterator::UseIterator(v8::internal::LInstruction*) (/usr/local/bin/node)'
  var libLine = '   7f8f7aac6ec5 __libc_start_main (/lib/x86_64-linux-gnu/libc-2.19.so)'
  var headerLine = 'node 22610 13108.220321: cpu-clock:u:'

  p = pretty.line(execLine, testTheme)

  t.equal(p
    , '-address         89dd46 address- ' +
      '-symbol v8::internal::UseIterator::UseIterator(v8::internal::LInstruction*)  symbol- ' +
      '-location (/usr/local/bin/node) location-'
    , 'correctly prettifies line with executable preserving whitespace'
  )

  p = pretty.line(libLine, testTheme)
  t.equal(p
    , '-address    7f8f7aac6ec5 address- ' + 
      '-symbol __libc_start_main  symbol- ' + 
      '-location (/lib/x86_64-linux-gnu/libc-2.19.so) location-'
    , 'correctly prettifies line with lib preserving whitespace'
  )

  p = pretty.line(headerLine, testTheme)
  t.equal(p
    , '-raw node 22610 13108.220321: cpu-clock:u: raw-'
    , 'leaves header line (without leading white space) as raw'
  )

  t.end()
})

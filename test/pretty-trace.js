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
  , frame    : surroundWith('-frame ', ' frame-')
  , address  : surroundWith('-address ', ' address-')
  , symbol   : surroundWith('-symbol ', ' symbol-')
  , location : surroundWith('-location ', ' location-')
}

test('\nlldb trace single line', function (t) {
  var p;
  var inAtLine = '#0  0x00000001000049a6 in node::FSEventWrap::Start(v8::FunctionCallbackInfo<v8::Value> const&) at /Users/thlorenz/dev/js/node/src/fs_event_wrap.cc:115'
  var inLine = '#6  0x00001226b6542c13 in LazyCompile:~FSWatcher.start fs.js:1067 ()'
  var inLineWithPath = '#9   0x00001226b65fe54b in LazyCompile:~watchIndex /Users/thlorenz/dev/talks/memory-profiling/example/app.js:32 ()'

  p = pretty.line(inAtLine, testTheme)

  t.equal(p
    , '-frame #0   frame-' +
      '-address 0x00000001000049a6 address- ' +
      'in -symbol node::FSEventWrap::Start(v8::FunctionCallbackInfo<v8::Value> const&) symbol- ' +
      'at -location /Users/thlorenz/dev/js/node/src/fs_event_wrap.cc:115 location-'
    , pretty.line(inAtLine, pretty.terminalTheme)
  )

  p = pretty.line(inLine, testTheme)

  t.equal(p
    , '-frame #6   frame-' +
      '-address 0x00001226b6542c13 address- ' +
      'in -symbol LazyCompile:~FSWatcher.start symbol-' +
      '-location  fs.js:1067 () location-'
    , pretty.line(inLine, pretty.terminalTheme)
  )

  p = pretty.line(inLineWithPath, testTheme)

  t.equal(p
    , '-frame #9    frame-' +
      '-address 0x00001226b65fe54b address- ' +
      'in -symbol LazyCompile:~watchIndex symbol-' +
      '-location  /Users/thlorenz/dev/talks/memory-profiling/example/app.js:32 () location-'
    , pretty.line(inLineWithPath, pretty.terminalTheme)
  )


  t.end()
})

test('\nlldb trace single line mixed', function (t) {
  
  [ { raw: '#10 0x1234a23b in node::Parser::on_headers_complete(http_parser*) at node_http_parser.cc:241',
      pretty: '-frame #10  frame--address 0x1234a23b address- in -symbol node::Parser::on_headers_complete(http_parser*) symbol- at -location node_http_parser.cc:241 location-' },
    { raw: '#9  0x00001226b65fe54b in LazyCompile:~watchIndex /Users/thlorenz/dev/talks/memory-profiling/example/app.js:32 ()',
      pretty: '-frame #9   frame--address 0x00001226b65fe54b address- in -symbol LazyCompile:~watchIndex symbol--location  /Users/thlorenz/dev/talks/memory-profiling/example/app.js:32 () location-' },
    { raw: 'frame #0: 0x00000001009c096c node_g`uv_fs_read(loop=0x0000000100f4b980, req=0x00007fff5fbf4fa8, file=21, bufs=0x00007fff5fbf51d0, nbufs=1, off=-1, cb=0x0000000000000000) + 44 at fs.c:1037',
      pretty: '-frame frame #0:  frame--address 0x00000001009c096c address--symbol  node_g`uv_fs_read(loop=0x0000000100f4b980, req=0x00007fff5fbf4fa8, file=21, bufs=0x00007fff5fbf51d0, nbufs=1, off=-1, cb=0x0000000000000000) + 44 symbol- at -location fs.c:1037 location-' },
    { raw: 'frame #1: 0x00000001009343ce node_g`node::Read(args=0x00007fff5fbf52b0) + 1502 at node_file.cc:922',
      pretty: '-frame frame #1:  frame--address 0x00000001009343ce address--symbol  node_g`node::Read(args=0x00007fff5fbf52b0) + 1502 symbol- at -location node_file.cc:922 location-' },
    { raw: 'frame #6: 0x00003d278f8060bb',
      pretty: '-frame frame #6:  frame--address 0x00003d278f8060bb address--symbol  symbol--location  location-' },
    { raw: 'frame #10: LazyCompile:~onrequest /Users/thlorenz/dev/talks/jit/examples/fs-read-sync/index.js:12',
      pretty: '-frame frame #10:  frame--symbol LazyCompile:~onrequest symbol--location  /Users/thlorenz/dev/talks/jit/examples/fs-read-sync/index.js:12 location-' },
    { raw: 'frame #11: LazyCompile:~emit events.js:70',
      pretty: '-frame frame #11:  frame--symbol LazyCompile:~emit symbol--location  events.js:70 location-' },
    { raw: 'frame #16: Stub:JSEntryStub',
      pretty: '-frame frame #16:  frame--symbol Stub:JSEntryStub symbol--location  location-' }
  ].forEach(check)

  function check(d) {
    t.equal(pretty.line(d.raw, testTheme), d.pretty, pretty.line(d.raw, pretty.terminalTheme));
  }

  t.end()
})

test('\ninstruments callgraph single line', function (t) {
  var p;
  var unresolvedLine = '67.0ms   97.1%,0, ,         0x38852ff1decf'
  var resolvedLine = '67.0ms   97.1%,0, ,     node::TimerWrap::OnTimeout(uv_timer_s*)'
  
  p = pretty.line(unresolvedLine, testTheme)
  t.equal(p
    , '-frame 67.0 frame- ' + 
      'ms-location    97.1% location- ' +
      '-address          0x38852ff1decf address-'
    , 'correctly prettifies unresolved callgraph line'
  )

  p = pretty.line(resolvedLine, testTheme)
  t.equal(p
    , '-frame 67.0 frame- ms' + 
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

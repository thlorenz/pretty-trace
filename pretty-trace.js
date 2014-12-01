'use strict';
var colors = require('ansicolors');

/**
 * Regexes used to match debug traces created by tools like lldb.
 * 
 * @name prettyTrace::regexes::lldb
 */
var lldb = {
      frameAddInSymAtLoc: {
        //     The result of copying Xcode stracktrace from the side bar
        //     #10 0x1234a23b in node::Parser::on_headers_complete(http_parser*) at node_http_parser.cc:241
        desc: '#num 0x0000 in symbol() at file.cc'
      , regex:  /^(:?#\d+\W+)(:?0x(?:(?:\d|[abcdefABCDEF]){0,2})+)(:? +in +)(:?.+?)(:? +at +)(:?.+)$/m
      , matches: [ 'frame', 'address', 'in', 'symbol', 'at', 'file' ]

    }
  , frameAddInSymLoc: {
        //     The result of copying Xcode stracktrace from the side bar
        //     #9  0x00001226b65fe54b in LazyCompile:~watchIndex /Users/thlorenz/dev/talks/memory-profiling/example/app.js:32 ()
        desc: '#num 0x000 in symbol() file.js'
      , regex:  /^(:?#\d+\W+)(:?0x(?:(?:\d|[abcdefABCDEF]){0,2})+)(:? +in +)(:?.+?)(:? .+)$/m
      , matches: [ 'frame', 'address', 'in', 'symbol', 'file' ]

    }
  , frameAddSymAtLoc: {
        //    frame #0: 0x00000001009c096c node_g`uv_fs_read(loop=0x0000000100f4b980, req=0x00007fff5fbf4fa8, file=21, bufs=0x00007fff5fbf51d0, nbufs=1, off=-1, cb=0x0000000000000000) + 44 at fs.c:1037
        //    frame #1: 0x00000001009343ce node_g`node::Read(args=0x00007fff5fbf52b0) + 1502 at node_file.cc:922
        //    frame #6: 0x00003d278f8060bb
        desc: 'frame #x 0x0000 symbol(..) at file.c:100 OR frame #x: 0x0000'
      , regex: /^(:?[^#]*?#\d+[:]{0,1}\W+)(:?0x(?:(?:\d|[abcdefABCDEF]){0,2})+)(:?.*?)(?:(:?\W+at\W+)(:?[^:]+:\d.+)){0,1}$/m
      , matches: [ 'frame', 'address', 'symbol', 'at', 'file' ]
    }
  , frameSymLoc: {
        //    frame #10: LazyCompile:~onrequest /Users/thlorenz/dev/talks/jit/examples/fs-read-sync/index.js:12
        //    frame #11: LazyCompile:~emit events.js:70
        //    frame #16: Stub:JSEntryStub
        desc: 'frame #x LazyCompile:~symbol(..) file.js:100'
      , regex: /^(:?[^#]*?#\d+[:]{0,1}\W+)(:?[^/ ]+)(:?.+){0,1}$/m
      , matches: [ 'frame', 'symbol', 'file' ]
    }
}

/**
 * Regexes used to match callgraphs generated with Mac Instruments.
 * 
 * @name prettyTrace::regexes::instruments
 */
var instruments = {
  csv: {
    // Captures include white space to maintain indentation
    //                        67.0ms   97.1%,0, ,     node::TimerWrap::OnTimeout(uv_timer_s*)
    //                        67.0ms   97.1%,0, ,         0x38852ff1decf
    desc: 'XX.Xms XX.X%,,X , address OR symbol'
  , regex: /^(:?[0-9.]+)(:?ms|s)(:?\W+[0-9.]+%),\d+,\W+,(:?\W+0x(?:(?:\d|[abcdefABCDEF]){2})+){0,1}(:?.+?){0,1}$/m
  , matches: [ 'time', 'timeUnit', 'percent', 'address', 'symbol' ]
  }
}

/**
 * Regexes used to match callgraphs generated running Linux perf, i.e. `perf script`.
 * 
 * @name prettyTrace::regexes::perf
 */
var perf = {
  script: {
      //                        89dd46 v8::internal::UseIterator::UseIterator(v8::internal::LInstruction*) (/usr/local/bin/node)
      desc: 'address symbol (process)'
    , regex:  /^(:?\W+(?:(?:\d|[abcdefABCDEF]){2})+){0,1}\W+(:?.+?){1}(:?\([^()]+\)){0,1}$/m
    , matches: ['address', 'symbol', 'process' ]
  }
}

exports.line = 

/**
 * Prettifies the given line.
 * 
 * @name prettyTrace::line
 * @function
 * @param {string}   line           the line to be prettified
 * @param {Object}   theme          theme that specifies how to prettify a trace
 * @param {function} theme.raw      invoked to surround an unparsable line
 * @param {function} theme.frame    invoked to surround the frame number
 * @param {function} theme.address  invoked to surround the hex address
 * @param {function} theme.symbol   invoked to surround the symbol corresponding to the address, i.e. a function name
 * @param {function} theme.location invoked to surround the location in the file at which the symbol is found
 * @return {string}  prettified line
 */
function prettyLine(line, theme) {
  var pat;
  if (!line) throw new Error('Please supply a line');
  if (!theme) throw new Error('Please supply a theme');

  pat = lldb.frameAddInSymAtLoc;
  if (pat.regex.test(line)) { 
    return line.replace(pat.regex, function (match, frame, address, in_, symbol, at_, location) {
      return  theme.frame(frame)
            + theme.address(address)
            + in_ + theme.symbol(symbol)
            + at_ + theme.location(location)
    })
  }

  pat = lldb.frameAddInSymLoc;
  if (pat.regex.test(line)) { 
    return line.replace(pat.regex, function (match, frame, address, in_, symbol, location) {
      return  theme.frame(frame)
            + theme.address(address)
            + in_ + theme.symbol(symbol)
            + theme.location(location)
    })
  }

  pat = lldb.frameAddSymAtLoc;
  if (pat.regex.test(line)) { 
    return line.replace(pat.regex, function (match, frame, address, symbol, at_, location) {
      return  theme.frame(frame)
            + theme.address(address)
            + (theme.symbol(symbol || ''))
            + (at_ || '') + (theme.location(location || ''))
    })
  }

  pat = lldb.frameSymLoc;
  if (pat.regex.test(line)) { 
    return line.replace(pat.regex, function (match, frame, symbol, location) {
      return  theme.frame(frame)
            + (theme.symbol(symbol || ''))
            + (theme.location(location || ''))
    })
  }

  pat = instruments.csv;
  if (pat.regex.test(line)) { 
    return line.replace(pat.regex, function (match, time, timeUnit, percent, address, symbol) {
      return theme.frame(time) + ' ' 
           + timeUnit 
           + theme.location(percent) + ' ' 
           + (address ? theme.address(address) : '') 
           + (symbol ? theme.symbol(symbol) : '')
    })
  }

  pat = perf.script;
  if (pat.regex.test(line)) { 
    return line.replace(pat.regex, function (match, address, symbol, process) {
      return  theme.address(address) + ' '
            + theme.symbol(symbol) + ' '
            + theme.location(process);
    })
  }
  return theme.raw(line);
}

exports.lines = 

/**
 * Prettifies multiple lines.
 * 
 * @name prettyTrace::lines
 * @function
 * @param {Array.<string>} lines lines to be prettified
 * @param {Object} theme theme that specifies how to prettify a trace @see prettyTrace::line
 * @return {Array.<string>} the prettified lines
 */
function prettyLines(lines, theme) {
  if (!lines || !Array.isArray(lines)) throw new Error('Please supply an array of lines');
  if (!theme) throw new Error('Please supply a theme');

  function prettify(line) {
    if (!line) return null;
    return exports.line(line, theme);
  }

  return lines.map(prettify);
}

/**
 * A theme that colorizes the given trace using ANSI color codes.
 * 
 * @name prettyTrace::terminalTheme
 */
exports.terminalTheme = {
    raw      : colors.white
  , frame    : colors.brightGreen
  , address  : colors.brightBlack
  , symbol   : colors.brightBlue
  , location : colors.brightBlack
}

function spanClass(clazz, link) {
  return function span(x) {
    if (!x) return '';
    if (link) { 
      x = '<a href="file://' + x.split(':')[0] +'">' + x + '</a>';
    }
    return '<span class="' + clazz + '">' + x + '</span>';
  }
}

/**
 * A theme that surrounds the given trace using with spans classed `trace-*` in order to allow styling with CSS.
 * 
 * @name prettyTrace::htmlTheme
 */
exports.htmlTheme = {
    raw      : spanClass('trace-raw')
  , frame    : spanClass('trace-frame')
  , address  : spanClass('trace-address')
  , symbol   : spanClass('trace-symbol')
  , location : spanClass('trace-location', true)
}

exports.regexes = { 
    lldb        : lldb
  , perf        : perf
  , instruments : instruments
}

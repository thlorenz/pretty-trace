'use strict';
var colors = require('ansicolors');

//                #10  0x1234a23b in node::Parser::on_headers_complete(http_parser*) at node_http_parser.cc:241
var lldbRegex = /^#(:?\d+)\W+(:?0x(?:(?:\d|[abcdefABCDEF]){0,2})+)\W+in\W+(:?.+?)(?:\W+at\W+(:?.+)){0,1}$/m

exports.line = function prettyLine(line, theme) {
  if (!line) throw new Error('Please supply a line');
  if (!theme) throw new Error('Please supply a theme');

  if (lldbRegex.test(line)) { 
    return line.replace(lldbRegex, function (match, number, address, symbol, location) {
      return  theme.number('#' + number) + ' ' 
            + theme.address(address)
            + ' in ' + theme.symbol(symbol)
            + (location ? ' at ' + theme.location(location) : '')
    })
  }
  return theme.raw(line);
}

exports.lines = function prettyLines(lines, theme) {
  if (!lines || !Array.isArray(lines)) throw new Error('Please supply an array of lines');
  if (!theme) throw new Error('Please supply a theme');

  function prettify(line) {
    if (!line) return null;
    return exports.line(line, theme);
  }

  return lines.map(prettify);
}

exports.terminalTheme = {
    raw      : colors.brightBlue
  , number   : colors.blue
  , address  : colors.brightBlack
  , symbol   : colors.brightBlue
  , location : colors.brightBlack
}

function spanClass(clazz) {
  return function span(x) {
    return '<span class="' + clazz + '">' + x + '</span>';
  }
}

exports.htmlTheme = {
    raw      : spanClass('stack-raw')
  , number   : spanClass('stack-number')
  , address  : spanClass('stack-address')
  , symbol   : spanClass('stack-symbol')
  , location : spanClass('stack-location')
}

// Test
var fs = require('fs')
if (!module.parent && typeof window === 'undefined') {
//  var line = '#0  0x00000001000049a6 in node::FSEventWrap::Start(v8::FunctionCallbackInfo<v8::Value> const&) at /Users/thlorenz/dev/js/node/src/fs_event_wrap.cc:115'
  var lines = fs.readFileSync(__dirname + '/test/fixtures/lldb-trace.txt', 'utf8').split('\n');
  var res = exports.lines(lines, exports.terminalTheme);
  console.log(res.join('\n'))
}

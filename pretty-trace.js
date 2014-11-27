'use strict';
var colors = require('ansicolors');

//                #10  0x1234a23b in node::Parser::on_headers_complete(http_parser*) at node_http_parser.cc:241
var lldbRegex = /^#(:?\d+)\W+(:?0x(?:(?:\d|[abcdefABCDEF]){0,2})+)\W+in\W+(:?.+?)(?:\W+at\W+(:?.+)){0,1}$/m

// Captures include white space to maintain indentation
//                        67.0ms   97.1%,0, ,     node::TimerWrap::OnTimeout(uv_timer_s*)
//                        67.0ms   97.1%,0, ,         0x38852ff1decf
var instrumentsCsvRegex = /^(:?[0-9.]+)(:?ms|s)(:?\W+[0-9.]+%),\d+,\W+,(:?\W+0x(?:(?:\d|[abcdefABCDEF]){2})+){0,1}(:?.+?){0,1}$/m;

exports.line = 

/**
 * Prettifies the given line.
 * 
 * @name prettifyTrace::line
 * @function
 * @param {string}   line           the line to be prettified
 * @param {Object}   theme          theme that specifies how to prettify a trace
 * @param {function} theme.raw      invoked to surround an unparsable line
 * @param {function} theme.number   invoked to surround the frame number
 * @param {function} theme.address  invoked to surround the hex address
 * @param {function} theme.symbol   invoked to surround the symbol corresponding to the address, i.e. a function name
 * @param {function} theme.location invoked to surround the location in the file at which the symbol is found
 * @return {string}  prettified line
 */
function prettyLine(line, theme) {
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
  if (instrumentsCsvRegex.test(line)) { 
    return line.replace(instrumentsCsvRegex, function (match, time, timeUnit, percent, address, symbol) {
      return theme.number(time) + ' ' 
           + timeUnit 
           + theme.location(percent) + ' ' 
           + (address ? theme.address(address) : '') 
           + (symbol ? theme.symbol(symbol) : '')
    })
  }
  return theme.raw(line);
}

exports.lines = 

/**
 * Prettifies multiple lines.
 * 
 * @name prettifyTrace::lines
 * @function
 * @param {Array.<string>} lines lines to be prettified
 * @param {Object} theme theme that specifies how to prettify a trace @see prettifyTrace::line
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
 * @name prettifyTrace::terminalTheme
 */
exports.terminalTheme = {
    raw      : colors.brightBlue
  , number   : colors.blue
  , address  : colors.brightBlack
  , symbol   : colors.brightBlue
  , location : colors.brightBlack
}

function spanClass(clazz, link) {
  return function span(x) {
    return '<span class="' + clazz + '">' + x + '</span>';
  }
}

/**
 * A theme that surrounds the given trace using with spans classed `trace-*` in order to allow styling with CSS.
 * 
 * @name prettifyTrace::htmlTheme
 */
exports.htmlTheme = {
    raw      : spanClass('trace-raw')
  , number   : spanClass('trace-number')
  , address  : spanClass('trace-address')
  , symbol   : spanClass('trace-symbol')
  , location : spanClass('trace-location')
}

exports.debugTraceRegex = lldbRegex;
exports.instrumentsCsvRegex = instrumentsCsvRegex;


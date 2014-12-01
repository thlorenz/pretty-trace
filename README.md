# pretty-trace [![build status](https://secure.travis-ci.org/thlorenz/pretty-trace.png)](http://travis-ci.org/thlorenz/pretty-trace)

[![testling badge](https://ci.testling.com/thlorenz/pretty-trace.png)](https://ci.testling.com/thlorenz/pretty-trace)

Prettifies traces emitted by tools like lldb.

```js
var prettyTrace = require('pretty-trace');

var lines = fs.readFileSync(__dirname + '/test/fixtures/lldb-trace.txt', 'utf8').split('\n');

var prettyLines = prettyTrace.lines(lines, prettyTrace.terminalTheme);
console.log(prettyLines.join('\n'))
```

![lldb-trace](https://raw.githubusercontent.com/thlorenz/pretty-trace/master/assets/lldb-trace.png)

## CLI

```
cat ./test/fixtures/lldb-trace.txt | pretty-trace
```

## Installation

    npm install pretty-trace

*Used by [resolve-jit-symbols](http://thlorenz.github.io/resolve-jit-symbols/web/)*.

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="prettyTrace::htmlTheme"><span class="type-signature"></span>prettyTrace::htmlTheme<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>A theme that surrounds the given trace using with spans classed <code>trace-*</code> in order to allow styling with CSS.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L202">lineno 202</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="prettyTrace::regexes::instruments"><span class="type-signature"></span>prettyTrace::regexes::instruments<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Regexes used to match callgraphs generated with Mac Instruments.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L44">lineno 44</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="prettyTrace::regexes::lldb"><span class="type-signature"></span>prettyTrace::regexes::lldb<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Regexes used to match debug traces created by tools like lldb.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L4">lineno 4</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="prettyTrace::regexes::perf"><span class="type-signature"></span>prettyTrace::regexes::perf<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Regexes used to match callgraphs generated running Linux perf, i.e. <code>perf script</code>.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L60">lineno 60</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="prettyTrace::terminalTheme"><span class="type-signature"></span>prettyTrace::terminalTheme<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>A theme that colorizes the given trace using ANSI color codes.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L179">lineno 179</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
<dl>
<dt>
<h4 class="name" id="prettyTrace::line"><span class="type-signature"></span>prettyTrace::line<span class="signature">(line, theme)</span><span class="type-signature"> &rarr; {string}</span></h4>
</dt>
<dd>
<div class="description">
<p>Prettifies the given line.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>line</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>the line to be prettified</p></td>
</tr>
<tr>
<td class="name"><code>theme</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>theme that specifies how to prettify a trace</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>raw</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>invoked to surround an unparsable line</p></td>
</tr>
<tr>
<td class="name"><code>frame</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>invoked to surround the frame number</p></td>
</tr>
<tr>
<td class="name"><code>address</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>invoked to surround the hex address</p></td>
</tr>
<tr>
<td class="name"><code>symbol</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>invoked to surround the symbol corresponding to the address, i.e. a function name</p></td>
</tr>
<tr>
<td class="name"><code>location</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>invoked to surround the location in the file at which the symbol is found</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L76">lineno 76</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>prettified line</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">string</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="prettyTrace::lines"><span class="type-signature"></span>prettyTrace::lines<span class="signature">(lines, theme)</span><span class="type-signature"> &rarr; {Array.&lt;string>}</span></h4>
</dt>
<dd>
<div class="description">
<p>Prettifies multiple lines.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>lines</code></td>
<td class="type">
<span class="param-type">Array.&lt;string></span>
</td>
<td class="description last"><p>lines to be prettified</p></td>
</tr>
<tr>
<td class="name"><code>theme</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>theme that specifies how to prettify a trace @see prettyTrace::line</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L158">lineno 158</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the prettified lines</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array.&lt;string></span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT

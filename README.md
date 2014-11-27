# pretty-trace [![build status](https://secure.travis-ci.org/thlorenz/pretty-trace.png)](http://travis-ci.org/thlorenz/pretty-trace)

Prettifies traces emitted by tools like lldb.

```js
var prettyTrace = require('pretty-trace');

var lines = fs.readFileSync(__dirname + '/test/fixtures/lldb-trace.txt', 'utf8').split('\n');

var prettyLines = prettyTrace.lines(lines, prettyTrace.terminalTheme);
console.log(prettyLines.join('\n'))
```

![lldb-trace](https://raw.githubusercontent.com/thlorenz/pretty-trace/master/assets/lldb-trace.png)

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
<h4 class="name" id="prettifyTrace::htmlTheme"><span class="type-signature"></span>prettifyTrace::htmlTheme<span class="type-signature"></span></h4>
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
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L80">lineno 80</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="prettifyTrace::terminalTheme"><span class="type-signature"></span>prettifyTrace::terminalTheme<span class="type-signature"></span></h4>
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
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L61">lineno 61</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
<dl>
<dt>
<h4 class="name" id="prettifyTrace::line"><span class="type-signature"></span>prettifyTrace::line<span class="signature">(line, theme)</span><span class="type-signature"> &rarr; {string}</span></h4>
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
<td class="name"><code>number</code></td>
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
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L9">lineno 9</a>
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
<h4 class="name" id="prettifyTrace::lines"><span class="type-signature"></span>prettifyTrace::lines<span class="signature">(lines, theme)</span><span class="type-signature"> &rarr; {Array.&lt;string>}</span></h4>
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
<td class="description last"><p>theme that specifies how to prettify a trace @see prettifyTrace::line</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js">pretty-trace.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/pretty-trace/blob/master/pretty-trace.js#L40">lineno 40</a>
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

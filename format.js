self.addEventListener('message', function (e) {
    var source = e.data.source;

    self._window = self.window;
    self.window = {};

    self.importScripts('https://cdn.statically.io/gh/abdiusu/highlight-code/e13e95f0/beautify.min.js');

    source = self.window.js_beautify(source, {
        unescape_strings: true,
        jslint_happy: true
    });

    self.window = self._window;


    self.importScripts('https://cdn.statically.io/gh/abdiusu/highlight-code/0e0d2ec8/highlight.min.js');

    source = self.hljs.highlight('javascript', source).value;

    self.postMessage(source);
});

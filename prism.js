/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+css-extras+ftl+markup-templating&plugins=line-numbers+show-language+highlight-keywords+inline-color+unescaped-markup+data-uri-highlight+toolbar */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function (u) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            C = {
                manual: u.Prism && u.Prism.manual,
                disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function (e) {
                        return e instanceof _ ? new _(e.type, C.util.encode(e.content), e.alias) : Array.isArray(e) ? e.map(C.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function (e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++n
                        }), e.__id
                    },
                    clone: function r(e, t) {
                        var a, n, i = C.util.type(e);
                        switch (t = t || {}, i) {
                        case "Object":
                            if (n = C.util.objId(e), t[n]) return t[n];
                            for (var o in a = {}, t[n] = a, e) e.hasOwnProperty(o) && (a[o] = r(e[o], t));
                            return a;
                        case "Array":
                            return n = C.util.objId(e), t[n] ? t[n] : (a = [], t[n] = a, e.forEach(function (e, n) {
                                a[n] = r(e, t)
                            }), a);
                        default:
                            return e
                        }
                    },
                    getLanguage: function (e) {
                        for (; e && !c.test(e.className);) e = e.parentElement;
                        return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none"
                    },
                    currentScript: function () {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw new Error
                        } catch (e) {
                            var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                            if (n) {
                                var r = document.getElementsByTagName("script");
                                for (var t in r)
                                    if (r[t].src == n) return r[t]
                            }
                            return null
                        }
                    }
                },
                languages: {
                    extend: function (e, n) {
                        var r = C.util.clone(C.languages[e]);
                        for (var t in n) r[t] = n[t];
                        return r
                    },
                    insertBefore: function (r, e, n, t) {
                        var a = (t = t || C.languages)[r],
                            i = {};
                        for (var o in a)
                            if (a.hasOwnProperty(o)) {
                                if (o == e)
                                    for (var l in n) n.hasOwnProperty(l) && (i[l] = n[l]);
                                n.hasOwnProperty(o) || (i[o] = a[o])
                            } var s = t[r];
                        return t[r] = i, C.languages.DFS(C.languages, function (e, n) {
                            n === s && e != r && (this[e] = i)
                        }), i
                    },
                    DFS: function e(n, r, t, a) {
                        a = a || {};
                        var i = C.util.objId;
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                r.call(n, o, n[o], t || o);
                                var l = n[o],
                                    s = C.util.type(l);
                                "Object" !== s || a[i(l)] ? "Array" !== s || a[i(l)] || (a[i(l)] = !0, e(l, r, o, a)) : (a[i(l)] = !0, e(l, r, null, a))
                            }
                    }
                },
                plugins: {},
                highlightAll: function (e, n) {
                    C.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function (e, n, r) {
                    var t = {
                        callback: r,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    C.hooks.run("before-highlightall", t), t.elements = Array.prototype.slice.apply(t.container.querySelectorAll(t.selector)), C.hooks.run("before-all-elements-highlight", t);
                    for (var a, i = 0; a = t.elements[i++];) C.highlightElement(a, !0 === n, t.callback)
                },
                highlightElement: function (e, n, r) {
                    var t = C.util.getLanguage(e),
                        a = C.languages[t];
                    e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + t;
                    var i = e.parentNode;
                    i && "pre" === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + t);
                    var o = {
                        element: e,
                        language: t,
                        grammar: a,
                        code: e.textContent
                    };

                    function l(e) {
                        o.highlightedCode = e, C.hooks.run("before-insert", o), o.element.innerHTML = o.highlightedCode, C.hooks.run("after-highlight", o), C.hooks.run("complete", o), r && r.call(o.element)
                    }
                    if (C.hooks.run("before-sanity-check", o), !o.code) return C.hooks.run("complete", o), void(r && r.call(o.element));
                    if (C.hooks.run("before-highlight", o), o.grammar)
                        if (n && u.Worker) {
                            var s = new Worker(C.filename);
                            s.onmessage = function (e) {
                                l(e.data)
                            }, s.postMessage(JSON.stringify({
                                language: o.language,
                                code: o.code,
                                immediateClose: !0
                            }))
                        } else l(C.highlight(o.code, o.grammar, o.language));
                    else l(C.util.encode(o.code))
                },
                highlight: function (e, n, r) {
                    var t = {
                        code: e,
                        grammar: n,
                        language: r
                    };
                    return C.hooks.run("before-tokenize", t), t.tokens = C.tokenize(t.code, t.grammar), C.hooks.run("after-tokenize", t), _.stringify(C.util.encode(t.tokens), t.language)
                },
                matchGrammar: function (e, n, r, t, a, i, o) {
                    for (var l in r)
                        if (r.hasOwnProperty(l) && r[l]) {
                            var s = r[l];
                            s = Array.isArray(s) ? s : [s];
                            for (var u = 0; u < s.length; ++u) {
                                if (o && o == l + "," + u) return;
                                var c = s[u],
                                    g = c.inside,
                                    f = !!c.lookbehind,
                                    h = !!c.greedy,
                                    d = 0,
                                    m = c.alias;
                                if (h && !c.pattern.global) {
                                    var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                                    c.pattern = RegExp(c.pattern.source, p + "g")
                                }
                                c = c.pattern || c;
                                for (var y = t, v = a; y < n.length; v += n[y].length, ++y) {
                                    var k = n[y];
                                    if (n.length > e.length) return;
                                    if (!(k instanceof _)) {
                                        if (h && y != n.length - 1) {
                                            if (c.lastIndex = v, !(O = c.exec(e))) break;
                                            for (var b = O.index + (f && O[1] ? O[1].length : 0), w = O.index + O[0].length, A = y, P = v, x = n.length; A < x && (P < w || !n[A].type && !n[A - 1].greedy); ++A)(P += n[A].length) <= b && (++y, v = P);
                                            if (n[y] instanceof _) continue;
                                            S = A - y, k = e.slice(v, P), O.index -= v
                                        } else {
                                            c.lastIndex = 0;
                                            var O = c.exec(k),
                                                S = 1
                                        }
                                        if (O) {
                                            f && (d = O[1] ? O[1].length : 0);
                                            w = (b = O.index + d) + (O = O[0].slice(d)).length;
                                            var j = k.slice(0, b),
                                                N = k.slice(w),
                                                E = [y, S];
                                            j && (++y, v += j.length, E.push(j));
                                            var L = new _(l, g ? C.tokenize(O, g) : O, m, O, h);
                                            if (E.push(L), N && E.push(N), Array.prototype.splice.apply(n, E), 1 != S && C.matchGrammar(e, n, r, y, v, !0, l + "," + u), i) break
                                        } else if (i) break
                                    }
                                }
                            }
                        }
                },
                tokenize: function (e, n) {
                    var r = [e],
                        t = n.rest;
                    if (t) {
                        for (var a in t) n[a] = t[a];
                        delete n.rest
                    }
                    return C.matchGrammar(e, r, n, 0, 0, !1), r
                },
                hooks: {
                    all: {},
                    add: function (e, n) {
                        var r = C.hooks.all;
                        r[e] = r[e] || [], r[e].push(n)
                    },
                    run: function (e, n) {
                        var r = C.hooks.all[e];
                        if (r && r.length)
                            for (var t, a = 0; t = r[a++];) t(n)
                    }
                },
                Token: _
            };

        function _(e, n, r, t, a) {
            this.type = e, this.content = n, this.alias = r, this.length = 0 | (t || "").length, this.greedy = !!a
        }
        if (u.Prism = C, _.stringify = function (e, n) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) return e.map(function (e) {
                    return _.stringify(e, n)
                }).join("");
                var r = {
                    type: e.type,
                    content: _.stringify(e.content, n),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: n
                };
                if (e.alias) {
                    var t = Array.isArray(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(r.classes, t)
                }
                C.hooks.run("wrap", r);
                var a = Object.keys(r.attributes).map(function (e) {
                    return e + '="' + (r.attributes[e] || "").replace(/"/g, "&quot;") + '"'
                }).join(" ");
                return "<" + r.tag + ' class="' + r.classes.join(" ") + '"' + (a ? " " + a : "") + ">" + r.content + "</" + r.tag + ">"
            }, !u.document) return u.addEventListener && (C.disableWorkerMessageHandler || u.addEventListener("message", function (e) {
            var n = JSON.parse(e.data),
                r = n.language,
                t = n.code,
                a = n.immediateClose;
            u.postMessage(C.highlight(t, C.languages[r], r)), a && u.close()
        }, !1)), C;
        var e = C.util.currentScript();
        if (e && (C.filename = e.src, e.hasAttribute("data-manual") && (C.manual = !0)), !C.manual) {
            function r() {
                C.manual || C.highlightAll()
            }
            var t = document.readyState;
            "loading" === t || "interactive" === t && e && e.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16)
        }
        return C
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
        greedy: !0
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: {
                    punctuation: [/^=/, {
                        pattern: /^(\s*)["']|["']$/,
                        lookbehind: !0
                    }]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
        var s = {};
        s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var n = {
            "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: s
            }
        };
        n["language-" + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e]
        };
        var t = {};
        t[a] = {
            pattern: RegExp("(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(/__/g, a), "i"),
            lookbehind: !0,
            greedy: !0,
            inside: n
        }, Prism.languages.insertBefore("markup", "cdata", t)
    }
}), Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
! function (s) {
    var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
            inside: {
                rule: /@[\w-]+/
            }
        },
        url: {
            pattern: RegExp("url\\((?:" + t.source + "|[^\n\r()]*)\\)", "i"),
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/
            }
        },
        selector: RegExp("[^{}\\s](?:[^{};\"']|" + t.source + ")*?(?=\\s*\\{)"),
        string: {
            pattern: t,
            greedy: !0
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/
    }, s.languages.css.atrule.inside.rest = s.languages.css;
    var e = s.languages.markup;
    e && (e.tag.addInlined("style", "css"), s.languages.insertBefore("inside", "attr-value", {
        "style-attr": {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
                "attr-name": {
                    pattern: /^\s*style/i,
                    inside: e.tag.inside
                },
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": {
                    pattern: /.+/i,
                    inside: s.languages.css
                }
            },
            alias: "language-css"
        }
    }, e.tag))
}(Prism);
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*(?:$|[\r\n,.;})\]]))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function"
    },
    parameter: [{
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
    }, {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: !0,
        inside: {
            "template-punctuation": {
                pattern: /^`|`$/,
                alias: "string"
            },
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\${|}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript;
! function (e) {
    e.languages.css.selector = {
        pattern: e.languages.css.selector,
        inside: {
            "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            "pseudo-class": /:[-\w]+/,
            class: /\.[-:.\w]+/,
            id: /#[-:.\w]+/,
            attribute: {
                pattern: /\[(?:[^[\]"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*\]/,
                greedy: !0,
                inside: {
                    punctuation: /^\[|\]$/,
                    "case-sensitivity": {
                        pattern: /(\s)[si]$/i,
                        lookbehind: !0,
                        alias: "keyword"
                    },
                    namespace: {
                        pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
                        lookbehind: !0,
                        inside: {
                            punctuation: /\|$/
                        }
                    },
                    attribute: {
                        pattern: /^(\s*)[-\w\xA0-\uFFFF]+/,
                        lookbehind: !0
                    },
                    value: [/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, {
                        pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/,
                        lookbehind: !0
                    }],
                    operator: /[|~*^$]?=/
                }
            },
            "n-th": [{
                pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
                lookbehind: !0,
                inside: {
                    number: /[\dn]+/,
                    operator: /[+-]/
                }
            }, {
                pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
                lookbehind: !0
            }],
            punctuation: /[()]/
        }
    }, e.languages.insertBefore("css", "property", {
        variable: {
            pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
            lookbehind: !0
        }
    });
    var a = {
            pattern: /(\d)(?:%|[a-z]+)/,
            lookbehind: !0
        },
        n = {
            pattern: /(^|[^\w.-])-?\d*\.?\d+/,
            lookbehind: !0
        };
    e.languages.insertBefore("css", "function", {
        operator: {
            pattern: /(\s)[+\-*\/](?=\s)/,
            lookbehind: !0
        },
        hexcode: {
            pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i,
            alias: "color"
        },
        color: [/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, {
            pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
            inside: {
                unit: a,
                number: n,
                function: /[\w-]+(?=\()/,
                punctuation: /[(),]/
            }
        }],
        entity: /\\[\da-f]{1,8}/i,
        unit: a,
        number: n
    })
}(Prism);
! function (h) {
    function v(e, n) {
        return "___" + e.toUpperCase() + n + "___"
    }
    Object.defineProperties(h.languages["markup-templating"] = {}, {
        buildPlaceholders: {
            value: function (a, r, e, o) {
                if (a.language === r) {
                    var c = a.tokenStack = [];
                    a.code = a.code.replace(e, function (e) {
                        if ("function" == typeof o && !o(e)) return e;
                        for (var n, t = c.length; - 1 !== a.code.indexOf(n = v(r, t));) ++t;
                        return c[t] = e, n
                    }), a.grammar = h.languages.markup
                }
            }
        },
        tokenizePlaceholders: {
            value: function (p, k) {
                if (p.language === k && p.tokenStack) {
                    p.grammar = h.languages[k];
                    var m = 0,
                        d = Object.keys(p.tokenStack);
                    ! function e(n) {
                        for (var t = 0; t < n.length && !(m >= d.length); t++) {
                            var a = n[t];
                            if ("string" == typeof a || a.content && "string" == typeof a.content) {
                                var r = d[m],
                                    o = p.tokenStack[r],
                                    c = "string" == typeof a ? a : a.content,
                                    i = v(k, r),
                                    u = c.indexOf(i);
                                if (-1 < u) {
                                    ++m;
                                    var g = c.substring(0, u),
                                        l = new h.Token(k, h.tokenize(o, p.grammar), "language-" + k, o),
                                        s = c.substring(u + i.length),
                                        f = [];
                                    g && f.push.apply(f, e([g])), f.push(l), s && f.push.apply(f, e([s])), "string" == typeof a ? n.splice.apply(n, [t, 1].concat(f)) : a.content = f
                                }
                            } else a.content && e(a.content)
                        }
                        return n
                    }(p.tokens)
                }
            }
        }
    })
}(Prism);
! function (n) {
    for (var a = "(?!<#--)[^()\"']|\\((?:<expr>)*\\)|<#--[\\s\\S]*?-->|\"(?:[^\\\\\"]|\\\\.)*\"|'(?:[^\\\\']|\\\\.)*'", e = 0; e < 2; e++) a = a.replace(/<expr>/g, a);
    a = a.replace(/<expr>/g, "[^sS]");
    var t = {
        comment: /<#--[\s\S]*?-->/,
        string: [{
            pattern: /\br("|')(?:(?!\1)[^\\]|\\.)*\1/,
            greedy: !0
        }, {
            pattern: RegExp("(\"|')(?:(?!\\1|\\$\\{)[^\\\\]|\\\\.|\\$\\{(?:<expr>)*?\\})*\\1".replace(/<expr>/g, a)),
            greedy: !0,
            inside: {
                interpolation: {
                    pattern: RegExp("((?:^|[^\\\\])(?:\\\\\\\\)*)\\$\\{(?:<expr>)*?\\}".replace(/<expr>/g, a)),
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation"
                        },
                        rest: null
                    }
                }
            }
        }],
        keyword: /\b(?:as)\b/,
        boolean: /\b(?:true|false)\b/,
        "builtin-function": {
            pattern: /((?:^|[^?])\?\s*)\w+/,
            lookbehind: !0,
            alias: "function"
        },
        function: /\w+(?=\s*\()/,
        number: /\d+(?:\.\d+)?/,
        operator: /\.\.[<*!]?|->|--|\+\+|&&|\|\||\?{1,2}|[-+*/%!=<>]=?|\b(?:gt|gte|lt|lte)\b/,
        punctuation: /[,;.:()[\]{}]/
    };
    t.string[1].inside.interpolation.inside.rest = t, n.languages.ftl = {
        "ftl-comment": {
            pattern: /^<#--[\s\S]*/,
            alias: "comment"
        },
        "ftl-directive": {
            pattern: /^<[\s\S]+>$/,
            inside: {
                directive: {
                    pattern: /(^<\/?)[#@][a-z]\w*/i,
                    lookbehind: !0,
                    alias: "keyword"
                },
                punctuation: /^<\/?|\/?>$/,
                content: {
                    pattern: /[\s\S]*\S[\s\S]*/,
                    alias: "ftl",
                    inside: t
                }
            }
        },
        "ftl-interpolation": {
            pattern: /^\$\{[\s\S]*\}$/,
            inside: {
                punctuation: /^\$\{|\}$/,
                content: {
                    pattern: /[\s\S]*\S[\s\S]*/,
                    alias: "ftl",
                    inside: t
                }
            }
        }
    }, n.hooks.add("before-tokenize", function (e) {
        var t = RegExp("<#--[\\s\\S]*?-->|<\\/?[#@][a-zA-Z](?:<expr>)*?>|\\$\\{(?:<expr>)*?\\}".replace(/<expr>/g, a), "gi");
        n.languages["markup-templating"].buildPlaceholders(e, "ftl", t)
    }), n.hooks.add("after-tokenize", function (e) {
        n.languages["markup-templating"].tokenizePlaceholders(e, "ftl")
    })
}(Prism);
! function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var l = "line-numbers",
            c = /\n(?!$)/g,
            m = function (e) {
                var t = a(e)["white-space"];
                if ("pre-wrap" === t || "pre-line" === t) {
                    var n = e.querySelector("code"),
                        r = e.querySelector(".line-numbers-rows"),
                        s = e.querySelector(".line-numbers-sizer"),
                        i = n.textContent.split(c);
                    s || ((s = document.createElement("span")).className = "line-numbers-sizer", n.appendChild(s)), s.style.display = "block", i.forEach(function (e, t) {
                        s.textContent = e || "\n";
                        var n = s.getBoundingClientRect().height;
                        r.children[t].style.height = n + "px"
                    }), s.textContent = "", s.style.display = "none"
                }
            },
            a = function (e) {
                return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
            };
        window.addEventListener("resize", function () {
            Array.prototype.forEach.call(document.querySelectorAll("pre." + l), m)
        }), Prism.hooks.add("complete", function (e) {
            if (e.code) {
                var t = e.element,
                    n = t.parentNode;
                if (n && /pre/i.test(n.nodeName) && !t.querySelector(".line-numbers-rows")) {
                    for (var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t; i; i = i.parentNode)
                        if (s.test(i.className)) {
                            r = !0;
                            break
                        } if (r) {
                        t.className = t.className.replace(s, " "), s.test(n.className) || (n.className += " line-numbers");
                        var l, a = e.code.match(c),
                            o = a ? a.length + 1 : 1,
                            u = new Array(o + 1).join("<span></span>");
                        (l = document.createElement("span")).setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = u, n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element.appendChild(l), m(n), Prism.hooks.run("line-numbers", e)
                    }
                }
            }
        }), Prism.hooks.add("line-numbers", function (e) {
            e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
        }), Prism.plugins.lineNumbers = {
            getLine: function (e, t) {
                if ("PRE" === e.tagName && e.classList.contains(l)) {
                    var n = e.querySelector(".line-numbers-rows"),
                        r = parseInt(e.getAttribute("data-start"), 10) || 1,
                        s = r + (n.children.length - 1);
                    t < r && (t = r), s < t && (t = s);
                    var i = t - r;
                    return n.children[i]
                }
            }
        }
    }
}();
! function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var r = [],
            i = {},
            a = function () {};
        Prism.plugins.toolbar = {};
        var t = Prism.plugins.toolbar.registerButton = function (t, a) {
                var e;
                e = "function" == typeof a ? a : function (t) {
                    var e;
                    return "function" == typeof a.onClick ? ((e = document.createElement("button")).type = "button", e.addEventListener("click", function () {
                        a.onClick.call(this, t)
                    })) : "string" == typeof a.url ? (e = document.createElement("a")).href = a.url : e = document.createElement("span"), a.className && e.classList.add(a.className), e.textContent = a.text, e
                }, t in i ? console.warn('There is a button with the key "' + t + '" registered already.') : r.push(i[t] = e)
            },
            e = Prism.plugins.toolbar.hook = function (n) {
                var t = n.element.parentNode;
                if (t && /pre/i.test(t.nodeName) && !t.parentNode.classList.contains("code-toolbar")) {
                    var e = document.createElement("div");
                    e.classList.add("code-toolbar"), t.parentNode.insertBefore(e, t), e.appendChild(t);
                    var o = document.createElement("div");
                    o.classList.add("toolbar"), document.body.hasAttribute("data-toolbar-order") && (r = document.body.getAttribute("data-toolbar-order").split(",").map(function (t) {
                        return i[t] || a
                    })), r.forEach(function (t) {
                        var e = t(n);
                        if (e) {
                            var a = document.createElement("div");
                            a.classList.add("toolbar-item"), a.appendChild(e), o.appendChild(a)
                        }
                    }), e.appendChild(o)
                }
            };
        t("label", function (t) {
            var e = t.element.parentNode;
            if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
                var a, n, o = e.getAttribute("data-label");
                try {
                    n = document.querySelector("template#" + o)
                } catch (t) {}
                return n ? a = n.content : (e.hasAttribute("data-url") ? (a = document.createElement("a")).href = e.getAttribute("data-url") : a = document.createElement("span"), a.textContent = o), a
            }
        }), Prism.hooks.add("complete", e)
    }
}();
! function () {
    if ("undefined" != typeof self && self.Prism && self.document)
        if (Prism.plugins.toolbar) {
            var r = {
                html: "HTML",
                xml: "XML",
                svg: "SVG",
                mathml: "MathML",
                css: "CSS",
                clike: "C-like",
                js: "JavaScript",
                abap: "ABAP",
                abnf: "Augmented Backus–Naur form",
                antlr4: "ANTLR4",
                g4: "ANTLR4",
                apacheconf: "Apache Configuration",
                apl: "APL",
                aql: "AQL",
                arff: "ARFF",
                asciidoc: "AsciiDoc",
                adoc: "AsciiDoc",
                asm6502: "6502 Assembly",
                aspnet: "ASP.NET (C#)",
                autohotkey: "AutoHotkey",
                autoit: "AutoIt",
                shell: "Bash",
                basic: "BASIC",
                bbcode: "BBcode",
                bnf: "Backus–Naur form",
                rbnf: "Routing Backus–Naur form",
                csharp: "C#",
                cs: "C#",
                dotnet: "C#",
                cpp: "C++",
                cil: "CIL",
                coffee: "CoffeeScript",
                cmake: "CMake",
                csp: "Content-Security-Policy",
                "css-extras": "CSS Extras",
                django: "Django/Jinja2",
                jinja2: "Django/Jinja2",
                "dns-zone-file": "DNS zone file",
                "dns-zone": "DNS zone file",
                dockerfile: "Docker",
                ebnf: "Extended Backus–Naur form",
                ejs: "EJS",
                etlua: "Embedded Lua templating",
                erb: "ERB",
                fsharp: "F#",
                "firestore-security-rules": "Firestore security rules",
                ftl: "FreeMarker Template Language",
                gcode: "G-code",
                gdscript: "GDScript",
                gedcom: "GEDCOM",
                glsl: "GLSL",
                gml: "GameMaker Language",
                gamemakerlanguage: "GameMaker Language",
                graphql: "GraphQL",
                hs: "Haskell",
                hcl: "HCL",
                http: "HTTP",
                hpkp: "HTTP Public-Key-Pins",
                hsts: "HTTP Strict-Transport-Security",
                ichigojam: "IchigoJam",
                inform7: "Inform 7",
                javadoc: "JavaDoc",
                javadoclike: "JavaDoc-like",
                javastacktrace: "Java stack trace",
                jq: "JQ",
                jsdoc: "JSDoc",
                "js-extras": "JS Extras",
                "js-templates": "JS Templates",
                json: "JSON",
                jsonp: "JSONP",
                json5: "JSON5",
                latex: "LaTeX",
                tex: "TeX",
                context: "ConTeXt",
                lilypond: "LilyPond",
                ly: "LilyPond",
                emacs: "Lisp",
                elisp: "Lisp",
                "emacs-lisp": "Lisp",
                lolcode: "LOLCODE",
                md: "Markdown",
                "markup-templating": "Markup templating",
                matlab: "MATLAB",
                mel: "MEL",
                moon: "MoonScript",
                n1ql: "N1QL",
                n4js: "N4JS",
                n4jsd: "N4JS",
                "nand2tetris-hdl": "Nand To Tetris HDL",
                nasm: "NASM",
                nginx: "nginx",
                nsis: "NSIS",
                objectivec: "Objective-C",
                ocaml: "OCaml",
                opencl: "OpenCL",
                parigp: "PARI/GP",
                objectpascal: "Object Pascal",
                pcaxis: "PC-Axis",
                px: "PC-Axis",
                php: "PHP",
                phpdoc: "PHPDoc",
                "php-extras": "PHP Extras",
                plsql: "PL/SQL",
                powershell: "PowerShell",
                properties: ".properties",
                protobuf: "Protocol Buffers",
                py: "Python",
                q: "Q (kdb+ database)",
                jsx: "React JSX",
                tsx: "React TSX",
                renpy: "Ren'py",
                rest: "reST (reStructuredText)",
                robotframework: "Robot Framework",
                robot: "Robot Framework",
                rb: "Ruby",
                sas: "SAS",
                sass: "Sass (Sass)",
                scss: "Sass (Scss)",
                "shell-session": "Shell session",
                solidity: "Solidity (Ethereum)",
                soy: "Soy (Closure Template)",
                sparql: "SPARQL",
                rq: "SPARQL",
                "splunk-spl": "Splunk SPL",
                sqf: "SQF: Status Quo Function (Arma 3)",
                sql: "SQL",
                tap: "TAP",
                toml: "TOML",
                tt2: "Template Toolkit 2",
                trig: "TriG",
                ts: "TypeScript",
                "t4-cs": "T4 Text Templates (C#)",
                t4: "T4 Text Templates (C#)",
                "t4-vb": "T4 Text Templates (VB)",
                "t4-templating": "T4 templating",
                vbnet: "VB.Net",
                vhdl: "VHDL",
                vim: "vim",
                "visual-basic": "Visual Basic",
                vb: "Visual Basic",
                wasm: "WebAssembly",
                wiki: "Wiki markup",
                xeoracube: "XeoraCube",
                xojo: "Xojo (REALbasic)",
                xquery: "XQuery",
                yaml: "YAML",
                yml: "YAML"
            };
            Prism.plugins.toolbar.registerButton("show-language", function (e) {
                var a = e.element.parentNode;
                if (a && /pre/i.test(a.nodeName)) {
                    var s, t = a.getAttribute("data-language") || r[e.language] || ((s = e.language) ? (s.substring(0, 1).toUpperCase() + s.substring(1)).replace(/s(?=cript)/, "S") : s);
                    if (t) {
                        var o = document.createElement("span");
                        return o.textContent = t, o
                    }
                }
            })
        } else console.warn("Show Languages plugin loaded before Toolbar plugin.")
}();
"undefined" != typeof self && !self.Prism || "undefined" != typeof global && !global.Prism || Prism.hooks.add("wrap", function (e) {
    "keyword" === e.type && e.classes.push("keyword-" + e.content)
});
! function () {
    if ("undefined" != typeof self && "undefined" != typeof Prism && "undefined" != typeof document) {
        var i = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
            t = /^#?(?=(?:[\da-f]{1,2}){3,4}$)([\da-f][\da-f]?)([\da-f][\da-f]?)([\da-f][\da-f]?)([\da-f][\da-f]?)?$/i,
            d = [function (n) {
                var e = t.exec(n);
                if (e) {
                    var o = n.length <= 4 ? 1 / 15 : 1 / 255;
                    return "rgba(" + e.slice(1, 4).map(function (n) {
                        return String(Math.round(parseInt(n, 16) * o * 255))
                    }).join(",") + "," + (void 0 === e[4] ? "1" : (parseInt(e[4], 16) * o).toFixed(3)) + ")"
                }
            }, function (n) {
                var e = (new Option).style;
                return e.color = n, e.color ? n : void 0
            }];
        Prism.hooks.add("wrap", function (n) {
            if ("color" === n.type || "hexcode" === n.type) {
                for (var e, o = n.content, t = o.split(i).join(""), r = 0, a = d.length; r < a && !e; r++) e = d[r](t);
                if (!e) return;
                var f = '<span class="inline-color" style="background-color:' + e + ';"></span>';
                n.content = f + o
            }
        })
    }
}();
"undefined" != typeof self && self.Prism && self.document && Prism.languages.markup && (Prism.plugins.UnescapedMarkup = !0, Prism.hooks.add("before-highlightall", function (e) {
    e.selector += ", [class*='lang-'] script[type='text/plain'], [class*='language-'] script[type='text/plain'], script[type='text/plain'][class*='lang-'], script[type='text/plain'][class*='language-']"
}), Prism.hooks.add("before-sanity-check", function (t) {
    if ((t.element.matches || t.element.msMatchesSelector).call(t.element, "script[type='text/plain']")) {
        var e = document.createElement("code");
        return (a = document.createElement("pre")).className = e.className = t.element.className, t.element.dataset && Object.keys(t.element.dataset).forEach(function (e) {
            Object.prototype.hasOwnProperty.call(t.element.dataset, e) && (a.dataset[e] = t.element.dataset[e])
        }), t.code = t.code.replace(/&lt;\/script(>|&gt;)/gi, "<\/script>"), e.textContent = t.code, a.appendChild(e), t.element.parentNode.replaceChild(a, t.element), void(t.element = e)
    }
    var a = t.element.parentNode;
    !t.code && a && "pre" == a.nodeName.toLowerCase() && t.element.childNodes.length && "#comment" == t.element.childNodes[0].nodeName && (t.element.textContent = t.code = t.element.childNodes[0].textContent)
}));
! function () {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var r = {
                pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/,
                lookbehind: !0,
                inside: {
                    "language-css": {
                        pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/,
                        lookbehind: !0
                    },
                    "language-javascript": {
                        pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/,
                        lookbehind: !0
                    },
                    "language-json": {
                        pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/,
                        lookbehind: !0
                    },
                    "language-markup": {
                        pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/,
                        lookbehind: !0
                    }
                }
            },
            e = ["url", "attr-value", "string"];
        Prism.plugins.dataURIHighlight = {
            processGrammar: function (i) {
                i && !i["data-uri"] && (Prism.languages.DFS(i, function (i, a, n) {
                    -1 < e.indexOf(n) && !Array.isArray(a) && (a.pattern || (a = this[i] = {
                        pattern: a
                    }), a.inside = a.inside || {}, "attr-value" == n ? Prism.languages.insertBefore("inside", a.inside["url-link"] ? "url-link" : "punctuation", {
                        "data-uri": r
                    }, a) : a.inside["url-link"] ? Prism.languages.insertBefore("inside", "url-link", {
                        "data-uri": r
                    }, a) : a.inside["data-uri"] = r)
                }), i["data-uri"] = r)
            }
        }, Prism.hooks.add("before-highlight", function (i) {
            if (r.pattern.test(i.code))
                for (var a in r.inside)
                    if (r.inside.hasOwnProperty(a) && !r.inside[a].inside && r.inside[a].pattern.test(i.code)) {
                        var n = a.match(/^language-(.+)/)[1];
                        Prism.languages[n] && (r.inside[a].inside = {
                            rest: (e = Prism.languages[n], Prism.plugins.autolinker && Prism.plugins.autolinker.processGrammar(e), e)
                        })
                    } var e;
            Prism.plugins.dataURIHighlight.processGrammar(i.grammar)
        })
    }
}();
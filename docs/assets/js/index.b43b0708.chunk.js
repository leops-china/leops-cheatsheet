;(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  [
    ,
    ,
    ,
    ,
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    function(e, t, n) {},
    ,
    ,
    function(e) {
      e.exports = JSON.parse(
        '{"javascript":"clike","actionscript":"javascript","arduino":"cpp","aspnet":["markup","csharp"],"bison":"c","c":"clike","csharp":"clike","cpp":"c","coffeescript":"javascript","crystal":"ruby","css-extras":"css","d":"clike","dart":"clike","django":"markup","erb":["ruby","markup-templating"],"fsharp":"clike","flow":"javascript","glsl":"clike","go":"clike","groovy":"clike","haml":"ruby","handlebars":"markup-templating","haxe":"clike","java":"clike","jolie":"clike","kotlin":"clike","less":"css","markdown":"markup","markup-templating":"markup","n4js":"javascript","nginx":"clike","objectivec":"c","opencl":"cpp","parser":"markup","php":["clike","markup-templating"],"php-extras":"php","plsql":"sql","processing":"clike","protobuf":"clike","pug":"javascript","qore":"clike","jsx":["markup","javascript"],"tsx":["jsx","typescript"],"reason":"clike","ruby":"clike","sass":"css","scss":"css","scala":"java","smarty":"markup-templating","soy":"markup-templating","swift":"clike","tap":"yaml","textile":"markup","tt2":["clike","markup-templating"],"twig":"markup","typescript":"javascript","vbnet":"basic","velocity":"markup","wiki":"markup","xeora":"markup","xquery":"markup","builtin":["markup","xml","html","mathml","svg","css","clike","javascript","js"]}'
      )
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(e, t, n) {
      e.exports = n(69)
    },
    ,
    ,
    ,
    ,
    function(e, t, n) {
      'use strict'
      const r = n(4)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(5)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(6)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(7)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(8)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(9)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(10)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(11)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(12)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(13)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(14)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(15)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(16)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(17)
      n.n(r).a
    },
    ,
    function(e, t, n) {
      'use strict'
      const r = n(18)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(19)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(20)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(21)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(22)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(23)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(24)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(25)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(26)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      const r = n(27)
      n.n(r).a
    },
    function(e, t, n) {
      'use strict'
      n.r(t)
      const r = n(28)
      const i = n.n(r)
      const s = n(1)
      const o = n(34)
      const a = {
        name: 'InjectedComponents',
        functional: !0,
        props: {position: {type: String, required: !0}},
        render(e, t) {
          const n = t.props
          const r = t.parent.$pluginApi.getComponents(n.position)
          if (r.length !== 0)
            return e(
              'div',
              {
                class: 'InjectedComponents',
                attrs: {'data-position': n.position}
              },
              r.map(t => {
                const n = t.component
                const r = t.props
                return e(n, {props: r})
              })
            )
        }
      }
      const l = (function() {
        function e() {
          this.hooks = {}
        }
        const t = e.prototype
        return (
          (t.add = function(e, t) {
            return (
              (this.hooks[e] = this.hooks[e] || []), this.hooks[e].push(t), this
            )
          }),
          (t.invoke = function(e) {
            for (
              var t = this.hooks[e] || [],
                n = arguments.length,
                r = new Array(n > 1 ? n - 1 : 0),
                i = 1;
              i < n;
              i++
            )
              r[i - 1] = arguments[i]
            let s = t
            const o = Array.isArray(s)
            let a = 0
            for (s = o ? s : s[Symbol.iterator](); ; ) {
              var l
              if (o) {
                if (a >= s.length) break
                l = s[a++]
              } else {
                if ((a = s.next()).done) break
                l = a.value
              }
              const c = l
              c.apply(void 0, r)
            }
            return this
          }),
          (t.process = function(e, t) {
            let n = this.hooks[e] || []
            const r = Array.isArray(n)
            let i = 0
            for (n = r ? n : n[Symbol.iterator](); ; ) {
              var s
              if (r) {
                if (i >= n.length) break
                s = n[i++]
              } else {
                if ((i = n.next()).done) break
                s = i.value
              }
              t = s(t) || t
            }
            return t
          }),
          (t.processPromise = function(e, t) {
            try {
              return (function(e, t) {
                return e && e.then ? e.then(t) : t(e)
              })(
                (function(e, t, n) {
                  if (typeof e[c] === 'function') {
                    let r
                    let i
                    let s
                    const o = e[c]()
                    if (
                      ((function e(a) {
                        try {
                          for (; !(r = o.next()).done && (!n || !n()); )
                            if ((a = t(r.value)) && a.then) {
                              if (!p(a))
                                return void a.then(
                                  e,
                                  s || (s = u.bind(null, (i = new h()), 2))
                                )
                              a = a.v
                            }
                          i ? u(i, 1, a) : (i = a)
                        } catch (l) {
                          u(i || (i = new h()), 2, l)
                        }
                      })(),
                      o.return)
                    ) {
                      const a = function(e) {
                        try {
                          r.done || o.return()
                        } catch (t) {}
                        return e
                      }
                      if (i && i.then)
                        return i.then(a, e => {
                          throw a(e)
                        })
                      a()
                    }
                    return i
                  }
                  if (!('length' in e))
                    throw new TypeError('Object is not iterable')
                  for (var l = [], d = 0; d < e.length; d++) l.push(e[d])
                  return (function(e, t, n) {
                    let r
                    let i
                    let s = -1
                    return (
                      (function o(a) {
                        try {
                          for (; ++s < e.length && (!n || !n()); )
                            if ((a = t(s)) && a.then) {
                              if (!p(a))
                                return void a.then(
                                  o,
                                  i || (i = u.bind(null, (r = new h()), 2))
                                )
                              a = a.v
                            }
                          r ? u(r, 1, a) : (r = a)
                        } catch (l) {
                          u(r || (r = new h()), 2, l)
                        }
                      })(),
                      r
                    )
                  })(
                    l,
                    e => {
                      return t(l[e])
                    },
                    n
                  )
                })(this.hooks[e] || [], e => {
                  return (
                    (n = e(t)),
                    (r = function(e) {
                      t = e || t
                    }),
                    i
                      ? r
                        ? r(n)
                        : n
                      : ((n && n.then) || (n = Promise.resolve(n)),
                        r ? n.then(r) : n)
                  )
                  let n
                  let r
                  let i
                }),
                () => {
                  return t
                }
              )
            } catch (n) {
              return Promise.reject(n)
            }
          }),
          e
        )
      })()
      var c =
        typeof Symbol !== 'undefined'
          ? Symbol.iterator || (Symbol.iterator = Symbol('Symbol.iterator'))
          : '@@iterator'
      function u(e, t, n) {
        if (!e.s) {
          if (n instanceof h) {
            if (!n.s) return void (n.o = u.bind(null, e, t))
            1 & t && (t = n.s), (n = n.v)
          }
          if (n && n.then)
            return void n.then(u.bind(null, e, t), u.bind(null, e, 2));
(e.s = t), (e.v = n)
          const r = e.o
          r && r(e)
        }
      }
      var h = (function() {
        function e() {}
        return (
          (e.prototype.then = function(t, n) {
            const r = new e()
            const i = this.s
            if (i) {
              const s = 1 & i ? t : n
              if (s) {
                try {
                  u(r, 1, s(this.v))
                } catch (o) {
                  u(r, 2, o)
                }
                return r
              }
              return this
            }
            return (
              (this.o = function(e) {
                try {
                  const i = e.v
                  1 & e.s
                    ? u(r, 1, t ? t(i) : i)
                    : n
                    ? u(r, 1, n(i))
                    : u(r, 2, i)
                } catch (o) {
                  u(r, 2, o)
                }
              }),
              r
            )
          }),
          e
        )
      })()
      function p(e) {
        return e instanceof h && 1 & e.s
      }
      const d = new l()
      const g = (function() {
        function e(e) {
          const t = e.plugins
          const n = e.store
          const r = e.router
          ;(this.plugins = t),
            (this.store = n),
            (this.router = r),
            (this.components = {}),
            (this.hooks = d),
            (this.search = {}),
            s.a.component(a.name, a)
        }
        const t = e.prototype
        return (
          (t.hasPlugin = function(e) {
            return (
              this.plugins.filter(t => {
                return t.name === e
              }).length > 0
            )
          }),
          (t.registerComponent = function(e, t, n) {
            return (
              (this.components[e] = this.components[e] || []),
              this.components[e].push({component: t, props: n}),
              this
            )
          }),
          (t.getComponents = function(e) {
            return this.components[e] || []
          }),
          (t.processMarkdown = function(e) {
            return this.hooks.add('processMarkdown', e), this
          }),
          (t.processHTML = function(e) {
            return this.hooks.add('processHTML', e), this
          }),
          (t.extendMarkedRenderer = function(e) {
            return this.hooks.add('extendMarkedRenderer', e), this
          }),
          (t.onContentUpdated = function(e) {
            return this.hooks.add('onContentUpdated', e), this
          }),
          (t.extendMarkdownComponent = function(e) {
            return this.hooks.add('extendMarkdownComponent', e), this
          }),
          (t.enableSearch = function(e) {
            return (
              void 0 === e && (e = {}),
              (this.search = e),
              (this.search.enabled = !0),
              this
            )
          }),
          e
        )
      })()
      const f = {
        name: 'DocuteRoot',
        render(e) {
          return e(
            'div',
            {attrs: {id: this.$store.getters.target, class: 'Root'}},
            [e('router-view')]
          )
        },
        created() {
          this.insertStyle()
        },
        computed: {
          css() {
            const e = this.$store.getters.cssVariables
            return (
              ':root{' +
              Object.keys(e).reduce((t, n) => {
                return (t +=
                  '--' +
                  n.replace(/[A-Z]/g, e => {
                    return '-' + e.toLowerCase()
                  }) +
                  ':' +
                  e[n] +
                  ';')
              }, '') +
              '}'
            )
          }
        },
        watch: {
          css() {
            this.insertStyle()
          }
        },
        methods: {
          insertStyle() {
            if (this.$ssrContext) this.$ssrContext.insertedStyle = this.css
            else {
              const e = 'docute-inserted-style'
              let t = document.getElementById(e)
              t
                ? (t.innerHTML = this.css)
                : (((t = document.createElement('style')).id = e),
                  (t.innerHTML = this.css),
                  document.head.insertBefore(t, document.head.firstChild))
            }
          }
        }
      }
      const m = (n(44), n(0))
      const v = new Object(m.a)(f, void 0, void 0, !1, null, null, null).exports
      const k = n(3)
      const b = function(e) {
        if (e)
          try {
            e = new Function('return ' + e)()
          } catch (t) {
            console.error(
              "You're using invalid options for code fences, it must be JSON or JS object!\n" +
                t.message
            )
          }
        return e || {}
      }
      const x = /\.md$/
      const y = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: $,
        hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
        nptable: $,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html:
          '^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$))',
        def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
        table: $,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
        text: /^[^\n]+/
      }
      function C(e) {
        ;(this.tokens = []),
          (this.tokens.links = Object.create(null)),
          (this.options = e || Z.defaults),
          (this.rules = y.normal),
          this.options.pedantic
            ? (this.rules = y.pedantic)
            : this.options.gfm &&
              (this.options.tables
                ? (this.rules = y.tables)
                : (this.rules = y.gfm))
      }
      ;(y._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/),
        (y._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/),
        (y.def = T(y.def)
          .replace('label', y._label)
          .replace('title', y._title)
          .getRegex()),
        (y.bullet = /(?:[*+-]|\d+\.)/),
        (y.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/),
        (y.item = T(y.item, 'gm')
          .replace(/bull/g, y.bullet)
          .getRegex()),
        (y.list = T(y.list)
          .replace(/bull/g, y.bullet)
          .replace(
            'hr',
            '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))'
          )
          .replace('def', '\\n+(?=' + y.def.source + ')')
          .getRegex()),
        (y._tag =
          'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
        (y._comment = /<!--(?!-?>)[\s\S]*?-->/),
        (y.html = T(y.html, 'i')
          .replace('comment', y._comment)
          .replace('tag', y._tag)
          .replace(
            'attribute',
            / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
          )
          .getRegex()),
        (y.paragraph = T(y.paragraph)
          .replace('hr', y.hr)
          .replace('heading', y.heading)
          .replace('lheading', y.lheading)
          .replace('tag', y._tag)
          .getRegex()),
        (y.blockquote = T(y.blockquote)
          .replace('paragraph', y.paragraph)
          .getRegex()),
        (y.normal = M({}, y)),
        (y.gfm = M({}, y.normal, {
          fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *({.+})?\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
          paragraph: /^/,
          heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
        })),
        (y.gfm.paragraph = T(y.paragraph)
          .replace(
            '(?!',
            '(?!' +
              y.gfm.fences.source.replace('\\1', '\\2') +
              '|' +
              y.list.source.replace('\\1', '\\3') +
              '|'
          )
          .getRegex()),
        (y.tables = M({}, y.gfm, {
          nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
          table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
        })),
        (y.pedantic = M({}, y.normal, {
          html: T(
            '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
          )
            .replace('comment', y._comment)
            .replace(
              /tag/g,
              '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
            )
            .getRegex(),
          def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/
        })),
        (C.rules = y),
        (C.lex = function(e, t) {
          return new C(t).lex(e)
        }),
        (C.prototype.lex = function(e) {
          return (
            (e = e
              .replace(/\r\n|\r/g, '\n')
              .replace(/\t/g, '    ')
              .replace(/\u00a0/g, ' ')
              .replace(/\u2424/g, '\n')),
            this.token(e, !0)
          )
        }),
        (C.prototype.token = function(e, t) {
          let n
          let r
          let i
          let s
          let o
          let a
          let l
          let c
          let u
          let h
          let p
          let d
          let g
          let f
          let m
          let v
          for (e = e.replace(/^ +$/gm, ''); e; )
            if (
              ((i = this.rules.newline.exec(e)) &&
                ((e = e.substring(i[0].length)),
                i[0].length > 1 && this.tokens.push({type: 'space'})),
              (i = this.rules.code.exec(e)))
            )
              (e = e.substring(i[0].length)),
                (i = i[0].replace(/^ {4}/gm, '')),
                this.tokens.push({
                  type: 'code',
                  text: this.options.pedantic ? i : P(i, '\n')
                })
            else if ((i = this.rules.fences.exec(e)))
              (e = e.substring(i[0].length)),
                this.tokens.push({
                  type: 'code',
                  lang: i[2],
                  text: i[4] || '',
                  opts: b(i[3])
                })
            else if ((i = this.rules.heading.exec(e)))
              (e = e.substring(i[0].length)),
                this.tokens.push({
                  type: 'heading',
                  depth: i[1].length,
                  text: i[2]
                })
            else if (
              t &&
              (i = this.rules.nptable.exec(e)) &&
              (a = {
                type: 'table',
                header: B(i[1].replace(/^ *| *\| *$/g, '')),
                align: i[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                cells: i[3] ? i[3].replace(/\n$/, '').split('\n') : []
              }).header.length === a.align.length
            ) {
              for (e = e.substring(i[0].length), p = 0; p < a.align.length; p++)
                /^ *-+: *$/.test(a.align[p])
                  ? (a.align[p] = 'right')
                  : /^ *:-+: *$/.test(a.align[p])
                  ? (a.align[p] = 'center')
                  : /^ *:-+ *$/.test(a.align[p])
                  ? (a.align[p] = 'left')
                  : (a.align[p] = null)
              for (p = 0; p < a.cells.length; p++)
                a.cells[p] = B(a.cells[p], a.header.length)
              this.tokens.push(a)
            } else if ((i = this.rules.hr.exec(e)))
              (e = e.substring(i[0].length)), this.tokens.push({type: 'hr'})
            else if ((i = this.rules.blockquote.exec(e)))
              (e = e.substring(i[0].length)),
                this.tokens.push({type: 'blockquote_start'}),
                (i = i[0].replace(/^ *> ?/gm, '')),
                this.token(i, t),
                this.tokens.push({type: 'blockquote_end'})
            else if ((i = this.rules.list.exec(e))) {
              for (
                e = e.substring(i[0].length),
                  l = {
                    type: 'list_start',
                    ordered: (f = (s = i[2]).length > 1),
                    start: f ? Number(s) : '',
                    loose: !1
                  },
                  this.tokens.push(l),
                  c = [],
                  n = !1,
                  g = (i = i[0].match(this.rules.item)).length,
                  p = 0;
                p < g;
                p++
              )
                (h = (a = i[p]).length),
                  ~(a = a.replace(/^ *([*+-]|\d+\.) +/, '')).indexOf('\n ') &&
                    ((h -= a.length),
                    (a = this.options.pedantic
                      ? a.replace(/^ {1,4}/gm, '')
                      : a.replace(new RegExp('^ {1,' + h + '}', 'gm'), ''))),
                  this.options.smartLists &&
                    p !== g - 1 &&
                    (s === (o = y.bullet.exec(i[p + 1])[0]) ||
                      (s.length > 1 && o.length > 1) ||
                      ((e = i.slice(p + 1).join('\n') + e), (p = g - 1))),
                  (r = n || /\n\n(?!\s*$)/.test(a)),
                  p !== g - 1 &&
                    ((n = a.charAt(a.length - 1) === '\n'), r || (r = n)),
                  r && (l.loose = !0),
                  (v = void 0),
                  (m = /^\[[ xX]\] /.test(a)) &&
                    ((v = a[1] !== ' '), (a = a.replace(/^\[[ xX]\] +/, ''))),
                  (u = {
                    type: 'list_item_start',
                    task: m,
                    checked: v,
                    loose: r
                  }),
                  c.push(u),
                  this.tokens.push(u),
                  this.token(a, !1),
                  this.tokens.push({type: 'list_item_end'})
              if (l.loose) for (g = c.length, p = 0; p < g; p++) c[p].loose = !0
              this.tokens.push({type: 'list_end'})
            } else if ((i = this.rules.html.exec(e)))
              (e = e.substring(i[0].length)),
                this.tokens.push({
                  type: this.options.sanitize ? 'paragraph' : 'html',
                  pre:
                    !this.options.sanitizer &&
                    (i[1] === 'pre' || i[1] === 'script' || i[1] === 'style'),
                  text: i[0]
                })
            else if (t && (i = this.rules.def.exec(e)))
              (e = e.substring(i[0].length)),
                i[3] && (i[3] = i[3].substring(1, i[3].length - 1)),
                (d = i[1].toLowerCase().replace(/\s+/g, ' ')),
                this.tokens.links[d] ||
                  (this.tokens.links[d] = {href: i[2], title: i[3]})
            else if (
              t &&
              (i = this.rules.table.exec(e)) &&
              (a = {
                type: 'table',
                header: B(i[1].replace(/^ *| *\| *$/g, '')),
                align: i[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                cells: i[3]
                  ? i[3].replace(/(?: *\| *)?\n$/, '').split('\n')
                  : []
              }).header.length === a.align.length
            ) {
              for (e = e.substring(i[0].length), p = 0; p < a.align.length; p++)
                /^ *-+: *$/.test(a.align[p])
                  ? (a.align[p] = 'right')
                  : /^ *:-+: *$/.test(a.align[p])
                  ? (a.align[p] = 'center')
                  : /^ *:-+ *$/.test(a.align[p])
                  ? (a.align[p] = 'left')
                  : (a.align[p] = null)
              for (p = 0; p < a.cells.length; p++)
                a.cells[p] = B(
                  a.cells[p].replace(/^ *\| *| *\| *$/g, ''),
                  a.header.length
                )
              this.tokens.push(a)
            } else if ((i = this.rules.lheading.exec(e)))
              (e = e.substring(i[0].length)),
                this.tokens.push({
                  type: 'heading',
                  depth: i[2] === '=' ? 1 : 2,
                  text: i[1]
                })
            else if (t && (i = this.rules.paragraph.exec(e)))
              (e = e.substring(i[0].length)),
                this.tokens.push({
                  type: 'paragraph',
                  text:
                    i[1].charAt(i[1].length - 1) === '\n'
                      ? i[1].slice(0, -1)
                      : i[1]
                })
            else if ((i = this.rules.text.exec(e)))
              (e = e.substring(i[0].length)),
                this.tokens.push({type: 'text', text: i[0]})
            else if (e)
              throw new Error('Infinite loop on byte: ' + e.charCodeAt(0))
          return this.tokens
        })
      const w = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\u0000-\u001f<>]*|email)>/,
        url: $,
        tag:
          '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
        link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
        nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
        strong: /^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
        em: /^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: $,
        text: /^(`+|[^`])[\s\S]*?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
      }
      function _(e, t) {
        if (
          ((this.options = t || Z.defaults),
          (this.links = e),
          (this.rules = w.normal),
          (this.renderer = this.options.renderer || new A()),
          (this.renderer.options = this.options),
          !this.links)
        )
          throw new Error('Tokens array requires a `links` property.')
        this.options.pedantic
          ? (this.rules = w.pedantic)
          : this.options.gfm &&
            (this.options.breaks
              ? (this.rules = w.breaks)
              : (this.rules = w.gfm))
      }
      function A(e) {
        this.options = e || Z.defaults
      }
      function S() {}
      function I(e) {
        ;(this.tokens = []),
          (this.token = null),
          (this.options = e || Z.defaults),
          (this.options.renderer = this.options.renderer || new A()),
          (this.renderer = this.options.renderer),
          (this.renderer.options = this.options)
      }
      function L(e, t) {
        if (t) {
          if (L.escapeTest.test(e))
            return e.replace(L.escapeReplace, e => {
              return L.replacements[e]
            })
        } else if (L.escapeTestNoEncode.test(e))
          return e.replace(L.escapeReplaceNoEncode, e => {
            return L.replacements[e]
          })
        return e
      }
      function j(e) {
        return e.replace(
          /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
          (e, t) => {
            return (t = t.toLowerCase()) === 'colon'
              ? ':'
              : t.charAt(0) === '#'
              ? t.charAt(1) === 'x'
                ? String.fromCharCode(parseInt(t.substring(2), 16))
                : String.fromCharCode(Number(t.substring(1)))
              : ''
          }
        )
      }
      function T(e, t) {
        return (
          (e = e.source || e),
          (t = t || ''),
          {
            replace(t, n) {
              return (
                (n = (n = n.source || n).replace(/(^|[^\[])\^/g, '$1')),
                (e = e.replace(t, n)),
                this
              )
            },
            getRegex() {
              return new RegExp(e, t)
            }
          }
        )
      }
      function O(e, t) {
        return (
          E[' ' + e] ||
            (/^[^:]+:\/*[^/]*$/.test(e)
              ? (E[' ' + e] = e + '/')
              : (E[' ' + e] = P(e, '/', !0))),
          (e = E[' ' + e]),
          t.slice(0, 2) === '//'
            ? e.replace(/:[\s\S]*/, ':') + t
            : t.charAt(0) === '/'
            ? e.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + t
            : e + t
        )
      }
      ;(w._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
        (w._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
        (w._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
        (w.autolink = T(w.autolink)
          .replace('scheme', w._scheme)
          .replace('email', w._email)
          .getRegex()),
        (w._attribute = /\s+[a-zA-Z@:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
        (w.tag = T(w.tag)
          .replace('comment', y._comment)
          .replace('attribute', w._attribute)
          .getRegex()),
        (w._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/),
        (w._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\u0000-\u001f\\]*\)|[^\s\u0000-\u001f()\\])*?)/),
        (w._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
        (w.link = T(w.link)
          .replace('label', w._label)
          .replace('href', w._href)
          .replace('title', w._title)
          .getRegex()),
        (w.reflink = T(w.reflink)
          .replace('label', w._label)
          .getRegex()),
        (w.normal = M({}, w)),
        (w.pedantic = M({}, w.normal, {
          strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
          link: T(/^!?\[(label)\]\((.*?)\)/)
            .replace('label', w._label)
            .getRegex(),
          reflink: T(/^!?\[(label)\]\s*\[([^\]]*)\]/)
            .replace('label', w._label)
            .getRegex()
        })),
        (w.gfm = M({}, w.normal, {
          escape: T(w.escape)
            .replace('])', '~|])')
            .getRegex(),
          _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
          url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
          _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
          del: /^~+(?=\S)([\s\S]*?\S)~+/,
          text: T(w.text)
            .replace(']|', '~]|')
            .replace(
              '|$',
              "|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|$"
            )
            .getRegex()
        })),
        (w.gfm.url = T(w.gfm.url)
          .replace('email', w.gfm._extended_email)
          .getRegex()),
        (w.breaks = M({}, w.gfm, {
          br: T(w.br)
            .replace('{2,}', '*')
            .getRegex(),
          text: T(w.gfm.text)
            .replace('{2,}', '*')
            .getRegex()
        })),
        (_.rules = w),
        (_.output = function(e, t, n) {
          return new _(t, n).output(e)
        }),
        (_.prototype.output = function(e) {
          for (var t, n, r, i, s, o, a = ''; e; )
            if ((s = this.rules.escape.exec(e)))
              (e = e.substring(s[0].length)), (a += s[1])
            else if ((s = this.rules.autolink.exec(e)))
              (e = e.substring(s[0].length)),
                (r =
                  s[2] === '@'
                    ? 'mailto:' + (n = L(this.mangle(s[1])))
                    : (n = L(s[1]))),
                (a += this.renderer.link(r, null, n))
            else if (this.inLink || !(s = this.rules.url.exec(e))) {
              if ((s = this.rules.tag.exec(e)))
                !this.inLink && /^<a /i.test(s[0])
                  ? (this.inLink = !0)
                  : this.inLink && /^<\/a>/i.test(s[0]) && (this.inLink = !1),
                  !this.inRawBlock &&
                  /^<(pre|code|kbd|script)(\s|>)/i.test(s[0])
                    ? (this.inRawBlock = !0)
                    : this.inRawBlock &&
                      /^<\/(pre|code|kbd|script)(\s|>)/i.test(s[0]) &&
                      (this.inRawBlock = !1),
                  (e = e.substring(s[0].length)),
                  (a += this.options.sanitize
                    ? this.options.sanitizer
                      ? this.options.sanitizer(s[0])
                      : L(s[0])
                    : s[0])
              else if ((s = this.rules.link.exec(e)))
                (e = e.substring(s[0].length)),
                  (this.inLink = !0),
                  (r = s[2]),
                  this.options.pedantic
                    ? (t = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))
                      ? ((r = t[1]), (i = t[3]))
                      : (i = '')
                    : (i = s[3] ? s[3].slice(1, -1) : ''),
                  (r = r.trim().replace(/^<([\s\S]*)>$/, '$1')),
                  (a += this.outputLink(s, {
                    href: _.escapes(r),
                    title: _.escapes(i)
                  })),
                  (this.inLink = !1)
              else if (
                (s = this.rules.reflink.exec(e)) ||
                (s = this.rules.nolink.exec(e))
              ) {
                if (
                  ((e = e.substring(s[0].length)),
                  (t = (s[2] || s[1]).replace(/\s+/g, ' ')),
                  !(t = this.links[t.toLowerCase()]) || !t.href)
                ) {
                  ;(a += s[0].charAt(0)), (e = s[0].substring(1) + e)
                  continue
                }
                ;(this.inLink = !0),
                  (a += this.outputLink(s, t)),
                  (this.inLink = !1)
              } else if ((s = this.rules.strong.exec(e)))
                (e = e.substring(s[0].length)),
                  (a += this.renderer.strong(
                    this.output(s[4] || s[3] || s[2] || s[1])
                  ))
              else if ((s = this.rules.em.exec(e)))
                (e = e.substring(s[0].length)),
                  (a += this.renderer.em(
                    this.output(s[6] || s[5] || s[4] || s[3] || s[2] || s[1])
                  ))
              else if ((s = this.rules.code.exec(e)))
                (e = e.substring(s[0].length)),
                  (a += this.renderer.codespan(L(s[2].trim(), !0)))
              else if ((s = this.rules.br.exec(e)))
                (e = e.substring(s[0].length)), (a += this.renderer.br())
              else if ((s = this.rules.del.exec(e)))
                (e = e.substring(s[0].length)),
                  (a += this.renderer.del(this.output(s[1])))
              else if ((s = this.rules.text.exec(e)))
                (e = e.substring(s[0].length)),
                  this.inRawBlock
                    ? (a += this.renderer.text(s[0]))
                    : (a += this.renderer.text(L(this.smartypants(s[0]))))
              else if (e)
                throw new Error('Infinite loop on byte: ' + e.charCodeAt(0))
            } else {
              if (s[2] === '@') r = 'mailto:' + (n = L(s[0]))
              else {
                do {
                  ;(o = s[0]), (s[0] = this.rules._backpedal.exec(s[0])[0])
                } while (o !== s[0]);
(n = L(s[0])), (r = s[1] === 'www.' ? 'http://' + n : n)
              }
              ;(e = e.substring(s[0].length)),
                (a += this.renderer.link(r, null, n))
            }
          return a
        }),
        (_.escapes = function(e) {
          return e ? e.replace(_.rules._escapes, '$1') : e
        }),
        (_.prototype.outputLink = function(e, t) {
          const n = t.href
          const r = t.title ? L(t.title) : null
          return e[0].charAt(0) !== '!'
            ? this.renderer.link(n, r, this.output(e[1]))
            : this.renderer.image(n, r, L(e[1]))
        }),
        (_.prototype.smartypants = function(e) {
          return this.options.smartypants
            ? e
                .replace(/---/g, '\u2014')
                .replace(/--/g, '\u2013')
                .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
                .replace(/'/g, '\u2019')
                .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201C')
                .replace(/"/g, '\u201D')
                .replace(/\.{3}/g, '\u2026')
            : e
        }),
        (_.prototype.mangle = function(e) {
          if (!this.options.mangle) return e
          for (var t, n = '', r = e.length, i = 0; i < r; i++)
            (t = e.charCodeAt(i)),
              Math.random() > 0.5 && (t = 'x' + t.toString(16)),
              (n += '&#' + t + ';')
          return n
        }),
        (A.prototype.code = function(e, t, n) {
          if (this.options.highlight) {
            const r = this.options.highlight(e, t)
            r != null && r !== e && ((n = !0), (e = r))
          }
          return t
            ? '<pre><code class="' +
                this.options.langPrefix +
                L(t, !0) +
                '">' +
                (n ? e : L(e, !0)) +
                '</code></pre>\n'
            : '<pre><code>' + (n ? e : L(e, !0)) + '</code></pre>'
        }),
        (A.prototype.blockquote = function(e) {
          return '<blockquote>\n' + e + '</blockquote>\n'
        }),
        (A.prototype.html = function(e) {
          return e
        }),
        (A.prototype.heading = function(e, t, n) {
          return this.options.headerIds
            ? '<h' +
                t +
                ' id="' +
                this.options.headerPrefix +
                n.toLowerCase().replace(/[^\w]+/g, '-') +
                '">' +
                e +
                '</h' +
                t +
                '>\n'
            : '<h' + t + '>' + e + '</h' + t + '>\n'
        }),
        (A.prototype.hr = function() {
          return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
        }),
        (A.prototype.list = function(e, t, n, r) {
          const i = t ? 'ol' : 'ul'
          return (
            '<' +
            i +
            (t && n !== 1 ? ' start="' + n + '"' : '') +
            (r ? ' class="contains-task-list"' : '') +
            '>\n' +
            e +
            '</' +
            i +
            '>\n'
          )
        }),
        (A.prototype.listitem = function(e, t) {
          return (
            '<li' + (t ? ' class="task-list-item"' : '') + '>' + e + '</li>\n'
          )
        }),
        (A.prototype.checkbox = function(e) {
          return (
            '<input ' +
            (e ? 'checked="" ' : '') +
            'disabled="" type="checkbox"' +
            (this.options.xhtml ? ' /' : '') +
            '> '
          )
        }),
        (A.prototype.paragraph = function(e) {
          return '<p>' + e + '</p>\n'
        }),
        (A.prototype.table = function(e, t) {
          return (
            t && (t = '<tbody>' + t + '</tbody>'),
            '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
          )
        }),
        (A.prototype.tablerow = function(e) {
          return '<tr>\n' + e + '</tr>\n'
        }),
        (A.prototype.tablecell = function(e, t) {
          const n = t.header ? 'th' : 'td'
          return (
            (t.align ? '<' + n + ' align="' + t.align + '">' : '<' + n + '>') +
            e +
            '</' +
            n +
            '>\n'
          )
        }),
        (A.prototype.strong = function(e) {
          return '<strong>' + e + '</strong>'
        }),
        (A.prototype.em = function(e) {
          return '<em>' + e + '</em>'
        }),
        (A.prototype.codespan = function(e) {
          return '<code>' + e + '</code>'
        }),
        (A.prototype.br = function() {
          return this.options.xhtml ? '<br/>' : '<br>'
        }),
        (A.prototype.del = function(e) {
          return '<del>' + e + '</del>'
        }),
        (A.prototype.link = function(e, t, n) {
          if (this.options.sanitize) {
            try {
              var r = decodeURIComponent(j(e))
                .replace(/[^\w:]/g, '')
                .toLowerCase()
            } catch (l) {
              return n
            }
            if (
              r.indexOf('javascript:') === 0 ||
              r.indexOf('vbscript:') === 0 ||
              r.indexOf('data:') === 0
            )
              return n
          }
          this.options.baseUrl && !R.test(e) && (e = O(this.options.baseUrl, e))
          try {
            e = encodeURI(e).replace(/%25/g, '%')
          } catch (l) {
            return n
          }
          const i = /^https?:\/\//.test(e)
          const s = /^mailto:/.test(e)
          const o = i || s ? 'a' : 'router-link'
          let a =
            '<' +
            o +
            ' ' +
            (o === 'a' ? 'href' : 'to') +
            '="' +
            L(
              i
                ? e
                : (function(e) {
                    const t = e.split('#')
                    let n = t[0]
                    const r = t[1]
                    return (
                      x.test(n) && (n = n.replace(x, '')),
                      n + (r ? '#' + r : '')
                    )
                  })(j(e))
            ) +
            '"'
          return (
            t && (a += ' title="' + t + '"'),
            i &&
              ((a += ' target="_blank" rel="noopener noreferrer"'),
              (n += '\n<external-link-icon />')),
            (a += '>' + n + '</' + o + '>')
          )
        }),
        (A.prototype.image = function(e, t, n) {
          this.options.baseUrl && !R.test(e) && (e = O(this.options.baseUrl, e))
          const r = this.options.env.config.imageZoom
          let i =
            '<' +
            (r ? 'image-zoom' : 'img') +
            ' src="' +
            e +
            '" alt="' +
            n +
            '"'
          return (
            t && (i += ' title="' + t + '"'),
            r && (i += ' v-bind:border="false"'),
            (i += this.options.xhtml ? '/>' : '>')
          )
        }),
        (A.prototype.text = function(e) {
          return e
        }),
        (S.prototype.strong = S.prototype.em = S.prototype.codespan = S.prototype.del = S.prototype.text = function(
          e
        ) {
          return e
        }),
        (S.prototype.link = S.prototype.image = function(e, t, n) {
          return String(n)
        }),
        (S.prototype.br = function() {
          return ''
        }),
        (I.parse = function(e, t) {
          return new I(t).parse(e)
        }),
        (I.prototype.parse = function(e) {
          ;(this.inline = new _(e.links, this.options)),
            (this.inlineText = new _(
              e.links,
              M({}, this.options, {renderer: new S()})
            )),
            (this.tokens = e.reverse())
          for (var t = ''; this.next(); ) t += this.tok()
          return t
        }),
        (I.prototype.next = function() {
          return (this.token = this.tokens.pop())
        }),
        (I.prototype.peek = function() {
          return this.tokens[this.tokens.length - 1] || 0
        }),
        (I.prototype.parseText = function() {
          for (var e = this.token.text; this.peek().type === 'text'; )
            e += '\n' + this.next().text
          return this.inline.output(e)
        }),
        (I.prototype.tok = function() {
          switch (this.token.type) {
            case 'space':
              return ''
            case 'hr':
              return this.renderer.hr()
            case 'heading':
              return this.renderer.heading(
                this.inline.output(this.token.text),
                this.token.depth,
                j(this.inlineText.output(this.token.text))
              )
            case 'code':
              return this.renderer.code(
                this.token.text,
                this.token.lang,
                this.token.escaped,
                this.token.opts
              )
            case 'table':
              var e
              var t
              var n
              var r
              var i = ''
              var s = ''
              for (n = '', e = 0; e < this.token.header.length; e++)
                n += this.renderer.tablecell(
                  this.inline.output(this.token.header[e]),
                  {header: !0, align: this.token.align[e]}
                )
              for (
                i += this.renderer.tablerow(n), e = 0;
                e < this.token.cells.length;
                e++
              ) {
                for (t = this.token.cells[e], n = '', r = 0; r < t.length; r++)
                  n += this.renderer.tablecell(this.inline.output(t[r]), {
                    header: !1,
                    align: this.token.align[r]
                  })
                s += this.renderer.tablerow(n)
              }
              return this.renderer.table(i, s)
            case 'blockquote_start':
              for (s = ''; this.next().type !== 'blockquote_end'; )
                s += this.tok()
              return this.renderer.blockquote(s)
            case 'list_start':
              s = ''
              for (
                var o = this.token.ordered, a = this.token.start, l = !1;
                this.next().type !== 'list_end';

              )
                this.token.task && (l = !0), (s += this.tok())
              return this.renderer.list(s, o, a, l)
            case 'list_item_start':
              s = ''
              var c = this.token.loose
              var u = this.token.task
              for (
                u && (s += this.renderer.checkbox(this.token.checked));
                this.next().type !== 'list_item_end';

              )
                s +=
                  c || this.token.type !== 'text'
                    ? this.tok()
                    : this.parseText()
              return this.renderer.listitem(s, u)
            case 'html':
              return this.renderer.html(this.token.text)
            case 'paragraph':
              return this.renderer.paragraph(
                this.inline.output(this.token.text)
              )
            case 'text':
              return this.renderer.paragraph(this.parseText())
          }
        }),
        (L.escapeTest = /[&<>"']/),
        (L.escapeReplace = /[&<>"']/g),
        (L.replacements = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }),
        (L.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/),
        (L.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g)
      var E = {}
      var R = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i
      function $() {}
      function M(e) {
        for (var t, n, r = 1; r < arguments.length; r++)
          for (n in (t = arguments[r]))
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        return e
      }
      function B(e, t) {
        const n = e
          .replace(/\|/g, (e, t, n) => {
            for (var r = !1, i = t; --i >= 0 && n[i] === '\\'; ) r = !r
            return r ? '|' : ' |'
          })
          .split(/ \|/)
        let r = 0
        if (n.length > t) n.splice(t)
        else for (; n.length < t; ) n.push('')
        for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, '|')
        return n
      }
      function P(e, t, n) {
        if (e.length === 0) return ''
        for (var r = 0; r < e.length; ) {
          const i = e.charAt(e.length - r - 1)
          if (i !== t || n) {
            if (i === t || !n) break
            r++
          } else r++
        }
        return e.substr(0, e.length - r)
      }
      function Z(e, t, n) {
        if (typeof e === 'undefined' || e === null)
          throw new Error('marked(): input parameter is undefined or null')
        if (typeof e !== 'string')
          throw new Error(
            'marked(): input parameter is of type ' +
              Object.prototype.toString.call(e) +
              ', string expected'
          )
        if (n || typeof t === 'function') {
          n || ((n = t), (t = null))
          let r
          let i
          const s = (t = M({}, Z.defaults, t || {})).highlight
          let o = 0
          try {
            r = C.lex(e, t)
          } catch (l) {
            return n(l)
          }
          i = r.length
          const a = function(e) {
            if (e) return (t.highlight = s), n(e)
            let i
            try {
              i = I.parse(r, t)
            } catch (l) {
              e = l
            }
            return (t.highlight = s), e ? n(e) : n(null, i)
          }
          if (!s || s.length < 3) return a()
          if ((delete t.highlight, !i)) return a()
          for (; o < r.length; o++)
            !(function(e) {
              e.type !== 'code'
                ? --i || a()
                : s(e.text, e.lang, (t, n) => {
                    return t
                      ? a(t)
                      : n == null || n === e.text
                      ? --i || a()
                      : ((e.text = n), (e.escaped = !0), void (--i || a()))
                  })
            })(r[o])
        } else
          try {
            return t && (t = M({}, Z.defaults, t)), I.parse(C.lex(e, t), t)
          } catch (l) {
            if (
              ((l.message +=
                '\nPlease report this to https://github.com/markedjs/marked.'),
              (t || Z.defaults).silent)
            )
              return (
                '<p>An error occurred:</p><pre>' +
                L(String(l.message), !0) +
                '</pre>'
              )
            throw l
          }
      }
      ;($.exec = $),
        (Z.options = Z.setOptions = function(e) {
          return M(Z.defaults, e), Z
        }),
        (Z.getDefaults = function() {
          return {
            baseUrl: null,
            breaks: !1,
            gfm: !0,
            headerIds: !0,
            headerPrefix: '',
            highlight: null,
            langPrefix: 'language-',
            mangle: !0,
            pedantic: !1,
            renderer: new A(),
            sanitize: !1,
            sanitizer: null,
            silent: !1,
            smartLists: !1,
            smartypants: !1,
            tables: !0,
            xhtml: !1
          }
        }),
        (Z.defaults = Z.getDefaults()),
        (Z.Parser = I),
        (Z.parser = I.parse),
        (Z.Renderer = A),
        (Z.TextRenderer = S),
        (Z.Lexer = C),
        (Z.lexer = C.lex),
        (Z.InlineLexer = _),
        (Z.inlineLexer = _.output),
        (Z.parse = Z),
        (Z.escape = L),
        (Z.unescape = j)
      const G = Z
      const N = n(29)
      const F = n.n(N)
      function H(e, t) {
        if (!t) return e
        let n = t && F.a.languages[t]
        return (
          n || ((t = 'markup'), (n = F.a.languages.markup)),
          F.a.highlight(e, n, t)
        )
      }
      const z = function(e) {
        return /^https?:\/\//.test(e)
      }
      const D = function(e, t) {
        return ((e = (e = e || '.').replace(/\/$/, '')) + t).replace(
          /^\.\//,
          ''
        )
      }
      const q = function(e) {
        return (
          (e = e.replace(/^\/?/, '/')),
          /\.md$/.test(e) || (e = /\/$/.test(e) ? e + 'README.md' : e + '.md'),
          e
        )
      }
      const V = typeof window !== 'undefined'
      const J = function(e) {
        const t = new G.Renderer()
        const n = []
        ;(t.heading = function(e, t, r) {
          const i = this.options.env
          let s = r
            .trim()
            .replace(
              /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
              ''
            )
            .replace(/\s/g, '-')
            .toLowerCase()
          n.push(s)
          const o = n.filter(e => {
            return e === s
          }).length
          if ((o > 1 && (s += '-' + o), t === 1)) return (i.title = e), ''
          t === 2 &&
            i.headings.push({
              level: t,
              raw: r,
              text: r.replace(/<.*>\s*$/g, ''),
              slug: s
            })
          const a = 'h' + t
          return (
            '<' +
            a +
            ' class="markdown-header" id="' +
            s +
            '">\n    <router-link class="header-anchor" :to="{hash:\'' +
            s +
            '\'}">\n      <svg class="anchor-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>\n    </router-link>\n    ' +
            e +
            '</' +
            a +
            '>'
          )
        }),
          (t.codespan = function(e) {
            return '<code v-pre>' + e + '</code>'
          })
        const r = t.code
        return (
          (t.code = function(e, t, n, i) {
            i = i || {}
            const s = this.options.env
            if (i.mixin) return s.mixins.push(e), ''
            let o = r.call(this, e, t, n)
            if (
              (i.interpolate || (o = o.replace(/^<pre>/, '<pre v-pre>')),
              i.highlight)
            ) {
              const a = e
                .split('\n')
                .map((e, t) => {
                  t += 1
                  const n = i.highlight.some(e => {
                    if (typeof e === 'number') return e === t
                    if (typeof e === 'string') {
                      const n = e.split('-').map(Number)
                      const r = n[0]
                      const i = n[1]
                      return t >= r && (!i || t <= i)
                    }
                    return !1
                  })
                  const r = e ? G.escape(e) : '&#8203;'
                  return n
                    ? '<span class="code-line highlighted">' + r + '</span>'
                    : '<span class="code-line">' + r + '</span>'
                })
                .join('')
              o +=
                '<div' +
                (i.interpolate ? '' : ' v-pre') +
                ' class="code-mask">' +
                a +
                '</div>'
            }
            return (
              '<div data-lang="' +
              (t || '') +
              '" class="pre-wrapper">' +
              o +
              '</div>'
            )
          }),
          e.process('extendMarkedRenderer', t)
        )
      }
      const Y = n(31)
      const W = n.n(Y)
      const U = n(30)
      const K = {
        accentColor: '#009688',
        pageBackground: '#fff',
        headerBackground: '#fff',
        headerTextColor: 'var(--text-color)',
        textColor: '#000',
        linkColor: 'var(--accent-color)',
        sidebarWidth: '280px',
        sidebarBackground: 'var(--page-background)',
        sidebarLinkColor: '#444',
        sidebarLinkActiveColor: '#000',
        sidebarLinkArrowColor: '#999',
        mainBackground: 'var(--page-background)',
        borderColor: '#eaeaea',
        headerHeight: '55px',
        codeFont:
          'SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace',
        tipColor: 'rgb(6, 125, 247)',
        successColor: '#42b983',
        warningColor: '#ff9800',
        dangerColor: 'rgb(255, 0, 31)',
        navLinkColor: '#2c3e50',
        navLinkBorderColor: 'var(--accent-color)',
        codeBlockBackground: '#011627',
        codeBlockTextColor: 'white',
        codeBlockShadowColor: '#333',
        codeBlockShadowWidth: '0px',
        highlightedLineBackground: '#022a4b',
        highlightedLineBorderColor: '#ffa7c4',
        inlineCodeColor: 'rgb(116, 66, 16)',
        inlineCodeBackground: 'rgb(254, 252, 191)',
        loaderPrimaryColor: '#f3f3f3',
        loaderSecondaryColor: '#ecebeb',
        tableHeaderBackground: '#fafafa',
        tableHeaderColor: '#666',
        docuteSelectHeight: '38px',
        searchIconColor: '#999',
        searchFocusBorderColor: '#ccc',
        searchFocusIconColor: '#333',
        searchResultHoverBackground: '#f9f9f9'
      }
      const Q = Object.assign({}, K, {
        headerBackground: 'var(--page-background)',
        sidebarLinkColor: 'var(--text-color)',
        sidebarLinkActiveColor: 'var(--text-color)',
        textColor: 'hsla(0,0%,100%,0.88)',
        pageBackground: '#2f3136',
        navLinkColor: 'var(--text-color)',
        borderColor: '#3e4147',
        highlightedLineBackground: '#022a4b',
        highlightedLineBorderColor: '#ffa7c4',
        inlineCodeColor: '#e6e6e6',
        inlineCodeBackground: '#373c49',
        loaderPrimaryColor: 'hsla(0, 0%, 100%, 0.08)',
        loaderSecondaryColor: 'hsla(0, 0%, 100%, 0.18)',
        contentLinkBorder: '2px solid hsla(0, 0%, 100%, 0.28)',
        contentLinkHoverBorderColor: 'currentColor',
        tableHeaderBackground: 'var(--border-color)',
        tableHeaderColor: '#868686',
        searchIconColor: '#999',
        searchFocusBorderColor: '#999',
        searchFocusIconColor: '#ccc',
        searchResultBackground: '#27292f',
        searchResultHoverBackground: '#1e2025'
      })
      function X(e, t, n) {
        return n
          ? t
            ? t(e)
            : e
          : ((e && e.then) || (e = Promise.resolve(e)), t ? e.then(t) : e)
      }
      s.a.use(k.a)
      const ee = V && window.__DOCUTE_INITIAL_STATE__
      var te = new k.a.Store({
        state: Object.assign(
          {
            originalConfig: {},
            page: {title: null, headings: null, html: ''},
            env: {},
            showSidebar: !1,
            fetchingFile: !0
          },
          ee
        ),
        mutations: {
          SET_CONFIG(e, t) {
            void 0 === t && (t = {}),
              (t.layout = t.layout || 'narrow'),
              t.centerContent && (t.layout = 'narrow'),
              (t.theme = (function(e, t) {
                const n = t.theme
                const r = t.detectSystemDarkTheme
                if (!V || !r) return n || 'default'
                const i = window.matchMedia('(prefers-color-scheme: dark)')
                return (
                  i.addListener(() => {
                    e.commit('SET_THEME', i.matches ? 'dark' : 'default')
                  }),
                  n || (i.matches ? 'dark' : 'default')
                )
              })(te, t)),
              (e.originalConfig = t)
          },
          SET_PAGE(e, t) {
            e.page = t
          },
          TOGGLE_SIDEBAR(e, t) {
            e.showSidebar = typeof t === 'boolean' ? t : !e.showSidebar
          },
          SET_FETCHING(e, t) {
            e.fetchingFile = t
          },
          SET_ENV(e, t) {
            e.env = t
          },
          SET_THEME(e, t) {
            e.originalConfig.theme = t
          }
        },
        actions: {
          fetchFile(e, t) {
            const n = e.commit
            const r = e.getters
            const i = e.dispatch
            try {
              n('TOGGLE_SIDEBAR', !1), n('SET_FETCHING', !0)
              let s = Object.assign(
                {markdown: !0},
                r.config.routes && r.config.routes[t]
              )
              if (!s.content && !s.file) {
                const o = q(t)
                ;(s.file = D(r.config.sourcePath, o)),
                  (s.editLink =
                    r.config.editLinkBase && D(r.config.editLinkBase, o))
              }
              return X(
                Promise.all([
                  !s.content &&
                    fetch(s.file, r.config.fetchOptions)
                      .then(e => {
                        return e.text()
                      })
                      .then(e => {
                        s.content = e
                      }),
                  i('fetchPrismLanguages')
                ]),
                () => {
                  return X(
                    d.processPromise('processMarkdown', s.content),
                    e => {
                      return (
                        (s.content = e),
                        X(d.processPromise('processPage', s), e => {
                          s = e
                          const t = {headings: [], mixins: [], config: r.config}
                          return (
                            s.markdown &&
                              (s.content = G(s.content, {
                                renderer: J(d),
                                highlight: H,
                                env: t
                              })),
                            X(d.processPromise('processHTML', s.content), e => {
                              ;(s.content = e),
                                (s.headings = t.headings),
                                s.title || (s.title = t.title),
                                n('SET_PAGE', s),
                                n('SET_ENV', t),
                                n('SET_FETCHING', !1)
                            })
                          )
                        })
                      )
                    }
                  )
                }
              )
            } catch (a) {
              return Promise.reject(a)
            }
          },
          fetchPrismLanguages(e) {
            let t
            let n
            const r = e.getters.config.highlight
            return r && r.length !== 0
              ? ((t = r
                  .reduce((e, t) => {
                    return U[t] && (e = e.concat(U[t])), e.push(t), e
                  }, [])
                  .filter((e, t, n) => {
                    return n.indexOf(e) === t && U.builtin.indexOf(e) === -1
                  })
                  .map(e => {
                    return (
                      'https://unpkg.com/prismjs@1.17.1/components/prism-' +
                      e +
                      '.js'
                    )
                  })),
                (n = 'prism-languages'),
                new Promise(e => {
                  if (W.a.isDefined(n)) return e()
                  W()(t, n, {
                    success: e,
                    error(t) {
                      console.error('Deps not found:', t), e()
                    }
                  })
                }))
              : Promise.resolve()
          }
        },
        getters: {
          target(e) {
            const t = e.originalConfig.target
            return t ? (t[0] === '#' ? t.slice(1) : t) : 'docute'
          },
          languageOverrides(e) {
            const t = e.originalConfig
            const n = t.overrides || t.locales
            return (
              n &&
              Object.keys(n).reduce((e, t) => {
                return n[t].language && (e[t] = n[t]), e
              }, {})
            )
          },
          currentLocalePath(e, t) {
            const n = e.route
            const r = t.languageOverrides
            if (r)
              for (let i = 0, s = Object.keys(r); i < s.length; i++) {
                const o = s[i]
                if (o !== '/') if (new RegExp('^' + o).test(n.path)) return o
              }
            return '/'
          },
          config(e, t) {
            const n = e.originalConfig
            const r = t.currentLocalePath
            const i = t.languageOverrides
            return i ? Object.assign({}, n, {}, i[r]) : n
          },
          homePaths(e, t) {
            const n = t.languageOverrides
            const r = n ? Object.keys(n) : []
            return [].concat(r, ['/'])
          },
          sidebarLinks(e, t) {
            const n = t.sidebar
            return n
              ? n
                  .reduce((e, t) => {
                    const n = t.children || t.links || []
                    return [].concat(e, n)
                  }, [])
                  .filter(e => {
                    return !z(e.link)
                  })
              : []
          },
          sidebar(e, t) {
            const n = t.config.sidebar || []
            return typeof n === 'function' ? n(te) : n
          },
          cssVariables(e, t) {
            const n = t.config
            return Object.assign(
              {},
              n.theme === 'dark' ? Q : K,
              {},
              typeof n.cssVariables === 'function'
                ? n.cssVariables(n.theme)
                : n.cssVariables
            )
          }
        }
      })
      const ne = te
      const re = n(33)
      const ie = n(35)
      const se = n(36)
      const oe = n(37)
      const ae = {
        functional: !0,
        props: ['openInNewTab', 'externalLinkIcon'],
        render(e, t) {
          const n = t.data
          const r = t.children
          const i = t.props
          const s = i.openInNewTab
          const o = i.externalLinkIcon
          const a = Object.assign({}, n.attrs)
          const l = a.to
          return z(l)
            ? (delete a.to,
              delete a.prefetchFiles,
              e(
                'a',
                Object.assign({}, n, {
                  class: [n.class, 'is-external-link'],
                  attrs: Object.assign({}, a, {
                    href: l,
                    target: !1 === s ? '_self' : '_blank'
                  })
                }),
                [].concat(r, [
                  !1 === s || !1 === o
                    ? null
                    : e('external-link-icon', {class: 'external-link-icon'})
                ])
              ))
            : e('router-link', n, r)
        }
      }
      const le =
        (n(45),
        new Object(m.a)(ae, void 0, void 0, !1, null, null, null).exports)
      const ce = {
        components: {UniLink: le},
        props: {nav: {type: Array, required: !0}},
        methods: {isExternalLink: z}
      }
      const ue =
        (n(46),
        new Object(m.a)(
          ce,
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return n(
              'div',
              {staticClass: 'header-nav'},
              e._l(e.nav, (t, r) => {
                return n(
                  'div',
                  {key: r, staticClass: 'header-nav-item'},
                  [
                    t.children
                      ? n('div', {staticClass: 'dropdown-wrapper'}, [
                          n('span', {staticClass: 'dropdown-trigger'}, [
                            e._v('\n        ' + e._s(t.title) + '\n        '),
                            n('span', {staticClass: 'arrow'})
                          ]),
                          e._v(' '),
                          t.children
                            ? n(
                                'ul',
                                {staticClass: 'dropdown-list'},
                                e._l(t.children, (t, r) => {
                                  return n(
                                    'li',
                                    {key: r, staticClass: 'dropdown-item'},
                                    [
                                      n(
                                        'uni-link',
                                        {
                                          attrs: {
                                            to: t.link,
                                            openInNewTab: t.openInNewTab,
                                            externalLinkIcon: !1
                                          }
                                        },
                                        [e._v(e._s(t.title))]
                                      )
                                    ],
                                    1
                                  )
                                }),
                                0
                              )
                            : e._e()
                        ])
                      : e._e(),
                    e._v(' '),
                    t.children
                      ? e._e()
                      : n(
                          'uni-link',
                          {
                            attrs: {
                              to: t.link,
                              openInNewTab: t.openInNewTab,
                              externalLinkIcon: !1
                            }
                          },
                          [e._v(e._s(t.title))]
                        )
                  ],
                  1
                )
              }),
              0
            )
          },
          [],
          !1,
          null,
          '7d422709',
          null
        ).exports)
      const he = {props: {link: {type: Object, required: !0}}}
      const pe =
        (n(47),
        {
          components: {
            UniLink: le,
            PageToc: new Object(m.a)(
              he,
              function() {
                const e = this
                const t = e.$createElement
                const n = e._self._c || t
                return !e.$store.state.fetchingFile &&
                  !1 !== e.link.toc &&
                  e.link.link === e.$route.path &&
                  e.$store.state.page.headings &&
                  e.$store.state.page.headings.length > 0
                  ? n(
                      'div',
                      {staticClass: 'PageToc'},
                      e._l(e.$store.state.page.headings, t => {
                        return n('router-link', {
                          key: t.slug,
                          staticClass: 'PageTocHeading',
                          attrs: {to: {hash: t.slug}, 'data-level': t.level},
                          domProps: {innerHTML: e._s(t.text)}
                        })
                      }),
                      1
                    )
                  : e._e()
              },
              [],
              !1,
              null,
              '4110e8ed',
              null
            ).exports
          },
          props: {
            item: {
              type: Object,
              required: !0,
              default() {
                return {}
              }
            },
            open: {
              type: Boolean,
              required: !1,
              default() {
                return !0
              }
            }
          },
          computed: {
            children() {
              return this.item.children || this.item.links
            }
          },
          methods: {
            isExternalLink: z,
            getPrefetchFiles(e) {
              const t = this.$store.getters.config
              const n = t.sourcePath
              const r = t.routes
              if (r && r[e]) {
                const i = r[e].file
                return i ? [i] : []
              }
              const s = q(e)
              const o = D(n, s)
              return o ? [o] : []
            },
            getLinkTarget(e) {
              return z(e) && !1 !== e.openInNewTab ? '_blank' : '_self'
            }
          }
        })
      const de =
        (n(48),
        {
          components: {
            HeaderNav: ue,
            SidebarItem: new Object(m.a)(
              pe,
              function() {
                const e = this
                const t = e.$createElement
                const n = e._self._c || t
                return n(
                  'div',
                  {class: ['SidebarItem', e.item.title && 'hasTitle']},
                  [
                    e.item.title && e.children
                      ? n(
                          'div',
                          {
                            staticClass: 'ItemTitle',
                            class: {collapsable: !1 !== e.item.collapsable},
                            on: {
                              click(t) {
                                return e.$emit('toggle')
                              }
                            }
                          },
                          [
                            !1 !== e.item.collapsable
                              ? n(
                                  'span',
                                  {
                                    staticClass: 'arrow',
                                    class: {open: e.open}
                                  },
                                  [
                                    n(
                                      'svg',
                                      {
                                        attrs: {
                                          width: '6',
                                          height: '10',
                                          viewBox: '0 0 6 10',
                                          fill: 'none',
                                          xmlns: 'http://www.w3.org/2000/svg'
                                        }
                                      },
                                      [
                                        n('path', {
                                          attrs: {
                                            d:
                                              'M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7',
                                            stroke: 'currentColor',
                                            'stroke-linecap': 'square'
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              : e._e(),
                            e._v(' '),
                            n('span', [e._v(e._s(e.item.title))])
                          ]
                        )
                      : e._e(),
                    e._v(' '),
                    e.item.title && e.item.link
                      ? n(
                          'uni-link',
                          {
                            staticClass: 'ItemLink',
                            class: {active: e.$route.path === e.item.link},
                            attrs: {to: e.item.link}
                          },
                          [e._v(e._s(e.item.title))]
                        )
                      : e._e(),
                    e._v(' '),
                    e.item.title && e.item.link
                      ? n(
                          'div',
                          {staticClass: 'ItemLinkToc'},
                          [n('PageToc', {attrs: {link: e.item}})],
                          1
                        )
                      : e._e(),
                    e._v(' '),
                    e.children && (e.open || !1 === e.item.collapsable)
                      ? n(
                          'div',
                          {staticClass: 'ItemChildren'},
                          e._l(e.children, (t, r) => {
                            return n(
                              'div',
                              {key: r, staticClass: 'ItemChild'},
                              [
                                n(
                                  'uni-link',
                                  {
                                    staticClass: 'ItemChildLink',
                                    class: {active: e.$route.path === t.link},
                                    attrs: {
                                      to: t.link,
                                      openInNewTab: t.openInNewTab,
                                      prefetchFiles: e.getPrefetchFiles(t.link)
                                    }
                                  },
                                  [e._v(e._s(t.title))]
                                ),
                                e._v(' '),
                                n('PageToc', {attrs: {link: t}})
                              ],
                              1
                            )
                          }),
                          0
                        )
                      : e._e()
                  ],
                  1
                )
              },
              [],
              !1,
              null,
              '119d089b',
              null
            ).exports
          },
          data() {
            return {closedItems: []}
          },
          watch: {
            '$route.path': {
              handler() {
                const e = this.getCurrentIndex(
                  this.$route.path,
                  this.$store.getters.sidebar
                )
                this.openItem(e)
              },
              immediate: !0
            }
          },
          methods: {
            openItem(e) {
              this.closedItems.indexOf(e) > -1 &&
                (this.closedItems = this.closedItems.filter(t => {
                  return t !== e
                }))
            },
            toggleItem(e) {
              this.closedItems.indexOf(e) === -1
                ? this.closedItems.push(e)
                : (this.closedItems = this.closedItems.filter(t => {
                    return t !== e
                  }))
            },
            getCurrentIndex(e, t) {
              for (let n = 0; n < t.length; n++)
                if (
                  this.getChildren(t[n]).some(t => {
                    return t.link === e
                  })
                )
                  return n
              return 0
            },
            getChildren(e) {
              return e.children || e.links || []
            }
          }
        })
      const ge =
        (n(49),
        new Object(m.a)(
          de,
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return n(
              'div',
              {
                staticClass: 'Sidebar',
                class: {isShown: e.$store.state.showSidebar}
              },
              [
                n('InjectedComponents', {attrs: {position: 'sidebar:start'}}),
                e._v(' '),
                n('InjectedComponents', {
                  attrs: {position: 'mobile-sidebar:start'}
                }),
                e._v(' '),
                e.$store.getters.config.nav
                  ? n('HeaderNav', {
                      staticClass: 'mobile-header-nav',
                      attrs: {nav: e.$store.getters.config.nav}
                    })
                  : e._e(),
                e._v(' '),
                n(
                  'div',
                  {staticClass: 'SidebarItems'},
                  e._l(e.$store.getters.sidebar, (t, r) => {
                    return n('sidebar-item', {
                      key: r,
                      attrs: {item: t, open: e.closedItems.indexOf(r) === -1},
                      on: {
                        toggle(t) {
                          return e.toggleItem(r)
                        }
                      }
                    })
                  }),
                  1
                ),
                e._v(' '),
                n('InjectedComponents', {attrs: {position: 'sidebar:end'}}),
                e._v(' '),
                n('InjectedComponents', {
                  attrs: {position: 'sidebar:post-end'}
                })
              ],
              1
            )
          },
          [],
          !1,
          null,
          '1145156e',
          null
        ).exports)
      const fe =
        (n(50),
        new Object(m.a)(
          {},
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return e.$store.state.showSidebar
              ? n('div', {
                  staticClass: 'SidebarMask',
                  on: {
                    click(t) {
                      return e.$store.commit('TOGGLE_SIDEBAR', !1)
                    }
                  }
                })
              : e._e()
          },
          [],
          !1,
          null,
          '2a7cf7b2',
          null
        ).exports)
      const me = {
        methods: {
          toggleSidebar() {
            this.$store.commit('TOGGLE_SIDEBAR')
          }
        },
        watch: {
          '$store.state.showSidebar'(e) {
            document.body.style.overflow = e ? 'hidden' : 'initial'
          }
        }
      }
      const ve =
        (n(51),
        {
          components: {
            HeaderNav: ue,
            SidebarToggle: new Object(m.a)(
              me,
              function() {
                const e = this.$createElement
                const t = this._self._c || e
                return t(
                  'span',
                  {
                    staticClass: 'sidebar-toggle',
                    on: {click: this.toggleSidebar}
                  },
                  [
                    t(
                      'svg',
                      {
                        attrs: {
                          'aria-hidden': 'true',
                          role: 'img',
                          viewBox: '0 0 448 512'
                        }
                      },
                      [
                        t('path', {
                          attrs: {
                            fill: 'currentColor',
                            d:
                              'M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z'
                          }
                        })
                      ]
                    )
                  ]
                )
              },
              [],
              !1,
              null,
              '2cea9548',
              null
            ).exports
          },
          computed: {
            leftNav() {
              const e = this.$store.getters.config.nav
              return (
                e &&
                e.filter(e => {
                  return e.position === 'left'
                })
              )
            },
            rightNav() {
              const e = this.$store.getters.config.nav
              return (
                e &&
                e.filter(e => {
                  return e.position === 'right' || !e.position
                })
              )
            },
            Logo() {
              const e = this.$store.getters.config
              const t = e.title
              const n = e.logo
              return typeof n === 'string'
                ? {template: n}
                : typeof n === 'object'
                ? n
                : {
                    render(e) {
                      return e('span', null, [t])
                    }
                  }
            }
          }
        })
      const ke =
        (n(52),
        new Object(m.a)(
          ve,
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return n('header', {staticClass: 'Header'}, [
              n('div', {staticClass: 'Wrap'}, [
                n('div', {staticClass: 'header-inner'}, [
                  n(
                    'div',
                    {staticClass: 'header-left'},
                    [
                      n(
                        'h1',
                        {staticClass: 'site-title'},
                        [
                          n('SidebarToggle'),
                          e._v(' '),
                          n(
                            'router-link',
                            {attrs: {to: '/'}},
                            [n(e.Logo, {tag: 'component'})],
                            1
                          )
                        ],
                        1
                      ),
                      e._v(' '),
                      e.leftNav
                        ? n('HeaderNav', {attrs: {nav: e.leftNav}})
                        : e._e()
                    ],
                    1
                  ),
                  e._v(' '),
                  n(
                    'div',
                    {staticClass: 'header-right'},
                    [
                      n('InjectedComponents', {
                        attrs: {position: 'header-right:start'}
                      }),
                      e._v(' '),
                      e.rightNav
                        ? n('HeaderNav', {attrs: {nav: e.rightNav}})
                        : e._e(),
                      e._v(' '),
                      n('InjectedComponents', {
                        attrs: {position: 'header-right:end'}
                      })
                    ],
                    1
                  )
                ])
              ])
            ])
          },
          [],
          !1,
          null,
          'a9d7b43e',
          null
        ).exports)
      const be = {
        computed: Object.assign({}, new Object(k.b)(['sidebarLinks']), {
          currentLink() {
            return this.$route.path
          },
          currentLinkIndex() {
            for (let e = this.sidebarLinks, t = 0; t < e.length; t++) {
              if (e[t].link === this.currentLink) return t
            }
            return !1
          },
          prevLinkItem() {
            return typeof this.currentLinkIndex === 'number'
              ? this.sidebarLinks[this.currentLinkIndex - 1]
              : null
          },
          nextLinkItem() {
            return typeof this.currentLinkIndex === 'number'
              ? this.sidebarLinks[this.currentLinkIndex + 1]
              : null
          }
        })
      }
      const xe =
        (n(53),
        new Object(m.a)(
          be,
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return e.prevLinkItem || e.nextLinkItem
              ? n('div', {staticClass: 'prev-next-links'}, [
                  e.prevLinkItem
                    ? n(
                        'div',
                        {staticClass: 'prev-link'},
                        [
                          n('router-link', {attrs: {to: e.prevLinkItem.link}}, [
                            e._v(
                              '\n      \u2190 ' +
                                e._s(e.prevLinkItem.title) +
                                '\n    '
                            )
                          ])
                        ],
                        1
                      )
                    : e._e(),
                  e._v(' '),
                  e.nextLinkItem
                    ? n(
                        'div',
                        {staticClass: 'next-link'},
                        [
                          n('router-link', {attrs: {to: e.nextLinkItem.link}}, [
                            e._v(
                              '\n      ' +
                                e._s(e.nextLinkItem.title) +
                                ' \u2192\n    '
                            )
                          ])
                        ],
                        1
                      )
                    : e._e()
                ])
              : e._e()
          },
          [],
          !1,
          null,
          '66176852',
          null
        ).exports)
      const ye = {
        computed: {
          editLink() {
            return this.$store.state.page.editLink
          },
          editLinkText() {
            return this.$store.getters.config.editLinkText || 'Edit this page'
          }
        }
      }
      const Ce =
        (n(54),
        new Object(m.a)(
          ye,
          function() {
            const e = this.$createElement
            const t = this._self._c || e
            return this.editLink
              ? t('div', {staticClass: 'EditLink'}, [
                  t(
                    'a',
                    {attrs: {target: '_blank', href: String(this.editLink)}},
                    [
                      t(
                        'svg',
                        {
                          staticClass: 'icon',
                          attrs: {
                            id: 'i-compose',
                            viewBox: '0 0 32 32',
                            width: '32',
                            height: '32',
                            fill: 'none',
                            stroke: 'currentcolor',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': '2'
                          }
                        },
                        [
                          t('path', {
                            attrs: {
                              d:
                                'M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z'
                            }
                          })
                        ]
                      ),
                      this._v('\n    ' + this._s(this.editLinkText) + '\n  ')
                    ]
                  )
                ])
              : this._e()
          },
          [],
          !1,
          null,
          '24886b54',
          null
        ).exports)
      function we(e, t, n) {
        return n
          ? t
            ? t(e)
            : e
          : ((e && e.then) || (e = Promise.resolve(e)), t ? e.then(t) : e)
      }
      const _e = {
        name: 'PageHome',
        components: {
          ContentLoader: oe.a,
          Sidebar: ge,
          SidebarMask: fe,
          SiteHeader: ke,
          PrevNextLinks: xe,
          EditLink: Ce
        },
        serverPrefetch() {
          try {
            const e = this
            return we(e.fetchFile(e.$route.path), () => {
              e.setTitle()
            })
          } catch (t) {
            return Promise.reject(t)
          }
        },
        mounted() {
          window.__DOCUTE_INITIAL_STATE__ ||
            this.fetchFile(this.$route.path).then(this.setInitialState)
        },
        beforeRouteUpdate(e, t, n) {
          n(), e.path !== t.path && this.fetchFile(e.path)
        },
        watch: {
          '$route.hash'() {
            const e = this
            this.$nextTick(() => {
              e.jumpToHash()
            })
          },
          pageTitle() {
            this.setTitle()
          }
        },
        computed: {
          pageTitle() {
            return this.$store.state.page.title
          },
          MarkdownTitle() {
            return {
              name: 'MarkdownTitle',
              template: '<h1>' + this.pageTitle + '</h1>'
            }
          },
          PageContent() {
            const e = this.$store.state.env
            const t = this.$store.getters.config.componentMixins
            const n = {
              mixins: [].concat(
                void 0 === t ? [] : t,
                e.mixins.map(e => {
                  return new Function('Vue', 'return ' + e.trim())(s.a)
                })
              ),
              name: 'PageContent',
              template:
                '<div class="page-content">' +
                this.$store.state.page.content +
                '</div>'
            }
            return d.process('extendMarkdownComponent', n), n
          }
        },
        methods: {
          fetchFile(e) {
            try {
              const t = this
              return we(t.$store.dispatch('fetchFile', e), () => {
                return (
                  d.invoke('onContentWillUpdate', t),
                  we(t.$nextTick(), () => {
                    d.invoke('onContentUpdated', t), t.jumpToHash()
                  })
                )
              })
            } catch (n) {
              return Promise.reject(n)
            }
          },
          jumpToHash() {
            const e = decodeURI(this.$route.hash)
            if (e) {
              const t = document.querySelector(e)
              if (t) {
                const n = document.querySelector('.Header')
                new Object(se.a)(t, {
                  a11y: !0,
                  duration: 0,
                  offset: -(n.clientHeight + 30)
                })
              }
            }
          },
          setInitialState() {
            if (/(Prerender|jsdom|PhantomJS)/i.test(navigator.userAgent)) {
              const e = document.createElement('script')
              ;(e.textContent =
                'window.__DOCUTE_INITIAL_STATE__ = ' +
                JSON.stringify({
                  page: this.$store.state.page,
                  env: this.$store.state.env,
                  fetchingFile: !1
                })),
                document.head.appendChild(e)
            }
          },
          setTitle() {
            const e = this.$route.path
            const t = this.$store.getters
            const n = t.config
            let r =
              t.homePaths.indexOf(e) > -1
                ? n.title
                : this.pageTitle + ' - ' + n.title
            ;(r = r.replace(/<(?:.|\n)*?>/gm, '')),
              this.$ssrContext
                ? (this.$ssrContext.title = r)
                : (document.title = r)
          }
        }
      }
      const Ae =
        (n(55),
        n(56),
        n(57),
        new Object(m.a)(
          _e,
          function() {
            let e
            const t = this
            const n = t.$createElement
            const r = t._self._c || n
            return r(
              'div',
              {
                staticClass: 'Page',
                class:
                  ((e = {}),
                  (e['layout-' + t.$store.getters.config.layout] = !0),
                  e)
              },
              [
                r('SiteHeader'),
                t._v(' '),
                r(
                  'div',
                  {staticClass: 'Wrap'},
                  [
                    r('Sidebar'),
                    t._v(' '),
                    r('SidebarMask'),
                    t._v(' '),
                    r('div', {staticClass: 'Main'}, [
                      t.$store.state.fetchingFile
                        ? r(
                            'div',
                            {staticClass: 'Content'},
                            [
                              r(
                                'content-loader',
                                {
                                  attrs: {
                                    height: 160,
                                    width: 400,
                                    speed: 2,
                                    primaryColor:
                                      t.$store.getters.cssVariables
                                        .loaderPrimaryColor,
                                    secondaryColor:
                                      t.$store.getters.cssVariables
                                        .loaderSecondaryColor
                                  }
                                },
                                [
                                  r('rect', {
                                    attrs: {
                                      x: '0',
                                      y: '5',
                                      rx: '4',
                                      ry: '4',
                                      width: '117',
                                      height: '6.4'
                                    }
                                  }),
                                  t._v(' '),
                                  r('rect', {
                                    attrs: {
                                      x: '0',
                                      y: '25',
                                      rx: '3',
                                      ry: '3',
                                      width: '85',
                                      height: '6.4'
                                    }
                                  }),
                                  t._v(' '),
                                  r('rect', {
                                    attrs: {
                                      x: '0',
                                      y: '60',
                                      rx: '3',
                                      ry: '3',
                                      width: '350',
                                      height: '6.4'
                                    }
                                  }),
                                  t._v(' '),
                                  r('rect', {
                                    attrs: {
                                      x: '0',
                                      y: '80',
                                      rx: '3',
                                      ry: '3',
                                      width: '380',
                                      height: '6.4'
                                    }
                                  }),
                                  t._v(' '),
                                  r('rect', {
                                    attrs: {
                                      x: '0',
                                      y: '100',
                                      rx: '3',
                                      ry: '3',
                                      width: '201',
                                      height: '6.4'
                                    }
                                  })
                                ]
                              )
                            ],
                            1
                          )
                        : r(
                            'div',
                            {staticClass: 'Content'},
                            [
                              r('InjectedComponents', {
                                attrs: {position: 'content:start'}
                              }),
                              t._v(' '),
                              t.pageTitle
                                ? r(t.MarkdownTitle, {
                                    tag: 'component',
                                    staticClass: 'page-title'
                                  })
                                : t._e(),
                              t._v(' '),
                              r(t.PageContent, {
                                tag: 'component',
                                class: {'has-page-title': t.pageTitle}
                              }),
                              t._v(' '),
                              r('EditLink'),
                              t._v(' '),
                              r('PrevNextLinks'),
                              t._v(' '),
                              r('InjectedComponents', {
                                attrs: {position: 'content:end'}
                              })
                            ],
                            1
                          )
                    ])
                  ],
                  1
                )
              ],
              1
            )
          },
          [],
          !1,
          null,
          '30a086c1',
          null
        ).exports)
      s.a.use(re.a), s.a.use(ie.a)
      const Se = function(e) {
        return new re.a(
          Object.assign(
            {
              scrollBehavior(e, t, n) {
                return n || {x: 0, y: 0}
              }
            },
            e,
            {routes: [{path: '*', component: Ae}]}
          )
        )
      }
      const Ie = function(e) {
        return {
          functional: !0,
          render(t, n) {
            return t(e, n.data, n.children)
          }
        }
      }
      const Le = {
        name: 'ImageZoom',
        props: {
          url: {type: String},
          src: {type: String},
          alt: {type: String},
          border: {type: Boolean, default: !0},
          width: {type: [String, Number]},
          title: {type: String}
        },
        computed: {
          imageURL() {
            return this.src || this.url
          }
        },
        mounted() {
          ;(0, n(58).default)(this.$refs.img, {})
        }
      }
      const je =
        (n(59),
        new Object(m.a)(
          Le,
          function() {
            const e = this.$createElement
            const t = this._self._c || e
            return t(
              'div',
              {staticClass: 'ImageZoom', class: {'with-border': this.border}},
              [
                t('img', {
                  ref: 'img',
                  attrs: {
                    src: this.imageURL,
                    alt: this.alt,
                    width: this.width,
                    title: this.title
                  }
                })
              ]
            )
          },
          [],
          !1,
          null,
          'e557e4ae',
          null
        ).exports)
      const Te = {
        name: 'Badge',
        props: {type: {type: String}, color: {type: String}}
      }
      const Oe =
        (n(60),
        new Object(m.a)(
          Te,
          (e, t) => {
            return (0, t._c)(
              'span',
              {
                class: ['badge', 'is-' + t.props.type],
                style: {backgroundColor: t.props.color}
              },
              [t._t('default')],
              2
            )
          },
          [],
          !0,
          null,
          null,
          null
        ).exports)
      const Ee = {
        name: 'DocuteSelect',
        model: {event: 'change'},
        props: ['value'],
        methods: {
          handleChange(e) {
            this.$emit('change', e.target.value)
          }
        }
      }
      const Re =
        (n(61),
        new Object(m.a)(
          Ee,
          function() {
            const e = this.$createElement
            const t = this._self._c || e
            return t('div', {staticClass: 'DocuteSelect'}, [
              t(
                'select',
                {
                  staticClass: 'select',
                  domProps: {value: this.value},
                  on: {change: this.handleChange}
                },
                [this._t('default', null, null, {value: this.value})],
                2
              ),
              this._v(' '),
              t('div', {staticClass: 'arrow'}, [
                t(
                  'svg',
                  {
                    attrs: {
                      width: '13',
                      height: '6',
                      xmlns: 'http://www.w3.org/2000/svg',
                      fill: 'none',
                      stroke: '#979797',
                      'fill-rule': 'evenodd',
                      'stroke-linecap': 'square'
                    }
                  },
                  [
                    t('path', {
                      attrs: {
                        d: 'M1.367.375l5.185 5.303M11.685.375L6.5 5.678'
                      }
                    })
                  ]
                )
              ])
            ])
          },
          [],
          !1,
          null,
          'b1d3646a',
          null
        ).exports)
      const $e = {
        name: 'Note',
        props: {
          type: {type: String, default: 'note'},
          label: {type: [String, Boolean], default: !0}
        }
      }
      const Me =
        (n(62),
        new Object(m.a)(
          $e,
          (e, t) => {
            const n = t._c
            return n(
              'div',
              {class: ['note', 'is-' + t.props.type]},
              [
                t.props.label
                  ? n('span', {staticClass: 'note-label'}, [
                      t._v(
                        t._s(
                          !0 === t.props.label ? t.props.type : t.props.label
                        ) + ':'
                      )
                    ])
                  : t._e(),
                t._v(' '),
                t._t('default')
              ],
              2
            )
          },
          [],
          !0,
          null,
          null,
          null
        ).exports)
      const Be = {
        name: 'Gist',
        props: {id: {type: String, required: !0}},
        data() {
          return {html: ''}
        },
        mounted() {
          const e = this
          window['gist_callback_' + this.id] = function(t) {
            const n = document.createElement('link');
(n.href = t.stylesheet),
              (n.rel = 'stylesheet'),
              document.head.appendChild(n),
              (e.html = t.div)
          }
          const t = document.createElement('script');
(t.src =
            'https://gist.github.com/egoist/' +
            this.id +
            '.json?callback=gist_callback_' +
            this.id),
            document.head.appendChild(t)
        }
      }
      const Pe =
        (n(63),
        new Object(m.a)(
          Be,
          function() {
            const e = this.$createElement
            const t = this._self._c || e
            return this.html
              ? t('div', {domProps: {innerHTML: this._s(this.html)}})
              : t('Loading')
          },
          [],
          !1,
          null,
          null,
          null
        ).exports)
      const Ze = {name: 'Loading'}
      const Ge =
        (n(64),
        new Object(m.a)(
          Ze,
          (e, t) => {
            t._c
            return t._m(0)
          },
          [
            function(e, t) {
              const n = t._c
              return n('div', {staticClass: 'loading'}, [
                n('div', {staticClass: 'dots'}, [
                  n('span'),
                  t._v(' '),
                  n('span'),
                  t._v(' '),
                  n('span')
                ]),
                t._v(' '),
                n('span', {staticClass: 'loading-text'}, [t._v('Loading Gist')])
              ])
            }
          ],
          !0,
          null,
          '08f13c07',
          null
        ).exports)
      const Ne = {name: 'ExternalLinkIcon'}
      const Fe = new Object(m.a)(
        Ne,
        (e, t) => {
          const n = t._c
          return n(
            'svg',
            t._g(
              t._b(
                {
                  class: [t.data.staticClass, t.data.class],
                  attrs: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    'aria-hidden': 'true',
                    viewBox: '0 0 100 100',
                    width: '15',
                    height: '15'
                  }
                },
                'svg',
                t.data.attrs,
                !1
              ),
              t.data.on
            ),
            [
              n('path', {
                attrs: {
                  fill: 'currentColor',
                  d:
                    'M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z'
                }
              }),
              t._v(' '),
              n('polygon', {
                attrs: {
                  fill: 'currentColor',
                  points:
                    '45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9'
                }
              })
            ]
          )
        },
        [],
        !0,
        null,
        null,
        null
      ).exports
      const He = {
        computed: {
          languages() {
            const e = this.$store.getters.languageOverrides
            return Object.keys(e).map(t => {
              return {path: t, language: e[t].language}
            })
          }
        },
        methods: {
          handleChange(e) {
            const t = this.$route.path.replace(
              new RegExp('^' + this.$store.getters.currentLocalePath),
              e
            )
            this.$router.push(t)
          }
        }
      }
      const ze =
        (n(65),
        new Object(m.a)(
          He,
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return n(
              'div',
              {staticClass: 'LanguageSelector'},
              [
                n('DocuteSelect', {
                  attrs: {value: e.$store.getters.currentLocalePath},
                  on: {change: e.handleChange},
                  scopedSlots: e._u([
                    {
                      key: 'default',
                      fn(t) {
                        const r = t.value
                        return [
                          n('option', {attrs: {disabled: ''}}, [
                            e._v('Choose Language')
                          ]),
                          e._v(' '),
                          e._l(e.languages, t => {
                            return n(
                              'option',
                              {
                                key: t.path,
                                domProps: {
                                  value: t.path,
                                  selected: r === t.path
                                }
                              },
                              [e._v(e._s(t.language))]
                            )
                          })
                        ]
                      }
                    }
                  ])
                })
              ],
              1
            )
          },
          [],
          !1,
          null,
          'b011d160',
          null
        ).exports,
        {
          name: 'hoistTags',
          extend(e) {
            e.extendMarkedRenderer(e => {
              const t = /^<(script|style)(?=(\s|>|$))/i
              e.html = function(e) {
                return (
                  (e = e.trim()),
                  t.test(e)
                    ? e
                        .replace(/^<(script|style)/, '<v-$1')
                        .replace(/<\/(script|style)>$/, '</v-$1>')
                    : e
                )
              }
            })
          }
        })
      const De = {
        methods: {
          handleChange(e) {
            z(e) ? (location.href = e) : this.$router.push(e)
          }
        },
        computed: {
          currentVersionLink() {
            for (
              let e = this.$store.getters.config.versions,
                t = 0,
                n = Object.keys(e);
              t < n.length;
              t++
            ) {
              const r = e[n[t]].link
              if (r !== '/' && this.$route.path.startsWith(r)) return r
            }
            return '/'
          }
        }
      }
      const qe =
        (n(66),
        new Object(m.a)(
          De,
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return n(
              'div',
              {staticClass: 'VersionsSelector'},
              [
                n('DocuteSelect', {
                  attrs: {value: e.currentVersionLink},
                  on: {change: e.handleChange},
                  scopedSlots: e._u([
                    {
                      key: 'default',
                      fn(t) {
                        const r = t.value
                        return [
                          n('option', {attrs: {disabled: ''}}, [
                            e._v('Choose Version')
                          ]),
                          e._v(' '),
                          e._l(e.$store.getters.config.versions, (t, i) => {
                            return n(
                              'option',
                              {
                                key: i,
                                domProps: {
                                  value: t.link,
                                  selected: r === t.link
                                }
                              },
                              [e._v('\n      ' + e._s(i) + '\n    ')]
                            )
                          })
                        ]
                      }
                    }
                  ])
                })
              ],
              1
            )
          },
          [],
          !1,
          null,
          '7c9c8a34',
          null
        ).exports)
      const Ve = {
        name: 'versions',
        extend(e) {
          e.store.getters.config.versions &&
            e.registerComponent('sidebar:start', qe)
        }
      }
      const Je = function(e, t) {
        return typeof e === 'string'
          ? {template: '<div class="' + t + '">' + e + '</div>'}
          : e
      }
      const Ye = {
        name: 'banner-footer',
        extend(e) {
          const t = e.store.getters.config
          const n = t.banner
          const r = t.footer
          n && e.registerComponent('content:start', Je(n, 'docute-banner')),
            r && e.registerComponent('content:end', Je(r, 'docute-footer'))
        }
      }
      const We = {
        data() {
          const e = localStorage.getItem('docute:theme')
          return {
            dark:
              'dark' in this.$route.query ||
              (e === 'dark' ||
                (e !== 'default' &&
                  this.$store.getters.config.theme === 'dark'))
          }
        },
        created() {
          this.$store.commit('SET_THEME', this.dark ? 'dark' : 'default')
        },
        methods: {
          handleChange() {
            const e = this.$store.getters.config.theme;
(this.dark = !this.dark),
              this.$store.commit(
                'SET_THEME',
                this.dark ? 'dark' : e === 'dark' ? 'default' : e
              ),
              localStorage.setItem(
                'docute:theme',
                this.dark ? 'dark' : 'default'
              )
          }
        }
      }
      const Ue =
        (n(67),
        new Object(m.a)(
          We,
          function() {
            const e = this.$createElement
            const t = this._self._c || e
            return t('div', {staticClass: 'dark-theme-toggler'}, [
              t(
                'div',
                {
                  staticClass: 'toggle',
                  class: {checked: this.dark},
                  on: {click: this.handleChange}
                },
                [
                  this._m(0),
                  this._v(' '),
                  t('div', {staticClass: 'toggle-thumb'})
                ]
              ),
              this._v(' '),
              t('input', {
                staticClass: 'toggler-screen-reader-only',
                attrs: {
                  type: 'checkbox',
                  'aria-label': 'Switch between Dark and Default theme'
                },
                domProps: {checked: this.dark}
              })
            ])
          },
          [
            function() {
              const e = this.$createElement
              const t = this._self._c || e
              return t('div', {staticClass: 'toggle-track'}, [
                t('div', {staticClass: 'toggle-track-check'}, [
                  t('img', {
                    staticStyle: {'pointer-events': 'none'},
                    attrs: {
                      src:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAABlJJREFUWAm1V3tsFEUcntnXvXu0tBWo1ZZHihBjCEWqkHiNaMLDRKOtQSKaiCFKQtS/SbxiFCHGCIkmkBSMwZhQNTFoQZD0DFiwtCDFAkdDqBBBKFj63rvdnfH7zfVo5aFBj0l2Z/dm5vd98/0es8dYjlpr62azufnDQNZcU1PciMfjWvb9rvZSMk4Ayfb36pLH13189GC8LAtIRLLPt+pzwrCuLq4ISEv/gHmitrAwfPbEkXc/ad4dL6iujrvyX0jcitgd/yZlZqftP6995Mr5TVLa22Tn8XVX2g/XLSRjUu7Q79jonS7I7hS7/0oOb5VyqF52n98oj7esXX07EjlxwXWisRmSnm3b29TTM8iYrjmFBWExubxwY/uhNas4r/WySl1fc5cetDMd7ydl+lMJJRw5WC8ud62Xx5rfepzwxgZmbhUYNS5Stvsj4yo2GXJEFBVHWDBkfdbR9HpYBaaUajDnBLKKpl1xRKYcgGtMCqEzTaSnThk/SQT0uJqTqFNBmXMCsZE48DzRZRMBRjv1GHNdk3HBImF9ZUvTyxM40pMKVc4JZBXQOLOFoDeKSxdp6HIQcO4rjYT9fn0pjbz9GLt7BAAODmjSVReXUMFzNW5x5vfxp2mIxZjIuQKJxAmFa+is2DQJJQ0JyBVExNOYcJnPxx/6/utnijmP555ALEagKAGGnGn64QORBjARcIA/yJk7JMJBLRrNtybTvH88KGjCf2jK86bhzmMcwDKFZEQvbIhxFYhChoMWMzU2iWznlIBEVJOsP+1bdX/ALx9l7jApADeDAEcMkE90JnUmmGl4USKQ0xhoW3JB5XY0YrxYWhLwMZZypUyjDGH35AbNwgUGiFBPpuGbHCpAOV1ZGXf2f/taftAv31DyeymN2d1IhAFAwTOmnzF/kKcdh3me7CYCOVNgycju84u8DeVlwfFq9/ZlTfldYrMUjOlrkjkD+rU+WzCROkcEchIDHR011syZW9JHD7y07N6JvhWMpz3pugaTkB6lWFVCKkhck0zzeMp2utq+uHrmfxOgoCO/Z8CXPlEQ1bdH8wgvhSIkEG0ICcQeExIFGdimjvKka7btJFZuaXOammIGKUCFQ53j9EN1dYKWqHf0t2w407W2tgs6h89ZnImjB55flh81tt9XirjjDuSl+oIPRQ0iWPgNZ5GqTqbBe3vSzEl5n5PhWKwocyR2HlqYN61qV18WjYjE8JLARZPQsUSim8foIRYTlGr02Ly7piASFRtKJ4VfieYhxdS2JcDVMN6xVOKZyrCGm8b108lrLRVzvptLH7IoEFLFANes6KnDi+uxfmvFnF17oALq5u1agu3/YfHkcSFzeSggV5eXRfIB7CHNcO5SUI+Ih5Ir7f4MAV9IqdFzdZgNpZw1Gcs1mNvgGbTbqQ9/cz7ZuuhgyYRQ49ljTyWHhr2DwpNHHFf+5gnWZ3Bharo+0TD5dNMw5vv9RlVpSRDHK4TlnoukhtYApuOHejSZQuo5g/A9BysdKRCyLl6062fN37OXMDlvUJtUrtmxo0avrW3wTrYs3jJ9RvRVChrmSmanPMpX2OXMsmDGh6AiEIwBAlvkOqIdBy+8JyAz8pz7QxiDth4KDy5uAlwzrWTnwC8Vc4KVAMZ3YUZ+IqoIjP3h5KFFX1ZMy3uW+7RhEDHgTi0zC9rS7uhPCDiNrGFyqBeERtKN/B0YlyFCkw0NJ5C0Ojv7zvT1a1WV1TuvZDdL4NTgB7CASYpsen6gqvG5jmTf5qHedADgkBl3D0nkSgNhZACDyi0FUKZRr3IdRjgN4WPPoFMIIegIK3mqd38fS80mcJKelM4szNyzZtQbkchGePuBRS8Eg9pHU8ojRQpSqs+ajAIwTjjUMQ/nvTNM0kicwYxZIYMh/891DYi+fvedB+c1xsm4lDU6ya+Axtz+RiAzEVYbajQOpq17F0R9QevNcEhfcU+xvyQQUalGJBSesqOkgPQ4YNyUZL9fSvUPDjoNAwN8/dwFjaczNkc3ptaMud1EIDtGcmXTcefO2cGSvKIFfp/2JIJxlq7xEl3nVPM4fDeIbPkD16/ptNc0bDu7qxbsu0R2JGywWMIjF2ft3tjfloAyQAGXiOn8hrqwbVvMXzaO+QeHXP6nF0wvX74Hf4NGG5GPjSlYoyM3P/0FbCT6zvM/yYoAAAAASUVORK5CYII=',
                      width: '16',
                      height: '16',
                      role: 'presentation'
                    }
                  })
                ]),
                this._v(' '),
                t('div', {staticClass: 'toggle-track-x'}, [
                  t('img', {
                    staticStyle: {'pointer-events': 'none'},
                    attrs: {
                      src:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAABwNJREFUWAmtV1tsFFUY/s6Z2d22zLYlZakUCRVaQcqlWIiCiS1gTEB9UAO+GR9En3iQGI0xJiSiRB98MjEq8cEQTSBeHhQM0V7whtEGDWC90BYitxahtNtu25058/v/ZzvLbilawJNM5+yZ89+//1LgJhYRNLW1uDfBAvpGiIk2O5auvfFxqIH3ZJ8/u06GN6Z9+wVl5SjcD1IbZa/UPkPyYl2uR4dreoD2bnbYxTlBBRytkHXtAREphP5KuH4lddx9h70yxX05t7yYXwGb6W8nx1jibpl2rFlGBxcG9M18okOrn7Bnk/BAO/4bI0UeEE1zjBp3UmvjOxJXJdaKN/ZiIu4tOZrAb4aTdZAZArKmWeiiJZ6jt5tiagdCS9+6cgO1Ne6Mvhe+ixTIfyDVhipnK9p+P0Edqx9RW/YZtQVGmOLChRxNNlyPsTEgPQKMB3dbEHa0h1awYmQ83enTd2vmUtvKd1Glv2RkzBb+kZGRrKtjzG60Wguhd/lJZBingbcfWWe72vjT75bJDrhYtvA0hrurETDr5HyF2Knb1MM4ab//xIoOqueA0edRnkkinTyJdYvqLFDZO4zUPFCvVoDjJq4T7TE61IWh4x5KqxX5KVKkX8WZ/t2ov2cb3MHt4dhIyOxIJxJOOF6xRx/99BksXLoecWcXytILMNBDqKpnGZWPquYfPxY8iXGR9fK+SgFrgcRPXPjVqhehL+3EmZ5RGJQi1QBU8TPThQnOQzm+5UXGIcetUeEAfP13VwzpI+w1jGJWdSliNfvVhiMPiOsllJag4M/UGHiqM6dlBb2OTLKHHV6KkvogrJ4XhBWniWK/Gp1MQyf93FOeUXKmKk/FzJxbQtKLjFXYT4USupy8fQVir2ynVEBiZMG0qtOHMS/AW4Gwrk7BG3C1F0B5nqNKE0CME4MfVRLPnXkBKe+ipvoFhNQywOhdghvLi0F8ReyVXV4BKTBRbbe5f64zR/DHsdZw1hJfeWlHl/GNRJzDxrd5m192z78TMaVnKELZoINZS4BzQ7vtnZljSnha/pPCbkuxzXcupYwI5tIeCpGc0Yp9tWHZQy/rmYhRfNgg4bHJBYLzGkxsRJF4XKlE2jBOHNSv3kY7Tj6vthzPFl61BrYwqFlmEQhtSVXmLiksxLmtRgYXI1ULU61JJ4eVKmG3/5sCVgpbMT6OMJ2E08/29Xf3w6v4FnHdCjfWgXu/O8Z5mLdCkeRs2khHe1DqOtQwbHWTAnM5S2HNmhALYo5KjkPFrMMKjZl6HxhWIAb0BqE+/73GrBRQUsKYiBu4JX8ycI6wtw+i5ef3NZpsrKVSHYCP37jwGDgeE1SA0S/xtl5SU2fs1ApEp0qTLVRjgyycDSsLHMSwmFltZMStR3uLLg6BdLhDa5dC6ryU2pHBe1BVO9tUcwfitJt2CLJZUHoG6T7Op75u0IyK31TCPcwFqgPk/KCaD3dFOuZBCO7xvCT/j048b3I3c7F2+WuOW7qdgkucFYlcQ4qop3yzTX7WaKfOCccye3Ts1Etq0+a/BHCF1yPgF3tAUkR6OrtGmo6gl94qqcXKh3rDyrOkPa58URoWcov2Mo6M+0QjrqKB+b7++oMa9Sz+ZkM0mie6aAtnGUvhmxaI+TogPOSQedgWioGSHFLn3v4kLh4HRspNmOGv41k+55siLFp2z6xYeJjhljFcbmxJlr4ga06TbevSByz/glQq4BJx46/c+237PbBqEYKxX3HpmKZEnQnr65X20hqJYaNcLoFOLiJk2LuBbyg7Q0OEn+hm0P3honxFD6rdxYorKpeIoi4YSSvyQHQIbM5t4+YNxLj/OxhVOOE4585qGpjnq+wSx6Q9CtNxTjd5klB+g6Mv36r0+b9cZFi44WYkHdG2ZWb3TtOUOXyVAlKlpGvJIAJ3eBMyfYS5C0qRZGtC85j+4sOasDe9xznPYezhhO/2Q6eP2fSOvYHOjtuQ1a9Q1VKynVDaMc8E0tptdxUsTFpFIYjcZKcbnoaQTNdiqCwNlL4G7oziSqGnT1ALf34vhk4R5zU3qYV9ONp9K88RtouShE68JwaU8dFw5W617shWa9ykeaBIn2hcsvPgL00k45QdTCZuSVcTRNs+8fnyLvooQfR5iujAnR9bxfY2xOVOxFS8SK3Le0l48VyYu1M8HRe5JD8wKPTjYnifaK3Wfn/GChYQ8ZAi6WRzWgqLV5YrsVLnZaVSoXU1g9gOIDwFySiGi+Zdrnzr7J3r+SMuszlcQCRn8lNGcTuSy2jOI7o9mxjZo+vR3ej3tN+ifRSOyUTS0+VMOid93cCubeiy/6TImS0QxRSCq2vxKr45zV+FQnjWH6D2xg+E9EatLcLAdHTgtGGD80D6jM0+aOl4wJgO/f96R2aJKCQ3yvgftRhdFMOpd6oAAAAASUVORK5CYII=',
                      width: '16',
                      height: '16',
                      role: 'presentation'
                    }
                  })
                ])
              ])
            }
          ],
          !1,
          null,
          '2ae1d78e',
          null
        ).exports)
      const Ke = {
        name: 'dark-theme-toggler',
        extend(e) {
          const t = e.store.getters.config.darkThemeToggler
          !0 === t
            ? e.registerComponent('sidebar:post-end', Ue)
            : t === 'sidebar' &&
              (e.registerComponent('header-right:start', Ue),
              e.registerComponent('mobile-sidebar:start', Ue))
        }
      }
      const Qe = n(38)
      let Xe
      const et = {
        data() {
          return {result: [], focused: !1}
        },
        watch: {
          '$route.fullPath'() {
            this.focused = !1
          }
        },
        mounted() {
          document.addEventListener('click', this.handleClick)
        },
        beforeDestroy() {
          document.removeEventListener('click', this.handleClick)
        },
        computed: {
          enabled() {
            return this.$pluginApi.search.enabled
          }
        },
        methods: {
          handleClick(e) {
            ;(this.$el.contains(e.target) &&
              !this.$refs.result.contains(e.target)) ||
              (this.focused = !1)
          },
          handleSearch: new Object(Qe.a)(
            300,
            ((Xe = function(e) {
              let t
              let n
              let r
              const i = this
              const s = i.$pluginApi.search.handler
              return (
                (t = s(e.target.value)),
                (n = function(e) {
                  i.result = e
                }),
                r
                  ? n
                    ? n(t)
                    : t
                  : ((t && t.then) || (t = Promise.resolve(t)),
                    n ? t.then(n) : t)
              )
            }),
            function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t]
              try {
                return Promise.resolve(Xe.apply(this, e))
              } catch (n) {
                return Promise.reject(n)
              }
            })
          ),
          toggleFocus(e) {
            this.focused = e
          }
        }
      }
      const tt =
        (n(68),
        new Object(m.a)(
          et,
          function() {
            const e = this
            const t = e.$createElement
            const n = e._self._c || t
            return e.enabled
              ? n(
                  'div',
                  {staticClass: 'search', class: {'is-focused': e.focused}},
                  [
                    n('div', {staticClass: 'search-input-wrapper'}, [
                      n('span', {staticClass: 'search-icon'}, [
                        n(
                          'svg',
                          {
                            attrs: {
                              width: '13',
                              height: '13',
                              viewBox: '0 0 13 13',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'currentColor'
                            }
                          },
                          [
                            n('path', {
                              attrs: {
                                d:
                                  'M8.87 8.16l3.25 3.25-.7.71-3.26-3.25a5 5 0 1 1 .7-.7zM5 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
                              }
                            })
                          ]
                        )
                      ]),
                      e._v(' '),
                      n('input', {
                        staticClass: 'search-input',
                        attrs: {type: 'text'},
                        on: {
                          input: e.handleSearch,
                          focus(t) {
                            return e.toggleFocus(!0)
                          }
                        }
                      }),
                      e._v(' '),
                      n(
                        'div',
                        {
                          directives: [
                            {
                              name: 'show',
                              rawName: 'v-show',
                              value: e.result.length > 0,
                              expression: 'result.length > 0'
                            }
                          ],
                          ref: 'result',
                          staticClass: 'search-result'
                        },
                        e._l(e.result, (t, r) => {
                          return n(
                            'router-link',
                            {
                              key: r,
                              staticClass: 'search-result-item',
                              attrs: {to: t.link}
                            },
                            [
                              n('div', {staticClass: 'item-header'}, [
                                n('div', {
                                  staticClass: 'item-title',
                                  domProps: {innerHTML: e._s(t.title)}
                                }),
                                e._v(' '),
                                t.label
                                  ? n('span', {staticClass: 'item-label'}, [
                                      e._v(e._s(t.label))
                                    ])
                                  : e._e()
                              ]),
                              e._v(' '),
                              n('div', {
                                staticClass: 'item-desc',
                                domProps: {innerHTML: e._s(t.description)}
                              })
                            ]
                          )
                        }),
                        1
                      )
                    ])
                  ]
                )
              : e._e()
          },
          [],
          !1,
          null,
          '2d187d87',
          null
        ).exports)
      const nt = {
        name: 'search',
        extend(e) {
          e.registerComponent('header-right:start', tt)
        }
      }
      s.a.component(je.name, je),
        s.a.component(Oe.name, Oe),
        s.a.component(Re.name, Re),
        s.a.component(Me.name, Me),
        s.a.component(Fe.name, Fe),
        s.a.component(Pe.name, Pe),
        s.a.component(Ge.name, Ge),
        s.a.use(e => {
          e.component('v-style', Ie('style')),
            e.component('v-script', Ie('script'))
        }),
        s.a.mixin({
          created() {
            const e = this.$options.pluginApi || this.$root.$pluginApi
            e && (this.$pluginApi = e)
          }
        })
      const rt = (function() {
        function e(e) {
          void 0 === e && (e = {})
          const t = Se(e.router)
          new Object(o.sync)(ne, t),
            (this.router = t),
            (this.store = ne),
            ne.commit(
              'SET_CONFIG',
              Object.assign({title: V && document.title}, e)
            )
          const n = [ze, Ve, Ye, Ke, nt].concat(
            ne.state.originalConfig.plugins || []
          );
(this.pluginApi = new g({plugins: n, store: ne, router: t})),
            this.applyPlugins(),
            (this.app = new s.a({
              router: t,
              store: ne,
              pluginApi: this.pluginApi,
              render(e) {
                return e(v)
              }
            })),
            !1 !== e.mount && this.mount()
        }
        const t = e.prototype
        return (
          (t.mount = function() {
            const e = ne.getters.target
            return (
              window.__DOCUTE_INITIAL_STATE__
                ? this.app.$mount('#' + e, !0)
                : this.app.$mount('#' + e),
              this
            )
          }),
          (t.applyPlugins = function() {
            let e = this.pluginApi.plugins
            const t = Array.isArray(e)
            let n = 0
            for (e = t ? e : e[Symbol.iterator](); ; ) {
              var r
              if (t) {
                if (n >= e.length) break
                r = e[n++]
              } else {
                if ((n = e.next()).done) break
                r = n.value
              }
              r.extend(this.pluginApi)
            }
          }),
          e
        )
      })()
      rt.version = '4.11.0'
      const it = rt
      function st() {
        const e = lt([
          '\n    <div class="reverse-text">\n      {{ reversedText }}\n      <v-style>\n        .reverse-text { border: 1px solid var(--border-color); padding: 20px;\n        font-weight: bold; border-radius: 4px; }\n      </v-style>\n    </div>\n  '
        ])
        return (
          (st = function() {
            return e
          }),
          e
        )
      }
      function ot() {
        const e = lt([
          '\n      <div class="docute-banner">\n        <note :label="false"\n          ><PatreonIcon\n            width="16"\n            height="16"\n            style="position:relative;top:2px;margin-right:8px;"\n          />\u6765\u8fd9\u91cc\u63d0\u4ea4\u4f60\u8981\u7684\u4e1c\u897f\n          <a href="https://leops.cn/topics/node45" target="_blank"\n            >Leops <ExternalLinkIcon\n          /></a>\n          \u6211\u4eec\u6765\u5e2e\u4f60\u5b8c\u6210.</note\n        >\n      </div>\n    '
        ])
        return (
          (ot = function() {
            return e
          }),
          e
        )
      }
      function at() {
        const e = lt([
          '\n    <svg\n      width="569px"\n      height="546px"\n      viewBox="0 0 569 546"\n      version="1.1"\n      xmlns="http://www.w3.org/2000/svg"\n    >\n      <title>Patreon logo</title>\n      <g>\n        <circle\n          fill="rgb(249, 104, 84)"\n          id="Oval"\n          cx="362.589996"\n          cy="204.589996"\n          r="204.589996"\n        ></circle>\n        <rect\n          fill="rgb(5, 45, 73)"\n          id="Rectangle"\n          x="0"\n          y="0"\n          width="100"\n          height="545.799988"\n        ></rect>\n      </g>\n    </svg>\n  '
        ])
        return (
          (at = function() {
            return e
          }),
          e
        )
      }
      function lt(e, t) {
        return t || (t = e.slice(0)), (e.raw = t), e
      }
      typeof window !== 'undefined' &&
        ((window.Vue = s.a), (window.__DOCUTE_VERSION__ = '4.11.0'))
      const ct = {template: i()(at())}
      new it({
        target: 'app',
        title: 'Leops \u8FD0\u7EF4\u5907\u5fd8\u5355',
        highlight: [
          'typescript',
          'bash',
          'json',
          'markdown',
          'python',
          'bat',
          'powershell',
          'yaml'
        ],
        plugins: [].filter(Boolean),
        editLinkBase:
          'https://github.com/leops-china/leops-cheatsheet/tree/master/website/docs',
        editLinkText: '\u5728 GitHub \u4e0a\u7f16\u8f91\u6b64\u9875',
        router: {mode: 'hash'},
        detectSystemDarkTheme: !0,
        darkThemeToggler: !0,
        sourcePath: '/',
        componentMixins: [],
        nav: [
          {title: 'CheatSheet', link: '/cheatsheet/'},
          {title: '\u914D\u7F6E', link: '/conf/'},
          {title: '\u811A\u672C', link: '/scripts/'},
          {title: 'Version', link: 'https://lework.github.io/leversion/'},
          {title: '\u8FD0\u7EF4\u6280\u672f\u5708', link: 'https://leops.cn'},
          {
            title: 'GitHub',
            link: 'https://github.com/leops-china/leops-cheatsheet'
          }
        ],
        sidebar: [
          {
            title: '\u8BED\u8A00',
            children: [
              {title: 'Bash', link: '/cheatsheet/linux/bash'},
              {title: 'javascripts', link: '/cheatsheet/dev/javascripts'},
              {title: 'jinja2', link: '/cheatsheet/dev/jinja2'},
              {title: 'yaml', link: '/cheatsheet/dev/yaml'},
              {title: 'vue', link: '/cheatsheet/dev/vue'},
              {
                title: 'python2-\u57FA\u7840\u77e5\u8bc6',
                link: '/cheatsheet/dev/python2/base'
              },
              {
                title: 'python2-\u6392\u5e8f\u7b97\u6cd5',
                link: '/cheatsheet/dev/python2/sort'
              },
              {
                title:
                  'python2-\u5185\u5efa\u51fd\u6570\u548c\u5bf9\u8c61\u65b9\u6cd5',
                link: '/cheatsheet/dev/python2/buildin'
              },
              {
                title: 'python2-\u51FD\u6570\u548c\u7c7b',
                link: '/cheatsheet/dev/python2/function'
              },
              {
                title: 'python2-\u5F02\u5E38\u5904\u7406',
                link: '/cheatsheet/dev/python2/exception'
              },
              {
                title: 'python2-\u5E38\u7528\u6a21\u5757',
                link: '/cheatsheet/dev/python2/module'
              },
              {
                title: 'python2-\u7F16\u7801\u89c4\u8303',
                link: '/cheatsheet/dev/python2/pep008'
              },
              {
                title: 'python2-\u7EBF\u7A0B\u4E0E\u8FDB\u7A0B',
                link: '/cheatsheet/dev/python2/process'
              },
              {
                title: 'python2-\u6B63\u5219\u8868\u8fbe\u5f0f',
                link: '/cheatsheet/dev/python2/reg'
              }
            ]
          },
          {
            title: 'Linux',
            children: [
              {
                title: '\u5E38\u7528\u547d\u4ee4',
                link: '/cheatsheet/linux/linux'
              },
              {title: 'Git', link: '/cheatsheet/linux/git'},
              {title: 'Cron', link: '/cheatsheet/linux/cron'}
            ]
          },
          {
            title: '\u5BB9\u5668',
            children: [
              {title: 'docker', link: '/cheatsheet/container/docker'},
              {
                title: 'docker-compose',
                link: '/cheatsheet/container/docker-compose'
              },
              {title: 'kubectl', link: '/cheatsheet/container/kubectl'},
              {title: 'helm', link: '/cheatsheet/container/helm'}
            ]
          },
          {
            title: '\u76D1\u63A7',
            children: [
              {title: 'Prometheus', link: '/cheatsheet/monitor/prometheus'},
              {title: 'Zabbix', link: '/cheatsheet/monitor/zabbix'}
            ]
          },
          {
            title: '\u6570\u636e\u5e93',
            children: [
              {title: 'Mysql', link: '/cheatsheet/db/mysql/mysql'},
              {
                title: 'Mysql\u5E38\u89C1\u9519\u8bef\u4ee3\u7801',
                link: '/cheatsheet/db/mysql/code'
              }
            ]
          },
          {
            title: 'Devops',
            children: [
              {title: 'Ansible', link: '/cheatsheet/ops/ansible/ansible'},
              {
                title: 'Ansible\u5173\u952e\u5b57',
                link: '/cheatsheet/ops/ansible/keywords'
              }
            ]
          }
        ],
        overrides: {
          '/': {language: 'cheatsheet'},
          '/conf/': {
            language: '\u914D\u7F6E',
            sidebar: [
              {
                title: 'Nginx',
                children: [
                  {title: 'nginx\u914D\u7F6E', link: '/conf/nginx/nginx'},
                  {title: '\u5E38\u7528\u914d\u7f6e', link: '/conf/nginx/hot'},
                  {title: '\u5C0F\u4F8B\u5B50', link: '/conf/nginx/example'}
                ]
              },
              {title: 'Supervisord', link: '/conf/supervisord/supervisord'},
              {title: 'Haproxy', link: '/conf/haproxy/haproxy'},
              {title: 'Zabbix', link: '/conf/zabbix/zabbix'},
              {title: 'Prometheus', link: '/conf/prometheus/prometheus'},
              {title: 'Mysql', link: '/conf/mysql/mysql'},
              {title: 'Redis', link: '/conf/redis/redis'},
              {title: 'Mongodb', link: '/conf/mongodb/mongodb'}
            ]
          },
          '/scripts/': {
            language: '\u811A\u672C',
            sidebar: [
              {
                title: 'Bat',
                children: [
                  {title: 'library', link: '/scripts/bat/library'},
                  {title: '\u4F8B\u5B50', link: '/scripts/bat/example'}
                ]
              },
              {
                title: 'Bash',
                children: [
                  {title: 'library', link: '/scripts/bash/library'},
                  {title: '\u4F8B\u5B50', link: '/scripts/bash/example'}
                ]
              },
              {
                title: 'powershell',
                children: [
                  {title: 'library', link: '/scripts/powershell/library'},
                  {title: '\u4F8B\u5B50', link: '/scripts/powershell/example'}
                ]
              },
              {
                title: 'python',
                children: [
                  {title: 'library', link: '/scripts/python/library'},
                  {title: '\u4F8B\u5B50', link: '/scripts/python/example'}
                ]
              }
            ]
          }
        },
        footer:
          '\n  <div style="border-top:1px solid var(--border-color);padding-top:30px;margin: 40px 0;color:#999999;font-size: .9rem;">\n  &copy; ' +
          new Date().getFullYear() +
          ' Developed by <a href="https://egoist.sh" target="_blank">EGOIST</a>. Powered by <a href="https://leops.cn" target="_blank">LEOPS</a>. Released under MIT license.\n  </div>\n  ',
        banner: {template: i()(ot()), components: {PatreonIcon: ct}}
      }),
        Vue.component('ReverseText', {
          props: {text: {type: String, required: !0}},
          template: i()(st()),
          computed: {
            reversedText() {
              return this.text
                .split('')
                .reverse()
                .join('')
            }
          }
        }),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.register('/sw.js')
    }
  ],
  [[39, 2, 0]]
])

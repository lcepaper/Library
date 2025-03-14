layui.define('jquery', function (exports) {
    var jQuery = layui.jquery;
    !function () {
        "undefined" == typeof Math.sgn && (Math.sgn = function (a) {
            return 0 == a ? 0 : a > 0 ? 1 : -1
        });
        var a = {
            subtract: function (a, b) {
                return {x: a.x - b.x, y: a.y - b.y}
            }, dotProduct: function (a, b) {
                return a.x * b.x + a.y * b.y
            }, square: function (a) {
                return Math.sqrt(a.x * a.x + a.y * a.y)
            }, scale: function (a, b) {
                return {x: a.x * b, y: a.y * b}
            }
        }, b = 64, c = Math.pow(2, -b - 1), d = function (b, c) {
            for (var d = [], e = f(b, c), h = c.length - 1, i = 2 * h - 1, j = g(e, i, d, 0), k = a.subtract(b, c[0]), m = a.square(k), n = 0, o = 0; j > o; o++) {
                k = a.subtract(b, l(c, h, d[o], null, null));
                var p = a.square(k);
                m > p && (m = p, n = d[o])
            }
            return k = a.subtract(b, c[h]), p = a.square(k), m > p && (m = p, n = 1), {location: n, distance: m}
        }, e = function (a, b) {
            var c = d(a, b);
            return {point: l(b, b.length - 1, c.location, null, null), location: c.location}
        }, f = function (b, c) {
            for (var d = c.length - 1, e = 2 * d - 1, f = [], g = [], h = [], i = [], k = [[1, .6, .3, .1], [.4, .6, .6, .4], [.1, .3, .6, 1]], l = 0; d >= l; l++) f[l] = a.subtract(c[l], b);
            for (var l = 0; d - 1 >= l; l++) g[l] = a.subtract(c[l + 1], c[l]), g[l] = a.scale(g[l], 3);
            for (var m = 0; d - 1 >= m; m++) for (var n = 0; d >= n; n++) h[m] || (h[m] = []), h[m][n] = a.dotProduct(g[m], f[n]);
            for (l = 0; e >= l; l++) i[l] || (i[l] = []), i[l].y = 0, i[l].x = parseFloat(l) / e;
            for (var o = d, p = d - 1, q = 0; o + p >= q; q++) {
                var r = Math.max(0, q - p), s = Math.min(q, o);
                for (l = r; s >= l; l++) j = q - l, i[l + j].y += h[j][l] * k[j][l]
            }
            return i
        }, g = function (a, c, d, e) {
            var f, j, m = [], n = [], o = [], p = [];
            switch (h(a, c)) {
                case 0:
                    return 0;
                case 1:
                    if (e >= b) return d[0] = (a[0].x + a[c].x) / 2, 1;
                    if (i(a, c)) return d[0] = k(a, c), 1
            }
            l(a, c, .5, m, n), f = g(m, c, o, e + 1), j = g(n, c, p, e + 1);
            for (var q = 0; f > q; q++) d[q] = o[q];
            for (var q = 0; j > q; q++) d[q + f] = p[q];
            return f + j
        }, h = function (a, b) {
            var c, d, e = 0;
            c = d = Math.sgn(a[0].y);
            for (var f = 1; b >= f; f++) c = Math.sgn(a[f].y), c != d && e++, d = c;
            return e
        }, i = function (a, b) {
            var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            i = a[0].y - a[b].y, j = a[b].x - a[0].x, k = a[0].x * a[b].y - a[b].x * a[0].y;
            for (var t = max_distance_below = 0, u = 1; b > u; u++) {
                var v = i * a[u].x + j * a[u].y + k;
                v > t ? t = v : max_distance_below > v && (max_distance_below = v)
            }
            return n = 0, o = 1, p = 0, q = i, r = j, s = k - t, l = n * r - q * o, m = 1 / l, e = (o * s - r * p) * m, q = i, r = j, s = k - max_distance_below, l = n * r - q * o, m = 1 / l, f = (o * s - r * p) * m, g = Math.min(e, f), h = Math.max(e, f), d = h - g, c > d ? 1 : 0
        }, k = function (a, b) {
            var c = 1, d = 0, e = a[b].x - a[0].x, f = a[b].y - a[0].y, g = a[0].x - 0, h = a[0].y - 0,
                i = e * d - f * c, j = 1 / i, k = (e * h - f * g) * j;
            return 0 + c * k
        }, l = function (a, b, c, d, e) {
            for (var f = [[]], g = 0; b >= g; g++) f[0][g] = a[g];
            for (var h = 1; b >= h; h++) for (var g = 0; b - h >= g; g++) f[h] || (f[h] = []), f[h][g] || (f[h][g] = {}), f[h][g].x = (1 - c) * f[h - 1][g].x + c * f[h - 1][g + 1].x, f[h][g].y = (1 - c) * f[h - 1][g].y + c * f[h - 1][g + 1].y;
            if (null != d) for (g = 0; b >= g; g++) d[g] = f[g][0];
            if (null != e) for (g = 0; b >= g; g++) e[g] = f[b - g][g];
            return f[b][0]
        }, m = {}, n = function (a) {
            var b = m[a];
            if (!b) {
                b = [];
                var c = function () {
                    return function (b) {
                        return Math.pow(b, a)
                    }
                }, d = function () {
                    return function (b) {
                        return Math.pow(1 - b, a)
                    }
                }, e = function (a) {
                    return function () {
                        return a
                    }
                }, f = function () {
                    return function (a) {
                        return a
                    }
                }, g = function () {
                    return function (a) {
                        return 1 - a
                    }
                }, h = function (a) {
                    return function (b) {
                        for (var c = 1, d = 0; d < a.length; d++) c *= a[d](b);
                        return c
                    }
                };
                b.push(new c);
                for (var i = 1; a > i; i++) {
                    for (var j = [new e(a)], k = 0; a - i > k; k++) j.push(new f);
                    for (var k = 0; i > k; k++) j.push(new g);
                    b.push(new h(j))
                }
                b.push(new d), m[a] = b
            }
            return b
        }, o = function (a, b) {
            for (var c = n(a.length - 1), d = 0, e = 0, f = 0; f < a.length; f++) d += a[f].x * c[f](b), e += a[f].y * c[f](b);
            return {x: d, y: e}
        }, p = function (a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
        }, q = function (a) {
            return a[0].x == a[1].x && a[0].y == a[1].y
        }, r = function (a, b, c) {
            if (q(a)) return {point: a[0], location: b};
            for (var d = o(a, b), e = 0, f = b, g = c > 0 ? 1 : -1, h = null; e < Math.abs(c);) f += .005 * g, h = o(a, f), e += p(h, d), d = h;
            return {point: h, location: f}
        }, s = function (a) {
            if (q(a)) return 0;
            for (var b = o(a, 0), c = 0, d = 0, e = 1, f = null; 1 > d;) d += .005 * e, f = o(a, d), c += p(f, b), b = f;
            return c
        }, t = function (a, b, c) {
            return r(a, b, c).point
        }, u = function (a, b, c) {
            return r(a, b, c).location
        }, v = function (a, b) {
            var c = o(a, b), d = o(a.slice(0, a.length - 1), b), e = d.y - c.y, f = d.x - c.x;
            return 0 == e ? 1 / 0 : Math.atan(e / f)
        }, w = function (a, b, c) {
            var d = r(a, b, c);
            return d.location > 1 && (d.location = 1), d.location < 0 && (d.location = 0), v(a, d.location)
        }, x = function (a, b, c, d) {
            d = null == d ? 0 : d;
            var e = r(a, b, d), f = v(a, e.location), g = Math.atan(-1 / f), h = c / 2 * Math.sin(g),
                i = c / 2 * Math.cos(g);
            return [{x: e.point.x + i, y: e.point.y + h}, {x: e.point.x - i, y: e.point.y - h}]
        };
        window.jsBezier = {
            distanceFromCurve: d,
            gradientAtPoint: v,
            gradientAtPointAlongCurveFrom: w,
            nearestPointOnCurve: e,
            pointOnCurve: o,
            pointAlongCurveFrom: t,
            perpendicularToCurveAt: x,
            locationAlongCurveFrom: u,
            getLength: s
        }
    }(), function () {
        "use strict";
        var a = this.Biltong = {}, b = function (a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }, c = function (a, c, d) {
            return a = b(a) ? a : [a.x, a.y], c = b(c) ? c : [c.x, c.y], d(a, c)
        }, d = a.gradient = function (a, b) {
            return c(a, b, function (a, b) {
                return b[0] == a[0] ? b[1] > a[1] ? 1 / 0 : -1 / 0 : b[1] == a[1] ? b[0] > a[0] ? 0 : -0 : (b[1] - a[1]) / (b[0] - a[0])
            })
        }, e = (a.normal = function (a, b) {
            return -1 / d(a, b)
        }, a.lineLength = function (a, b) {
            return c(a, b, function (a, b) {
                return Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2))
            })
        }, a.quadrant = function (a, b) {
            return c(a, b, function (a, b) {
                return b[0] > a[0] ? b[1] > a[1] ? 2 : 1 : b[0] == a[0] ? b[1] > a[1] ? 2 : 1 : b[1] > a[1] ? 3 : 4
            })
        }), f = (a.theta = function (a, b) {
            return c(a, b, function (a, b) {
                var c = d(a, b), f = Math.atan(c), g = e(a, b);
                return (4 == g || 3 == g) && (f += Math.PI), 0 > f && (f += 2 * Math.PI), f
            })
        }, a.intersects = function (a, b) {
            var c = a.x, d = a.x + a.w, e = a.y, f = a.y + a.h, g = b.x, h = b.x + b.w, i = b.y, j = b.y + b.h;
            return g >= c && d >= g && i >= e && f >= i || h >= c && d >= h && i >= e && f >= i || g >= c && d >= g && j >= e && f >= j || h >= c && d >= g && j >= e && f >= j || c >= g && h >= c && e >= i && j >= e || d >= g && h >= d && e >= i && j >= e || c >= g && h >= c && f >= i && j >= f || d >= g && h >= c && f >= i && j >= f
        }, a.encloses = function (a, b, c) {
            var d = a.x, e = a.x + a.w, f = a.y, g = a.y + a.h, h = b.x, i = b.x + b.w, j = b.y, k = b.y + b.h,
                l = function (a, b, d, e) {
                    return c ? b >= a && d >= e : b > a && d > e
                };
            return l(d, h, e, i) && l(f, j, g, k)
        }, [null, [1, -1], [1, 1], [-1, 1], [-1, -1]]), g = [null, [-1, -1], [-1, 1], [1, 1], [1, -1]];
        a.pointOnLine = function (a, b, c) {
            var h = d(a, b), i = e(a, b), j = c > 0 ? f[i] : g[i], k = Math.atan(h),
                l = Math.abs(c * Math.sin(k)) * j[1], m = Math.abs(c * Math.cos(k)) * j[0];
            return {x: a.x + m, y: a.y + l}
        }, a.perpendicularLineTo = function (a, b, c) {
            var e = d(a, b), f = Math.atan(-1 / e), g = c / 2 * Math.sin(f), h = c / 2 * Math.cos(f);
            return [{x: b.x + h, y: b.y + g}, {x: b.x - h, y: b.y - g}]
        }
    }.call(this), function () {
        var a = function (a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }, b = function (a) {
            return "[object Number]" === Object.prototype.toString.call(a)
        }, c = function (a) {
            return "string" == typeof a
        }, d = function (a) {
            return "boolean" == typeof a
        }, e = function (a) {
            return null == a
        }, f = function (a) {
            return null == a ? !1 : "[object Object]" === Object.prototype.toString.call(a)
        }, g = function (a) {
            return "[object Date]" === Object.prototype.toString.call(a)
        }, h = function (a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        }, i = function (a) {
            for (var b in a) if (a.hasOwnProperty(b)) return !1;
            return !0
        };
        jsPlumbUtil = {
            isArray: a,
            isString: c,
            isBoolean: d,
            isNull: e,
            isObject: f,
            isDate: g,
            isFunction: h,
            isEmpty: i,
            isNumber: b,
            clone: function (b) {
                if (c(b)) return "" + b;
                if (d(b)) return !!b;
                if (g(b)) return new Date(b.getTime());
                if (h(b)) return b;
                if (a(b)) {
                    for (var e = [], i = 0; i < b.length; i++) e.push(this.clone(b[i]));
                    return e
                }
                if (f(b)) {
                    var j = {};
                    for (var k in b) j[k] = this.clone(b[k]);
                    return j
                }
                return b
            },
            matchesSelector: function (a, b, c) {
                c = c || a.parentNode;
                for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++) if (d[e] === a) return !0;
                return !1
            },
            merge: function (b, e) {
                var g = this.clone(b);
                for (var h in e) if (null == g[h] || c(e[h]) || d(e[h])) g[h] = e[h]; else if (a(e[h])) {
                    var i = [];
                    a(g[h]) && i.push.apply(i, g[h]), i.push.apply(i, e[h]), g[h] = i
                } else if (f(e[h])) {
                    f(g[h]) || (g[h] = {});
                    for (var j in e[h]) g[h][j] = e[h][j]
                }
                return g
            },
            replace: function (a, b, c) {
                var d = a, e = d;
                return b.replace(/([^\.])+/g, function (a, b, d, f) {
                    var g = a.match(/([^\[0-9]+){1}(\[)([0-9+])/), h = d + a.length >= f.length, i = function () {
                        return e[g[1]] || function () {
                            return e[g[1]] = [], e[g[1]]
                        }()
                    };
                    if (h) g ? i()[g[3]] = c : e[a] = c; else if (g) {
                        var j = i();
                        e = j[g[3]] || function () {
                            return j[g[3]] = {}, j[g[3]]
                        }()
                    } else e = e[a] || function () {
                        return e[a] = {}, e[a]
                    }()
                }), a
            },
            functionChain: function (a, b, c) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d][0][c[d][1]].apply(c[d][0], c[d][2]);
                    if (e === b) return e
                }
                return a
            },
            populate: function (b, d) {
                var e = function (a) {
                    var b = a.match(/(\${.*?})/g);
                    if (null != b) for (var c = 0; c < b.length; c++) {
                        var e = d[b[c].substring(2, b[c].length - 1)];
                        null != e && (a = a.replace(b[c], e))
                    }
                    return a
                }, g = function (b) {
                    if (null != b) {
                        if (c(b)) return e(b);
                        if (a(b)) {
                            for (var d = [], h = 0; h < b.length; h++) d.push(g(b[h]));
                            return d
                        }
                        if (f(b)) {
                            var i = {};
                            for (var j in b) i[j] = g(b[j]);
                            return i
                        }
                        return b
                    }
                };
                return g(b)
            },
            convertStyle: function (a, b) {
                if ("transparent" === a) return a;
                var c = a, d = function (a) {
                    return 1 == a.length ? "0" + a : a
                }, e = function (a) {
                    return d(Number(a).toString(16))
                }, f = /(rgb[a]?\()(.*)(\))/;
                if (a.match(f)) {
                    var g = a.match(f)[2].split(",");
                    c = "#" + e(g[0]) + e(g[1]) + e(g[2]), b || 4 != g.length || (c += e(g[3]))
                }
                return c
            },
            findWithFunction: function (a, b) {
                if (a) for (var c = 0; c < a.length; c++) if (b(a[c])) return c;
                return -1
            },
            indexOf: function (a, b) {
                return a.indexOf ? a.indexOf(b) : jsPlumbUtil.findWithFunction(a, function (a) {
                    return a == b
                })
            },
            removeWithFunction: function (a, b) {
                var c = jsPlumbUtil.findWithFunction(a, b);
                return c > -1 && a.splice(c, 1), -1 != c
            },
            remove: function (a, b) {
                var c = jsPlumbUtil.indexOf(a, b);
                return c > -1 && a.splice(c, 1), -1 != c
            },
            addWithFunction: function (a, b, c) {
                -1 == jsPlumbUtil.findWithFunction(a, c) && a.push(b)
            },
            addToList: function (a, b, c, d) {
                var e = a[b];
                return null == e && (e = [], a[b] = e), e[d ? "unshift" : "push"](c), e
            },
            consume: function (a, b) {
                a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
            },
            extend: function (b, c) {
                var d;
                for (c = a(c) ? c : [c], d = 0; d < c.length; d++) for (var e in c[d].prototype) c[d].prototype.hasOwnProperty(e) && (b.prototype[e] = c[d].prototype[e]);
                var f = function (a, b) {
                    return function () {
                        for (d = 0; d < c.length; d++) c[d].prototype[a] && c[d].prototype[a].apply(this, arguments);
                        return b.apply(this, arguments)
                    }
                }, g = function (a) {
                    for (var c in a) b.prototype[c] = f(c, a[c])
                };
                if (arguments.length > 2) for (d = 2; d < arguments.length; d++) g(arguments[d]);
                return b
            },
            uuid: function () {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
                    var b = 0 | 16 * Math.random(), c = "x" == a ? b : 8 | 3 & b;
                    return c.toString(16)
                })
            },
            logEnabled: !0,
            log: function () {
                if (jsPlumbUtil.logEnabled && "undefined" != typeof console) try {
                    var a = arguments[arguments.length - 1];
                    console.log(a)
                } catch (b) {
                }
            },
            sizeElement: function (a, b, c, d, e) {
                a && (a.style.height = e + "px", a.height = e, a.style.width = d + "px", a.width = d, a.style.left = b + "px", a.style.top = c + "px")
            },
            wrap: function (a, b, c) {
                return a = a || function () {
                }, b = b || function () {
                }, function () {
                    var d = null;
                    try {
                        d = b.apply(this, arguments)
                    } catch (e) {
                        jsPlumbUtil.log("jsPlumb function failed : " + e)
                    }
                    if (null == c || d !== c) try {
                        d = a.apply(this, arguments)
                    } catch (e) {
                        jsPlumbUtil.log("wrapped function failed : " + e)
                    }
                    return d
                }
            },
            ieVersion: /MSIE\s([\d.]+)/.test(navigator.userAgent) ? new Number(RegExp.$1) : -1
        }, jsPlumbUtil.oldIE = jsPlumbUtil.ieVersion > -1 && jsPlumbUtil.ieVersion < 9, jsPlumbUtil.EventGenerator = function () {
            var a = {}, b = !1, c = {ready: !0};
            this.bind = function (b, c, d) {
                return jsPlumbUtil.addToList(a, b, c, d), this
            }, this.fire = function (d, e, f) {
                if (!b && a[d]) {
                    var g = a[d].length, h = 0, i = !1, j = null;
                    if (!this.shouldFireEvent || this.shouldFireEvent(d, e, f)) for (; !i && g > h && j !== !1;) {
                        if (c[d]) a[d][h].apply(this, [e, f]); else try {
                            j = a[d][h].apply(this, [e, f])
                        } catch (k) {
                            jsPlumbUtil.log("jsPlumb: fire failed for event " + d + " : " + k)
                        }
                        h++, (null == a || null == a[d]) && (i = !0)
                    }
                }
                return this
            }, this.unbind = function (b) {
                return b ? delete a[b] : a = {}, this
            }, this.getListener = function (b) {
                return a[b]
            }, this.setSuspendEvents = function (a) {
                b = a
            }, this.isSuspendEvents = function () {
                return b
            }, this.cleanupListeners = function () {
                for (var b in a) a[b] = null
            }
        }, jsPlumbUtil.EventGenerator.prototype = {
            cleanup: function () {
                this.cleanupListeners()
            }
        }, Function.prototype.bind || (Function.prototype.bind = function (a) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var b = Array.prototype.slice.call(arguments, 1), c = this, d = function () {
            }, e = function () {
                return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
            };
            return d.prototype = this.prototype, e.prototype = new d, e
        })
    }(), function () {
        var a = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
            b = function () {
                if (void 0 === b.vml) {
                    var a = document.body.appendChild(document.createElement("div"));
                    a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
                    var c = a.firstChild;
                    null != c && null != c.style ? (c.style.behavior = "url(#default#VML)", b.vml = c ? "object" == typeof c.adj : !0) : b.vml = !1, a.parentNode.removeChild(a)
                }
                return b.vml
            }, c = function () {
                var a = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                    null != c.exec(b) && (a = parseFloat(RegExp.$1))
                }
                return a
            }(), d = c > -1 && 9 > c, e = function (a, b) {
                if (null == a) return [0, 0];
                var c = j(a), d = i(c, 0);
                return [d[b + "X"], d[b + "Y"]]
            }, f = function (a) {
                return null == a ? [0, 0] : d ? [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop] : e(a, "page")
            }, g = function (a) {
                return e(a, "screen")
            }, h = function (a) {
                return e(a, "client")
            }, i = function (a, b) {
                return a.item ? a.item(b) : a[b]
            }, j = function (a) {
                return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
            }, k = function (a) {
                var b = {}, c = [], d = {}, e = {}, f = {};
                this.register = function (g) {
                    var h = a.getId(g), i = jsPlumbAdapter.getOffset(g, a);
                    b[h] || (b[h] = g, c.push(g), d[h] = {});
                    var j = function (b) {
                        if (b) for (var c = 0; c < b.childNodes.length; c++) if (3 != b.childNodes[c].nodeType && 8 != b.childNodes[c].nodeType) {
                            var g = jsPlumb.getElementObject(b.childNodes[c]), k = a.getId(b.childNodes[c], null, !0);
                            if (k && e[k] && e[k] > 0) {
                                var l = jsPlumbAdapter.getOffset(g, a);
                                d[h][k] = {id: k, offset: {left: l.left - i.left, top: l.top - i.top}}, f[k] = h
                            }
                            j(b.childNodes[c])
                        }
                    };
                    j(g)
                }, this.updateOffsets = function (b) {
                    if (null != b) {
                        var c = jsPlumb.getDOMElement(b), e = a.getId(c), g = d[e], h = jsPlumbAdapter.getOffset(c, a);
                        if (g) for (var i in g) {
                            var j = jsPlumb.getElementObject(i), k = jsPlumbAdapter.getOffset(j, a);
                            d[e][i] = {id: i, offset: {left: k.left - h.left, top: k.top - h.top}}, f[i] = e
                        }
                    }
                }, this.endpointAdded = function (c) {
                    var g = document.body, h = a.getId(c), i = jsPlumbAdapter.getOffset(c, a), j = c.parentNode;
                    for (e[h] = e[h] ? e[h] + 1 : 1; null != j && j != g;) {
                        var k = a.getId(j, null, !0);
                        if (k && b[k]) {
                            var l = jsPlumbAdapter.getOffset(j, a);
                            null == d[k][h] && (d[k][h] = {
                                id: h,
                                offset: {left: i.left - l.left, top: i.top - l.top}
                            }, f[h] = k);
                            break
                        }
                        j = j.parentNode
                    }
                }, this.endpointDeleted = function (a) {
                    if (e[a.elementId] && (e[a.elementId]--, e[a.elementId] <= 0)) for (var b in d) d[b] && (delete d[b][a.elementId], delete f[a.elementId])
                }, this.changeId = function (a, b) {
                    d[b] = d[a], d[a] = {}, f[b] = f[a], f[a] = null
                }, this.getElementsForDraggable = function (a) {
                    return d[a]
                }, this.elementRemoved = function (a) {
                    var b = f[a];
                    b && (delete d[b][a], delete f[a])
                }, this.reset = function () {
                    b = {}, c = [], d = {}, e = {}
                }, this.dragEnded = function (b) {
                    var c = a.getId(b), d = f[c];
                    d && this.updateOffsets(d)
                }, this.setParent = function (b, c, e, g) {
                    var h = f[c];
                    if (h) {
                        d[g] || (d[g] = {}), d[g][c] = d[h][c], delete d[h][c];
                        var i = jsPlumbAdapter.getOffset(e, a), j = jsPlumbAdapter.getOffset(b, a);
                        d[g][c].offset = {left: j.left - i.left, top: j.top - i.top}, f[c] = g
                    }
                }
            };
        window.console || (window.console = {
            time: function () {
            }, timeEnd: function () {
            }, group: function () {
            }, groupEnd: function () {
            }, log: function () {
            }
        });
        var l = function (a) {
            return null == a ? null : a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
        }, m = function (a, b) {
            b = l(b), "undefined" != typeof a.className.baseVal ? a.className.baseVal = b : a.className = b
        }, n = function (a) {
            return "undefined" == typeof a.className.baseVal ? a.className : a.className.baseVal
        }, o = function (a, b, c) {
            for (var d = c.split(/\s+/), e = n(a), f = e.split(/\s+/), g = 0; g < d.length; g++) if (b) -1 == jsPlumbUtil.indexOf(f, d[g]) && f.push(d[g]); else {
                var h = jsPlumbUtil.indexOf(f, d[g]);
                -1 != h && f.splice(h, 1)
            }
            m(a, f.join(" "))
        }, p = function (a, b) {
            if (null != a) if ("string" == typeof a) b(jsPlumb.getDOMElement(a)); else if (null != a.length) for (var c = 0; c < a.length; c++) b(jsPlumb.getDOMElement(a[c])); else b(a)
        };
        window.jsPlumbAdapter = {
            headless: !1, pageLocation: f, screenLocation: g, clientLocation: h, getAttribute: function (a, b) {
                return a.getAttribute(b)
            }, setAttribute: function (a, b, c) {
                a.setAttribute(b, c)
            }, appendToRoot: function (a) {
                document.body.appendChild(a)
            }, getRenderModes: function () {
                return ["svg", "vml"]
            }, isRenderModeAvailable: function (c) {
                return {svg: a, vml: b()}[c]
            }, getDragManager: function (a) {
                return new k(a)
            }, setRenderMode: function (a) {
                var b;
                if (a) {
                    a = a.toLowerCase();
                    var c = this.isRenderModeAvailable("svg"), d = this.isRenderModeAvailable("vml");
                    "svg" === a ? c ? b = "svg" : d && (b = "vml") : d && (b = "vml")
                }
                return b
            }, addClass: function (a, b) {
                p(a, function (a) {
                    o(a, !0, b)
                })
            }, hasClass: function (a, b) {
                return a = jsPlumb.getDOMElement(a), a.classList ? a.classList.contains(b) : -1 != n(a).indexOf(b)
            }, removeClass: function (a, b) {
                p(a, function (a) {
                    o(a, !1, b)
                })
            }, setClass: function (a, b) {
                p(a, function (a) {
                    m(a, b)
                })
            }, setPosition: function (a, b) {
                a.style.left = b.left + "px", a.style.top = b.top + "px"
            }, getPosition: function (a) {
                var b = function (b) {
                    var c = a.style[b];
                    return c ? c.substring(0, c.length - 2) : 0
                };
                return {left: b("left"), top: b("top")}
            }, getOffset: function (a, b, c) {
                a = jsPlumb.getDOMElement(a);
                for (var d = b.getContainer(), e = a.offsetLeft, f = a.offsetTop, g = c || null != d && a.offsetParent != d ? a.offsetParent : null; null != g;) e += g.offsetLeft, f += g.offsetTop, g = c ? g.offsetParent : g.offsetParent == d ? null : g.offsetParent;
                return {left: e, top: f}
            }, getPositionOnElement: function (a, b, c) {
                var d = "undefined" != typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0
                    }, e = document.body, f = document.documentElement,
                    g = (b.offsetParent, window.pageYOffset || f.scrollTop || e.scrollTop),
                    h = window.pageXOffset || f.scrollLeft || e.scrollLeft, i = f.clientTop || e.clientTop || 0,
                    j = f.clientLeft || e.clientLeft || 0, k = 0, l = 0, m = d.top + g - i + k * c,
                    n = d.left + h - j + l * c, o = jsPlumbAdapter.pageLocation(a), p = d.width || b.offsetWidth * c,
                    q = d.height || b.offsetHeight * c, r = (o[0] - n) / p, s = (o[1] - m) / q;
                return [r, s]
            }
        }
    }(), function () {
        "use strict";
        var a = jsPlumbUtil, b = function (a, b, c) {
                return jsPlumbAdapter.getOffset(a, b, c)
            }, c = function () {
                return "" + (new Date).getTime()
            }, d = function (a) {
                if (a._jsPlumb.paintStyle && a._jsPlumb.hoverPaintStyle) {
                    var b = {};
                    t.extend(b, a._jsPlumb.paintStyle), t.extend(b, a._jsPlumb.hoverPaintStyle), delete a._jsPlumb.hoverPaintStyle, b.gradient && a._jsPlumb.paintStyle.fillStyle && delete b.gradient, a._jsPlumb.hoverPaintStyle = b
                }
            }, e = ["click", "dblclick", "mouseenter", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"],
            f = {mouseout: "mouseleave", mouseexit: "mouseleave"}, g = function (a, b, c, d) {
                var e = a.getAttachedElements();
                if (e) for (var f = 0, g = e.length; g > f; f++) d && d == e[f] || e[f].setHover(b, !0, c)
            }, h = function (a) {
                return null == a ? null : a.split(" ")
            }, i = function (b, c, d) {
                if (b.getDefaultType) {
                    for (var e = b.getTypeDescriptor(), f = a.merge({}, b.getDefaultType()), g = 0, h = b._jsPlumb.types.length; h > g; g++) f = a.merge(f, b._jsPlumb.instance.getType(b._jsPlumb.types[g], e));
                    c && (f = a.populate(f, c)), b.applyType(f, d), d || b.repaint()
                }
            }, j = window.jsPlumbUIComponent = function (b) {
                jsPlumbUtil.EventGenerator.apply(this, arguments);
                var c = this, d = arguments, g = c.idPrefix, h = g + (new Date).getTime();
                if (this._jsPlumb = {
                    instance: b._jsPlumb,
                    parameters: b.parameters || {},
                    paintStyle: null,
                    hoverPaintStyle: null,
                    paintStyleInUse: null,
                    hover: !1,
                    beforeDetach: b.beforeDetach,
                    beforeDrop: b.beforeDrop,
                    overlayPlacements: [],
                    hoverClass: b.hoverClass || b._jsPlumb.Defaults.HoverClass,
                    types: []
                }, this.getId = function () {
                    return h
                }, b.events) for (var i in b.events) c.bind(i, b.events[i]);
                this.clone = function () {
                    var a = {};
                    return this.constructor.apply(a, d), a
                }.bind(this), this.isDetachAllowed = function (b) {
                    var c = !0;
                    if (this._jsPlumb.beforeDetach) try {
                        c = this._jsPlumb.beforeDetach(b)
                    } catch (d) {
                        a.log("jsPlumb: beforeDetach callback failed", d)
                    }
                    return c
                }, this.isDropAllowed = function (b, c, d, e, f, g, h) {
                    var i = this._jsPlumb.instance.checkCondition("beforeDrop", {
                        sourceId: b,
                        targetId: c,
                        scope: d,
                        connection: e,
                        dropEndpoint: f,
                        source: g,
                        target: h
                    });
                    if (this._jsPlumb.beforeDrop) try {
                        i = this._jsPlumb.beforeDrop({
                            sourceId: b,
                            targetId: c,
                            scope: d,
                            connection: e,
                            dropEndpoint: f,
                            source: g,
                            target: h
                        })
                    } catch (j) {
                        a.log("jsPlumb: beforeDrop callback failed", j)
                    }
                    return i
                };
                var j = [], k = function (a, b, c) {
                    j.push([a, b, c]), a.bind(b, c)
                }, l = [], m = function (a, b, c, d) {
                    var e = f[c] || c, g = function (a) {
                        d && d(a) === !1 || b.fire(e, b, a)
                    };
                    l.push([a, c, g, b]), b._jsPlumb.instance.on(a, c, g)
                }, n = function (a, b, c, d) {
                    f[b] || b, d._jsPlumb.instance.off(a, b, c)
                };
                this.bindListeners = function (a, b, c) {
                    k(a, "click", function (a, c) {
                        b.fire("click", b, c)
                    }), k(a, "dblclick", function (a, c) {
                        b.fire("dblclick", b, c)
                    }), k(a, "contextmenu", function (a, c) {
                        b.fire("contextmenu", b, c)
                    }), k(a, "mouseleave", function (a, d) {
                        b.isHover() && (c(!1), b.fire("mouseleave", b, d))
                    }), k(a, "mouseenter", function (a, d) {
                        b.isHover() || (c(!0), b.fire("mouseenter", b, d))
                    }), k(a, "mousedown", function (a, c) {
                        b.fire("mousedown", b, c)
                    }), k(a, "mouseup", function (a, c) {
                        b.fire("mouseup", b, c)
                    })
                }, this.unbindListeners = function () {
                    for (var a = 0; a < j.length; a++) {
                        var b = j[a];
                        b[0].unbind(b[1], b[2])
                    }
                    j = null
                }, this.attachListeners = function (a, b, c) {
                    c = c || {};
                    for (var d = 0, f = e.length; f > d; d++) m(a, b, e[d], c[e[d]])
                }, this.detachListeners = function () {
                    for (var a = 0; a < l.length; a++) n(l[a][0], l[a][1], l[a][2], l[a][3]);
                    l = null
                }, this.reattachListenersForElement = function (a) {
                    if (arguments.length > 1) {
                        for (var b = 0, c = e.length; c > b; b++) n(a, e[b]);
                        for (b = 1, c = arguments.length; c > b; b++) this.attachListeners(a, arguments[b])
                    }
                }
            };
        jsPlumbUtil.extend(j, jsPlumbUtil.EventGenerator, {
            getParameter: function (a) {
                return this._jsPlumb.parameters[a]
            }, setParameter: function (a, b) {
                this._jsPlumb.parameters[a] = b
            }, getParameters: function () {
                return this._jsPlumb.parameters
            }, setParameters: function (a) {
                this._jsPlumb.parameters = a
            }, addClass: function (a) {
                jsPlumbAdapter.addClass(this.canvas, a)
            }, removeClass: function (a) {
                jsPlumbAdapter.removeClass(this.canvas, a)
            }, setType: function (a, b, c) {
                this._jsPlumb.types = h(a) || [], i(this, b, c)
            }, getType: function () {
                return this._jsPlumb.types
            }, reapplyTypes: function (a, b) {
                i(this, a, b)
            }, hasType: function (a) {
                return -1 != jsPlumbUtil.indexOf(this._jsPlumb.types, a)
            }, addType: function (a, b, c) {
                var d = h(a), e = !1;
                if (null != d) {
                    for (var f = 0, g = d.length; g > f; f++) this.hasType(d[f]) || (this._jsPlumb.types.push(d[f]), e = !0);
                    e && i(this, b, c)
                }
            }, removeType: function (b, c) {
                var d = h(b), e = !1, f = function (b) {
                    var c = a.indexOf(this._jsPlumb.types, b);
                    return -1 != c ? (this._jsPlumb.types.splice(c, 1), !0) : !1
                }.bind(this);
                if (null != d) {
                    for (var g = 0, j = d.length; j > g; g++) e = f(d[g]) || e;
                    e && i(this, null, c)
                }
            }, toggleType: function (a, b, c) {
                var d = h(a);
                if (null != d) {
                    for (var e = 0, f = d.length; f > e; e++) {
                        var g = jsPlumbUtil.indexOf(this._jsPlumb.types, d[e]);
                        -1 != g ? this._jsPlumb.types.splice(g, 1) : this._jsPlumb.types.push(d[e])
                    }
                    i(this, b, c)
                }
            }, applyType: function (a, b) {
                if (this.setPaintStyle(a.paintStyle, b), this.setHoverPaintStyle(a.hoverPaintStyle, b), a.parameters) for (var c in a.parameters) this.setParameter(c, a.parameters[c])
            }, setPaintStyle: function (a, b) {
                this._jsPlumb.paintStyle = a, this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle, d(this), b || this.repaint()
            }, getPaintStyle: function () {
                return this._jsPlumb.paintStyle
            }, setHoverPaintStyle: function (a, b) {
                this._jsPlumb.hoverPaintStyle = a, d(this), b || this.repaint()
            }, getHoverPaintStyle: function () {
                return this._jsPlumb.hoverPaintStyle
            }, cleanup: function () {
                this.unbindListeners(), this.detachListeners()
            }, destroy: function () {
                this.cleanupListeners(), this.clone = null, this._jsPlumb = null
            }, isHover: function () {
                return this._jsPlumb.hover
            }, setHover: function (a, b, d) {
                if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {
                    if (this._jsPlumb.hover = a, null != this.canvas) {
                        if (null != this._jsPlumb.instance.hoverClass) {
                            var e = a ? "addClass" : "removeClass";
                            this._jsPlumb.instance[e](this.canvas, this._jsPlumb.instance.hoverClass)
                        }
                        null != this._jsPlumb.hoverClass && this._jsPlumb.instance[e](this.canvas, this._jsPlumb.hoverClass)
                    }
                    null != this._jsPlumb.hoverPaintStyle && (this._jsPlumb.paintStyleInUse = a ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle, this._jsPlumb.instance.isSuspendDrawing() || (d = d || c(), this.repaint({
                        timestamp: d,
                        recalc: !1
                    }))), this.getAttachedElements && !b && g(this, a, c(), this)
                }
            }
        });
        var k = "__label", l = function (a, b) {
            for (var c = -1, d = 0, e = a._jsPlumb.overlays.length; e > d; d++) if (b === a._jsPlumb.overlays[d].id) {
                c = d;
                break
            }
            return c
        }, m = function (a, b) {
            var c = {
                cssClass: b.cssClass,
                labelStyle: a.labelStyle,
                id: k,
                component: a,
                _jsPlumb: a._jsPlumb.instance
            }, d = t.extend(c, b);
            return new (t.Overlays[a._jsPlumb.instance.getRenderMode()].Label)(d)
        }, n = function (b, c) {
            var d = null;
            if (a.isArray(c)) {
                var e = c[0], f = t.extend({component: b, _jsPlumb: b._jsPlumb.instance}, c[1]);
                3 == c.length && t.extend(f, c[2]), d = new (t.Overlays[b._jsPlumb.instance.getRenderMode()][e])(f)
            } else d = c.constructor == String ? new (t.Overlays[b._jsPlumb.instance.getRenderMode()][c])({
                component: b,
                _jsPlumb: b._jsPlumb.instance
            }) : c;
            b._jsPlumb.overlays.push(d)
        }, o = function (a, b) {
            var c = a.defaultOverlayKeys || [], d = b.overlays, e = function (b) {
                return a._jsPlumb.instance.Defaults[b] || t.Defaults[b] || []
            };
            d || (d = []);
            for (var f = 0, g = c.length; g > f; f++) d.unshift.apply(d, e(c[f]));
            return d
        }, p = window.OverlayCapableJsPlumbUIComponent = function (a) {
            j.apply(this, arguments), this._jsPlumb.overlays = [];
            var b = o(this, a);
            if (b) for (var c = 0, d = b.length; d > c; c++) n(this, b[c]);
            if (a.label) {
                var e = a.labelLocation || this.defaultLabelLocation || .5,
                    f = a.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle;
                this._jsPlumb.overlays.push(m(this, {label: a.label, location: e, labelStyle: f}))
            }
        };
        jsPlumbUtil.extend(p, j, {
            applyType: function (a, b) {
                if (this.removeAllOverlays(b), a.overlays) for (var c = 0, d = a.overlays.length; d > c; c++) this.addOverlay(a.overlays[c], !0)
            }, setHover: function (a) {
                if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) for (var b = 0, c = this._jsPlumb.overlays.length; c > b; b++) this._jsPlumb.overlays[b][a ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass)
            }, addOverlay: function (a, b) {
                n(this, a), b || this.repaint()
            }, getOverlay: function (a) {
                var b = l(this, a);
                return b >= 0 ? this._jsPlumb.overlays[b] : null
            }, getOverlays: function () {
                return this._jsPlumb.overlays
            }, hideOverlay: function (a) {
                var b = this.getOverlay(a);
                b && b.hide()
            }, hideOverlays: function () {
                for (var a = 0, b = this._jsPlumb.overlays.length; b > a; a++) this._jsPlumb.overlays[a].hide()
            }, showOverlay: function (a) {
                var b = this.getOverlay(a);
                b && b.show()
            }, showOverlays: function () {
                for (var a = 0, b = this._jsPlumb.overlays.length; b > a; a++) this._jsPlumb.overlays[a].show()
            }, removeAllOverlays: function (a) {
                for (var b = 0, c = this._jsPlumb.overlays.length; c > b; b++) this._jsPlumb.overlays[b].cleanup && this._jsPlumb.overlays[b].cleanup();
                this._jsPlumb.overlays.splice(0, this._jsPlumb.overlays.length), this._jsPlumb.overlayPositions = null, a || this.repaint()
            }, removeOverlay: function (a) {
                var b = l(this, a);
                if (-1 != b) {
                    var c = this._jsPlumb.overlays[b];
                    c.cleanup && c.cleanup(), this._jsPlumb.overlays.splice(b, 1), this._jsPlumb.overlayPositions && delete this._jsPlumb.overlayPositions[a]
                }
            }, removeOverlays: function () {
                for (var a = 0, b = arguments.length; b > a; a++) this.removeOverlay(arguments[a])
            }, moveParent: function (a) {
                this.bgCanvas && (this.bgCanvas.parentNode.removeChild(this.bgCanvas), a.appendChild(this.bgCanvas)), this.canvas.parentNode.removeChild(this.canvas), a.appendChild(this.canvas);
                for (var b = 0; b < this._jsPlumb.overlays.length; b++) this._jsPlumb.overlays[b].isAppendedAtTopLevel && (this._jsPlumb.overlays[b].canvas.parentNode.removeChild(this._jsPlumb.overlays[b].canvas), a.appendChild(this._jsPlumb.overlays[b].canvas))
            }, getLabel: function () {
                var a = this.getOverlay(k);
                return null != a ? a.getLabel() : null
            }, getLabelOverlay: function () {
                return this.getOverlay(k)
            }, setLabel: function (a) {
                var b = this.getOverlay(k);
                if (b) a.constructor == String || a.constructor == Function ? b.setLabel(a) : (a.label && b.setLabel(a.label), a.location && b.setLocation(a.location)); else {
                    var c = a.constructor == String || a.constructor == Function ? {label: a} : a;
                    b = m(this, c), this._jsPlumb.overlays.push(b)
                }
                this._jsPlumb.instance.isSuspendDrawing() || this.repaint()
            }, cleanup: function () {
                for (var a = 0; a < this._jsPlumb.overlays.length; a++) this._jsPlumb.overlays[a].cleanup(), this._jsPlumb.overlays[a].destroy();
                this._jsPlumb.overlays.splice(0), this._jsPlumb.overlayPositions = null
            }, setVisible: function (a) {
                this[a ? "showOverlays" : "hideOverlays"]()
            }, setAbsoluteOverlayPosition: function (a, b) {
                this._jsPlumb.overlayPositions = this._jsPlumb.overlayPositions || {}, this._jsPlumb.overlayPositions[a.id] = b
            }, getAbsoluteOverlayPosition: function (a) {
                return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[a.id] : null
            }
        });
        var q = 0, r = function () {
            var a = q + 1;
            return q++, a
        }, s = window.jsPlumbInstance = function (d) {
            this.Defaults = {
                Anchor: "BottomCenter",
                Anchors: [null, null],
                ConnectionsDetachable: !0,
                ConnectionOverlays: [],
                Connector: "Bezier",
                Container: null,
                DoNotThrowErrors: !1,
                DragOptions: {},
                DropOptions: {},
                Endpoint: "Dot",
                EndpointOverlays: [],
                Endpoints: [null, null],
                EndpointStyle: {fillStyle: "#456"},
                EndpointStyles: [null, null],
                EndpointHoverStyle: null,
                EndpointHoverStyles: [null, null],
                HoverPaintStyle: null,
                LabelStyle: {color: "black"},
                LogEnabled: !1,
                Overlays: [],
                MaxConnections: 1,
                PaintStyle: {lineWidth: 8, strokeStyle: "#456"},
                ReattachConnections: !1,
                RenderMode: "svg",
                Scope: "jsPlumb_DefaultScope"
            }, d && t.extend(this.Defaults, d), this.logEnabled = this.Defaults.LogEnabled, this._connectionTypes = {}, this._endpointTypes = {}, jsPlumbUtil.EventGenerator.apply(this);
            var e = this, f = r(), g = e.bind, h = {}, i = 1, k = function (a) {
                var b = e.getDOMElement(a);
                return {el: b, id: jsPlumbUtil.isString(a) && null == b ? a : Y(b)}
            };
            this.getInstanceIndex = function () {
                return f
            }, this.setZoom = function (a, b) {
                return jsPlumbUtil.oldIE || (i = a, e.fire("zoom", i), b && e.repaintEverything()), !jsPlumbUtil.oldIE
            }, this.getZoom = function () {
                return i
            };
            for (var l in this.Defaults) h[l] = this.Defaults[l];
            var m;
            this.setContainer = function (a) {
                a = this.getDOMElement(a), this.select().each(function (b) {
                    b.moveParent(a)
                }), this.selectEndpoints().each(function (b) {
                    b.moveParent(a)
                }), m = a
            }, this.getContainer = function () {
                return m
            }, this.bind = function (a, b) {
                "ready" === a && o ? b() : g.apply(e, [a, b])
            }, e.importDefaults = function (a) {
                for (var b in a) e.Defaults[b] = a[b];
                return a.Container && this.setContainer(a.Container), e
            }, e.restoreDefaults = function () {
                return e.Defaults = t.extend({}, h), e
            };
            var n = null, o = !1, p = [], q = {}, s = {}, u = {}, v = {}, w = {}, x = {}, y = !1, z = [], A = !1,
                B = null, C = this.Defaults.Scope, D = null, E = 1, F = function () {
                    return "" + E++
                }, G = function (a, b) {
                    m ? m.appendChild(a) : b ? t.getDOMElement(b).appendChild(a) : e.appendToRoot(a)
                }, H = function (a) {
                    return a._nodes ? a._nodes : a
                }, I = function (a, b, d, f) {

                    if (!jsPlumbAdapter.headless && !A) {
                        var g = Y(a), h = e.dragManager.getElementsForDraggable(g);
                        null == d && (d = c());
                        var i = W({elId: g, offset: b, recalc: !1, timestamp: d});
                        if (h) for (var j in h) W({
                            elId: h[j].id,
                            offset: {left: i.o.left + h[j].offset.left, top: i.o.top + h[j].offset.top},
                            recalc: !1,
                            timestamp: d
                        });
                        if (e.anchorManager.redraw(g, b, d, null, f), h) for (var k in h) e.anchorManager.redraw(h[k].id, b, d, h[k].offset, f, !0)
                    }
                }, J = function (b, c) {
                    var d, f, g, h = null;
                    if (a.isArray(b)) {
                        h = [];
                        for (var i = 0, j = b.length; j > i; i++) d = e.getElementObject(b[i]), g = e.getDOMElement(d), f = e.getAttribute(g, "id"), h.push(c.apply(e, [g, f]))
                    } else d = e.getDOMElement(b), f = e.getId(d), h = c.apply(e, [d, f]);
                    return h
                }, K = function (a) {
                    return s[a]
                }, L = function (b, c, d) {

                    if (!jsPlumbAdapter.headless) {
                        var f = null == c ? !1 : c;
                        if (f && t.isDragSupported(b, e) && !t.isAlreadyDraggable(b, e)) {
                            var g = d || e.Defaults.DragOptions;
                            g = t.extend({}, g);
                            var h = t.dragEvents.drag, i = t.dragEvents.stop, j = t.dragEvents.start;


                            g[j] = a.wrap(g[j], function () {
                                return e.setHoverSuspended(!0), e.select({source: b}).addClass(e.elementDraggingClass + " " + e.sourceElementDraggingClass, !0), e.select({target: b}).addClass(e.elementDraggingClass + " " + e.targetElementDraggingClass, !0), e.setConnectionBeingDragged(!0), g.canDrag ? d.canDrag() : void 0
                            }, !1), g[h] = a.wrap(g[h], function () {
                                var a = e.getUIPosition(arguments,e.getZoom()); //e.getZoom()
                                I(b, a, null, !0), e.addClass(b, "jsPlumb_dragged")
                            }), g[i] = a.wrap(g[i], function () {
                                var a = e.getUIPosition(arguments, e.getZoom(), !0);//e.getZoom()
                                I(b, a),
                                    e.removeClass(b, "jsPlumb_dragged"),
                                    e.setHoverSuspended(!1),
                                    e.select({source: b}).removeClass(e.elementDraggingClass + " " + e.sourceElementDraggingClass, !0),
                                    e.select({target: b}).removeClass(e.elementDraggingClass + " " + e.targetElementDraggingClass, !0),
                                    e.setConnectionBeingDragged(!1),
                                    e.dragManager.dragEnded(b)
                            });
                            var k = Y(b);
                            x[k] = !0;
                            var l = x[k];

                            g.disabled = null == l ? !1 : !l, e.initDraggable(b, g, !1), e.dragManager.register(b)
                        }
                    }
                }, M = function (b, c) {
                    var d = t.extend({}, b);
                    if (c && t.extend(d, c), d.source && (d.source.endpoint ? d.sourceEndpoint = d.source : d.source = e.getDOMElement(d.source)), d.target && (d.target.endpoint ? d.targetEndpoint = d.target : d.target = e.getDOMElement(d.target)), b.uuids && (d.sourceEndpoint = K(b.uuids[0]), d.targetEndpoint = K(b.uuids[1])), d.sourceEndpoint && d.sourceEndpoint.isFull()) return a.log(e, "could not add connection; source endpoint is full"), void 0;
                    if (d.targetEndpoint && d.targetEndpoint.isFull()) return a.log(e, "could not add connection; target endpoint is full"), void 0;
                    if (!d.type && d.sourceEndpoint && (d.type = d.sourceEndpoint.connectionType), d.sourceEndpoint && d.sourceEndpoint.connectorOverlays) {
                        d.overlays = d.overlays || [];
                        for (var f = 0, g = d.sourceEndpoint.connectorOverlays.length; g > f; f++) d.overlays.push(d.sourceEndpoint.connectorOverlays[f])
                    }
                    !d["pointer-events"] && d.sourceEndpoint && d.sourceEndpoint.connectorPointerEvents && (d["pointer-events"] = d.sourceEndpoint.connectorPointerEvents);
                    var h, i, j;
                    if (d.target && !d.target.endpoint && !d.targetEndpoint && !d.newConnection && (h = Y(d.target), i = this.targetEndpointDefinitions[h])) {
                        if (!i.enabled) return;
                        i.isTarget = !0, j = null != i.endpoint && i.endpoint._jsPlumb ? i.endpoint : e.addEndpoint(d.target, i.def), i.uniqueEndpoint && (i.endpoint = j), d.targetEndpoint = j, j._doNotDeleteOnDetach = !1, j._deleteOnDetach = !0
                    }
                    if (d.source && !d.source.endpoint && !d.sourceEndpoint && !d.newConnection && (h = Y(d.source), i = this.sourceEndpointDefinitions[h])) {
                        if (!i.enabled) return;
                        j = null != i.endpoint && i.endpoint._jsPlumb ? i.endpoint : e.addEndpoint(d.source, i.def), i.uniqueEndpoint && (i.endpoint = j), d.sourceEndpoint = j, j._doNotDeleteOnDetach = !1, j._deleteOnDetach = !0
                    }
                    return d
                }.bind(e), N = function (a) {
                    var b = e.Defaults.ConnectionType || e.getDefaultConnectionType();
                    e.Defaults.EndpointType || t.Endpoint, a._jsPlumb = e, a.newConnection = N, a.newEndpoint = Q, a.endpointsByUUID = s, a.endpointsByElement = q, a.finaliseConnection = O;
                    var c = new b(a);
                    return c.id = "con_" + F(), P("click", "click", c), P("dblclick", "dblclick", c), P("contextmenu", "contextmenu", c), c.isDetachable() && (c.endpoints[0].initDraggable(), c.endpoints[1].initDraggable()), c
                }, O = function (a, b, c, d) {
                    if (b = b || {}, a.suspendedEndpoint || p.push(a), (null == a.suspendedEndpoint || d) && e.anchorManager.newConnection(a), I(a.source), !b.doNotFireConnectionEvent && b.fireEvent !== !1) {
                        var f = {
                            connection: a,
                            source: a.source,
                            target: a.target,
                            sourceId: a.sourceId,
                            targetId: a.targetId,
                            sourceEndpoint: a.endpoints[0],
                            targetEndpoint: a.endpoints[1]
                        };
                        e.fire("connection", f, c)
                    }
                }, P = function (a, b, c) {
                    c.bind(a, function (a, d) {
                        e.fire(b, c, d)
                    })
                }, Q = function (a) {
                    var b = e.Defaults.EndpointType || t.Endpoint, c = t.extend({}, a);
                    c._jsPlumb = e, c.newConnection = N, c.newEndpoint = Q, c.endpointsByUUID = s, c.endpointsByElement = q, c.finaliseConnection = O, c.fireDetachEvent = _, c.fireMoveEvent = ab, c.floatingConnections = w, c.elementId = Y(c.source);
                    var d = new b(c);
                    return d.id = "ep_" + F(), P("click", "endpointClick", d), P("dblclick", "endpointDblClick", d), P("contextmenu", "contextmenu", d), jsPlumbAdapter.headless || e.dragManager.endpointAdded(c.source), d
                }, R = function (a, b, c) {
                    var d = q[a];
                    if (d && d.length) for (var e = 0, f = d.length; f > e; e++) {
                        for (var g = 0, h = d[e].connections.length; h > g; g++) {
                            var i = b(d[e].connections[g]);
                            if (i) return
                        }
                        c && c(d[e])
                    }
                }, S = function (a, b) {
                    return J(a, function (a, c) {
                        x[c] = b, this.isDragSupported(a) && this.setElementDraggable(a, b)
                    })
                }, T = function (a, b, c) {
                    b = "block" === b;
                    var d = null;
                    c && (d = b ? function (a) {
                        a.setVisible(!0, !0, !0)
                    } : function (a) {
                        a.setVisible(!1, !0, !0)
                    });
                    var e = k(a);
                    R(e.id, function (a) {
                        if (b && c) {
                            var d = a.sourceId === e.id ? 1 : 0;
                            a.endpoints[d].isVisible() && a.setVisible(!0)
                        } else a.setVisible(b)
                    }, d)
                }, U = function (a) {
                    return J(a, function (a, b) {
                        var c = null == x[b] ? !1 : x[b];
                        return c = !c, x[b] = c, this.setDraggable(a, c), c
                    })
                }, V = function (a, b) {
                    var c = null;
                    b && (c = function (a) {
                        var b = a.isVisible();
                        a.setVisible(!b)
                    }), R(a, function (a) {
                        var b = a.isVisible();
                        a.setVisible(!b)
                    }, c)
                }, W = this.updateOffset = function (a) {
                    var c, d = a.timestamp, f = a.recalc, g = a.offset, h = a.elId;
                    return A && !d && (d = B), !f && d && d === v[h] ? {
                        o: a.offset || u[h],
                        s: z[h]
                    } : (f || !g ? (c = document.getElementById(h), null != c && (z[h] = e.getSize(c), u[h] = b(c, e), v[h] = d)) : (u[h] = g, null == z[h] && (c = document.getElementById(h), null != c && (z[h] = e.getSize(c))), v[h] = d), u[h] && !u[h].right && (u[h].right = u[h].left + z[h][0], u[h].bottom = u[h].top + z[h][1], u[h].width = z[h][0], u[h].height = z[h][1], u[h].centerx = u[h].left + u[h].width / 2, u[h].centery = u[h].top + u[h].height / 2), {
                        o: u[h],
                        s: z[h]
                    })
                }, X = function (a) {
                    var b = u[a];
                    return b ? {o: b, s: z[a]} : W({elId: a})
                }, Y = function (a, b, c) {
                    if (jsPlumbUtil.isString(a)) return a;
                    if (null == a) return null;
                    var d = e.getAttribute(a, "id");
                    return d && "undefined" !== d || (2 == arguments.length && void 0 !== arguments[1] ? d = b : (1 == arguments.length || 3 == arguments.length && !arguments[2]) && (d = "jsPlumb_" + f + "_" + F()), c || e.setAttribute(a, "id", d)), d
                };
            this.setConnectionBeingDragged = function (a) {
                y = a
            }, this.isConnectionBeingDragged = function () {
                return y
            }, this.connectorClass = "_jsPlumb_connector", this.hoverClass = "_jsPlumb_hover", this.endpointClass = "_jsPlumb_endpoint", this.endpointConnectedClass = "_jsPlumb_endpoint_connected", this.endpointFullClass = "_jsPlumb_endpoint_full", this.endpointDropAllowedClass = "_jsPlumb_endpoint_drop_allowed", this.endpointDropForbiddenClass = "_jsPlumb_endpoint_drop_forbidden", this.overlayClass = "_jsPlumb_overlay", this.draggingClass = "_jsPlumb_dragging", this.elementDraggingClass = "_jsPlumb_element_dragging", this.sourceElementDraggingClass = "_jsPlumb_source_element_dragging", this.targetElementDraggingClass = "_jsPlumb_target_element_dragging", this.endpointAnchorClassPrefix = "_jsPlumb_endpoint_anchor", this.hoverSourceClass = "_jsPlumb_source_hover", this.hoverTargetClass = "_jsPlumb_target_hover", this.dragSelectClass = "_jsPlumb_drag_select", this.Anchors = {}, this.Connectors = {
                svg: {},
                vml: {}
            }, this.Endpoints = {svg: {}, vml: {}}, this.Overlays = {
                svg: {},
                vml: {}
            }, this.ConnectorRenderers = {}, this.SVG = "svg", this.VML = "vml", this.addEndpoint = function (b, c, d) {
                d = d || {};
                var f = t.extend({}, d);
                t.extend(f, c), f.endpoint = f.endpoint || e.Defaults.Endpoint, f.paintStyle = f.paintStyle || e.Defaults.EndpointStyle, b = H(b);
                for (var g = [], h = a.isArray(b) || null != b.length && !a.isString(b) ? b : [b], i = 0, j = h.length; j > i; i++) {
                    var k = e.getDOMElement(h[i]), l = Y(k);
                    f.source = k, qb(f.source), W({elId: l, timestamp: B});
                    var m = Q(f);
                    f.parentAnchor && (m.parentAnchor = f.parentAnchor), a.addToList(q, l, m);
                    var n = u[l], o = z[l],
                        p = m.anchor.compute({xy: [n.left, n.top], wh: o, element: m, timestamp: B}),
                        r = {anchorLoc: p, timestamp: B};
                    A && (r.recalc = !1), A || m.paint(r), g.push(m), m._doNotDeleteOnDetach = !0
                }
                return 1 == g.length ? g[0] : g
            }, this.addEndpoints = function (b, c, d) {
                for (var f = [], g = 0, h = c.length; h > g; g++) {
                    var i = e.addEndpoint(b, c[g], d);
                    a.isArray(i) ? Array.prototype.push.apply(f, i) : f.push(i)
                }
                return f
            }, this.animate = function (b, c, d) {
                d = d || {};
                var f = this.getElementObject(b), g = this.getDOMElement(b), h = Y(g), i = t.animEvents.step,
                    j = t.animEvents.complete;
                d[i] = a.wrap(d[i], function () {
                    e.repaint(h)
                }), d[j] = a.wrap(d[j], function () {
                    e.repaint(h)
                }), e.doAnimate(f, c, d)
            }, this.checkCondition = function (b, c) {
                var d = e.getListener(b), f = !0;
                if (d && d.length > 0) try {
                    for (var g = 0, h = d.length; h > g; g++) f = f && d[g](c)
                } catch (i) {
                    a.log(e, "cannot check condition [" + b + "]" + i)
                }
                return f
            }, this.checkASyncCondition = function (b, c, d, f) {
                var g = e.getListener(b);
                if (g && g.length > 0) try {
                    g[0](c, d, f)
                } catch (h) {
                    a.log(e, "cannot asynchronously check condition [" + b + "]" + h)
                }
            }, this.connect = function (a, b) {
                var c, d = M(a, b);
                return d && (qb(d.source), c = N(d), O(c, d)), c
            };
            var Z = [{el: "source", elId: "sourceId", epDefs: "sourceEndpointDefinitions"}, {
                el: "target",
                elId: "targetId",
                epDefs: "targetEndpointDefinitions"
            }], $ = function (a, b, c, d) {
                var e, f, g, h = Z[c], i = a[h.elId], j = (a[h.el], a.endpoints[c]), k = {
                    index: c,
                    originalSourceId: 0 === c ? i : a.sourceId,
                    newSourceId: a.sourceId,
                    originalTargetId: 1 == c ? i : a.targetId,
                    newTargetId: a.targetId,
                    connection: a
                };
                if (b.constructor == t.Endpoint) e = b, e.addConnection(a); else if (f = Y(b), g = this[h.epDefs][f], f === a[h.elId]) e = null; else if (g) {
                    if (!g.enabled) return;
                    e = null != g.endpoint && g.endpoint._jsPlumb ? g.endpoint : this.addEndpoint(b, g.def), g.uniqueEndpoint && (g.endpoint = e), e._doNotDeleteOnDetach = !1, e._deleteOnDetach = !0, e.addConnection(a)
                } else e = a.makeEndpoint(0 === c, b, f), e._doNotDeleteOnDetach = !1, e._deleteOnDetach = !0;
                return null != e && (j.detachFromConnection(a), a.endpoints[c] = e, a[h.el] = e.element, a[h.elId] = e.elementId, k[0 === c ? "newSourceId" : "newTargetId"] = e.elementId, ab(k), d || a.repaint()), k
            }.bind(this);
            this.setSource = function (a, b, c) {
                var d = $(a, b, 0, c);
                this.anchorManager.sourceChanged(d.originalSourceId, d.newSourceId, a)
            }, this.setTarget = function (a, b, c) {
                var d = $(a, b, 1, c);
                this.anchorManager.updateOtherEndpoint(d.originalSourceId, d.originalTargetId, d.newTargetId, a)
            }, this.deleteEndpoint = function (a, b) {
                var c = e.setSuspendDrawing(!0), d = "string" == typeof a ? s[a] : a;
                return d && e.deleteObject({endpoint: d}), c || e.setSuspendDrawing(!1, b), e
            }, this.deleteEveryEndpoint = function () {
                var a = e.setSuspendDrawing(!0);
                for (var b in q) {
                    var c = q[b];
                    if (c && c.length) for (var d = 0, f = c.length; f > d; d++) e.deleteEndpoint(c[d], !0)
                }
                return q = {}, s = {}, e.anchorManager.reset(), e.dragManager.reset(), a || e.setSuspendDrawing(!1), e
            };
            var _ = function (a, b, c) {
                var d = e.Defaults.ConnectionType || e.getDefaultConnectionType(), f = a.constructor == d, g = f ? {
                    connection: a,
                    source: a.source,
                    target: a.target,
                    sourceId: a.sourceId,
                    targetId: a.targetId,
                    sourceEndpoint: a.endpoints[0],
                    targetEndpoint: a.endpoints[1]
                } : a;
                b && e.fire("connectionDetached", g, c), e.anchorManager.connectionDetached(g)
            }, ab = function (a, b) {
                e.fire("connectionMoved", a, b)
            };
            this.unregisterEndpoint = function (a) {
                a._jsPlumb.uuid && (s[a._jsPlumb.uuid] = null), e.anchorManager.deleteEndpoint(a);
                for (var b in q) {
                    var c = q[b];
                    if (c) {
                        for (var d = [], f = 0, g = c.length; g > f; f++) c[f] != a && d.push(c[f]);
                        q[b] = d
                    }
                    q[b].length < 1 && delete q[b]
                }
            }, this.detach = function () {
                if (0 !== arguments.length) {
                    var a = e.Defaults.ConnectionType || e.getDefaultConnectionType(),
                        b = arguments[0].constructor == a,
                        c = 2 == arguments.length ? b ? arguments[1] || {} : arguments[0] : arguments[0],
                        d = c.fireEvent !== !1, f = c.forceDetach, g = b ? arguments[0] : c.connection;
                    if (g) (f || jsPlumbUtil.functionChain(!0, !1, [[g.endpoints[0], "isDetachAllowed", [g]], [g.endpoints[1], "isDetachAllowed", [g]], [g, "isDetachAllowed", [g]], [e, "checkCondition", ["beforeDetach", g]]])) && g.endpoints[0].detach(g, !1, !0, d); else {
                        var h = t.extend({}, c);
                        if (h.uuids) K(h.uuids[0]).detachFrom(K(h.uuids[1]), d); else if (h.sourceEndpoint && h.targetEndpoint) h.sourceEndpoint.detachFrom(h.targetEndpoint); else {
                            var i = Y(e.getDOMElement(h.source)), j = Y(e.getDOMElement(h.target));
                            R(i, function (a) {
                                (a.sourceId == i && a.targetId == j || a.targetId == i && a.sourceId == j) && e.checkCondition("beforeDetach", a) && a.endpoints[0].detach(a, !1, !0, d)
                            })
                        }
                    }
                }
            }, this.detachAllConnections = function (a, b) {
                b = b || {}, a = e.getDOMElement(a);
                var c = Y(a), d = q[c];
                if (d && d.length) for (var f = 0, g = d.length; g > f; f++) d[f].detachAll(b.fireEvent !== !1);
                return e
            }, this.detachEveryConnection = function (a) {
                return a = a || {}, e.doWhileSuspended(function () {
                    for (var b in q) {
                        var c = q[b];
                        if (c && c.length) for (var d = 0, e = c.length; e > d; d++) c[d].detachAll(a.fireEvent !== !1)
                    }
                    p.splice(0)
                }), e
            }, this.deleteObject = function (a) {
                var b = {endpoints: {}, connections: {}, endpointCount: 0, connectionCount: 0}, c = a.fireEvent !== !1,
                    d = a.deleteAttachedObjects !== !1, f = function (a) {
                        if (null != a && null == b.connections[a.id] && (null != a._jsPlumb && a.setHover(!1), b.connections[a.id] = a, b.connectionCount++, d)) for (var c = 0; c < a.endpoints.length; c++) a.endpoints[c]._deleteOnDetach && g(a.endpoints[c])
                    }, g = function (a) {
                        if (null != a && null == b.endpoints[a.id] && (null != a._jsPlumb && a.setHover(!1), b.endpoints[a.id] = a, b.endpointCount++, d)) for (var c = 0; c < a.connections.length; c++) {
                            var e = a.connections[c];
                            f(e)
                        }
                    };
                a.connection ? f(a.connection) : g(a.endpoint);
                for (var h in b.connections) {
                    var i = b.connections[h];
                    i._jsPlumb && (jsPlumbUtil.removeWithFunction(p, function (a) {
                        return i.id == a.id
                    }), _(i, c, a.originalEvent), i.endpoints[0].detachFromConnection(i), i.endpoints[1].detachFromConnection(i), i.cleanup(), i.destroy())
                }
                for (var j in b.endpoints) {
                    var k = b.endpoints[j];
                    k._jsPlumb && (e.unregisterEndpoint(k), k.cleanup(), k.destroy())
                }
                return b
            }, this.draggable = function (a, b) {
                var c, d, f;
                if ("object" == typeof a && a.length) for (c = 0, d = a.length; d > c; c++) f = e.getDOMElement(a[c]), f && L(f, !0, b); else if (a._nodes) for (c = 0, d = a._nodes.length; d > c; c++) f = e.getDOMElement(a._nodes[c]), f && L(f, !0, b); else f = e.getDOMElement(a), f && L(f, !0, b);
                return e
            };
            var bb = function (a, b, c, d) {
                for (var e = 0, f = a.length; f > e; e++) a[e][b].apply(a[e], c);
                return d(a)
            }, cb = function (a, b, c) {
                for (var d = [], e = 0, f = a.length; f > e; e++) d.push([a[e][b].apply(a[e], c), a[e]]);
                return d
            }, db = function (a, b, c) {
                return function () {
                    return bb(a, b, arguments, c)
                }
            }, eb = function (a, b) {
                return function () {
                    return cb(a, b, arguments)
                }
            }, fb = function (a, b) {
                var c = [];
                if (a) if ("string" == typeof a) {
                    if ("*" === a) return a;
                    c.push(a)
                } else if (b) c = a; else if (a.length) for (var d = 0, e = a.length; e > d; d++) c.push(k(a[d]).id); else c.push(k(a).id);
                return c
            }, gb = function (a, b, c) {
                return "*" === a ? !0 : a.length > 0 ? -1 != jsPlumbUtil.indexOf(a, b) : !c
            };
            this.getConnections = function (a, b) {
                a ? a.constructor == String && (a = {scope: a}) : a = {};
                for (var c = a.scope || e.getDefaultScope(), d = fb(c, !0), f = fb(a.source), g = fb(a.target), h = !b && d.length > 1 ? {} : [], i = function (a, c) {
                    if (!b && d.length > 1) {
                        var e = h[a];
                        null == e && (e = h[a] = []), e.push(c)
                    } else h.push(c)
                }, j = 0, k = p.length; k > j; j++) {
                    var l = p[j];
                    gb(d, l.scope) && gb(f, l.sourceId) && gb(g, l.targetId) && i(l.scope, l)
                }
                return h
            };
            var hb = function (a, b) {
                return function (c) {
                    for (var d = 0, e = a.length; e > d; d++) c(a[d]);
                    return b(a)
                }
            }, ib = function (a) {
                return function (b) {
                    return a[b]
                }
            }, jb = function (a, b) {
                var c, d, e = {length: a.length, each: hb(a, b), get: ib(a)},
                    f = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay", "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle", "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind"],
                    g = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle", "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents"];
                for (c = 0, d = f.length; d > c; c++) e[f[c]] = db(a, f[c], b);
                for (c = 0, d = g.length; d > c; c++) e[g[c]] = eb(a, g[c]);
                return e
            }, kb = function (a) {
                var b = jb(a, kb);
                return t.extend(b, {
                    setDetachable: db(a, "setDetachable", kb),
                    setReattach: db(a, "setReattach", kb),
                    setConnector: db(a, "setConnector", kb),
                    detach: function () {
                        for (var b = 0, c = a.length; c > b; b++) e.detach(a[b])
                    },
                    isDetachable: eb(a, "isDetachable"),
                    isReattach: eb(a, "isReattach")
                })
            }, lb = function (a) {
                var b = jb(a, lb);
                return t.extend(b, {
                    setEnabled: db(a, "setEnabled", lb),
                    setAnchor: db(a, "setAnchor", lb),
                    isEnabled: eb(a, "isEnabled"),
                    detachAll: function () {
                        for (var b = 0, c = a.length; c > b; b++) a[b].detachAll()
                    },
                    remove: function () {
                        for (var b = 0, c = a.length; c > b; b++) e.deleteObject({endpoint: a[b]})
                    }
                })
            };
            this.select = function (a) {
                return a = a || {}, a.scope = a.scope || "*", kb(a.connections || e.getConnections(a, !0))
            }, this.selectEndpoints = function (a) {
                a = a || {}, a.scope = a.scope || "*";
                var b = !a.element && !a.source && !a.target, c = b ? "*" : fb(a.element), d = b ? "*" : fb(a.source),
                    e = b ? "*" : fb(a.target), f = fb(a.scope, !0), g = [];
                for (var h in q) {
                    var i = gb(c, h, !0), j = gb(d, h, !0), k = "*" != d, l = gb(e, h, !0), m = "*" != e;
                    if (i || j || l) a:for (var n = 0, o = q[h].length; o > n; n++) {
                        var p = q[h][n];
                        if (gb(f, p.scope, !0)) {
                            var r = k && d.length > 0 && !p.isSource, s = m && e.length > 0 && !p.isTarget;
                            if (r || s) continue a;
                            g.push(p)
                        }
                    }
                }
                return lb(g)
            }, this.getAllConnections = function () {
                return p
            }, this.getDefaultScope = function () {
                return C
            }, this.getEndpoint = K, this.getEndpoints = function (a) {
                return q[k(a).id]
            }, this.getDefaultEndpointType = function () {
                return t.Endpoint
            }, this.getDefaultConnectionType = function () {
                return t.Connection
            }, this.getId = Y, this.getOffset = function (a) {
                return u[a], W({elId: a})
            }, this.appendElement = G;
            var mb = !1;
            this.isHoverSuspended = function () {
                return mb
            }, this.setHoverSuspended = function (a) {
                mb = a
            };
            var nb = function (a) {
                return function () {
                    return jsPlumbAdapter.isRenderModeAvailable(a)
                }
            };
            this.isSVGAvailable = nb("svg"), this.isVMLAvailable = nb("vml"), this.hide = function (a, b) {
                return T(a, "none", b), e
            }, this.idstamp = F, this.connectorsInitialized = !1;
            var ob = [], pb = ["svg", "vml"];
            this.registerConnectorType = function (a, b) {
                ob.push([a, b])
            };
            var qb = function (a) {
                if (!m && a) {
                    var b = e.getDOMElement(a);
                    b.offsetParent && (m = b.offsetParent)
                }
            }, rb = function () {
                e.Defaults.Container && (m = e.getDOMElement(e.Defaults.Container))
            };
            this.init = function () {
                var a = function (a, b, c) {
                    t.Connectors[a][b] = function () {
                        c.apply(this, arguments), t.ConnectorRenderers[a].apply(this, arguments)
                    }, jsPlumbUtil.extend(t.Connectors[a][b], [c, t.ConnectorRenderers[a]])
                };
                if (!t.connectorsInitialized) {
                    for (var b = 0; b < ob.length; b++) for (var c = 0; c < pb.length; c++) a(pb[c], ob[b][1], ob[b][0]);
                    t.connectorsInitialized = !0
                }
                o || (rb(), e.anchorManager = new t.AnchorManager({jsPlumbInstance: e}), e.setRenderMode(e.Defaults.RenderMode), o = !0, e.fire("ready", e))
            }.bind(this), this.log = n, this.jsPlumbUIComponent = j, this.makeAnchor = function () {
                var b, c = function (a, b) {
                    if (t.Anchors[a]) return new t.Anchors[a](b);
                    if (!e.Defaults.DoNotThrowErrors) throw{msg: "jsPlumb: unknown anchor type '" + a + "'"}
                };
                if (0 === arguments.length) return null;
                var d = arguments[0], f = arguments[1], g = arguments[2], h = null;
                if (d.compute && d.getOrientation) return d;
                if ("string" == typeof d) h = c(arguments[0], {
                    elementId: f,
                    jsPlumbInstance: e
                }); else if (a.isArray(d)) if (a.isArray(d[0]) || a.isString(d[0])) 2 == d.length && a.isObject(d[1]) ? a.isString(d[0]) ? (b = t.extend({
                    elementId: f,
                    jsPlumbInstance: e
                }, d[1]), h = c(d[0], b)) : (b = t.extend({
                    elementId: f,
                    jsPlumbInstance: e,
                    anchors: d[0]
                }, d[1]), h = new t.DynamicAnchor(b)) : h = new t.DynamicAnchor({
                    anchors: d,
                    selector: null,
                    elementId: f,
                    jsPlumbInstance: g
                }); else {
                    var i = {
                        x: d[0],
                        y: d[1],
                        orientation: d.length >= 4 ? [d[2], d[3]] : [0, 0],
                        offsets: d.length >= 6 ? [d[4], d[5]] : [0, 0],
                        elementId: f,
                        jsPlumbInstance: g,
                        cssClass: 7 == d.length ? d[6] : null
                    };
                    h = new t.Anchor(i), h.clone = function () {
                        return new t.Anchor(i)
                    }
                }
                return h.id || (h.id = "anchor_" + F()), h
            }, this.makeAnchors = function (b, c, d) {
                for (var f = [], g = 0, h = b.length; h > g; g++) "string" == typeof b[g] ? f.push(t.Anchors[b[g]]({
                    elementId: c,
                    jsPlumbInstance: d
                })) : a.isArray(b[g]) && f.push(e.makeAnchor(b[g], c, d));
                return f
            }, this.makeDynamicAnchor = function (a, b) {
                return new t.DynamicAnchor({anchors: a, selector: b, elementId: null, jsPlumbInstance: e})
            }, this.targetEndpointDefinitions = {};
            var sb = function (a, b, c) {
                a.paintStyle = a.paintStyle || c.Defaults.EndpointStyles[b] || c.Defaults.EndpointStyle, a.hoverPaintStyle = a.hoverPaintStyle || c.Defaults.EndpointHoverStyles[b] || c.Defaults.EndpointHoverStyle, a.anchor = a.anchor || c.Defaults.Anchors[b] || c.Defaults.Anchor, a.endpoint = a.endpoint || c.Defaults.Endpoints[b] || c.Defaults.Endpoint
            };
            this.sourceEndpointDefinitions = {};
            var tb = function (a, b, c, d, e) {
                for (var f = a.target || a.srcElement, g = !1, h = d.getSelector(b, c), i = 0; i < h.length; i++) if (h[i] == f) {
                    g = !0;
                    break
                }
                return e ? !g : g
            };
            this.makeTarget = function (c, d, f) {
                var g = t.extend({_jsPlumb: this}, f);
                t.extend(g, d), sb(g, 1, this);
                var h = g.scope || e.Defaults.Scope, i = !(g.deleteEndpointsOnDetach === !1),
                    l = g.maxConnections || -1, m = g.onMaxConnections, n = function (c) {
                        var d = k(c), e = d.id, f = new j(g), n = t.extend({}, g.dropOptions || {});
                        qb(e), this.targetEndpointDefinitions[e] = {
                            def: g,
                            uniqueEndpoint: g.uniqueEndpoint,
                            maxConnections: l,
                            enabled: !0
                        };
                        var o = function () {
                            this.currentlyDragging = !1;
                            var a = this.getDropEvent(arguments), c = this.select({target: e}).length,
                                h = this.getDOMElement(this.getDragObject(arguments)), j = this.getAttribute(h, "dragId"),
                                k = this.getAttribute(h, "originalScope"), l = w[j],
                                n = l.endpoints[0].isFloating() ? 0 : 1, o = l.endpoints[0],
                                p = (g.endpoint ? t.extend({}, g.endpoint) : {}, this.targetEndpointDefinitions[e]);
                            if (!p.enabled || p.maxConnections > 0 && c >= p.maxConnections) return m && m({
                                element: d.el,
                                connection: l
                            }, a), !1;
                            if (o.anchor.locked = !1, k && this.setDragScope(h, k), null == l.suspendedEndpoint && !l.pending) return !1;
                            var q = f.isDropAllowed(0 === n ? e : l.sourceId, 0 === n ? l.targetId : e, l.scope, l, null, 0 === n ? d.el : l.source, 0 === n ? l.target : d.el);
                            if (l.suspendedEndpoint) {
                                l[n ? "targetId" : "sourceId"] = l.suspendedEndpoint.elementId, l[n ? "target" : "source"] = l.suspendedEndpoint.element, l.endpoints[n] = l.suspendedEndpoint;
                                var r = (l.suspendedEndpoint.getElement(), l.suspendedEndpoint.elementId);
                                ab({
                                    index: n,
                                    originalSourceId: 0 === n ? r : l.sourceId,
                                    newSourceId: 0 === n ? e : l.sourceId,
                                    originalTargetId: 1 == n ? r : l.targetId,
                                    newTargetId: 1 == n ? e : l.targetId,
                                    connection: l
                                }, a)
                            }
                            if (q) {
                                var s = this.getElementObject(d.el), u = p.endpoint;
                                if ((null == u || null == u._jsPlumb) && (u = this.addEndpoint(s, g)), g.uniqueEndpoint && (p.endpoint = u), u._doNotDeleteOnDetach = !1, u._deleteOnDetach = !0, null != u.anchor.positionFinder) {
                                    var v = this.getUIPosition(arguments, this.getZoom()), x = b(s, this),
                                        y = this.getSize(s),
                                        z = u.anchor.positionFinder(v, x, y, u.anchor.constructorParams);
                                    u.anchor.x = z[0], u.anchor.y = z[1]
                                }
                                l[n ? "target" : "source"] = u.element, l[n ? "targetId" : "sourceId"] = u.elementId, l.endpoints[n].detachFromConnection(l), l.endpoints[n]._deleteOnDetach && (l.endpoints[n].deleteAfterDragStop = !0), u.addConnection(l), l.endpoints[n] = u, l.deleteEndpointsOnDetach = i, 1 == n ? this.anchorManager.updateOtherEndpoint(l.sourceId, l.suspendedElementId, l.targetId, l) : this.anchorManager.sourceChanged(l.suspendedEndpoint.elementId, l.sourceId, l), O(l, null, a), l.pending = !1
                            } else l.suspendedEndpoint && (l.isReattach() ? (l.setHover(!1), l.floatingAnchorIndex = null, l.suspendedEndpoint.addConnection(l), this.repaint(o.elementId)) : o.detach(l, !1, !0, !0, a))
                        }.bind(this), p = t.dragEvents.drop;
                        n.scope = n.scope || h, n[p] = a.wrap(n[p], o), this.initDroppable(this.getElementObject(d.el), n, !0)
                    }.bind(this);
                c = H(c);
                for (var o = c.length && c.constructor != String ? c : [c], p = 0, q = o.length; q > p; p++) n(o[p]);
                return this
            }, this.unmakeTarget = function (a, b) {
                var c = k(a);
                return t.destroyDroppable(c.el), b || delete this.targetEndpointDefinitions[c.id], this
            }, this.makeSource = function (c, d, f) {
                var g = t.extend({}, f);
                t.extend(g, d), sb(g, 0, this);
                var h = g.maxConnections || -1, j = g.onMaxConnections, l = function (c) {
                    var d = c.id, f = this.getElementObject(c.el), k = this.getDOMElement(f), l = function () {
                        return null == g.parent ? null : "parent" === g.parent ? c.el.parentNode : e.getDOMElement(g.parent)
                    }, n = null != g.parent ? this.getId(l()) : d;
                    qb(n), this.sourceEndpointDefinitions[n] = {
                        def: g,
                        uniqueEndpoint: g.uniqueEndpoint,
                        maxConnections: h,
                        enabled: !0
                    };
                    var o = t.dragEvents.stop, p = t.dragEvents.drag, q = t.extend({}, g.dragOptions || {}), r = q.drag,
                        s = q.stop, u = null, v = !1;
                    q.scope = q.scope || g.scope, q[p] = a.wrap(q[p], function () {
                        r && r.apply(this, arguments), v = !1
                    }), q[o] = a.wrap(q[o], function () {
                        if (s && s.apply(this, arguments), this.currentlyDragging = !1, null != u._jsPlumb) {
                            var a = g.anchor || this.Defaults.Anchor, c = u.anchor, e = u.connections[0],
                                f = this.makeAnchor(a, d, this), h = u.element;
                            if (null != f.positionFinder) {
                                var i = b(h, this), j = this.getSize(h),
                                    k = {left: i.left + c.x * j[0], top: i.top + c.y * j[1]},
                                    n = f.positionFinder(k, i, j, f.constructorParams);
                                f.x = n[0], f.y = n[1]
                            }
                            if (u.setAnchor(f, !0), g.parent) {
                                var o = l();
                                if (o) {
                                    var p = g.container || m;
                                    u.setElement(o, p)
                                }
                            }
                            u.repaint(), this.repaint(u.elementId), this.repaint(e.targetId)
                        }
                    }.bind(this));
                    var w = function (a) {
                        var b = this.getOriginalEvent(a), c = this.sourceEndpointDefinitions[n];
                        if (d = this.getId(this.getDOMElement(f)), c.enabled) {
                            if (g.filter) {
                                var m = jsPlumbUtil.isString(g.filter) ? tb(b, f, g.filter, this, g.filterExclude) : g.filter(b, f);
                                if (m === !1) return
                            }
                            var o = this.select({source: n}).length;
                            if (c.maxConnections >= 0 && o >= c.maxConnections) return j && j({
                                element: f,
                                maxConnections: h
                            }, a), !1;
                            var p = jsPlumbAdapter.getPositionOnElement(b, k, i), r = p;
                            g.parent && (r = jsPlumbAdapter.getPositionOnElement(b, l(), i));
                            var s = {};
                            t.extend(s, g), s.isSource = !0, s.anchor = [p[0], p[1], 0, 0], s.parentAnchor = [r[0], r[1], 0, 0], s.dragOptions = q, u = this.addEndpoint(d, s), v = !0, u.endpointWillMoveTo = g.parent ? l() : null, u._doNotDeleteOnDetach = !1, u._deleteOnDetach = !0;
                            var w = function () {
                                v && (v = !1, e.deleteEndpoint(u))
                            };
                            e.registerListener(u.canvas, "mouseup", w), e.registerListener(f, "mouseup", w), e.trigger(u.canvas, "mousedown", a), jsPlumbUtil.consume(a)
                        }
                    }.bind(this);
                    this.registerListener(f, "mousedown", w), this.sourceEndpointDefinitions[n].trigger = w, g.filter && jsPlumbUtil.isString(g.filter) && e.setDragFilter(f, g.filter)
                }.bind(this);
                c = H(c);
                for (var n = c.length && c.constructor != String ? c : [c], o = 0, p = n.length; p > o; o++) l(k(n[o]));
                return this
            }, this.unmakeSource = function (a, b) {
                var c = k(a), d = this.sourceEndpointDefinitions[c.id].trigger;
                return d && e.unregisterListener(c.el, "mousedown", d), b || delete this.sourceEndpointDefinitions[c.id], this
            }, this.unmakeEverySource = function () {
                for (var a in this.sourceEndpointDefinitions) e.unmakeSource(a, !0);
                return this.sourceEndpointDefinitions = {}, this
            }, this.unmakeEveryTarget = function () {
                for (var a in this.targetEndpointDefinitions) e.unmakeTarget(a, !0);
                return this.targetEndpointDefinitions = {}, this
            };
            var ub = function (b, c, d, e) {
                var f = "source" == b ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
                if (c = H(c), a.isString(c)) f[c].enabled = e ? !f[c].enabled : d; else if (c.length) for (var g = 0, h = c.length; h > g; g++) {
                    var i = k(c[g]);
                    f[i.id] && (f[i.id].enabled = e ? !f[i.id].enabled : d)
                } else {
                    var j = k(c).id;
                    f[j].enabled = e ? !f[j].enabled : d
                }
                return this
            }.bind(this), vb = function (b, c) {
                return b = H(b), a.isString(b) || !b.length ? c.apply(this, [b]) : b.length ? c.apply(this, [b[0]]) : void 0
            }.bind(this);
            this.toggleSourceEnabled = function (a) {
                return ub("source", a, null, !0), this.isSourceEnabled(a)
            }, this.setSourceEnabled = function (a, b) {
                return ub("source", a, b)
            }, this.isSource = function (a) {
                return vb(a, function (a) {
                    return null != this.sourceEndpointDefinitions[k(a).id]
                })
            }, this.isSourceEnabled = function (a) {
                return vb(a, function (a) {
                    var b = this.sourceEndpointDefinitions[k(a).id];
                    return b && b.enabled === !0
                })
            }, this.toggleTargetEnabled = function (a) {
                return ub("target", a, null, !0), this.isTargetEnabled(a)
            }, this.isTarget = function (a) {
                return vb(a, function (a) {
                    return null != this.targetEndpointDefinitions[k(a).id]
                })
            }, this.isTargetEnabled = function (a) {
                return vb(a, function (a) {
                    var b = this.targetEndpointDefinitions[k(a).id];
                    return b && b.enabled === !0
                })
            }, this.setTargetEnabled = function (a, b) {
                return ub("target", a, b)
            }, this.ready = function (a) {
                e.bind("ready", a)
            }, this.repaint = function (a, b, c) {
                if ("object" == typeof a && a.length) for (var d = 0, f = a.length; f > d; d++) I(a[d], b, c); else I(a, b, c);
                return e
            }, this.repaintEverything = function (a) {
                var b = c();
                for (var d in q) I(d, null, b, a);
                return this
            }, this.removeAllEndpoints = function (a, b) {
                var c = function (a) {
                    var d, f, g = k(a), h = q[g.id];
                    if (h) for (d = 0, f = h.length; f > d; d++) e.deleteEndpoint(h[d]);
                    if (delete q[g.id], b && g.el && 3 != g.el.nodeType && 8 != g.el.nodeType) for (d = 0, f = g.el.childNodes.length; f > d; d++) c(g.el.childNodes[d])
                };
                return c(a), this
            }, this.remove = function (a, b) {
                var c = k(a);
                return e.doWhileSuspended(function () {
                    e.removeAllEndpoints(c.id, !0), e.dragManager.elementRemoved(c.id), delete w[c.id], e.anchorManager.clearFor(c.id), e.anchorManager.removeFloatingConnection(c.id)
                }, b === !1), c.el && e.removeElement(c.el), e
            };
            var wb = {}, xb = function () {
                for (var a in wb) for (var b = 0, c = wb[a].length; c > b; b++) {
                    var d = wb[a][b];
                    e.off(d.el, d.event, d.listener)
                }
                wb = {}
            };
            this.registerListener = function (a, b, c) {
                e.on(a, b, c), jsPlumbUtil.addToList(wb, b, {el: a, event: b, listener: c})
            }, this.unregisterListener = function (a, b, c) {
                e.off(a, b, c), jsPlumbUtil.removeWithFunction(wb, function (a) {
                    return a.type == b && a.listener == c
                })
            }, this.reset = function () {
                e.deleteEveryEndpoint(), e.unbind(), this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {}, p.splice(0), xb(), e.anchorManager.reset(), jsPlumbAdapter.headless || e.dragManager.reset()
            }, this.setDefaultScope = function (a) {
                return C = a, e
            }, this.setDraggable = S, this.setId = function (a, b, c) {
                var d;
                jsPlumbUtil.isString(a) ? d = a : (a = this.getDOMElement(a), d = this.getId(a));
                var e = this.getConnections({source: d, scope: "*"}, !0),
                    f = this.getConnections({target: d, scope: "*"}, !0);
                b = "" + b, c ? a = this.getDOMElement(b) : (a = this.getDOMElement(d), this.setAttribute(a, "id", b)), q[b] = q[d] || [];
                for (var g = 0, h = q[b].length; h > g; g++) q[b][g].setElementId(b), q[b][g].setReferenceElement(a);
                delete q[d], this.anchorManager.changeId(d, b), this.dragManager && this.dragManager.changeId(d, b);
                var i = function (c, d, e) {
                    for (var f = 0, g = c.length; g > f; f++) c[f].endpoints[d].setElementId(b), c[f].endpoints[d].setReferenceElement(a), c[f][e + "Id"] = b, c[f][e] = a
                };
                i(e, 0, "source"), i(f, 1, "target"), this.repaint(b)
            }, this.setDebugLog = function (a) {
                n = a
            }, this.setSuspendDrawing = function (a, b) {
                var c = A;
                return A = a, B = a ? (new Date).getTime() : null, b && this.repaintEverything(), c
            }, this.isSuspendDrawing = function () {
                return A
            }, this.getSuspendedAt = function () {
                return B
            }, this.doWhileSuspended = function (b, c) {
                var d = this.isSuspendDrawing();
                d || this.setSuspendDrawing(!0);
                try {
                    b()
                } catch (e) {
                    a.log("Function run while suspended failed", e)
                }
                d || this.setSuspendDrawing(!1, !c)
            }, this.getOffset = function (a) {
                return u[a]
            }, this.getCachedData = X, this.timestamp = c, this.setRenderMode = function (a) {
                if (a !== t.SVG && a !== t.VML) throw new TypeError("Render mode [" + a + "] not supported");
                return D = jsPlumbAdapter.setRenderMode(a)
            }, this.getRenderMode = function () {
                return D
            }, this.show = function (a, b) {
                return T(a, "block", b), e
            }, this.toggleVisible = V, this.toggleDraggable = U, this.addListener = this.bind, jsPlumbAdapter.headless || (e.dragManager = jsPlumbAdapter.getDragManager(e), e.recalculateOffsets = e.dragManager.updateOffsets)
        };
        jsPlumbUtil.extend(s, jsPlumbUtil.EventGenerator, {
            setAttribute: function (a, b, c) {
                this.setAttribute(a, b, c)
            }, getAttribute: function (a, b) {
                return this.getAttribute(t.getDOMElement(a), b)
            }, registerConnectionType: function (a, b) {
                this._connectionTypes[a] = t.extend({}, b)
            }, registerConnectionTypes: function (a) {
                for (var b in a) this._connectionTypes[b] = t.extend({}, a[b])
            }, registerEndpointType: function (a, b) {
                this._endpointTypes[a] = t.extend({}, b)
            }, registerEndpointTypes: function (a) {
                for (var b in a) this._endpointTypes[b] = t.extend({}, a[b])
            }, getType: function (a, b) {
                return "connection" === b ? this._connectionTypes[a] : this._endpointTypes[a]
            }, setIdChanged: function (a, b) {
                this.setId(a, b, !0)
            }, setParent: function (a, b) {
                var c = this.getElementObject(a), d = this.getDOMElement(c), e = this.getId(d),
                    f = this.getElementObject(b), g = this.getDOMElement(f), h = this.getId(g);
                d.parentNode.removeChild(d), g.appendChild(d), this.dragManager.setParent(c, e, f, h)
            }, getSize: function (a) {
                return [a.offsetWidth, a.offsetHeight]
            }, getWidth: function (a) {
                return a.offsetWidth
            }, getHeight: function (a) {
                return a.offsetHeight
            }, extend: function (a, b, c) {
                var d;
                if (c) for (d = 0; d < c.length; d++) a[c[d]] = b[c[d]]; else for (d in b) a[d] = b[d];
                return a
            }
        }, jsPlumbAdapter);
        var t = new s;
        "undefined" != typeof window && (window.jsPlumb = t), t.getInstance = function (a) {
            var b = new s(a);
            return b.init(), b
        }, "function" == typeof define && (define("jsplumb", [], function () {
            return t
        }), define("jsplumbinstance", [], function () {
            return t.getInstance()
        })), "undefined" != typeof exports && (exports.jsPlumb = t)
    }(), function () {
        "use strict";
        var a = function (a, b) {
                var c = !1;
                return {
                    drag: function () {
                        if (c) return c = !1, !0;
                        var d = jsPlumb.getUIPosition(arguments,b.getZoom());
                        a.element && (jsPlumbAdapter.setPosition(a.element, d), b.repaint(a.element, d))
                    }, stopDrag: function () {
                        c = !0
                    }
                }
            }, b = function (a, b) {
                var c = document.createElement("div");
                c.style.position = "absolute";
                var d = b.getContainer() || document.body;
                d.appendChild(c);
                var e = b.getId(c);
                b.updateOffset({elId: e}), a.id = e, a.element = c
            }, c = function (a, b, c, d, e, f, g) {
                var h = new jsPlumb.FloatingAnchor({reference: b, referenceCanvas: d, jsPlumbInstance: f});
                return g({paintStyle: a, endpoint: c, anchor: h, source: e, scope: "__floating"})
            },
            d = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"],
            e = function (a, b) {
                var c = 0;
                if (null != b) for (var d = 0; d < a.connections.length; d++) if (a.connections[d].sourceId == b || a.connections[d].targetId == b) {
                    c = d;
                    break
                }
                return a.connections[c]
            }, f = function (a, b) {
                return jsPlumbUtil.findWithFunction(b.connections, function (b) {
                    return b.id == a.id
                })
            };
        jsPlumb.Endpoint = function (g) {
            var h = g._jsPlumb, i = (jsPlumbAdapter.getAttribute, jsPlumb.getElementObject), j = jsPlumbUtil,
                k = g.newConnection, l = g.newEndpoint, m = g.finaliseConnection,
                n = (g.fireDetachEvent, g.fireMoveEvent), o = g.floatingConnections;
            this.idPrefix = "_jsplumb_e_", this.defaultLabelLocation = [.5, .5], this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"], OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.getDefaultType = function () {
                return {
                    parameters: {},
                    scope: null,
                    maxConnections: this._jsPlumb.instance.Defaults.MaxConnections,
                    paintStyle: this._jsPlumb.instance.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle,
                    endpoint: this._jsPlumb.instance.Defaults.Endpoint || jsPlumb.Defaults.Endpoint,
                    hoverPaintStyle: this._jsPlumb.instance.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle,
                    overlays: this._jsPlumb.instance.Defaults.EndpointOverlays || jsPlumb.Defaults.EndpointOverlays,
                    connectorStyle: g.connectorStyle,
                    connectorHoverStyle: g.connectorHoverStyle,
                    connectorClass: g.connectorClass,
                    connectorHoverClass: g.connectorHoverClass,
                    connectorOverlays: g.connectorOverlays,
                    connector: g.connector,
                    connectorTooltip: g.connectorTooltip
                }
            }, this._jsPlumb.enabled = !(g.enabled === !1), this._jsPlumb.visible = !0, this.element = jsPlumb.getDOMElement(g.source), this._jsPlumb.uuid = g.uuid, this._jsPlumb.floatingEndpoint = null;
            var p = null;
            this._jsPlumb.uuid && (g.endpointsByUUID[this._jsPlumb.uuid] = this), this.elementId = g.elementId, this._jsPlumb.connectionCost = g.connectionCost, this._jsPlumb.connectionsDirected = g.connectionsDirected, this._jsPlumb.currentAnchorClass = "", this._jsPlumb.events = {};
            var q = function () {
                jsPlumbAdapter.removeClass(this.element, h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass), this.removeClass(h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass), this._jsPlumb.currentAnchorClass = this.anchor.getCssClass(), this.addClass(h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass), jsPlumbAdapter.addClass(this.element, h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass)
            }.bind(this);
            this.setAnchor = function (a, b) {
                return this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId), this.anchor = this._jsPlumb.instance.makeAnchor(a, this.elementId, h), q(), this.anchor.bind("anchorChanged", function (a) {
                    this.fire("anchorChanged", {endpoint: this, anchor: a}), q()
                }.bind(this)), b || this._jsPlumb.instance.repaint(this.elementId), this
            };
            var r = g.anchor ? g.anchor : g.anchors ? g.anchors : h.Defaults.Anchor || "Top";
            this.setAnchor(r, !0);
            var s = function (a) {
                this.connections.length > 0 ? this.connections[0].setHover(a, !1) : this.setHover(a)
            }.bind(this);
            g._transient || this._jsPlumb.instance.anchorManager.add(this, this.elementId), this.setEndpoint = function (a) {
                null != this.endpoint && (this.endpoint.cleanup(), this.endpoint.destroy());
                var b = function (a, b) {
                    var c = h.getRenderMode();
                    if (jsPlumb.Endpoints[c][a]) return new jsPlumb.Endpoints[c][a](b);
                    if (!h.Defaults.DoNotThrowErrors) throw{msg: "jsPlumb: unknown endpoint type '" + a + "'"}
                }, c = {
                    _jsPlumb: this._jsPlumb.instance,
                    cssClass: g.cssClass,
                    container: g.container,
                    tooltip: g.tooltip,
                    connectorTooltip: g.connectorTooltip,
                    endpoint: this
                };
                j.isString(a) ? this.endpoint = b(a, c) : j.isArray(a) ? (c = j.merge(a[1], c), this.endpoint = b(a[0], c)) : this.endpoint = a.clone(), jsPlumb.extend({}, c), this.endpoint.clone = function () {
                    return j.isString(a) ? b(a, c) : j.isArray(a) ? (c = j.merge(a[1], c), b(a[0], c)) : void 0
                }.bind(this), this.type = this.endpoint.type, this.bindListeners(this.endpoint, this, s)
            }, this.setEndpoint(g.endpoint || h.Defaults.Endpoint || jsPlumb.Defaults.Endpoint || "Dot"), this.setPaintStyle(g.paintStyle || g.style || h.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle, !0), this.setHoverPaintStyle(g.hoverPaintStyle || h.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle, !0), this._jsPlumb.paintStyleInUse = this.getPaintStyle(), jsPlumb.extend(this, g, d), this.isSource = g.isSource || !1, this.isTarget = g.isTarget || !1, this._jsPlumb.maxConnections = g.maxConnections || h.Defaults.MaxConnections, this.canvas = this.endpoint.canvas, this.addClass(h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass), jsPlumbAdapter.addClass(this.element, h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass), this.connections = g.connections || [], this.connectorPointerEvents = g["connector-pointer-events"], this.scope = g.scope || h.getDefaultScope(), this.timestamp = null, this.reattachConnections = g.reattach || h.Defaults.ReattachConnections, this.connectionsDetachable = h.Defaults.ConnectionsDetachable, (g.connectionsDetachable === !1 || g.detachable === !1) && (this.connectionsDetachable = !1), this.dragAllowedWhenFull = g.dragAllowedWhenFull || !0, g.onMaxConnections && this.bind("maxConnections", g.onMaxConnections), this.addConnection = function (a) {
                this.connections.push(a), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](h.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](h.endpointFullClass)
            }, this.detachFromConnection = function (a, b, c) {
                b = null == b ? f(a, this) : b, b >= 0 && (this.connections.splice(b, 1), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](h.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](h.endpointFullClass)), !c && this._deleteOnDetach && 0 === this.connections.length && h.deleteObject({
                    endpoint: this,
                    fireEvent: !1,
                    deleteAttachedObjects: !1
                })
            }, this.detach = function (a, b, c, d, e, g, i) {
                var j = null == i ? f(a, this) : i, k = !1;
                return d = d !== !1, j >= 0 && (c || a._forceDetach || a.isDetachable() && a.isDetachAllowed(a) && this.isDetachAllowed(a)) && (h.deleteObject({
                    connection: a,
                    fireEvent: !b && d,
                    originalEvent: e,
                    deleteAttachedObjects: !1
                }), k = !0), k
            }, this.detachAll = function (a, b) {
                for (; this.connections.length > 0;) this.detach(this.connections[0], !1, !0, a !== !1, b, this, 0);
                return this
            }, this.detachFrom = function (a, b, c) {
                for (var d = [], e = 0; e < this.connections.length; e++) (this.connections[e].endpoints[1] == a || this.connections[e].endpoints[0] == a) && d.push(this.connections[e]);
                for (var f = 0; f < d.length; f++) this.detach(d[f], !1, !0, b, c);
                return this
            }, this.getElement = function () {
                return this.element
            }, this.setElement = function (a) {
                var b = this._jsPlumb.instance.getId(a), c = this.elementId;
                return j.removeWithFunction(g.endpointsByElement[this.elementId], function (a) {
                    return a.id == this.id
                }.bind(this)), this.element = jsPlumb.getDOMElement(a), this.elementId = h.getId(this.element), h.anchorManager.rehomeEndpoint(this, c, this.element), h.dragManager.endpointAdded(this.element), j.addToList(g.endpointsByElement, b, this), this
            }, this.makeInPlaceCopy = function () {
                var a = this.anchor.getCurrentLocation({element: this}), b = this.anchor.getOrientation(this),
                    c = this.anchor.getCssClass(), d = {
                        bind: function () {
                        }, compute: function () {
                            return [a[0], a[1]]
                        }, getCurrentLocation: function () {
                            return [a[0], a[1]]
                        }, getOrientation: function () {
                            return b
                        }, getCssClass: function () {
                            return c
                        }
                    };
                return l({
                    dropOptions: g.dropOptions,
                    anchor: d,
                    source: this.element,
                    paintStyle: this.getPaintStyle(),
                    endpoint: g.hideOnDrag ? "Blank" : this.endpoint,
                    _transient: !0,
                    scope: this.scope
                })
            }, this.connectorSelector = function () {
                var a = this.connections[0];
                return this.isTarget && a ? a : this.connections.length < this._jsPlumb.maxConnections || -1 == this._jsPlumb.maxConnections ? null : a
            }, this.setStyle = this.setPaintStyle, this.paint = function (a) {
                a = a || {};
                var b = a.timestamp, c = !(a.recalc === !1);
                if (!b || this.timestamp !== b) {

                    var d = h.updateOffset({elId: this.elementId, timestamp: b}), f = a.offset ? a.offset.o : d.o;
                    if (null != f) {
                        var g = a.anchorPoint, i = a.connectorPaintStyle;
                        if (null == g) {
                            var j = a.dimensions || d.s, k = {xy: [f.left, f.top], wh: j, element: this, timestamp: b};
                            if (c && this.anchor.isDynamic && this.connections.length > 0) {
                                var l = e(this, a.elementWithPrecedence), m = l.endpoints[0] == this ? 1 : 0,
                                    n = 0 === m ? l.sourceId : l.targetId, o = h.getCachedData(n), p = o.o, q = o.s;
                                k.txy = [p.left, p.top], k.twh = q, k.tElement = l.endpoints[m]
                            }
                            g = this.anchor.compute(k)
                        }
                        this.endpoint.compute(g, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, i || this.paintStyleInUse), this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor), this.timestamp = b;
                        for (var r = 0; r < this._jsPlumb.overlays.length; r++) {
                            var s = this._jsPlumb.overlays[r];
                            s.isVisible() && (this._jsPlumb.overlayPlacements[r] = s.draw(this.endpoint, this._jsPlumb.paintStyleInUse), s.paint(this._jsPlumb.overlayPlacements[r]))
                        }
                    }
                }
            }, this.repaint = this.paint;
            var t = !1;
            this.initDraggable = function () {
                if (!t && jsPlumb.isDragSupported(this.element)) {

                    var d = {id: null, element: null}, e = null, f = !1, m = null, n = a(d, h), q = function () {
                            e = this.connectorSelector();
                            var a = !0;
                            if (this.isEnabled() || (a = !1), null != e || this.isSource || (a = !1), this.isSource && this.isFull() && !this.dragAllowedWhenFull && (a = !1), null == e || e.isDetachable() || (a = !1), a === !1)
                                return h.stopDrag && h.stopDrag(this.canvas), n.stopDrag(), !1;
                            for (var q = 0; q < this.connections.length; q++) this.connections[q].setHover(!1);
                            this.addClass("endpointDrag"), h.setConnectionBeingDragged(!0), e && !this.isFull() && this.isSource && (e = null), h.updateOffset({elId: this.elementId}), p = this.makeInPlaceCopy(), p.referenceEndpoint = this, p.paint(), b(d, h);
                            var r = i(p.canvas), s = jsPlumbAdapter.getOffset(r, this._jsPlumb.instance),
                                t = i(this.canvas);
                            if (jsPlumbAdapter.setPosition(d.element, s), this.parentAnchor && (this.anchor = h.makeAnchor(this.parentAnchor, this.elementId, h)), h.setAttribute(this.canvas, "dragId", d.id), h.setAttribute(this.canvas, "elId", this.elementId), this._jsPlumb.floatingEndpoint = c(this.getPaintStyle(), this.anchor, this.endpoint, this.canvas, d.element, h, l), this.canvas.style.visibility = "hidden", null == e) this.anchor.locked = !0, this.setHover(!1, !1), e = k({
                                sourceEndpoint: this,
                                targetEndpoint: this._jsPlumb.floatingEndpoint,
                                source: this.endpointWillMoveTo || this.element,
                                target: d.element,
                                anchors: [this.anchor, this._jsPlumb.floatingEndpoint.anchor],
                                paintStyle: g.connectorStyle,
                                hoverPaintStyle: g.connectorHoverStyle,
                                connector: g.connector,
                                overlays: g.connectorOverlays,
                                type: this.connectionType,
                                cssClass: this.connectorClass,
                                hoverClass: this.connectorHoverClass
                            }), e.pending = !0, e.addClass(h.draggingClass), this._jsPlumb.floatingEndpoint.addClass(h.draggingClass), h.fire("connectionDrag", e); else {
                                f = !0, e.setHover(!1);
                                var u = e.endpoints[0].id == this.id ? 0 : 1;
                                e.floatingAnchorIndex = u, this.detachFromConnection(e, null, !0);
                                var v = h.getDragScope(t);
                                h.setAttribute(this.canvas, "originalScope", v);
                                var w = h.getDropScope(t);
                                h.setDragScope(t, w), h.fire("connectionDrag", e), 0 === u ? (m = [e.source, e.sourceId, t, v], e.source = d.element, e.sourceId = d.id) : (m = [e.target, e.targetId, t, v], e.target = d.element, e.targetId = d.id), e.endpoints[0 === u ? 1 : 0].anchor.locked = !0, e.suspendedEndpoint = e.endpoints[u], e.suspendedElement = e.endpoints[u].getElement(), e.suspendedElementId = e.endpoints[u].elementId, e.suspendedElementType = 0 === u ? "source" : "target", e.suspendedEndpoint.setHover(!1), this._jsPlumb.floatingEndpoint.referenceEndpoint = e.suspendedEndpoint, e.endpoints[u] = this._jsPlumb.floatingEndpoint, e.addClass(h.draggingClass), this._jsPlumb.floatingEndpoint.addClass(h.draggingClass)
                            }
                            o[d.id] = e, h.anchorManager.addFloatingConnection(d.id, e), j.addToList(g.endpointsByElement, d.id, this._jsPlumb.floatingEndpoint), h.currentlyDragging = !0
                        }.bind(this), r = g.dragOptions || {}, s = {}, u = jsPlumb.dragEvents.start,
                        v = jsPlumb.dragEvents.stop, w = jsPlumb.dragEvents.drag;
                    r = jsPlumb.extend(s, r), r.scope = r.scope || this.scope, r[u] = j.wrap(r[u], q, !1), r[w] = j.wrap(r[w], n.drag), r[v] = j.wrap(r[v], function () {
                        if (h.setConnectionBeingDragged(!1), e && null != e.endpoints) {

                            var a = h.getDropEvent(arguments),
                                b = null == e.floatingAnchorIndex ? 1 : e.floatingAnchorIndex;
                            e.endpoints[0 === b ? 1 : 0].anchor.locked = !1, e.removeClass(h.draggingClass), e.endpoints[b] == this._jsPlumb.floatingEndpoint && f && e.suspendedEndpoint && (0 === b ? (e.source = m[0], e.sourceId = m[1]) : (e.target = m[0], e.targetId = m[1]), h.setDragScope(m[2], m[3]), e.endpoints[b] = e.suspendedEndpoint, e.isReattach() || e._forceReattach || e._forceDetach || !e.endpoints[0 === b ? 1 : 0].detach(e, !1, !1, !0, a) ? (e.setHover(!1), e.floatingAnchorIndex = null, e._forceDetach = null, e._forceReattach = null, this._jsPlumb.floatingEndpoint.detachFromConnection(e), e.suspendedEndpoint.addConnection(e), h.repaint(m[1])) : e.suspendedEndpoint.detachFromConnection(e)), h.remove(d.element, !1), h.deleteObject({endpoint: p}), this.deleteAfterDragStop ? h.deleteObject({endpoint: this}) : this._jsPlumb && (this._jsPlumb.floatingEndpoint = null, this.canvas.style.visibility = "visible", this.anchor.locked = !1, this.paint({recalc: !1})), h.fire("connectionDragStop", e, a), h.currentlyDragging = !1, e = null
                        }
                    }.bind(this));
                    var x = i(this.canvas);
                    h.initDraggable(x, r, !0), t = !0
                }
            }, (this.isSource || this.isTarget) && this.initDraggable();
            var u = function (a, b, c, d) {
                if ((this.isTarget || b) && jsPlumb.isDropSupported(this.element)) {
                    var e = g.dropOptions || h.Defaults.DropOptions || jsPlumb.Defaults.DropOptions;
                    e = jsPlumb.extend({}, e), e.scope = e.scope || this.scope;
                    var f = jsPlumb.dragEvents.drop, i = jsPlumb.dragEvents.over, k = jsPlumb.dragEvents.out,
                        l = function () {
                            this.removeClass(h.endpointDropAllowedClass), this.removeClass(h.endpointDropForbiddenClass);
                            var a = h.getDropEvent(arguments), b = h.getDOMElement(h.getDragObject(arguments)),
                                c = h.getAttribute(b, "dragId"),
                                e = (h.getAttribute(b, "elId"), h.getAttribute(b, "originalScope")), f = o[c];
                            if (null != f) {
                                var g = f.suspendedEndpoint && (f.suspendedEndpoint.id == this.id || this.referenceEndpoint && f.suspendedEndpoint.id == this.referenceEndpoint.id);
                                if (g) return f._forceReattach = !0, void 0;
                                var i = null == f.floatingAnchorIndex ? 1 : f.floatingAnchorIndex;
                                e && h.setDragScope(b, e);
                                var j = null != d ? d.isEnabled() : !0;
                                if (this.isFull() && this.fire("maxConnections", {
                                    endpoint: this,
                                    connection: f,
                                    maxConnections: this._jsPlumb.maxConnections
                                }, a), !this.isFull() && (0 !== i || this.isSource) && (1 != i || this.isTarget) && j) {
                                    var k = !0;
                                    f.suspendedEndpoint && f.suspendedEndpoint.id != this.id && (0 === i ? (f.source = f.suspendedEndpoint.element, f.sourceId = f.suspendedEndpoint.elementId) : (f.target = f.suspendedEndpoint.element, f.targetId = f.suspendedEndpoint.elementId), f.isDetachAllowed(f) && f.endpoints[i].isDetachAllowed(f) && f.suspendedEndpoint.isDetachAllowed(f) && h.checkCondition("beforeDetach", f) || (k = !1)), 0 === i ? (f.source = this.element, f.sourceId = this.elementId) : (f.target = this.element, f.targetId = this.elementId);
                                    var l = function () {
                                        f.floatingAnchorIndex = null
                                    }, p = function () {
                                        f.pending = !1, f.endpoints[i].detachFromConnection(f), f.suspendedEndpoint && f.suspendedEndpoint.detachFromConnection(f), f.endpoints[i] = this, this.addConnection(f);
                                        var b = this.getParameters();
                                        for (var c in b) f.setParameter(c, b[c]);
                                        if (f.suspendedEndpoint) {
                                            var d = (f.suspendedEndpoint.getElement(), f.suspendedEndpoint.elementId);
                                            n({
                                                index: i,
                                                originalSourceId: 0 === i ? d : f.sourceId,
                                                newSourceId: 0 === i ? this.elementId : f.sourceId,
                                                originalTargetId: 1 == i ? d : f.targetId,
                                                newTargetId: 1 == i ? this.elementId : f.targetId,
                                                originalSourceEndpoint: 0 === i ? f.suspendedEndpoint : f.endpoints[0],
                                                newSourceEndpoint: 0 === i ? this : f.endpoints[0],
                                                originalTargetEndpoint: 1 == i ? f.suspendedEndpoint : f.endpoints[1],
                                                newTargetEndpoint: 1 == i ? this : f.endpoints[1],
                                                connection: f
                                            }, a)
                                        } else b.draggable && jsPlumb.initDraggable(this.element, dragOptions, !0, h);
                                        1 == i ? h.anchorManager.updateOtherEndpoint(f.sourceId, f.suspendedElementId, f.targetId, f) : h.anchorManager.sourceChanged(f.suspendedEndpoint.elementId, f.sourceId, f), m(f, null, a), l()
                                    }.bind(this), q = function () {
                                        f.suspendedEndpoint && (f.endpoints[i] = f.suspendedEndpoint, f.setHover(!1), f._forceDetach = !0, 0 === i ? (f.source = f.suspendedEndpoint.element, f.sourceId = f.suspendedEndpoint.elementId) : (f.target = f.suspendedEndpoint.element, f.targetId = f.suspendedEndpoint.elementId), f.suspendedEndpoint.addConnection(f), f.endpoints[0].repaint(), f.repaint(), h.repaint(f.sourceId), f._forceDetach = !1), l()
                                    };
                                    k = k && this.isDropAllowed(f.sourceId, f.targetId, f.scope, f, this), k ? p() : q()
                                }
                                h.currentlyDragging = !1
                            }
                        }.bind(this);
                    e[f] = j.wrap(e[f], l), e[i] = j.wrap(e[i], function () {
                        var a = jsPlumb.getDragObject(arguments),
                            b = h.getAttribute(jsPlumb.getDOMElement(a), "dragId"), c = o[b];
                        if (null != c) {
                            var d = null == c.floatingAnchorIndex ? 1 : c.floatingAnchorIndex,
                                e = this.isTarget && 0 !== c.floatingAnchorIndex || c.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == c.suspendedEndpoint.id;
                            if (e) {
                                var f = h.checkCondition("checkDropAllowed", {
                                    sourceEndpoint: c.endpoints[d],
                                    targetEndpoint: this,
                                    connection: c
                                });
                                this[(f ? "add" : "remove") + "Class"](h.endpointDropAllowedClass), this[(f ? "remove" : "add") + "Class"](h.endpointDropForbiddenClass), c.endpoints[d].anchor.over(this.anchor, this)
                            }
                        }
                    }.bind(this)), e[k] = j.wrap(e[k], function () {
                        var a = jsPlumb.getDragObject(arguments),
                            b = null == a ? null : h.getAttribute(jsPlumb.getDOMElement(a), "dragId"),
                            c = b ? o[b] : null;
                        if (null != c) {
                            var d = null == c.floatingAnchorIndex ? 1 : c.floatingAnchorIndex,
                                e = this.isTarget && 0 !== c.floatingAnchorIndex || c.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == c.suspendedEndpoint.id;
                            e && (this.removeClass(h.endpointDropAllowedClass), this.removeClass(h.endpointDropForbiddenClass), c.endpoints[d].anchor.out())
                        }
                    }.bind(this)), h.initDroppable(a, e, !0, c)
                }
            }.bind(this);
            return this.anchor.isFloating || u(i(this.canvas), !0, !(g._transient || this.anchor.isFloating), this), g.type && this.addType(g.type, g.data, h.isSuspendDrawing()), this
        }, jsPlumbUtil.extend(jsPlumb.Endpoint, OverlayCapableJsPlumbUIComponent, {
            getTypeDescriptor: function () {
                return "endpoint"
            }, isVisible: function () {
                return this._jsPlumb.visible
            }, setVisible: function (a, b, c) {
                if (this._jsPlumb.visible = a, this.canvas && (this.canvas.style.display = a ? "block" : "none"), this[a ? "showOverlays" : "hideOverlays"](), !b) for (var d = 0; d < this.connections.length; d++) if (this.connections[d].setVisible(a), !c) {
                    var e = this === this.connections[d].endpoints[0] ? 1 : 0;
                    1 == this.connections[d].endpoints[e].connections.length && this.connections[d].endpoints[e].setVisible(a, !0, !0)
                }
            }, getAttachedElements: function () {
                return this.connections
            }, applyType: function (a) {
                null != a.maxConnections && (this._jsPlumb.maxConnections = a.maxConnections), a.scope && (this.scope = a.scope), jsPlumb.extend(this, a, d), a.anchor && (this.anchor = this._jsPlumb.instance.makeAnchor(a.anchor))
            }, isEnabled: function () {
                return this._jsPlumb.enabled
            }, setEnabled: function (a) {
                this._jsPlumb.enabled = a
            }, cleanup: function () {
                jsPlumbAdapter.removeClass(this.element, this._jsPlumb.instance.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass), this.anchor = null, this.endpoint.cleanup(), this.endpoint.destroy(), this.endpoint = null;
                var a = jsPlumb.getElementObject(this.canvas);
                this._jsPlumb.instance.destroyDraggable(a), this._jsPlumb.instance.destroyDroppable(a)
            }, setHover: function (a) {
                this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && this.endpoint.setHover(a)
            }, isFull: function () {
                return !(this.isFloating() || this._jsPlumb.maxConnections < 1 || this.connections.length < this._jsPlumb.maxConnections)
            }, isFloating: function () {
                return null != this.anchor && this.anchor.isFloating
            }, getConnectionCost: function () {
                return this._jsPlumb.connectionCost
            }, setConnectionCost: function (a) {
                this._jsPlumb.connectionCost = a
            }, areConnectionsDirected: function () {
                return this._jsPlumb.connectionsDirected
            }, setConnectionsDirected: function (a) {
                this._jsPlumb.connectionsDirected = a
            }, setElementId: function (a) {
                this.elementId = a, this.anchor.elementId = a
            }, setReferenceElement: function (a) {
                this.element = jsPlumb.getDOMElement(a)
            }, setDragAllowedWhenFull: function (a) {
                this.dragAllowedWhenFull = a
            }, equals: function (a) {
                return this.anchor.equals(a.anchor)
            }, getUuid: function () {
                return this._jsPlumb.uuid
            }, computeAnchor: function (a) {
                return this.anchor.compute(a)
            }
        })
    }(), function () {
        "use strict";
        var a = function (a, b, c, d) {
            if (!a.Defaults.DoNotThrowErrors && null == jsPlumb.Connectors[b][c]) throw{msg: "jsPlumb: unknown connector type '" + c + "'"};
            return new jsPlumb.Connectors[b][c](d)
        }, b = function (a, b, c) {
            return a ? c.makeAnchor(a, b, c) : null
        };
        jsPlumb.Connection = function (a) {
            var b = (a.newConnection, a.newEndpoint), c = (jsPlumb.getElementObject, jsPlumbUtil);
            this.connector = null, this.idPrefix = "_jsplumb_c_", this.defaultLabelLocation = .5, this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"], this.previousConnection = a.previousConnection, this.source = jsPlumb.getDOMElement(a.source), this.target = jsPlumb.getDOMElement(a.target), a.sourceEndpoint && (this.source = a.sourceEndpoint.endpointWillMoveTo || a.sourceEndpoint.getElement()), a.targetEndpoint && (this.target = a.targetEndpoint.getElement()), OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.sourceId = this._jsPlumb.instance.getId(this.source), this.targetId = this._jsPlumb.instance.getId(this.target), this.scope = a.scope, this.endpoints = [], this.endpointStyles = [];
            var d = this._jsPlumb.instance;
            this._jsPlumb.visible = !0, this._jsPlumb.editable = a.editable === !0, this._jsPlumb.params = {
                cssClass: a.cssClass,
                container: a.container,
                "pointer-events": a["pointer-events"],
                editorParams: a.editorParams
            }, this._jsPlumb.lastPaintedAt = null, this.getDefaultType = function () {
                return {
                    parameters: {},
                    scope: null,
                    detachable: this._jsPlumb.instance.Defaults.ConnectionsDetachable,
                    rettach: this._jsPlumb.instance.Defaults.ReattachConnections,
                    paintStyle: this._jsPlumb.instance.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
                    connector: this._jsPlumb.instance.Defaults.Connector || jsPlumb.Defaults.Connector,
                    hoverPaintStyle: this._jsPlumb.instance.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle,
                    overlays: this._jsPlumb.instance.Defaults.ConnectorOverlays || jsPlumb.Defaults.ConnectorOverlays
                }
            }, this.makeEndpoint = function (c, e, f, g) {
                return f = f || this._jsPlumb.instance.getId(e), this.prepareEndpoint(d, b, this, g, c ? 0 : 1, a, e, f)
            };
            var e = this.makeEndpoint(!0, this.source, this.sourceId, a.sourceEndpoint),
                f = this.makeEndpoint(!1, this.target, this.targetId, a.targetEndpoint);
            e && c.addToList(a.endpointsByElement, this.sourceId, e), f && c.addToList(a.endpointsByElement, this.targetId, f), this.scope || (this.scope = this.endpoints[0].scope), null != a.deleteEndpointsOnDetach ? (this.endpoints[0]._deleteOnDetach = a.deleteEndpointsOnDetach, this.endpoints[1]._deleteOnDetach = a.deleteEndpointsOnDetach) : (this.endpoints[0]._doNotDeleteOnDetach || (this.endpoints[0]._deleteOnDetach = !0), this.endpoints[1]._doNotDeleteOnDetach || (this.endpoints[1]._deleteOnDetach = !0)), this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || a.connector || d.Defaults.Connector || jsPlumb.Defaults.Connector, !0), a.path && this.connector.setPath(a.path), this.setPaintStyle(this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || a.paintStyle || d.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle, !0), this.setHoverPaintStyle(this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || a.hoverPaintStyle || d.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle, !0), this._jsPlumb.paintStyleInUse = this.getPaintStyle();
            var g = d.getSuspendedAt();
            if (d.updateOffset({elId: this.sourceId, timestamp: g}), d.updateOffset({
                elId: this.targetId,
                timestamp: g
            }), !d.isSuspendDrawing()) {
                var h = d.getCachedData(this.sourceId), i = h.o, j = h.s, k = d.getCachedData(this.targetId), l = k.o,
                    m = k.s, n = g || d.timestamp(), o = this.endpoints[0].anchor.compute({
                        xy: [i.left, i.top],
                        wh: j,
                        element: this.endpoints[0],
                        elementId: this.endpoints[0].elementId,
                        txy: [l.left, l.top],
                        twh: m,
                        tElement: this.endpoints[1],
                        timestamp: n
                    });
                this.endpoints[0].paint({
                    anchorLoc: o,
                    timestamp: n
                }), o = this.endpoints[1].anchor.compute({
                    xy: [l.left, l.top],
                    wh: m,
                    element: this.endpoints[1],
                    elementId: this.endpoints[1].elementId,
                    txy: [i.left, i.top],
                    twh: j,
                    tElement: this.endpoints[0],
                    timestamp: n
                }), this.endpoints[1].paint({anchorLoc: o, timestamp: n})
            }
            this._jsPlumb.detachable = d.Defaults.ConnectionsDetachable, a.detachable === !1 && (this._jsPlumb.detachable = !1), this.endpoints[0].connectionsDetachable === !1 && (this._jsPlumb.detachable = !1), this.endpoints[1].connectionsDetachable === !1 && (this._jsPlumb.detachable = !1), this._jsPlumb.reattach = a.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || d.Defaults.ReattachConnections, this._jsPlumb.cost = a.cost || this.endpoints[0].getConnectionCost(), this._jsPlumb.directed = a.directed, null == a.directed && (this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected());
            var p = jsPlumb.extend({}, this.endpoints[1].getParameters());
            jsPlumb.extend(p, this.endpoints[0].getParameters()), jsPlumb.extend(p, this.getParameters()), this.setParameters(p);
            var q = [a.type, this.endpoints[0].connectionType, this.endpoints[1].connectionType].join(" ");
            /[^\s]/.test(q) && this.addType(q, a.data, !0)
        }, jsPlumbUtil.extend(jsPlumb.Connection, OverlayCapableJsPlumbUIComponent, {
            applyType: function (a, b) {
                null != a.detachable && this.setDetachable(a.detachable), null != a.reattach && this.setReattach(a.reattach), a.scope && (this.scope = a.scope), this.setConnector(a.connector, b)
            }, getTypeDescriptor: function () {
                return "connection"
            }, getAttachedElements: function () {
                return this.endpoints
            }, addClass: function (a, b) {
                b && (this.endpoints[0].addClass(a), this.endpoints[1].addClass(a), this.suspendedEndpoint && this.suspendedEndpoint.addClass(a)), this.connector && this.connector.addClass(a)
            }, removeClass: function (a, b) {
                b && (this.endpoints[0].removeClass(a), this.endpoints[1].removeClass(a), this.suspendedEndpoint && this.suspendedEndpoint.removeClass(a)), this.connector && this.connector.removeClass(a)
            }, isVisible: function () {
                return this._jsPlumb.visible
            }, setVisible: function (a) {
                this._jsPlumb.visible = a, this.connector && this.connector.setVisible(a), this.repaint()
            }, cleanup: function () {
                this.endpoints = null, this.source = null, this.target = null, null != this.connector && (this.connector.cleanup(), this.connector.destroy()), this.connector = null
            }, isDetachable: function () {
                return this._jsPlumb.detachable === !0
            }, setDetachable: function (a) {
                this._jsPlumb.detachable = a === !0
            }, isReattach: function () {
                return this._jsPlumb.reattach === !0
            }, setReattach: function (a) {
                this._jsPlumb.reattach = a === !0
            }, setHover: function (a) {
                this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && (this.connector.setHover(a), jsPlumbAdapter[a ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass), jsPlumbAdapter[a ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass))
            }, getCost: function () {
                return this._jsPlumb.cost
            }, setCost: function (a) {
                this._jsPlumb.cost = a
            }, isDirected: function () {
                return this._jsPlumb.directed === !0
            }, getConnector: function () {
                return this.connector
            }, setConnector: function (b, c) {
                var d = jsPlumbUtil;
                null != this.connector && (this.connector.cleanup(), this.connector.destroy());
                var e = {
                    _jsPlumb: this._jsPlumb.instance,
                    cssClass: this._jsPlumb.params.cssClass,
                    container: this._jsPlumb.params.container,
                    "pointer-events": this._jsPlumb.params["pointer-events"]
                }, f = this._jsPlumb.instance.getRenderMode();
                d.isString(b) ? this.connector = a(this._jsPlumb.instance, f, b, e) : d.isArray(b) && (this.connector = 1 == b.length ? a(this._jsPlumb.instance, f, b[0], e) : a(this._jsPlumb.instance, f, b[0], d.merge(b[1], e))), this.bindListeners(this.connector, this, function (a) {
                    this.setHover(a, !1)
                }.bind(this)), this.canvas = this.connector.canvas, this.bgCanvas = this.connector.bgCanvas, this._jsPlumb.editable && null != jsPlumb.ConnectorEditors && jsPlumb.ConnectorEditors[this.connector.type] && this.connector.isEditable() ? new jsPlumb.ConnectorEditors[this.connector.type]({
                    connector: this.connector,
                    connection: this,
                    params: this._jsPlumb.params.editorParams || {}
                }) : this._jsPlumb.editable = !1, c || this.repaint()
            }, paint: function (a) {
                if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                    a = a || {};
                    var b = (a.elId, a.ui), c = a.recalc, d = a.timestamp, e = !1,
                        f = e ? this.sourceId : this.targetId, g = e ? this.targetId : this.sourceId, h = e ? 0 : 1,
                        i = e ? 1 : 0;
                    if (null == d || d != this._jsPlumb.lastPaintedAt) {
                        var j = this._jsPlumb.instance.updateOffset({elId: g, offset: b, recalc: c, timestamp: d}).o,
                            k = this._jsPlumb.instance.updateOffset({elId: f, timestamp: d}).o, l = this.endpoints[i],
                            m = this.endpoints[h];
                        a.clearEdits && (this._jsPlumb.overlayPositions = null, l.anchor.clearUserDefinedLocation(), m.anchor.clearUserDefinedLocation(), this.connector.setEdited(!1));
                        var n = l.anchor.getCurrentLocation({
                            xy: [j.left, j.top],
                            wh: [j.width, j.height],
                            element: l,
                            timestamp: d
                        }), o = m.anchor.getCurrentLocation({
                            xy: [k.left, k.top],
                            wh: [k.width, k.height],
                            element: m,
                            timestamp: d
                        });
                        this.connector.resetBounds(), this.connector.compute({
                            sourcePos: n,
                            targetPos: o,
                            sourceEndpoint: this.endpoints[i],
                            targetEndpoint: this.endpoints[h],
                            lineWidth: this._jsPlumb.paintStyleInUse.lineWidth,
                            sourceInfo: j,
                            targetInfo: k,
                            clearEdits: a.clearEdits === !0
                        });
                        for (var p = {
                            minX: 1 / 0,
                            minY: 1 / 0,
                            maxX: -1 / 0,
                            maxY: -1 / 0
                        }, q = 0; q < this._jsPlumb.overlays.length; q++) {
                            var r = this._jsPlumb.overlays[q];
                            r.isVisible() && (this._jsPlumb.overlayPlacements[q] = r.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(r)), p.minX = Math.min(p.minX, this._jsPlumb.overlayPlacements[q].minX), p.maxX = Math.max(p.maxX, this._jsPlumb.overlayPlacements[q].maxX), p.minY = Math.min(p.minY, this._jsPlumb.overlayPlacements[q].minY), p.maxY = Math.max(p.maxY, this._jsPlumb.overlayPlacements[q].maxY))
                        }
                        var s = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 1) / 2,
                            t = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 0), u = {
                                xmin: Math.min(this.connector.bounds.minX - (s + t), p.minX),
                                ymin: Math.min(this.connector.bounds.minY - (s + t), p.minY),
                                xmax: Math.max(this.connector.bounds.maxX + (s + t), p.maxX),
                                ymax: Math.max(this.connector.bounds.maxY + (s + t), p.maxY)
                            };
                        this.connector.paint(this._jsPlumb.paintStyleInUse, null, u);
                        for (var v = 0; v < this._jsPlumb.overlays.length; v++) {
                            var w = this._jsPlumb.overlays[v];
                            w.isVisible() && w.paint(this._jsPlumb.overlayPlacements[v], u)
                        }
                    }
                    this._jsPlumb.lastPaintedAt = d
                }
            }, repaint: function (a) {
                a = a || {}, this.paint({
                    elId: this.sourceId,
                    recalc: !(a.recalc === !1),
                    timestamp: a.timestamp,
                    clearEdits: a.clearEdits
                })
            }, prepareEndpoint: function (a, c, d, e, f, g, h, i) {
                var j;
                if (e) d.endpoints[f] = e, e.addConnection(d); else {
                    g.endpoints || (g.endpoints = [null, null]);
                    var k = g.endpoints[f] || g.endpoint || a.Defaults.Endpoints[f] || jsPlumb.Defaults.Endpoints[f] || a.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                    g.endpointStyles || (g.endpointStyles = [null, null]), g.endpointHoverStyles || (g.endpointHoverStyles = [null, null]);
                    var l = g.endpointStyles[f] || g.endpointStyle || a.Defaults.EndpointStyles[f] || jsPlumb.Defaults.EndpointStyles[f] || a.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                    null == l.fillStyle && null != g.paintStyle && (l.fillStyle = g.paintStyle.strokeStyle), null == l.outlineColor && null != g.paintStyle && (l.outlineColor = g.paintStyle.outlineColor), null == l.outlineWidth && null != g.paintStyle && (l.outlineWidth = g.paintStyle.outlineWidth);
                    var m = g.endpointHoverStyles[f] || g.endpointHoverStyle || a.Defaults.EndpointHoverStyles[f] || jsPlumb.Defaults.EndpointHoverStyles[f] || a.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                    null != g.hoverPaintStyle && (null == m && (m = {}), null == m.fillStyle && (m.fillStyle = g.hoverPaintStyle.strokeStyle));
                    var n = g.anchors ? g.anchors[f] : g.anchor ? g.anchor : b(a.Defaults.Anchors[f], i, a) || b(jsPlumb.Defaults.Anchors[f], i, a) || b(a.Defaults.Anchor, i, a) || b(jsPlumb.Defaults.Anchor, i, a),
                        o = g.uuids ? g.uuids[f] : null;
                    j = c({
                        paintStyle: l,
                        hoverPaintStyle: m,
                        endpoint: k,
                        connections: [d],
                        uuid: o,
                        anchor: n,
                        source: h,
                        scope: g.scope,
                        reattach: g.reattach || a.Defaults.ReattachConnections,
                        detachable: g.detachable || a.Defaults.ConnectionsDetachable
                    }), d.endpoints[f] = j, g.drawEndpoints === !1 && j.setVisible(!1, !0, !0)
                }
                return j
            }
        })
    }(), function () {
        jsPlumb.AnchorManager = function (a) {
            var b = {}, c = {}, d = {}, e = {}, f = {},
                g = {HORIZONTAL: "horizontal", VERTICAL: "vertical", DIAGONAL: "diagonal", IDENTITY: "identity"},
                h = {}, i = this, j = {}, k = a.jsPlumbInstance, l = {}, m = function (a, b, c, d, e, f) {
                    if (a === b) return {orientation: g.IDENTITY, a: ["top", "top"]};
                    var h = Math.atan2(d.centery - c.centery, d.centerx - c.centerx),
                        i = Math.atan2(c.centery - d.centery, c.centerx - d.centerx),
                        j = c.left <= d.left && c.right >= d.left || c.left <= d.right && c.right >= d.right || c.left <= d.left && c.right >= d.right || d.left <= c.left && d.right >= c.right,
                        k = c.top <= d.top && c.bottom >= d.top || c.top <= d.bottom && c.bottom >= d.bottom || c.top <= d.top && c.bottom >= d.bottom || d.top <= c.top && d.bottom >= c.bottom,
                        l = function (a) {
                            return [e.isContinuous ? e.verifyEdge(a[0]) : a[0], f.isContinuous ? f.verifyEdge(a[1]) : a[1]]
                        }, m = {orientation: g.DIAGONAL, theta: h, theta2: i};
                    return j || k ? j ? (m.orientation = g.HORIZONTAL, m.a = c.top < d.top ? ["bottom", "top"] : ["top", "bottom"]) : (m.orientation = g.VERTICAL, m.a = c.left < d.left ? ["right", "left"] : ["left", "right"]) : d.left > c.left && d.top > c.top ? m.a = ["right", "top"] : d.left > c.left && c.top > d.top ? m.a = ["top", "left"] : d.left < c.left && d.top < c.top ? m.a = ["top", "right"] : d.left < c.left && d.top > c.top && (m.a = ["left", "top"]), m.a = l(m.a), m
                }, n = function (a, b, c, d, e, f, g) {
                    for (var h = [], i = b[e ? 0 : 1] / (d.length + 1), j = 0; j < d.length; j++) {
                        var k = (j + 1) * i, l = f * b[e ? 1 : 0];
                        g && (k = b[e ? 0 : 1] - k);
                        var m = e ? k : l, n = c[0] + m, o = m / b[0], p = e ? l : k, q = c[1] + p, r = p / b[1];
                        h.push([n, q, o, r, d[j][1], d[j][2]])
                    }
                    return h
                }, o = function (a) {
                    return function (b, c) {
                        var d = !0;
                        return d = a ? b[0][0] < c[0][0] : b[0][0] > c[0][0], d === !1 ? -1 : 1
                    }
                }, p = function (a, b) {
                    var c = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0],
                        d = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
                    return c > d ? 1 : a[0][1] > b[0][1] ? 1 : -1
                }, q = {
                    top: function (a, b) {
                        return a[0] > b[0] ? 1 : -1
                    }, right: o(!0), bottom: o(!0), left: p
                }, r = function (a, b) {
                    return a.sort(b)
                }, s = function (a, b) {
                    var c = k.getCachedData(a), e = c.s, g = c.o, h = function (b, c, e, g, h, i, j) {
                        if (g.length > 0) for (var k = r(g, q[b]), l = "right" === b || "top" === b, m = n(b, c, e, k, h, i, l), o = function (a, b) {
                            d[a.id] = [b[0], b[1], b[2], b[3]], f[a.id] = j
                        }, p = 0; p < m.length; p++) {
                            var s = m[p][4], t = s.endpoints[0].elementId === a, u = s.endpoints[1].elementId === a;
                            t ? o(s.endpoints[0], m[p]) : u && o(s.endpoints[1], m[p])
                        }
                    };
                    h("bottom", e, [g.left, g.top], b.bottom, !0, 1, [0, 1]), h("top", e, [g.left, g.top], b.top, !0, 0, [0, -1]), h("left", e, [g.left, g.top], b.left, !1, 0, [-1, 0]), h("right", e, [g.left, g.top], b.right, !1, 1, [1, 0])
                };
            this.reset = function () {
                b = {}, h = {}, j = {}
            }, this.addFloatingConnection = function (a, b) {
                l[a] = b
            }, this.removeFloatingConnection = function (a) {
                delete l[a]
            }, this.newConnection = function (a) {
                var b = a.sourceId, c = a.targetId, d = a.endpoints, e = !0, f = function (f, g, i, j, k) {
                    b == c && i.isContinuous && (a._jsPlumb.instance.removeElement(d[1].canvas), e = !1), jsPlumbUtil.addToList(h, j, [k, g, i.constructor == jsPlumb.DynamicAnchor])
                };
                f(0, d[0], d[0].anchor, c, a), e && f(1, d[1], d[1].anchor, b, a)
            };
            var t = function (a) {
                !function (a, b) {
                    if (a) {
                        var c = function (a) {
                            return a[4] == b
                        };
                        jsPlumbUtil.removeWithFunction(a.top, c), jsPlumbUtil.removeWithFunction(a.left, c), jsPlumbUtil.removeWithFunction(a.bottom, c), jsPlumbUtil.removeWithFunction(a.right, c)
                    }
                }(j[a.elementId], a.id)
            };
            this.connectionDetached = function (a) {
                var b = a.connection || a, c = a.sourceId, d = a.targetId, e = b.endpoints,
                    f = function (a, b, c, d, e) {
                        null != c && c.constructor == jsPlumb.FloatingAnchor || jsPlumbUtil.removeWithFunction(h[d], function (a) {
                            return a[0].id == e.id
                        })
                    };
                f(1, e[1], e[1].anchor, c, b), f(0, e[0], e[0].anchor, d, b), t(b.endpoints[0]), t(b.endpoints[1]), i.redraw(b.sourceId), i.redraw(b.targetId)
            }, this.add = function (a, c) {
                jsPlumbUtil.addToList(b, c, a)
            }, this.changeId = function (a, c) {
                h[c] = h[a], b[c] = b[a], delete h[a], delete b[a]
            }, this.getConnectionsFor = function (a) {
                return h[a] || []
            }, this.getEndpointsFor = function (a) {
                return b[a] || []
            }, this.deleteEndpoint = function (a) {
                jsPlumbUtil.removeWithFunction(b[a.elementId], function (b) {
                    return b.id == a.id
                }), t(a)
            }, this.clearFor = function (a) {
                delete b[a], b[a] = []
            };
            var u = function (b, c, d, e, f, g, h, i, j, k, l, m) {
                var n = -1, o = -1, p = e.endpoints[h], q = p.id, r = [1, 0][h], s = [[c, d], e, f, g, q], t = b[j],
                    u = p._continuousAnchorEdge ? b[p._continuousAnchorEdge] : null;
                if (u) {
                    var v = jsPlumbUtil.findWithFunction(u, function (a) {
                        return a[4] == q
                    });
                    if (-1 != v) {
                        u.splice(v, 1);
                        for (var w = 0; w < u.length; w++) jsPlumbUtil.addWithFunction(l, u[w][1], function (a) {
                            return a.id == u[w][1].id
                        }), jsPlumbUtil.addWithFunction(m, u[w][1].endpoints[h], function (a) {
                            return a.id == u[w][1].endpoints[h].id
                        }), jsPlumbUtil.addWithFunction(m, u[w][1].endpoints[r], function (a) {
                            return a.id == u[w][1].endpoints[r].id
                        })
                    }
                }
                for (w = 0; w < t.length; w++) 1 == a.idx && t[w][3] === g && -1 == o && (o = w), jsPlumbUtil.addWithFunction(l, t[w][1], function (a) {
                    return a.id == t[w][1].id
                }), jsPlumbUtil.addWithFunction(m, t[w][1].endpoints[h], function (a) {
                    return a.id == t[w][1].endpoints[h].id
                }), jsPlumbUtil.addWithFunction(m, t[w][1].endpoints[r], function (a) {
                    return a.id == t[w][1].endpoints[r].id
                });
                if (-1 != n) t[n] = s; else {
                    var x = i ? -1 != o ? o : 0 : t.length;
                    t.splice(x, 0, s)
                }
                p._continuousAnchorEdge = j
            };
            this.updateOtherEndpoint = function (a, b, c, d) {
                var e = jsPlumbUtil.findWithFunction(h[a], function (a) {
                    return a[0].id === d.id
                }), f = jsPlumbUtil.findWithFunction(h[b], function (a) {
                    return a[0].id === d.id
                });
                -1 != e && (h[a][e][0] = d, h[a][e][1] = d.endpoints[1], h[a][e][2] = d.endpoints[1].anchor.constructor == jsPlumb.DynamicAnchor), f > -1 && (h[b].splice(f, 1), jsPlumbUtil.addToList(h, c, [d, d.endpoints[0], d.endpoints[0].anchor.constructor == jsPlumb.DynamicAnchor]))
            }, this.sourceChanged = function (a, b, c) {
                if (a !== b) {
                    jsPlumbUtil.removeWithFunction(h[a], function (a) {
                        return a[0].id === c.id
                    });
                    var d = jsPlumbUtil.findWithFunction(h[c.targetId], function (a) {
                        return a[0].id === c.id
                    });
                    d > -1 && (h[c.targetId][d][0] = c, h[c.targetId][d][1] = c.endpoints[0], h[c.targetId][d][2] = c.endpoints[0].anchor.constructor == jsPlumb.DynamicAnchor), jsPlumbUtil.addToList(h, b, [c, c.endpoints[1], c.endpoints[1].anchor.constructor == jsPlumb.DynamicAnchor])
                }
            }, this.rehomeEndpoint = function (a, c, d) {
                var e = b[c] || [], f = k.getId(d);
                if (f !== c) {
                    var g = jsPlumbUtil.indexOf(e, a);
                    if (g > -1) {
                        var h = e.splice(g, 1)[0];
                        i.add(h, f)
                    }
                }
                for (var j = 0; j < a.connections.length; j++) a.connections[j].sourceId == c ? (a.connections[j].sourceId = a.elementId, a.connections[j].source = a.element, i.sourceChanged(c, a.elementId, a.connections[j])) : a.connections[j].targetId == c && (a.connections[j].targetId = a.elementId, a.connections[j].target = a.element, i.updateOtherEndpoint(a.connections[j].sourceId, c, a.elementId, a.connections[j]))
            }, this.redraw = function (a, c, d, e, f, g) {
                if (!k.isSuspendDrawing()) {
                    var i = b[a] || [], n = h[a] || [], o = [], p = [], q = [];
                    d = d || k.timestamp(), e = e || {left: 0, top: 0}, c && (c = {
                        left: c.left + e.left,
                        top: c.top + e.top
                    });
                    for (var r = k.updateOffset({
                        elId: a,
                        offset: c,
                        recalc: !1,
                        timestamp: d
                    }), t = {}, v = 0; v < n.length; v++) {
                        var w = n[v][0], x = w.sourceId, y = w.targetId, z = w.endpoints[0].anchor.isContinuous,
                            A = w.endpoints[1].anchor.isContinuous;
                        if (z || A) {
                            var B = x + "_" + y, C = t[B], D = w.sourceId == a ? 1 : 0;
                            z && !j[x] && (j[x] = {
                                top: [],
                                right: [],
                                bottom: [],
                                left: []
                            }), A && !j[y] && (j[y] = {
                                top: [],
                                right: [],
                                bottom: [],
                                left: []
                            }), a != y && k.updateOffset({elId: y, timestamp: d}), a != x && k.updateOffset({
                                elId: x,
                                timestamp: d
                            });
                            var E = k.getCachedData(y), F = k.getCachedData(x);
                            y == x && (z || A) ? u(j[x], -Math.PI / 2, 0, w, !1, y, 0, !1, "top", x, o, p) : (C || (C = m(x, y, F.o, E.o, w.endpoints[0].anchor, w.endpoints[1].anchor), t[B] = C), z && u(j[x], C.theta, 0, w, !1, y, 0, !1, C.a[0], x, o, p), A && u(j[y], C.theta2, -1, w, !0, x, 1, !0, C.a[1], y, o, p)), z && jsPlumbUtil.addWithFunction(q, x, function (a) {
                                return a === x
                            }), A && jsPlumbUtil.addWithFunction(q, y, function (a) {
                                return a === y
                            }), jsPlumbUtil.addWithFunction(o, w, function (a) {
                                return a.id == w.id
                            }), (z && 0 === D || A && 1 === D) && jsPlumbUtil.addWithFunction(p, w.endpoints[D], function (a) {
                                return a.id == w.endpoints[D].id
                            })
                        }
                    }
                    for (v = 0; v < i.length; v++) 0 === i[v].connections.length && i[v].anchor.isContinuous && (j[a] || (j[a] = {
                        top: [],
                        right: [],
                        bottom: [],
                        left: []
                    }), u(j[a], -Math.PI / 2, 0, {
                        endpoints: [i[v], i[v]], paint: function () {
                        }
                    }, !1, a, 0, !1, "top", a, o, p), jsPlumbUtil.addWithFunction(q, a, function (b) {
                        return b === a
                    }));
                    for (v = 0; v < q.length; v++) s(q[v], j[q[v]]);
                    for (v = 0; v < i.length; v++) i[v].paint({
                        timestamp: d,
                        offset: r,
                        dimensions: r.s,
                        recalc: g !== !0
                    });
                    for (v = 0; v < p.length; v++) {
                        var G = k.getCachedData(p[v].elementId);
                        p[v].paint({timestamp: d, offset: G, dimensions: G.s})
                    }
                    for (v = 0; v < n.length; v++) {
                        var H = n[v][1];
                        if (H.anchor.constructor == jsPlumb.DynamicAnchor) {
                            H.paint({
                                elementWithPrecedence: a,
                                timestamp: d
                            }), jsPlumbUtil.addWithFunction(o, n[v][0], function (a) {
                                return a.id == n[v][0].id
                            });
                            for (var I = 0; I < H.connections.length; I++) H.connections[I] !== n[v][0] && jsPlumbUtil.addWithFunction(o, H.connections[I], function (a) {
                                return a.id == H.connections[I].id
                            })
                        } else H.anchor.constructor == jsPlumb.Anchor && jsPlumbUtil.addWithFunction(o, n[v][0], function (a) {
                            return a.id == n[v][0].id
                        })
                    }
                    var J = l[a];
                    for (J && J.paint({timestamp: d, recalc: !1, elId: a}), v = 0; v < o.length; v++) {
                        var K = d;
                        o[v].paint({elId: a, timestamp: K, recalc: !1, clearEdits: f})
                    }
                }
            };
            var v = function (a) {
                jsPlumbUtil.EventGenerator.apply(this), this.type = "Continuous", this.isDynamic = !0, this.isContinuous = !0;
                for (var b = a.faces || ["top", "right", "bottom", "left"], c = !(a.clockwise === !1), g = {}, h = {
                    top: "bottom",
                    right: "left",
                    left: "right",
                    bottom: "top"
                }, i = {top: "right", right: "bottom", left: "top", bottom: "left"}, j = {
                    top: "left",
                    right: "top",
                    left: "bottom",
                    bottom: "right"
                }, k = c ? i : j, l = c ? j : i, m = a.cssClass || "", n = 0; n < b.length; n++) g[b[n]] = !0;
                this.verifyEdge = function (a) {
                    return g[a] ? a : g[h[a]] ? h[a] : g[k[a]] ? k[a] : g[l[a]] ? l[a] : a
                }, this.compute = function (a) {
                    return e[a.element.id] || d[a.element.id] || [0, 0]
                }, this.getCurrentLocation = function (a) {
                    return e[a.element.id] || d[a.element.id] || [0, 0]
                }, this.getOrientation = function (a) {
                    return f[a.id] || [0, 0]
                }, this.clearUserDefinedLocation = function () {
                    delete e[a.elementId]
                }, this.setUserDefinedLocation = function (b) {
                    e[a.elementId] = b
                }, this.getCssClass = function () {
                    return m
                }, this.setCssClass = function (a) {
                    m = a
                }
            };
            k.continuousAnchorFactory = {
                get: function (a) {
                    var b = c[a.elementId];
                    return b || (b = new v(a), c[a.elementId] = b), b
                }, clear: function (a) {
                    delete c[a]
                }
            }
        }, jsPlumb.Anchor = function (a) {
            this.x = a.x || 0, this.y = a.y || 0, this.elementId = a.elementId, this.cssClass = a.cssClass || "", this.userDefinedLocation = null, this.orientation = a.orientation || [0, 0], jsPlumbUtil.EventGenerator.apply(this), a.jsPlumbInstance, this.lastReturnValue = null, this.offsets = a.offsets || [0, 0], this.timestamp = null, this.compute = function (a) {
                var b = a.xy, c = a.wh, d = (a.element, a.timestamp);
                return a.clearUserDefinedLocation && (this.userDefinedLocation = null), d && d === self.timestamp ? this.lastReturnValue : (this.lastReturnValue = null != this.userDefinedLocation ? this.userDefinedLocation : [b[0] + this.x * c[0] + this.offsets[0], b[1] + this.y * c[1] + this.offsets[1]], this.timestamp = d, this.lastReturnValue)
            }, this.getCurrentLocation = function (a) {
                return null == this.lastReturnValue || null != a.timestamp && this.timestamp != a.timestamp ? this.compute(a) : this.lastReturnValue
            }
        }, jsPlumbUtil.extend(jsPlumb.Anchor, jsPlumbUtil.EventGenerator, {
            equals: function (a) {
                if (!a) return !1;
                var b = a.getOrientation(), c = this.getOrientation();
                return this.x == a.x && this.y == a.y && this.offsets[0] == a.offsets[0] && this.offsets[1] == a.offsets[1] && c[0] == b[0] && c[1] == b[1]
            }, getUserDefinedLocation: function () {
                return this.userDefinedLocation
            }, setUserDefinedLocation: function (a) {
                this.userDefinedLocation = a
            }, clearUserDefinedLocation: function () {
                this.userDefinedLocation = null
            }, getOrientation: function () {
                return this.orientation
            }, getCssClass: function () {
                return this.cssClass
            }
        }), jsPlumb.FloatingAnchor = function (a) {
            jsPlumb.Anchor.apply(this, arguments);
            var b = a.reference, c = (a.jsPlumbInstance, a.referenceCanvas), d = jsPlumb.getSize(c), e = 0, f = 0,
                g = null, h = null;
            this.orientation = null, this.x = 0, this.y = 0, this.isFloating = !0, this.compute = function (a) {
                var b = a.xy, c = (a.element, [b[0] + d[0] / 2, b[1] + d[1] / 2]);
                return h = c, c
            }, this.getOrientation = function (a) {
                if (g) return g;
                var c = b.getOrientation(a);
                return [-1 * Math.abs(c[0]) * e, -1 * Math.abs(c[1]) * f]
            }, this.over = function (a, b) {
                g = a.getOrientation(b)
            }, this.out = function () {
                g = null
            }, this.getCurrentLocation = function (a) {
                return null == h ? this.compute(a) : h
            }
        }, jsPlumbUtil.extend(jsPlumb.FloatingAnchor, jsPlumb.Anchor);
        var a = function (a, b, c) {
            return a.constructor == jsPlumb.Anchor ? a : b.makeAnchor(a, c, b)
        };
        jsPlumb.DynamicAnchor = function (b) {
            jsPlumb.Anchor.apply(this, arguments), this.isSelective = !0, this.isDynamic = !0, this.anchors = [], this.elementId = b.elementId, this.jsPlumbInstance = b.jsPlumbInstance;
            for (var c = 0; c < b.anchors.length; c++) this.anchors[c] = a(b.anchors[c], this.jsPlumbInstance, this.elementId);
            this.addAnchor = function (b) {
                this.anchors.push(a(b, this.jsPlumbInstance, this.elementId))
            }, this.getAnchors = function () {
                return this.anchors
            }, this.locked = !1;
            var d = this.anchors.length > 0 ? this.anchors[0] : null, e = (this.anchors.length > 0 ? 0 : -1, d),
                f = this, g = function (a, b, c, d, e) {
                    var f = d[0] + a.x * e[0], g = d[1] + a.y * e[1], h = d[0] + e[0] / 2, i = d[1] + e[1] / 2;
                    return Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - g, 2)) + Math.sqrt(Math.pow(h - f, 2) + Math.pow(i - g, 2))
                }, h = b.selector || function (a, b, c, d, e) {
                    for (var f = c[0] + d[0] / 2, h = c[1] + d[1] / 2, i = -1, j = 1 / 0, k = 0; k < e.length; k++) {
                        var l = g(e[k], f, h, a, b);
                        j > l && (i = k + 0, j = l)
                    }
                    return e[i]
                };
            this.compute = function (a) {
                var b = a.xy, c = a.wh, g = a.timestamp, i = a.txy, j = a.twh;
                a.clearUserDefinedLocation && (userDefinedLocation = null), this.timestamp = g;
                var k = f.getUserDefinedLocation();
                return null != k ? k : this.locked || null == i || null == j ? d.compute(a) : (a.timestamp = null, d = h(b, c, i, j, this.anchors), this.x = d.x, this.y = d.y, d != e && this.fire("anchorChanged", d), e = d, d.compute(a))
            }, this.getCurrentLocation = function (a) {
                return this.getUserDefinedLocation() || (null != d ? d.getCurrentLocation(a) : null)
            }, this.getOrientation = function (a) {
                return null != d ? d.getOrientation(a) : [0, 0]
            }, this.over = function (a, b) {
                null != d && d.over(a, b)
            }, this.out = function () {
                null != d && d.out()
            }, this.getCssClass = function () {
                return d && d.getCssClass() || ""
            }
        }, jsPlumbUtil.extend(jsPlumb.DynamicAnchor, jsPlumb.Anchor);
        var b = function (a, b, c, d, e, f) {
            jsPlumb.Anchors[e] = function (g) {
                var h = g.jsPlumbInstance.makeAnchor([a, b, c, d, 0, 0], g.elementId, g.jsPlumbInstance);
                return h.type = e, f && f(h, g), h
            }
        };
        b(.5, 0, 0, -1, "TopCenter"), b(.5, 1, 0, 1, "BottomCenter"), b(0, .5, -1, 0, "LeftMiddle"), b(1, .5, 1, 0, "RightMiddle"), b(.5, 0, 0, -1, "Top"), b(.5, 1, 0, 1, "Bottom"), b(0, .5, -1, 0, "Left"), b(1, .5, 1, 0, "Right"), b(.5, .5, 0, 0, "Center"), b(1, 0, 0, -1, "TopRight"), b(1, 1, 0, 1, "BottomRight"), b(0, 0, 0, -1, "TopLeft"), b(0, 1, 0, 1, "BottomLeft"), jsPlumb.Defaults.DynamicAnchors = function (a) {
            return a.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], a.elementId, a.jsPlumbInstance)
        }, jsPlumb.Anchors.AutoDefault = function (a) {
            var b = a.jsPlumbInstance.makeDynamicAnchor(jsPlumb.Defaults.DynamicAnchors(a));
            return b.type = "AutoDefault", b
        };
        var c = function (a, b) {
            jsPlumb.Anchors[a] = function (c) {
                var d = c.jsPlumbInstance.makeAnchor(["Continuous", {faces: b}], c.elementId, c.jsPlumbInstance);
                return d.type = a, d
            }
        };
        jsPlumb.Anchors.Continuous = function (a) {
            return a.jsPlumbInstance.continuousAnchorFactory.get(a)
        }, c("ContinuousLeft", ["left"]), c("ContinuousTop", ["top"]), c("ContinuousBottom", ["bottom"]), c("ContinuousRight", ["right"]), b(0, 0, 0, 0, "Assign", function (a, b) {
            var c = b.position || "Fixed";
            a.positionFinder = c.constructor == String ? b.jsPlumbInstance.AnchorPositionFinders[c] : c, a.constructorParams = b
        }), jsPlumbInstance.prototype.AnchorPositionFinders = {
            Fixed: function (a, b, c) {
                return [(a.left - b.left) / c[0], (a.top - b.top) / c[1]]
            }, Grid: function (a, b, c, d) {
                var e = a.left - b.left, f = a.top - b.top, g = c[0] / d.grid[0], h = c[1] / d.grid[1],
                    i = Math.floor(e / g), j = Math.floor(f / h);
                return [(i * g + g / 2) / c[0], (j * h + h / 2) / c[1]]
            }
        }, jsPlumb.Anchors.Perimeter = function (a) {
            a = a || {};
            var b = a.anchorCount || 60, c = a.shape;
            if (!c) throw new Error("no shape supplied to Perimeter Anchor type");
            var d = function () {
                for (var a = .5, c = 2 * Math.PI / b, d = 0, e = [], f = 0; b > f; f++) {
                    var g = a + a * Math.sin(d), h = a + a * Math.cos(d);
                    e.push([g, h, 0, 0]), d += c
                }
                return e
            }, e = function (a) {
                for (var c = b / a.length, d = [], e = function (a, e, f, g, h) {
                    c = b * h;
                    for (var i = (f - a) / c, j = (g - e) / c, k = 0; c > k; k++) d.push([a + i * k, e + j * k, 0, 0])
                }, f = 0; f < a.length; f++) e.apply(null, a[f]);
                return d
            }, f = function (a) {
                for (var b = [], c = 0; c < a.length; c++) b.push([a[c][0], a[c][1], a[c][2], a[c][3], 1 / a.length]);
                return e(b)
            }, g = function () {
                return f([[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0]])
            }, h = {
                Circle: d, Ellipse: d, Diamond: function () {
                    return f([[.5, 0, 1, .5], [1, .5, .5, 1], [.5, 1, 0, .5], [0, .5, .5, 0]])
                }, Rectangle: g, Square: g, Triangle: function () {
                    return f([[.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, .5, 0]])
                }, Path: function (a) {
                    for (var b = a.points, c = [], d = 0, f = 0; f < b.length - 1; f++) {
                        var g = Math.sqrt(Math.pow(b[f][2] - b[f][0]) + Math.pow(b[f][3] - b[f][1]));
                        d += g, c.push([b[f][0], b[f][1], b[f + 1][0], b[f + 1][1], g])
                    }
                    for (var h = 0; h < c.length; h++) c[h][4] = c[h][4] / d;
                    return e(c)
                }
            }, i = function (a, b) {
                for (var c = [], d = b / 180 * Math.PI, e = 0; e < a.length; e++) {
                    var f = a[e][0] - .5, g = a[e][1] - .5;
                    c.push([.5 + (f * Math.cos(d) - g * Math.sin(d)), .5 + (f * Math.sin(d) + g * Math.cos(d)), a[e][2], a[e][3]])
                }
                return c
            };
            if (!h[c]) throw new Error("Shape [" + c + "] is unknown by Perimeter Anchor type");
            var j = h[c](a);
            a.rotation && (j = i(j, a.rotation));
            var k = a.jsPlumbInstance.makeDynamicAnchor(j);
            return k.type = "Perimeter", k
        }
    }(), function () {
        "use strict";
        jsPlumb.DOMElementComponent = jsPlumbUtil.extend(jsPlumb.jsPlumbUIComponent, function () {
            this.mousemove = this.dblclick = this.click = this.mousedown = this.mouseup = function () {
            }
        }), jsPlumb.Segments = {
            AbstractSegment: function (a) {
                this.params = a, this.findClosestPointOnPath = function () {
                    return {d: 1 / 0, x: null, y: null, l: null}
                }, this.getBounds = function () {
                    return {
                        minX: Math.min(a.x1, a.x2),
                        minY: Math.min(a.y1, a.y2),
                        maxX: Math.max(a.x1, a.x2),
                        maxY: Math.max(a.y1, a.y2)
                    }
                }
            }, Straight: function (a) {
                var b, c, d, e, f, g, h, i = (jsPlumb.Segments.AbstractSegment.apply(this, arguments), function () {
                    b = Math.sqrt(Math.pow(f - e, 2) + Math.pow(h - g, 2)), c = Biltong.gradient({x: e, y: g}, {
                        x: f,
                        y: h
                    }), d = -1 / c
                });
                this.type = "Straight", this.getLength = function () {
                    return b
                }, this.getGradient = function () {
                    return c
                }, this.getCoordinates = function () {
                    return {x1: e, y1: g, x2: f, y2: h}
                }, this.setCoordinates = function (a) {
                    e = a.x1, g = a.y1, f = a.x2, h = a.y2, i()
                }, this.setCoordinates({x1: a.x1, y1: a.y1, x2: a.x2, y2: a.y2}), this.getBounds = function () {
                    return {minX: Math.min(e, f), minY: Math.min(g, h), maxX: Math.max(e, f), maxY: Math.max(g, h)}
                }, this.pointOnPath = function (a, c) {
                    if (0 !== a || c) {
                        if (1 != a || c) {
                            var d = c ? a > 0 ? a : b + a : a * b;
                            return Biltong.pointOnLine({x: e, y: g}, {x: f, y: h}, d)
                        }
                        return {x: f, y: h}
                    }
                    return {x: e, y: g}
                }, this.gradientAtPoint = function () {
                    return c
                }, this.pointAlongPathFrom = function (a, b, c) {
                    var d = this.pointOnPath(a, c), i = 0 >= b ? {x: e, y: g} : {x: f, y: h};
                    return 0 >= b && Math.abs(b) > 1 && (b *= -1), Biltong.pointOnLine(d, i, b)
                };
                var j = function (a, b, c) {
                    return c >= Math.min(a, b) && c <= Math.max(a, b)
                }, k = function (a, b, c) {
                    return Math.abs(c - a) < Math.abs(c - b) ? a : b
                };
                this.findClosestPointOnPath = function (a, i) {
                    var l = {d: 1 / 0, x: null, y: null, l: null, x1: e, x2: f, y1: g, y2: h};
                    if (0 === c) l.y = g, l.x = j(e, f, a) ? a : k(e, f, a); else if (1 / 0 == c || c == -1 / 0) l.x = e, l.y = j(g, h, i) ? i : k(g, h, i); else {
                        var m = g - c * e, n = i - d * a, o = (n - m) / (c - d), p = c * o + m;
                        l.x = j(e, f, o) ? o : k(e, f, o), l.y = j(g, h, p) ? p : k(g, h, p)
                    }
                    var q = Biltong.lineLength([l.x, l.y], [e, g]);
                    return l.d = Biltong.lineLength([a, i], [l.x, l.y]), l.l = q / b, l
                }
            }, Arc: function (a) {
                var b = (jsPlumb.Segments.AbstractSegment.apply(this, arguments), function (b, c) {
                    return Biltong.theta([a.cx, a.cy], [b, c])
                }), c = function (a, b) {
                    if (a.anticlockwise) {
                        var c = a.startAngle < a.endAngle ? a.startAngle + d : a.startAngle,
                            e = Math.abs(c - a.endAngle);
                        return c - e * b
                    }
                    var f = a.endAngle < a.startAngle ? a.endAngle + d : a.endAngle, g = Math.abs(f - a.startAngle);
                    return a.startAngle + g * b
                }, d = 2 * Math.PI;
                this.radius = a.r, this.anticlockwise = a.ac, this.type = "Arc", a.startAngle && a.endAngle ? (this.startAngle = a.startAngle, this.endAngle = a.endAngle, this.x1 = a.cx + this.radius * Math.cos(a.startAngle), this.y1 = a.cy + this.radius * Math.sin(a.startAngle), this.x2 = a.cx + this.radius * Math.cos(a.endAngle), this.y2 = a.cy + this.radius * Math.sin(a.endAngle)) : (this.startAngle = b(a.x1, a.y1), this.endAngle = b(a.x2, a.y2), this.x1 = a.x1, this.y1 = a.y1, this.x2 = a.x2, this.y2 = a.y2), this.endAngle < 0 && (this.endAngle += d), this.startAngle < 0 && (this.startAngle += d), this.segment = Biltong.quadrant([this.x1, this.y1], [this.x2, this.y2]);
                var e = this.endAngle < this.startAngle ? this.endAngle + d : this.endAngle;
                this.sweep = Math.abs(e - this.startAngle), this.anticlockwise && (this.sweep = d - this.sweep);
                var f = 2 * Math.PI * this.radius, g = this.sweep / d, h = f * g;
                this.getLength = function () {
                    return h
                }, this.getBounds = function () {
                    return {minX: a.cx - a.r, maxX: a.cx + a.r, minY: a.cy - a.r, maxY: a.cy + a.r}
                };
                var i = 1e-10, j = function (a) {
                    var b = Math.floor(a), c = Math.ceil(a);
                    return i > a - b ? b : i > c - a ? c : a
                };
                this.pointOnPath = function (b, d) {
                    if (0 === b) return {x: this.x1, y: this.y1, theta: this.startAngle};
                    if (1 == b) return {x: this.x2, y: this.y2, theta: this.endAngle};
                    d && (b /= h);
                    var e = c(this, b), f = a.cx + a.r * Math.cos(e), g = a.cy + a.r * Math.sin(e);
                    return {x: j(f), y: j(g), theta: e}
                }, this.gradientAtPoint = function (b, c) {
                    var d = this.pointOnPath(b, c), e = Biltong.normal([a.cx, a.cy], [d.x, d.y]);
                    return this.anticlockwise || 1 / 0 != e && e != -1 / 0 || (e *= -1), e
                }, this.pointAlongPathFrom = function (b, c, d) {
                    var e = this.pointOnPath(b, d), g = 2 * (c / f) * Math.PI, h = this.anticlockwise ? -1 : 1,
                        i = e.theta + h * g, j = a.cx + this.radius * Math.cos(i), k = a.cy + this.radius * Math.sin(i);
                    return {x: j, y: k}
                }
            }, Bezier: function (a) {
                var b = (jsPlumb.Segments.AbstractSegment.apply(this, arguments), [{x: a.x1, y: a.y1}, {
                    x: a.cp1x,
                    y: a.cp1y
                }, {x: a.cp2x, y: a.cp2y}, {x: a.x2, y: a.y2}]), c = {
                    minX: Math.min(a.x1, a.x2, a.cp1x, a.cp2x),
                    minY: Math.min(a.y1, a.y2, a.cp1y, a.cp2y),
                    maxX: Math.max(a.x1, a.x2, a.cp1x, a.cp2x),
                    maxY: Math.max(a.y1, a.y2, a.cp1y, a.cp2y)
                };
                this.type = "Bezier";
                var d = function (a, b, c) {
                    return c && (b = jsBezier.locationAlongCurveFrom(a, b > 0 ? 0 : 1, b)), b
                };
                this.pointOnPath = function (a, c) {
                    return a = d(b, a, c), jsBezier.pointOnCurve(b, a)
                }, this.gradientAtPoint = function (a, c) {
                    return a = d(b, a, c), jsBezier.gradientAtPoint(b, a)
                }, this.pointAlongPathFrom = function (a, c, e) {
                    return a = d(b, a, e), jsBezier.pointAlongCurveFrom(b, a, c)
                }, this.getLength = function () {
                    return jsBezier.getLength(b)
                }, this.getBounds = function () {
                    return c
                }
            }
        };
        var a = function () {
            this.resetBounds = function () {
                this.bounds = {minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0}
            }, this.resetBounds()
        };
        jsPlumb.Connectors.AbstractConnector = function (b) {
            a.apply(this, arguments);
            var c = [], d = 0, e = [], f = [], g = b.stub || 0, h = jsPlumbUtil.isArray(g) ? g[0] : g,
                i = jsPlumbUtil.isArray(g) ? g[1] : g, j = b.gap || 0, k = jsPlumbUtil.isArray(j) ? j[0] : j,
                l = jsPlumbUtil.isArray(j) ? j[1] : j, m = null, n = !1, o = null;
            this.isEditable = function () {
                return !1
            }, this.setEdited = function (a) {
                n = a
            }, this.getPath = function () {
            }, this.setPath = function () {
            }, this.findSegmentForPoint = function (a, b) {
                for (var d = {d: 1 / 0, s: null, x: null, y: null, l: null}, e = 0; e < c.length; e++) {
                    var f = c[e].findClosestPointOnPath(a, b);
                    f.d < d.d && (d.d = f.d, d.l = f.l, d.x = f.x, d.y = f.y, d.s = c[e], d.x1 = f.x1, d.x2 = f.x2, d.y1 = f.y1, d.y2 = f.y2, d.index = e)
                }
                return d
            };
            var p = function () {
                for (var a = 0, b = 0; b < c.length; b++) {
                    var g = c[b].getLength();
                    f[b] = g / d, e[b] = [a, a += g / d]
                }
            }, q = function (a, b) {
                b && (a = a > 0 ? a / d : (d + a) / d);
                for (var g = e.length - 1, h = 1, i = 0; i < e.length; i++) if (e[i][1] >= a) {
                    g = i, h = 1 == a ? 1 : 0 === a ? 0 : (a - e[i][0]) / f[i];
                    break
                }
                return {segment: c[g], proportion: h, index: g}
            }, r = function (a, b, e) {
                if (e.x1 != e.x2 || e.y1 != e.y2) {
                    var f = new jsPlumb.Segments[b](e);
                    c.push(f), d += f.getLength(), a.updateBounds(f)
                }
            }, s = function () {
                d = c.length = e.length = f.length = 0
            };
            this.setSegments = function (a) {
                m = [], d = 0;
                for (var b = 0; b < a.length; b++) m.push(a[b]), d += a[b].getLength()
            };
            var t = function (a) {
                this.lineWidth = a.lineWidth;
                var b = Biltong.quadrant(a.sourcePos, a.targetPos), c = a.targetPos[0] < a.sourcePos[0],
                    d = a.targetPos[1] < a.sourcePos[1], e = a.lineWidth || 1,
                    f = a.sourceEndpoint.anchor.getOrientation(a.sourceEndpoint),
                    g = a.targetEndpoint.anchor.getOrientation(a.targetEndpoint),
                    j = c ? a.targetPos[0] : a.sourcePos[0], m = d ? a.targetPos[1] : a.sourcePos[1],
                    n = Math.abs(a.targetPos[0] - a.sourcePos[0]), o = Math.abs(a.targetPos[1] - a.sourcePos[1]);
                if (0 === f[0] && 0 === f[1] || 0 === g[0] && 0 === g[1]) {
                    var p = n > o ? 0 : 1, q = [1, 0][p];
                    f = [], g = [], f[p] = a.sourcePos[p] > a.targetPos[p] ? -1 : 1, g[p] = a.sourcePos[p] > a.targetPos[p] ? 1 : -1, f[q] = 0, g[q] = 0
                }
                var r = c ? n + k * f[0] : k * f[0], s = d ? o + k * f[1] : k * f[1], t = c ? l * g[0] : n + l * g[0],
                    u = d ? l * g[1] : o + l * g[1], v = f[0] * g[0] + f[1] * g[1], w = {
                        sx: r,
                        sy: s,
                        tx: t,
                        ty: u,
                        lw: e,
                        xSpan: Math.abs(t - r),
                        ySpan: Math.abs(u - s),
                        mx: (r + t) / 2,
                        my: (s + u) / 2,
                        so: f,
                        to: g,
                        x: j,
                        y: m,
                        w: n,
                        h: o,
                        segment: b,
                        startStubX: r + f[0] * h,
                        startStubY: s + f[1] * h,
                        endStubX: t + g[0] * i,
                        endStubY: u + g[1] * i,
                        isXGreaterThanStubTimes2: Math.abs(r - t) > h + i,
                        isYGreaterThanStubTimes2: Math.abs(s - u) > h + i,
                        opposite: -1 == v,
                        perpendicular: 0 === v,
                        orthogonal: 1 == v,
                        sourceAxis: 0 === f[0] ? "y" : "x",
                        points: [j, m, n, o, r, s, t, u]
                    };
                return w.anchorOrientation = w.opposite ? "opposite" : w.orthogonal ? "orthogonal" : "perpendicular", w
            };
            return this.getSegments = function () {
                return c
            }, this.updateBounds = function (a) {
                var b = a.getBounds();
                this.bounds.minX = Math.min(this.bounds.minX, b.minX), this.bounds.maxX = Math.max(this.bounds.maxX, b.maxX), this.bounds.minY = Math.min(this.bounds.minY, b.minY), this.bounds.maxY = Math.max(this.bounds.maxY, b.maxY)
            }, this.pointOnPath = function (a, b) {
                var c = q(a, b);
                return c.segment && c.segment.pointOnPath(c.proportion, !1) || [0, 0]
            }, this.gradientAtPoint = function (a, b) {
                var c = q(a, b);
                return c.segment && c.segment.gradientAtPoint(c.proportion, !1) || 0
            }, this.pointAlongPathFrom = function (a, b, c) {
                var d = q(a, c);
                return d.segment && d.segment.pointAlongPathFrom(d.proportion, b, !1) || [0, 0]
            }, this.compute = function (a) {
                n || (o = t.call(this, a)), s(), this._compute(o, a), this.x = o.points[0], this.y = o.points[1], this.w = o.points[2], this.h = o.points[3], this.segment = o.segment, p()
            }, {
                addSegment: r,
                prepareCompute: t,
                sourceStub: h,
                targetStub: i,
                maxStub: Math.max(h, i),
                sourceGap: k,
                targetGap: l,
                maxGap: Math.max(k, l)
            }
        }, jsPlumbUtil.extend(jsPlumb.Connectors.AbstractConnector, a);
        var b = jsPlumb.Connectors.Straight = function () {
            this.type = "Straight";
            var a = jsPlumb.Connectors.AbstractConnector.apply(this, arguments);
            this._compute = function (b) {
                a.addSegment(this, "Straight", {
                    x1: b.sx,
                    y1: b.sy,
                    x2: b.startStubX,
                    y2: b.startStubY
                }), a.addSegment(this, "Straight", {
                    x1: b.startStubX,
                    y1: b.startStubY,
                    x2: b.endStubX,
                    y2: b.endStubY
                }), a.addSegment(this, "Straight", {x1: b.endStubX, y1: b.endStubY, x2: b.tx, y2: b.ty})
            }
        };
        jsPlumbUtil.extend(jsPlumb.Connectors.Straight, jsPlumb.Connectors.AbstractConnector), jsPlumb.registerConnectorType(b, "Straight"), jsPlumb.Endpoints.AbstractEndpoint = function (b) {
            a.apply(this, arguments);
            var c = this.compute = function () {
                var a = this._compute.apply(this, arguments);
                return this.x = a[0], this.y = a[1], this.w = a[2], this.h = a[3], this.bounds.minX = this.x, this.bounds.minY = this.y, this.bounds.maxX = this.x + this.w, this.bounds.maxY = this.y + this.h, a
            };
            return {compute: c, cssClass: b.cssClass}
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.AbstractEndpoint, a), jsPlumb.Endpoints.Dot = function (a) {
            this.type = "Dot", jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments), a = a || {}, this.radius = a.radius || 10, this.defaultOffset = .5 * this.radius, this.defaultInnerRadius = this.radius / 3, this._compute = function (a, b, c) {
                this.radius = c.radius || this.radius;
                var d = a[0] - this.radius, e = a[1] - this.radius, f = 2 * this.radius, g = 2 * this.radius;
                if (c.strokeStyle) {
                    var h = c.lineWidth || 1;
                    d -= h, e -= h, f += 2 * h, g += 2 * h
                }
                return [d, e, f, g, this.radius]
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.Dot, jsPlumb.Endpoints.AbstractEndpoint), jsPlumb.Endpoints.Rectangle = function (a) {
            this.type = "Rectangle", jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments), a = a || {}, this.width = a.width || 20, this.height = a.height || 20, this._compute = function (a, b, c) {
                var d = c.width || this.width, e = c.height || this.height, f = a[0] - d / 2, g = a[1] - e / 2;
                return [f, g, d, e]
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.Rectangle, jsPlumb.Endpoints.AbstractEndpoint);
        var c = function () {
            jsPlumb.DOMElementComponent.apply(this, arguments), this._jsPlumb.displayElements = []
        };
        jsPlumbUtil.extend(c, jsPlumb.DOMElementComponent, {
            getDisplayElements: function () {
                return this._jsPlumb.displayElements
            }, appendDisplayElement: function (a) {
                this._jsPlumb.displayElements.push(a)
            }
        }), jsPlumb.Endpoints.Image = function (a) {
            this.type = "Image", c.apply(this, arguments), jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
            var b = a.onload, d = a.src || a.url, e = a.cssClass ? " " + a.cssClass : "";
            this._jsPlumb.img = new Image, this._jsPlumb.ready = !1, this._jsPlumb.initialized = !1, this._jsPlumb.deleted = !1, this._jsPlumb.widthToUse = a.width, this._jsPlumb.heightToUse = a.height, this._jsPlumb.endpoint = a.endpoint, this._jsPlumb.img.onload = function () {
                null != this._jsPlumb && (this._jsPlumb.ready = !0, this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width, this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height, b && b(this))
            }.bind(this), this._jsPlumb.endpoint.setImage = function (a, c) {
                var d = a.constructor == String ? a : a.src;
                b = c, this._jsPlumb.img.src = d, null != this.canvas && this.canvas.setAttribute("src", this._jsPlumb.img.src)
            }.bind(this), this._jsPlumb.endpoint.setImage(d, b), this._compute = function (a) {
                return this.anchorPoint = a, this._jsPlumb.ready ? [a[0] - this._jsPlumb.widthToUse / 2, a[1] - this._jsPlumb.heightToUse / 2, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse] : [0, 0, 0, 0]
            }, this.canvas = document.createElement("img"), this.canvas.style.margin = 0, this.canvas.style.padding = 0, this.canvas.style.outline = 0, this.canvas.style.position = "absolute", this.canvas.className = this._jsPlumb.instance.endpointClass + e, this._jsPlumb.widthToUse && this.canvas.setAttribute("width", this._jsPlumb.widthToUse), this._jsPlumb.heightToUse && this.canvas.setAttribute("height", this._jsPlumb.heightToUse), this._jsPlumb.instance.appendElement(this.canvas), this.attachListeners(this.canvas, this), this.actuallyPaint = function () {
                if (!this._jsPlumb.deleted) {
                    this._jsPlumb.initialized || (this.canvas.setAttribute("src", this._jsPlumb.img.src), this.appendDisplayElement(this.canvas), this._jsPlumb.initialized = !0);
                    var a = this.anchorPoint[0] - this._jsPlumb.widthToUse / 2,
                        b = this.anchorPoint[1] - this._jsPlumb.heightToUse / 2;
                    jsPlumbUtil.sizeElement(this.canvas, a, b, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse)
                }
            }, this.paint = function (a, b) {
                null != this._jsPlumb && (this._jsPlumb.ready ? this.actuallyPaint(a, b) : window.setTimeout(function () {
                    this.paint(a, b)
                }.bind(this), 200))
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.Image, [c, jsPlumb.Endpoints.AbstractEndpoint], {
            cleanup: function () {
                this._jsPlumb.deleted = !0, this.canvas && this.canvas.parentNode.removeChild(this.canvas), this.canvas = null
            }
        }), jsPlumb.Endpoints.Blank = function () {
            jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments), this.type = "Blank", c.apply(this, arguments), this._compute = function (a) {
                return [a[0], a[1], 10, 0]
            }, this.canvas = document.createElement("div"), this.canvas.style.display = "block", this.canvas.style.width = "1px", this.canvas.style.height = "1px", this.canvas.style.background = "transparent", this.canvas.style.position = "absolute", this.canvas.className = this._jsPlumb.endpointClass, jsPlumb.appendElement(this.canvas), this.paint = function () {
                jsPlumbUtil.sizeElement(this.canvas, this.x, this.y, this.w, this.h)
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.Blank, [jsPlumb.Endpoints.AbstractEndpoint, c], {
            cleanup: function () {
                this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas)
            }
        }), jsPlumb.Endpoints.Triangle = function (a) {
            this.type = "Triangle", jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments), a = a || {}, a.width = a.width || 55, a.height = a.height || 55, this.width = a.width, this.height = a.height, this._compute = function (a, b, c) {
                var d = c.width || self.width, e = c.height || self.height, f = a[0] - d / 2, g = a[1] - e / 2;
                return [f, g, d, e]
            }
        };
        var d = jsPlumb.Overlays.AbstractOverlay = function (a) {
            this.visible = !0, this.isAppendedAtTopLevel = !0, this.component = a.component, this.loc = null == a.location ? .5 : a.location, this.endpointLoc = null == a.endpointLocation ? [.5, .5] : a.endpointLocation
        };
        d.prototype = {
            cleanup: function () {
                this.component = null, this.canvas = null, this.endpointLoc = null
            }, setVisible: function (a) {
                this.visible = a, this.component.repaint()
            }, isVisible: function () {
                return this.visible
            }, hide: function () {
                this.setVisible(!1)
            }, show: function () {
                this.setVisible(!0)
            }, incrementLocation: function (a) {
                this.loc += a, this.component.repaint()
            }, setLocation: function (a) {
                this.loc = a, this.component.repaint()
            }, getLocation: function () {
                return this.loc
            }
        }, jsPlumb.Overlays.Arrow = function (a) {
            this.type = "Arrow", d.apply(this, arguments), this.isAppendedAtTopLevel = !1, a = a || {};
            var b = jsPlumbUtil, c = Biltong;
            this.length = a.length || 20, this.width = a.width || 20, this.id = a.id;
            var e = (a.direction || 1) < 0 ? -1 : 1, f = a.paintStyle || {lineWidth: 1}, g = a.foldback || .623;
            this.computeMaxSize = function () {
                return 1.5 * self.width
            }, this.draw = function (a, d) {
                var h, i, j, k, l;
                if (a.pointAlongPathFrom) {
                    if (b.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                        var m = parseInt(this.loc, 10), n = this.loc < 0 ? 1 : 0;
                        h = a.pointAlongPathFrom(n, m, !1), i = a.pointAlongPathFrom(n, m - e * this.length / 2, !1), j = c.pointOnLine(h, i, this.length)
                    } else if (1 == this.loc) {
                        if (h = a.pointOnPath(this.loc), i = a.pointAlongPathFrom(this.loc, -this.length), j = c.pointOnLine(h, i, this.length), -1 == e) {
                            var o = j;
                            j = h, h = o
                        }
                    } else if (0 === this.loc) {
                        if (j = a.pointOnPath(this.loc), i = a.pointAlongPathFrom(this.loc, this.length), h = c.pointOnLine(j, i, this.length), -1 == e) {
                            var p = j;
                            j = h, h = p
                        }
                    } else h = a.pointAlongPathFrom(this.loc, e * this.length / 2), i = a.pointOnPath(this.loc), j = c.pointOnLine(h, i, this.length);
                    k = c.perpendicularLineTo(h, j, this.width), l = c.pointOnLine(h, j, g * this.length);
                    var q = {hxy: h, tail: k, cxy: l}, r = f.strokeStyle || d.strokeStyle,
                        s = f.fillStyle || d.strokeStyle, t = f.lineWidth || d.lineWidth, u = {
                            component: a,
                            d: q,
                            lineWidth: t,
                            strokeStyle: r,
                            fillStyle: s,
                            minX: Math.min(h.x, k[0].x, k[1].x),
                            maxX: Math.max(h.x, k[0].x, k[1].x),
                            minY: Math.min(h.y, k[0].y, k[1].y),
                            maxY: Math.max(h.y, k[0].y, k[1].y)
                        };
                    return u
                }
                return {component: a, minX: 0, maxX: 0, minY: 0, maxY: 0}
            }
        }, jsPlumbUtil.extend(jsPlumb.Overlays.Arrow, d), jsPlumb.Overlays.PlainArrow = function (a) {
            a = a || {};
            var b = jsPlumb.extend(a, {foldback: 1});
            jsPlumb.Overlays.Arrow.call(this, b), this.type = "PlainArrow"
        }, jsPlumbUtil.extend(jsPlumb.Overlays.PlainArrow, jsPlumb.Overlays.Arrow), jsPlumb.Overlays.Diamond = function (a) {
            a = a || {};
            var b = a.length || 40, c = jsPlumb.extend(a, {length: b / 2, foldback: 2});
            jsPlumb.Overlays.Arrow.call(this, c), this.type = "Diamond"
        }, jsPlumbUtil.extend(jsPlumb.Overlays.Diamond, jsPlumb.Overlays.Arrow);
        var e = function (a) {
            return null == a._jsPlumb.cachedDimensions && (a._jsPlumb.cachedDimensions = a.getDimensions()), a._jsPlumb.cachedDimensions
        }, f = function (a) {
            jsPlumb.DOMElementComponent.apply(this, arguments), d.apply(this, arguments), this.id = a.id, this._jsPlumb.div = null, this._jsPlumb.initialised = !1, this._jsPlumb.component = a.component, this._jsPlumb.cachedDimensions = null, this._jsPlumb.create = a.create, this.getElement = function () {
                if (null == this._jsPlumb.div) {
                    var b = this._jsPlumb.div = jsPlumb.getDOMElement(this._jsPlumb.create(this._jsPlumb.component));
                    b.style.position = "absolute";
                    var c = this._jsPlumb.instance.overlayClass + " " + (this.cssClass ? this.cssClass : a.cssClass ? a.cssClass : "");
                    b.className = c, this._jsPlumb.instance.appendElement(b), this._jsPlumb.instance.getId(b), this.attachListeners(b, this), this.canvas = b
                }
                return this._jsPlumb.div
            }, this.draw = function (a, b, c) {
                var d = e(this);
                if (null != d && 2 == d.length) {
                    var f = {x: 0, y: 0};
                    if (c) f = {x: c[0], y: c[1]}; else if (a.pointOnPath) {
                        var g = this.loc, h = !1;
                        (jsPlumbUtil.isString(this.loc) || this.loc < 0 || this.loc > 1) && (g = parseInt(this.loc, 10), h = !0), f = a.pointOnPath(g, h)
                    } else {
                        var i = this.loc.constructor == Array ? this.loc : this.endpointLoc;
                        f = {x: i[0] * a.w, y: i[1] * a.h}
                    }
                    var j = f.x - d[0] / 2, k = f.y - d[1] / 2;
                    return {
                        component: a,
                        d: {minx: j, miny: k, td: d, cxy: f},
                        minX: j,
                        maxX: j + d[0],
                        minY: k,
                        maxY: k + d[1]
                    }
                }
                return {minX: 0, maxX: 0, minY: 0, maxY: 0}
            }
        };
        jsPlumbUtil.extend(f, [jsPlumb.DOMElementComponent, d], {
            getDimensions: function () {
                return jsPlumb.getSize(this.getElement())
            }, setVisible: function (a) {
                this._jsPlumb.div.style.display = a ? "block" : "none"
            }, clearCachedDimensions: function () {
                this._jsPlumb.cachedDimensions = null
            }, cleanup: function () {
                null != this._jsPlumb.div && this._jsPlumb.instance.removeElement(this._jsPlumb.div)
            }, computeMaxSize: function () {
                var a = e(this);
                return Math.max(a[0], a[1])
            }, reattachListeners: function (a) {
                this._jsPlumb.div && this.reattachListenersForElement(this._jsPlumb.div, this, a)
            }, paint: function (a) {
                this._jsPlumb.initialised || (this.getElement(), a.component.appendDisplayElement(this._jsPlumb.div), this.attachListeners(this._jsPlumb.div, a.component), this._jsPlumb.initialised = !0), this._jsPlumb.div.style.left = a.component.x + a.d.minx + "px", this._jsPlumb.div.style.top = a.component.y + a.d.miny + "px"
            }
        }), jsPlumb.Overlays.Custom = function () {
            this.type = "Custom", f.apply(this, arguments)
        }, jsPlumbUtil.extend(jsPlumb.Overlays.Custom, f), jsPlumb.Overlays.GuideLines = function () {
            var a = this;
            a.length = 50, a.lineWidth = 5, this.type = "GuideLines", d.apply(this, arguments), jsPlumb.jsPlumbUIComponent.apply(this, arguments), this.draw = function (b) {
                var c = b.pointAlongPathFrom(a.loc, a.length / 2), d = b.pointOnPath(a.loc),
                    e = Biltong.pointOnLine(c, d, a.length), f = Biltong.perpendicularLineTo(c, e, 40),
                    g = Biltong.perpendicularLineTo(e, c, 20);
                return {
                    connector: b,
                    head: c,
                    tail: e,
                    headLine: g,
                    tailLine: f,
                    minX: Math.min(c.x, e.x, g[0].x, g[1].x),
                    minY: Math.min(c.y, e.y, g[0].y, g[1].y),
                    maxX: Math.max(c.x, e.x, g[0].x, g[1].x),
                    maxY: Math.max(c.y, e.y, g[0].y, g[1].y)
                }
            }
        }, jsPlumb.Overlays.Label = function (a) {
            this.labelStyle = a.labelStyle, this.cssClass = null != this.labelStyle ? this.labelStyle.cssClass : null;
            var b = jsPlumb.extend({
                create: function () {
                    return document.createElement("div")
                }
            }, a);
            if (jsPlumb.Overlays.Custom.call(this, b), this.type = "Label", this.label = a.label || "", this.labelText = null, this.labelStyle) {
                var c = this.getElement();
                if (this.labelStyle.font = this.labelStyle.font || "12px sans-serif", c.style.font = this.labelStyle.font, c.style.color = this.labelStyle.color || "black", this.labelStyle.fillStyle && (c.style.background = this.labelStyle.fillStyle), this.labelStyle.borderWidth > 0) {
                    var d = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                    c.style.border = this.labelStyle.borderWidth + "px solid " + d
                }
                this.labelStyle.padding && (c.style.padding = this.labelStyle.padding)
            }
        }, jsPlumbUtil.extend(jsPlumb.Overlays.Label, jsPlumb.Overlays.Custom, {
            cleanup: function () {
                this.div = null, this.label = null, this.labelText = null, this.cssClass = null, this.labelStyle = null
            }, getLabel: function () {
                return this.label
            }, setLabel: function (a) {
                this.label = a, this.labelText = null, this.clearCachedDimensions(), this.update(), this.component.repaint()
            }, getDimensions: function () {
                return this.update(), f.prototype.getDimensions.apply(this, arguments)
            }, update: function () {
                if ("function" == typeof this.label) {
                    var a = this.label(this);
                    this.getElement().innerHTML = a.replace(/\r\n/g, "<br/>")
                } else null == this.labelText && (this.labelText = this.label, this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>"))
            }
        })
    }(), function () {
        "use strict";
        var a = function (a) {
            this.type = "Flowchart", a = a || {}, a.stub = null == a.stub ? 30 : a.stub;
            var b, c = jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
                d = null == a.midpoint ? .5 : a.midpoint, e = [], f = (a.grid, a.alwaysRespectStubs), g = null,
                h = null, i = null, j = null != a.cornerRadius ? a.cornerRadius : 0, k = function (a) {
                    return 0 > a ? -1 : 0 === a ? 0 : 1
                }, l = function (a, b, c, d) {
                    if (h != b || i != c) {
                        var e = null == h ? d.sx : h, f = null == i ? d.sy : i, g = e == b ? "v" : "h", j = k(b - e),
                            l = k(c - f);
                        h = b, i = c, a.push([e, f, b, c, g, j, l])
                    }
                }, m = function (a) {
                    return Math.sqrt(Math.pow(a[0] - a[2], 2) + Math.pow(a[1] - a[3], 2))
                }, n = function (a) {
                    var b = [];
                    return b.push.apply(b, a), b
                }, o = function (a, b, d) {
                    for (var e, f, g = 0; g < b.length - 1; g++) {
                        if (e = e || n(b[g]), f = n(b[g + 1]), j > 0 && e[4] != f[4]) {
                            var h = Math.min(j, m(e), m(f));
                            e[2] -= e[5] * h, e[3] -= e[6] * h, f[0] += f[5] * h, f[1] += f[6] * h;
                            var i = e[6] == f[5] && 1 == f[5] || e[6] == f[5] && 0 === f[5] && e[5] != f[6] || e[6] == f[5] && -1 == f[5],
                                k = f[1] > e[3] ? 1 : -1, l = f[0] > e[2] ? 1 : -1, o = k == l,
                                p = o && i || !o && !i ? f[0] : e[2], q = o && i || !o && !i ? e[3] : f[1];
                            c.addSegment(a, "Straight", {
                                x1: e[0],
                                y1: e[1],
                                x2: e[2],
                                y2: e[3]
                            }), c.addSegment(a, "Arc", {r: h, x1: e[2], y1: e[3], x2: f[0], y2: f[1], cx: p, cy: q, ac: i})
                        } else {
                            var r = e[2] == e[0] ? 0 : e[2] > e[0] ? d.lw / 2 : -(d.lw / 2),
                                s = e[3] == e[1] ? 0 : e[3] > e[1] ? d.lw / 2 : -(d.lw / 2);
                            c.addSegment(a, "Straight", {x1: e[0] - r, y1: e[1] - s, x2: e[2] + r, y2: e[3] + s})
                        }
                        e = f
                    }
                    null != f && c.addSegment(a, "Straight", {x1: f[0], y1: f[1], x2: f[2], y2: f[3]})
                };
            this.setSegments = function (a) {
                g = a
            }, this.isEditable = function () {
                return !0
            }, this.getOriginalSegments = function () {
                return g || e
            }, this._compute = function (a, j) {
                if (j.clearEdits && (g = null), null != g) return o(this, g, a), void 0;
                e = [], h = null, i = null, b = null;
                var k = a.startStubX + (a.endStubX - a.startStubX) * d,
                    m = a.startStubY + (a.endStubY - a.startStubY) * d, n = {x: [0, 1], y: [1, 0]}, p = function () {
                        return [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                    }, q = {
                        perpendicular: p, orthogonal: p, opposite: function (b) {
                            var c = a, d = "x" == b ? 0 : 1, e = {
                                x: function () {
                                    return 1 == c.so[d] && (c.startStubX > c.endStubX && c.tx > c.startStubX || c.sx > c.endStubX && c.tx > c.sx) || -1 == c.so[d] && (c.startStubX < c.endStubX && c.tx < c.startStubX || c.sx < c.endStubX && c.tx < c.sx)
                                }, y: function () {
                                    return 1 == c.so[d] && (c.startStubY > c.endStubY && c.ty > c.startStubY || c.sy > c.endStubY && c.ty > c.sy) || -1 == c.so[d] && (c.startStubY < c.endStubY && c.ty < c.startStubY || c.sy < c.endStubY && c.ty < c.sy)
                                }
                            };
                            return !f && e[b]() ? {
                                x: [(a.sx + a.tx) / 2, a.startStubY, (a.sx + a.tx) / 2, a.endStubY],
                                y: [a.startStubX, (a.sy + a.ty) / 2, a.endStubX, (a.sy + a.ty) / 2]
                            }[b] : [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                        }
                    }, r = {
                        perpendicular: function (b) {
                            var c = a, d = {
                                    x: [[[1, 2, 3, 4], null, [2, 1, 4, 3]], null, [[4, 3, 2, 1], null, [3, 4, 1, 2]]],
                                    y: [[[3, 2, 1, 4], null, [2, 3, 4, 1]], null, [[4, 1, 2, 3], null, [1, 4, 3, 2]]]
                                }, e = {
                                    x: [[c.startStubX, c.endStubX], null, [c.endStubX, c.startStubX]],
                                    y: [[c.startStubY, c.endStubY], null, [c.endStubY, c.startStubY]]
                                }, f = {x: [[k, c.startStubY], [k, c.endStubY]], y: [[c.startStubX, m], [c.endStubX, m]]},
                                g = {x: [[c.endStubX, c.startStubY]], y: [[c.startStubX, c.endStubY]]}, h = {
                                    x: [[c.startStubX, c.endStubY], [c.endStubX, c.endStubY]],
                                    y: [[c.endStubX, c.startStubY], [c.endStubX, c.endStubY]]
                                }, i = {
                                    x: [[c.startStubX, m], [c.endStubX, m], [c.endStubX, c.endStubY]],
                                    y: [[k, c.startStubY], [k, c.endStubY], [c.endStubX, c.endStubY]]
                                }, j = {x: [c.startStubY, c.endStubY], y: [c.startStubX, c.endStubX]}, l = n[b][0], o = n[b][1],
                                p = c.so[l] + 1, q = c.to[o] + 1,
                                r = -1 == c.to[o] && j[b][1] < j[b][0] || 1 == c.to[o] && j[b][1] > j[b][0], s = e[b][p][0],
                                t = e[b][p][1], u = d[b][p][q];
                            return c.segment == u[3] || c.segment == u[2] && r ? f[b] : c.segment == u[2] && s > t ? g[b] : c.segment == u[2] && t >= s || c.segment == u[1] && !r ? i[b] : c.segment == u[0] || c.segment == u[1] && r ? h[b] : void 0
                        }, orthogonal: function (b, c, d, e, f) {
                            var g = a, h = {
                                x: -1 == g.so[0] ? Math.min(c, e) : Math.max(c, e),
                                y: -1 == g.so[1] ? Math.min(c, e) : Math.max(c, e)
                            }[b];
                            return {x: [[h, d], [h, f], [e, f]], y: [[d, h], [f, h], [f, e]]}[b]
                        }, opposite: function (b, d, e, f) {
                            var g = a, h = {x: "y", y: "x"}[b], i = {x: "height", y: "width"}[b],
                                l = g["is" + b.toUpperCase() + "GreaterThanStubTimes2"];
                            if (j.sourceEndpoint.elementId == j.targetEndpoint.elementId) {
                                var n = e + (1 - j.sourceEndpoint.anchor[h]) * j.sourceInfo[i] + c.maxStub;
                                return {x: [[d, n], [f, n]], y: [[n, d], [n, f]]}[b]
                            }
                            return !l || 1 == g.so[t] && d > f || -1 == g.so[t] && f > d ? {
                                x: [[d, m], [f, m]],
                                y: [[k, d], [k, f]]
                            }[b] : 1 == g.so[t] && f > d || -1 == g.so[t] && d > f ? {
                                x: [[k, g.sy], [k, g.ty]],
                                y: [[g.sx, m], [g.tx, m]]
                            }[b] : void 0
                        }
                    }, s = q[a.anchorOrientation](a.sourceAxis), t = "x" == a.sourceAxis ? 0 : 1,
                    u = "x" == a.sourceAxis ? 1 : 0, v = s[t], w = s[u], x = s[t + 2], y = s[u + 2];
                l(e, s[0], s[1], a);
                var z = r[a.anchorOrientation](a.sourceAxis, v, w, x, y);
                if (z) for (var A = 0; A < z.length; A++) l(e, z[A][0], z[A][1], a);
                l(e, s[2], s[3], a), l(e, a.tx, a.ty, a), o(this, e, a)
            }, this.getPath = function () {
                for (var a = null, b = null, c = [], d = g || e, f = 0; f < d.length; f++) {
                    var h = d[f], i = h[4], j = "v" == i ? 3 : 2;
                    null != a && b === i ? a[j] = h[j] : (h[0] != h[2] || h[1] != h[3]) && (c.push({
                        start: [h[0], h[1]],
                        end: [h[2], h[3]]
                    }), a = h, b = h[4])
                }
                return c
            }, this.setPath = function (a) {
                g = [];
                for (var b = 0; b < a.length; b++) {
                    var c = a[b].start[0], d = a[b].start[1], e = a[b].end[0], f = a[b].end[1], h = c == e ? "v" : "h",
                        i = k(e - c), j = k(f - d);
                    g.push([c, d, e, f, h, i, j])
                }
            }
        };
        jsPlumbUtil.extend(a, jsPlumb.Connectors.AbstractConnector), jsPlumb.registerConnectorType(a, "Flowchart")
    }(), function () {
        "use strict";
        var a = function (a, b, c, d) {
            return c >= a && b >= d ? 1 : c >= a && d >= b ? 2 : a >= c && d >= b ? 3 : 4
        }, b = function (a, b, c, d, e, f, g, h, i) {
            return i >= h ? [a, b] : 1 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 2 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + 1 * f, b + -1 * g] : 3 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 4 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + 1 * f, b + -1 * g] : void 0
        }, c = function (c) {
            c = c || {}, this.type = "StateMachine";
            var d = jsPlumb.Connectors.AbstractConnector.apply(this, arguments), e = c.curviness || 10,
                f = c.margin || 5, g = c.proximityLimit || 80, h = c.orientation && "clockwise" === c.orientation,
                i = c.loopbackRadius || 25, j = c.showLoopback !== !1;
            this._compute = function (c, k) {
                var l = Math.abs(k.sourcePos[0] - k.targetPos[0]), m = Math.abs(k.sourcePos[1] - k.targetPos[1]);
                if (Math.min(k.sourcePos[0], k.targetPos[0]), Math.min(k.sourcePos[1], k.targetPos[1]), j && k.sourceEndpoint.elementId === k.targetEndpoint.elementId) {
                    var n = k.sourcePos[0], o = (k.sourcePos[0], k.sourcePos[1] - f), p = (k.sourcePos[1] - f, n),
                        q = o - i, r = 2 * i, s = 2 * i, t = p - i, u = q - i;
                    c.points[0] = t, c.points[1] = u, c.points[2] = r, c.points[3] = s, d.addSegment(this, "Arc", {
                        loopback: !0,
                        x1: n - t + 4,
                        y1: o - u,
                        startAngle: 0,
                        endAngle: 2 * Math.PI,
                        r: i,
                        ac: !h,
                        x2: n - t - 4,
                        y2: o - u,
                        cx: p - t,
                        cy: q - u
                    })
                } else {
                    var v = k.sourcePos[0] < k.targetPos[0] ? 0 : l, w = k.sourcePos[1] < k.targetPos[1] ? 0 : m,
                        x = k.sourcePos[0] < k.targetPos[0] ? l : 0, y = k.sourcePos[1] < k.targetPos[1] ? m : 0;
                    0 === k.sourcePos[2] && (v -= f), 1 === k.sourcePos[2] && (v += f), 0 === k.sourcePos[3] && (w -= f), 1 === k.sourcePos[3] && (w += f), 0 === k.targetPos[2] && (x -= f), 1 === k.targetPos[2] && (x += f), 0 === k.targetPos[3] && (y -= f), 1 === k.targetPos[3] && (y += f);
                    var z = (v + x) / 2, A = (w + y) / 2, B = -1 * z / A, C = Math.atan(B),
                        D = (1 / 0 == B || B == -1 / 0 ? 0 : Math.abs(e / 2 * Math.sin(C)), 1 / 0 == B || B == -1 / 0 ? 0 : Math.abs(e / 2 * Math.cos(C)), a(v, w, x, y)),
                        E = Math.sqrt(Math.pow(x - v, 2) + Math.pow(y - w, 2)),
                        F = b(z, A, D, k.sourcePos, k.targetPos, e, e, E, g);
                    d.addSegment(this, "Bezier", {
                        x1: x,
                        y1: y,
                        x2: v,
                        y2: w,
                        cp1x: F[0],
                        cp1y: F[1],
                        cp2x: F[0],
                        cp2y: F[1]
                    })
                }
            }
        };
        jsPlumb.registerConnectorType(c, "StateMachine")
    }(), function () {
        var a = function (a) {
            a = a || {};
            var b = jsPlumb.Connectors.AbstractConnector.apply(this, arguments), c = (a.stub || 50, a.curviness || 150),
                d = 10;
            this.type = "Bezier", this.getCurviness = function () {
                return c
            }, this._findControlPoint = function (a, b, e, f, g) {
                var h = f.anchor.getOrientation(f), i = g.anchor.getOrientation(g), j = h[0] != i[0] || h[1] == i[1],
                    k = [];
                return j ? (0 === i[0] ? k.push(e[0] < b[0] ? a[0] + d : a[0] - d) : k.push(a[0] + c * i[0]), 0 === i[1] ? k.push(e[1] < b[1] ? a[1] + d : a[1] - d) : k.push(a[1] + c * h[1])) : (0 === h[0] ? k.push(b[0] < e[0] ? a[0] + d : a[0] - d) : k.push(a[0] - c * h[0]), 0 === h[1] ? k.push(b[1] < e[1] ? a[1] + d : a[1] - d) : k.push(a[1] + c * i[1])), k
            }, this._compute = function (a, c) {
                var d = c.sourcePos, e = c.targetPos, f = Math.abs(d[0] - e[0]), g = Math.abs(d[1] - e[1]),
                    h = d[0] < e[0] ? f : 0, i = d[1] < e[1] ? g : 0, j = d[0] < e[0] ? 0 : f, k = d[1] < e[1] ? 0 : g,
                    l = this._findControlPoint([h, i], d, e, c.sourceEndpoint, c.targetEndpoint),
                    m = this._findControlPoint([j, k], e, d, c.targetEndpoint, c.sourceEndpoint);
                b.addSegment(this, "Bezier", {
                    x1: h,
                    y1: i,
                    x2: j,
                    y2: k,
                    cp1x: l[0],
                    cp1y: l[1],
                    cp2x: m[0],
                    cp2y: m[1]
                })
            }
        };
        jsPlumbUtil.extend(a, jsPlumb.Connectors.AbstractConnector), jsPlumb.registerConnectorType(a, "Bezier")
    }(), function () {
        "use strict";
        var a = {
                joinstyle: "stroke-linejoin",
                "stroke-linejoin": "stroke-linejoin",
                "stroke-dashoffset": "stroke-dashoffset",
                "stroke-linecap": "stroke-linecap"
            }, b = "stroke-dasharray", c = "dashstyle", d = "linearGradient", e = "radialGradient", f = "defs", g = "fill",
            h = "stop", i = "stroke", j = "stroke-width", k = "style", l = "none", m = "jsplumb_gradient_",
            n = "lineWidth", o = {svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml"},
            p = function (a, b) {
                for (var c in b) a.setAttribute(c, "" + b[c])
            }, q = function (a, b) {
                var c = document.createElementNS(o.svg, a);
                return b = b || {}, b.version = "1.1", b.xmlns = o.xhtml, p(c, b), c
            }, r = function (a) {
                return "position:absolute;left:" + a[0] + "px;top:" + a[1] + "px"
            }, s = function (a) {
                for (var b = 0; b < a.childNodes.length; b++) (a.childNodes[b].tagName == f || a.childNodes[b].tagName == d || a.childNodes[b].tagName == e) && a.removeChild(a.childNodes[b])
            }, t = function (a, b, c, j, k) {
                var l = m + k._jsPlumb.instance.idstamp();
                s(a);
                var n;
                n = c.gradient.offset ? q(e, {id: l}) : q(d, {id: l, gradientUnits: "userSpaceOnUse"});
                var o = q(f);
                a.appendChild(o), o.appendChild(n);
                for (var p = 0; p < c.gradient.stops.length; p++) {
                    var r = 1 == k.segment || 2 == k.segment ? p : c.gradient.stops.length - 1 - p,
                        t = jsPlumbUtil.convertStyle(c.gradient.stops[r][1], !0),
                        u = q(h, {offset: Math.floor(100 * c.gradient.stops[p][0]) + "%", "stop-color": t});
                    n.appendChild(u)
                }
                var v = c.strokeStyle ? i : g;
                b.setAttribute(v, "url(#" + l + ")")
            }, u = function (d, e, f, h, m) {
                if (e.setAttribute(g, f.fillStyle ? jsPlumbUtil.convertStyle(f.fillStyle, !0) : l), e.setAttribute(i, f.strokeStyle ? jsPlumbUtil.convertStyle(f.strokeStyle, !0) : l), f.gradient ? t(d, e, f, h, m) : (s(d), e.setAttribute(k, "")), f.lineWidth && e.setAttribute(j, f.lineWidth), f[c] && f[n] && !f[b]) {
                    var o = -1 == f[c].indexOf(",") ? " " : ",", p = f[c].split(o), q = "";
                    p.forEach(function (a) {
                        q += Math.floor(a * f.lineWidth) + o
                    }), e.setAttribute(b, q)
                } else f[b] && e.setAttribute(b, f[b]);
                for (var r in a) f[r] && e.setAttribute(a[r], f[r])
            }, v = function (a, b, c) {
                a.childNodes.length > c ? a.insertBefore(b, a.childNodes[c]) : a.appendChild(b)
            };
        jsPlumbUtil.svg = {node: q, attr: p, pos: r};
        var w = function (a) {
            var b = a.pointerEventsSpec || "all", c = {};
            jsPlumb.jsPlumbUIComponent.apply(this, a.originalArgs), this.canvas = null, this.path = null, this.svg = null, this.bgCanvas = null;
            var d = a.cssClass + " " + (a.originalArgs[0].cssClass || ""),
                e = {style: "", width: 0, height: 0, "pointer-events": b, position: "absolute"};
            this.svg = q("svg", e), a.useDivWrapper ? (this.canvas = document.createElement("div"), this.canvas.style.position = "absolute", jsPlumbUtil.sizeElement(this.canvas, 0, 0, 1, 1), this.canvas.className = d) : (p(this.svg, {"class": d}), this.canvas = this.svg), a._jsPlumb.appendElement(this.canvas, a.originalArgs[0].parent), a.useDivWrapper && this.canvas.appendChild(this.svg);
            var f = [this.canvas];
            return this.getDisplayElements = function () {
                return f
            }, this.appendDisplayElement = function (a) {
                f.push(a)
            }, this.paint = function (b, d, e) {
                if (null != b) {
                    var f, g = [this.x, this.y], h = [this.w, this.h];
                    null != e && (e.xmin < 0 && (g[0] += e.xmin), e.ymin < 0 && (g[1] += e.ymin), h[0] = e.xmax + (e.xmin < 0 ? -e.xmin : 0), h[1] = e.ymax + (e.ymin < 0 ? -e.ymin : 0)), a.useDivWrapper ? (jsPlumbUtil.sizeElement(this.canvas, g[0], g[1], h[0], h[1]), g[0] = 0, g[1] = 0, f = r([0, 0])) : f = r([g[0], g[1]]), c.paint.apply(this, arguments), p(this.svg, {
                        style: f,
                        width: h[0],
                        height: h[1]
                    })
                }
            }, {renderer: c}
        };
        jsPlumbUtil.extend(w, jsPlumb.jsPlumbUIComponent, {
            cleanup: function () {
                this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.svg = null, this.canvas = null, this.bgCanvas = null, this.path = null, this.group = null
            }, setVisible: function (a) {
                this.canvas && (this.canvas.style.display = a ? "block" : "none"), this.bgCanvas && (this.bgCanvas.style.display = a ? "block" : "none")
            }
        }), jsPlumb.ConnectorRenderers.svg = function (a) {
            var b = this, c = w.apply(this, [{
                cssClass: a._jsPlumb.connectorClass,
                originalArgs: arguments,
                pointerEventsSpec: "none",
                _jsPlumb: a._jsPlumb
            }]);
            c.renderer.paint = function (c, d, e) {
                var f = b.getSegments(), g = "", h = [0, 0];
                if (e.xmin < 0 && (h[0] = -e.xmin), e.ymin < 0 && (h[1] = -e.ymin), f.length > 0) {
                    for (var i = 0; i < f.length; i++) g += jsPlumb.Segments.svg.SegmentRenderer.getPath(f[i]), g += " ";
                    var j = {
                        d: g,
                        transform: "translate(" + h[0] + "," + h[1] + ")",
                        "pointer-events": a["pointer-events"] || "visibleStroke"
                    }, k = null, l = [b.x, b.y, b.w, b.h], m = {
                        mouseenter: function (a) {
                            var c = a.relatedTarget;
                            return null == c || c != b.path && c != b.bgPath
                        }, mouseout: function (a) {
                            var c = a.relatedTarget;
                            return null == c || c != b.path && c != b.bgPath
                        }
                    };
                    if (c.outlineColor) {
                        var n = c.outlineWidth || 1, o = c.lineWidth + 2 * n;
                        k = jsPlumb.extend({}, c), k.strokeStyle = jsPlumbUtil.convertStyle(c.outlineColor), k.lineWidth = o, null == b.bgPath ? (b.bgPath = q("path", j), v(b.svg, b.bgPath, 0), b.attachListeners(b.bgPath, b, m)) : p(b.bgPath, j), u(b.svg, b.bgPath, k, l, b)
                    }
                    null == b.path ? (b.path = q("path", j), v(b.svg, b.path, c.outlineColor ? 1 : 0), b.attachListeners(b.path, b, m)) : p(b.path, j), u(b.svg, b.path, c, l, b)
                }
            }, this.reattachListeners = function () {
                this.bgPath && this.reattachListenersForElement(this.bgPath, this), this.path && this.reattachListenersForElement(this.path, this)
            }
        }, jsPlumbUtil.extend(jsPlumb.ConnectorRenderers.svg, w), jsPlumb.Segments.svg = {
            SegmentRenderer: {
                getPath: function (a) {
                    return {
                        Straight: function () {
                            var b = a.getCoordinates();
                            return "M " + b.x1 + " " + b.y1 + " L " + b.x2 + " " + b.y2
                        }, Bezier: function () {
                            var b = a.params;
                            return "M " + b.x1 + " " + b.y1 + " C " + b.cp1x + " " + b.cp1y + " " + b.cp2x + " " + b.cp2y + " " + b.x2 + " " + b.y2
                        }, Arc: function () {
                            var b = a.params, c = a.sweep > Math.PI ? 1 : 0, d = a.anticlockwise ? 0 : 1;
                            return "M" + a.x1 + " " + a.y1 + " A " + a.radius + " " + b.r + " 0 " + c + "," + d + " " + a.x2 + " " + a.y2
                        }
                    }[a.type]()
                }
            }
        };
        var x = window.SvgEndpoint = function (a) {
            var b = w.apply(this, [{
                cssClass: a._jsPlumb.endpointClass,
                originalArgs: arguments,
                pointerEventsSpec: "all",
                useDivWrapper: !0,
                _jsPlumb: a._jsPlumb
            }]);
            b.renderer.paint = function (a) {
                var b = jsPlumb.extend({}, a);
                b.outlineColor && (b.strokeWidth = b.outlineWidth, b.strokeStyle = jsPlumbUtil.convertStyle(b.outlineColor, !0)), null == this.node ? (this.node = this.makeNode(b), this.svg.appendChild(this.node), this.attachListeners(this.node, this)) : null != this.updateNode && this.updateNode(this.node), u(this.svg, this.node, b, [this.x, this.y, this.w, this.h], this), r(this.node, [this.x, this.y])
            }.bind(this)
        };
        jsPlumbUtil.extend(x, w, {
            reattachListeners: function () {
                this.node && this.reattachListenersForElement(this.node, this)
            }
        }), jsPlumb.Endpoints.svg.Dot = function () {
            jsPlumb.Endpoints.Dot.apply(this, arguments), x.apply(this, arguments), this.makeNode = function () {
                return q("circle", {cx: this.w / 2, cy: this.h / 2, r: this.radius})
            }, this.updateNode = function (a) {
                p(a, {cx: this.w / 2, cy: this.h / 2, r: this.radius})
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.svg.Dot, [jsPlumb.Endpoints.Dot, x]), jsPlumb.Endpoints.svg.Rectangle = function () {
            jsPlumb.Endpoints.Rectangle.apply(this, arguments), x.apply(this, arguments), this.makeNode = function () {
                return q("rect", {width: this.w, height: this.h})
            }, this.updateNode = function (a) {
                p(a, {width: this.w, height: this.h})
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.svg.Rectangle, [jsPlumb.Endpoints.Rectangle, x]), jsPlumb.Endpoints.svg.Image = jsPlumb.Endpoints.Image, jsPlumb.Endpoints.svg.Blank = jsPlumb.Endpoints.Blank, jsPlumb.Overlays.svg.Label = jsPlumb.Overlays.Label, jsPlumb.Overlays.svg.Custom = jsPlumb.Overlays.Custom;
        var y = function (a, b) {
            a.apply(this, b), jsPlumb.jsPlumbUIComponent.apply(this, b), this.isAppendedAtTopLevel = !1, this.path = null, this.paint = function (a, d) {
                if (a.component.svg && d) {
                    null == this.path && (this.path = q("path", {"pointer-events": "all"}), a.component.svg.appendChild(this.path), this.canvas = a.component.svg, this.attachListeners(this.path, a.component), this.attachListeners(this.path, this));
                    var e = b && 1 == b.length ? b[0].cssClass || "" : "", f = [0, 0];
                    d.xmin < 0 && (f[0] = -d.xmin), d.ymin < 0 && (f[1] = -d.ymin), p(this.path, {
                        d: c(a.d),
                        "class": e,
                        stroke: a.strokeStyle ? a.strokeStyle : null,
                        fill: a.fillStyle ? a.fillStyle : null,
                        transform: "translate(" + f[0] + "," + f[1] + ")"
                    })
                }
            };
            var c = function (a) {
                return "M" + a.hxy.x + "," + a.hxy.y + " L" + a.tail[0].x + "," + a.tail[0].y + " L" + a.cxy.x + "," + a.cxy.y + " L" + a.tail[1].x + "," + a.tail[1].y + " L" + a.hxy.x + "," + a.hxy.y
            };
            this.reattachListeners = function () {
                this.path && this.reattachListenersForElement(this.path, this)
            }
        };
        jsPlumbUtil.extend(y, [jsPlumb.jsPlumbUIComponent, jsPlumb.Overlays.AbstractOverlay], {
            cleanup: function () {
                null != this.path && this._jsPlumb.instance.removeElement(this.path)
            }, setVisible: function (a) {
                null != this.path && (this.path.style.display = a ? "block" : "none")
            }
        }), jsPlumb.Overlays.svg.Arrow = function () {
            y.apply(this, [jsPlumb.Overlays.Arrow, arguments])
        }, jsPlumbUtil.extend(jsPlumb.Overlays.svg.Arrow, [jsPlumb.Overlays.Arrow, y]), jsPlumb.Overlays.svg.PlainArrow = function () {
            y.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
        }, jsPlumbUtil.extend(jsPlumb.Overlays.svg.PlainArrow, [jsPlumb.Overlays.PlainArrow, y]), jsPlumb.Overlays.svg.Diamond = function () {
            y.apply(this, [jsPlumb.Overlays.Diamond, arguments])
        }, jsPlumbUtil.extend(jsPlumb.Overlays.svg.Diamond, [jsPlumb.Overlays.Diamond, y]), jsPlumb.Overlays.svg.GuideLines = function () {
            var a, b, c = null, d = this;
            jsPlumb.Overlays.GuideLines.apply(this, arguments), this.paint = function (f, g) {
                null == c && (c = q("path"), f.connector.svg.appendChild(c), d.attachListeners(c, f.connector), d.attachListeners(c, d), a = q("path"), f.connector.svg.appendChild(a), d.attachListeners(a, f.connector), d.attachListeners(a, d), b = q("path"), f.connector.svg.appendChild(b), d.attachListeners(b, f.connector), d.attachListeners(b, d));
                var h = [0, 0];
                g.xmin < 0 && (h[0] = -g.xmin), g.ymin < 0 && (h[1] = -g.ymin), p(c, {
                    d: e(f.head, f.tail),
                    stroke: "red",
                    fill: null,
                    transform: "translate(" + h[0] + "," + h[1] + ")"
                }), p(a, {
                    d: e(f.tailLine[0], f.tailLine[1]),
                    stroke: "blue",
                    fill: null,
                    transform: "translate(" + h[0] + "," + h[1] + ")"
                }), p(b, {
                    d: e(f.headLine[0], f.headLine[1]),
                    stroke: "green",
                    fill: null,
                    transform: "translate(" + h[0] + "," + h[1] + ")"
                })
            };
            var e = function (a, b) {
                return "M " + a.x + "," + a.y + " L" + b.x + "," + b.y
            }
        }, jsPlumbUtil.extend(jsPlumb.Overlays.svg.GuideLines, jsPlumb.Overlays.GuideLines)
    }(), function () {
        "use strict";
        var a = {"stroke-linejoin": "joinstyle", joinstyle: "joinstyle", endcap: "endcap", miterlimit: "miterlimit"},
            b = null;
        if (document.createStyleSheet && document.namespaces) {
            var c = [".jsplumb_vml", "jsplumb\\:textbox", "jsplumb\\:oval", "jsplumb\\:rect", "jsplumb\\:stroke", "jsplumb\\:shape", "jsplumb\\:group"],
                d = "behavior:url(#default#VML);position:absolute;";
            b = document.createStyleSheet();
            for (var e = 0; e < c.length; e++) b.addRule(c[e], d);
            document.namespaces.add("jsplumb", "urn:schemas-microsoft-com:vml")
        }
        jsPlumb.vml = {};
        var f = 1e3, g = function (a, b) {
            for (var c in b) a[c] = b[c]
        }, h = function (a, b, c, d, e, f) {
            c = c || {};
            var h = document.createElement("jsplumb:" + a);
            return f ? e.appendElement(h, d) : d.appendChild(h), h.className = (c["class"] ? c["class"] + " " : "") + "jsplumb_vml", i(h, b), g(h, c), h
        }, i = function (a, b, c) {
            a.style.left = b[0] + "px", a.style.top = b[1] + "px", a.style.width = b[2] + "px", a.style.height = b[3] + "px", a.style.position = "absolute", c && (a.style.zIndex = c)
        }, j = jsPlumb.vml.convertValue = function (a) {
            return Math.floor(a * f)
        }, k = function (a, b, c, d) {
            "transparent" === b ? d.setOpacity(c, "0.0") : d.setOpacity(c, "1.0")
        }, l = function (a, b, c, d) {
            var e = {};
            if (b.strokeStyle) {
                e.stroked = "true";
                var f = jsPlumbUtil.convertStyle(b.strokeStyle, !0);
                e.strokecolor = f, k(e, f, "stroke", c), e.strokeweight = b.lineWidth + "px"
            } else e.stroked = "false";
            if (b.fillStyle) {
                e.filled = "true";
                var i = jsPlumbUtil.convertStyle(b.fillStyle, !0);
                e.fillcolor = i, k(e, i, "fill", c)
            } else e.filled = "false";
            if (b.dashstyle) null == c.strokeNode ? c.strokeNode = h("stroke", [0, 0, 0, 0], {dashstyle: b.dashstyle}, a, d) : c.strokeNode.dashstyle = b.dashstyle; else if (b["stroke-dasharray"] && b.lineWidth) {
                for (var j = -1 == b["stroke-dasharray"].indexOf(",") ? " " : ",", l = b["stroke-dasharray"].split(j), m = "", n = 0; n < l.length; n++) m += Math.floor(l[n] / b.lineWidth) + j;
                null == c.strokeNode ? c.strokeNode = h("stroke", [0, 0, 0, 0], {dashstyle: m}, a, d) : c.strokeNode.dashstyle = m
            }
            g(a, e)
        }, m = function () {
            var a = this;
            jsPlumb.jsPlumbUIComponent.apply(this, arguments), this.opacityNodes = {
                stroke: null,
                fill: null
            }, this.initOpacityNodes = function (b) {
                a.opacityNodes.stroke = h("stroke", [0, 0, 1, 1], {opacity: "0.0"}, b, a._jsPlumb.instance), a.opacityNodes.fill = h("fill", [0, 0, 1, 1], {opacity: "0.0"}, b, a._jsPlumb.instance)
            }, this.setOpacity = function (b, c) {
                var d = a.opacityNodes[b];
                d && (d.opacity = "" + c)
            };
            var b = [];
            this.getDisplayElements = function () {
                return b
            }, this.appendDisplayElement = function (c, d) {
                d || a.canvas.parentNode.appendChild(c), b.push(c)
            }
        };
        jsPlumbUtil.extend(m, jsPlumb.jsPlumbUIComponent, {
            cleanup: function () {
                this.bgCanvas && this.bgCanvas.parentNode.removeChild(this.bgCanvas), this.canvas && this.canvas.parentNode.removeChild(this.canvas)
            }
        });
        var n = jsPlumb.ConnectorRenderers.vml = function (b) {
            this.strokeNode = null, this.canvas = null, m.apply(this, arguments);
            var c = this._jsPlumb.instance.connectorClass + (b.cssClass ? " " + b.cssClass : "");
            this.paint = function (d) {
                if (null !== d) {
                    this.w = Math.max(this.w, 1), this.h = Math.max(this.h, 1);
                    for (var e = this.getSegments(), j = {path: ""}, k = [this.x, this.y, this.w, this.h], m = 0; m < e.length; m++) j.path += jsPlumb.Segments.vml.SegmentRenderer.getPath(e[m]), j.path += " ";
                    if (d.outlineColor) {
                        var n = d.outlineWidth || 1, o = d.lineWidth + 2 * n,
                            p = {strokeStyle: jsPlumbUtil.convertStyle(d.outlineColor), lineWidth: o};
                        for (var q in a) p[q] = d[q];
                        null == this.bgCanvas ? (j["class"] = c, j.coordsize = k[2] * f + "," + k[3] * f, this.bgCanvas = h("shape", k, j, b.parent, this._jsPlumb.instance, !0), i(this.bgCanvas, k), this.appendDisplayElement(this.bgCanvas, !0), this.attachListeners(this.bgCanvas, this), this.initOpacityNodes(this.bgCanvas, ["stroke"])) : (j.coordsize = k[2] * f + "," + k[3] * f, i(this.bgCanvas, k), g(this.bgCanvas, j)), l(this.bgCanvas, p, this)
                    }
                    null == this.canvas ? (j["class"] = c, j.coordsize = k[2] * f + "," + k[3] * f, this.canvas = h("shape", k, j, b.parent, this._jsPlumb.instance, !0), this.appendDisplayElement(this.canvas, !0), this.attachListeners(this.canvas, this), this.initOpacityNodes(this.canvas, ["stroke"])) : (j.coordsize = k[2] * f + "," + k[3] * f, i(this.canvas, k), g(this.canvas, j)), l(this.canvas, d, this, this._jsPlumb.instance)
                }
            }
        };
        jsPlumbUtil.extend(n, m, {
            reattachListeners: function () {
                this.canvas && this.reattachListenersForElement(this.canvas, this)
            }, setVisible: function (a) {
                this.canvas && (this.canvas.style.display = a ? "block" : "none"), this.bgCanvas && (this.bgCanvas.style.display = a ? "block" : "none")
            }
        });
        var o = window.VmlEndpoint = function (a) {
            m.apply(this, arguments), this._jsPlumb.vml = null, this.canvas = document.createElement("div"), this.canvas.style.position = "absolute", this._jsPlumb.clazz = this._jsPlumb.instance.endpointClass + (a.cssClass ? " " + a.cssClass : ""), a._jsPlumb.appendElement(this.canvas, a.parent), this.paint = function (a, b) {
                var c = {}, d = this._jsPlumb.vml;
                jsPlumbUtil.sizeElement(this.canvas, this.x, this.y, this.w, this.h), null == this._jsPlumb.vml ? (c["class"] = this._jsPlumb.clazz, d = this._jsPlumb.vml = this.getVml([0, 0, this.w, this.h], c, b, this.canvas, this._jsPlumb.instance), this.attachListeners(d, this), this.appendDisplayElement(d, !0), this.appendDisplayElement(this.canvas, !0), this.initOpacityNodes(d, ["fill"])) : (i(d, [0, 0, this.w, this.h]), g(d, c)), l(d, a, this)
            }
        };
        jsPlumbUtil.extend(o, m, {
            reattachListeners: function () {
                this._jsPlumb.vml && this.reattachListenersForElement(this._jsPlumb.vml, this)
            }
        }), jsPlumb.Segments.vml = {
            SegmentRenderer: {
                getPath: function (a) {
                    return {
                        Straight: function (a) {
                            var b = a.params;
                            return "m" + j(b.x1) + "," + j(b.y1) + " l" + j(b.x2) + "," + j(b.y2) + " e"
                        }, Bezier: function (a) {
                            var b = a.params;
                            return "m" + j(b.x1) + "," + j(b.y1) + " c" + j(b.cp1x) + "," + j(b.cp1y) + "," + j(b.cp2x) + "," + j(b.cp2y) + "," + j(b.x2) + "," + j(b.y2) + " e"
                        }, Arc: function (a) {
                            var b = a.params, c = Math.min(b.x1, b.x2),
                                d = (Math.max(b.x1, b.x2), Math.min(b.y1, b.y2)),
                                e = (Math.max(b.y1, b.y2), a.anticlockwise ? 1 : 0),
                                f = a.anticlockwise ? "at " : "wa ", g = function () {
                                    if (b.loopback) return "0,0," + j(2 * b.r) + "," + j(2 * b.r);
                                    var f = [null, [function () {
                                        return [c, d]
                                    }, function () {
                                        return [c - b.r, d - b.r]
                                    }], [function () {
                                        return [c - b.r, d]
                                    }, function () {
                                        return [c, d - b.r]
                                    }], [function () {
                                        return [c - b.r, d - b.r]
                                    }, function () {
                                        return [c, d]
                                    }], [function () {
                                        return [c, d - b.r]
                                    }, function () {
                                        return [c - b.r, d]
                                    }]][a.segment][e]();
                                    return j(f[0]) + "," + j(f[1]) + "," + j(f[0] + 2 * b.r) + "," + j(f[1] + 2 * b.r)
                                };
                            return f + " " + g() + "," + j(b.x1) + "," + j(b.y1) + "," + j(b.x2) + "," + j(b.y2) + " e"
                        }
                    }[a.type](a)
                }
            }
        }, jsPlumb.Endpoints.vml.Dot = function () {
            jsPlumb.Endpoints.Dot.apply(this, arguments), o.apply(this, arguments), this.getVml = function (a, b, c, d, e) {
                return h("oval", a, b, d, e)
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.vml.Dot, o), jsPlumb.Endpoints.vml.Rectangle = function () {
            jsPlumb.Endpoints.Rectangle.apply(this, arguments), o.apply(this, arguments), this.getVml = function (a, b, c, d, e) {
                return h("rect", a, b, d, e)
            }
        }, jsPlumbUtil.extend(jsPlumb.Endpoints.vml.Rectangle, o), jsPlumb.Endpoints.vml.Image = jsPlumb.Endpoints.Image, jsPlumb.Endpoints.vml.Blank = jsPlumb.Endpoints.Blank, jsPlumb.Overlays.vml.Label = jsPlumb.Overlays.Label, jsPlumb.Overlays.vml.Custom = jsPlumb.Overlays.Custom;
        var p = function (a, b) {
            a.apply(this, b), m.apply(this, b);
            var c = this;
            this.canvas = null, this.isAppendedAtTopLevel = !0;
            var d = function (a) {
                return "m " + j(a.hxy.x) + "," + j(a.hxy.y) + " l " + j(a.tail[0].x) + "," + j(a.tail[0].y) + " " + j(a.cxy.x) + "," + j(a.cxy.y) + " " + j(a.tail[1].x) + "," + j(a.tail[1].y) + " x e"
            };
            this.paint = function (a, e) {
                if (a.component.canvas && e) {
                    var j = {}, k = a.d, l = a.component;
                    a.strokeStyle && (j.stroked = "true", j.strokecolor = jsPlumbUtil.convertStyle(a.strokeStyle, !0)), a.lineWidth && (j.strokeweight = a.lineWidth + "px"), a.fillStyle && (j.filled = "true", j.fillcolor = a.fillStyle);
                    var m = Math.min(k.hxy.x, k.tail[0].x, k.tail[1].x, k.cxy.x),
                        n = Math.min(k.hxy.y, k.tail[0].y, k.tail[1].y, k.cxy.y),
                        o = Math.max(k.hxy.x, k.tail[0].x, k.tail[1].x, k.cxy.x),
                        p = Math.max(k.hxy.y, k.tail[0].y, k.tail[1].y, k.cxy.y), q = Math.abs(o - m),
                        r = Math.abs(p - n), s = [m, n, q, r];
                    if (j.path = d(k), j.coordsize = l.w * f + "," + l.h * f, s[0] = l.x, s[1] = l.y, s[2] = l.w, s[3] = l.h, null == c.canvas) {
                        var t = l._jsPlumb.overlayClass || "", u = b && 1 == b.length ? b[0].cssClass || "" : "";
                        j["class"] = u + " " + t, c.canvas = h("shape", s, j, l.canvas.parentNode, l._jsPlumb.instance, !0), l.appendDisplayElement(c.canvas, !0), c.attachListeners(c.canvas, l), c.attachListeners(c.canvas, c)
                    } else i(c.canvas, s), g(c.canvas, j)
                }
            }, this.reattachListeners = function () {
                this.canvas && this.reattachListenersForElement(c.canvas, this)
            }, this.cleanup = function () {
                null != this.canvas && this._jsPlumb.instance.removeElement(this.canvas)
            }
        };
        jsPlumbUtil.extend(p, [m, jsPlumb.Overlays.AbstractOverlay], {
            setVisible: function (a) {
                this.canvas.style.display = a ? "block" : "none"
            }
        }), jsPlumb.Overlays.vml.Arrow = function () {
            p.apply(this, [jsPlumb.Overlays.Arrow, arguments])
        }, jsPlumbUtil.extend(jsPlumb.Overlays.vml.Arrow, [jsPlumb.Overlays.Arrow, p]), jsPlumb.Overlays.vml.PlainArrow = function () {
            p.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
        }, jsPlumbUtil.extend(jsPlumb.Overlays.vml.PlainArrow, [jsPlumb.Overlays.PlainArrow, p]), jsPlumb.Overlays.vml.Diamond = function () {
            p.apply(this, [jsPlumb.Overlays.Diamond, arguments])
        }, jsPlumbUtil.extend(jsPlumb.Overlays.vml.Diamond, [jsPlumb.Overlays.Diamond, p])
    }(), function (a) {
        "use strict";
        var b = function (b) {
            return "string" == typeof b ? a("#" + b) : a(b)
        };
        a.extend(jsPlumbInstance.prototype, {
            getDOMElement: function (a) {
                return null == a ? null : "string" == typeof a ? document.getElementById(a) : a.context || null != a.length ? a[0] : a
            },
            getElementObject: b,
            removeElement: function (a) {
                b(a).remove()
            },
            doAnimate: function (a, b, c) {
                a.animate(b, c)
            },
            getSelector: function (c, d) {
                return 2 == arguments.length ? b(c).find(d) : a(c)
            },
            destroyDraggable: function (b) {
                a(b).data("draggable") && a(b).draggable("destroy")
            },
            destroyDroppable: function (b) {
                a(b).data("droppable") && a(b).droppable("destroy")
            },
            initDraggable: function (b, c, d) {
                c = c || {}, b = a(b), c.start = jsPlumbUtil.wrap(c.start, function () {
                    a("body").addClass(this.dragSelectClass)
                }, !1), c.stop = jsPlumbUtil.wrap(c.stop, function () {
                    a("body").removeClass(this.dragSelectClass)
                }), c.doNotRemoveHelper || (c.helper = null), d && (c.scope = c.scope || jsPlumb.Defaults.Scope), b.draggable(c)
            },
            initDroppable: function (b, c) {
                c.scope = c.scope || jsPlumb.Defaults.Scope, a(b).droppable(c)
            },
            isAlreadyDraggable: function (b) {
                return a(b).hasClass("ui-draggable")
            },
            isDragSupported: function (b) {

                return a(b).draggable
            },
            isDropSupported: function (b) {
                return a(b).droppable
            },
            getDragObject: function (a) {
                return a[1].helper || a[1].draggable
            },
            getDragScope: function (b) {
                return a(b).draggable("option", "scope")
            },
            getDropEvent: function (a) {
                return a[0]
            },
            getDropScope: function (b) {
                return a(b).droppable("option", "scope")
            },
            getUIPosition: function (a, b, c) {
                var d;
                if (b = b || 1, 1 == a.length) d = {left: a[0].pageX, top: a[0].pageY}; else {
                    var e = a[1], f = e.position;
                    d = f || e.absolutePosition, c || (e.position.left /= b, e.position.top /= b)
                }
                return {left: d.left, top: d.top}
            },
            isDragFilterSupported: function () {
                return !0
            },
            setDragFilter: function (b, c) {
                jsPlumb.isAlreadyDraggable(b) && a(b).draggable("option", "cancel", c)
            },
            setElementDraggable: function (b, c) {
                a(b).draggable("option", "disabled", !c)
            },
            setDragScope: function (b, c) {
                a(b).draggable("option", "scope", c)
            },
            dragEvents: {
                start: "start",
                stop: "stop",
                drag: "drag",
                step: "step",
                over: "over",
                out: "out",
                drop: "drop",
                complete: "complete"
            },
            animEvents: {step: "step", complete: "complete"},
            trigger: function (a, c, d) {
                var e = jQuery._data(b(a)[0], "handle");
                e(d)
            },
            getOriginalEvent: function (a) {
                return a.originalEvent
            },
            on: function (a) {
                a = b(a);
                var c = [];
                c.push.apply(c, arguments), a.on.apply(a, c.slice(1))
            },
            off: function (a) {
                a = b(a);
                var c = [];
                c.push.apply(c, arguments), a.off.apply(a, c.slice(1))
            }
        }), a(document).ready(jsPlumb.init)
    }(jQuery);

    exports('jsplumb', jsPlumb);
});

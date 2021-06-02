!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.transition = e())
    : (t.transition = e());
})(this, function () {
  return (function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { exports: {}, id: r, loaded: !1 });
      return t[r].call(i.exports, i, i.exports, e), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (e.m = t), (e.c = n), (e.p = ""), e(0);
  })([
    function (t, e, n) {
      "use strict";
      function r() {
        var t = void 0,
          e = void 0,
          n = null,
          r = null,
          i = !1;
        if (
          (1 === arguments.length
            ? o.isString(arguments[0])
              ? (r = arguments[0].split(" "))
              : o.isArray(arguments[0])
              ? (r = arguments[0])
              : (n = arguments[0])
            : (r = arguments),
          n)
        )
          (this.property = n.property),
            (this.from = n.from),
            (this.to = n.to),
            (this.duration =
              o.isString(n.duration) && s.test(n.duration) ? n.duration : null),
            (this.delay =
              o.isString(n.delay) && s.test(n.delay) ? n.delay : null),
            (this.timingFunction = o.isString(n.timingFunction)
              ? n.timingFunction
              : null),
            (this.onTransitionEnd = o.isFunction(n.onTransitionEnd)
              ? n.onTransitionEnd
              : null),
            (this.beginFromCurrentValue = o.isBoolean(n.beginFromCurrentValue)
              ? n.beginFromCurrentValue
              : null);
        else {
          if (!(r.length >= 3))
            throw "[TransitionProperty] Invalid number of arguments.";
          for (
            this.property = r[0],
              this.from = r[1],
              this.to = r[2],
              this.duration = null,
              this.delay = null,
              this.timingFunction = null,
              this.onTransitionEnd = null,
              this.beginFromCurrentValue = null,
              t = 3;
            t < r.length;
            t++
          )
            (e = r[t]),
              o.isString(e)
                ? s.test(e)
                  ? i
                    ? (this.delay = e)
                    : ((i = !0), (this.duration = e))
                  : (this.timingFunction = e)
                : o.isFunction(e) && (this.onTransitionEnd = e);
        }
        (this.domProperty = o.supportedCssProperty(this.property)),
          (this.cssProperty = o.domToCSS(this.domProperty));
      }
      function i(t, e) {
        if (!t) throw "Transition: 'properties' is a required parameter";
        (e = o.defaults(e || {}, i.defaultOptions)),
          (this.properties = t),
          (this.duration = e.duration),
          (this.delay = e.delay),
          (this.timingFunction = e.timingFunction),
          (this.onTransitionEnd = e.onTransitionEnd),
          (this.resolve = null),
          (this.reject = null),
          (this.onBeforeChangeStyle = e.onBeforeChangeStyle),
          (this.onAfterChangeStyle = e.onAfterChangeStyle),
          (this.beginFromCurrentValue =
            !!o.isBoolean(e.beginFromCurrentValue) && e.beginFromCurrentValue),
          (this.toBeTransitionedPropertyNames = []),
          (this.toBeTransitionedProperties = []),
          (this.transitioningPropertyNames = []),
          (this.transitioningProperties = []),
          (this.allPropertiesWereFinished = !0);
      }
      var o = n(1);
      "undefined" == typeof Promise && (Promise = n(2));
      var s = /[-+]?\d+(?:.\d+)?(?:s|ms)/i,
        a = /\s*,\s*/,
        c = /(?:\s*,)?\s*([^(,]+(?:\([^)]+\))?)/g;
      (i.defaultOptions = {
        duration: "400ms",
        delay: "0s",
        timingFunction: "ease",
        onTransitionEnd: null,
        onBeforeChangeStyle: null,
        onAfterChangeStyle: null,
      }),
        (i.property = function (t) {
          return new r(t);
        }),
        (i.begin = function (t, e, n) {
          var s = void 0,
            a = void 0,
            c = void 0,
            u = [];
          if (
            (e.hasOwnProperty("properties") && ((n = e), (e = e.properties)),
            o.isString(e))
          )
            u.push(new r(e));
          else if (o.isArray(e))
            if (o.isString(e[0]) && e[0].indexOf(" ") === -1) u.push(new r(e));
            else
              for (a = 0; a < e.length; a++)
                (c = e[a]),
                  (!o.isArray(c) && c instanceof r) || (c = new r(c)),
                  u.push(c);
          else if ("property" in e) (c = new r(e)), u.push(c);
          else
            for (c in e)
              e.hasOwnProperty(c) &&
                (o.isArray(e[c])
                  ? ((c = [c].concat(e[c])), (c = new r(c)))
                  : ((c = o.defaults({ property: c }, e[c])), (c = new r(c))),
                u.push(c));
          return (
            (s = new i(u, n)),
            s.beginTransition(t),
            {
              promise: new Promise(function (t, e) {
                (s.resolve = t), (s.reject = e);
              }),
              pause: function () {
                s.pause();
              },
              remove: function () {
                s.remove();
              },
            }
          );
        }),
        (i.getElementTransitionValues = function (t) {
          var e = void 0,
            n = void 0,
            r = void 0,
            i = void 0,
            s = void 0,
            u = [],
            l = [],
            p = [],
            h = [],
            f = void 0,
            d = void 0,
            _ = void 0,
            v = void 0,
            y = void 0;
          if ((n = t.style[o.transitionProperty])) {
            if (
              ((r = t.style[o.transitionDuration]),
              (i = t.style[o.transitionDelay]),
              (s = t.style[o.transitionTimingFunction]),
              (u = n.split(a)),
              (l = r ? r.split(a) : ["0s"]),
              (p = i ? i.split(a) : ["0s"]),
              s)
            )
              for (h = []; (f = null !== c.exec(s)); ) h.push(f[1]);
            else h = ["ease"];
            for (
              d = u.length, _ = l.length, v = p.length, y = h.length, e = 0;
              e < d;
              e++
            )
              _ <= e && l.push(l[e % _]),
                v <= e && p.push(p[e % v]),
                y <= e && h.push(h[e % y]);
          }
          return {
            cssProperties: u,
            durations: l,
            delays: p,
            timingFunctions: h,
          };
        }),
        (i.setElementTransitionValues = function (t, e) {
          (t.style[o.transitionProperty] = e.cssProperties.join(", ")),
            (t.style[o.transitionDuration] = e.durations.join(", ")),
            (t.style[o.transitionDelay] = e.delays.join(", ")),
            (t.style[o.transitionTimingFunction] =
              e.timingFunctions.join(", "));
        }),
        (i.prototype = {
          constructor: i,
          beginTransition: function (t) {
            var e = void 0,
              n = void 0;
            for (
              this.finishTransitioningPropertiesIfExist(t), e = 0;
              e < this.properties.length;
              e++
            )
              (n = this.properties[e]),
                o.isString(n.from) ||
                  o.isNumber(n.from) ||
                  (n.from = window
                    .getComputedStyle(t, null)
                    .getPropertyValue(n.cssProperty));
            for (e = 0; e < this.properties.length; e++)
              (n = this.properties[e]),
                n.from == n.to
                  ? ((t.style[n.domProperty] = n.to),
                    this.executeOnTransitionEndForProperty(n, t, !0))
                  : ((t.style[n.domProperty] = n.from),
                    this.toBeTransitionedPropertyNames.push(n.cssProperty),
                    this.toBeTransitionedProperties.push(n));
            return (
              o.isFunction(this.onBeforeChangeStyle) &&
                this.onBeforeChangeStyle(t),
              0 === this.toBeTransitionedProperties.length
                ? (o.isFunction(this.onAfterChangeStyle) &&
                    this.onAfterChangeStyle(t),
                  void this.executeOnTransitionEnd(t, !0))
                : (t.offsetHeight,
                  this.addTransitionEndListener(t),
                  void o.executeInNextEventLoop(function () {
                    var e = void 0,
                      n = void 0,
                      r = void 0;
                    if (0 !== this.toBeTransitionedProperties.length) {
                      for (
                        e = i.getElementTransitionValues(t), n = 0;
                        n < this.toBeTransitionedProperties.length;
                        n++
                      )
                        (r = this.toBeTransitionedProperties[n]),
                          e.cssProperties.push(r.cssProperty),
                          e.durations.push(r.duration || this.duration),
                          e.delays.push(r.delay || this.delay),
                          e.timingFunctions.push(
                            r.timingFunction || this.timingFunction
                          );
                      for (
                        this.transitioningPropertyNames =
                          this.toBeTransitionedPropertyNames,
                          this.transitioningProperties =
                            this.toBeTransitionedProperties,
                          this.toBeTransitionedPropertyNames = [],
                          this.toBeTransitionedProperties = [],
                          i.setElementTransitionValues(t, e),
                          n = 0;
                        n < this.transitioningProperties.length;
                        n++
                      )
                        (r = this.transitioningProperties[n]),
                          (t.style[r.domProperty] = r.to);
                      o.isFunction(this.onAfterChangeStyle) &&
                        this.onAfterChangeStyle(t);
                    }
                  }, this))
            );
          },
          pause: function () {},
          remove: function () {},
          handleEvent: function (t) {
            t.target === t.currentTarget &&
              this.hasTransitioningProperty(t.propertyName) &&
              this.finishTransitioningProperty(t.currentTarget, t.propertyName);
          },
          hasTransitioningProperty: function (t) {
            return this.transitioningPropertyNames.indexOf(t) >= 0;
          },
          removeTransitioningProperty: function (t) {
            var e = void 0;
            if (((e = this.transitioningPropertyNames.indexOf(t)), e < 0))
              throw (
                "[Transition.removeTransitioningProperty]: Transition does not have transitioning property '" +
                t +
                "'"
              );
            this.transitioningPropertyNames.splice(e, 1),
              this.transitioningProperties.splice(e, 1);
          },
          hasToBeTransitionedProperty: function (t) {
            return this.toBeTransitionedPropertyNames.indexOf(t) >= 0;
          },
          removeToBeTransitionedProperty: function (t) {
            var e = void 0;
            if (((e = this.toBeTransitionedPropertyNames.indexOf(t)), e < 0))
              throw (
                "[Transition.removeToBeTransitionedProperty]: Transition does not have toBeTransitionedProperty '" +
                t +
                "'"
              );
            this.toBeTransitionedPropertyNames.splice(e, 1),
              this.toBeTransitionedProperties.splice(e, 1);
          },
          getPropertyByPropertyName: function (t) {
            var e = void 0;
            for (e = 0; e < this.properties.length; e++)
              if (this.properties[e].cssProperty === t)
                return this.properties[e];
            throw (
              "[Transition.getPropertyByPropertyName]: Transition does not have property '" +
              t +
              "'"
            );
          },
          finishTransitioningProperty: function (t, e) {
            var n = void 0,
              r = void 0,
              o = void 0;
            if (
              (this.removeTransitioningProperty(e),
              (r = i.getElementTransitionValues(t)),
              (n = r.cssProperties.indexOf(e)),
              n < 0)
            )
              throw (
                "[Transition.finishTransitioningProperty]: Did not find transitionProperty '" +
                e +
                "'"
              );
            r.cssProperties.splice(n, 1),
              r.durations.splice(n, 1),
              r.delays.splice(n, 1),
              r.timingFunctions.splice(n, 1),
              i.setElementTransitionValues(t, r),
              (o = this.getPropertyByPropertyName(e)),
              this.executeOnTransitionEndForProperty(o, t, !0),
              0 === this.transitioningProperties.length &&
                this.removeTransitionEndListener(t, !1);
          },
          finishTransitioningPropertiesIfExist: function (t) {
            var e = void 0,
              n = void 0,
              r = void 0,
              o = void 0,
              s = void 0,
              a = void 0,
              c = void 0,
              u = !1;
            if (
              t.hasOwnProperty("_transitions") &&
              0 !== t._transitions.length
            ) {
              for (
                r = i.getElementTransitionValues(t),
                  o = t._transitions.slice(),
                  e = 0;
                e < o.length;
                e++
              ) {
                for (
                  s = o[e], a = [], c = [], n = 0;
                  n < this.properties.length;
                  n++
                )
                  s.hasTransitioningProperty(this.properties[n].cssProperty)
                    ? a.push(this.properties[n])
                    : s.hasToBeTransitionedProperty(
                        this.properties[n].cssProperty
                      ) && c.push(this.properties[n]);
                a.length
                  ? ((u = !0),
                    (s.allPropertiesWereFinished = !1),
                    s.finishTransitioningProperties(
                      t,
                      a,
                      r,
                      this.beginFromCurrentValue
                    ))
                  : c.length &&
                    ((s.allPropertiesWereFinished = !1),
                    s.finishToBeTransitionedProperties(
                      t,
                      c,
                      this.beginFromCurrentValue
                    ));
              }
              u && i.setElementTransitionValues(t, r);
            }
          },
          finishTransitioningProperties: function (t, e, n, r) {
            var i = void 0,
              o = void 0,
              s = void 0,
              a = void 0,
              c = void 0;
            for (i = 0; i < e.length; i++) {
              if (
                ((s = e[i]),
                (c = s.cssProperty),
                this.removeTransitioningProperty(c),
                this.updateFromToCurrentValueIfNeeded(t, s, r),
                (o = n.cssProperties.indexOf(c)),
                o < 0)
              )
                throw (
                  "[Transition.finishTransitioningProperties]: Did not find transitionProperty '" +
                  c +
                  "'"
                );
              n.cssProperties.splice(o, 1),
                n.durations.splice(o, 1),
                n.delays.splice(o, 1),
                n.timingFunctions.splice(o, 1),
                (a = this.getPropertyByPropertyName(c)),
                this.executeOnTransitionEndForProperty(a, t, !1);
            }
            0 === this.transitioningProperties.length &&
              this.removeTransitionEndListener(t, !0);
          },
          finishToBeTransitionedProperties: function (t, e, n) {
            var r = void 0,
              i = void 0,
              s = void 0,
              a = void 0;
            for (r = 0; r < e.length; r++)
              (i = e[r]),
                (a = i.cssProperty),
                this.removeToBeTransitionedProperty(a),
                this.updateFromToCurrentValueIfNeeded(t, i, n),
                (s = this.getPropertyByPropertyName(a)),
                this.executeOnTransitionEndForProperty(s, t, !1);
            0 === this.toBeTransitionedProperties.length &&
              (o.isFunction(this.onAfterChangeStyle) &&
                this.onAfterChangeStyle(t),
              this.removeTransitionEndListener(t, !0));
          },
          updateFromToCurrentValueIfNeeded: function (t, e, n) {
            var r = o.isBoolean(e.beginFromCurrentValue);
            ((r && e.beginFromCurrentValue) || (!r && n)) &&
              (e.from = window
                .getComputedStyle(t, null)
                .getPropertyValue(e.cssProperty));
          },
          addTransitionEndListener: function (t) {
            t.hasOwnProperty("_transitions") || (t._transitions = []),
              t._transitions.push(this),
              t.addEventListener(o.transitionEndEvent, this, !1);
          },
          removeTransitionEndListener: function (t, e) {
            var n = void 0;
            if (!t.hasOwnProperty("_transitions"))
              throw "element does not have own _transitions property";
            if (((n = t._transitions.indexOf(this)), n < 0))
              throw "Can't remove non existing transition from an element";
            t._transitions.splice(n, 1),
              t.removeEventListener(o.transitionEndEvent, this, !1),
              this.executeOnTransitionEnd(t, e);
          },
          executeOnTransitionEndForProperty: function (t, e, n) {
            var r = void 0;
            o.isFunction(t.onTransitionEnd) &&
              ((r = t.onTransitionEnd),
              o.executeInNextEventLoop(function () {
                r(e, n);
              }));
          },
          executeOnTransitionEnd: function (t, e) {
            var n = void 0;
            o.isFunction(this.onTransitionEnd) &&
              ((n = this.onTransitionEnd),
              e
                ? o.executeInNextEventLoop(function () {
                    n(t, this.allPropertiesWereFinished);
                  }, this)
                : n(t, this.allPropertiesWereFinished)),
              this.resolve(this.allPropertiesWereFinished);
          },
        }),
        (t.exports = {
          TransitionProperty: r,
          property: i.property,
          transition: i.begin,
          begin: i.begin,
        });
    },
    function (t, e) {
      "use strict";
      function n(t) {
        return "-" + t.toLowerCase();
      }
      function r() {
        var t = void 0,
          e = u.slice(),
          n = void 0,
          r = void 0;
        for (u = [], t = 0; t < e.length; t++)
          (n = e[t]), (r = n.func), n.context ? r.apply(n.context) : r();
      }
      var i =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              },
        o = /[A-Z]/g,
        s = /^[A-Z]/,
        a = /-([a-z])/g,
        c = /^ms-/,
        u = [],
        l = {},
        p = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          msTransition: "MSTransitionEnd",
          transition: "transitionend",
        },
        h = (function () {
          var t = document.createElement("div"),
            e = ["Webkit", "Moz", "O", "ms", "Khtml"],
            n = /^[a-z]/,
            r = e.length;
          return function (i) {
            var o = void 0,
              s = void 0,
              a = void 0;
            if (l.hasOwnProperty(i)) return l[i];
            if ("undefined" != typeof t.style[i]) return (l[i] = i), i;
            for (
              a = i.replace(n, function (t) {
                return t.toUpperCase();
              }),
                o = 0;
              o < r;
              o++
            )
              if (((s = e[o] + a), "undefined" != typeof t.style[s]))
                return (l[i] = s), s;
            return null;
          };
        })(),
        f = null !== h("transition"),
        d = h("transitionProperty"),
        _ = h("transitionDuration"),
        v = h("transitionDelay"),
        y = h("transitionTimingFunction"),
        m = p[h("transition")];
      t.exports = {
        supportedCssProperty: h,
        hasTransition: f,
        transitionProperty: d,
        transitionDuration: _,
        transitionDelay: v,
        transitionTimingFunction: y,
        transitionEndEvent: m,
        camelCaseToDashes: function (t) {
          return t.replace(o, n);
        },
        domToCSS: function (t) {
          return t
            .replace(o, function (t) {
              return "-" + t.toLowerCase();
            })
            .replace(c, "-ms-");
        },
        cssToDOM: function (t) {
          return t
            .replace(a, function (t, e) {
              return e.toUpperCase();
            })
            .replace(s, function (t) {
              return t.toLowerCase();
            });
        },
        requestAnimationFrame: function (t, e) {
          return window.requestAnimationFrame(function (n) {
            e ? t.apply(e, [n]) : t(n);
          }, null);
        },
        executeInNextEventLoop: function (t, e) {
          0 === u.length && window.setTimeout(r, 0),
            u.push({ func: t, context: e });
        },
        extend: function (t) {
          if (!this.isObject(t)) return t;
          for (
            var e = void 0, n = void 0, r = 1, i = arguments.length;
            r < i;
            r++
          ) {
            e = arguments[r];
            for (n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          }
          return t;
        },
        defaults: function (t) {
          if (!this.isObject(t)) return t;
          for (var e = 1, n = arguments.length; e < n; e++) {
            var r = arguments[e];
            for (var i in r)
              r.hasOwnProperty(i) && void 0 === t[i] && (t[i] = r[i]);
          }
          return t;
        },
        isObject: function (t) {
          var e = "undefined" == typeof t ? "undefined" : i(t);
          return "function" === e || ("object" === e && !!t);
        },
        isFunction: function (t) {
          return "function" == typeof t;
        },
        isString: function (t) {
          return "string" == typeof t;
        },
        isNumber: function (t) {
          return "number" == typeof t;
        },
        isBoolean: function (t) {
          return "boolean" == typeof t;
        },
        isArray:
          Array.isArray ||
          function (t) {
            return "[object Array]" === Object.prototype.toString.call(t);
          },
      };
    },
    function (t, e, n) {
      (function (e, n, r) {
        !(function (e) {
          t.exports = e();
        })(function () {
          var t, i, o;
          return (function t(e, n, r) {
            function i(s, a) {
              if (!n[s]) {
                if (!e[s]) {
                  var c = "function" == typeof _dereq_ && _dereq_;
                  if (!a && c) return c(s, !0);
                  if (o) return o(s, !0);
                  var u = new Error("Cannot find module '" + s + "'");
                  throw ((u.code = "MODULE_NOT_FOUND"), u);
                }
                var l = (n[s] = { exports: {} });
                e[s][0].call(
                  l.exports,
                  function (t) {
                    var n = e[s][1][t];
                    return i(n ? n : t);
                  },
                  l,
                  l.exports,
                  t,
                  e,
                  n,
                  r
                );
              }
              return n[s].exports;
            }
            for (
              var o = "function" == typeof _dereq_ && _dereq_, s = 0;
              s < r.length;
              s++
            )
              i(r[s]);
            return i;
          })(
            {
              1: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (t) {
                    function e(t) {
                      var e = new n(t),
                        r = e.promise();
                      return e.setHowMany(1), e.setUnwrap(), e.init(), r;
                    }
                    var n = t._SomePromiseArray;
                    (t.any = function (t) {
                      return e(t);
                    }),
                      (t.prototype.any = function () {
                        return e(this);
                      });
                  };
                },
                {},
              ],
              2: [
                function (t, n, r) {
                  "use strict";
                  function i() {
                    (this._customScheduler = !1),
                      (this._isTickUsed = !1),
                      (this._lateQueue = new l(16)),
                      (this._normalQueue = new l(16)),
                      (this._haveDrainedQueues = !1),
                      (this._trampolineEnabled = !0);
                    var t = this;
                    (this.drainQueues = function () {
                      t._drainQueues();
                    }),
                      (this._schedule = u);
                  }
                  function o(t, e, n) {
                    this._lateQueue.push(t, e, n), this._queueTick();
                  }
                  function s(t, e, n) {
                    this._normalQueue.push(t, e, n), this._queueTick();
                  }
                  function a(t) {
                    this._normalQueue._pushOne(t), this._queueTick();
                  }
                  var c;
                  try {
                    throw new Error();
                  } catch (t) {
                    c = t;
                  }
                  var u = t("./schedule"),
                    l = t("./queue"),
                    p = t("./util");
                  (i.prototype.setScheduler = function (t) {
                    var e = this._schedule;
                    return (
                      (this._schedule = t), (this._customScheduler = !0), e
                    );
                  }),
                    (i.prototype.hasCustomScheduler = function () {
                      return this._customScheduler;
                    }),
                    (i.prototype.enableTrampoline = function () {
                      this._trampolineEnabled = !0;
                    }),
                    (i.prototype.disableTrampolineIfNecessary = function () {
                      p.hasDevTools && (this._trampolineEnabled = !1);
                    }),
                    (i.prototype.haveItemsQueued = function () {
                      return this._isTickUsed || this._haveDrainedQueues;
                    }),
                    (i.prototype.fatalError = function (t, n) {
                      n
                        ? (e.stderr.write(
                            "Fatal " + (t instanceof Error ? t.stack : t) + "\n"
                          ),
                          e.exit(2))
                        : this.throwLater(t);
                    }),
                    (i.prototype.throwLater = function (t, e) {
                      if (
                        (1 === arguments.length &&
                          ((e = t),
                          (t = function () {
                            throw e;
                          })),
                        "undefined" != typeof setTimeout)
                      )
                        setTimeout(function () {
                          t(e);
                        }, 0);
                      else
                        try {
                          this._schedule(function () {
                            t(e);
                          });
                        } catch (t) {
                          throw new Error(
                            "No async scheduler available\n\n    See http://goo.gl/MqrFmX\n"
                          );
                        }
                    }),
                    p.hasDevTools
                      ? ((i.prototype.invokeLater = function (t, e, n) {
                          this._trampolineEnabled
                            ? o.call(this, t, e, n)
                            : this._schedule(function () {
                                setTimeout(function () {
                                  t.call(e, n);
                                }, 100);
                              });
                        }),
                        (i.prototype.invoke = function (t, e, n) {
                          this._trampolineEnabled
                            ? s.call(this, t, e, n)
                            : this._schedule(function () {
                                t.call(e, n);
                              });
                        }),
                        (i.prototype.settlePromises = function (t) {
                          this._trampolineEnabled
                            ? a.call(this, t)
                            : this._schedule(function () {
                                t._settlePromises();
                              });
                        }))
                      : ((i.prototype.invokeLater = o),
                        (i.prototype.invoke = s),
                        (i.prototype.settlePromises = a)),
                    (i.prototype._drainQueue = function (t) {
                      for (; t.length() > 0; ) {
                        var e = t.shift();
                        if ("function" == typeof e) {
                          var n = t.shift(),
                            r = t.shift();
                          e.call(n, r);
                        } else e._settlePromises();
                      }
                    }),
                    (i.prototype._drainQueues = function () {
                      this._drainQueue(this._normalQueue),
                        this._reset(),
                        (this._haveDrainedQueues = !0),
                        this._drainQueue(this._lateQueue);
                    }),
                    (i.prototype._queueTick = function () {
                      this._isTickUsed ||
                        ((this._isTickUsed = !0),
                        this._schedule(this.drainQueues));
                    }),
                    (i.prototype._reset = function () {
                      this._isTickUsed = !1;
                    }),
                    (n.exports = i),
                    (n.exports.firstLineError = c);
                },
                { "./queue": 26, "./schedule": 29, "./util": 36 },
              ],
              3: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (t, e, n, r) {
                    var i = !1,
                      o = function (t, e) {
                        this._reject(e);
                      },
                      s = function (t, e) {
                        (e.promiseRejectionQueued = !0),
                          e.bindingPromise._then(o, o, null, this, t);
                      },
                      a = function (t, e) {
                        0 === (50397184 & this._bitField) &&
                          this._resolveCallback(e.target);
                      },
                      c = function (t, e) {
                        e.promiseRejectionQueued || this._reject(t);
                      };
                    (t.prototype.bind = function (o) {
                      i ||
                        ((i = !0),
                        (t.prototype._propagateFrom =
                          r.propagateFromFunction()),
                        (t.prototype._boundValue = r.boundValueFunction()));
                      var u = n(o),
                        l = new t(e);
                      l._propagateFrom(this, 1);
                      var p = this._target();
                      if ((l._setBoundTo(u), u instanceof t)) {
                        var h = {
                          promiseRejectionQueued: !1,
                          promise: l,
                          target: p,
                          bindingPromise: u,
                        };
                        p._then(e, s, void 0, l, h),
                          u._then(a, c, void 0, l, h),
                          l._setOnCancel(u);
                      } else l._resolveCallback(p);
                      return l;
                    }),
                      (t.prototype._setBoundTo = function (t) {
                        void 0 !== t
                          ? ((this._bitField = 2097152 | this._bitField),
                            (this._boundTo = t))
                          : (this._bitField = this._bitField & -2097153);
                      }),
                      (t.prototype._isBound = function () {
                        return 2097152 === (2097152 & this._bitField);
                      }),
                      (t.bind = function (e, n) {
                        return t.resolve(n).bind(e);
                      });
                  };
                },
                {},
              ],
              4: [
                function (t, e, n) {
                  "use strict";
                  function r() {
                    try {
                      Promise === o && (Promise = i);
                    } catch (t) {}
                    return o;
                  }
                  var i;
                  "undefined" != typeof Promise && (i = Promise);
                  var o = t("./promise")();
                  (o.noConflict = r), (e.exports = o);
                },
                { "./promise": 22 },
              ],
              5: [
                function (t, e, n) {
                  "use strict";
                  var r = Object.create;
                  if (r) {
                    var i = r(null),
                      o = r(null);
                    i[" size"] = o[" size"] = 0;
                  }
                  e.exports = function (e) {
                    function n(t, n) {
                      var r;
                      if ((null != t && (r = t[n]), "function" != typeof r)) {
                        var i =
                          "Object " +
                          a.classString(t) +
                          " has no method '" +
                          a.toString(n) +
                          "'";
                        throw new e.TypeError(i);
                      }
                      return r;
                    }
                    function r(t) {
                      var e = this.pop(),
                        r = n(t, e);
                      return r.apply(t, this);
                    }
                    function i(t) {
                      return t[this];
                    }
                    function o(t) {
                      var e = +this;
                      return e < 0 && (e = Math.max(0, e + t.length)), t[e];
                    }
                    var s,
                      a = t("./util"),
                      c = a.canEvaluate;
                    a.isIdentifier;
                    (e.prototype.call = function (t) {
                      var e = [].slice.call(arguments, 1);
                      return (
                        e.push(t), this._then(r, void 0, void 0, e, void 0)
                      );
                    }),
                      (e.prototype.get = function (t) {
                        var e,
                          n = "number" == typeof t;
                        if (n) e = o;
                        else if (c) {
                          var r = s(t);
                          e = null !== r ? r : i;
                        } else e = i;
                        return this._then(e, void 0, void 0, t, void 0);
                      });
                  };
                },
                { "./util": 36 },
              ],
              6: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i) {
                    var o = t("./util"),
                      s = o.tryCatch,
                      a = o.errorObj,
                      c = e._async;
                    (e.prototype.break = e.prototype.cancel =
                      function () {
                        if (!i.cancellation())
                          return this._warn("cancellation is disabled");
                        for (var t = this, e = t; t._isCancellable(); ) {
                          if (!t._cancelBy(e)) {
                            e._isFollowing()
                              ? e._followee().cancel()
                              : e._cancelBranched();
                            break;
                          }
                          var n = t._cancellationParent;
                          if (null == n || !n._isCancellable()) {
                            t._isFollowing()
                              ? t._followee().cancel()
                              : t._cancelBranched();
                            break;
                          }
                          t._isFollowing() && t._followee().cancel(),
                            t._setWillBeCancelled(),
                            (e = t),
                            (t = n);
                        }
                      }),
                      (e.prototype._branchHasCancelled = function () {
                        this._branchesRemainingToCancel--;
                      }),
                      (e.prototype._enoughBranchesHaveCancelled = function () {
                        return (
                          void 0 === this._branchesRemainingToCancel ||
                          this._branchesRemainingToCancel <= 0
                        );
                      }),
                      (e.prototype._cancelBy = function (t) {
                        return t === this
                          ? ((this._branchesRemainingToCancel = 0),
                            this._invokeOnCancel(),
                            !0)
                          : (this._branchHasCancelled(),
                            !!this._enoughBranchesHaveCancelled() &&
                              (this._invokeOnCancel(), !0));
                      }),
                      (e.prototype._cancelBranched = function () {
                        this._enoughBranchesHaveCancelled() && this._cancel();
                      }),
                      (e.prototype._cancel = function () {
                        this._isCancellable() &&
                          (this._setCancelled(),
                          c.invoke(this._cancelPromises, this, void 0));
                      }),
                      (e.prototype._cancelPromises = function () {
                        this._length() > 0 && this._settlePromises();
                      }),
                      (e.prototype._unsetOnCancel = function () {
                        this._onCancelField = void 0;
                      }),
                      (e.prototype._isCancellable = function () {
                        return this.isPending() && !this._isCancelled();
                      }),
                      (e.prototype.isCancellable = function () {
                        return this.isPending() && !this.isCancelled();
                      }),
                      (e.prototype._doInvokeOnCancel = function (t, e) {
                        if (o.isArray(t))
                          for (var n = 0; n < t.length; ++n)
                            this._doInvokeOnCancel(t[n], e);
                        else if (void 0 !== t)
                          if ("function" == typeof t) {
                            if (!e) {
                              var r = s(t).call(this._boundValue());
                              r === a &&
                                (this._attachExtraTrace(r.e),
                                c.throwLater(r.e));
                            }
                          } else t._resultCancelled(this);
                      }),
                      (e.prototype._invokeOnCancel = function () {
                        var t = this._onCancel();
                        this._unsetOnCancel(),
                          c.invoke(this._doInvokeOnCancel, this, t);
                      }),
                      (e.prototype._invokeInternalOnCancel = function () {
                        this._isCancellable() &&
                          (this._doInvokeOnCancel(this._onCancel(), !0),
                          this._unsetOnCancel());
                      }),
                      (e.prototype._resultCancelled = function () {
                        this.cancel();
                      });
                  };
                },
                { "./util": 36 },
              ],
              7: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e) {
                    function n(t, n, a) {
                      return function (c) {
                        var u = a._boundValue();
                        t: for (var l = 0; l < t.length; ++l) {
                          var p = t[l];
                          if (
                            p === Error ||
                            (null != p && p.prototype instanceof Error)
                          ) {
                            if (c instanceof p) return o(n).call(u, c);
                          } else if ("function" == typeof p) {
                            var h = o(p).call(u, c);
                            if (h === s) return h;
                            if (h) return o(n).call(u, c);
                          } else if (r.isObject(c)) {
                            for (var f = i(p), d = 0; d < f.length; ++d) {
                              var _ = f[d];
                              if (p[_] != c[_]) continue t;
                            }
                            return o(n).call(u, c);
                          }
                        }
                        return e;
                      };
                    }
                    var r = t("./util"),
                      i = t("./es5").keys,
                      o = r.tryCatch,
                      s = r.errorObj;
                    return n;
                  };
                },
                { "./es5": 13, "./util": 36 },
              ],
              8: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (t) {
                    function e() {
                      this._trace = new e.CapturedTrace(r());
                    }
                    function n() {
                      if (i) return new e();
                    }
                    function r() {
                      var t = o.length - 1;
                      if (t >= 0) return o[t];
                    }
                    var i = !1,
                      o = [];
                    return (
                      (t.prototype._promiseCreated = function () {}),
                      (t.prototype._pushContext = function () {}),
                      (t.prototype._popContext = function () {
                        return null;
                      }),
                      (t._peekContext = t.prototype._peekContext =
                        function () {}),
                      (e.prototype._pushContext = function () {
                        void 0 !== this._trace &&
                          ((this._trace._promiseCreated = null),
                          o.push(this._trace));
                      }),
                      (e.prototype._popContext = function () {
                        if (void 0 !== this._trace) {
                          var t = o.pop(),
                            e = t._promiseCreated;
                          return (t._promiseCreated = null), e;
                        }
                        return null;
                      }),
                      (e.CapturedTrace = null),
                      (e.create = n),
                      (e.deactivateLongStackTraces = function () {}),
                      (e.activateLongStackTraces = function () {
                        var n = t.prototype._pushContext,
                          o = t.prototype._popContext,
                          s = t._peekContext,
                          a = t.prototype._peekContext,
                          c = t.prototype._promiseCreated;
                        (e.deactivateLongStackTraces = function () {
                          (t.prototype._pushContext = n),
                            (t.prototype._popContext = o),
                            (t._peekContext = s),
                            (t.prototype._peekContext = a),
                            (t.prototype._promiseCreated = c),
                            (i = !1);
                        }),
                          (i = !0),
                          (t.prototype._pushContext = e.prototype._pushContext),
                          (t.prototype._popContext = e.prototype._popContext),
                          (t._peekContext = t.prototype._peekContext = r),
                          (t.prototype._promiseCreated = function () {
                            var t = this._peekContext();
                            t &&
                              null == t._promiseCreated &&
                              (t._promiseCreated = this);
                          });
                      }),
                      e
                    );
                  };
                },
                {},
              ],
              9: [
                function (t, n, r) {
                  "use strict";
                  n.exports = function (n, r) {
                    function i(t, e) {
                      return { promise: e };
                    }
                    function o() {
                      return !1;
                    }
                    function s(t, e, n) {
                      var r = this;
                      try {
                        t(e, n, function (t) {
                          if ("function" != typeof t)
                            throw new TypeError(
                              "onCancel must be a function, got: " +
                                L.toString(t)
                            );
                          r._attachCancellationCallback(t);
                        });
                      } catch (t) {
                        return t;
                      }
                    }
                    function a(t) {
                      if (!this._isCancellable()) return this;
                      var e = this._onCancel();
                      void 0 !== e
                        ? L.isArray(e)
                          ? e.push(t)
                          : this._setOnCancel([e, t])
                        : this._setOnCancel(t);
                    }
                    function c() {
                      return this._onCancelField;
                    }
                    function u(t) {
                      this._onCancelField = t;
                    }
                    function l() {
                      (this._cancellationParent = void 0),
                        (this._onCancelField = void 0);
                    }
                    function p(t, e) {
                      if (0 !== (1 & e)) {
                        this._cancellationParent = t;
                        var n = t._branchesRemainingToCancel;
                        void 0 === n && (n = 0),
                          (t._branchesRemainingToCancel = n + 1);
                      }
                      0 !== (2 & e) &&
                        t._isBound() &&
                        this._setBoundTo(t._boundTo);
                    }
                    function h(t, e) {
                      0 !== (2 & e) &&
                        t._isBound() &&
                        this._setBoundTo(t._boundTo);
                    }
                    function f() {
                      var t = this._boundTo;
                      return void 0 !== t && t instanceof n
                        ? t.isFulfilled()
                          ? t.value()
                          : void 0
                        : t;
                    }
                    function d() {
                      this._trace = new R(this._peekContext());
                    }
                    function _(t, e) {
                      if (H(t)) {
                        var n = this._trace;
                        if (
                          (void 0 !== n && e && (n = n._parent), void 0 !== n)
                        )
                          n.attachExtraTrace(t);
                        else if (!t.__stackCleaned__) {
                          var r = E(t);
                          L.notEnumerableProp(
                            t,
                            "stack",
                            r.message + "\n" + r.stack.join("\n")
                          ),
                            L.notEnumerableProp(t, "__stackCleaned__", !0);
                        }
                      }
                    }
                    function v(t, e, n, r, i) {
                      if (void 0 === t && null !== e && K) {
                        if (void 0 !== i && i._returnedNonUndefined()) return;
                        if (0 === (65535 & r._bitField)) return;
                        n && (n += " ");
                        var o = "",
                          s = "";
                        if (e._trace) {
                          for (
                            var a = e._trace.stack.split("\n"),
                              c = C(a),
                              u = c.length - 1;
                            u >= 0;
                            --u
                          ) {
                            var l = c[u];
                            if (!M.test(l)) {
                              var p = l.match(q);
                              p &&
                                (o =
                                  "at " + p[1] + ":" + p[2] + ":" + p[3] + " ");
                              break;
                            }
                          }
                          if (c.length > 0)
                            for (var h = c[0], u = 0; u < a.length; ++u)
                              if (a[u] === h) {
                                u > 0 && (s = "\n" + a[u - 1]);
                                break;
                              }
                        }
                        var f =
                          "a promise was created in a " +
                          n +
                          "handler " +
                          o +
                          "but was not returned from it, see http://goo.gl/rRqMUw" +
                          s;
                        r._warn(f, !0, e);
                      }
                    }
                    function y(t, e) {
                      var n =
                        t +
                        " is deprecated and will be removed in a future version.";
                      return e && (n += " Use " + e + " instead."), m(n);
                    }
                    function m(t, e, r) {
                      if (st.warnings) {
                        var i,
                          o = new D(t);
                        if (e) r._attachExtraTrace(o);
                        else if (st.longStackTraces && (i = n._peekContext()))
                          i.attachExtraTrace(o);
                        else {
                          var s = E(o);
                          o.stack = s.message + "\n" + s.stack.join("\n");
                        }
                        et("warning", o) || F(o, "", !0);
                      }
                    }
                    function g(t, e) {
                      for (var n = 0; n < e.length - 1; ++n)
                        e[n].push("From previous event:"),
                          (e[n] = e[n].join("\n"));
                      return (
                        n < e.length && (e[n] = e[n].join("\n")),
                        t + "\n" + e.join("\n")
                      );
                    }
                    function b(t) {
                      for (var e = 0; e < t.length; ++e)
                        (0 === t[e].length ||
                          (e + 1 < t.length && t[e][0] === t[e + 1][0])) &&
                          (t.splice(e, 1), e--);
                    }
                    function w(t) {
                      for (var e = t[0], n = 1; n < t.length; ++n) {
                        for (
                          var r = t[n],
                            i = e.length - 1,
                            o = e[i],
                            s = -1,
                            a = r.length - 1;
                          a >= 0;
                          --a
                        )
                          if (r[a] === o) {
                            s = a;
                            break;
                          }
                        for (var a = s; a >= 0; --a) {
                          var c = r[a];
                          if (e[i] !== c) break;
                          e.pop(), i--;
                        }
                        e = r;
                      }
                    }
                    function C(t) {
                      for (var e = [], n = 0; n < t.length; ++n) {
                        var r = t[n],
                          i = "    (No stack trace)" === r || $.test(r),
                          o = i && rt(r);
                        i &&
                          !o &&
                          (W && " " !== r.charAt(0) && (r = "    " + r),
                          e.push(r));
                      }
                      return e;
                    }
                    function T(t) {
                      for (
                        var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0;
                        n < e.length;
                        ++n
                      ) {
                        var r = e[n];
                        if ("    (No stack trace)" === r || $.test(r)) break;
                      }
                      return (
                        n > 0 && "SyntaxError" != t.name && (e = e.slice(n)), e
                      );
                    }
                    function E(t) {
                      var e = t.stack,
                        n = t.toString();
                      return (
                        (e =
                          "string" == typeof e && e.length > 0
                            ? T(t)
                            : ["    (No stack trace)"]),
                        {
                          message: n,
                          stack: "SyntaxError" == t.name ? e : C(e),
                        }
                      );
                    }
                    function F(t, e, n) {
                      if ("undefined" != typeof console) {
                        var r;
                        if (L.isObject(t)) {
                          var i = t.stack;
                          r = e + Q(i, t);
                        } else r = e + String(t);
                        "function" == typeof B
                          ? B(r, n)
                          : ("function" != typeof console.log &&
                              "object" != typeof console.log) ||
                            console.log(r);
                      }
                    }
                    function P(t, e, n, r) {
                      var i = !1;
                      try {
                        "function" == typeof e &&
                          ((i = !0), "rejectionHandled" === t ? e(r) : e(n, r));
                      } catch (t) {
                        N.throwLater(t);
                      }
                      "unhandledRejection" === t
                        ? et(t, n, r) || i || F(n, "Unhandled rejection ")
                        : et(t, r);
                    }
                    function j(t) {
                      var e;
                      if ("function" == typeof t)
                        e = "[function " + (t.name || "anonymous") + "]";
                      else {
                        e =
                          t && "function" == typeof t.toString
                            ? t.toString()
                            : L.toString(t);
                        var n = /\[object [a-zA-Z0-9$_]+\]/;
                        if (n.test(e))
                          try {
                            var r = JSON.stringify(t);
                            e = r;
                          } catch (t) {}
                        0 === e.length && (e = "(empty array)");
                      }
                      return "(<" + k(e) + ">, no stack trace)";
                    }
                    function k(t) {
                      var e = 41;
                      return t.length < e ? t : t.substr(0, e - 3) + "...";
                    }
                    function x() {
                      return "function" == typeof ot;
                    }
                    function S(t) {
                      var e = t.match(it);
                      if (e)
                        return { fileName: e[1], line: parseInt(e[2], 10) };
                    }
                    function O(t, e) {
                      if (x()) {
                        for (
                          var n,
                            r,
                            i = t.stack.split("\n"),
                            o = e.stack.split("\n"),
                            s = -1,
                            a = -1,
                            c = 0;
                          c < i.length;
                          ++c
                        ) {
                          var u = S(i[c]);
                          if (u) {
                            (n = u.fileName), (s = u.line);
                            break;
                          }
                        }
                        for (var c = 0; c < o.length; ++c) {
                          var u = S(o[c]);
                          if (u) {
                            (r = u.fileName), (a = u.line);
                            break;
                          }
                        }
                        s < 0 ||
                          a < 0 ||
                          !n ||
                          !r ||
                          n !== r ||
                          s >= a ||
                          (rt = function (t) {
                            if (U.test(t)) return !0;
                            var e = S(t);
                            return !!(
                              e &&
                              e.fileName === n &&
                              s <= e.line &&
                              e.line <= a
                            );
                          });
                      }
                    }
                    function R(t) {
                      (this._parent = t), (this._promisesCreated = 0);
                      var e = (this._length =
                        1 + (void 0 === t ? 0 : t._length));
                      ot(this, R), e > 32 && this.uncycle();
                    }
                    var A,
                      V,
                      B,
                      I = n._getDomain,
                      N = n._async,
                      D = t("./errors").Warning,
                      L = t("./util"),
                      H = L.canAttachTrace,
                      U =
                        /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
                      M = /\((?:timers\.js):\d+:\d+\)/,
                      q = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
                      $ = null,
                      Q = null,
                      W = !1,
                      z = !(0 == L.env("BLUEBIRD_DEBUG")),
                      G = !(
                        0 == L.env("BLUEBIRD_WARNINGS") ||
                        (!z && !L.env("BLUEBIRD_WARNINGS"))
                      ),
                      X = !(
                        0 == L.env("BLUEBIRD_LONG_STACK_TRACES") ||
                        (!z && !L.env("BLUEBIRD_LONG_STACK_TRACES"))
                      ),
                      K =
                        0 != L.env("BLUEBIRD_W_FORGOTTEN_RETURN") &&
                        (G || !!L.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
                    (n.prototype.suppressUnhandledRejections = function () {
                      var t = this._target();
                      t._bitField = (t._bitField & -1048577) | 524288;
                    }),
                      (n.prototype._ensurePossibleRejectionHandled =
                        function () {
                          0 === (524288 & this._bitField) &&
                            (this._setRejectionIsUnhandled(),
                            N.invokeLater(
                              this._notifyUnhandledRejection,
                              this,
                              void 0
                            ));
                        }),
                      (n.prototype._notifyUnhandledRejectionIsHandled =
                        function () {
                          P("rejectionHandled", A, void 0, this);
                        }),
                      (n.prototype._setReturnedNonUndefined = function () {
                        this._bitField = 268435456 | this._bitField;
                      }),
                      (n.prototype._returnedNonUndefined = function () {
                        return 0 !== (268435456 & this._bitField);
                      }),
                      (n.prototype._notifyUnhandledRejection = function () {
                        if (this._isRejectionUnhandled()) {
                          var t = this._settledValue();
                          this._setUnhandledRejectionIsNotified(),
                            P("unhandledRejection", V, t, this);
                        }
                      }),
                      (n.prototype._setUnhandledRejectionIsNotified =
                        function () {
                          this._bitField = 262144 | this._bitField;
                        }),
                      (n.prototype._unsetUnhandledRejectionIsNotified =
                        function () {
                          this._bitField = this._bitField & -262145;
                        }),
                      (n.prototype._isUnhandledRejectionNotified = function () {
                        return (262144 & this._bitField) > 0;
                      }),
                      (n.prototype._setRejectionIsUnhandled = function () {
                        this._bitField = 1048576 | this._bitField;
                      }),
                      (n.prototype._unsetRejectionIsUnhandled = function () {
                        (this._bitField = this._bitField & -1048577),
                          this._isUnhandledRejectionNotified() &&
                            (this._unsetUnhandledRejectionIsNotified(),
                            this._notifyUnhandledRejectionIsHandled());
                      }),
                      (n.prototype._isRejectionUnhandled = function () {
                        return (1048576 & this._bitField) > 0;
                      }),
                      (n.prototype._warn = function (t, e, n) {
                        return m(t, e, n || this);
                      }),
                      (n.onPossiblyUnhandledRejection = function (t) {
                        var e = I();
                        V =
                          "function" == typeof t
                            ? null === e
                              ? t
                              : L.domainBind(e, t)
                            : void 0;
                      }),
                      (n.onUnhandledRejectionHandled = function (t) {
                        var e = I();
                        A =
                          "function" == typeof t
                            ? null === e
                              ? t
                              : L.domainBind(e, t)
                            : void 0;
                      });
                    var Z = function () {};
                    (n.longStackTraces = function () {
                      if (N.haveItemsQueued() && !st.longStackTraces)
                        throw new Error(
                          "cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n"
                        );
                      if (!st.longStackTraces && x()) {
                        var t = n.prototype._captureStackTrace,
                          e = n.prototype._attachExtraTrace;
                        (st.longStackTraces = !0),
                          (Z = function () {
                            if (N.haveItemsQueued() && !st.longStackTraces)
                              throw new Error(
                                "cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n"
                              );
                            (n.prototype._captureStackTrace = t),
                              (n.prototype._attachExtraTrace = e),
                              r.deactivateLongStackTraces(),
                              N.enableTrampoline(),
                              (st.longStackTraces = !1);
                          }),
                          (n.prototype._captureStackTrace = d),
                          (n.prototype._attachExtraTrace = _),
                          r.activateLongStackTraces(),
                          N.disableTrampolineIfNecessary();
                      }
                    }),
                      (n.hasLongStackTraces = function () {
                        return st.longStackTraces && x();
                      });
                    var J = (function () {
                        try {
                          if ("function" == typeof CustomEvent) {
                            var t = new CustomEvent("CustomEvent");
                            return (
                              L.global.dispatchEvent(t),
                              function (t, e) {
                                var n = new CustomEvent(t.toLowerCase(), {
                                  detail: e,
                                  cancelable: !0,
                                });
                                return !L.global.dispatchEvent(n);
                              }
                            );
                          }
                          if ("function" == typeof Event) {
                            var t = new Event("CustomEvent");
                            return (
                              L.global.dispatchEvent(t),
                              function (t, e) {
                                var n = new Event(t.toLowerCase(), {
                                  cancelable: !0,
                                });
                                return (
                                  (n.detail = e), !L.global.dispatchEvent(n)
                                );
                              }
                            );
                          }
                          var t = document.createEvent("CustomEvent");
                          return (
                            t.initCustomEvent("testingtheevent", !1, !0, {}),
                            L.global.dispatchEvent(t),
                            function (t, e) {
                              var n = document.createEvent("CustomEvent");
                              return (
                                n.initCustomEvent(t.toLowerCase(), !1, !0, e),
                                !L.global.dispatchEvent(n)
                              );
                            }
                          );
                        } catch (t) {}
                        return function () {
                          return !1;
                        };
                      })(),
                      Y = (function () {
                        return L.isNode
                          ? function () {
                              return e.emit.apply(e, arguments);
                            }
                          : L.global
                          ? function (t) {
                              var e = "on" + t.toLowerCase(),
                                n = L.global[e];
                              return (
                                !!n &&
                                (n.apply(L.global, [].slice.call(arguments, 1)),
                                !0)
                              );
                            }
                          : function () {
                              return !1;
                            };
                      })(),
                      tt = {
                        promiseCreated: i,
                        promiseFulfilled: i,
                        promiseRejected: i,
                        promiseResolved: i,
                        promiseCancelled: i,
                        promiseChained: function (t, e, n) {
                          return { promise: e, child: n };
                        },
                        warning: function (t, e) {
                          return { warning: e };
                        },
                        unhandledRejection: function (t, e, n) {
                          return { reason: e, promise: n };
                        },
                        rejectionHandled: i,
                      },
                      et = function (t) {
                        var e = !1;
                        try {
                          e = Y.apply(null, arguments);
                        } catch (t) {
                          N.throwLater(t), (e = !0);
                        }
                        var n = !1;
                        try {
                          n = J(t, tt[t].apply(null, arguments));
                        } catch (t) {
                          N.throwLater(t), (n = !0);
                        }
                        return n || e;
                      };
                    (n.config = function (t) {
                      if (
                        ((t = Object(t)),
                        "longStackTraces" in t &&
                          (t.longStackTraces
                            ? n.longStackTraces()
                            : !t.longStackTraces &&
                              n.hasLongStackTraces() &&
                              Z()),
                        "warnings" in t)
                      ) {
                        var e = t.warnings;
                        (st.warnings = !!e),
                          (K = st.warnings),
                          L.isObject(e) &&
                            "wForgottenReturn" in e &&
                            (K = !!e.wForgottenReturn);
                      }
                      if (
                        "cancellation" in t &&
                        t.cancellation &&
                        !st.cancellation
                      ) {
                        if (N.haveItemsQueued())
                          throw new Error(
                            "cannot enable cancellation after promises are in use"
                          );
                        (n.prototype._clearCancellationData = l),
                          (n.prototype._propagateFrom = p),
                          (n.prototype._onCancel = c),
                          (n.prototype._setOnCancel = u),
                          (n.prototype._attachCancellationCallback = a),
                          (n.prototype._execute = s),
                          (nt = p),
                          (st.cancellation = !0);
                      }
                      return (
                        "monitoring" in t &&
                          (t.monitoring && !st.monitoring
                            ? ((st.monitoring = !0),
                              (n.prototype._fireEvent = et))
                            : !t.monitoring &&
                              st.monitoring &&
                              ((st.monitoring = !1),
                              (n.prototype._fireEvent = o))),
                        n
                      );
                    }),
                      (n.prototype._fireEvent = o),
                      (n.prototype._execute = function (t, e, n) {
                        try {
                          t(e, n);
                        } catch (t) {
                          return t;
                        }
                      }),
                      (n.prototype._onCancel = function () {}),
                      (n.prototype._setOnCancel = function (t) {}),
                      (n.prototype._attachCancellationCallback = function (
                        t
                      ) {}),
                      (n.prototype._captureStackTrace = function () {}),
                      (n.prototype._attachExtraTrace = function () {}),
                      (n.prototype._clearCancellationData = function () {}),
                      (n.prototype._propagateFrom = function (t, e) {});
                    var nt = h,
                      rt = function () {
                        return !1;
                      },
                      it = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                    L.inherits(R, Error),
                      (r.CapturedTrace = R),
                      (R.prototype.uncycle = function () {
                        var t = this._length;
                        if (!(t < 2)) {
                          for (
                            var e = [], n = {}, r = 0, i = this;
                            void 0 !== i;
                            ++r
                          )
                            e.push(i), (i = i._parent);
                          t = this._length = r;
                          for (var r = t - 1; r >= 0; --r) {
                            var o = e[r].stack;
                            void 0 === n[o] && (n[o] = r);
                          }
                          for (var r = 0; r < t; ++r) {
                            var s = e[r].stack,
                              a = n[s];
                            if (void 0 !== a && a !== r) {
                              a > 0 &&
                                ((e[a - 1]._parent = void 0),
                                (e[a - 1]._length = 1)),
                                (e[r]._parent = void 0),
                                (e[r]._length = 1);
                              var c = r > 0 ? e[r - 1] : this;
                              a < t - 1
                                ? ((c._parent = e[a + 1]),
                                  c._parent.uncycle(),
                                  (c._length = c._parent._length + 1))
                                : ((c._parent = void 0), (c._length = 1));
                              for (
                                var u = c._length + 1, l = r - 2;
                                l >= 0;
                                --l
                              )
                                (e[l]._length = u), u++;
                              return;
                            }
                          }
                        }
                      }),
                      (R.prototype.attachExtraTrace = function (t) {
                        if (!t.__stackCleaned__) {
                          this.uncycle();
                          for (
                            var e = E(t),
                              n = e.message,
                              r = [e.stack],
                              i = this;
                            void 0 !== i;

                          )
                            r.push(C(i.stack.split("\n"))), (i = i._parent);
                          w(r),
                            b(r),
                            L.notEnumerableProp(t, "stack", g(n, r)),
                            L.notEnumerableProp(t, "__stackCleaned__", !0);
                        }
                      });
                    var ot = (function () {
                      var t = /^\s*at\s*/,
                        e = function (t, e) {
                          return "string" == typeof t
                            ? t
                            : void 0 !== e.name && void 0 !== e.message
                            ? e.toString()
                            : j(e);
                        };
                      if (
                        "number" == typeof Error.stackTraceLimit &&
                        "function" == typeof Error.captureStackTrace
                      ) {
                        (Error.stackTraceLimit += 6), ($ = t), (Q = e);
                        var n = Error.captureStackTrace;
                        return (
                          (rt = function (t) {
                            return U.test(t);
                          }),
                          function (t, e) {
                            (Error.stackTraceLimit += 6),
                              n(t, e),
                              (Error.stackTraceLimit -= 6);
                          }
                        );
                      }
                      var r = new Error();
                      if (
                        "string" == typeof r.stack &&
                        r.stack.split("\n")[0].indexOf("stackDetection@") >= 0
                      )
                        return (
                          ($ = /@/),
                          (Q = e),
                          (W = !0),
                          function (t) {
                            t.stack = new Error().stack;
                          }
                        );
                      var i;
                      try {
                        throw new Error();
                      } catch (t) {
                        i = "stack" in t;
                      }
                      return "stack" in r ||
                        !i ||
                        "number" != typeof Error.stackTraceLimit
                        ? ((Q = function (t, e) {
                            return "string" == typeof t
                              ? t
                              : ("object" != typeof e &&
                                  "function" != typeof e) ||
                                void 0 === e.name ||
                                void 0 === e.message
                              ? j(e)
                              : e.toString();
                          }),
                          null)
                        : (($ = t),
                          (Q = e),
                          function (t) {
                            Error.stackTraceLimit += 6;
                            try {
                              throw new Error();
                            } catch (e) {
                              t.stack = e.stack;
                            }
                            Error.stackTraceLimit -= 6;
                          });
                    })([]);
                    "undefined" != typeof console &&
                      "undefined" != typeof console.warn &&
                      ((B = function (t) {
                        console.warn(t);
                      }),
                      L.isNode && e.stderr.isTTY
                        ? (B = function (t, e) {
                            var n = e ? "[33m" : "[31m";
                            console.warn(n + t + "[0m\n");
                          })
                        : L.isNode ||
                          "string" != typeof new Error().stack ||
                          (B = function (t, e) {
                            console.warn(
                              "%c" + t,
                              e ? "color: darkorange" : "color: red"
                            );
                          }));
                    var st = {
                      warnings: G,
                      longStackTraces: !1,
                      cancellation: !1,
                      monitoring: !1,
                    };
                    return (
                      X && n.longStackTraces(),
                      {
                        longStackTraces: function () {
                          return st.longStackTraces;
                        },
                        warnings: function () {
                          return st.warnings;
                        },
                        cancellation: function () {
                          return st.cancellation;
                        },
                        monitoring: function () {
                          return st.monitoring;
                        },
                        propagateFromFunction: function () {
                          return nt;
                        },
                        boundValueFunction: function () {
                          return f;
                        },
                        checkForgottenReturns: v,
                        setBounds: O,
                        warn: m,
                        deprecated: y,
                        CapturedTrace: R,
                        fireDomEvent: J,
                        fireGlobalEvent: Y,
                      }
                    );
                  };
                },
                { "./errors": 12, "./util": 36 },
              ],
              10: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (t) {
                    function e() {
                      return this.value;
                    }
                    function n() {
                      throw this.reason;
                    }
                    (t.prototype.return = t.prototype.thenReturn =
                      function (n) {
                        return (
                          n instanceof t && n.suppressUnhandledRejections(),
                          this._then(e, void 0, void 0, { value: n }, void 0)
                        );
                      }),
                      (t.prototype.throw = t.prototype.thenThrow =
                        function (t) {
                          return this._then(
                            n,
                            void 0,
                            void 0,
                            { reason: t },
                            void 0
                          );
                        }),
                      (t.prototype.catchThrow = function (t) {
                        if (arguments.length <= 1)
                          return this._then(
                            void 0,
                            n,
                            void 0,
                            { reason: t },
                            void 0
                          );
                        var e = arguments[1],
                          r = function () {
                            throw e;
                          };
                        return this.caught(t, r);
                      }),
                      (t.prototype.catchReturn = function (n) {
                        if (arguments.length <= 1)
                          return (
                            n instanceof t && n.suppressUnhandledRejections(),
                            this._then(void 0, e, void 0, { value: n }, void 0)
                          );
                        var r = arguments[1];
                        r instanceof t && r.suppressUnhandledRejections();
                        var i = function () {
                          return r;
                        };
                        return this.caught(n, i);
                      });
                  };
                },
                {},
              ],
              11: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (t, e) {
                    function n() {
                      return o(this);
                    }
                    function r(t, n) {
                      return i(t, n, e, e);
                    }
                    var i = t.reduce,
                      o = t.all;
                    (t.prototype.each = function (t) {
                      return i(this, t, e, 0)._then(
                        n,
                        void 0,
                        void 0,
                        this,
                        void 0
                      );
                    }),
                      (t.prototype.mapSeries = function (t) {
                        return i(this, t, e, e);
                      }),
                      (t.each = function (t, r) {
                        return i(t, r, e, 0)._then(
                          n,
                          void 0,
                          void 0,
                          t,
                          void 0
                        );
                      }),
                      (t.mapSeries = r);
                  };
                },
                {},
              ],
              12: [
                function (t, e, n) {
                  "use strict";
                  function r(t, e) {
                    function n(r) {
                      return this instanceof n
                        ? (p(this, "message", "string" == typeof r ? r : e),
                          p(this, "name", t),
                          void (Error.captureStackTrace
                            ? Error.captureStackTrace(this, this.constructor)
                            : Error.call(this)))
                        : new n(r);
                    }
                    return l(n, Error), n;
                  }
                  function i(t) {
                    return this instanceof i
                      ? (p(this, "name", "OperationalError"),
                        p(this, "message", t),
                        (this.cause = t),
                        (this.isOperational = !0),
                        void (t instanceof Error
                          ? (p(this, "message", t.message),
                            p(this, "stack", t.stack))
                          : Error.captureStackTrace &&
                            Error.captureStackTrace(this, this.constructor)))
                      : new i(t);
                  }
                  var o,
                    s,
                    a = t("./es5"),
                    c = a.freeze,
                    u = t("./util"),
                    l = u.inherits,
                    p = u.notEnumerableProp,
                    h = r("Warning", "warning"),
                    f = r("CancellationError", "cancellation error"),
                    d = r("TimeoutError", "timeout error"),
                    _ = r("AggregateError", "aggregate error");
                  try {
                    (o = TypeError), (s = RangeError);
                  } catch (t) {
                    (o = r("TypeError", "type error")),
                      (s = r("RangeError", "range error"));
                  }
                  for (
                    var v =
                        "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(
                          " "
                        ),
                      y = 0;
                    y < v.length;
                    ++y
                  )
                    "function" == typeof Array.prototype[v[y]] &&
                      (_.prototype[v[y]] = Array.prototype[v[y]]);
                  a.defineProperty(_.prototype, "length", {
                    value: 0,
                    configurable: !1,
                    writable: !0,
                    enumerable: !0,
                  }),
                    (_.prototype.isOperational = !0);
                  var m = 0;
                  (_.prototype.toString = function () {
                    var t = Array(4 * m + 1).join(" "),
                      e = "\n" + t + "AggregateError of:\n";
                    m++, (t = Array(4 * m + 1).join(" "));
                    for (var n = 0; n < this.length; ++n) {
                      for (
                        var r =
                            this[n] === this
                              ? "[Circular AggregateError]"
                              : this[n] + "",
                          i = r.split("\n"),
                          o = 0;
                        o < i.length;
                        ++o
                      )
                        i[o] = t + i[o];
                      (r = i.join("\n")), (e += r + "\n");
                    }
                    return m--, e;
                  }),
                    l(i, Error);
                  var g = Error.__BluebirdErrorTypes__;
                  g ||
                    ((g = c({
                      CancellationError: f,
                      TimeoutError: d,
                      OperationalError: i,
                      RejectionError: i,
                      AggregateError: _,
                    })),
                    a.defineProperty(Error, "__BluebirdErrorTypes__", {
                      value: g,
                      writable: !1,
                      enumerable: !1,
                      configurable: !1,
                    })),
                    (e.exports = {
                      Error: Error,
                      TypeError: o,
                      RangeError: s,
                      CancellationError: g.CancellationError,
                      OperationalError: g.OperationalError,
                      TimeoutError: g.TimeoutError,
                      AggregateError: g.AggregateError,
                      Warning: h,
                    });
                },
                { "./es5": 13, "./util": 36 },
              ],
              13: [
                function (t, e, n) {
                  var r = (function () {
                    "use strict";
                    return void 0 === this;
                  })();
                  if (r)
                    e.exports = {
                      freeze: Object.freeze,
                      defineProperty: Object.defineProperty,
                      getDescriptor: Object.getOwnPropertyDescriptor,
                      keys: Object.keys,
                      names: Object.getOwnPropertyNames,
                      getPrototypeOf: Object.getPrototypeOf,
                      isArray: Array.isArray,
                      isES5: r,
                      propertyIsWritable: function (t, e) {
                        var n = Object.getOwnPropertyDescriptor(t, e);
                        return !(n && !n.writable && !n.set);
                      },
                    };
                  else {
                    var i = {}.hasOwnProperty,
                      o = {}.toString,
                      s = {}.constructor.prototype,
                      a = function (t) {
                        var e = [];
                        for (var n in t) i.call(t, n) && e.push(n);
                        return e;
                      },
                      c = function (t, e) {
                        return { value: t[e] };
                      },
                      u = function (t, e, n) {
                        return (t[e] = n.value), t;
                      },
                      l = function (t) {
                        return t;
                      },
                      p = function (t) {
                        try {
                          return Object(t).constructor.prototype;
                        } catch (t) {
                          return s;
                        }
                      },
                      h = function (t) {
                        try {
                          return "[object Array]" === o.call(t);
                        } catch (t) {
                          return !1;
                        }
                      };
                    e.exports = {
                      isArray: h,
                      keys: a,
                      names: a,
                      defineProperty: u,
                      getDescriptor: c,
                      freeze: l,
                      getPrototypeOf: p,
                      isES5: r,
                      propertyIsWritable: function () {
                        return !0;
                      },
                    };
                  }
                },
                {},
              ],
              14: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (t, e) {
                    var n = t.map;
                    (t.prototype.filter = function (t, r) {
                      return n(this, t, r, e);
                    }),
                      (t.filter = function (t, r, i) {
                        return n(t, r, i, e);
                      });
                  };
                },
                {},
              ],
              15: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n) {
                    function r(t, e, n) {
                      (this.promise = t),
                        (this.type = e),
                        (this.handler = n),
                        (this.called = !1),
                        (this.cancelPromise = null);
                    }
                    function i(t) {
                      this.finallyHandler = t;
                    }
                    function o(t, e) {
                      return (
                        null != t.cancelPromise &&
                        (arguments.length > 1
                          ? t.cancelPromise._reject(e)
                          : t.cancelPromise._cancel(),
                        (t.cancelPromise = null),
                        !0)
                      );
                    }
                    function s() {
                      return c.call(
                        this,
                        this.promise._target()._settledValue()
                      );
                    }
                    function a(t) {
                      if (!o(this, t)) return (p.e = t), p;
                    }
                    function c(t) {
                      var r = this.promise,
                        c = this.handler;
                      if (!this.called) {
                        this.called = !0;
                        var u = this.isFinallyHandler()
                          ? c.call(r._boundValue())
                          : c.call(r._boundValue(), t);
                        if (void 0 !== u) {
                          r._setReturnedNonUndefined();
                          var h = n(u, r);
                          if (h instanceof e) {
                            if (null != this.cancelPromise) {
                              if (h._isCancelled()) {
                                var f = new l("late cancellation observer");
                                return r._attachExtraTrace(f), (p.e = f), p;
                              }
                              h.isPending() &&
                                h._attachCancellationCallback(new i(this));
                            }
                            return h._then(s, a, void 0, this, void 0);
                          }
                        }
                      }
                      return r.isRejected()
                        ? (o(this), (p.e = t), p)
                        : (o(this), t);
                    }
                    var u = t("./util"),
                      l = e.CancellationError,
                      p = u.errorObj;
                    return (
                      (r.prototype.isFinallyHandler = function () {
                        return 0 === this.type;
                      }),
                      (i.prototype._resultCancelled = function () {
                        o(this.finallyHandler);
                      }),
                      (e.prototype._passThrough = function (t, e, n, i) {
                        return "function" != typeof t
                          ? this.then()
                          : this._then(n, i, void 0, new r(this, e, t), void 0);
                      }),
                      (e.prototype.lastly = e.prototype.finally =
                        function (t) {
                          return this._passThrough(t, 0, c, c);
                        }),
                      (e.prototype.tap = function (t) {
                        return this._passThrough(t, 1, c);
                      }),
                      r
                    );
                  };
                },
                { "./util": 36 },
              ],
              16: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i, o, s) {
                    function a(t, n, r) {
                      for (var o = 0; o < n.length; ++o) {
                        r._pushContext();
                        var s = f(n[o])(t);
                        if ((r._popContext(), s === h)) {
                          r._pushContext();
                          var a = e.reject(h.e);
                          return r._popContext(), a;
                        }
                        var c = i(s, r);
                        if (c instanceof e) return c;
                      }
                      return null;
                    }
                    function c(t, n, i, o) {
                      if (s.cancellation()) {
                        var a = new e(r),
                          c = (this._finallyPromise = new e(r));
                        (this._promise = a.lastly(function () {
                          return c;
                        })),
                          a._captureStackTrace(),
                          a._setOnCancel(this);
                      } else {
                        var u = (this._promise = new e(r));
                        u._captureStackTrace();
                      }
                      (this._stack = o),
                        (this._generatorFunction = t),
                        (this._receiver = n),
                        (this._generator = void 0),
                        (this._yieldHandlers =
                          "function" == typeof i ? [i].concat(d) : d),
                        (this._yieldedPromise = null),
                        (this._cancellationPhase = !1);
                    }
                    var u = t("./errors"),
                      l = u.TypeError,
                      p = t("./util"),
                      h = p.errorObj,
                      f = p.tryCatch,
                      d = [];
                    p.inherits(c, o),
                      (c.prototype._isResolved = function () {
                        return null === this._promise;
                      }),
                      (c.prototype._cleanup = function () {
                        (this._promise = this._generator = null),
                          s.cancellation() &&
                            null !== this._finallyPromise &&
                            (this._finallyPromise._fulfill(),
                            (this._finallyPromise = null));
                      }),
                      (c.prototype._promiseCancelled = function () {
                        if (!this._isResolved()) {
                          var t,
                            n = "undefined" != typeof this._generator.return;
                          if (n)
                            this._promise._pushContext(),
                              (t = f(this._generator.return).call(
                                this._generator,
                                void 0
                              )),
                              this._promise._popContext();
                          else {
                            var r = new e.CancellationError(
                              "generator .return() sentinel"
                            );
                            (e.coroutine.returnSentinel = r),
                              this._promise._attachExtraTrace(r),
                              this._promise._pushContext(),
                              (t = f(this._generator.throw).call(
                                this._generator,
                                r
                              )),
                              this._promise._popContext();
                          }
                          (this._cancellationPhase = !0),
                            (this._yieldedPromise = null),
                            this._continue(t);
                        }
                      }),
                      (c.prototype._promiseFulfilled = function (t) {
                        (this._yieldedPromise = null),
                          this._promise._pushContext();
                        var e = f(this._generator.next).call(
                          this._generator,
                          t
                        );
                        this._promise._popContext(), this._continue(e);
                      }),
                      (c.prototype._promiseRejected = function (t) {
                        (this._yieldedPromise = null),
                          this._promise._attachExtraTrace(t),
                          this._promise._pushContext();
                        var e = f(this._generator.throw).call(
                          this._generator,
                          t
                        );
                        this._promise._popContext(), this._continue(e);
                      }),
                      (c.prototype._resultCancelled = function () {
                        if (this._yieldedPromise instanceof e) {
                          var t = this._yieldedPromise;
                          (this._yieldedPromise = null), t.cancel();
                        }
                      }),
                      (c.prototype.promise = function () {
                        return this._promise;
                      }),
                      (c.prototype._run = function () {
                        (this._generator = this._generatorFunction.call(
                          this._receiver
                        )),
                          (this._receiver = this._generatorFunction = void 0),
                          this._promiseFulfilled(void 0);
                      }),
                      (c.prototype._continue = function (t) {
                        var n = this._promise;
                        if (t === h)
                          return (
                            this._cleanup(),
                            this._cancellationPhase
                              ? n.cancel()
                              : n._rejectCallback(t.e, !1)
                          );
                        var r = t.value;
                        if (t.done === !0)
                          return (
                            this._cleanup(),
                            this._cancellationPhase
                              ? n.cancel()
                              : n._resolveCallback(r)
                          );
                        var o = i(r, this._promise);
                        if (
                          !(o instanceof e) &&
                          ((o = a(o, this._yieldHandlers, this._promise)),
                          null === o)
                        )
                          return void this._promiseRejected(
                            new l(
                              "A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace(
                                "%s",
                                r
                              ) +
                                "From coroutine:\n" +
                                this._stack.split("\n").slice(1, -7).join("\n")
                            )
                          );
                        o = o._target();
                        var s = o._bitField;
                        0 === (50397184 & s)
                          ? ((this._yieldedPromise = o), o._proxy(this, null))
                          : 0 !== (33554432 & s)
                          ? e._async.invoke(
                              this._promiseFulfilled,
                              this,
                              o._value()
                            )
                          : 0 !== (16777216 & s)
                          ? e._async.invoke(
                              this._promiseRejected,
                              this,
                              o._reason()
                            )
                          : this._promiseCancelled();
                      }),
                      (e.coroutine = function (t, e) {
                        if ("function" != typeof t)
                          throw new l(
                            "generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n"
                          );
                        var n = Object(e).yieldHandler,
                          r = c,
                          i = new Error().stack;
                        return function () {
                          var e = t.apply(this, arguments),
                            o = new r(void 0, void 0, n, i),
                            s = o.promise();
                          return (
                            (o._generator = e), o._promiseFulfilled(void 0), s
                          );
                        };
                      }),
                      (e.coroutine.addYieldHandler = function (t) {
                        if ("function" != typeof t)
                          throw new l(
                            "expecting a function but got " + p.classString(t)
                          );
                        d.push(t);
                      }),
                      (e.spawn = function (t) {
                        if (
                          (s.deprecated(
                            "Promise.spawn()",
                            "Promise.coroutine()"
                          ),
                          "function" != typeof t)
                        )
                          return n(
                            "generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n"
                          );
                        var r = new c(t, this),
                          i = r.promise();
                        return r._run(e.spawn), i;
                      });
                  };
                },
                { "./errors": 12, "./util": 36 },
              ],
              17: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i, o, s) {
                    var a = t("./util");
                    a.canEvaluate, a.tryCatch, a.errorObj;
                    e.join = function () {
                      var t,
                        e = arguments.length - 1;
                      if (e > 0 && "function" == typeof arguments[e]) {
                        t = arguments[e];
                        var r;
                      }
                      var i = [].slice.call(arguments);
                      t && i.pop();
                      var r = new n(i).promise();
                      return void 0 !== t ? r.spread(t) : r;
                    };
                  };
                },
                { "./util": 36 },
              ],
              18: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i, o, s) {
                    function a(t, e, n, r) {
                      this.constructor$(t), this._promise._captureStackTrace();
                      var i = u();
                      (this._callback = null === i ? e : l.domainBind(i, e)),
                        (this._preservedValues =
                          r === o ? new Array(this.length()) : null),
                        (this._limit = n),
                        (this._inFlight = 0),
                        (this._queue = []),
                        f.invoke(this._asyncInit, this, void 0);
                    }
                    function c(t, n, i, o) {
                      if ("function" != typeof n)
                        return r(
                          "expecting a function but got " + l.classString(n)
                        );
                      var s = 0;
                      if (void 0 !== i) {
                        if ("object" != typeof i || null === i)
                          return e.reject(
                            new TypeError(
                              "options argument must be an object but it is " +
                                l.classString(i)
                            )
                          );
                        if ("number" != typeof i.concurrency)
                          return e.reject(
                            new TypeError(
                              "'concurrency' must be a number but it is " +
                                l.classString(i.concurrency)
                            )
                          );
                        s = i.concurrency;
                      }
                      return (
                        (s =
                          "number" == typeof s && isFinite(s) && s >= 1
                            ? s
                            : 0),
                        new a(t, n, s, o).promise()
                      );
                    }
                    var u = e._getDomain,
                      l = t("./util"),
                      p = l.tryCatch,
                      h = l.errorObj,
                      f = e._async;
                    l.inherits(a, n),
                      (a.prototype._asyncInit = function () {
                        this._init$(void 0, -2);
                      }),
                      (a.prototype._init = function () {}),
                      (a.prototype._promiseFulfilled = function (t, n) {
                        var r = this._values,
                          o = this.length(),
                          a = this._preservedValues,
                          c = this._limit;
                        if (n < 0) {
                          if (
                            ((n = n * -1 - 1),
                            (r[n] = t),
                            c >= 1 &&
                              (this._inFlight--,
                              this._drainQueue(),
                              this._isResolved()))
                          )
                            return !0;
                        } else {
                          if (c >= 1 && this._inFlight >= c)
                            return (r[n] = t), this._queue.push(n), !1;
                          null !== a && (a[n] = t);
                          var u = this._promise,
                            l = this._callback,
                            f = u._boundValue();
                          u._pushContext();
                          var d = p(l).call(f, t, n, o),
                            _ = u._popContext();
                          if (
                            (s.checkForgottenReturns(
                              d,
                              _,
                              null !== a ? "Promise.filter" : "Promise.map",
                              u
                            ),
                            d === h)
                          )
                            return this._reject(d.e), !0;
                          var v = i(d, this._promise);
                          if (v instanceof e) {
                            v = v._target();
                            var y = v._bitField;
                            if (0 === (50397184 & y))
                              return (
                                c >= 1 && this._inFlight++,
                                (r[n] = v),
                                v._proxy(this, (n + 1) * -1),
                                !1
                              );
                            if (0 === (33554432 & y))
                              return 0 !== (16777216 & y)
                                ? (this._reject(v._reason()), !0)
                                : (this._cancel(), !0);
                            d = v._value();
                          }
                          r[n] = d;
                        }
                        var m = ++this._totalResolved;
                        return (
                          m >= o &&
                          (null !== a ? this._filter(r, a) : this._resolve(r),
                          !0)
                        );
                      }),
                      (a.prototype._drainQueue = function () {
                        for (
                          var t = this._queue,
                            e = this._limit,
                            n = this._values;
                          t.length > 0 && this._inFlight < e;

                        ) {
                          if (this._isResolved()) return;
                          var r = t.pop();
                          this._promiseFulfilled(n[r], r);
                        }
                      }),
                      (a.prototype._filter = function (t, e) {
                        for (
                          var n = e.length, r = new Array(n), i = 0, o = 0;
                          o < n;
                          ++o
                        )
                          t[o] && (r[i++] = e[o]);
                        (r.length = i), this._resolve(r);
                      }),
                      (a.prototype.preservedValues = function () {
                        return this._preservedValues;
                      }),
                      (e.prototype.map = function (t, e) {
                        return c(this, t, e, null);
                      }),
                      (e.map = function (t, e, n, r) {
                        return c(t, e, n, r);
                      });
                  };
                },
                { "./util": 36 },
              ],
              19: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i, o) {
                    var s = t("./util"),
                      a = s.tryCatch;
                    (e.method = function (t) {
                      if ("function" != typeof t)
                        throw new e.TypeError(
                          "expecting a function but got " + s.classString(t)
                        );
                      return function () {
                        var r = new e(n);
                        r._captureStackTrace(), r._pushContext();
                        var i = a(t).apply(this, arguments),
                          s = r._popContext();
                        return (
                          o.checkForgottenReturns(i, s, "Promise.method", r),
                          r._resolveFromSyncValue(i),
                          r
                        );
                      };
                    }),
                      (e.attempt = e.try =
                        function (t) {
                          if ("function" != typeof t)
                            return i(
                              "expecting a function but got " + s.classString(t)
                            );
                          var r = new e(n);
                          r._captureStackTrace(), r._pushContext();
                          var c;
                          if (arguments.length > 1) {
                            o.deprecated(
                              "calling Promise.try with more than 1 argument"
                            );
                            var u = arguments[1],
                              l = arguments[2];
                            c = s.isArray(u)
                              ? a(t).apply(l, u)
                              : a(t).call(l, u);
                          } else c = a(t)();
                          var p = r._popContext();
                          return (
                            o.checkForgottenReturns(c, p, "Promise.try", r),
                            r._resolveFromSyncValue(c),
                            r
                          );
                        }),
                      (e.prototype._resolveFromSyncValue = function (t) {
                        t === s.errorObj
                          ? this._rejectCallback(t.e, !1)
                          : this._resolveCallback(t, !0);
                      });
                  };
                },
                { "./util": 36 },
              ],
              20: [
                function (t, e, n) {
                  "use strict";
                  function r(t) {
                    return (
                      t instanceof Error &&
                      l.getPrototypeOf(t) === Error.prototype
                    );
                  }
                  function i(t) {
                    var e;
                    if (r(t)) {
                      (e = new u(t)),
                        (e.name = t.name),
                        (e.message = t.message),
                        (e.stack = t.stack);
                      for (var n = l.keys(t), i = 0; i < n.length; ++i) {
                        var o = n[i];
                        p.test(o) || (e[o] = t[o]);
                      }
                      return e;
                    }
                    return s.markAsOriginatingFromRejection(t), t;
                  }
                  function o(t, e) {
                    return function (n, r) {
                      if (null !== t) {
                        if (n) {
                          var o = i(a(n));
                          t._attachExtraTrace(o), t._reject(o);
                        } else if (e) {
                          var s = [].slice.call(arguments, 1);
                          t._fulfill(s);
                        } else t._fulfill(r);
                        t = null;
                      }
                    };
                  }
                  var s = t("./util"),
                    a = s.maybeWrapAsError,
                    c = t("./errors"),
                    u = c.OperationalError,
                    l = t("./es5"),
                    p = /^(?:name|message|stack|cause)$/;
                  e.exports = o;
                },
                { "./errors": 12, "./es5": 13, "./util": 36 },
              ],
              21: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e) {
                    function n(t, e) {
                      var n = this;
                      if (!o.isArray(t)) return r.call(n, t, e);
                      var i = a(e).apply(n._boundValue(), [null].concat(t));
                      i === c && s.throwLater(i.e);
                    }
                    function r(t, e) {
                      var n = this,
                        r = n._boundValue(),
                        i =
                          void 0 === t
                            ? a(e).call(r, null)
                            : a(e).call(r, null, t);
                      i === c && s.throwLater(i.e);
                    }
                    function i(t, e) {
                      var n = this;
                      if (!t) {
                        var r = new Error(t + "");
                        (r.cause = t), (t = r);
                      }
                      var i = a(e).call(n._boundValue(), t);
                      i === c && s.throwLater(i.e);
                    }
                    var o = t("./util"),
                      s = e._async,
                      a = o.tryCatch,
                      c = o.errorObj;
                    e.prototype.asCallback = e.prototype.nodeify = function (
                      t,
                      e
                    ) {
                      if ("function" == typeof t) {
                        var o = r;
                        void 0 !== e && Object(e).spread && (o = n),
                          this._then(o, i, void 0, this, t);
                      }
                      return this;
                    };
                  };
                },
                { "./util": 36 },
              ],
              22: [
                function (t, n, r) {
                  "use strict";
                  n.exports = function () {
                    function r() {}
                    function i(t, e) {
                      if ("function" != typeof e)
                        throw new g(
                          "expecting a function but got " + d.classString(e)
                        );
                      if (t.constructor !== o)
                        throw new g(
                          "the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n"
                        );
                    }
                    function o(t) {
                      (this._bitField = 0),
                        (this._fulfillmentHandler0 = void 0),
                        (this._rejectionHandler0 = void 0),
                        (this._promise0 = void 0),
                        (this._receiver0 = void 0),
                        t !== w && (i(this, t), this._resolveFromExecutor(t)),
                        this._promiseCreated(),
                        this._fireEvent("promiseCreated", this);
                    }
                    function s(t) {
                      this.promise._resolveCallback(t);
                    }
                    function a(t) {
                      this.promise._rejectCallback(t, !1);
                    }
                    function c(t) {
                      var e = new o(w);
                      (e._fulfillmentHandler0 = t),
                        (e._rejectionHandler0 = t),
                        (e._promise0 = t),
                        (e._receiver0 = t);
                    }
                    var u,
                      l = function () {
                        return new g(
                          "circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n"
                        );
                      },
                      p = function () {
                        return new o.PromiseInspection(this._target());
                      },
                      h = function (t) {
                        return o.reject(new g(t));
                      },
                      f = {},
                      d = t("./util");
                    (u = d.isNode
                      ? function () {
                          var t = e.domain;
                          return void 0 === t && (t = null), t;
                        }
                      : function () {
                          return null;
                        }),
                      d.notEnumerableProp(o, "_getDomain", u);
                    var _ = t("./es5"),
                      v = t("./async"),
                      y = new v();
                    _.defineProperty(o, "_async", { value: y });
                    var m = t("./errors"),
                      g = (o.TypeError = m.TypeError);
                    o.RangeError = m.RangeError;
                    var b = (o.CancellationError = m.CancellationError);
                    (o.TimeoutError = m.TimeoutError),
                      (o.OperationalError = m.OperationalError),
                      (o.RejectionError = m.OperationalError),
                      (o.AggregateError = m.AggregateError);
                    var w = function () {},
                      C = {},
                      T = {},
                      E = t("./thenables")(o, w),
                      F = t("./promise_array")(o, w, E, h, r),
                      P = t("./context")(o),
                      j = P.create,
                      k = t("./debuggability")(o, P),
                      x = (k.CapturedTrace, t("./finally")(o, E)),
                      S = t("./catch_filter")(T),
                      O = t("./nodeback"),
                      R = d.errorObj,
                      A = d.tryCatch;
                    return (
                      (o.prototype.toString = function () {
                        return "[object Promise]";
                      }),
                      (o.prototype.caught = o.prototype.catch =
                        function (t) {
                          var e = arguments.length;
                          if (e > 1) {
                            var n,
                              r = new Array(e - 1),
                              i = 0;
                            for (n = 0; n < e - 1; ++n) {
                              var o = arguments[n];
                              if (!d.isObject(o))
                                return h(
                                  "expecting an object but got A catch statement predicate " +
                                    d.classString(o)
                                );
                              r[i++] = o;
                            }
                            return (
                              (r.length = i),
                              (t = arguments[n]),
                              this.then(void 0, S(r, t, this))
                            );
                          }
                          return this.then(void 0, t);
                        }),
                      (o.prototype.reflect = function () {
                        return this._then(p, p, void 0, this, void 0);
                      }),
                      (o.prototype.then = function (t, e) {
                        if (
                          k.warnings() &&
                          arguments.length > 0 &&
                          "function" != typeof t &&
                          "function" != typeof e
                        ) {
                          var n =
                            ".then() only accepts functions but was passed: " +
                            d.classString(t);
                          arguments.length > 1 &&
                            (n += ", " + d.classString(e)),
                            this._warn(n);
                        }
                        return this._then(t, e, void 0, void 0, void 0);
                      }),
                      (o.prototype.done = function (t, e) {
                        var n = this._then(t, e, void 0, void 0, void 0);
                        n._setIsFinal();
                      }),
                      (o.prototype.spread = function (t) {
                        return "function" != typeof t
                          ? h(
                              "expecting a function but got " + d.classString(t)
                            )
                          : this.all()._then(t, void 0, void 0, C, void 0);
                      }),
                      (o.prototype.toJSON = function () {
                        var t = {
                          isFulfilled: !1,
                          isRejected: !1,
                          fulfillmentValue: void 0,
                          rejectionReason: void 0,
                        };
                        return (
                          this.isFulfilled()
                            ? ((t.fulfillmentValue = this.value()),
                              (t.isFulfilled = !0))
                            : this.isRejected() &&
                              ((t.rejectionReason = this.reason()),
                              (t.isRejected = !0)),
                          t
                        );
                      }),
                      (o.prototype.all = function () {
                        return (
                          arguments.length > 0 &&
                            this._warn(
                              ".all() was passed arguments but it does not take any"
                            ),
                          new F(this).promise()
                        );
                      }),
                      (o.prototype.error = function (t) {
                        return this.caught(d.originatesFromRejection, t);
                      }),
                      (o.getNewLibraryCopy = n.exports),
                      (o.is = function (t) {
                        return t instanceof o;
                      }),
                      (o.fromNode = o.fromCallback =
                        function (t) {
                          var e = new o(w);
                          e._captureStackTrace();
                          var n =
                              arguments.length > 1 &&
                              !!Object(arguments[1]).multiArgs,
                            r = A(t)(O(e, n));
                          return (
                            r === R && e._rejectCallback(r.e, !0),
                            e._isFateSealed() || e._setAsyncGuaranteed(),
                            e
                          );
                        }),
                      (o.all = function (t) {
                        return new F(t).promise();
                      }),
                      (o.cast = function (t) {
                        var e = E(t);
                        return (
                          e instanceof o ||
                            ((e = new o(w)),
                            e._captureStackTrace(),
                            e._setFulfilled(),
                            (e._rejectionHandler0 = t)),
                          e
                        );
                      }),
                      (o.resolve = o.fulfilled = o.cast),
                      (o.reject = o.rejected =
                        function (t) {
                          var e = new o(w);
                          return (
                            e._captureStackTrace(), e._rejectCallback(t, !0), e
                          );
                        }),
                      (o.setScheduler = function (t) {
                        if ("function" != typeof t)
                          throw new g(
                            "expecting a function but got " + d.classString(t)
                          );
                        return y.setScheduler(t);
                      }),
                      (o.prototype._then = function (t, e, n, r, i) {
                        var s = void 0 !== i,
                          a = s ? i : new o(w),
                          c = this._target(),
                          l = c._bitField;
                        s ||
                          (a._propagateFrom(this, 3),
                          a._captureStackTrace(),
                          void 0 === r &&
                            0 !== (2097152 & this._bitField) &&
                            (r =
                              0 !== (50397184 & l)
                                ? this._boundValue()
                                : c === this
                                ? void 0
                                : this._boundTo),
                          this._fireEvent("promiseChained", this, a));
                        var p = u();
                        if (0 !== (50397184 & l)) {
                          var h,
                            f,
                            _ = c._settlePromiseCtx;
                          0 !== (33554432 & l)
                            ? ((f = c._rejectionHandler0), (h = t))
                            : 0 !== (16777216 & l)
                            ? ((f = c._fulfillmentHandler0),
                              (h = e),
                              c._unsetRejectionIsUnhandled())
                            : ((_ = c._settlePromiseLateCancellationObserver),
                              (f = new b("late cancellation observer")),
                              c._attachExtraTrace(f),
                              (h = e)),
                            y.invoke(_, c, {
                              handler:
                                null === p
                                  ? h
                                  : "function" == typeof h &&
                                    d.domainBind(p, h),
                              promise: a,
                              receiver: r,
                              value: f,
                            });
                        } else c._addCallbacks(t, e, a, r, p);
                        return a;
                      }),
                      (o.prototype._length = function () {
                        return 65535 & this._bitField;
                      }),
                      (o.prototype._isFateSealed = function () {
                        return 0 !== (117506048 & this._bitField);
                      }),
                      (o.prototype._isFollowing = function () {
                        return 67108864 === (67108864 & this._bitField);
                      }),
                      (o.prototype._setLength = function (t) {
                        this._bitField =
                          (this._bitField & -65536) | (65535 & t);
                      }),
                      (o.prototype._setFulfilled = function () {
                        (this._bitField = 33554432 | this._bitField),
                          this._fireEvent("promiseFulfilled", this);
                      }),
                      (o.prototype._setRejected = function () {
                        (this._bitField = 16777216 | this._bitField),
                          this._fireEvent("promiseRejected", this);
                      }),
                      (o.prototype._setFollowing = function () {
                        (this._bitField = 67108864 | this._bitField),
                          this._fireEvent("promiseResolved", this);
                      }),
                      (o.prototype._setIsFinal = function () {
                        this._bitField = 4194304 | this._bitField;
                      }),
                      (o.prototype._isFinal = function () {
                        return (4194304 & this._bitField) > 0;
                      }),
                      (o.prototype._unsetCancelled = function () {
                        this._bitField = this._bitField & -65537;
                      }),
                      (o.prototype._setCancelled = function () {
                        (this._bitField = 65536 | this._bitField),
                          this._fireEvent("promiseCancelled", this);
                      }),
                      (o.prototype._setWillBeCancelled = function () {
                        this._bitField = 8388608 | this._bitField;
                      }),
                      (o.prototype._setAsyncGuaranteed = function () {
                        y.hasCustomScheduler() ||
                          (this._bitField = 134217728 | this._bitField);
                      }),
                      (o.prototype._receiverAt = function (t) {
                        var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
                        if (e !== f)
                          return void 0 === e && this._isBound()
                            ? this._boundValue()
                            : e;
                      }),
                      (o.prototype._promiseAt = function (t) {
                        return this[4 * t - 4 + 2];
                      }),
                      (o.prototype._fulfillmentHandlerAt = function (t) {
                        return this[4 * t - 4 + 0];
                      }),
                      (o.prototype._rejectionHandlerAt = function (t) {
                        return this[4 * t - 4 + 1];
                      }),
                      (o.prototype._boundValue = function () {}),
                      (o.prototype._migrateCallback0 = function (t) {
                        var e = (t._bitField, t._fulfillmentHandler0),
                          n = t._rejectionHandler0,
                          r = t._promise0,
                          i = t._receiverAt(0);
                        void 0 === i && (i = f),
                          this._addCallbacks(e, n, r, i, null);
                      }),
                      (o.prototype._migrateCallbackAt = function (t, e) {
                        var n = t._fulfillmentHandlerAt(e),
                          r = t._rejectionHandlerAt(e),
                          i = t._promiseAt(e),
                          o = t._receiverAt(e);
                        void 0 === o && (o = f),
                          this._addCallbacks(n, r, i, o, null);
                      }),
                      (o.prototype._addCallbacks = function (t, e, n, r, i) {
                        var o = this._length();
                        if (
                          (o >= 65531 && ((o = 0), this._setLength(0)), 0 === o)
                        )
                          (this._promise0 = n),
                            (this._receiver0 = r),
                            "function" == typeof t &&
                              (this._fulfillmentHandler0 =
                                null === i ? t : d.domainBind(i, t)),
                            "function" == typeof e &&
                              (this._rejectionHandler0 =
                                null === i ? e : d.domainBind(i, e));
                        else {
                          var s = 4 * o - 4;
                          (this[s + 2] = n),
                            (this[s + 3] = r),
                            "function" == typeof t &&
                              (this[s + 0] =
                                null === i ? t : d.domainBind(i, t)),
                            "function" == typeof e &&
                              (this[s + 1] =
                                null === i ? e : d.domainBind(i, e));
                        }
                        return this._setLength(o + 1), o;
                      }),
                      (o.prototype._proxy = function (t, e) {
                        this._addCallbacks(void 0, void 0, e, t, null);
                      }),
                      (o.prototype._resolveCallback = function (t, e) {
                        if (0 === (117506048 & this._bitField)) {
                          if (t === this) return this._rejectCallback(l(), !1);
                          var n = E(t, this);
                          if (!(n instanceof o)) return this._fulfill(t);
                          e && this._propagateFrom(n, 2);
                          var r = n._target();
                          if (r === this) return void this._reject(l());
                          var i = r._bitField;
                          if (0 === (50397184 & i)) {
                            var s = this._length();
                            s > 0 && r._migrateCallback0(this);
                            for (var a = 1; a < s; ++a)
                              r._migrateCallbackAt(this, a);
                            this._setFollowing(),
                              this._setLength(0),
                              this._setFollowee(r);
                          } else if (0 !== (33554432 & i))
                            this._fulfill(r._value());
                          else if (0 !== (16777216 & i))
                            this._reject(r._reason());
                          else {
                            var c = new b("late cancellation observer");
                            r._attachExtraTrace(c), this._reject(c);
                          }
                        }
                      }),
                      (o.prototype._rejectCallback = function (t, e, n) {
                        var r = d.ensureErrorObject(t),
                          i = r === t;
                        if (!i && !n && k.warnings()) {
                          var o =
                            "a promise was rejected with a non-error: " +
                            d.classString(t);
                          this._warn(o, !0);
                        }
                        this._attachExtraTrace(r, !!e && i), this._reject(t);
                      }),
                      (o.prototype._resolveFromExecutor = function (t) {
                        var e = this;
                        this._captureStackTrace(), this._pushContext();
                        var n = !0,
                          r = this._execute(
                            t,
                            function (t) {
                              e._resolveCallback(t);
                            },
                            function (t) {
                              e._rejectCallback(t, n);
                            }
                          );
                        (n = !1),
                          this._popContext(),
                          void 0 !== r && e._rejectCallback(r, !0);
                      }),
                      (o.prototype._settlePromiseFromHandler = function (
                        t,
                        e,
                        n,
                        r
                      ) {
                        var i = r._bitField;
                        if (0 === (65536 & i)) {
                          r._pushContext();
                          var o;
                          e === C
                            ? n && "number" == typeof n.length
                              ? (o = A(t).apply(this._boundValue(), n))
                              : ((o = R),
                                (o.e = new g(
                                  "cannot .spread() a non-array: " +
                                    d.classString(n)
                                )))
                            : (o = A(t).call(e, n));
                          var s = r._popContext();
                          (i = r._bitField),
                            0 === (65536 & i) &&
                              (o === T
                                ? r._reject(n)
                                : o === R
                                ? r._rejectCallback(o.e, !1)
                                : (k.checkForgottenReturns(o, s, "", r, this),
                                  r._resolveCallback(o)));
                        }
                      }),
                      (o.prototype._target = function () {
                        for (var t = this; t._isFollowing(); )
                          t = t._followee();
                        return t;
                      }),
                      (o.prototype._followee = function () {
                        return this._rejectionHandler0;
                      }),
                      (o.prototype._setFollowee = function (t) {
                        this._rejectionHandler0 = t;
                      }),
                      (o.prototype._settlePromise = function (t, e, n, i) {
                        var s = t instanceof o,
                          a = this._bitField,
                          c = 0 !== (134217728 & a);
                        0 !== (65536 & a)
                          ? (s && t._invokeInternalOnCancel(),
                            n instanceof x && n.isFinallyHandler()
                              ? ((n.cancelPromise = t),
                                A(e).call(n, i) === R && t._reject(R.e))
                              : e === p
                              ? t._fulfill(p.call(n))
                              : n instanceof r
                              ? n._promiseCancelled(t)
                              : s || t instanceof F
                              ? t._cancel()
                              : n.cancel())
                          : "function" == typeof e
                          ? s
                            ? (c && t._setAsyncGuaranteed(),
                              this._settlePromiseFromHandler(e, n, i, t))
                            : e.call(n, i, t)
                          : n instanceof r
                          ? n._isResolved() ||
                            (0 !== (33554432 & a)
                              ? n._promiseFulfilled(i, t)
                              : n._promiseRejected(i, t))
                          : s &&
                            (c && t._setAsyncGuaranteed(),
                            0 !== (33554432 & a)
                              ? t._fulfill(i)
                              : t._reject(i));
                      }),
                      (o.prototype._settlePromiseLateCancellationObserver =
                        function (t) {
                          var e = t.handler,
                            n = t.promise,
                            r = t.receiver,
                            i = t.value;
                          "function" == typeof e
                            ? n instanceof o
                              ? this._settlePromiseFromHandler(e, r, i, n)
                              : e.call(r, i, n)
                            : n instanceof o && n._reject(i);
                        }),
                      (o.prototype._settlePromiseCtx = function (t) {
                        this._settlePromise(
                          t.promise,
                          t.handler,
                          t.receiver,
                          t.value
                        );
                      }),
                      (o.prototype._settlePromise0 = function (t, e, n) {
                        var r = this._promise0,
                          i = this._receiverAt(0);
                        (this._promise0 = void 0),
                          (this._receiver0 = void 0),
                          this._settlePromise(r, t, i, e);
                      }),
                      (o.prototype._clearCallbackDataAtIndex = function (t) {
                        var e = 4 * t - 4;
                        this[e + 2] =
                          this[e + 3] =
                          this[e + 0] =
                          this[e + 1] =
                            void 0;
                      }),
                      (o.prototype._fulfill = function (t) {
                        var e = this._bitField;
                        if (!((117506048 & e) >>> 16)) {
                          if (t === this) {
                            var n = l();
                            return this._attachExtraTrace(n), this._reject(n);
                          }
                          this._setFulfilled(),
                            (this._rejectionHandler0 = t),
                            (65535 & e) > 0 &&
                              (0 !== (134217728 & e)
                                ? this._settlePromises()
                                : y.settlePromises(this));
                        }
                      }),
                      (o.prototype._reject = function (t) {
                        var e = this._bitField;
                        if (!((117506048 & e) >>> 16))
                          return (
                            this._setRejected(),
                            (this._fulfillmentHandler0 = t),
                            this._isFinal()
                              ? y.fatalError(t, d.isNode)
                              : void ((65535 & e) > 0
                                  ? y.settlePromises(this)
                                  : this._ensurePossibleRejectionHandled())
                          );
                      }),
                      (o.prototype._fulfillPromises = function (t, e) {
                        for (var n = 1; n < t; n++) {
                          var r = this._fulfillmentHandlerAt(n),
                            i = this._promiseAt(n),
                            o = this._receiverAt(n);
                          this._clearCallbackDataAtIndex(n),
                            this._settlePromise(i, r, o, e);
                        }
                      }),
                      (o.prototype._rejectPromises = function (t, e) {
                        for (var n = 1; n < t; n++) {
                          var r = this._rejectionHandlerAt(n),
                            i = this._promiseAt(n),
                            o = this._receiverAt(n);
                          this._clearCallbackDataAtIndex(n),
                            this._settlePromise(i, r, o, e);
                        }
                      }),
                      (o.prototype._settlePromises = function () {
                        var t = this._bitField,
                          e = 65535 & t;
                        if (e > 0) {
                          if (0 !== (16842752 & t)) {
                            var n = this._fulfillmentHandler0;
                            this._settlePromise0(this._rejectionHandler0, n, t),
                              this._rejectPromises(e, n);
                          } else {
                            var r = this._rejectionHandler0;
                            this._settlePromise0(
                              this._fulfillmentHandler0,
                              r,
                              t
                            ),
                              this._fulfillPromises(e, r);
                          }
                          this._setLength(0);
                        }
                        this._clearCancellationData();
                      }),
                      (o.prototype._settledValue = function () {
                        var t = this._bitField;
                        return 0 !== (33554432 & t)
                          ? this._rejectionHandler0
                          : 0 !== (16777216 & t)
                          ? this._fulfillmentHandler0
                          : void 0;
                      }),
                      (o.defer = o.pending =
                        function () {
                          k.deprecated("Promise.defer", "new Promise");
                          var t = new o(w);
                          return { promise: t, resolve: s, reject: a };
                        }),
                      d.notEnumerableProp(o, "_makeSelfResolutionError", l),
                      t("./method")(o, w, E, h, k),
                      t("./bind")(o, w, E, k),
                      t("./cancel")(o, F, h, k),
                      t("./direct_resolve")(o),
                      t("./synchronous_inspection")(o),
                      t("./join")(o, F, E, w, y, u),
                      (o.Promise = o),
                      (o.version = "3.4.7"),
                      t("./map.js")(o, F, h, E, w, k),
                      t("./call_get.js")(o),
                      t("./using.js")(o, h, E, j, w, k),
                      t("./timers.js")(o, w, k),
                      t("./generators.js")(o, h, w, E, r, k),
                      t("./nodeify.js")(o),
                      t("./promisify.js")(o, w),
                      t("./props.js")(o, F, E, h),
                      t("./race.js")(o, w, E, h),
                      t("./reduce.js")(o, F, h, E, w, k),
                      t("./settle.js")(o, F, k),
                      t("./some.js")(o, F, h),
                      t("./filter.js")(o, w),
                      t("./each.js")(o, w),
                      t("./any.js")(o),
                      d.toFastProperties(o),
                      d.toFastProperties(o.prototype),
                      c({ a: 1 }),
                      c({ b: 2 }),
                      c({ c: 3 }),
                      c(1),
                      c(function () {}),
                      c(void 0),
                      c(!1),
                      c(new o(w)),
                      k.setBounds(v.firstLineError, d.lastLineError),
                      o
                    );
                  };
                },
                {
                  "./any.js": 1,
                  "./async": 2,
                  "./bind": 3,
                  "./call_get.js": 5,
                  "./cancel": 6,
                  "./catch_filter": 7,
                  "./context": 8,
                  "./debuggability": 9,
                  "./direct_resolve": 10,
                  "./each.js": 11,
                  "./errors": 12,
                  "./es5": 13,
                  "./filter.js": 14,
                  "./finally": 15,
                  "./generators.js": 16,
                  "./join": 17,
                  "./map.js": 18,
                  "./method": 19,
                  "./nodeback": 20,
                  "./nodeify.js": 21,
                  "./promise_array": 23,
                  "./promisify.js": 24,
                  "./props.js": 25,
                  "./race.js": 27,
                  "./reduce.js": 28,
                  "./settle.js": 30,
                  "./some.js": 31,
                  "./synchronous_inspection": 32,
                  "./thenables": 33,
                  "./timers.js": 34,
                  "./using.js": 35,
                  "./util": 36,
                },
              ],
              23: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i, o) {
                    function s(t) {
                      switch (t) {
                        case -2:
                          return [];
                        case -3:
                          return {};
                      }
                    }
                    function a(t) {
                      var r = (this._promise = new e(n));
                      t instanceof e && r._propagateFrom(t, 3),
                        r._setOnCancel(this),
                        (this._values = t),
                        (this._length = 0),
                        (this._totalResolved = 0),
                        this._init(void 0, -2);
                    }
                    var c = t("./util");
                    c.isArray;
                    return (
                      c.inherits(a, o),
                      (a.prototype.length = function () {
                        return this._length;
                      }),
                      (a.prototype.promise = function () {
                        return this._promise;
                      }),
                      (a.prototype._init = function t(n, o) {
                        var a = r(this._values, this._promise);
                        if (a instanceof e) {
                          a = a._target();
                          var u = a._bitField;
                          if (((this._values = a), 0 === (50397184 & u)))
                            return (
                              this._promise._setAsyncGuaranteed(),
                              a._then(t, this._reject, void 0, this, o)
                            );
                          if (0 === (33554432 & u))
                            return 0 !== (16777216 & u)
                              ? this._reject(a._reason())
                              : this._cancel();
                          a = a._value();
                        }
                        if (((a = c.asArray(a)), null === a)) {
                          var l = i(
                            "expecting an array or an iterable object but got " +
                              c.classString(a)
                          ).reason();
                          return void this._promise._rejectCallback(l, !1);
                        }
                        return 0 === a.length
                          ? void (o === -5
                              ? this._resolveEmptyArray()
                              : this._resolve(s(o)))
                          : void this._iterate(a);
                      }),
                      (a.prototype._iterate = function (t) {
                        var n = this.getActualLength(t.length);
                        (this._length = n),
                          (this._values = this.shouldCopyValues()
                            ? new Array(n)
                            : this._values);
                        for (
                          var i = this._promise, o = !1, s = null, a = 0;
                          a < n;
                          ++a
                        ) {
                          var c = r(t[a], i);
                          c instanceof e
                            ? ((c = c._target()), (s = c._bitField))
                            : (s = null),
                            o
                              ? null !== s && c.suppressUnhandledRejections()
                              : null !== s
                              ? 0 === (50397184 & s)
                                ? (c._proxy(this, a), (this._values[a] = c))
                                : (o =
                                    0 !== (33554432 & s)
                                      ? this._promiseFulfilled(c._value(), a)
                                      : 0 !== (16777216 & s)
                                      ? this._promiseRejected(c._reason(), a)
                                      : this._promiseCancelled(a))
                              : (o = this._promiseFulfilled(c, a));
                        }
                        o || i._setAsyncGuaranteed();
                      }),
                      (a.prototype._isResolved = function () {
                        return null === this._values;
                      }),
                      (a.prototype._resolve = function (t) {
                        (this._values = null), this._promise._fulfill(t);
                      }),
                      (a.prototype._cancel = function () {
                        !this._isResolved() &&
                          this._promise._isCancellable() &&
                          ((this._values = null), this._promise._cancel());
                      }),
                      (a.prototype._reject = function (t) {
                        (this._values = null),
                          this._promise._rejectCallback(t, !1);
                      }),
                      (a.prototype._promiseFulfilled = function (t, e) {
                        this._values[e] = t;
                        var n = ++this._totalResolved;
                        return (
                          n >= this._length && (this._resolve(this._values), !0)
                        );
                      }),
                      (a.prototype._promiseCancelled = function () {
                        return this._cancel(), !0;
                      }),
                      (a.prototype._promiseRejected = function (t) {
                        return this._totalResolved++, this._reject(t), !0;
                      }),
                      (a.prototype._resultCancelled = function () {
                        if (!this._isResolved()) {
                          var t = this._values;
                          if ((this._cancel(), t instanceof e)) t.cancel();
                          else
                            for (var n = 0; n < t.length; ++n)
                              t[n] instanceof e && t[n].cancel();
                        }
                      }),
                      (a.prototype.shouldCopyValues = function () {
                        return !0;
                      }),
                      (a.prototype.getActualLength = function (t) {
                        return t;
                      }),
                      a
                    );
                  };
                },
                { "./util": 36 },
              ],
              24: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n) {
                    function r(t) {
                      return !C.test(t);
                    }
                    function i(t) {
                      try {
                        return t.__isPromisified__ === !0;
                      } catch (t) {
                        return !1;
                      }
                    }
                    function o(t, e, n) {
                      var r = f.getDataPropertyOrDefault(t, e + n, b);
                      return !!r && i(r);
                    }
                    function s(t, e, n) {
                      for (var r = 0; r < t.length; r += 2) {
                        var i = t[r];
                        if (n.test(i))
                          for (
                            var o = i.replace(n, ""), s = 0;
                            s < t.length;
                            s += 2
                          )
                            if (t[s] === o)
                              throw new m(
                                "Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace(
                                  "%s",
                                  e
                                )
                              );
                      }
                    }
                    function a(t, e, n, r) {
                      for (
                        var a = f.inheritedDataKeys(t), c = [], u = 0;
                        u < a.length;
                        ++u
                      ) {
                        var l = a[u],
                          p = t[l],
                          h = r === T || T(l, p, t);
                        "function" != typeof p ||
                          i(p) ||
                          o(t, l, e) ||
                          !r(l, p, t, h) ||
                          c.push(l, p);
                      }
                      return s(c, e, n), c;
                    }
                    function c(t, r, i, o, s, a) {
                      function c() {
                        var i = r;
                        r === h && (i = this);
                        var o = new e(n);
                        o._captureStackTrace();
                        var s =
                            "string" == typeof l && this !== u ? this[l] : t,
                          c = d(o, a);
                        try {
                          s.apply(i, _(arguments, c));
                        } catch (t) {
                          o._rejectCallback(v(t), !0, !0);
                        }
                        return o._isFateSealed() || o._setAsyncGuaranteed(), o;
                      }
                      var u = (function () {
                          return this;
                        })(),
                        l = t;
                      return (
                        "string" == typeof l && (t = o),
                        f.notEnumerableProp(c, "__isPromisified__", !0),
                        c
                      );
                    }
                    function u(t, e, n, r, i) {
                      for (
                        var o = new RegExp(E(e) + "$"),
                          s = a(t, e, o, n),
                          c = 0,
                          u = s.length;
                        c < u;
                        c += 2
                      ) {
                        var l = s[c],
                          p = s[c + 1],
                          d = l + e;
                        if (r === F) t[d] = F(l, h, l, p, e, i);
                        else {
                          var _ = r(p, function () {
                            return F(l, h, l, p, e, i);
                          });
                          f.notEnumerableProp(_, "__isPromisified__", !0),
                            (t[d] = _);
                        }
                      }
                      return f.toFastProperties(t), t;
                    }
                    function l(t, e, n) {
                      return F(t, e, void 0, t, null, n);
                    }
                    var p,
                      h = {},
                      f = t("./util"),
                      d = t("./nodeback"),
                      _ = f.withAppended,
                      v = f.maybeWrapAsError,
                      y = f.canEvaluate,
                      m = t("./errors").TypeError,
                      g = "Async",
                      b = { __isPromisified__: !0 },
                      w = [
                        "arity",
                        "length",
                        "name",
                        "arguments",
                        "caller",
                        "callee",
                        "prototype",
                        "__isPromisified__",
                      ],
                      C = new RegExp("^(?:" + w.join("|") + ")$"),
                      T = function (t) {
                        return (
                          f.isIdentifier(t) &&
                          "_" !== t.charAt(0) &&
                          "constructor" !== t
                        );
                      },
                      E = function (t) {
                        return t.replace(/([$])/, "\\$");
                      },
                      F = y ? p : c;
                    (e.promisify = function (t, e) {
                      if ("function" != typeof t)
                        throw new m(
                          "expecting a function but got " + f.classString(t)
                        );
                      if (i(t)) return t;
                      e = Object(e);
                      var n = void 0 === e.context ? h : e.context,
                        o = !!e.multiArgs,
                        s = l(t, n, o);
                      return f.copyDescriptors(t, s, r), s;
                    }),
                      (e.promisifyAll = function (t, e) {
                        if ("function" != typeof t && "object" != typeof t)
                          throw new m(
                            "the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n"
                          );
                        e = Object(e);
                        var n = !!e.multiArgs,
                          r = e.suffix;
                        "string" != typeof r && (r = g);
                        var i = e.filter;
                        "function" != typeof i && (i = T);
                        var o = e.promisifier;
                        if (
                          ("function" != typeof o && (o = F),
                          !f.isIdentifier(r))
                        )
                          throw new RangeError(
                            "suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n"
                          );
                        for (
                          var s = f.inheritedDataKeys(t), a = 0;
                          a < s.length;
                          ++a
                        ) {
                          var c = t[s[a]];
                          "constructor" !== s[a] &&
                            f.isClass(c) &&
                            (u(c.prototype, r, i, o, n), u(c, r, i, o, n));
                        }
                        return u(t, r, i, o, n);
                      });
                  };
                },
                { "./errors": 12, "./nodeback": 20, "./util": 36 },
              ],
              25: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i) {
                    function o(t) {
                      var e,
                        n = !1;
                      if (void 0 !== a && t instanceof a) (e = p(t)), (n = !0);
                      else {
                        var r = l.keys(t),
                          i = r.length;
                        e = new Array(2 * i);
                        for (var o = 0; o < i; ++o) {
                          var s = r[o];
                          (e[o] = t[s]), (e[o + i] = s);
                        }
                      }
                      this.constructor$(e),
                        (this._isMap = n),
                        this._init$(void 0, -3);
                    }
                    function s(t) {
                      var n,
                        s = r(t);
                      return u(s)
                        ? ((n =
                            s instanceof e
                              ? s._then(e.props, void 0, void 0, void 0, void 0)
                              : new o(s).promise()),
                          s instanceof e && n._propagateFrom(s, 2),
                          n)
                        : i(
                            "cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n"
                          );
                    }
                    var a,
                      c = t("./util"),
                      u = c.isObject,
                      l = t("./es5");
                    "function" == typeof Map && (a = Map);
                    var p = (function () {
                        function t(t, r) {
                          (this[e] = t), (this[e + n] = r), e++;
                        }
                        var e = 0,
                          n = 0;
                        return function (r) {
                          (n = r.size), (e = 0);
                          var i = new Array(2 * r.size);
                          return r.forEach(t, i), i;
                        };
                      })(),
                      h = function (t) {
                        for (
                          var e = new a(), n = (t.length / 2) | 0, r = 0;
                          r < n;
                          ++r
                        ) {
                          var i = t[n + r],
                            o = t[r];
                          e.set(i, o);
                        }
                        return e;
                      };
                    c.inherits(o, n),
                      (o.prototype._init = function () {}),
                      (o.prototype._promiseFulfilled = function (t, e) {
                        this._values[e] = t;
                        var n = ++this._totalResolved;
                        if (n >= this._length) {
                          var r;
                          if (this._isMap) r = h(this._values);
                          else {
                            r = {};
                            for (
                              var i = this.length(), o = 0, s = this.length();
                              o < s;
                              ++o
                            )
                              r[this._values[o + i]] = this._values[o];
                          }
                          return this._resolve(r), !0;
                        }
                        return !1;
                      }),
                      (o.prototype.shouldCopyValues = function () {
                        return !1;
                      }),
                      (o.prototype.getActualLength = function (t) {
                        return t >> 1;
                      }),
                      (e.prototype.props = function () {
                        return s(this);
                      }),
                      (e.props = function (t) {
                        return s(t);
                      });
                  };
                },
                { "./es5": 13, "./util": 36 },
              ],
              26: [
                function (t, e, n) {
                  "use strict";
                  function r(t, e, n, r, i) {
                    for (var o = 0; o < i; ++o)
                      (n[o + r] = t[o + e]), (t[o + e] = void 0);
                  }
                  function i(t) {
                    (this._capacity = t), (this._length = 0), (this._front = 0);
                  }
                  (i.prototype._willBeOverCapacity = function (t) {
                    return this._capacity < t;
                  }),
                    (i.prototype._pushOne = function (t) {
                      var e = this.length();
                      this._checkCapacity(e + 1);
                      var n = (this._front + e) & (this._capacity - 1);
                      (this[n] = t), (this._length = e + 1);
                    }),
                    (i.prototype.push = function (t, e, n) {
                      var r = this.length() + 3;
                      if (this._willBeOverCapacity(r))
                        return (
                          this._pushOne(t),
                          this._pushOne(e),
                          void this._pushOne(n)
                        );
                      var i = this._front + r - 3;
                      this._checkCapacity(r);
                      var o = this._capacity - 1;
                      (this[(i + 0) & o] = t),
                        (this[(i + 1) & o] = e),
                        (this[(i + 2) & o] = n),
                        (this._length = r);
                    }),
                    (i.prototype.shift = function () {
                      var t = this._front,
                        e = this[t];
                      return (
                        (this[t] = void 0),
                        (this._front = (t + 1) & (this._capacity - 1)),
                        this._length--,
                        e
                      );
                    }),
                    (i.prototype.length = function () {
                      return this._length;
                    }),
                    (i.prototype._checkCapacity = function (t) {
                      this._capacity < t && this._resizeTo(this._capacity << 1);
                    }),
                    (i.prototype._resizeTo = function (t) {
                      var e = this._capacity;
                      this._capacity = t;
                      var n = this._front,
                        i = this._length,
                        o = (n + i) & (e - 1);
                      r(this, 0, this, e, o);
                    }),
                    (e.exports = i);
                },
                {},
              ],
              27: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i) {
                    function o(t, o) {
                      var c = r(t);
                      if (c instanceof e) return a(c);
                      if (((t = s.asArray(t)), null === t))
                        return i(
                          "expecting an array or an iterable object but got " +
                            s.classString(t)
                        );
                      var u = new e(n);
                      void 0 !== o && u._propagateFrom(o, 3);
                      for (
                        var l = u._fulfill, p = u._reject, h = 0, f = t.length;
                        h < f;
                        ++h
                      ) {
                        var d = t[h];
                        (void 0 !== d || h in t) &&
                          e.cast(d)._then(l, p, void 0, u, null);
                      }
                      return u;
                    }
                    var s = t("./util"),
                      a = function (t) {
                        return t.then(function (e) {
                          return o(e, t);
                        });
                      };
                    (e.race = function (t) {
                      return o(t, void 0);
                    }),
                      (e.prototype.race = function () {
                        return o(this, void 0);
                      });
                  };
                },
                { "./util": 36 },
              ],
              28: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i, o, s) {
                    function a(t, n, r, i) {
                      this.constructor$(t);
                      var s = h();
                      (this._fn = null === s ? n : f.domainBind(s, n)),
                        void 0 !== r &&
                          ((r = e.resolve(r)),
                          r._attachCancellationCallback(this)),
                        (this._initialValue = r),
                        (this._currentCancellable = null),
                        i === o
                          ? (this._eachValues = Array(this._length))
                          : 0 === i
                          ? (this._eachValues = null)
                          : (this._eachValues = void 0),
                        this._promise._captureStackTrace(),
                        this._init$(void 0, -5);
                    }
                    function c(t, e) {
                      this.isFulfilled() ? e._resolve(t) : e._reject(t);
                    }
                    function u(t, e, n, i) {
                      if ("function" != typeof e)
                        return r(
                          "expecting a function but got " + f.classString(e)
                        );
                      var o = new a(t, e, n, i);
                      return o.promise();
                    }
                    function l(t) {
                      (this.accum = t), this.array._gotAccum(t);
                      var n = i(this.value, this.array._promise);
                      return n instanceof e
                        ? ((this.array._currentCancellable = n),
                          n._then(p, void 0, void 0, this, void 0))
                        : p.call(this, n);
                    }
                    function p(t) {
                      var n = this.array,
                        r = n._promise,
                        i = d(n._fn);
                      r._pushContext();
                      var o;
                      (o =
                        void 0 !== n._eachValues
                          ? i.call(r._boundValue(), t, this.index, this.length)
                          : i.call(
                              r._boundValue(),
                              this.accum,
                              t,
                              this.index,
                              this.length
                            )),
                        o instanceof e && (n._currentCancellable = o);
                      var a = r._popContext();
                      return (
                        s.checkForgottenReturns(
                          o,
                          a,
                          void 0 !== n._eachValues
                            ? "Promise.each"
                            : "Promise.reduce",
                          r
                        ),
                        o
                      );
                    }
                    var h = e._getDomain,
                      f = t("./util"),
                      d = f.tryCatch;
                    f.inherits(a, n),
                      (a.prototype._gotAccum = function (t) {
                        void 0 !== this._eachValues &&
                          null !== this._eachValues &&
                          t !== o &&
                          this._eachValues.push(t);
                      }),
                      (a.prototype._eachComplete = function (t) {
                        return (
                          null !== this._eachValues && this._eachValues.push(t),
                          this._eachValues
                        );
                      }),
                      (a.prototype._init = function () {}),
                      (a.prototype._resolveEmptyArray = function () {
                        this._resolve(
                          void 0 !== this._eachValues
                            ? this._eachValues
                            : this._initialValue
                        );
                      }),
                      (a.prototype.shouldCopyValues = function () {
                        return !1;
                      }),
                      (a.prototype._resolve = function (t) {
                        this._promise._resolveCallback(t),
                          (this._values = null);
                      }),
                      (a.prototype._resultCancelled = function (t) {
                        return t === this._initialValue
                          ? this._cancel()
                          : void (
                              this._isResolved() ||
                              (this._resultCancelled$(),
                              this._currentCancellable instanceof e &&
                                this._currentCancellable.cancel(),
                              this._initialValue instanceof e &&
                                this._initialValue.cancel())
                            );
                      }),
                      (a.prototype._iterate = function (t) {
                        this._values = t;
                        var n,
                          r,
                          i = t.length;
                        if (
                          (void 0 !== this._initialValue
                            ? ((n = this._initialValue), (r = 0))
                            : ((n = e.resolve(t[0])), (r = 1)),
                          (this._currentCancellable = n),
                          !n.isRejected())
                        )
                          for (; r < i; ++r) {
                            var o = {
                              accum: null,
                              value: t[r],
                              index: r,
                              length: i,
                              array: this,
                            };
                            n = n._then(l, void 0, void 0, o, void 0);
                          }
                        void 0 !== this._eachValues &&
                          (n = n._then(
                            this._eachComplete,
                            void 0,
                            void 0,
                            this,
                            void 0
                          )),
                          n._then(c, c, void 0, n, this);
                      }),
                      (e.prototype.reduce = function (t, e) {
                        return u(this, t, e, null);
                      }),
                      (e.reduce = function (t, e, n, r) {
                        return u(t, e, n, r);
                      });
                  };
                },
                { "./util": 36 },
              ],
              29: [
                function (t, i, o) {
                  "use strict";
                  var s,
                    a = t("./util"),
                    c = function () {
                      throw new Error(
                        "No async scheduler available\n\n    See http://goo.gl/MqrFmX\n"
                      );
                    },
                    u = a.getNativePromise();
                  if (a.isNode && "undefined" == typeof MutationObserver) {
                    var l = n.setImmediate,
                      p = e.nextTick;
                    s = a.isRecentNode
                      ? function (t) {
                          l.call(n, t);
                        }
                      : function (t) {
                          p.call(e, t);
                        };
                  } else if (
                    "function" == typeof u &&
                    "function" == typeof u.resolve
                  ) {
                    var h = u.resolve();
                    s = function (t) {
                      h.then(t);
                    };
                  } else
                    s =
                      "undefined" == typeof MutationObserver ||
                      ("undefined" != typeof window &&
                        window.navigator &&
                        (window.navigator.standalone || window.cordova))
                        ? "undefined" != typeof r
                          ? function (t) {
                              r(t);
                            }
                          : "undefined" != typeof setTimeout
                          ? function (t) {
                              setTimeout(t, 0);
                            }
                          : c
                        : (function () {
                            var t = document.createElement("div"),
                              e = { attributes: !0 },
                              n = !1,
                              r = document.createElement("div"),
                              i = new MutationObserver(function () {
                                t.classList.toggle("foo"), (n = !1);
                              });
                            i.observe(r, e);
                            var o = function () {
                              n || ((n = !0), r.classList.toggle("foo"));
                            };
                            return function (n) {
                              var r = new MutationObserver(function () {
                                r.disconnect(), n();
                              });
                              r.observe(t, e), o();
                            };
                          })();
                  i.exports = s;
                },
                { "./util": 36 },
              ],
              30: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r) {
                    function i(t) {
                      this.constructor$(t);
                    }
                    var o = e.PromiseInspection,
                      s = t("./util");
                    s.inherits(i, n),
                      (i.prototype._promiseResolved = function (t, e) {
                        this._values[t] = e;
                        var n = ++this._totalResolved;
                        return (
                          n >= this._length && (this._resolve(this._values), !0)
                        );
                      }),
                      (i.prototype._promiseFulfilled = function (t, e) {
                        var n = new o();
                        return (
                          (n._bitField = 33554432),
                          (n._settledValueField = t),
                          this._promiseResolved(e, n)
                        );
                      }),
                      (i.prototype._promiseRejected = function (t, e) {
                        var n = new o();
                        return (
                          (n._bitField = 16777216),
                          (n._settledValueField = t),
                          this._promiseResolved(e, n)
                        );
                      }),
                      (e.settle = function (t) {
                        return (
                          r.deprecated(".settle()", ".reflect()"),
                          new i(t).promise()
                        );
                      }),
                      (e.prototype.settle = function () {
                        return e.settle(this);
                      });
                  };
                },
                { "./util": 36 },
              ],
              31: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r) {
                    function i(t) {
                      this.constructor$(t),
                        (this._howMany = 0),
                        (this._unwrap = !1),
                        (this._initialized = !1);
                    }
                    function o(t, e) {
                      if ((0 | e) !== e || e < 0)
                        return r(
                          "expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n"
                        );
                      var n = new i(t),
                        o = n.promise();
                      return n.setHowMany(e), n.init(), o;
                    }
                    var s = t("./util"),
                      a = t("./errors").RangeError,
                      c = t("./errors").AggregateError,
                      u = s.isArray,
                      l = {};
                    s.inherits(i, n),
                      (i.prototype._init = function () {
                        if (this._initialized) {
                          if (0 === this._howMany)
                            return void this._resolve([]);
                          this._init$(void 0, -5);
                          var t = u(this._values);
                          !this._isResolved() &&
                            t &&
                            this._howMany > this._canPossiblyFulfill() &&
                            this._reject(this._getRangeError(this.length()));
                        }
                      }),
                      (i.prototype.init = function () {
                        (this._initialized = !0), this._init();
                      }),
                      (i.prototype.setUnwrap = function () {
                        this._unwrap = !0;
                      }),
                      (i.prototype.howMany = function () {
                        return this._howMany;
                      }),
                      (i.prototype.setHowMany = function (t) {
                        this._howMany = t;
                      }),
                      (i.prototype._promiseFulfilled = function (t) {
                        return (
                          this._addFulfilled(t),
                          this._fulfilled() === this.howMany() &&
                            ((this._values.length = this.howMany()),
                            1 === this.howMany() && this._unwrap
                              ? this._resolve(this._values[0])
                              : this._resolve(this._values),
                            !0)
                        );
                      }),
                      (i.prototype._promiseRejected = function (t) {
                        return this._addRejected(t), this._checkOutcome();
                      }),
                      (i.prototype._promiseCancelled = function () {
                        return this._values instanceof e || null == this._values
                          ? this._cancel()
                          : (this._addRejected(l), this._checkOutcome());
                      }),
                      (i.prototype._checkOutcome = function () {
                        if (this.howMany() > this._canPossiblyFulfill()) {
                          for (
                            var t = new c(), e = this.length();
                            e < this._values.length;
                            ++e
                          )
                            this._values[e] !== l && t.push(this._values[e]);
                          return (
                            t.length > 0 ? this._reject(t) : this._cancel(), !0
                          );
                        }
                        return !1;
                      }),
                      (i.prototype._fulfilled = function () {
                        return this._totalResolved;
                      }),
                      (i.prototype._rejected = function () {
                        return this._values.length - this.length();
                      }),
                      (i.prototype._addRejected = function (t) {
                        this._values.push(t);
                      }),
                      (i.prototype._addFulfilled = function (t) {
                        this._values[this._totalResolved++] = t;
                      }),
                      (i.prototype._canPossiblyFulfill = function () {
                        return this.length() - this._rejected();
                      }),
                      (i.prototype._getRangeError = function (t) {
                        var e =
                          "Input array must contain at least " +
                          this._howMany +
                          " items but contains only " +
                          t +
                          " items";
                        return new a(e);
                      }),
                      (i.prototype._resolveEmptyArray = function () {
                        this._reject(this._getRangeError(0));
                      }),
                      (e.some = function (t, e) {
                        return o(t, e);
                      }),
                      (e.prototype.some = function (t) {
                        return o(this, t);
                      }),
                      (e._SomePromiseArray = i);
                  };
                },
                { "./errors": 12, "./util": 36 },
              ],
              32: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (t) {
                    function e(t) {
                      void 0 !== t
                        ? ((t = t._target()),
                          (this._bitField = t._bitField),
                          (this._settledValueField = t._isFateSealed()
                            ? t._settledValue()
                            : void 0))
                        : ((this._bitField = 0),
                          (this._settledValueField = void 0));
                    }
                    e.prototype._settledValue = function () {
                      return this._settledValueField;
                    };
                    var n = (e.prototype.value = function () {
                        if (!this.isFulfilled())
                          throw new TypeError(
                            "cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n"
                          );
                        return this._settledValue();
                      }),
                      r =
                        (e.prototype.error =
                        e.prototype.reason =
                          function () {
                            if (!this.isRejected())
                              throw new TypeError(
                                "cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n"
                              );
                            return this._settledValue();
                          }),
                      i = (e.prototype.isFulfilled = function () {
                        return 0 !== (33554432 & this._bitField);
                      }),
                      o = (e.prototype.isRejected = function () {
                        return 0 !== (16777216 & this._bitField);
                      }),
                      s = (e.prototype.isPending = function () {
                        return 0 === (50397184 & this._bitField);
                      }),
                      a = (e.prototype.isResolved = function () {
                        return 0 !== (50331648 & this._bitField);
                      });
                    (e.prototype.isCancelled = function () {
                      return 0 !== (8454144 & this._bitField);
                    }),
                      (t.prototype.__isCancelled = function () {
                        return 65536 === (65536 & this._bitField);
                      }),
                      (t.prototype._isCancelled = function () {
                        return this._target().__isCancelled();
                      }),
                      (t.prototype.isCancelled = function () {
                        return 0 !== (8454144 & this._target()._bitField);
                      }),
                      (t.prototype.isPending = function () {
                        return s.call(this._target());
                      }),
                      (t.prototype.isRejected = function () {
                        return o.call(this._target());
                      }),
                      (t.prototype.isFulfilled = function () {
                        return i.call(this._target());
                      }),
                      (t.prototype.isResolved = function () {
                        return a.call(this._target());
                      }),
                      (t.prototype.value = function () {
                        return n.call(this._target());
                      }),
                      (t.prototype.reason = function () {
                        var t = this._target();
                        return t._unsetRejectionIsUnhandled(), r.call(t);
                      }),
                      (t.prototype._value = function () {
                        return this._settledValue();
                      }),
                      (t.prototype._reason = function () {
                        return (
                          this._unsetRejectionIsUnhandled(),
                          this._settledValue()
                        );
                      }),
                      (t.PromiseInspection = e);
                  };
                },
                {},
              ],
              33: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n) {
                    function r(t, r) {
                      if (l(t)) {
                        if (t instanceof e) return t;
                        var i = o(t);
                        if (i === u) {
                          r && r._pushContext();
                          var c = e.reject(i.e);
                          return r && r._popContext(), c;
                        }
                        if ("function" == typeof i) {
                          if (s(t)) {
                            var c = new e(n);
                            return (
                              t._then(c._fulfill, c._reject, void 0, c, null), c
                            );
                          }
                          return a(t, i, r);
                        }
                      }
                      return t;
                    }
                    function i(t) {
                      return t.then;
                    }
                    function o(t) {
                      try {
                        return i(t);
                      } catch (t) {
                        return (u.e = t), u;
                      }
                    }
                    function s(t) {
                      try {
                        return p.call(t, "_promise0");
                      } catch (t) {
                        return !1;
                      }
                    }
                    function a(t, r, i) {
                      function o(t) {
                        a && (a._resolveCallback(t), (a = null));
                      }
                      function s(t) {
                        a && (a._rejectCallback(t, p, !0), (a = null));
                      }
                      var a = new e(n),
                        l = a;
                      i && i._pushContext(),
                        a._captureStackTrace(),
                        i && i._popContext();
                      var p = !0,
                        h = c.tryCatch(r).call(t, o, s);
                      return (
                        (p = !1),
                        a &&
                          h === u &&
                          (a._rejectCallback(h.e, !0, !0), (a = null)),
                        l
                      );
                    }
                    var c = t("./util"),
                      u = c.errorObj,
                      l = c.isObject,
                      p = {}.hasOwnProperty;
                    return r;
                  };
                },
                { "./util": 36 },
              ],
              34: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r) {
                    function i(t) {
                      this.handle = t;
                    }
                    function o(t) {
                      return clearTimeout(this.handle), t;
                    }
                    function s(t) {
                      throw (clearTimeout(this.handle), t);
                    }
                    var a = t("./util"),
                      c = e.TimeoutError;
                    i.prototype._resultCancelled = function () {
                      clearTimeout(this.handle);
                    };
                    var u = function (t) {
                        return l(+this).thenReturn(t);
                      },
                      l = (e.delay = function (t, o) {
                        var s, a;
                        return (
                          void 0 !== o
                            ? ((s = e
                                .resolve(o)
                                ._then(u, null, null, t, void 0)),
                              r.cancellation() &&
                                o instanceof e &&
                                s._setOnCancel(o))
                            : ((s = new e(n)),
                              (a = setTimeout(function () {
                                s._fulfill();
                              }, +t)),
                              r.cancellation() && s._setOnCancel(new i(a)),
                              s._captureStackTrace()),
                          s._setAsyncGuaranteed(),
                          s
                        );
                      });
                    e.prototype.delay = function (t) {
                      return l(t, this);
                    };
                    var p = function (t, e, n) {
                      var r;
                      (r =
                        "string" != typeof e
                          ? e instanceof Error
                            ? e
                            : new c("operation timed out")
                          : new c(e)),
                        a.markAsOriginatingFromRejection(r),
                        t._attachExtraTrace(r),
                        t._reject(r),
                        null != n && n.cancel();
                    };
                    e.prototype.timeout = function (t, e) {
                      t = +t;
                      var n,
                        a,
                        c = new i(
                          setTimeout(function () {
                            n.isPending() && p(n, e, a);
                          }, t)
                        );
                      return (
                        r.cancellation()
                          ? ((a = this.then()),
                            (n = a._then(o, s, void 0, c, void 0)),
                            n._setOnCancel(c))
                          : (n = this._then(o, s, void 0, c, void 0)),
                        n
                      );
                    };
                  };
                },
                { "./util": 36 },
              ],
              35: [
                function (t, e, n) {
                  "use strict";
                  e.exports = function (e, n, r, i, o, s) {
                    function a(t) {
                      setTimeout(function () {
                        throw t;
                      }, 0);
                    }
                    function c(t) {
                      var e = r(t);
                      return (
                        e !== t &&
                          "function" == typeof t._isDisposable &&
                          "function" == typeof t._getDisposer &&
                          t._isDisposable() &&
                          e._setDisposable(t._getDisposer()),
                        e
                      );
                    }
                    function u(t, n) {
                      function i() {
                        if (s >= u) return l._fulfill();
                        var o = c(t[s++]);
                        if (o instanceof e && o._isDisposable()) {
                          try {
                            o = r(o._getDisposer().tryDispose(n), t.promise);
                          } catch (t) {
                            return a(t);
                          }
                          if (o instanceof e)
                            return o._then(i, a, null, null, null);
                        }
                        i();
                      }
                      var s = 0,
                        u = t.length,
                        l = new e(o);
                      return i(), l;
                    }
                    function l(t, e, n) {
                      (this._data = t),
                        (this._promise = e),
                        (this._context = n);
                    }
                    function p(t, e, n) {
                      this.constructor$(t, e, n);
                    }
                    function h(t) {
                      return l.isDisposer(t)
                        ? (this.resources[this.index]._setDisposable(t),
                          t.promise())
                        : t;
                    }
                    function f(t) {
                      (this.length = t),
                        (this.promise = null),
                        (this[t - 1] = null);
                    }
                    var d = t("./util"),
                      _ = t("./errors").TypeError,
                      v = t("./util").inherits,
                      y = d.errorObj,
                      m = d.tryCatch,
                      g = {};
                    (l.prototype.data = function () {
                      return this._data;
                    }),
                      (l.prototype.promise = function () {
                        return this._promise;
                      }),
                      (l.prototype.resource = function () {
                        return this.promise().isFulfilled()
                          ? this.promise().value()
                          : g;
                      }),
                      (l.prototype.tryDispose = function (t) {
                        var e = this.resource(),
                          n = this._context;
                        void 0 !== n && n._pushContext();
                        var r = e !== g ? this.doDispose(e, t) : null;
                        return (
                          void 0 !== n && n._popContext(),
                          this._promise._unsetDisposable(),
                          (this._data = null),
                          r
                        );
                      }),
                      (l.isDisposer = function (t) {
                        return (
                          null != t &&
                          "function" == typeof t.resource &&
                          "function" == typeof t.tryDispose
                        );
                      }),
                      v(p, l),
                      (p.prototype.doDispose = function (t, e) {
                        var n = this.data();
                        return n.call(t, t, e);
                      }),
                      (f.prototype._resultCancelled = function () {
                        for (var t = this.length, n = 0; n < t; ++n) {
                          var r = this[n];
                          r instanceof e && r.cancel();
                        }
                      }),
                      (e.using = function () {
                        var t = arguments.length;
                        if (t < 2)
                          return n(
                            "you must pass at least 2 arguments to Promise.using"
                          );
                        var i = arguments[t - 1];
                        if ("function" != typeof i)
                          return n(
                            "expecting a function but got " + d.classString(i)
                          );
                        var o,
                          a = !0;
                        2 === t && Array.isArray(arguments[0])
                          ? ((o = arguments[0]), (t = o.length), (a = !1))
                          : ((o = arguments), t--);
                        for (var c = new f(t), p = 0; p < t; ++p) {
                          var _ = o[p];
                          if (l.isDisposer(_)) {
                            var v = _;
                            (_ = _.promise()), _._setDisposable(v);
                          } else {
                            var g = r(_);
                            g instanceof e &&
                              (_ = g._then(
                                h,
                                null,
                                null,
                                { resources: c, index: p },
                                void 0
                              ));
                          }
                          c[p] = _;
                        }
                        for (
                          var b = new Array(c.length), p = 0;
                          p < b.length;
                          ++p
                        )
                          b[p] = e.resolve(c[p]).reflect();
                        var w = e.all(b).then(function (t) {
                            for (var e = 0; e < t.length; ++e) {
                              var n = t[e];
                              if (n.isRejected()) return (y.e = n.error()), y;
                              if (!n.isFulfilled()) return void w.cancel();
                              t[e] = n.value();
                            }
                            C._pushContext(), (i = m(i));
                            var r = a ? i.apply(void 0, t) : i(t),
                              o = C._popContext();
                            return (
                              s.checkForgottenReturns(r, o, "Promise.using", C),
                              r
                            );
                          }),
                          C = w.lastly(function () {
                            var t = new e.PromiseInspection(w);
                            return u(c, t);
                          });
                        return (c.promise = C), C._setOnCancel(c), C;
                      }),
                      (e.prototype._setDisposable = function (t) {
                        (this._bitField = 131072 | this._bitField),
                          (this._disposer = t);
                      }),
                      (e.prototype._isDisposable = function () {
                        return (131072 & this._bitField) > 0;
                      }),
                      (e.prototype._getDisposer = function () {
                        return this._disposer;
                      }),
                      (e.prototype._unsetDisposable = function () {
                        (this._bitField = this._bitField & -131073),
                          (this._disposer = void 0);
                      }),
                      (e.prototype.disposer = function (t) {
                        if ("function" == typeof t) return new p(t, this, i());
                        throw new _();
                      });
                  };
                },
                { "./errors": 12, "./util": 36 },
              ],
              36: [
                function (t, r, i) {
                  "use strict";
                  function o() {
                    try {
                      var t = O;
                      return (O = null), t.apply(this, arguments);
                    } catch (t) {
                      return (S.e = t), S;
                    }
                  }
                  function s(t) {
                    return (O = t), o;
                  }
                  function a(t) {
                    return (
                      null == t ||
                      t === !0 ||
                      t === !1 ||
                      "string" == typeof t ||
                      "number" == typeof t
                    );
                  }
                  function c(t) {
                    return (
                      "function" == typeof t ||
                      ("object" == typeof t && null !== t)
                    );
                  }
                  function u(t) {
                    return a(t) ? new Error(m(t)) : t;
                  }
                  function l(t, e) {
                    var n,
                      r = t.length,
                      i = new Array(r + 1);
                    for (n = 0; n < r; ++n) i[n] = t[n];
                    return (i[n] = e), i;
                  }
                  function p(t, e, n) {
                    if (!k.isES5)
                      return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                    var r = Object.getOwnPropertyDescriptor(t, e);
                    return null != r
                      ? null == r.get && null == r.set
                        ? r.value
                        : n
                      : void 0;
                  }
                  function h(t, e, n) {
                    if (a(t)) return t;
                    var r = {
                      value: n,
                      configurable: !0,
                      enumerable: !1,
                      writable: !0,
                    };
                    return k.defineProperty(t, e, r), t;
                  }
                  function f(t) {
                    throw t;
                  }
                  function d(t) {
                    try {
                      if ("function" == typeof t) {
                        var e = k.names(t.prototype),
                          n = k.isES5 && e.length > 1,
                          r =
                            e.length > 0 &&
                            !(1 === e.length && "constructor" === e[0]),
                          i = B.test(t + "") && k.names(t).length > 0;
                        if (n || r || i) return !0;
                      }
                      return !1;
                    } catch (t) {
                      return !1;
                    }
                  }
                  function _(t) {
                    function e() {}
                    e.prototype = t;
                    for (var n = 8; n--; ) new e();
                    return t;
                  }
                  function v(t) {
                    return I.test(t);
                  }
                  function y(t, e, n) {
                    for (var r = new Array(t), i = 0; i < t; ++i)
                      r[i] = e + i + n;
                    return r;
                  }
                  function m(t) {
                    try {
                      return t + "";
                    } catch (t) {
                      return "[no string representation]";
                    }
                  }
                  function g(t) {
                    return (
                      null !== t &&
                      "object" == typeof t &&
                      "string" == typeof t.message &&
                      "string" == typeof t.name
                    );
                  }
                  function b(t) {
                    try {
                      h(t, "isOperational", !0);
                    } catch (t) {}
                  }
                  function w(t) {
                    return (
                      null != t &&
                      (t instanceof
                        Error.__BluebirdErrorTypes__.OperationalError ||
                        t.isOperational === !0)
                    );
                  }
                  function C(t) {
                    return g(t) && k.propertyIsWritable(t, "stack");
                  }
                  function T(t) {
                    return {}.toString.call(t);
                  }
                  function E(t, e, n) {
                    for (var r = k.names(t), i = 0; i < r.length; ++i) {
                      var o = r[i];
                      if (n(o))
                        try {
                          k.defineProperty(e, o, k.getDescriptor(t, o));
                        } catch (t) {}
                    }
                  }
                  function F(t) {
                    return U ? e.env[t] : void 0;
                  }
                  function P() {
                    if ("function" == typeof Promise)
                      try {
                        var t = new Promise(function () {});
                        if ("[object Promise]" === {}.toString.call(t))
                          return Promise;
                      } catch (t) {}
                  }
                  function j(t, e) {
                    return t.bind(e);
                  }
                  var k = t("./es5"),
                    x = "undefined" == typeof navigator,
                    S = { e: {} },
                    O,
                    R =
                      "undefined" != typeof self
                        ? self
                        : "undefined" != typeof window
                        ? window
                        : "undefined" != typeof n
                        ? n
                        : void 0 !== this
                        ? this
                        : null,
                    A = function (t, e) {
                      function n() {
                        (this.constructor = t), (this.constructor$ = e);
                        for (var n in e.prototype)
                          r.call(e.prototype, n) &&
                            "$" !== n.charAt(n.length - 1) &&
                            (this[n + "$"] = e.prototype[n]);
                      }
                      var r = {}.hasOwnProperty;
                      return (
                        (n.prototype = e.prototype),
                        (t.prototype = new n()),
                        t.prototype
                      );
                    },
                    V = (function () {
                      var t = [
                          Array.prototype,
                          Object.prototype,
                          Function.prototype,
                        ],
                        e = function (e) {
                          for (var n = 0; n < t.length; ++n)
                            if (t[n] === e) return !0;
                          return !1;
                        };
                      if (k.isES5) {
                        var n = Object.getOwnPropertyNames;
                        return function (t) {
                          for (
                            var r = [], i = Object.create(null);
                            null != t && !e(t);

                          ) {
                            var o;
                            try {
                              o = n(t);
                            } catch (t) {
                              return r;
                            }
                            for (var s = 0; s < o.length; ++s) {
                              var a = o[s];
                              if (!i[a]) {
                                i[a] = !0;
                                var c = Object.getOwnPropertyDescriptor(t, a);
                                null != c &&
                                  null == c.get &&
                                  null == c.set &&
                                  r.push(a);
                              }
                            }
                            t = k.getPrototypeOf(t);
                          }
                          return r;
                        };
                      }
                      var r = {}.hasOwnProperty;
                      return function (n) {
                        if (e(n)) return [];
                        var i = [];
                        t: for (var o in n)
                          if (r.call(n, o)) i.push(o);
                          else {
                            for (var s = 0; s < t.length; ++s)
                              if (r.call(t[s], o)) continue t;
                            i.push(o);
                          }
                        return i;
                      };
                    })(),
                    B = /this\s*\.\s*\S+\s*=/,
                    I = /^[a-z$_][a-z$_0-9]*$/i,
                    N = (function () {
                      return "stack" in new Error()
                        ? function (t) {
                            return C(t) ? t : new Error(m(t));
                          }
                        : function (t) {
                            if (C(t)) return t;
                            try {
                              throw new Error(m(t));
                            } catch (t) {
                              return t;
                            }
                          };
                    })(),
                    D = function (t) {
                      return k.isArray(t) ? t : null;
                    };
                  if ("undefined" != typeof Symbol && Symbol.iterator) {
                    var L =
                      "function" == typeof Array.from
                        ? function (t) {
                            return Array.from(t);
                          }
                        : function (t) {
                            for (
                              var e, n = [], r = t[Symbol.iterator]();
                              !(e = r.next()).done;

                            )
                              n.push(e.value);
                            return n;
                          };
                    D = function (t) {
                      return k.isArray(t)
                        ? t
                        : null != t && "function" == typeof t[Symbol.iterator]
                        ? L(t)
                        : null;
                    };
                  }
                  var H =
                      "undefined" != typeof e &&
                      "[object process]" === T(e).toLowerCase(),
                    U = "undefined" != typeof e && "undefined" != typeof e.env,
                    M = {
                      isClass: d,
                      isIdentifier: v,
                      inheritedDataKeys: V,
                      getDataPropertyOrDefault: p,
                      thrower: f,
                      isArray: k.isArray,
                      asArray: D,
                      notEnumerableProp: h,
                      isPrimitive: a,
                      isObject: c,
                      isError: g,
                      canEvaluate: x,
                      errorObj: S,
                      tryCatch: s,
                      inherits: A,
                      withAppended: l,
                      maybeWrapAsError: u,
                      toFastProperties: _,
                      filledRange: y,
                      toString: m,
                      canAttachTrace: C,
                      ensureErrorObject: N,
                      originatesFromRejection: w,
                      markAsOriginatingFromRejection: b,
                      classString: T,
                      copyDescriptors: E,
                      hasDevTools:
                        "undefined" != typeof chrome &&
                        chrome &&
                        "function" == typeof chrome.loadTimes,
                      isNode: H,
                      hasEnvVariables: U,
                      env: F,
                      global: R,
                      getNativePromise: P,
                      domainBind: j,
                    };
                  (M.isRecentNode =
                    M.isNode &&
                    (function () {
                      var t = e.versions.node.split(".").map(Number);
                      return (0 === t[0] && t[1] > 10) || t[0] > 0;
                    })()),
                    M.isNode && M.toFastProperties(e);
                  try {
                    throw new Error();
                  } catch (t) {
                    M.lastLineError = t;
                  }
                  r.exports = M;
                },
                { "./es5": 13 },
              ],
            },
            {},
            [4]
          )(4);
        }),
          "undefined" != typeof window && null !== window
            ? (window.P = window.Promise)
            : "undefined" != typeof self &&
              null !== self &&
              (self.P = self.Promise);
      }.call(
        e,
        n(3),
        (function () {
          return this;
        })(),
        n(4).setImmediate
      ));
    },
    function (t, e) {
      function n() {
        throw new Error("setTimeout has not been defined");
      }
      function r() {
        throw new Error("clearTimeout has not been defined");
      }
      function i(t) {
        if (l === setTimeout) return setTimeout(t, 0);
        if ((l === n || !l) && setTimeout)
          return (l = setTimeout), setTimeout(t, 0);
        try {
          return l(t, 0);
        } catch (e) {
          try {
            return l.call(null, t, 0);
          } catch (e) {
            return l.call(this, t, 0);
          }
        }
      }
      function o(t) {
        if (p === clearTimeout) return clearTimeout(t);
        if ((p === r || !p) && clearTimeout)
          return (p = clearTimeout), clearTimeout(t);
        try {
          return p(t);
        } catch (e) {
          try {
            return p.call(null, t);
          } catch (e) {
            return p.call(this, t);
          }
        }
      }
      function s() {
        _ &&
          f &&
          ((_ = !1), f.length ? (d = f.concat(d)) : (v = -1), d.length && a());
      }
      function a() {
        if (!_) {
          var t = i(s);
          _ = !0;
          for (var e = d.length; e; ) {
            for (f = d, d = []; ++v < e; ) f && f[v].run();
            (v = -1), (e = d.length);
          }
          (f = null), (_ = !1), o(t);
        }
      }
      function c(t, e) {
        (this.fun = t), (this.array = e);
      }
      function u() {}
      var l,
        p,
        h = (t.exports = {});
      !(function () {
        try {
          l = "function" == typeof setTimeout ? setTimeout : n;
        } catch (t) {
          l = n;
        }
        try {
          p = "function" == typeof clearTimeout ? clearTimeout : r;
        } catch (t) {
          p = r;
        }
      })();
      var f,
        d = [],
        _ = !1,
        v = -1;
      (h.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        d.push(new c(t, e)), 1 !== d.length || _ || i(a);
      }),
        (c.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (h.title = "browser"),
        (h.browser = !0),
        (h.env = {}),
        (h.argv = []),
        (h.version = ""),
        (h.versions = {}),
        (h.on = u),
        (h.addListener = u),
        (h.once = u),
        (h.off = u),
        (h.removeListener = u),
        (h.removeAllListeners = u),
        (h.emit = u),
        (h.binding = function (t) {
          throw new Error("process.binding is not supported");
        }),
        (h.cwd = function () {
          return "/";
        }),
        (h.chdir = function (t) {
          throw new Error("process.chdir is not supported");
        }),
        (h.umask = function () {
          return 0;
        });
    },
    function (t, e, n) {
      function r(t, e) {
        (this._id = t), (this._clearFn = e);
      }
      var i = Function.prototype.apply;
      (e.setTimeout = function () {
        return new r(i.call(setTimeout, window, arguments), clearTimeout);
      }),
        (e.setInterval = function () {
          return new r(i.call(setInterval, window, arguments), clearInterval);
        }),
        (e.clearTimeout = e.clearInterval =
          function (t) {
            t && t.close();
          }),
        (r.prototype.unref = r.prototype.ref = function () {}),
        (r.prototype.close = function () {
          this._clearFn.call(window, this._id);
        }),
        (e.enroll = function (t, e) {
          clearTimeout(t._idleTimeoutId), (t._idleTimeout = e);
        }),
        (e.unenroll = function (t) {
          clearTimeout(t._idleTimeoutId), (t._idleTimeout = -1);
        }),
        (e._unrefActive = e.active =
          function (t) {
            clearTimeout(t._idleTimeoutId);
            var e = t._idleTimeout;
            e >= 0 &&
              (t._idleTimeoutId = setTimeout(function () {
                t._onTimeout && t._onTimeout();
              }, e));
          }),
        n(5),
        (e.setImmediate = setImmediate),
        (e.clearImmediate = clearImmediate);
    },
    function (t, e, n) {
      (function (t, e) {
        !(function (t, n) {
          "use strict";
          function r(t) {
            "function" != typeof t && (t = new Function("" + t));
            for (
              var e = new Array(arguments.length - 1), n = 0;
              n < e.length;
              n++
            )
              e[n] = arguments[n + 1];
            var r = { callback: t, args: e };
            return (_[d] = r), f(d), d++;
          }
          function i(t) {
            delete _[t];
          }
          function o(t) {
            var e = t.callback,
              r = t.args;
            switch (r.length) {
              case 0:
                e();
                break;
              case 1:
                e(r[0]);
                break;
              case 2:
                e(r[0], r[1]);
                break;
              case 3:
                e(r[0], r[1], r[2]);
                break;
              default:
                e.apply(n, r);
            }
          }
          function s(t) {
            if (v) setTimeout(s, 0, t);
            else {
              var e = _[t];
              if (e) {
                v = !0;
                try {
                  o(e);
                } finally {
                  i(t), (v = !1);
                }
              }
            }
          }
          function a() {
            f = function (t) {
              e.nextTick(function () {
                s(t);
              });
            };
          }
          function c() {
            if (t.postMessage && !t.importScripts) {
              var e = !0,
                n = t.onmessage;
              return (
                (t.onmessage = function () {
                  e = !1;
                }),
                t.postMessage("", "*"),
                (t.onmessage = n),
                e
              );
            }
          }
          function u() {
            var e = "setImmediate$" + Math.random() + "$",
              n = function (n) {
                n.source === t &&
                  "string" == typeof n.data &&
                  0 === n.data.indexOf(e) &&
                  s(+n.data.slice(e.length));
              };
            t.addEventListener
              ? t.addEventListener("message", n, !1)
              : t.attachEvent("onmessage", n),
              (f = function (n) {
                t.postMessage(e + n, "*");
              });
          }
          function l() {
            var t = new MessageChannel();
            (t.port1.onmessage = function (t) {
              var e = t.data;
              s(e);
            }),
              (f = function (e) {
                t.port2.postMessage(e);
              });
          }
          function p() {
            var t = y.documentElement;
            f = function (e) {
              var n = y.createElement("script");
              (n.onreadystatechange = function () {
                s(e),
                  (n.onreadystatechange = null),
                  t.removeChild(n),
                  (n = null);
              }),
                t.appendChild(n);
            };
          }
          function h() {
            f = function (t) {
              setTimeout(s, 0, t);
            };
          }
          if (!t.setImmediate) {
            var f,
              d = 1,
              _ = {},
              v = !1,
              y = t.document,
              m = Object.getPrototypeOf && Object.getPrototypeOf(t);
            (m = m && m.setTimeout ? m : t),
              "[object process]" === {}.toString.call(t.process)
                ? a()
                : c()
                ? u()
                : t.MessageChannel
                ? l()
                : y && "onreadystatechange" in y.createElement("script")
                ? p()
                : h(),
              (m.setImmediate = r),
              (m.clearImmediate = i);
          }
        })(
          "undefined" == typeof self
            ? "undefined" == typeof t
              ? this
              : t
            : self
        );
      }.call(
        e,
        (function () {
          return this;
        })(),
        n(3)
      ));
    },
  ]);
});
//# sourceMappingURL=transition.min.js.map

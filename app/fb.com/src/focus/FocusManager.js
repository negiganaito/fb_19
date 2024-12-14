/* eslint-disable no-unused-vars */
/* eslint-disable no-var */

import { getTabbableNodes } from './getTabbableNodes';

/* eslint-disable no-sequences */
var h = !1;
var i = !1;
var j = !1;
var k = 500;
function l() {
  try {
    // eslint-disable-next-line no-inner-declarations
    var a = document.createElement('div');
    a.addEventListener(
      'focus',
      (a) => {
        a.preventDefault(), a.stopPropagation();
      },
      !0,
    );
    a.focus(
      Object.defineProperty({}, 'preventScroll', {
        // eslint-disable-next-line getter-return
        get: function () {
          i = !0;
        },
      }),
    );
  } catch (a) {}
}
function m(a) {
  a = a.parentElement;
  var b = [];
  var c = document.scrollingElement || document.documentElement;
  while (a && a !== c) {
    // eslint-disable-next-line no-inner-declarations
    var d = a;
    // eslint-disable-next-line no-inner-declarations
    var e = d.offsetHeight;
    d = d.offsetWidth;
    (e < a.scrollHeight || d < a.scrollWidth) && b.push([a, a.scrollTop, a.scrollLeft]);
    a = a.parentElement;
  }
  c && b.push([c, c.scrollTop, c.scrollLeft]);
  return b;
}
function n(a) {
  // eslint-disable-next-line no-inner-declarations
  for (var b = 0; b < a.length; b++) {
    // eslint-disable-next-line no-inner-declarations
    var c = a[b];
    // eslint-disable-next-line no-inner-declarations
    var d = c[0];
    // eslint-disable-next-line no-inner-declarations
    var e = c[1];
    c = c[2];
    d.scrollTop = e;
    d.scrollLeft = c;
  }
}
function a(a, b) {
  a = Array.isArray(a) ? a : [a];
  // eslint-disable-next-line no-inner-declarations
  for (var c = 0; c < a.length; c++) {
    // eslint-disable-next-line no-inner-declarations
    var d = b.DO_NOT_USE_queryAllNodes(a[c]);
    if (d) return d;
  }
  return null;
}
function o(a, b) {
  a = Array.isArray(a) ? a : [a];
  // eslint-disable-next-line no-inner-declarations
  for (var c = 0; c < a.length; c++) {
    // eslint-disable-next-line no-inner-declarations
    var d = b.DO_NOT_USE_queryFirstNode(a[c]);
    if (d) return d;
  }
  return null;
}
function b(a, b, c) {
  c = c || {};
  var d = c.preventScroll;
  var e = c.focusWithoutUserIntent;
  c = c.focusWithAutoFocus;
  a = o(a, b);
  a !== null &&
    a !== undefined &&
    p(a, {
      preventScroll: d,
      focusWithoutUserIntent: e,
      focusWithAutoFocus: c,
    });
}
function d() {
  return h;
}
function e(a) {
  return a._focusWithAutoFocus === !0;
}
function p(a, b) {
  b = b || {};
  var c = b.preventScroll;
  var d = b.focusWithoutUserIntent;
  b = b.focusWithAutoFocus;
  if (a !== null && a !== undefined) {
    j || ((j = !0), l());
    // eslint-disable-next-line no-inner-declarations
    var e = a._tabIndexState;
    if (e && e.canTab === !1) return;
    e = e ? e.value : a.tabIndex;
    a.tabIndex = -1;
    // eslint-disable-next-line no-inner-declarations
    var f = h;
    c = c || !1;
    b === !0 &&
      ((a._focusWithAutoFocus = !0),
      window.setTimeout(() => {
        a._focusWithAutoFocus = !1;
      }, k));
    try {
      h = d || !1;
      b = a.__lexicalEditor;
      if (b !== void 0) b.focus();
      else if (!c) t(a);
      else if (i)
        t(a, {
          preventScroll: !0,
        });
      else {
        d = m(a);
        t(a);
        n(d);
      }
    } catch (a) {
    } finally {
      h = f;
    }
    a.tabIndex = e;
  }
}
function f(a, b, d) {
  a = getTabbableNodes(a, b);
  b = a[0];
  var e = a[2];
  var f = a[3];
  a = a[4];
  a !== null &&
    a !== e &&
    b &&
    p(b[f + 1], {
      preventScroll: d,
    });
}
function q(a, b, d) {
  a = getTabbableNodes(a, b);
  b = a[0];
  var e = a[1];
  var f = a[3];
  a = a[4];
  a !== null &&
    a !== e &&
    b &&
    p(b[f - 1], {
      preventScroll: d,
    });
}
// eslint-disable-next-line max-params
function r(a, b, d, e, f) {
  a = getTabbableNodes(a, b);
  b = a[0];
  var g = a[1];
  var h = a[2];
  var i = a[3];
  a = a[4];
  if (a === null || a === undefined || b === null || b === undefined) return;
  a === h
    ? f !== null && f !== undefined
      ? f()
      : e === !0 && (p(g), d.preventDefault(), d.stopPropagation())
    : (p(b[i + 1]), d.preventDefault(), d.stopPropagation());
}

// eslint-disable-next-line max-params
function s(a, b, d, e, f) {
  a = getTabbableNodes(a, b);
  b = a[0];
  var g = a[1];
  var h = a[2];
  var i = a[3];
  a = a[4];
  if (a === null || a === undefined || b === null || b === undefined) return;
  a === g
    ? f !== null && f !== undefined
      ? f()
      : e === !0 && (p(h), d.preventDefault(), d.stopPropagation())
    : (p(b[i - 1]), d.preventDefault(), d.stopPropagation());
}
var t = function (a, b) {
  (a.focus || HTMLElement.prototype.focus).call(a, b);
};

export const FocusManager = {
  getAllNodesFromOneOrManyQueries: a,
  getFirstNodeFromOneOrManyQueries: o,
  focusFirst: b,
  isFocusingWithoutUserIntent: d,
  wasElementAutoFocused: e,
  focusElement: p,
  focusNext: f,
  focusPrevious: q,
  focusNextContained: r,
  focusPreviousContained: s,
};

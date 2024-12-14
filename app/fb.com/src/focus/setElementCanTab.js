const c = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'tabIndex');
const d = Object.getOwnPropertyDescriptor(SVGElement.prototype, 'tabIndex');
const e = function (a) {
  return a;
};

let g = c ? c.set : e;
let h = d ? d.set : e;

function i(a) {
  return a instanceof SVGElement ? h : g;
}

function a(a, b, c) {
  c === void 0 && (c = !1);
  let d = a._tabIndexState;
  let e = i(a);
  if (!d) {
    b && c && a.tabIndex < 0 && (a.tabIndex = 0);
    let f = {
      canTab: b,
      value: a.tabIndex,
    };
    a._tabIndexState = f;
    b || (a.tabIndex = -1);
    Object.defineProperty(a, 'tabIndex', {
      configurable: !0,
      enumerable: !1,
      get: function () {
        return f.canTab ? f.value : -1;
      },
      set: function (a) {
        f.canTab && typeof e === 'function' && e.call(this, a);
        f.value = a;
      },
    });
  } else d.canTab !== b && typeof e === 'function' && (e.call(a, b ? d.value : -1), (d.canTab = b));
}

function b(a) {
  let b = a._tabIndexState;
  if (!b) return a.tabIndex > 0;
  else return b.canTab;
}

export const setElementCanTab = {
  canElementTab: b,
  setElementCanTab: a,
};

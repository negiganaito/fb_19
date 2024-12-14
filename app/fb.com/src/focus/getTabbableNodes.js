/* eslint-disable no-var */

export function getTabbableNodes(a, b) {
  let c = document.activeElement;
  let d = function (b, d, e) {
    return e === c
      ? !0
      : a(b, d, e) &&
          e.offsetWidth > 0 &&
          e.offsetHeight > 0 &&
          e.tabIndex !== -1 &&
          window.getComputedStyle(e).visibility !== 'hidden';
  };
  b = c ? b.DO_NOT_USE_queryAllNodes(d) : null;
  if (!b) return [null, null, null, 0, null];
  d = {};

  for (
    // eslint-disable-next-line no-inner-declarations
    var e = b,
      f = Array.isArray(e),
      g = 0,
      e = f ? e : e[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    ;

  ) {
    // eslint-disable-next-line no-inner-declarations
    var h;
    if (f) {
      if (g >= e.length) break;
      h = e[g++];
    } else {
      g = e.next();
      if (g.done) break;
      h = g.value;
    }
    // eslint-disable-next-line no-self-assign
    h = h;
    if (h instanceof HTMLInputElement && h.tagName === 'INPUT' && h.type === 'radio' && h.name) {
      // eslint-disable-next-line no-inner-declarations
      var i;
      // eslint-disable-next-line no-cond-assign
      d[h.name] = [].concat((i = d[h.name]) ? i : [], [h]);
    }
  }
  let j = Object.values(d)
    .map((a) => {
      if (
        a.find((a) => {
          return a.checked;
        })
      )
        return a.filter((a) => {
          return !a.checked;
        });
      a[0];
      a = a.slice(1);
      return a;
    })
    .flat();
  b = b.filter((a) => {
    return !j.includes(a);
  });
  i = b[0];
  h = b[b.length - 1];
  g = b.indexOf(c);
  f = null;
  g !== -1 && (f = b[g]);
  return [b, i, h, g, f];
}

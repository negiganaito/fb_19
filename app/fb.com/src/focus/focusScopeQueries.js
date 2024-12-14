function g(a, b) {
  return a === 'h1' ||
    a === 'h2' ||
    a === 'h3' ||
    (b.role === 'heading' && (b['aria-level'] === 1 || b['aria-level'] === 2 || b['aria-level'] === 3)) ||
    b['aria-busy'] === !0 ||
    b.role === 'progressbar'
    ? !0
    : !1;
}
function a(a, b) {
  return b.tabIndex === -1 &&
    !(b.disabled === !0 || b.type === 'hidden' || b['aria-disabled'] === !0 || b['aria-hidden'] === !0)
    ? !0
    : i(a, b);
}
function h(a) {
  return a.type !== 'hidden' && a.type !== 'file';
}
function b(a, b) {
  return a === 'input' && h(b);
}
function i(a, b) {
  if (b.tabIndex === -1 || b.disabled === !0) return !1;
  if (b.tabIndex === 0 || b.contentEditable === !0) return !0;
  if (a === 'a' || a === 'area') return b.href && b.href !== '' && b.rel !== 'ignore';
  return a === 'input' ? h(b) : a === 'button' || a === 'textarea' || a === 'select' || a === 'iframe' || a === 'embed';
}
// eslint-disable-next-line no-func-assign
b = [b, i];
function j(a) {
  return a.offsetWidth === 0 && a.offsetHeight === 0;
}
function c(a, b, c) {
  return !j(c) && i(a, b);
}
function k(a, b) {
  return a === 'td' || a === 'th' || b.role === 'gridcell' || b.role === 'columnheader' || b.role === 'rowheader'
    ? !0
    : !1;
}
function d(a, b) {
  return !k(a, b) && i(a, b);
}
let l = [g, i];
function e(a, b) {
  return g(a, b) || i(a, b);
}
let m = function (a, b) {
  return b['data-focus-target'] === !0 && (b['aria-busy'] === !0 || b.role === 'progressbar') ? !0 : !1;
};

export const focusScopeQueries = {
  displayedTabbableScopeQuery: c,
  focusableScopeQuery: a,
  headerAndSpinnerFocusScopeQuery: g,
  headerFirstTabbableSecondScopeQuery: l,
  headerOrTabbableScopeQuery: e,
  inputFirstTabbbableScopeQuery: b,
  tabbableScopeQuery: i,
  tableCellScopeQuery: k,
  tableCellTabbableContentScopeQuery: d,
  topLoadingScopeQuery: m,
};

import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';
import removeFromArray from 'fbjs/lib/removeFromArray';

/* eslint-disable no-sequences */

// let emptyState = {};

// function once(fn) {
//   let called = false;
//   return function () {
//     if (!called) {
//       fn();
//       called = true;
//     }
//   };
// }

// export class XPlatReactToasterStateManager {
//   constructor({ callbackScheduler, maxQueuedToasts }) {
//     this._toastCount = 0;
//     this._toasts = new Map();
//     this._listeners = [];
//     this._views = [];
//     this._priorityView = null;
//     this._callbackScheduler = callbackScheduler;
//     this._maxQueuedToasts = maxQueuedToasts;
//   }

//   push(value, duration) {
//     let id = `toast-${this._toastCount++}`;
//     const toast = {
//       duration,
//       expired: false,
//       id,
//       shown: false,
//       timer: null,
//       value,
//     };
//     this._dispatch({
//       node: toast,
//       type: "PUSH",
//     });
//     return id;
//   }

//   replace(id, value) {
//     this._dispatch({
//       id,
//       type: "REPLACE",
//       value,
//     });
//   }

//   shown(id) {
//     this._dispatch({
//       id,
//       type: "SHOWN",
//     });
//   }

//   delete(id) {
//     this._dispatch({
//       id,
//       type: "DELETE",
//     });
//   }

//   expire(id) {
//     this._dispatch({
//       id,
//       type: "EXPIRE",
//     });
//   }

//   hidden(id) {
//     this._dispatch({
//       id,
//       type: "HIDDEN",
//     });
//   }

//   stopTimer(id) {
//     this._dispatch({
//       id,
//       type: "STOP_TIMER",
//     });
//   }

//   resetTimer(id) {
//     this._dispatch({
//       id,
//       type: "RESET_TIMER",
//     });
//   }

//   getState() {
//     return Object.fromEntries(this._toasts);
//   }

//   getEmptyState() {
//     return emptyState;
//   }

//   addListener(listener) {
//     let _this = this;
//     this._listeners.push(listener);
//     return {
//       remove: once(() => {
//         removeFromArray(_this._listeners, listener);
//       }),
//     };
//   }

//   _updatePriorityView(view) {
//     if (!this._priorityView || view.priority > this._priorityView.priority) {
//       this._priorityView = view;
//     }
//   }

//   registerView(handler, priority = 1) {
//     let _this = this;
//     // b === void 0 && (b = 1);
//     let view = {
//       handler,
//       priority,
//     };
//     this._views.push(view);
//     this._updatePriorityView(view);
//     this._notifyListeners();

//     return {
//       remove: once(() => {
//         removeFromArray(_this._views, view);

//         if (_this._priorityView === view) {
//           _this._priorityView = null;
//           _this._views.forEach((v) => {
//             return _this._updatePriorityView(v);
//           });
//         }
//       }),
//     };
//   }

//   // eslint-disable-next-line complexity
//   _dispatch(toastAction) {
//     let prevToasts = this._toasts;
//     switch (toastAction.type) {
//       case "PUSH":
//         // eslint-disable-next-line no-inner-declarations, no-var, no-case-declarations
//         let c = toastAction.node;
//         this._toasts = new Map(
//           [].concat(Array.from(this._toasts), [[c.id, c]])
//         );
//         if (this._maxQueuedToasts !== 0) {
//           c = Array.from(this._toasts.values()).filter((a) => {
//             return !a.shown && !a.expired;
//           });
//           if (c.length > this._maxQueuedToasts) {
//             c = c[0];
//             this.delete(c.id);
//           }
//         }
//         break;
//       case "SHOWN":
//         if (
//           this._toasts.has(toastAction.id) &&
//           !this.getToast(toastAction.id).shown
//         ) {
//           let c = { ...this.getToast(toastAction.id), shown: true };
//           this._toasts = new Map(
//             [].concat(Array.from(this._toasts), [
//               [toastAction.id, this._initializeTimer(c)],
//             ])
//           );
//         }
//         break;
//       case "EXPIRE":
//         if (this._toasts.has(toastAction.id)) {
//           let toastList = { ...this.getToast(toastAction.id), expired: true };
//           this._toasts = new Map(
//             [].concat(Array.from(this._toasts), [
//               [toastAction.id, this._clearTimer(toastList)],
//             ])
//           );
//           this._scheduleRemoval(toastList);
//         }
//         break;
//       case "HIDDEN":
//         if (this._toasts.has(toastAction.id)) {
//           let toast = this.getToast(toastAction.id);
//           (toast.shown || toast.expired) &&
//             ((this._toasts = new Map(this._toasts)),
//             this._toasts.delete(toastAction.id),
//             this._clearTimer(toast));
//         }
//         break;
//       case "DELETE":
//         if (this._toasts.has(toastAction.id)) {
//           let toast = this.getToast(toastAction.id);
//           this._toasts = new Map(this._toasts);
//           this._toasts.delete(toastAction.id);
//           this._clearTimer(toast);
//         }
//         break;
//       case "REPLACE":
//         if (this._toasts.has(toastAction.id)) {
//           let toast = this.getToast(toastAction.id);
//           this._toasts = new Map(
//             [].concat(Array.from(this._toasts), [
//               [toastAction.id, { ...toast, value: toastAction.value }],
//             ])
//           );
//         }
//         break;
//       case "STOP_TIMER":
//         if (
//           this._toasts.has(toastAction.id) &&
//           this._isTimerActive(this.getToast(toastAction.id))
//         ) {
//           let toast = { ...this.getToast(toastAction.id) };
//           this._toasts = new Map(
//             [].concat(Array.from(this._toasts), [
//               [toastAction.id, this._clearTimer(toast)],
//             ])
//           );
//         }
//         break;
//       case "RESET_TIMER":
//         if (
//           this._toasts.has(toastAction.id) &&
//           !this._isTimerActive(this.getToast(toastAction.id))
//         ) {
//           let toastList = { ...this.getToast(toastAction.id) };
//           this._toasts = new Map(
//             [].concat(Array.from(this._toasts), [
//               [toastAction.id, this._initializeTimer(toastList)],
//             ])
//           );
//         }
//         break;
//       default:
//         toastAction.type;
//     }

//     // prevToasts !== this._toasts && this._notifyListeners();
//     if (prevToasts !== this._toasts) {
//       this._notifyListeners();
//     }
//   }

//   _notifyListeners() {
//     let _this = this;
//     this._listeners.forEach((b) => {
//       return _this._callbackScheduler(() => {
//         b();
//       });
//     });
//     this._views.forEach((b) => {
//       return _this._callbackScheduler(() => {
//         b.handler(
//           b === _this._priorityView ? _this.getState() : _this.getEmptyState()
//         );
//       });
//     });
//   }

//   _initializeTimer(toast) {
//     let _this = this;
//     toast.duration &&
//       !toast.timer &&
//       (toast.timer = setTimeout(() => {
//         _this.expire(toast.id);
//       }, toast.duration));
//     return toast;
//   }

//   _clearTimer(toast) {
//     if (toast.timer) {
//       clearTimeout(toast.timer);
//       toast.timer = null;
//     }
//     return toast;
//   }

//   _scheduleRemoval(toast) {
//     let _this = this;
//     this._clearTimer(toast);
//     let d = toast.id;
//     setTimeout(() => {
//       _this.delete(d);
//     }, 1e3);
//   }

//   _isTimerActive(toast) {
//     return toast.timer !== null;
//   }

//   getToast(id) {
//     const toast = this._toasts.get(id);
//     if (!toast)
//       throw unrecoverableViolation(
//         "Toast with given identifier was not found",
//         "comet_ui"
//       );
//     return toast;
//   }

//   static instance = null;

//   static getInstance(config) {
//     if (!XPlatReactToasterStateManager.instance) {
//       XPlatReactToasterStateManager.instance =
//         new XPlatReactToasterStateManager(config);
//     }

//     return this.instance;
//   }

//   static resetInstance_DO_NOT_USE() {
//     XPlatReactToasterStateManager.instance = null;
//   }
// }

let h = {};

function i(a) {
  let b = !1;
  return function () {
    b || (a(), (b = !0));
  };
}

export class XPlatReactToasterStateManager {
  constructor({ callbackScheduler, maxQueuedToasts }) {
    this.$1 = 0;
    this.$2 = new Map();
    this.$3 = [];
    this.$4 = [];
    this.$5 = null;
    this.$7 = callbackScheduler;
    this.$6 = maxQueuedToasts;
  }

  push = function (val, duration) {
    let id = 'toast-' + this.$1++;

    const node = {
      duration,
      expired: false,
      id: id,
      shown: false,
      timer: null,
      value: val,
    };
    this.$8({
      node,
      type: 'PUSH',
    });

    return id;
  };

  replace = function (a, b) {
    this.$8({
      id: a,
      type: 'REPLACE',
      value: b,
    });
  };

  shown = function (a) {
    this.$8({
      id: a,
      type: 'SHOWN',
    });
  };

  delete = function (a) {
    this.$8({
      id: a,
      type: 'DELETE',
    });
  };

  expire = function (a) {
    this.$8({
      id: a,
      type: 'EXPIRE',
    });
  };

  hidden = function (a) {
    this.$8({
      id: a,
      type: 'HIDDEN',
    });
  };

  stopTimer = function (a) {
    this.$8({
      id: a,
      type: 'STOP_TIMER',
    });
  };

  resetTimer = function (a) {
    this.$8({
      id: a,
      type: 'RESET_TIMER',
    });
  };

  getState = function () {
    return Object.fromEntries(this.$2);
  };

  getEmptyState = function () {
    return h;
  };

  addListener = function (a) {
    let b = this;
    this.$3.push(a);
    return {
      remove: i(() => {
        removeFromArray(b.$3, a);
      }),
    };
  };

  $9 = function (a) {
    (!this.$5 || a.priority > this.$5.priority) && (this.$5 = a);
  };

  registerView = function (a, b) {
    let d = this;
    b === void 0 && (b = 1);
    let e = {
      handler: a,
      priority: b,
    };
    this.$4.push(e);
    this.$9(e);
    this.$10();
    return {
      remove: i(() => {
        removeFromArray(d.$4, e),
          d.$5 === e &&
            ((d.$5 = null),
            d.$4.forEach((a) => {
              return d.$9(a);
            }));
      }),
    };
  };

  // eslint-disable-next-line complexity
  $8 = function (a) {
    let b = this.$2;
    switch (a.type) {
      case 'PUSH':
        // eslint-disable-next-line no-inner-declarations, no-var
        var c = a.node;
        this.$2 = new Map([].concat(Array.from(this.$2), [[c.id, c]]));
        if (this.$6 !== 0) {
          c = Array.from(this.$2.values()).filter((a) => {
            return !a.shown && !a.expired;
          });
          if (c.length > this.$6) {
            c = c[0];
            this['delete'](c.id);
          }
        }
        break;
      case 'SHOWN':
        if (this.$2.has(a.id) && !this.$11(a.id).shown) {
          c = { ...this.$11(a.id), shown: !0 };
          this.$2 = new Map([].concat(Array.from(this.$2), [[a.id, this.$12(c)]]));
        }
        break;
      case 'EXPIRE':
        if (this.$2.has(a.id)) {
          c = { ...this.$11(a.id), expired: !0 };
          this.$2 = new Map([].concat(Array.from(this.$2), [[a.id, this.$13(c)]]));
          this.$14(c);
        }
        break;
      case 'HIDDEN':
        if (this.$2.has(a.id)) {
          c = this.$11(a.id);
          (c.shown || c.expired) && ((this.$2 = new Map(this.$2)), this.$2['delete'](a.id), this.$13(c));
        }
        break;
      case 'DELETE':
        if (this.$2.has(a.id)) {
          c = this.$11(a.id);
          this.$2 = new Map(this.$2);
          this.$2['delete'](a.id);
          this.$13(c);
        }
        break;
      case 'REPLACE':
        if (this.$2.has(a.id)) {
          c = this.$11(a.id);
          this.$2 = new Map([].concat(Array.from(this.$2), [[a.id, { ...c, value: a.value }]]));
        }
        break;
      case 'STOP_TIMER':
        if (this.$2.has(a.id) && this.$15(this.$11(a.id))) {
          c = { ...this.$11(a.id) };
          this.$2 = new Map([].concat(Array.from(this.$2), [[a.id, this.$13(c)]]));
        }
        break;
      case 'RESET_TIMER':
        if (this.$2.has(a.id) && !this.$15(this.$11(a.id))) {
          c = { ...this.$11(a.id) };
          this.$2 = new Map([].concat(Array.from(this.$2), [[a.id, this.$12(c)]]));
        }
        break;
      default:
        a.type;
    }
    b !== this.$2 && this.$10();
  };
  $10 = function () {
    let a = this;
    this.$3.forEach((b) => {
      return a.$7(() => {
        b();
      });
    });
    this.$4.forEach((b) => {
      return a.$7(() => {
        b.handler(b === a.$5 ? a.getState() : a.getEmptyState());
      });
    });
  };
  $12 = function (a) {
    let b = this;
    a.duration &&
      (a.timer === null || a.timer === undefined) &&
      (a.timer = setTimeout(() => {
        b.expire(a.id);
      }, a.duration));
    return a;
  };
  $13 = function (a) {
    a.timer !== null && a.timer !== undefined && (clearTimeout(a.timer), (a.timer = null));
    return a;
  };
  $14 = function (a) {
    let b = this;
    this.$13(a);
    let d = a.id;
    setTimeout(() => {
      b['delete'](d);
    }, 1e3);
  };
  $15 = function (a) {
    return a.timer !== null && a.timer !== undefined;
  };
  $11 = function (a) {
    a = this.$2.get(a);
    if (!a) throw unrecoverableViolation('Toast with given identifier was not found', 'comet_ui');
    return a;
  };

  static instance = null;

  static getInstance(config) {
    if (!XPlatReactToasterStateManager.instance) {
      XPlatReactToasterStateManager.instance = new XPlatReactToasterStateManager(config);
    }

    return this.instance;
  }

  static resetInstance_DO_NOT_USE() {
    XPlatReactToasterStateManager.instance = null;
  }
}

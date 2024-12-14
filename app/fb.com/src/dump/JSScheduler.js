/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {
  unstable__cancelCallback,
  unstable__scheduleCallback,
  unstable_forceFrameRate,
  unstable_getCurrentPriorityLevel,
  unstable_IdlePriority,
  unstable_ImmediatePriority,
  unstable_LowPriority,
  unstable_NormalPriority,
  unstable_Profiling,
  unstable_runWithPriority,
  unstable_shouldYield,
  unstable_UserBlockingPriority,
} from './scheduler.classic';

const priorities = {
  unstable_Immediate: unstable_ImmediatePriority,
  unstable_UserBlocking: unstable_UserBlockingPriority,
  unstable_Normal: unstable_NormalPriority,
  unstable_Low: unstable_LowPriority,
  unstable_Idle: unstable_IdlePriority,
};

let h = !1;

export const JSScheduler = {
  priorities,
  shouldYield: unstable_shouldYield,
  getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
  runWithPriority: unstable_runWithPriority,
  runWithPriority_DO_NOT_USE: unstable_runWithPriority,

  defer: function (a) {
    const b = JSScheduler.getCurrentPriorityLevel();
    return unstable__scheduleCallback(b, a);
  },

  getCallbackScheduler: function () {
    let a = JSScheduler.getCurrentPriorityLevel();
    return function (b) {
      return unstable__scheduleCallback(a, b);
    };
  },

  getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE: function () {
    let a = JSScheduler.getCurrentPriorityLevel();
    return function (c) {
      return unstable__scheduleCallback(priorities.unstable_UserBlocking, () => {
        unstable_runWithPriority(a, c);
      });
    };
  },

  deferUserBlockingRunAtCurrentPri_DO_NOT_USE: function (a) {
    let c = JSScheduler.getCurrentPriorityLevel();
    return unstable__scheduleCallback(priorities.unstable_UserBlocking, () => {
      unstable_runWithPriority(c, a);
    });
  },

  scheduleImmediatePriCallback: function (a) {
    return unstable__scheduleCallback(priorities.unstable_Immediate, a);
  },
  scheduleUserBlockingPriCallback: function (a) {
    return unstable__scheduleCallback(priorities.unstable_UserBlocking, a);
  },
  scheduleNormalPriCallback: function (a) {
    return unstable__scheduleCallback(priorities.unstable_Normal, a);
  },
  scheduleLoggingPriCallback: function (a) {
    return unstable__scheduleCallback(priorities.unstable_Low, a);
  },
  scheduleSpeculativeCallback: function (a) {
    return unstable__scheduleCallback(priorities.unstable_Idle, a);
  },
  cancelCallback: function (a) {
    unstable__cancelCallback(a);
  },

  scheduleDelayedCallback_DO_NOT_USE: function (a, b, c) {
    a = unstable__scheduleCallback(a, c, {
      delay: b,
    });
    return a;
  },
  cancelDelayedCallback_DO_NOT_USE: function (a) {
    // a = a
    return unstable__cancelCallback(a);
  },
  startEventProfiling: function () {
    let a;
    a = !(a = unstable_Profiling) ? void 0 : a.startLoggingProfilingEvents;
    typeof a === 'function' && a();
  },
  stopEventProfiling: function () {
    let a;
    a = !(a = unstable_Profiling) ? void 0 : a.stopLoggingProfilingEvents;
    return typeof a === 'function' ? a() : null;
  },

  makeSchedulerGlobalEntry: function (c, d) {
    // eslint-disable-next-line no-sequences
    c === void 0 && (c = null),
      d === void 0 && (d = !1),
      c !== null && c !== void 0 && unstable_forceFrameRate(c),
      d && JSScheduler.startEventProfiling(),
      (window.ScheduleJSWork = function (a) {
        return function () {
          // eslint-disable-next-line no-inner-declarations, no-var
          for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
          h
            ? a.apply(void 0, c)
            : JSScheduler.deferUserBlockingRunAtCurrentPri_DO_NOT_USE(() => {
                h = !0;
                try {
                  a.apply(void 0, c);
                } finally {
                  h = !1;
                }
              });
        };
      });
  },
};

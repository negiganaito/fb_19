/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export type WebViewPropTypes = React.JSX.IntrinsicElements['html'] & {
  xstyle?: any;
};

export type BaseRowPropType = React.JSX.IntrinsicElements['html'] & {
  align?: 'start' | 'end' | 'center' | 'justify';
  columns?: number;
  direction?: 'forward' | 'backward';
  expanding?: boolean;
  verticalAlign?: 'bottom' | 'center' | 'stretch' | 'top';
  wrap?: 'none' | 'backward' | 'forward';
  xstyle?: any;
};

export type BaseRowItemPropType = WebViewPropTypes & {
  expanding?: boolean;
  useDeprecatedStyles?: boolean;
  verticalAlign?: 'bottom' | 'center' | 'stretch' | 'top';
};

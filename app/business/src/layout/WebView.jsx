import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { babelHelpers } from '@fb-utils/babelHelpers';
import { testID } from '@fb-utils/testID';
import stylex from '@stylexjs/stylex';

import { LegacyHidden } from './LegacyHidden';

const styles = stylex.create({
  hidden: {
    display: 'none',
  },
  root: {
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: '0',
  },
});

/**
 * WebView component that wraps LegacyHidden to manage visibility and rendering.
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").WebViewPropTypes>
 * @returns {React.Element} The rendered component.
 */
const WebView = forwardRef((props, ref) => {
  const { children, suppressHydrationWarning, testid, xstyle, ...restProps } = props;

  let isHidden = props.hidden === true;

  return jsx(LegacyHidden, {
    htmlAttributes: babelHelpers.extends({}, restProps, testID(testid), {
      className: stylex(styles.root, xstyle, isHidden && styles.hidden),
    }),
    mode: isHidden ? 'hidden' : 'visible',
    ref,
    suppressHydrationWarning,
    children,
  });
});

export { WebView };

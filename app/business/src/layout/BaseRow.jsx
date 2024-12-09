/**
 * Changelog:
 * - 09/12/2024
 */

import React, { forwardRef, useMemo } from 'react';
import { BaseRowContext } from '@fb-contexts/BaseRowContext';
import { useBaseRowA11yWrap } from '@fb-hooks/useBaseRowA11yWrap';
import { useMergeRefs } from '@fb-utils/useMergeRefs';
import stylex from '@stylexjs/stylex';

import { BaseView } from './BaseView';

const reverseDirection = {
  end: 'start',
  start: 'end',
};

/**
 * WebView component that wraps LegacyHidden to manage visibility and rendering.
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").BaseRowPropType>
 * @returns {React.Element} The rendered component.
 */
const BaseRow = forwardRef((props, ref) => {
  const {
    align = 'justify', // a
    children, //
    columns = 0, // p
    direction = 'forward', // q
    expanding = false, // r
    role, //
    verticalAlign = 'stretch', // s
    wrap = 'none', // t
    xstyle, // v
    ...restProps //
  } = props;

  // e[13]
  // const baseRowContextValue = useMemo(() => {
  //   return {
  //     columns,
  //     wrap,
  //   };
  // }, [columns, wrap]);

  const baseRowContextValue = {
    columns,
    wrap,
  };

  const [isWrapped, a11yWrapRef] = useBaseRowA11yWrap(direction === 'forward' && wrap === 'backward');

  const combineRef = useMergeRefs(ref, a11yWrapRef);

  let renderedChildren = children;

  if (direction === 'forward' && wrap === 'backward' && isWrapped && Array.isArray(children) && children.length === 2) {
    renderedChildren = [children[1], children[0]];
  }

  let expandingStyle = expanding && styles.expanding;
  let justifyStyle =
    justifyStyles[direction === 'backward' && (align === 'start' || align === 'end') ? reverseDirection[align] : align];

  let alignStyle = alignStyles[verticalAlign];
  let wrapStyle = wrapStyles[wrap];
  let reversedWrapStyle =
    isWrapped &&
    direction === 'forward' &&
    wrap === 'backward' &&
    Array.isArray(children) &&
    children.length === 2 &&
    wrapStyles.forward;

  let directionStyle = directionStyles[direction];
  let rowStyles = [
    styles.row,
    expandingStyle,
    justifyStyle,
    alignStyle,
    wrapStyle,
    reversedWrapStyle,
    directionStyle,
    xstyle,
  ];

  const content = <BaseRowContext.Provider value={baseRowContextValue}>{renderedChildren}</BaseRowContext.Provider>;

  return (
    <BaseView {...restProps} ref={combineRef} role={role} xstyle={rowStyles}>
      {content}
    </BaseView>
  );
});

BaseRow.displayName = 'BaseRow';

const styles = stylex.create({
  expanding: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  row: {
    display: 'flex',
    flexShrink: 0,
    position: 'relative',
  },
});

const justifyStyles = stylex.create({
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  justify: {
    justifyContent: 'space-between',
  },
  start: {
    justifyContent: 'flex-start',
  },
});

const alignStyles = stylex.create({
  bottom: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
  stretch: {
    alignItems: 'stretch',
  },
  top: {
    alignItems: 'flex-start',
  },
});

const wrapStyles = stylex.create({
  backward: {
    flexWrap: 'wrap-reverse',
  },
  forward: {
    flexWrap: 'wrap',
  },
  none: {
    flexWrap: 'nowrap',
  },
});

const directionStyles = stylex.create({
  backward: {
    flexDirection: 'row-reverse',
  },
  forward: {
    flexDirection: 'row',
  },
});

export { BaseRow };

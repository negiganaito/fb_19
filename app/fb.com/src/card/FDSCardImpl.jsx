/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

export const CometCard = forwardRef((props, ref) => {
  const {
    allowOverflow = false,
    background = 'transparent',
    border = 'none',
    borderHighlight,
    children,
    dropShadow = 0,
    expanding = false,
    testid,
    xstyle,
    'aria-label': al,
    'aria-labelledby': all,
    focusable = false,
    scrollable = false,
  } = props;

  const dropShadowStyle = dropShadowStyles[dropShadow];

  return (
    <div className={stylex(borderStyles.container, expanding && borderStyles.expanding)} {...testID(testid)}>
      <BaseView
        ref={ref}
        style={{
          borderRadius: isBlueprintStylesEnabled()
            ? 'max(0px, min(12px, calc((100vw - 4px - 100%) * 9999))) / 12px'
            : 'max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px',
        }}
        xstyle={[
          backgroundStyles[background],
          border === 'solid' && background !== 'white' && borderStyles.borderOnWash,
          border === 'solid' && background === 'white' && borderStyles.borderOnWhite,
          border === 'solid' && borderStyles.borderSolid,
          borderStyles.root,
          !allowOverflow && borderStyles.overflowHidden,
          dropShadowStyle,
          xstyle,
        ]}
      >
        {children}
      </BaseView>
      {border === 'inset' && <div className={stylex(styles.inset)} />}
      {borderHighlight && (
        <div
          className={stylex(
            borderStyles.borderHighlightOverlay,
            borderHighlight === 'animated' && borderStyles.borderHighlightAnimation,
          )}
        />
      )}
    </div>
  );
});

const backgroundStyles = stylex.create({
  'base-wash': {
    backgroundColor: 'var(--wash)',
  },
  'card-flat': {
    backgroundColor: 'var(--card-background-flat)',
  },
  'dark-wash': {
    backgroundColor: 'var(--shadow-5)',
  },
  error: {
    backgroundColor: 'var(--negative)',
  },
  highlight: {
    backgroundColor: 'var(--accent)',
  },
  'light-wash': {
    backgroundColor: 'var(--web-wash)',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  white: {
    backgroundColor: 'var(--surface-background)',
  },
});

const x1f7kpggB = stylex.keyframes({
  '0%': {
    borderTop: '2px solid var(--accent)',
    borderRight: '2px solid var(--accent)',
    borderBottom: '2px solid var(--accent)',
    borderLeft: '2px solid var(--accent)',
  },

  '100%': {
    borderTop: '2px solid transparent',
    borderRight: '2px solid transparent',
    borderBottom: '2px solid transparent',
    borderLeft: '2px solid transparent',
  },
});

const borderStyles = stylex.create({
  borderHighlightAnimation: {
    animationDuration: '1s',
    animationFillMode: 'both',
    animationName: x1f7kpggB,
    animationTimingFunction: 'cubic-bezier(.25,.75,.75,.25)',
  },
  borderHighlightOverlay: {
    borderColor: 'var(--accent)',
    borderRadius: '10px',
    borderStyle: 'solid',
    borderWidth: '2px',
    bottom: '-2px',
    right: '-2px',
    pointerEvents: 'none',
    position: 'absolute',
    left: '-2px',
    top: '-2px',
    zIndex: '1',
  },
  borderInset: {
    borderRadius: '8px',
    bottom: '0',
    boxShadow: 'inset 0 0 0 1px var(--media-inner-border)',
    boxSizing: 'border-box',
    right: '0',
    pointerEvents: 'none',
    position: 'absolute',
    left: '0',
    top: '0',
  },
  borderOnWash: {
    borderColor: 'var(--divider)',
  },
  borderOnWhite: {
    borderColor: 'var(--divider)',
  },
  borderSolid: {
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  expanding: {
    flexGrow: '1',
  },
  overflowHidden: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  root: {
    borderRadius: 'var(--card-corner-radius)',
    width: '100%',
  },
});

const dropShadowStyles = stylex.create({
  1: {
    boxShadow: '0 1px 2px var(--shadow-2)',
  },
  2: {
    boxShadow: '0 2px 12px var(--shadow-2)',
  },
});

const styles = stylex.create({
  inset: {
    borderRadius: '8px',
    bottom: 0,
    boxShadow: 'inset 0 0 0 1px var(--media-inner-border)',
    boxSizing: 'border-box',
    right: 0,
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

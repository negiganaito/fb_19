import React, { forwardRef, useCallback, useContext, useRef, useState } from 'react';
import { BaseButton } from '@fb-button/BaseButton';
import { CometContainerPressableContext } from '@fb-contexts/CometContainerPressableContext';
import { BaseLink } from '@fb-link/BaseLink';
import stylex from '@stylexjs/stylex';

import { CometPressableOverlay } from './CometPressableOverlay';

//  n = c("gkx")("1721477") || c("gkx")("1459")
// eslint-disable-next-line no-unused-vars
const n = true;

// eslint-disable-next-line complexity
export const CometPressable = forwardRef((props, externalRef) => {
  const {
    allowClickEventPropagation,
    children,
    className_DEPRECATED,
    cursorDisabled = false,
    xstyle,
    disabled = false,
    display,
    expanding,
    hideFocusOverlay = false,
    hideHoverOverlay = false,
    // eslint-disable-next-line no-unused-vars
    isContainerTarget = false,
    linkProps,
    onFocusChange,
    onFocusVisibleChange,
    onFocusIn,
    onFocusOut,

    onHoverChange,
    onHoverIn,
    onHoverMove,
    onPressOut,

    onPress,
    onPressChange,
    onPressIn,
    onHoverOut,

    preventContextMenu,
    overlayDisabled = false,
    overlayOffset,
    overlayFocusRingPosition,
    overlayFocusVisibleStyle,
    overlayHoveredStyle,
    overlayPressedStyle,
    overlayFocused = false,
    overlayRadius,
    overlayXStyle,
    suppressFocusRing = false,
    testOnly_pressed = false,
    // eslint-disable-next-line no-unused-vars
    testid,
    // eslint-disable-next-line no-unused-vars
    onContextMenu,
    pressedStyleValue,
    showDynamicHover,
    ...rest
  } = props;

  const _display = !expanding ? 'block' : display;

  const [pressedState, setPressed] = useState(testOnly_pressed);
  const [focusedState, setFocused] = useState(false);
  const [focusVisibleState, setFocusVisible] = useState(false);
  const [hoveredState, setHovered] = useState(false);

  const onPressChangeCb = useCallback(
    (e) => {
      setPressed(e || testOnly_pressed);
      onPressChange && onPressChange(e);
    },
    [onPressChange, testOnly_pressed],
  );

  const onFocusChangeCb = useCallback(
    (e) => {
      setFocused(e);
      onFocusChange && onFocusChange(e);
    },
    [onFocusChange],
  );

  const onFocusVisibleChangeCb = useCallback(
    (e) => {
      setFocusVisible(e);
      onFocusVisibleChange && onFocusVisibleChange(e);
    },
    [onFocusVisibleChange],
  );

  const onHoverChangeCb = useCallback(
    (e) => {
      setHovered(e);
      onHoverChange && onHoverChange(e);
    },
    [onHoverChange],
  );

  const overlay = overlayDisabled ? undefined : (
    <CometPressableOverlay
      focusRingPosition={overlayFocusRingPosition}
      focusVisible={!hideFocusOverlay && focusVisibleState}
      focusVisibleStyle={overlayFocusVisibleStyle}
      hovered={!hideHoverOverlay && hoveredState}
      hoveredStyle={overlayHoveredStyle}
      offset={overlayOffset}
      pressed={pressedState}
      pressedStyle={overlayPressedStyle}
      radius={overlayRadius}
      showFocusRing
      xstyle={overlayXStyle}
    />
  );

  const _children =
    typeof children === 'function' ? (
      children({
        disabled,
        focused: focusedState,
        focusVisible: focusVisibleState,
        hovered: hoveredState,
        overlay,
        pressed: pressedState,
      })
    ) : (
      <>
        {children}
        {overlay}
      </>
    );

  const _classNameWith =
    typeof xstyle === 'function'
      ? xstyle({
          disabled,
          focused: focusedState,
          focusVisible: focusVisibleState,
          hovered: hoveredState,
          pressed: pressedState,
        })
      : xstyle;

  // overlayHoveredStyle =
  //     typeof xstyle === 'function'
  //       ? xstyle({
  //           disabled: disabled,
  //           focused: focusedState,
  //           focusVisible: focusVisibleState,
  //           hovered: hoveredState,
  //           pressed: pressedState,
  //         })
  //       : xstyle

  const cometContainerPressableContextValue = useContext(CometContainerPressableContext);

  // const cometDangerouslySuppressInteractiveElementsContextValue = useContext(
  //   CometDangerouslySuppressInteractiveElementsContext,
  // );

  const _suppressFocusRing = focusVisibleState && (hideFocusOverlay || overlayDisabled) && !suppressFocusRing;

  const _className = [
    _display === 'inline' ? styles.root_DEPRECATED : styles.root,
    cursorDisabled === true && styles.defaultCursor,
    expanding && styles.expanding,
    linkProps && styles.linkBase,
    !focusVisibleState && styles.hideOutline,
    overlayHoveredStyle,
    //
    _classNameWith,
    _suppressFocusRing && (overlayFocusRingPosition === 'inset' ? styles.focusRingInset : styles.focusRing),
    cometContainerPressableContextValue !== undefined && styles.zIndex,
  ];

  // const _className = mergeClasses(
  //   _display === 'inline' ? classes.root_DEPRECATED : classes.root,
  //   cursorDisabled === true && classes.defaultCursor,
  //   expanding && classes.expanding,
  //   linkProps !== undefined && classes.linkBase,
  //   !focusVisibleState && classes.hideOutline,
  //   overlayHoveredStyle,
  //   //
  //   _classNameWith,
  //   _suppressFocusRing &&
  //     (overlayFocusRingPosition === 'inset'
  //       ? classes.focusRingInsetXStyle
  //       : classes.focusRingXStyle),
  //   cometContainerPressableContextValue !== undefined && classes.zIndex
  // );

  const _props = {
    onBlur: onFocusOut,
    onClick: onPress,
    onFocus: onFocusIn,
    onFocusChange: onFocusChangeCb,
    onFocusVisibleChange: onFocusVisibleChangeCb,
    onHoverChange: onHoverChangeCb,
    onHoverEnd: onHoverOut,
    onHoverMove: onHoverMove,
    onHoverStart: onHoverIn,
    onPressChange: onPressChangeCb,
    onPressEnd: onPressOut,
    onPressStart: onPressIn,
  };

  // eslint-disable-next-line no-unused-vars
  const ga = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const internalRef = useRef(null);

  // useEffect(
  //   () => {

  //     if (isContainerTarget && cometContainerPressableContextValue ) {
  //       cometContainerPressableContextValue.onMount()
  //     }

  //     //   if (isContainerTarget && cometContainerPressableContextValue) {
  //     //     // @ts-ignore
  //     //     cometContainerPressableContextValue.onMount(
  //     //       {
  //     //         onContextMenu: (e) => {
  //     //           preventContextMenu === true && e.preventDefault()
  //     //           onContextMenu !== undefined && onContextMenu(e)
  //     //         },
  //     //         onPress: () => {
  //     //           internalRef.current && internalRef.current.click()
  //     //         },
  //     //         target: !linkProps ? undefined : linkProps.target,
  //     //         url: !linkProps ? undefined : linkProps.url,
  //     //       },
  //     //       ga,
  //     //     )
  //     //   }
  //   },
  //   [
  //     //   cometContainerPressableContextValue,
  //     //   isContainerTarget,
  //     //   testOnly_pressed,
  //     //   onContextMenu,
  //     //   preventContextMenu,
  //     //   !linkProps ? undefined : linkProps.url,
  //     //   !linkProps ? undefined : linkProps.target,
  //   ]
  // );

  // BUG
  // const ref = useMergeRefs_Legacy(externalRef, internalRef);
  // const ref = useMergeRefs(externalRef, internalRef);

  // TODO
  // if (cometDangerouslySuppressInteractiveElementsContextValue) {
  //   const comp = _display === 'inline' ? 'span' : 'div'
  //   return jsx(
  //     comp,
  //     babelHelpers['extends'](
  //       {
  //         className_DEPRECATED: className_DEPRECATED,
  //         display: _display === 'inline' ? _display : 'block',
  //         preventContextMenu: preventContextMenu,
  //       },
  //       testOnly_pressed,
  //       {
  //         className: c('stylex')(overlayRadius),
  //         'data-testid': undefined,
  //         ref: overlayFocusVisibleStyle,
  //         children: hideHoverOverlay,
  //       },
  //     ),
  //   )
  // }

  if (linkProps) {
    const { url, ...restLinkProps } = linkProps;

    const baseLinkProps = { ...restLinkProps, href: url };

    return (
      <BaseLink
        {..._props}
        // onContextMenu={onContextMenu}
        {...rest}
        {...baseLinkProps}
        className_DEPRECATED={className_DEPRECATED}
        disabled={disabled}
        display={_display === 'inline' ? _display : 'block'}
        preventContextMenu={preventContextMenu}
        // BUG
        // ref={ref}
        ref={externalRef}
        // suppressFocusRing={!_suppressFocusRing || n}
        suppressFocusRing
        testid={undefined}
        xstyle={_className}
      >
        {_children}
      </BaseLink>
    );
  }

  return (
    <BaseButton
      {..._props}
      {...rest}
      allowClickEventPropagation={allowClickEventPropagation}
      className_DEPRECATED={className_DEPRECATED}
      disabled={disabled}
      display={_display === 'inline' ? _display : 'block'}
      preventContextMenu={preventContextMenu}
      // BUG
      // ref={ref}
      ref={externalRef}
      // ref={ref}
      // suppressFocusRing={!_suppressFocusRing || n}
      suppressFocusRing
      testid={undefined}
      xstyle={_className}
    >
      {_children}
    </BaseButton>
  );
});

const styles = stylex.create({
  defaultCursor: {
    cursor: 'default',
  },

  expanding: {
    display: 'flex',
  },

  focusRing: {
    boxShadow: 'var(--focus-ring-shadow-default)',
    outline: 'var(--focus-ring-outline-forced-colors) none',
  },
  focusRingInset: {
    boxShadow: 'var(--focus-ring-shadow-inset)',
  },

  hideOutline: {
    outline: 'none',
  },

  linkBase: {
    display: 'inline-block',
  },

  root: {
    textDecoration: {
      default: null,
      ':hover': 'none',
    },

    borderRadius: 'inherit',
    display: 'inline-flex',
    flexDirection: 'row',

    userSelect: 'none',
  },

  root_DEPRECATED: {
    textDecoration: {
      default: null,
      ':hover': 'none',
    },
    borderRadius: 'inherit',
    position: 'relative',

    userSelect: 'none',
  },

  zIndex: {
    zIndex: 1,
  },
});

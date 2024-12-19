/* eslint-disable complexity */
import React, { forwardRef, useContext, useRef } from 'react';
import { CometGHLRenderingContext } from '@fb-contexts/CometGHLRenderingContext';
import { useCometTheme } from '@fb-hooks/useCometTheme';
import { FDSText } from '@fb-text/FDSText';
import { useMergeRefs } from '@fb-utils/useMergeRefs';
import stylex from '@stylexjs/stylex';

const FDSButton = forwardRef((props, ref) => {
  const {
    addOnPrimary,
    addOnSecondary,
    disabled = false,
    icon,
    id,
    label,
    labelIsHidden = false,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    padding = 'normal',
    reduceEmphasis = false,
    showDynamicHover,
    size = 'medium',
    suppressHydrationWarning = false,
    testid,
    testOnly_pressed = false,
    tooltip,
    tooltipPosition = 'above',
    type = 'primary',
    ...rest
  } = props;

  const J = type === 'fdsOverride_collaborativePostCTA' ? 'secondary' : type in m ? type : 'primary';

  let L = disabled ? 'disabled' : reduceEmphasis ? 'deemphasized' : 'default';

  let M = m[J][L];

  L = n[J][L];

  const internalRef = useRef(null);

  const [ThemeWrapper, themeClassName] = useCometTheme('light');

  const ghlRenderingContext = useContext(CometGHLRenderingContext);
  const cometGHLRenderingWithLink = linkProps && ghlRenderingContext;
  const _label = rest['aria-label'] ?? label; // N

  const e = useMergeRefs(internalRef, ref);

  const N = labelIsHidden ? null : (
    <FDSText color={M} numberOfLines={1} type={size === 'large' ? 'button1' : 'button2'}>
      {label}
    </FDSText>
  );

  const b = type === 'overlay' && disabled && l.contentDisabled;
  const r = type === 'overlay' && themeClassName;
  const M = size === 'medium' && l.sizeMedium;
  const O = size === 'large' && l.sizeLarge;
  const C = icon && labelIsHidden && l.paddingIconOnly;

  const o = [b, r, M, O, C];

  const b = icon && <FDSIcon color={iconColor} icon={icon} isDecorative size={16} />;

  r = reduceEmphasis && l.primaryDeemphasizedOverlayPressed;
  M = type === 'secondary' && l.secondaryOverlayPressed;
  O = type === 'secondary' && reduceEmphasis && l.secondaryDeemphasizedOverlayPressed;
  C = type === 'overlay' && l.overlayOverlayPressed;
  p = type === 'overlay' && reduceEmphasis && l.overlayDeemphasizedOverlayPressed;
  L = type === 'dark-overlay' && l.darkOverlayPressed;
  J = type === 'dark-overlay' && reduceEmphasis && l.overlayDeemphasizedOverlayPressed;

  const R = [l.primaryOverlayPressed, r, M, O, C, p, L, J, l.fadeOut];

  r = I === 'primary' && l.primary;
  M = I === 'primary' && B && l.primaryDeemphasized;
  O = I === 'secondary' && l.secondary;
  C = I === 'secondary' && B && l.secondaryDeemphasized;
  p = I === 'fdsOverride_black' && l.fdsOverrideBlack;
  L = I === 'fdsOverride_negative' && l.fdsOverrideNegative;
  J = I === 'fdsOverride_positive' && l.fdsOverridePositive;
  let S = I === 'fdsOverride_collaborativePostCTA' && l.fdsOverrideCollaborativePostCTA;
  let T = I === 'overlay' && l.overlay;
  B = I === 'overlay' && B && l.overlayDeemphasized;
  let U = a && l.disabled;
  let V = I === 'overlay' && a && l.overlayDisabled;
  let W = I === 'dark-overlay' && l.darkOverlay;
});

const l = stylex.create({
  contentDisabled: {
    opacity: 0.3,
  },
  darkOverlay: {
    backgroundColor: 'var(--always-dark-overlay)',
    color: 'var(--always-white)',
  },
  darkOverlayPressed: {
    backgroundColor: 'var(--non-media-pressed)',
  },
  disabled: {
    backgroundColor: 'var(--disabled-button-background)',
  },
  fadeOut: {
    opacity: 0.23,
    transitionDelay: '.2s',
    transitionDuration: '.1s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'linear',
  },
  fdsOverrideBlack: {
    backgroundColor: 'var(--always-black)',
  },
  fdsOverrideCollaborativePostCTA: {
    backgroundColor: 'var(--always-white)',
    mixBlendMode: 'lighten',
  },
  fdsOverrideNegative: {
    backgroundColor: 'var(--negative)',
  },
  fdsOverridePositive: {
    backgroundColor: 'var(--positive)',
  },
  overlay: {
    backgroundColor: 'var(--always-white)',
  },
  overlayDeemphasized: {
    backgroundColor: 'var(--always-light-overlay)',
  },
  overlayDeemphasizedOverlayPressed: {
    backgroundColor: 'var(--always-light-overlay)',
  },
  overlayDisabled: {
    backgroundColor: 'var(--progress-ring-on-media-background)',
  },
  overlayOverlayPressed: {
    backgroundColor: 'var(--shadow-1)',
  },
  paddingIconOnly: {
    paddingEnd: 'var(--button-padding-icon-only)',
    paddingStart: 'var(--button-padding-icon-only)',
  },
  primary: {
    backgroundColor: 'var(--primary-button-background)',
  },
  primaryDeemphasized: {
    backgroundColor: 'var(--primary-deemphasized-button-background)',
  },
  primaryDeemphasizedOverlayPressed: {
    backgroundColor: 'var(--primary-deemphasized-button-pressed-overlay)',
  },
  primaryOverlayPressed: {
    backgroundColor: 'var(--press-overlay)',
  },
  secondary: {
    backgroundColor: 'var(--secondary-button-background)',
  },
  secondaryDeemphasized: {
    backgroundColor: 'transparent',
  },
  secondaryDeemphasizedOverlayPressed: {
    backgroundColor: 'var(--primary-deemphasized-button-pressed-overlay)',
  },
  secondaryOverlayPressed: {
    backgroundColor: 'var(--press-overlay)',
  },
  sizeLarge: {
    height: 'var(--button-height-large)',
  },
  sizeMedium: {
    height: 'var(--button-height-medium)',
  },
});

const m = {
  'dark-overlay': {
    deemphasized: 'white',
    default: 'white',
    disabled: 'disabled',
  },
  overlay: {
    deemphasized: 'white',
    default: 'primary',
    disabled: 'disabled',
  },
  primary: {
    deemphasized: 'highlight',
    default: 'white',
    disabled: 'disabled',
  },
  secondary: {
    deemphasized: 'highlight',
    default: 'secondary',
    disabled: 'disabled',
  },
};

const n = {
  'dark-overlay': {
    deemphasized: 'white',
    default: 'white',
    disabled: 'disabled',
  },
  overlay: {
    deemphasized: 'white',
    default: 'primary',
    disabled: 'disabled',
  },
  primary: {
    deemphasized: 'highlight',
    default: 'white',
    disabled: 'disabled',
  },
  secondary: {
    deemphasized: 'highlight',
    default: 'primary',
    disabled: 'disabled',
  },
};

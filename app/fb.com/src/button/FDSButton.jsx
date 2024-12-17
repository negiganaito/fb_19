/* eslint-disable no-undef */

import React from 'react';
import stylex from '@stylexjs/stylex';

function getStylesForType(type) {
  switch (type) {
    case 'fdsOverride_collaborativePostCTA':
    case 'secondary':
      return secondaryStyles;
    case 'overlay':
      return overlayStyles;
    case 'dark-overlay':
      return darkOverlayStyles;
    case 'primary':
    default:
      return primaryStyles;
  }
}

function getColor(colorType, options) {
  // let c = options.disabled;
  // options = options.reduceEmphasis;
  // colorType = r(colorType);

  const styleByColor = getStylesForType(colorType);
  const { disabled, reduceEmphasis } = options;

  return (
    (disabled ? styleByColor[':disabled'] : null) ||
    (reduceEmphasis ? styleByColor[':deemphasized'] : null) ||
    styleByColor
  );
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").TetraButtonProps>
 */
// eslint-disable-next-line complexity
export const FDSButton = forwardRef((props, ref) => {
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
    // eslint-disable-next-line no-unused-vars
    testid,
    testOnly_pressed = false,
    tooltip,
    tooltipPosition = 'above',
    type = 'primary',
    ...rest
  } = props;

  let { iconColor, overlayPressedStyle, textColor } = getColor(type, {
    disabled,
    reduceEmphasis,
  });

  const internalRef = useRef(null);

  const [ThemeWrapper, themeClassName] = useCometTheme('light');

  const cometGHLRenderingWithLink = linkProps && useContext(CometGHLRenderingContext);
  const _label = rest['aria-label'] ?? label; // N

  // let N = useContext(CometGHLRenderingContext);
  // N = q && N;
  // let d = rest["aria-label"] ?? label;
  // N = N ? undefined : d;

  const TetraButtonChildren = (
    <BaseStyledButton
      {...rest}
      addOnEnd={addOnSecondary}
      addOnStart={addOnPrimary}
      aria-label={cometGHLRenderingWithLink ? undefined : _label}
      content={
        labelIsHidden ? null : (
          <TetraText color={textColor} numberOfLines={1} type={size === 'large' ? 'button1' : 'button2'}>
            {label}
          </TetraText>
        )
      }
      contentXstyle={[
        type === 'overlay' && disabled && colorStyles.contentDisabled,
        type === 'overlay' && themeClassName,
        size === 'medium' && (isBlueprintStylesEnabled() ? sizeStyles.sizeMedium : colorStyles.sizeMedium),
        size === 'large' && (isBlueprintStylesEnabled() ? sizeStyles.sizeLarge : colorStyles.sizeLarge),
        icon && labelIsHidden && colorStyles.paddingIconOnly,
      ]}
      disabled={disabled}
      icon={icon && <FDSIcon color={iconColor} icon={icon} size={16} />}
      id={id}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      overlayPressedStyle={overlayPressedStyle}
      padding={padding}
      ref={mergeRefs(internalRef, ref)}
      suppressHydrationWarning={suppressHydrationWarning}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={[
        type === 'primary' && colorStyles.primary,
        type === 'primary' && reduceEmphasis && colorStyles.primaryDeemphasized,
        type === 'secondary' && colorStyles.secondary,
        type === 'secondary' && reduceEmphasis && colorStyles.secondaryDeemphasized,
        type === 'fdsOverride_black' && colorStyles.fdsOverrideBlack,
        type === 'fdsOverride_negative' && colorStyles.fdsOverrideNegative,
        type === 'fdsOverride_positive' && colorStyles.fdsOverridePositive,
        type === 'fdsOverride_collaborativePostCTA' && colorStyles.fdsOverrideCollaborativePostCTA,
        type === 'overlay' && colorStyles.overlay,
        type === 'overlay' && reduceEmphasis && colorStyles.overlayDeemphasized,
        disabled && colorStyles.disabled,
        type === 'overlay' && disabled && colorStyles.overlayDisabled,
        type === 'dark-overlay' && colorStyles.darkOverlay,
      ]}
    />
  );

  const TetraButtonChildrenWithTheme =
    type === 'overlay' ? <ThemeWrapper>{TetraButtonChildren}</ThemeWrapper> : TetraButtonChildren;

  return tooltip ? (
    <FDSCometTooltip position={tooltipPosition} tooltip={tooltip}>
      {TetraButtonChildrenWithTheme}
    </FDSCometTooltip>
  ) : (
    TetraButtonChildrenWithTheme
  );
});

const colorStyles = stylex.create({
  contentDisabled: {
    opacity: '.3',
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
    paddingLeft: '16px',
    paddingRight: '16px',
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

const sizeStyles = stylex.create({
  sizeLarge: {
    borderRadius: 'var(--button-corner-radius-large)',
    height: 'var(--blueprint-button-height-large)',
  },
  sizeMedium: {
    borderRadius: 'var(--button-corner-radius-medium)',
    height: 'var(--blueprint-button-height-medium)',
  },
});

const primaryStyles = {
  ':deemphasized': {
    iconColor: 'highlight',
    overlayPressedStyle: colorStyles.primaryDeemphasizedOverlayPressed,
    textColor: 'highlight',
  },
  ':disabled': {
    iconColor: 'disabled',
    textColor: 'disabled',
  },
  iconColor: 'white',
  overlayPressedStyle: colorStyles.primaryOverlayPressed,
  textColor: 'white',
};

const secondaryStyles = {
  ':deemphasized': {
    iconColor: 'highlight',
    overlayPressedStyle: colorStyles.secondaryDeemphasizedOverlayPressed,
    textColor: 'highlight',
  },
  ':disabled': {
    iconColor: 'disabled',
    textColor: 'disabled',
  },
  iconColor: 'primary',
  overlayPressedStyle: colorStyles.secondaryOverlayPressed,
  textColor: 'secondary',
};

const overlayStyles = {
  ':deemphasized': {
    iconColor: 'white',
    overlayPressedStyle: colorStyles.overlayDeemphasizedOverlayPressed,
    textColor: 'white',
  },
  ':disabled': {
    iconColor: 'disabled',
    textColor: 'disabled',
  },
  iconColor: 'primary',
  overlayPressedStyle: colorStyles.overlayOverlayPressed,
  textColor: 'primary',
};

const darkOverlayStyles = {
  ':deemphasized': {
    iconColor: 'white',
    overlayPressedStyle: colorStyles.overlayDeemphasizedOverlayPressed,
    textColor: 'white',
  },
  ':disabled': {
    iconColor: 'disabled',
    textColor: 'disabled',
  },
  iconColor: 'white',
  overlayPressedStyle: colorStyles.darkOverlayPressed,
  textColor: 'white',
};

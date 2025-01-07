import React from 'react';

export interface FDSButtonProps {
  addOnPrimary?: React.ReactNode;
  addOnSecondary?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  id?: any;
  label?: any;
  labelIsHidden?: boolean;
  linkProps?: any;

  onFocusIn?: any;
  onFocusOut?: any;
  onHoverIn?: any;
  onHoverOut?: any;
  onPress?: any;
  onPressIn?: any;
  onPressOut?: any;

  padding?: 'normal' | 'wide';
  reduceEmphasis?: boolean;
  size?: 'medium' | 'large';

  suppressHydrationWarning?: boolean;
  testOnly_pressed?: boolean;

  tooltip?: React.ReactNode;
  tooltipPosition?: 'above'; //

  type: 'fdsOverride_collaborativePostCTA' | 'dark-overlay' | 'overlay' | 'primary' | 'secondary';
}

import React from 'react';
import { FDSText } from '@fb-text/FDSText';
import stylex from '@stylexjs/stylex';

import { BaseToast } from './BaseToast';

const styles = stylex.create({
  pressable: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});

// Business
export function CometToast(props) {
  const {
    action,
    href,
    icon,
    impressionLoggingRef,
    message,
    onDismiss,
    supressCloseButton = false,
    target,
    testid = 'Toast',
    truncateText = false,
    ...rest
  } = props;

  const linkProps = href
    ? {
        target: target,
        url: href,
      }
    : undefined;

  return (
    <BaseToast
      action={
        action
          ? {
              label: action.label,
              // eslint-disable-next-line react/no-unstable-nested-components
              labelRenderer: (child) => {
                return (
                  <FDSText color="blueLink" numberOfLines={1} type="bodyLink3">
                    {child}
                  </FDSText>
                );
              },
              onPress: action.onPress,
              testid: action.testid,
            }
          : undefined
      }
      addOnStart={icon}
      closeButton={
        !supressCloseButton && (
          <FDSCircleButton icon={fbicon._(ix(478231), 12)} label="Close" onPress={onDismiss} size={24} />
        )
      }
      linkWrapper={
        rest.onPress || linkProps
          ? (child) => {
              <CometPressable {...rest} expanding linkProps={linkProps} xstyle={styles.pressable}>
                {child}
              </CometPressable>;
            }
          : undefined
      }
      // eslint-disable-next-line react/no-unstable-nested-components
      message={({ toastMessageId }) => {
        return (
          <FDSText color="primary" id={toastMessageId} numberOfLines={truncateText ? 4 : void 0} type="body3">
            {message}
          </FDSText>
        );
      }}
      onDismiss={onDismiss}
      testid={undefined}
      toastRef={impressionLoggingRef}
    />
  );
}

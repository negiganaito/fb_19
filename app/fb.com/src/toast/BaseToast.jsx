import React, { useId } from 'react';
import { focusScopeQueries } from '@fb-focus/focusScopeQueries';
import { XPlatReactFocusRegion } from '@fb-focus/XPlatReactFocusRegion';
import { BaseView } from '@fb-layout/BaseView';
import { useCurrentDisplayMode } from '@fb-theme/useCurrentDisplayMode';
import stylex from '@stylexjs/stylex';

// const config = {
//   dark: '__fb-dark-mode ',
//   light: '__fb-light-mode ',
//   type: 'CLASSNAMES',
// };
export function BaseToast(props) {
  const {
    action,
    addOnStart,
    closeButton,
    linkWrapper,
    message,
    onDismiss,
    size = 'full-width',
    testid,
    toastRef,
    useInvertedDisplayMode = true,
  } = props;

  const displayMode = useCurrentDisplayMode() === 'dark' ? 'light' : 'dark';

  const toastMessageId = useId();
  const ariaProps = action
    ? {}
    : {
        'aria-atomic': true,
        role: 'alert',
      };

  const Wrapper = (
    <>
      {addOnStart && <BaseView xstyle={styles.item}>{addOnStart}</BaseView>}
      <BaseView xstyle={[styles.item, styles.itemText]} {...ariaProps}>
        {message({
          toastMessageId: toastMessageId,
        })}
      </BaseView>

      {action && (
        <XPlatReactFocusRegion autoFocusQuery={focusScopeQueries.tabbableScopeQuery}>
          <BaseView aria-labelledby={toastMessageId} role="group" xstyle={styles.item}>
            {action.element
              ? action.element
              : action.labelRenderer && (
                  <BaseInlinePressable
                    onPress={(e) => {
                      onDismiss();
                      action.onPress(e);
                    }}
                    testid={undefined}
                    xstyle={styles.link}
                  >
                    {action.labelRenderer(action.label)}
                  </BaseInlinePressable>
                )}
          </BaseView>
        </XPlatReactFocusRegion>
      )}

      {closeButton && <BaseView xstyle={styles.item}>{closeButton}</BaseView>}
    </>
  );

  const linkWrapperComp = linkWrapper ? linkWrapper(Wrapper) : Wrapper;

  return (
    <BaseToastContentWrapper
      ref={toastRef}
      testid={undefined}
      useInvertedDisplayMode={displayMode}
      xstyle={[styles.root, size === 'full-width' && styles.rootFullWidth]}
    >
      {linkWrapperComp}
    </BaseToastContentWrapper>
  );

  // return useInvertedDisplayMode ? (
  //   <BaseTheme
  //     config={config}
  //     displayMode={displayMode}
  //     ref={toastRef}
  //     testid={undefined}
  //     xstyle={[styles.root, size === 'full-width' && styles.rootFullWidth]}
  //   >
  //     {linkWrapperComp}
  //   </BaseTheme>
  // ) : (
  //   <BaseView ref={toastRef} testid={undefined} xstyle={[styles.root, size === 'full-width' && styles.rootFullWidth]}>
  //     {linkWrapperComp}
  //   </BaseView>
  // );
}

const styles = stylex.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 'var(--toast-addon-padding-vertical)',
    paddingRight: 'var(--toast-addon-padding-horizontal)',
    paddingLeft: 'var(--toast-addon-padding-horizontal)',
    paddingTop: 'var(--toast-addon-padding-vertical)',
  },
  itemText: {
    flexGrow: 1,
  },
  link: {
    wordBreak: 'keep-all',
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'var(--toast-background)',
    borderTopLeftRadius: 'var(--toast-corner-radius)',
    borderTopRightRadius: 'var(--toast-corner-radius)',
    borderBottomRightRadius: 'var(--toast-corner-radius)',
    borderBottomLeftRadius: 'var(--toast-corner-radius)',
    boxShadow: 'var(--shadow-elevated)',
    display: 'flex',
    flexShrink: 0,
    maxWidth: 'var(--toast-container-max-width)',
    minWidth: 'var(--toast-container-min-width)',
    paddingLeft: 'var(--toast-container-padding-horizontal)',
    paddingRight: 'var(--toast-container-padding-horizontal)',
    paddingTop: 'var(--toast-container-padding-vertical)',
    paddingBottom: 'var(--toast-container-padding-vertical)',
  },
  rootFullWidth: {
    width: '100%',
  },
});

// const Wrapper = jsxs(React.Fragment, {
//   children: [
//     addOnStart &&
//       jsx(BaseView, {
//         xstyle: styles.item,
//         children: addOnStart,
//       }),
//     jsx(BaseView, {
//       xstyle: [styles.item, styles.itemText],
//       ...ariaProps,
//       children: message({
//         toastMessageId: toastMessageId,
//       }),
//     }),
//     action &&
//       jsx(FocusRegion.FocusRegion, {
//         autoFocusQuery: focusScopeQueries.tabbableScopeQuery,
//         children: jsx(BaseView, {
//           "aria-labelledby": toastMessageId,
//           role: "group",
//           xstyle: styles.item,
//           children: action.element
//             ? action.element
//             : action.labelRenderer &&
//               jsx(BaseInlinePressable, {
//                 onPress: function (a) {
//                   onDismiss();
//                   action.onPress(a);
//                 },
//                 testid: void 0,
//                 xstyle: styles.link,
//                 children: action.labelRenderer(action.label),
//               }),
//         }),
//       }),
//     closeButton &&
//       jsx(BaseView, {
//         xstyle: styles.item,
//         children: closeButton,
//       }),
//   ],
// });

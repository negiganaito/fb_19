import React, { useCallback, useMemo, useState } from 'react';
import { CometDensityModeContext } from '@fb-contexts/CometDensityModeContext';

const CometDenseModeSetting = {
  initialSetting: 'COMPACT',
};

export const CometDensityModeStateProvider = ({ children }) => {
  const [isCompactMode, setIsCompactMode] = useState(CometDenseModeSetting.initialSetting === 'COMPACT');

  const toggleDensityMode = useCallback(
    (isCompact, b) => {
      // eslint-disable-next-line no-unused-vars
      let onRevert = b.onRevert;
      let newSetting = isCompact ? 'COMPACT' : 'DEFAULT';
      setIsCompactMode(newSetting === 'COMPACT');
      // eslint-disable-next-line no-unused-vars
      function updateDenseModeSetting(a) {
        a = a.getRoot().getLinkedRecord('viewer');
        if (!a) {
          return;
        }
        let b = a.getValue('dense_mode_setting');
        if (b === newSetting) {
          return;
        }
        a.setValue('dense_mode_setting', newSetting);
      }

      // TODO later
      // d("CometRelay").commitMutation(c("CometRelayEnvironment"), {
      //   mutation: c("CometSetDenseModeMutation"),
      //   onError: function () {
      //     f(d("CometDenseModeSetting").initialSetting === "COMPACT"), g(e);
      //   },
      //   optimisticUpdater: i,
      //   variables: {
      //     input: {
      //       density_mode: h,
      //     },
      //   },
      // });
    },
    [isCompactMode],
  );

  const handleDensityModeChange = useCallback(
    (isCompact) => {
      toggleDensityMode(isCompact, {
        onRevert: function (previousMode) {
          setIsCompactMode(previousMode);
        },
      });
    },
    [toggleDensityMode],
  );

  const contextValue = useMemo(() => {
    return [isCompactMode, handleDensityModeChange];
  }, [isCompactMode, handleDensityModeChange]);

  return <CometDensityModeContext.Provider value={contextValue}>{children}</CometDensityModeContext.Provider>;
};

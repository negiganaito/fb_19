import React from 'react';

import { FocusRegion } from './FocusRegion';
import { focusScopeQueries } from './focusScopeQueries';

export function XPlatReactFocusRegion(props) {
  const { autoFocusQuery, autoRestoreFocus, recoverFocusQuery, children } = props;

  return (
    <FocusRegion.FocusRegion
      autoFocusQuery={autoFocusQuery ?? focusScopeQueries.headerOrTabbableScopeQuery}
      autoRestoreFocus={autoRestoreFocus}
      recoverFocusQuery={recoverFocusQuery}
    >
      {children}
    </FocusRegion.FocusRegion>
  );
}

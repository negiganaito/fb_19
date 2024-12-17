import React from 'react';
import { CometToasterRoot } from '@fb-toast/CometToasterRoot';

import { CometAppShell } from './CometAppShell';

export const CometLoggedInFBApp = ({ children }) => {
  return (
    <React.Profiler id="CometApp">
      <CometAppShell toaster={<CometToasterRoot />}>
        {/* <CometAppContentComponent>{children}</CometAppContentComponent> */}
        {children}
      </CometAppShell>
    </React.Profiler>
  );
};

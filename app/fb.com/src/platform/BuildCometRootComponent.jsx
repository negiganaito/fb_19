import React from 'react';
import { CometErrorBoundary } from '@fb-error/CometErrorBoundary';
import { CometBackupPlaceholder } from '@fb-placeholder/CometBackupPlaceholder';

import { CometDensityModeStateProvider } from './CometDensityModeStateProvider';

const FacebookCometCookieConsent = undefined;
const KeyCommandNub = undefined;

// const CometRouterStateProvider = React.Fragment;
// const CometPlatformAppWrapper = React.Fragment;

export const BuildCometRootComponent = ({ children }) => {
  return (
    <CometDensityModeStateProvider>
      <CometBackupPlaceholder fallback={null}>
        <div>
          {children}
          {FacebookCometCookieConsent && (
            <CometErrorBoundary>
              <FacebookCometCookieConsent />
            </CometErrorBoundary>
          )}
          {KeyCommandNub && (
            <CometErrorBoundary>
              <KeyCommandNub />
            </CometErrorBoundary>
          )}
        </div>
      </CometBackupPlaceholder>
    </CometDensityModeStateProvider>
  );
};

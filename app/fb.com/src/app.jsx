import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CometKeyboardSettingsStateProvider } from '@fb-keyboard/CometKeyboardSettingsStateProvider';
import { CometDarkModeStateProvider } from '@fb-theme/CometDarkModeStateProvider';

import { CometPlatformAppWrapper } from './platform/CometPlatformAppWrapper';
import { router } from './routes/router';

export const App = () => {
  return (
    <CometPlatformAppWrapper KeyboardSettingsStateProvider={CometKeyboardSettingsStateProvider}>
      <CometDarkModeStateProvider>
        <RouterProvider router={router} />
      </CometDarkModeStateProvider>
    </CometPlatformAppWrapper>
  );
};

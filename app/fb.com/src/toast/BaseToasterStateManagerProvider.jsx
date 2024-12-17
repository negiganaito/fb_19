import React from 'react';
import { BaseToasterStateManagerContext } from '@fb-contexts/BaseToasterStateManagerContext';

import { BaseToasterStateManager } from './BaseToasterStateManager';

const instance = BaseToasterStateManager.getInstance();

export function BaseToasterStateManagerProvider({ children }) {
  return <BaseToasterStateManagerContext.Provider value={instance}>{children}</BaseToasterStateManagerContext.Provider>;
}

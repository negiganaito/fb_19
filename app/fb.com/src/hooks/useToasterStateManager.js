import { useContext } from 'react';
import { BaseToasterStateManagerContext } from '@fb-contexts/BaseToasterStateManagerContext';

export function useToasterStateManager() {
  return useContext(BaseToasterStateManagerContext);
}

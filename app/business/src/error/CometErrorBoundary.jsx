/**
 * Changelog:
 * - 09/12/2024
 */

import React, { forwardRef } from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import { useHeroErrorMetadata } from './useHeroErrorMetadata';

const cometErrorBoundary = (props, ref) => {
  const metadata = useHeroErrorMetadata();

  return <ErrorBoundary {...props} augmentError={metadata} fallback={props.fallback} ref={ref} />;
};

export const CometErrorBoundary = forwardRef(cometErrorBoundary);

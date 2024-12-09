/**
 * Changelog:
 * - 09/12/2024
 */

import React from 'react';

import { CometErrorBoundary } from './CometErrorBoundary';
import { err } from './err';

function ThrowErr(props) {
  const { errorMessage } = props;
  throw err(errorMessage);
}

export const RecoverableViolationWithComponentStack = (props) => {
  const { errorMessage, fallback, projectName } = props;

  return (
    <CometErrorBoundary
      context={{ project: projectName, type: 'error' }}
      fallback={() => fallback ?? null}
      // eslint-disable-next-line react/no-children-prop
      children={<ThrowErr errorMessage={errorMessage} />}
    />
  );
};

RecoverableViolationWithComponentStack.displayName = `RecoverableViolationWithComponentStack.react`;

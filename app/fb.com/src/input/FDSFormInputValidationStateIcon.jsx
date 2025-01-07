/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';
import { fbicon } from '@fb-image/fbicon';
import { FDSIcon } from '@fb-image/FDSIcon';
import { ix } from '@fb-image/ix';

export const FDSFormInputValidationStateIcon = {
  //
  CORRECT: (props = {}) => {
    const { hidden, id, label } = props;

    return (
      <FDSIcon
        alt={label}
        id={id}
        isDecorative={hidden}
        color="positive"
        icon={fbicon._(ix(498146), 20)}
        testid={undefined}
      />
    );
  },
  //
  ERROR: (props = {}) => {
    const { hidden, id, label } = props;

    return (
      <FDSIcon
        alt={label}
        id={id}
        isDecorative={hidden}
        color="negative"
        icon={fbicon._(ix(502062), 20)}
        testid={undefined}
      />
    );
  },
  //
  LOADING: (props = {}) => {
    const { hidden, id, label } = props;
    return <CometProgressRingIndeterminate alt={label} id={id} isDecorative={hidden} color="disabled" size={20} />;
  },
  //
  WARN: (props = {}) => {
    const { hidden, id, label } = props;
    return (
      <FDSIcon
        alt={label}
        id={id}
        isDecorative={hidden}
        color="warning"
        icon={fbicon._(ix(502062), 20)}
        testid={undefined}
      />
    );
  },
};

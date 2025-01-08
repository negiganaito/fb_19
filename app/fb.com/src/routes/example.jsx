import React from 'react';
import { FDSButtonExample } from '@fb-button/example/FDSButtonExample';
import { FDSCircleButton } from '@fb-button/FDSCircleButton';
import { fbicon } from '@fb-image/fbicon';
import { ix } from '@fb-image/ix';
import { FDSFormTextAreaExample } from '@fb-input/example/FDSFormTextAreaExample';
import { FDSFormTextInputExample } from '@fb-input/example/FDSFormTextInputExample';
import { FDSTextExample } from '@fb-text/example/FDSTextExample';

const ExamplePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      <FDSTextExample />
      <FDSButtonExample />
      <FDSCircleButton icon={fbicon._(ix(478231), 12)} label="Close" size={24} />
      <FDSFormTextAreaExample />
      <FDSFormTextInputExample />
    </div>
  );
};

export { ExamplePage };

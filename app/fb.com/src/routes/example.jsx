import React from 'react';
import { FDSButtonExample } from '@fb-button/example/FDSButtonExample';
import { FDSCircleButton } from '@fb-button/FDSCircleButton';
import { fbicon } from '@fb-image/fbicon';
import { ix } from '@fb-image/ix';
import { FDSTextExample } from '@fb-text/example/FDSTextExample';

const ExamplePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      <FDSTextExample />
      <FDSButtonExample />

      <br />
      <FDSCircleButton icon={fbicon._(ix(478231), 12)} label="Close" size={24} />
    </div>
  );
};

export { ExamplePage };

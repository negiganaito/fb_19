import React from 'react';
import { FDSButtonExample } from '@fb-button/example/FDSButtonExample';
import { FDSTextExample } from '@fb-text/example/FDSTextExample';

const ExamplePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      <FDSTextExample />
      <FDSButtonExample />
    </div>
  );
};

export { ExamplePage };

import ReactDOM from 'react-dom/client';
import { CometDarkMode } from '@fb-theme/CometDarkMode';
import { CometStyleXSheet } from '@fb-theme/CometStyleXSheet';

import { App } from './app';

import './css/app.css';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  CometDarkMode.initDarkMode();
  CometStyleXSheet.rootStyleSheet.injectTheme();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

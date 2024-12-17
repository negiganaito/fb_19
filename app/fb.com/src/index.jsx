import ReactDOM from 'react-dom/client';
import { ErrorGuard } from '@fb-error/ErrorGuard';
import { CometDarkMode } from '@fb-theme/CometDarkMode';
import { CometStyleXSheet } from '@fb-theme/CometStyleXSheet';
import { CometNetworkStatusToast } from '@fb-toast/CometNetworkStatusToast';

import { App } from './app';

import './css/app.css';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  ErrorGuard.applyWithGuard(() => CometNetworkStatusToast.subscribe(), null, []);

  CometDarkMode.initDarkMode();
  CometStyleXSheet.rootStyleSheet.injectTheme();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

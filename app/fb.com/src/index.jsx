import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CometDarkMode } from '@fb-theme/CometDarkMode';
import { CometStyleXSheet } from '@fb-theme/CometStyleXSheet';

import { router } from './routes/router';

import './css/app.css';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  CometDarkMode.initDarkMode();
  CometStyleXSheet.rootStyleSheet.injectTheme();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}

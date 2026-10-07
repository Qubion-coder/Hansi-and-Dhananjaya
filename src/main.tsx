import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import Admin from './Admin.tsx';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  path === '/admin' ? <Admin /> : <App />,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import { queryClient } from './app/queryClient';
import { Providers } from './app/Providers';
import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Providers>
          <App />
        </Providers>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

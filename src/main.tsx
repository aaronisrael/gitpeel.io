import React from 'react';
import ReactDOM from 'react-dom/client';

import Providers from '@/providers/app';
import AppRoutes from '@/routes/index';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <AppRoutes />
    </Providers>
  </React.StrictMode>
);

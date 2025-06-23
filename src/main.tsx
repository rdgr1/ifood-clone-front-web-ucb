import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './../index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CardContext';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // certifique-se de ter criado esse arquivo como no passo anterior

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
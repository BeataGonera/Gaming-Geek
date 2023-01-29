import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

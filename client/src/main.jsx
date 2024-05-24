import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx'
import { UserProvider } from './services/globals.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
      <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>

);
 
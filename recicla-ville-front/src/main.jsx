

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import App2 from './App2.jsx'

import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App2 />
    </BrowserRouter>
  </StrictMode>,
)

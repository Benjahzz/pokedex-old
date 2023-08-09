import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './scss/base/_globales.scss'
import { BrowserRouter, Route, Link, Switch ,Routes, useNavigate} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <BrowserRouter>
    <App />
    </BrowserRouter>  
);


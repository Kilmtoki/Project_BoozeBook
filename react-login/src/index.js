import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Login  from './Login';
import Album from './Album';
import Register from './Register'
import Payment from './Payment';
import App from './App.css';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/album" element={<Album />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/home" element={<Home />} />
      <Route path="/app" element={<App/>} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

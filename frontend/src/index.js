import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import HomePage from './landingPage/Home/HomePage';
import Navbar from './landingPage/Navbar';
import Signup from './landingPage/signup/Signup';
import Footer from './landingPage/Footer';

import { ClerkProvider } from '@clerk/react'

import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './DashBoard/Dashboard';
 const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

 if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Key');
 }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
 <BrowserRouter>
 <Navbar/>
  <Routes>
   <Route path='/' element={<HomePage/>}></Route>
   <Route path='/signup' element={<Signup/>}></Route>
   <Route path='/dashboard/*' element={<Dashboard/>}></Route>
  </Routes>
 <Footer/>
 </BrowserRouter>
 </ClerkProvider>
 
);


reportWebVitals();

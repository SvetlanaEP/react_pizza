import React, { useState } from 'react';
import './scss/app.scss';
import HeaderComponent from './components/HeaderComponent';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { FullPizza } from './pages/FullPizza';


function App() {

  return (
    <div className='wrapper'>
        <HeaderComponent />
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/cart'
                element={<Cart />}
              />
              <Route
                path='/pizza/:id'
                element={<FullPizza />}
              />
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;

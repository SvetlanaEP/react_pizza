import React from 'react';
import './scss/app.scss';
import HeaderComponent from './components/HeaderComponent';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaComponent from './components/PizzaComponent';

function App() { 
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            <PizzaComponent title={'Пицца'} price={500}/>
            <PizzaComponent title={'Пицца2'} price={5000}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

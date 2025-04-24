import React from 'react';
import './scss/app.scss';
import HeaderComponent from './components/HeaderComponent';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaComponent from './components/PizzaComponent';

function App() { 
  return (
    <div class='wrapper'>
      <HeaderComponent />
      <div class='content'>
        <div class='container'>
          <div class='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 class='content__title'>Все пиццы</h2>
          <div class='content__items'>
            <PizzaComponent title={'Пицца'} price={500}/>
            <PizzaComponent title={'Пицца2'} price={5000}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

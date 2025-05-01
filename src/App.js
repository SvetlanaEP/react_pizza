import React from 'react';
import './scss/app.scss';
import HeaderComponent from './components/HeaderComponent';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaComponent from './components/PizzaComponent';

import pizzas from './assets/pizzas.json';

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
            {pizzas.map((pizza) => (
              <PizzaComponent
                key={pizza.id}
               {...pizza}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

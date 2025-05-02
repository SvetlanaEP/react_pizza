import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import HeaderComponent from './components/HeaderComponent';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaComponent from './components/PizzaBlock';

//import pizzas from './assets/pizzas.json';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://68149373225ff1af16294cea.mockapi.io/items')
    .then((res) => {
      return res.json();
    })
    .then((arr) => {
      setItems(arr);
    });
  }, [])

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
            {items.map((pizza) => (
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

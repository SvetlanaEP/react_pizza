import React, { useEffect, useState } from 'react';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaComponent from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/Sceleton';

//import pizzas from './assets/pizzas.json';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://68149373225ff1af16294cea.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
      window.scrollTo(0, 0)
  }, []);
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <PizzaSceleton key={index} />)
          : items.map((pizza) => (
              <PizzaComponent
                key={pizza.id}
                {...pizza}
              />
            ))}
      </div>
    </>
  );
};

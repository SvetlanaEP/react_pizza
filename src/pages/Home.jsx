import React, { useEffect, useState } from 'react';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaComponent from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/Sceleton';
import { sortList } from '../components/Sort';
//import pizzas from './assets/pizzas.json';

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [selectedSort, setSelectedSort] = useState(0);

  const pizzas = items.map((pizza) => (
    <PizzaComponent
      key={pizza.id}
      {...pizza}
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSceleton key={index} />);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `search=${searchValue}` : ``;
    fetch(
      `https://68149373225ff1af16294cea.mockapi.io/items?${category}&sortBy=${sortList[selectedSort].sortType}&order=desc&${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
    console.log(searchValue)

    console.log(`https://68149373225ff1af16294cea.mockapi.io/items?${category}&${search}&sortBy=${sortList[selectedSort].sortType}&order=desc`)
  }, [categoryId, selectedSort, searchValue]);

  return (
    <>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort
          value={selectedSort}
          onClickSort={(index) => setSelectedSort(index)}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
    </>
  );
};

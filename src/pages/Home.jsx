import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaComponent from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/Sceleton';
import { sortList } from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setSort, setCurrentPage } from '../redux/slices/filterSlice';
//import pizzas from './assets/pizzas.json';

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const selectedSort = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  //const [selectedSort, setSelectedSort] = useState(0);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onClickSort = (id) => {
    dispatch(setSort(id));
  };

  const onClickPage = (page) => {
    dispatch(setCurrentPage(page));
  };

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
    /* fetch(
      `https://68149373225ff1af16294cea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortList[selectedSort].sortType}&order=desc&${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        if (arr === 'Not found') {
          arr = [];
        }
        setItems(arr);
        setIsLoading(false);
      });*/
    axios
      .get(
        `https://68149373225ff1af16294cea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortList[selectedSort].sortType}&order=desc&${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, selectedSort, searchValue, currentPage]);

  return (
    <>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort
          value={selectedSort}
          onClickSort={onClickSort}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={onClickPage} />
    </>
  );
};

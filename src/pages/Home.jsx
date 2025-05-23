import React, { useEffect, useRef} from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaComponent from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/Sceleton';
import { sortList } from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { setCategoryId, setSort, setCurrentPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice';
//import pizzas from './assets/pizzas.json';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);


  const {categoryId, selectedSort,currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzasData);

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

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `search=${searchValue}` : ``;
    const sortBy = sortList[selectedSort].sortType;
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
    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
        currentPage,
      }),
    );
  };
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        selectedSort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, selectedSort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters({ ...params }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();
  }, [categoryId, selectedSort, searchValue, currentPage]);

  const pizzas = items.map((pizza) => (
    <PizzaComponent
      key={pizza.id}
      {...pizza}
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSceleton key={index} />);

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
      {status === 'error' ? (
        <div className='content'>
          <h2> Ничего не найдено 😕 </h2>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination onChangePage={onClickPage} />
    </>
  );
};

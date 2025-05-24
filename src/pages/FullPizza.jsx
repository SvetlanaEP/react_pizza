import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from '../assets/img/pizza-logo.svg';

export const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://68149373225ff1af16294cea.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('питсы нет');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка..'
  }
  return (
    <div className='container'>
      <img className='pizza-block__image' src={logo} />
      <h2>{pizza.title}</h2>
      <div className='pizza-block__price'>от {pizza.price} ₽</div>
    </div>
  );
};

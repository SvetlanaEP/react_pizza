import React from 'react';

export default function Categories({ value, onClickCategory }) {
  const categoriesList = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categoriesList.map((item, index) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

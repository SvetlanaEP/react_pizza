import React, { useState } from 'react';

export default function Categories() {
  const [activeIndex, setActiveIndex]  = useState(0)
  const categoriesList = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }
  return (
    <div className='categories'>
      <ul>
        {categoriesList.map((item, index) => (
          <li key={index} className={activeIndex === index ? 'active' : ''} 
          onClick={() => onClickCategory(index)}>{item}</li>
        ))}

      </ul>
    </div>
  );
}

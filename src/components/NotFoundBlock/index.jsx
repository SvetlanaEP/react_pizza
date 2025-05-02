import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.title}>
      <h1 >
        <span> 😕 </span> <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>Данная страница отсутствует в нашем магазине</p>
    </div>
  );
};

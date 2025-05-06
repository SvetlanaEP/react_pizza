import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

export const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={(evt) => onChangePage(evt.selected+1)}
      pageRangeDisplayed={4}
      pageCount={3} // тут должно быть число с бэкенда, но мокапи не дает инфы про кол-во страниц
      renderOnZeroPageCount={null}
    />
  );
};

import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce'
import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

export const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const inputRef = useRef();

  const onClickClear = () => {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 300), []
  )

  const onChangeInput = (evt) => {
    setValue(evt.target.value)
    updateSearchValue(evt.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        placeholder='Поиск пиццы...'
        onChange={onChangeInput}
      ></input>
      {value && (
        <svg
          className={styles.clearIcon}
          fill='none'
          height='24'
          viewBox='0 0 24 24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
          onClick={onClickClear}
        >
          <path
            d='M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z'
            fill='currentColor'
          />
        </svg>
      )}
    </div>
  );
};

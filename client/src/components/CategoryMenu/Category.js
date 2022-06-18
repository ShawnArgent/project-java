import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_CATEGORY,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORY } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { category } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORY);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORY,
        category: categoryData.category,
      });
      categoryData.category.forEach((category) => {
        idbPromise('category', 'put', category);
      });
    } else if (!loading) {
      idbPromise('category', 'get').then((category) => {
        dispatch({
          type: UPDATE_CATEGORY,
          category: category,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {category.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

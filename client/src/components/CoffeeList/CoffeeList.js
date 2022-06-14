import React from 'react';
import { useEffect } from 'react';
import CoffeeItem from '../CoffeeItem';
import { useStoreContext } from '../../util/GlobalState';
import { UPDATE_COFFEE } from '../../util/actions';
import { useQuery } from '@apollo/client';
import { QUERY_COFFEE } from '../../util/queries';
import { idbPromise } from '../../util/helpers';
import spinner from '../../assets/spinner.gif';

function CoffeeList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_COFFEE);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_COFFEE,

        coffee: data.coffee,
      });
      data.coffee.forEach((coffee) => {
        idbPromise('coffee', 'put', coffee);
      });
    } else if (!loading) {
      idbPromise('coffee', 'get').then((coffee) => {
        dispatch({
          type: UPDATE_COFFEE,
          coffee: coffee,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterCoffee() {
    if (!currentCategory) {
      return state.coffee;
    }

    return state.coffee.filter((coffee) => coffee.category._id === currentCategory);
  }

  return (
    <div className='box'>
      <p>Our coffee</p>
      {state.coffee.length ? (
        <div className='columns'>
          {filterCoffee().map((coffee) => (
            <CoffeeItem
              key={coffee._id}
              _id={coffee._id}
              image={coffee.image}
              name={coffee.name}
              type={coffee.type}
              roast={coffee.roast}
              price={coffee.price}
              profile={coffee.profile}
              location={coffee.location}
              history={coffee.history}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any coffee yet!</h3>
      )}
      {loading ? <img src={spinner} alt='loading' /> : null}
    </div>
  );
}
export default CoffeeList;

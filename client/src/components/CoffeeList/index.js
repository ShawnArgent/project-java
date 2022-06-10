import React, { useEffect } from 'react';
import CoffeeItem from '../CoffeeItem';
import '../models/Coffee.js';
import { useStoreContext } from '../../util/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_COFFEE } from '../../util/queries';
import { idbPromise } from '../../util/helpers';
import spinner from '../../assets/spinner.gif';
import { UPDATE_COFFEE } from '../../util/actions';

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
      data.coffee.forEach((product) => {
        idbPromise('coffee', 'put', product);
      });
    } else if (!loading) {
      idbPromise('coffee', 'get').then((products) => {
        dispatch({
          type: UPDATE_COFFEE,
          coffee: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterCoffee() {
    if (!currentCategory) {
      return state.coffee;
    }

    return state.coffee.filter((product) => product.category._id === currentCategory);
  }

  return (
    <section className="section has-background-light is-clipped">
      <div class="container">
        <div class="has-background-white p-8 p-20-desktop">
          <h2 class="title mb-8 mb-20-tablet has-text-black">Our Coffees:</h2>
          {state.coffee.length ? (
            <div className="flex-row">
              {filterCoffee().map((product) => (
                <CoffeeItem key={product._id} _id={product._id} image={product.image} name={product.name} price={product.price} quantity={product.quantity} />
              ))}
            </div>
          ) : (
            <h3>You haven't added any products yet!</h3>
          )}
          {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
      </div>
    </section>
  );
}

export default CoffeeList;

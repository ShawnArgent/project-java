import React, { useEffect } from 'react';
import { useStoreContext } from '../../util/GlobalState';
import ProductItem from './../ProductItem/ProductItem';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from '../../util/queries';
import { idbPromise } from '../../util/helpers';
import { UPDATE_PRODUCT } from '../../util/actions';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCT);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCT,
        product: data.product,
      });
      data.product.forEach((product) => {
        idbPromise('product', 'put', product);
      });
    } else if (!loading) {
      idbPromise('product', 'get').then((product) => {
        dispatch({
          type: UPDATE_PRODUCT,
          product: product,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProduct() {
    if (!currentCategory) {
      return state.product;
    }

    return state.product.filter((product) => product.category._id === currentCategory);
  }

  return (
    <section className='section has-background-light is-clipped'>
      <div class='container'>
        <div class='has-background-white p-8 p-20-desktop'>
          <h2 class='title mb-8 mb-20-tablet has-text-black'>Our Coffees:</h2>
          {state.coffee.length ? (
            <div className='flex-row'>
              {filterProduct().map((product) => (
                <ProductItem key={product._id} _id={product._id} image={product.image} name={product.name} price={product.price} quantity={product.quantity} />
              ))}
            </div>
          ) : (
            <h3>You haven't added any products yet!</h3>
          )}
          {loading ? <img src={spinner} alt='loading' /> : null}
        </div>
      </div>
    </section>
  );
}

export default ProductList;

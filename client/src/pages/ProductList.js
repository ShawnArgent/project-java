import { useEffect } from 'react';
import ProductItem from '../components/ProductItem/ProductItem';
import { useStoreContext } from '../util/GlobalState';
import { UPDATE_PRODUCT } from '../util/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from '../util/queries';
import { idbPromise } from '../util/helpers';
import spinner from '../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCT);
  console.log(data);

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
    <div className='box'>
      <p>Our product</p>
      {state.product.length ? (
        <div className='columns'>
          {filterProduct().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              type={product.type}
              roast={product.roast}
              price={product.price}
              profile={product.profile}
              location={product.location}
              history={product.history}
            />
          ))}
        </div>
      ) : (
        <h3>Out of Stock!</h3>
      )}
      {loading ? <img src={spinner} alt='loading' /> : null}
    </div>
  );
}
export default ProductList;

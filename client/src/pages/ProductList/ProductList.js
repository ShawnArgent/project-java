import { useEffect } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import { useStoreContext } from '../../util/GlobalState';
import { UPDATE_PRODUCTS } from '../../util/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from '../../util/queries';
import { idbPromise } from '../../util/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCT);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,

        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((product) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          product: product,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter((product) => product.category._id === currentCategory);
  }

  return (
    <div className='box'>
      <p>Our Coffees</p>
      {state.product.length ? (
        <div className='columns'>
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
              profile={product.profile}
              location={product.location}
              locationhistory={product.history}
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

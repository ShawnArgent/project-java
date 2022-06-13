import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COFFEE } from '../../util/queries';
import { idbPromise } from '../../util/helpers';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../util/actions';
import { useStoreContext } from '../../util/GlobalState';
function CoffeeList() {
  const { loading, data } = useQuery(QUERY_COFFEE);
  const [state, dispatch] = useStoreContext();

  const coffees = data?.coffees || [];

  const { cart } = state;

  const addToCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      console.log(item);
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        coffees.map((coffee) => (
          <div className='column has-text-white' key={coffee._id}>
            <div className='column is-2 is-offset-5' key={coffee.name}>
              <div className='card-image is-centered'>
                <figure className='image is-centered is-1by1 mb-4'>
                  <img alt={coffee} src={`/images/${coffee.image}`} />
                </figure>
              </div>
              <div className='card-content-centered'>
                <div className='media-content-centered'>
                  <p className='title is-4 has-text-centered has-text-white'>{coffee.name}</p>
                  <p className='subtitle is-6 has-text-centered has-text-white'>Roast: {coffee.roast}</p>
                  <p className='subtitle is-6 has-text-centered has-text-white'>Price: {coffee.price}</p>
                  <p className='subtitle is-6 has-text-centered has-text-white'>Type: {coffee.type}</p>
                  <p className='subtitle is-6 has-text-centered has-text-white'>Tasting Profile: {coffee.tastingProfile}</p>
                  <p className='subtitle is-6 has-text-centered has-text-white'>Location: {coffee.location}</p>
                  <p className='subtitle is-6 has-text-centered has-text-white'>Location History: {coffee.locationHistory}</p>

                  <button onClick={() => addToCart(coffee)} className='button is-white has-text-centered has-text-black'>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
export default CoffeeList;

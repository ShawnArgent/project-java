import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../util/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_COFFEES } from '../util/actions';
import { QUERY_COFFEE } from '../util/queries';
import { idbPromise } from '../util/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_COFFEE);

  const { coffees, cart } = state;

  useEffect(() => {
    // already in global store
    if (coffees.length) {
      setCurrentProduct(coffees.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_COFFEES,
        coffees: data.coffees,
      });

      data.coffees.forEach((product) => {
        idbPromise('coffees', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('coffees', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_COFFEES,
          coffees: indexedProducts,
        });
      });
    }
  }, [coffees, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        coffee: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className='container my-1'>
          <Link to='/Shop'>← Back to Coffees</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price} <button onClick={addToCart}>Add to Cart</button>
            <button disabled={!cart.find((p) => p._id === currentProduct._id)} onClick={removeFromCart}>
              Remove from Cart
            </button>
          </p>

          <img src={`/images/${currentProduct.image}`} alt={currentProduct.name} />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt='loading' /> : null}
      <Cart />
    </>
  );
}

export default Detail;

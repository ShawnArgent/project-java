import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cart from '../components/Cart/cart';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_PRODUCT } from '../util/actions';
import { QUERY_PRODUCT } from '../util/queries';
import { idbPromise } from '../util/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCT);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCT,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCT,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

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
        product: { ...currentProduct, purchaseQuantity: 1 },
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
    <section className='section has-background-light is-clipped'>
      <div class='container'>
        {currentProduct && cart ? (
          <div className='container my-1'>
            <Link to='/'>← Back to Products</Link>

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
      </div>
    </section>
  );
}

export default Detail;

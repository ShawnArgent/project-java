import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import box from '../components/Jumbotron';
import { CREATE_ORDER } from '../util/mutations';
import { idbPromise } from '../util/helpers';

function Success() {
  const [createOrder] = useMutation(CREATE_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const product = cart.map((product) => product._id);

      if (product.length) {
        const { data } = await createOrder({ variables: { product } });
        const productData = data.addOrder.product;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(function () {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [createOrder]);

  return (
    <div className='box-centered'>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the homepage.</h2>
    </div>
  );
}

export default Success;

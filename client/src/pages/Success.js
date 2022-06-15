import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../util/mutations';
import { idbPromise } from '../util/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const product = cart.map((product) => product._id);

      if (product.length) {
        const { data } = await addOrder({ variables: { product } });
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
  }, [addOrder]);

  return (
    <Jumbotron>
      <p>Success!</p>
      <p>Thank you for your purchase!</p>
      <h2>You will now be redirected to the homepage.</h2>
    </Jumbotron>
  );
}

export default Success;

import React from 'react';
import { NavLink } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../util/queries';

function CartHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className='container my-1'>
        <NavLink to='/'> Back to Coffee!</NavLink>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.order.map((order) => (
              <div key={order._id} className='my-2'>
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <div className='flex-row'>
                  {order.product.map(({ _id, image, name, price }, index) => (
                    <div key={index} className='card px-1 py-1'>
                      <NavLink to={`/product/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </NavLink>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default CartHistory;

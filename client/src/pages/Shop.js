
import React from 'react';
import CoffeeList from '../components/CoffeeList';
import Cart from '../components/Cart';

export default function Shop() {
  return (
    <div className="coffeeContainer">
      <CoffeeList />
      <Cart />
    </div>
  );
}

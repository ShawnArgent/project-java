import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../util/auth';
import { AiFillShopping } from 'react-icons/ai';
import logo from '../../assets/black_logo.jpg';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className='navbar is-black' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <NavLink className='navbar-item' to='/'>
          <img className='logo' src={logo} width={150} height={150} alt='black coffee roasters' />
        </NavLink>
      </div>
      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-end'>
          {isLoggedIn ? (
            <>
              <NavLink to='/CartHistory' className='nav-item nav-link'>
                Cart History
              </NavLink>
              <button className='nav-item nav-link nav-link' onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to='/CartHistory' className='cart-icon'>
                <AiFillShopping />
              </NavLink>
              <NavLink to='/Login' className='nav-item nav-link'>
                Login
              </NavLink>
              <NavLink to='/Recipes' className='nav-item nav-link'>
                Recipes
              </NavLink>
              <NavLink to='/CoffeeList' className='nav-item nav-link'>
                Shop
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

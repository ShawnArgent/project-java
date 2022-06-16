import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../util/auth';
import { AiFillShopping } from 'react-icons/ai';
import logo from '../../assets/black_logo.jpg';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className='navbar is-black' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>
          <img className='logo' src={logo} width={150} height={150} alt='black coffee roasters' />
        </Link>
      </div>
      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-end'>
          {isLoggedIn ? (
            <>
              <Link to='/carthistory' className='nav-item nav-link'>
                Cart History
              </Link>
              <button className='nav-item nav-link nav-link' onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/carthistory' className='cart-icon'>
                <AiFillShopping />
              </Link>
              <Link to='/login' className='nav-item nav-link'>
                Login
              </Link>
              <Link to='/recipes' className='nav-item nav-link'>
                Recipes
              </Link>
              <Link to='/shop' className='nav-item nav-link'>
                Shop
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

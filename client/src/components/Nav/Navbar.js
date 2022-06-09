import { NavLink } from 'react-router-dom';
import { useAuth } from '../../util/auth';
import './Navbar.css';
import { AiFillShopping } from 'react-icons/ai';
import logo from './bnc2.jpg';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="navbar-container">
      <NavLink to="/" className="home-link">
        <img
          src={logo}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          alt={logo}
        />
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/protected" className="nav-link">
            User
          </NavLink>
          <button className="nav-link" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/signup" className="nav-link">
            Register
          </NavLink>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <button type="button" className="cart-icon">
            <AiFillShopping />
          </button>
        </>
      )}
    </nav>
  );
}

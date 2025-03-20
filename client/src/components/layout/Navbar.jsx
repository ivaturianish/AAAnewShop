"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import "./Navbar.css"

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AAA
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            Cart ({cartItemCount})
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user.name}</span>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar


"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import ProfileDropdown from "./ProfileDropdown"
import "./Navbar.css"

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    // Fetch current user
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ShopMERN
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
            <ShoppingCart size={20} />
            <span className="cart-count">{cartItemCount}</span>
          </Link>

          {!loading &&
            (user ? (
              <ProfileDropdown userName={user.name} />
            ) : (
              <div className="auth-links">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </div>
            ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar


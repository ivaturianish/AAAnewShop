"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import "./Cart.css"

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext)
  const navigate = useNavigate()

  // Calculate cart totals
  const itemsPrice = cart.reduce((a, c) => a + c.price * c.quantity, 0)
  const taxPrice = itemsPrice * 0.15
  const shippingPrice = itemsPrice > 100 ? 0 : 10
  const totalPrice = itemsPrice + taxPrice + shippingPrice

  const handleCheckout = () => {
    navigate("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
              </div>

              <div className="cart-item-details">
                <Link to={`/product/${item._id}`} className="cart-item-name">
                  {item.name}
                </Link>

                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>

              <div className="cart-item-actions">
                <select
                  value={item.quantity}
                  onChange={(e) => updateCartQuantity(item._id, Number(e.target.value))}
                  className="cart-item-quantity"
                >
                  {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>

                <button onClick={() => removeFromCart(item._id)} className="btn btn-secondary remove-btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary-item">
            <span>Items:</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>

          <div className="cart-summary-item">
            <span>Tax:</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>

          <div className="cart-summary-item">
            <span>Shipping:</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>

          <div className="cart-summary-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button onClick={handleCheckout} className="btn btn-primary checkout-btn">
            Proceed to Checkout
          </button>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart


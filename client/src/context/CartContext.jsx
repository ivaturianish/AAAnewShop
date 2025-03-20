"use client"

import { createContext, useState, useEffect } from "react"

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  clearCart: () => {},
})

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id)

    if (existingItem) {
      // If item already exists, update quantity
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item,
        ),
      )
    } else {
      // If item doesn't exist, add it to cart
      setCart([...cart, { ...product, quantity: product.quantity || 1 }])
    }
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id))
  }

  // Update item quantity
  const updateCartQuantity = (id, quantity) => {
    setCart(cart.map((item) => (item._id === id ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


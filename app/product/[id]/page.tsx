"use client"

import type React from "react"

import { useState, useEffect, useContext } from "react"
import { useParams } from "next/navigation"
import { CartContext } from "../../../client/src/context/CartContext"
import "../../../client/src/pages/ProductDetails.css"

interface Product {
  _id: string
  name: string
  image: string
  description: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  brand: string
  category: string
}

export default function ProductDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/product/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch product details")
        }

        const data = await response.json()
        setProduct(data.product)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product details:", error)
        setError("Failed to fetch product details. Please try again later.")
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      })
      // Navigate to cart page
      window.location.href = "/cart"
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value))
  }

  if (loading) {
    return <div className="loader">Loading product details...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (!product) {
    return <div className="error-message">Product not found</div>
  }

  return (
    <div className="product-details">
      <div className="product-details-container">
        <div className="product-details-image">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
        </div>

        <div className="product-details-info">
          <h1 className="product-details-name">{product.name}</h1>

          <div className="product-details-meta">
            <span className="product-details-brand">Brand: {product.brand}</span>
            <span className="product-details-category">Category: {product.category}</span>
          </div>

          <div className="product-details-rating">
            Rating: {product.rating} ({product.numReviews} reviews)
          </div>

          <div className="product-details-price">${product.price.toFixed(2)}</div>

          <div className="product-details-description">
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-details-actions">
            <div className="product-details-status">
              Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </div>

            {product.countInStock > 0 && (
              <div className="product-details-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <select id="quantity" value={quantity} onChange={handleQuantityChange}>
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="btn btn-primary add-to-cart-btn"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


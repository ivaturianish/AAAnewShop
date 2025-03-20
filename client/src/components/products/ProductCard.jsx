"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>

        <p className="product-price">${product.price.toFixed(2)}</p>

        {product.countInStock > 0 ? (
          <span className="in-stock">In Stock</span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>

      <div className="product-actions">
        <button onClick={handleAddToCart} className="btn btn-primary add-to-cart" disabled={product.countInStock === 0}>
          Add to Cart
        </button>

        <Link to={`/product/${product._id}`} className="btn view-details">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard


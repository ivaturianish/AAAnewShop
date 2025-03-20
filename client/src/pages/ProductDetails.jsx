"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import "./ProductDetails.css"

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real application, this would be an API call to your backend
        // Example: const response = await fetch(`/api/products/${id}`);

        // For demonstration, we'll use a timeout to simulate network request
        setTimeout(() => {
          // Sample data based on the ID
          const sampleProduct = {
            _id: id,
            name: "Product " + id,
            image: "https://via.placeholder.com/600",
            description:
              "This is a detailed description of the product. It includes information about features, materials, and usage instructions.",
            price: 99.99,
            countInStock: 15,
            rating: 4.5,
            numReviews: 12,
            brand: "Brand Name",
            category: "Electronics",
          }

          setProduct(sampleProduct)
          setLoading(false)
        }, 1000)
      } catch (error) {
        setError("Failed to fetch product details. Please try again later.")
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })
    navigate("/cart")
  }

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value))
  }

  if (loading) {
    return <div className="loader">Loading...</div>
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

export default ProductDetails


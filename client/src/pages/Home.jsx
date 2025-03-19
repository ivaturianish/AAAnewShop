"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/products/ProductCard"
import "./Home.css"

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, this would be an API call to your backend
        // Example: const response = await fetch('/api/products');

        // For demonstration, we'll use a timeout to simulate network request
        setTimeout(() => {
          // Sample data
          const sampleProducts = [
            {
              _id: "1",
              name: "Wireless Headphones",
              image: "https://via.placeholder.com/300",
              description: "High-quality wireless headphones with noise cancellation.",
              price: 99.99,
              countInStock: 15,
              rating: 4.5,
              numReviews: 12,
            },
            {
              _id: "2",
              name: "Smartphone",
              image: "https://via.placeholder.com/300",
              description: "Latest smartphone with advanced camera features.",
              price: 699.99,
              countInStock: 7,
              rating: 4.0,
              numReviews: 8,
            },
            {
              _id: "3",
              name: "Laptop",
              image: "https://via.placeholder.com/300",
              description: "Powerful laptop for work and gaming.",
              price: 1299.99,
              countInStock: 5,
              rating: 4.8,
              numReviews: 15,
            },
            {
              _id: "4",
              name: "Smartwatch",
              image: "https://via.placeholder.com/300",
              description: "Track your fitness and stay connected.",
              price: 199.99,
              countInStock: 0,
              rating: 4.2,
              numReviews: 10,
            },
          ]

          setProducts(sampleProducts)
          setLoading(false)
        }, 1000)
      } catch (error) {
        setError("Failed to fetch products. Please try again later.")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="loader">Loading...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AAA</h1>
          <p>Discover amazing products at great prices</p>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home


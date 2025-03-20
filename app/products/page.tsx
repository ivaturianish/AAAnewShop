"use client"

import { useState, useEffect } from "react"
import ProductCard from "../../client/src/components/products/ProductCard"
import "../../client/src/pages/Home.css"

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data.products)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Failed to fetch products. Please try again later.")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="loader">Loading products from MongoDB...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>Browse our collection of quality products</p>
        </div>
      </section>

      <section className="featured-products">
        <h2>All Products</h2>
        {products.length === 0 ? (
          <div className="text-center p-10">No products found in the database.</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}


// This file provides client-side API functions that call our server actions
import type { CartItem } from "@/hooks/use-cart"

// Get all products or featured products
export async function getProducts(featured = false) {
  try {
    const url = `/api/products${featured ? "?featured=true" : ""}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

// Get a single product by ID
export async function getProductById(id: string) {
  try {
    const response = await fetch(`/api/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
}

// Create a checkout session with Stripe
export async function createCheckoutSession(cart: CartItem[]) {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    })

    if (!response.ok) {
      throw new Error("Failed to create checkout session")
    }

    return response.json()
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}


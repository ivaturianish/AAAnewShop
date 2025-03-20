"use server"

import { getCollection } from "./mongodb"
import { revalidatePath } from "next/cache"
import type { CartItem } from "@/hooks/use-cart"

// Types
export interface Product {
  id: string
  name: string
  price: number
  description: string
  benefits: string[]
  ingredients: string
  directions: string
  image: string
  rating: number
  reviews: number
  stock: number
  featured: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "completed" | "processing" | "cancelled"
  createdAt: Date
}

export interface SurveyResponse {
  id: string
  fitnessGoal: "cutting" | "bulking" | "maintenance" | null
  createdAt: Date
}

// Get all products or featured products
export async function getProducts(featured = false) {
  try {
    const collection = await getCollection("products")

    if (featured) {
      return await collection.find({ featured: true }).toArray()
    }

    return await collection.find({}).toArray()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Get a single product by ID
export async function getProductById(id: string) {
  try {
    const collection = await getCollection("products")
    const product = await collection.findOne({ id })

    if (!product) {
      throw new Error("Product not found")
    }

    return product
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
}

// Create a checkout session and store order in MongoDB
export async function createCheckoutSession(cart: CartItem[]) {
  try {
    const ordersCollection = await getCollection("orders")

    // Calculate total
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 5.99
    const total = subtotal + shipping

    // Create order
    const order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      items: cart,
      total,
      status: "completed",
      createdAt: new Date(),
    }

    // Insert order into MongoDB
    await ordersCollection.insertOne(order)

    // Return a simulated checkout session
    return {
      id: order.id,
      url: `/checkout/success?session_id=${order.id}`,
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

// Store survey response
export async function storeSurveyResponse(fitnessGoal: "cutting" | "bulking" | "maintenance" | null) {
  try {
    const surveyCollection = await getCollection("surveys")

    const surveyResponse = {
      id: `survey_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      fitnessGoal,
      createdAt: new Date(),
    }

    await surveyCollection.insertOne(surveyResponse)
    return surveyResponse
  } catch (error) {
    console.error("Error storing survey response:", error)
    throw error
  }
}

// Seed products if none exist
export async function seedProducts() {
  try {
    const productsCollection = await getCollection("products")
    const count = await productsCollection.countDocuments()

    if (count === 0) {
      // Insert mock products
      await productsCollection.insertMany(mockProducts)
      revalidatePath("/products")
      return { success: true, message: "Products seeded successfully" }
    }

    return { success: true, message: "Products already exist" }
  } catch (error) {
    console.error("Error seeding products:", error)
    return { success: false, message: "Failed to seed products" }
  }
}

// Mock products for seeding
const mockProducts = [
  {
    id: "1",
    name: "Vitamin D3 + K2 Complex",
    price: 24.99,
    description:
      "Support bone health and immune function with our premium Vitamin D3 and K2 complex. Each capsule contains 5000 IU of Vitamin D3 and 100mcg of Vitamin K2 MK-7.",
    benefits: [
      "Supports bone health and density",
      "Enhances immune system function",
      "Promotes cardiovascular health",
      "Helps with calcium absorption",
    ],
    ingredients: "Vitamin D3 (as Cholecalciferol), Vitamin K2 (as MK-7), Olive Oil, Gelatin Capsule",
    directions: "Take 1 capsule daily with a meal or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.8,
    reviews: 124,
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Omega-3 Fish Oil",
    price: 19.99,
    description:
      "High-potency fish oil providing essential EPA and DHA fatty acids to support heart, brain, and joint health. Each softgel contains 1000mg of fish oil with 500mg of combined EPA and DHA.",
    benefits: [
      "Supports cardiovascular health",
      "Promotes brain function and cognitive health",
      "Helps reduce inflammation in joints",
      "Supports healthy vision",
    ],
    ingredients: "Fish Oil Concentrate, Gelatin Softgel, Glycerin, Purified Water, Natural Lemon Flavor",
    directions: "Take 1-2 softgels daily with food or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.6,
    reviews: 98,
    stock: 75,
    featured: true,
  },
  // ... other products from the original mockProducts array
]


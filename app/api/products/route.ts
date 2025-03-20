import { NextResponse } from "next/server"
import mongoose from "mongoose"

// MongoDB Connection
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/supplement-store"
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri)
      console.log("MongoDB connected")
    }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error("Failed to connect to MongoDB")
  }
}

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    brand: String,
    category: String,
    price: Number,
    countInStock: Number,
    rating: Number,
    numReviews: Number,
  },
  {
    timestamps: true,
    // This allows the schema to work with existing collections
    collection: "products",
  },
)

// Get the Product model (or create it if it doesn't exist)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export async function GET() {
  try {
    await connectDB()

    // Fetch all products from the database
    const products = await Product.find({})

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}


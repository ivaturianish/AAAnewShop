import { type NextRequest, NextResponse } from "next/server"
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
    collection: "products",
  },
)

// Get the Product model (or create it if it doesn't exist)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const id = params.id

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    // Find the product by ID
    const product = await Product.findById(id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}


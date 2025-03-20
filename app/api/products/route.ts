import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const featured = request.nextUrl.searchParams.get("featured") === "true"
    const collection = await getCollection("products")

    let products
    if (featured) {
      products = await collection.find({ featured: true }).toArray()
    } else {
      products = await collection.find({}).toArray()
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}


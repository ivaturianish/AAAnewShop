import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const featured = request.nextUrl.searchParams.get("featured") === "true"
    const tag = request.nextUrl.searchParams.get("tag")
    const collection = await getCollection("products")

    let query = {}

    // Build the query based on parameters
    if (featured) {
      query = { featured: true }
    }

    if (tag) {
      query = { ...query, tags: tag }
    }

    const products = await collection.find(query).toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}


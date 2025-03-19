import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/models/Order"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getUserFromToken()

    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    await connectDB()

    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Get order history error:", error)
    return NextResponse.json({ message: "Server error getting order history" }, { status: 500 })
  }
}


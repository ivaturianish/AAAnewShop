import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/models/Order"
import { getUserFromToken } from "@/lib/auth"

// Create new order
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromToken()

    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } =
      await req.json()

    await connectDB()

    if (orderItems && orderItems.length === 0) {
      return NextResponse.json({ message: "No order items" }, { status: 400 })
    } else {
      const order = new Order({
        orderItems,
        user: user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()

      return NextResponse.json(createdOrder, { status: 201 })
    }
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ message: "Server error creating order" }, { status: 500 })
  }
}


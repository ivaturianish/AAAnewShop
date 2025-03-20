import { getCollection } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import type { CartItem } from "@/hooks/use-cart"

export async function POST(request: NextRequest) {
  try {
    const { cart } = (await request.json()) as { cart: CartItem[] }

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
    const ordersCollection = await getCollection("orders")
    await ordersCollection.insertOne(order)

    // Return a simulated checkout session
    return NextResponse.json({
      id: order.id,
      url: `/checkout/success?session_id=${order.id}`,
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}


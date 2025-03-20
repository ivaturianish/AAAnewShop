"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart()

    // You could also verify the session with your backend here
  }, [clearCart])

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg border border-stone-200 p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-stone-800 mb-2">Thank You for Your Order!</h1>

        <p className="text-stone-600 mb-6">
          Your order has been successfully placed. We'll send you a confirmation email shortly.
        </p>

        {sessionId && <p className="text-sm text-stone-500 mb-6">Order reference: {sessionId.substring(0, 8)}...</p>}

        <div className="space-y-3">
          <Link href="/products">
            <Button className="w-full bg-stone-800 hover:bg-stone-700">Continue Shopping</Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


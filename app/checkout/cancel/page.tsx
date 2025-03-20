"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg border border-stone-200 p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-16 w-16 text-amber-500" />
        </div>

        <h1 className="text-2xl font-bold text-stone-800 mb-2">Checkout Cancelled</h1>

        <p className="text-stone-600 mb-6">Your order was not completed. Your cart items are still saved.</p>

        <div className="space-y-3">
          <Link href="/cart">
            <Button className="w-full bg-stone-800 hover:bg-stone-700">Return to Cart</Button>
          </Link>

          <Link href="/products">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { createCheckoutSession } from "@/lib/api"
import Header from "@/components/header"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checking out",
        variant: "destructive",
      })
      return
    }

    try {
      setIsCheckingOut(true)
      const session = await createCheckoutSession(cart)
      router.push(session.url)
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-stone-700 mb-4">Your cart is empty</h2>
            <p className="text-stone-600 mb-8">Looks like you haven't added any supplements to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-stone-800 hover:bg-stone-700">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
                <div className="p-4 bg-stone-50 border-b border-stone-200">
                  <h2 className="font-semibold text-stone-800">Cart Items ({cart.length})</h2>
                </div>

                <div>
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 border-b border-stone-200 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 relative rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-medium text-stone-800">{item.name}</h3>
                          <p className="text-stone-600 text-sm">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center border border-stone-300 rounded-md">
                          <button
                            className="px-2 py-1 text-stone-600 hover:bg-stone-100 rounded-l-md"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-stone-800 border-x border-stone-300">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-stone-600 hover:bg-stone-100 rounded-r-md"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <p className="font-medium text-stone-800">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => router.push("/products")}>
                  Continue Shopping
                </Button>

                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your cart?")) {
                      clearCart()
                    }
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg border border-stone-200 overflow-hidden sticky top-4">
                <div className="p-4 bg-stone-50 border-b border-stone-200">
                  <h2 className="font-semibold text-stone-800">Order Summary</h2>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="font-medium text-stone-800">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-600">Shipping</span>
                    <span className="font-medium text-stone-800">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-stone-500 italic">Free shipping on orders over $50</div>
                  )}

                  <Separator className="my-2" />

                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-stone-800">Total</span>
                    <span className="font-bold text-stone-800">${total.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full bg-stone-800 hover:bg-stone-700 mt-4"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </Button>

                  <div className="text-center text-sm text-stone-500 mt-4">Secure checkout powered by Stripe</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}


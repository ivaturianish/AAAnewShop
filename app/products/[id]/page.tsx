"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { getProductById } from "@/lib/api"
import Header from "@/components/header"

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch product data
  useState(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id as string)
        setProduct(data)
      } catch (err) {
        setError("Failed to load product")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  })

  // Fallback product data for preview
  const fallbackProduct = {
    id: "1",
    name: "Vitamin D3 + K2 Complex",
    price: 24.99,
    description:
      "Support bone health and immune function with our premium Vitamin D3 and K2 complex. Each capsule contains 5000 IU of Vitamin D3 and 100mcg of Vitamin K2 MK-7.",
    benefits: [
      "Supports bone health and density",
      "Enhances immune system function",
      "Promotes cardiovascular health",
      "Helps with calcium absorption",
    ],
    ingredients: "Vitamin D3 (as Cholecalciferol), Vitamin K2 (as MK-7), Olive Oil, Gelatin Capsule",
    directions: "Take 1 capsule daily with a meal or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.8,
    reviews: 124,
    stock: 50,
  }

  const productData = product || fallbackProduct

  const handleAddToCart = () => {
    addToCart({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} × ${productData.name} added to your cart`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-stone-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Product Not Found</h2>
        <p className="text-stone-600 mb-6">{error}</p>
        <Button onClick={() => router.push("/products")}>Back to Products</Button>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white p-4 rounded-lg border border-stone-200">
            <div className="aspect-square relative overflow-hidden rounded-md">
              <Image
                src={productData.image || "/placeholder.svg"}
                alt={productData.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">{productData.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(productData.rating) ? "text-yellow-400 fill-yellow-400" : "text-stone-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-stone-600">
                {productData.rating} ({productData.reviews} reviews)
              </span>
            </div>

            <p className="text-2xl font-bold text-stone-800 mb-4">${productData.price.toFixed(2)}</p>

            <p className="text-stone-600 mb-6">{productData.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-stone-800 mb-2">Benefits:</h3>
              <ul className="list-disc pl-5 text-stone-600 space-y-1">
                {productData.benefits.map((benefit: string, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-stone-800 mb-2">Ingredients:</h3>
              <p className="text-stone-600">{productData.ingredients}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-stone-800 mb-2">Directions:</h3>
              <p className="text-stone-600">{productData.directions}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-stone-300 rounded-md">
                <button
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 rounded-l-md"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 text-stone-800 border-x border-stone-300">{quantity}</span>
                <button
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 rounded-r-md"
                  onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-stone-500">{productData.stock} in stock</span>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-stone-800 hover:bg-stone-700 text-white"
              size="lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


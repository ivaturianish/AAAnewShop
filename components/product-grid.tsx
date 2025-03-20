"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/use-cart"
import { getProducts } from "@/lib/api"

interface ProductGridProps {
  featured?: boolean
  tag?: string
}

export default function ProductGrid({ featured = false, tag }: ProductGridProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts(featured, tag)
        setProducts(data)
      } catch (err) {
        setError("Failed to load products")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [featured, tag])

  // Fallback products for preview
  const fallbackProducts = [
    {
      id: "1",
      name: "Vitamin D3 + K2 Complex",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 124,
      featured: true,
    },
    {
      id: "2",
      name: "Omega-3 Fish Oil",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.6,
      reviews: 98,
      featured: true,
    },
    {
      id: "3",
      name: "Magnesium Glycinate",
      price: 22.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 87,
      featured: true,
    },
    {
      id: "4",
      name: "Zinc Picolinate",
      price: 15.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      reviews: 76,
      featured: false,
    },
    {
      id: "5",
      name: "Vitamin C with Rose Hips",
      price: 18.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 112,
      featured: false,
    },
    {
      id: "6",
      name: "Probiotic Complex",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 93,
      featured: false,
    },
    {
      id: "7",
      name: "Ashwagandha Root Extract",
      price: 21.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.6,
      reviews: 84,
      featured: false,
    },
    {
      id: "8",
      name: "Turmeric Curcumin with BioPerine",
      price: 23.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 105,
      featured: false,
    },
  ]

  const displayProducts =
    products.length > 0 ? products : featured ? fallbackProducts.filter((p) => p.featured) : fallbackProducts

  const handleQuickAdd = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-stone-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <Link href={`/products/${product.id}`} className="block">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </Link>

          <div className="p-4">
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="font-medium text-stone-800 hover:text-stone-600 mb-1">{product.name}</h3>
            </Link>

            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-stone-300"}`}
                  />
                ))}
              </div>
              <span className="ml-1 text-xs text-stone-500">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-semibold text-stone-800">${product.price.toFixed(2)}</p>

              <Button
                variant="outline"
                size="sm"
                className="text-stone-600 border-stone-300 hover:bg-stone-50 hover:text-stone-800"
                onClick={(e) => {
                  e.preventDefault()
                  handleQuickAdd(product)
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


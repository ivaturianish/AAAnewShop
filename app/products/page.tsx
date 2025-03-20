"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Header from "@/components/header"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const tagParam = searchParams.get("tag")
  const [tag, setTag] = useState<string | undefined>(tagParam || undefined)

  // Update tag when URL parameter changes
  useEffect(() => {
    setTag(tagParam || undefined)
  }, [tagParam])

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">
          {tag ? `${tag.charAt(0).toUpperCase() + tag.slice(1)} Products` : "All Products"}
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 border-stone-300 focus:border-stone-500"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={!tag ? "default" : "outline"}
              size="sm"
              className={!tag ? "bg-stone-800 text-white" : "text-stone-600"}
              onClick={() => setTag(undefined)}
            >
              All
            </Button>
            <Button
              variant={tag === "cutting" ? "default" : "outline"}
              size="sm"
              className={tag === "cutting" ? "bg-stone-800 text-white" : "text-stone-600"}
              onClick={() => setTag("cutting")}
            >
              Cutting
            </Button>
            <Button
              variant={tag === "bulking" ? "default" : "outline"}
              size="sm"
              className={tag === "bulking" ? "bg-stone-800 text-white" : "text-stone-600"}
              onClick={() => setTag("bulking")}
            >
              Bulking
            </Button>
            <Button
              variant={tag === "maintenance" ? "default" : "outline"}
              size="sm"
              className={tag === "maintenance" ? "bg-stone-800 text-white" : "text-stone-600"}
              onClick={() => setTag("maintenance")}
            >
              Maintenance
            </Button>
          </div>
        </div>

        <ProductGrid tag={tag} />
      </div>
    </>
  )
}


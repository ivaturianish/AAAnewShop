"use client";

import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Header from "@/components/header"

export default function ProductsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">All Products</h1>

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
            <Button variant="outline" size="sm" className="text-stone-600">
              Filter
            </Button>
            <select className="border border-stone-300 rounded-md px-3 py-1 text-sm text-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <ProductGrid />
      </div>
    </>
  )
}


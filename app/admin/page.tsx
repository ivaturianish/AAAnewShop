import Link from "next/link"
import { getCollection } from "@/lib/mongodb"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { ShoppingBag, BarChart, Package } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  // Get counts from collections
  const productsCollection = await getCollection("products")
  const ordersCollection = await getCollection("orders")
  const surveysCollection = await getCollection("surveys")

  const productCount = await productsCollection.countDocuments()
  const orderCount = await ordersCollection.countDocuments()
  const surveyCount = await surveysCollection.countDocuments()

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-stone-800">Products</h2>
              <Package className="h-5 w-5 text-stone-500" />
            </div>
            <p className="text-3xl font-bold text-stone-800 mb-4">{productCount}</p>
            <Link href="/api/seed">
              <Button variant="outline" size="sm" className="w-full">
                Seed Products
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-stone-800">Orders</h2>
              <ShoppingBag className="h-5 w-5 text-stone-500" />
            </div>
            <p className="text-3xl font-bold text-stone-800 mb-4">{orderCount}</p>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm" className="w-full">
                View Orders
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-stone-800">Survey Responses</h2>
              <BarChart className="h-5 w-5 text-stone-500" />
            </div>
            <p className="text-3xl font-bold text-stone-800 mb-4">{surveyCount}</p>
            <Link href="/admin/surveys">
              <Button variant="outline" size="sm" className="w-full">
                View Responses
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <h2 className="font-semibold text-stone-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/products">
              <Button variant="outline" size="sm" className="w-full">
                View Store
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm" className="w-full">
                Orders
              </Button>
            </Link>
            <Link href="/admin/surveys">
              <Button variant="outline" size="sm" className="w-full">
                Surveys
              </Button>
            </Link>
            <Link href="/api/seed">
              <Button variant="outline" size="sm" className="w-full">
                Seed Database
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}


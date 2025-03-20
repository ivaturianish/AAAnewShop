import { getCollection } from "@/lib/mongodb"
import Header from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

interface Product {
  id: string
  name: string
  price: number
  tags: string[]
  featured: boolean
  stock: number
}

export default async function AdminProductsPage() {
  const productsCollection = await getCollection("products")
  const products = (await productsCollection.find({}).toArray()) as unknown as Product[]

  // Count products by tag
  const tagCounts = {
    cutting: 0,
    bulking: 0,
    maintenance: 0,
  }

  products.forEach((product) => {
    if (product.tags) {
      product.tags.forEach((tag) => {
        if (tag in tagCounts) {
          tagCounts[tag as keyof typeof tagCounts]++
        }
      })
    }
  })

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">Product Management</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">Product Summary</h2>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-lg">
                  <h3 className="font-medium text-stone-700 mb-2">Total Products</h3>
                  <p className="text-3xl font-bold text-stone-800">{products.length}</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg">
                  <h3 className="font-medium text-stone-700 mb-2">Featured Products</h3>
                  <p className="text-3xl font-bold text-stone-800">{products.filter((p) => p.featured).length}</p>
                </div>
              </div>

              <div className="mt-4 bg-stone-50 p-4 rounded-lg">
                <h3 className="font-medium text-stone-700 mb-2">Products by Category</h3>
                <ul className="space-y-1">
                  <li className="flex justify-between">
                    <span className="text-stone-600">Cutting:</span>
                    <span className="font-medium">{tagCounts.cutting}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-600">Bulking:</span>
                    <span className="font-medium">{tagCounts.bulking}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-600">Maintenance:</span>
                    <span className="font-medium">{tagCounts.maintenance}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">Quick Actions</h2>
            </div>

            <div className="p-4 space-y-4">
              <Link href="/api/seed">
                <Button variant="outline" className="w-full">
                  Reseed Products Database
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" className="w-full">
                  View Store Front
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200">
            <h2 className="font-semibold text-stone-800">Product Inventory</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-stone-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-stone-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-stone-700">Price</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-stone-700">Stock</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-stone-700">Tags</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-stone-700">Featured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50">
                    <td className="px-4 py-2 text-sm text-stone-600">{product.id}</td>
                    <td className="px-4 py-2 text-sm font-medium text-stone-800">{product.name}</td>
                    <td className="px-4 py-2 text-sm text-stone-600">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-stone-600">{product.stock}</td>
                    <td className="px-4 py-2 text-sm text-stone-600">
                      <div className="flex flex-wrap gap-1">
                        {product.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 text-xs rounded-full bg-stone-100 text-stone-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-stone-600">
                      {product.featured ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-stone-100 text-stone-800">
                          No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}


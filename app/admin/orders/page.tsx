import { getCollection } from "@/lib/mongodb"
import Header from "@/components/header"
import { formatDistanceToNow } from "date-fns"

export const dynamic = "force-dynamic"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: string
  createdAt: Date | string
}

export default async function OrdersPage() {
  const ordersCollection = await getCollection("orders")
  const orders = (await ordersCollection.find({}).sort({ createdAt: -1 }).toArray()) as unknown as Order[]

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-stone-200">
            <h2 className="text-xl font-semibold text-stone-700 mb-2">No Orders Yet</h2>
            <p className="text-stone-600">Orders will appear here once customers make purchases.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">Recent Orders ({orders.length})</h2>
            </div>

            <div className="divide-y divide-stone-200">
              {orders.map((order) => (
                <div key={order.id} className="p-4">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-stone-800">Order #{order.id.substring(6, 14)}</h3>
                      <p className="text-sm text-stone-500">
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {order.status}
                      </span>
                      <p className="font-medium text-stone-800 mt-1">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded p-3">
                    <h4 className="text-sm font-medium text-stone-700 mb-2">Items</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm flex justify-between">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}


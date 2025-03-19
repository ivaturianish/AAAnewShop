"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "./orders.css"

interface OrderItem {
  _id: string
  name: string
  quantity: number
  image: string
  price: number
}

interface Order {
  _id: string
  createdAt: string
  totalPrice: number
  isPaid: boolean
  paidAt?: string
  isDelivered: boolean
  deliveredAt?: string
  orderItems: OrderItem[]
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/history")

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch orders")
        }

        const data = await response.json()
        setOrders(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  if (loading) {
    return <div className="loader">Loading order history...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="order-history-page">
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link href="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 10)}...</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="status-paid">{new Date(order.paidAt as string).toLocaleDateString()}</span>
                    ) : (
                      <span className="status-not-paid">Not Paid</span>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="status-delivered">
                        {new Date(order.deliveredAt as string).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="status-not-delivered">Not Delivered</span>
                    )}
                  </td>
                  <td>
                    <Link href={`/order/${order._id}`} className="btn-details">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


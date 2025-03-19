"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "./profile.css"

interface UserProfile {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/auth/user")

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch user profile")
        }

        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [router])

  if (loading) {
    return <div className="loader">Loading profile...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (!user) {
    return <div className="error-message">User not found</div>
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Account Information</h2>
          </div>

          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{user.name}</span>
            </div>

            <div className="profile-detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>

            <div className="profile-detail-item">
              <span className="detail-label">Account Type:</span>
              <span className="detail-value">{user.isAdmin ? "Administrator" : "Customer"}</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <Link href="/profile/orders" className="btn btn-primary">
            View Order History
          </Link>

          <Link href="/profile/edit" className="btn btn-secondary">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}


import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import User from "@/models/User"
import connectDB from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"

// Generate JWT token
export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  })
}

// Set JWT token in cookie
export const setTokenCookie = (token: string) => {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    sameSite: "strict",
  })
}

// Get user from token
export const getUserFromToken = async () => {
  try {
    const token = cookies().get("token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    await connectDB()

    const user = await User.findById(decoded.id).select("-password")
    return user
  } catch (error) {
    console.error("Error getting user from token:", error)
    return null
  }
}

// Middleware to protect routes
export const isAuthenticated = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) {
      return false
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    await connectDB()

    const user = await User.findById(decoded.id)
    return !!user
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}

// Clear token cookie
export const clearTokenCookie = () => {
  cookies().delete("token")
}


import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"
import { generateToken, setTokenCookie } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Connect to database
    await connectDB()

    // Find user by email
    const user = await User.findOne({ email })

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Generate token
      const token = generateToken(user._id.toString())

      // Set token in cookie
      setTokenCookie(token)

      return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Server error during login" }, { status: 500 })
  }
}


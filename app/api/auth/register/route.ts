import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"
import { generateToken, setTokenCookie } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Connect to database
    await connectDB()

    // Check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
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
      return NextResponse.json({ message: "Invalid user data" }, { status: 400 })
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Server error during registration" }, { status: 500 })
  }
}


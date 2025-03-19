import { NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getUserFromToken()

    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ message: "Server error getting user data" }, { status: 500 })
  }
}


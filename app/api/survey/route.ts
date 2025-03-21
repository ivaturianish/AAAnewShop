import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { fitnessGoal } = await request.json()
    const surveyCollection = await getCollection("surveys")

    const surveyResponse = {
      id: `survey_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      fitnessGoal,
      createdAt: new Date(),
    }

    await surveyCollection.insertOne(surveyResponse)
    return NextResponse.json(surveyResponse)
  } catch (error) {
    console.error("Error storing survey response:", error)
    return NextResponse.json({ error: "Failed to store survey response" }, { status: 500 })
  }
}


import { getCollection } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

type FitnessGoal = "cutting" | "bulking" | "maintenance" | null

export async function POST(request: NextRequest) {
  try {
    const { fitnessGoal } = (await request.json()) as { fitnessGoal: FitnessGoal }

    const surveyResponse = {
      id: `survey_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      fitnessGoal,
      createdAt: new Date(),
    }

    const surveyCollection = await getCollection("surveys")
    await surveyCollection.insertOne(surveyResponse)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing survey response:", error)
    return NextResponse.json({ error: "Failed to store survey response" }, { status: 500 })
  }
}


import { getCollection } from "@/lib/mongodb"
import Header from "@/components/header"
import { formatDistanceToNow } from "date-fns"

export const dynamic = "force-dynamic"

interface SurveyResponse {
  id: string
  fitnessGoal: "cutting" | "bulking" | "maintenance" | null
  createdAt: Date | string
}

export default async function SurveysPage() {
  const surveysCollection = await getCollection("surveys")
  const surveys = (await surveysCollection.find({}).sort({ createdAt: -1 }).toArray()) as unknown as SurveyResponse[]

  // Count responses by goal
  const goalCounts = {
    cutting: 0,
    bulking: 0,
    maintenance: 0,
    null: 0,
  }

  surveys.forEach((survey) => {
    const goal = survey.fitnessGoal || "null"
    goalCounts[goal as keyof typeof goalCounts]++
  })

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">Survey Responses</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">Response Summary</h2>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-lg">
                  <h3 className="font-medium text-stone-700 mb-2">Total Responses</h3>
                  <p className="text-3xl font-bold text-stone-800">{surveys.length}</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg">
                  <h3 className="font-medium text-stone-700 mb-2">Goals Breakdown</h3>
                  <ul className="space-y-1">
                    <li className="flex justify-between">
                      <span className="text-stone-600">Cutting:</span>
                      <span className="font-medium">{goalCounts.cutting}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-stone-600">Bulking:</span>
                      <span className="font-medium">{goalCounts.bulking}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-stone-600">Maintenance:</span>
                      <span className="font-medium">{goalCounts.maintenance}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-stone-600">Not specified:</span>
                      <span className="font-medium">{goalCounts.null}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">Recent Responses</h2>
            </div>

            {surveys.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-stone-600">No survey responses yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-200 max-h-96 overflow-y-auto">
                {surveys.map((survey) => (
                  <div key={survey.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-stone-800">
                          Goal: {survey.fitnessGoal ? survey.fitnessGoal : "Not specified"}
                        </p>
                        <p className="text-sm text-stone-500">
                          {formatDistanceToNow(new Date(survey.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-800">
                        {survey.id.substring(7, 15)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}


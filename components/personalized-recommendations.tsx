"use client"

import { useEffect, useState } from "react"
import { useFitnessGoal } from "@/hooks/use-fitness-goal"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PersonalizedRecommendations() {
  const { fitnessGoal, isLoading } = useFitnessGoal()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show recommendations if user has selected a goal
    if (fitnessGoal && fitnessGoal !== "null") {
      setVisible(true)
    }
  }, [fitnessGoal])

  if (isLoading || !visible) {
    return null
  }

  const recommendations = {
    cutting: {
      title: "Supplements for Cutting",
      description: "These supplements can help support your fat loss goals while preserving lean muscle.",
      products: ["Vitamin D3 + K2 Complex", "Omega-3 Fish Oil", "Zinc Picolinate"],
    },
    bulking: {
      title: "Supplements for Bulking",
      description: "These supplements can help support muscle growth and recovery during your bulk.",
      products: ["Probiotic Complex", "Magnesium Glycinate", "Vitamin C with Rose Hips"],
    },
    maintenance: {
      title: "Supplements for Staying Lean",
      description: "These supplements can help maintain your current physique and support overall health.",
      products: ["Ashwagandha Root Extract", "Turmeric Curcumin with BioPerine", "Vitamin D3 + K2 Complex"],
    },
  }

  const goalData = fitnessGoal && recommendations[fitnessGoal as keyof typeof recommendations]

  if (!goalData) {
    return null
  }

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-stone-800 mb-2">{goalData.title}</h3>
      <p className="text-stone-600 mb-4">{goalData.description}</p>

      <ul className="list-disc pl-5 mb-4 text-stone-700">
        {goalData.products.map((product, index) => (
          <li key={index} className="mb-1">
            {product}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <Link href="/products">
          <Button variant="outline" className="text-stone-700 border-stone-300">
            View All Products
          </Button>
        </Link>

        <button onClick={() => setVisible(false)} className="text-sm text-stone-500 hover:text-stone-700">
          Hide recommendations
        </button>
      </div>
    </div>
  )
}


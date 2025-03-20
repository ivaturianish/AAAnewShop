"use client"

import { useState, useEffect } from "react"

type FitnessGoal = "cutting" | "bulking" | "maintenance" | null

export function useFitnessGoal() {
  const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get the fitness goal from localStorage
    const storedGoal = localStorage.getItem("fitness-goal") as FitnessGoal
    setFitnessGoal(storedGoal)
    setIsLoading(false)
  }, [])

  const updateFitnessGoal = (goal: FitnessGoal) => {
    localStorage.setItem("fitness-goal", goal || "")
    setFitnessGoal(goal)
  }

  return {
    fitnessGoal,
    updateFitnessGoal,
    isLoading,
  }
}


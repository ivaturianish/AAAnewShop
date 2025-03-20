"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type FitnessGoal = "cutting" | "bulking" | "maintenance" | null

export default function SurveyModal() {
  const [open, setOpen] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)

  useEffect(() => {
    // Check if user has already answered the survey
    const surveyCompleted = localStorage.getItem("survey-completed")

    if (!surveyCompleted) {
      // Show survey after a short delay
      const timer = setTimeout(() => {
        setOpen(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleSelection = async (goal: FitnessGoal) => {
    // Save the user's selection
    localStorage.setItem("fitness-goal", goal || "")
    localStorage.setItem("survey-completed", "true")

    // Store the response in MongoDB
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fitnessGoal: goal }),
      })
    } catch (error) {
      console.error("Failed to store survey response:", error)
    }

    // Close the modal
    setHasAnswered(true)
    setTimeout(() => setOpen(false), 500)
  }

  const handleClose = () => {
    localStorage.setItem("survey-completed", "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-stone-800">What's Your Fitness Goal?</DialogTitle>
          <DialogDescription className="text-stone-600">
            Help us recommend supplements that match your goals.
          </DialogDescription>
        </DialogHeader>

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid gap-4 py-4">
          {hasAnswered ? (
            <div className="text-center py-6">
              <p className="text-green-600 font-medium mb-2">Thanks for sharing!</p>
              <p className="text-stone-600">We'll use this to personalize your experience.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={() => handleSelection("cutting")}
                variant="outline"
                className="p-6 h-auto flex flex-col items-center justify-center border-stone-300 hover:bg-stone-100 hover:border-stone-400"
              >
                <span className="text-lg font-medium mb-1">Cutting</span>
                <span className="text-sm text-stone-500">Losing fat while preserving muscle</span>
              </Button>

              <Button
                onClick={() => handleSelection("bulking")}
                variant="outline"
                className="p-6 h-auto flex flex-col items-center justify-center border-stone-300 hover:bg-stone-100 hover:border-stone-400"
              >
                <span className="text-lg font-medium mb-1">Bulking</span>
                <span className="text-sm text-stone-500">Building muscle and strength</span>
              </Button>

              <Button
                onClick={() => handleSelection("maintenance")}
                variant="outline"
                className="p-6 h-auto flex flex-col items-center justify-center border-stone-300 hover:bg-stone-100 hover:border-stone-400"
              >
                <span className="text-lg font-medium mb-1">Staying Lean</span>
                <span className="text-sm text-stone-500">Maintaining current physique</span>
              </Button>

              <Button onClick={() => handleSelection(null)} variant="ghost" className="mt-2 text-stone-500">
                I'd rather not say
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


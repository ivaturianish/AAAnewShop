"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SurveyModalContextType {
  isOpen: boolean
  openSurvey: () => void
  closeSurvey: () => void
}

const SurveyModalContext = createContext<SurveyModalContextType | undefined>(undefined)

export function SurveyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSurvey = () => setIsOpen(true)
  const closeSurvey = () => setIsOpen(false)

  return (
    <SurveyModalContext.Provider value={{ isOpen, openSurvey, closeSurvey }}>{children}</SurveyModalContext.Provider>
  )
}

export function useSurveyModal() {
  const context = useContext(SurveyModalContext)
  if (context === undefined) {
    throw new Error("useSurveyModal must be used within a SurveyModalProvider")
  }
  return context
}


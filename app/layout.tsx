import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/hooks/use-cart"
import { SurveyModalProvider } from "@/hooks/use-survey-modal"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AAA Supplements",
  description: "Handcrafted supplements for your wellbeing",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <SurveyModalProvider>
            {children}
            <Toaster />
          </SurveyModalProvider>
        </CartProvider>
      </body>
    </html>
  )
}


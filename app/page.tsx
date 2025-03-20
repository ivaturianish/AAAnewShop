"use client";
import Link from "next/link"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SurveyModal from "@/components/survey-modal"
import PersonalizedRecommendations from "@/components/personalized-recommendations"

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <SurveyModal />

      <main>
        <section className="py-12 md:py-20 bg-stone-100 border-b border-stone-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">
              Natural Supplements for Your Wellbeing
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
              Handcrafted supplements made with quality ingredients to support your health journey.
            </p>
            <Link href="/products">
              <Button className="bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-md">Shop Now</Button>
            </Link>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="mb-4">
            <PersonalizedRecommendations />
          </div>
          <h2 className="text-2xl font-bold mb-8 text-stone-800">Featured Products</h2>
          <ProductGrid featured={true} />
        </section>

        <section className="py-12 bg-stone-100 border-y border-stone-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-stone-800">Why Choose AAA Supplements?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-stone-800">Quality Ingredients</h3>
                <p className="text-stone-600">
                  We source only the highest quality natural ingredients for our supplements.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-stone-800">Handcrafted Care</h3>
                <p className="text-stone-600">
                  Each product is made with attention to detail and genuine care for your health.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-stone-800">Transparent Process</h3>
                <p className="text-stone-600">We believe in transparency about what goes into our supplements.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


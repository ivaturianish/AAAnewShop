"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main>
        <section className="py-12 md:py-20 bg-stone-100 border-b border-stone-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">Our Story</h1>
            <p className="text-lg md:text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
              Founded with a passion for natural wellness and a commitment to quality.
            </p>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-stone-800">How We Started</h2>
              <p className="text-stone-600 mb-4">
                AAA Supplements began in 2023 with a simple mission: to create high-quality, natural supplements that
                actually work. Our founder, after struggling to find supplements that met their standards for purity and
                effectiveness, decided to create their own.
              </p>
              <p className="text-stone-600 mb-4">
                What started as a small operation has grown into a trusted brand, but we've never lost sight of our
                original values. Every product is still crafted with the same attention to detail and commitment to
                quality that defined our first supplements.
              </p>
              <p className="text-stone-600">
                We believe in transparency, which is why we're open about our ingredients, sourcing practices, and
                manufacturing processes. We want you to know exactly what you're putting in your body.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Our workshop" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="py-12 bg-stone-100 border-y border-stone-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-stone-800 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-stone-800">Quality First</h3>
                <p className="text-stone-600">
                  We never compromise on the quality of our ingredients or manufacturing processes. Every batch is
                  tested for purity and potency.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-stone-800">Transparency</h3>
                <p className="text-stone-600">
                  We believe you have the right to know exactly what's in your supplements and how they're made. No
                  hidden ingredients, no misleading claims.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-stone-800">Sustainability</h3>
                <p className="text-stone-600">
                  We're committed to minimizing our environmental impact through responsible sourcing and eco-friendly
                  packaging solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-stone-800">Our Promise</h2>
            <p className="text-stone-600 mb-8">
              We stand behind every product we make. If you're not completely satisfied with your purchase, we offer a
              30-day money-back guarantee. Your wellness journey is important to us, and we're here to support you every
              step of the way.
            </p>
            <Link href="/products">
              <Button className="bg-stone-800 hover:bg-stone-700 text-white">Explore Our Products</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


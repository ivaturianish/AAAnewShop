// This file would normally connect to your backend API
// For this demo, we'll use mock data and localStorage

import type { CartItem } from "@/hooks/use-cart"

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Vitamin D3 + K2 Complex",
    price: 24.99,
    description:
      "Support bone health and immune function with our premium Vitamin D3 and K2 complex. Each capsule contains 5000 IU of Vitamin D3 and 100mcg of Vitamin K2 MK-7.",
    benefits: [
      "Supports bone health and density",
      "Enhances immune system function",
      "Promotes cardiovascular health",
      "Helps with calcium absorption",
    ],
    ingredients: "Vitamin D3 (as Cholecalciferol), Vitamin K2 (as MK-7), Olive Oil, Gelatin Capsule",
    directions: "Take 1 capsule daily with a meal or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.8,
    reviews: 124,
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Omega-3 Fish Oil",
    price: 19.99,
    description:
      "High-potency fish oil providing essential EPA and DHA fatty acids to support heart, brain, and joint health. Each softgel contains 1000mg of fish oil with 500mg of combined EPA and DHA.",
    benefits: [
      "Supports cardiovascular health",
      "Promotes brain function and cognitive health",
      "Helps reduce inflammation in joints",
      "Supports healthy vision",
    ],
    ingredients: "Fish Oil Concentrate, Gelatin Softgel, Glycerin, Purified Water, Natural Lemon Flavor",
    directions: "Take 1-2 softgels daily with food or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.6,
    reviews: 98,
    stock: 75,
    featured: true,
  },
  {
    id: "3",
    name: "Magnesium Glycinate",
    price: 22.99,
    description:
      "Highly bioavailable form of magnesium that supports muscle relaxation, sleep quality, and nervous system function. Each capsule provides 200mg of elemental magnesium as magnesium glycinate.",
    benefits: [
      "Promotes muscle relaxation and recovery",
      "Supports quality sleep and relaxation",
      "Helps maintain healthy nervous system function",
      "Supports bone health and density",
    ],
    ingredients: "Magnesium Glycinate, Vegetable Cellulose Capsule, Rice Flour",
    directions: "Take 1-2 capsules daily with food or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.7,
    reviews: 87,
    stock: 60,
    featured: true,
  },
  {
    id: "4",
    name: "Zinc Picolinate",
    price: 15.99,
    description:
      "Highly absorbable form of zinc that supports immune function, skin health, and hormone production. Each capsule provides 30mg of elemental zinc as zinc picolinate.",
    benefits: [
      "Supports immune system function",
      "Promotes skin health and wound healing",
      "Helps maintain hormone balance",
      "Supports taste and smell function",
    ],
    ingredients: "Zinc Picolinate, Vegetable Cellulose Capsule, Rice Flour",
    directions: "Take 1 capsule daily with food or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.5,
    reviews: 76,
    stock: 90,
    featured: false,
  },
  {
    id: "5",
    name: "Vitamin C with Rose Hips",
    price: 18.99,
    description:
      "Powerful antioxidant support with 1000mg of vitamin C enhanced with rose hips for better absorption and additional bioflavonoids.",
    benefits: [
      "Supports immune system function",
      "Provides antioxidant protection",
      "Promotes collagen production for skin health",
      "Supports iron absorption",
    ],
    ingredients: "Vitamin C (as Ascorbic Acid), Rose Hips Extract, Vegetable Cellulose Capsule",
    directions: "Take 1 capsule 1-2 times daily with food or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.9,
    reviews: 112,
    stock: 85,
    featured: false,
  },
  {
    id: "6",
    name: "Probiotic Complex",
    price: 29.99,
    description:
      "Multi-strain probiotic formula with 50 billion CFU to support gut health, digestion, and immune function. Contains 12 clinically studied probiotic strains.",
    benefits: [
      "Supports digestive health and function",
      "Helps maintain healthy gut microbiome",
      "Supports immune system function",
      "Promotes nutrient absorption",
    ],
    ingredients: "Probiotic Blend (12 strains), Prebiotic Fiber, Vegetable Cellulose Capsule",
    directions: "Take 1 capsule daily with or without food, or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.7,
    reviews: 93,
    stock: 40,
    featured: false,
  },
  {
    id: "7",
    name: "Ashwagandha Root Extract",
    price: 21.99,
    description:
      "Traditional adaptogenic herb that helps the body manage stress and supports overall wellbeing. Each capsule contains 600mg of standardized ashwagandha root extract.",
    benefits: [
      "Helps the body adapt to stress",
      "Supports healthy energy levels",
      "Promotes mental clarity and focus",
      "Supports immune function",
    ],
    ingredients: "Ashwagandha Root Extract, Vegetable Cellulose Capsule, Rice Flour",
    directions: "Take 1 capsule 1-2 times daily with food or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.6,
    reviews: 84,
    stock: 55,
    featured: false,
  },
  {
    id: "8",
    name: "Turmeric Curcumin with BioPerine",
    price: 23.99,
    description:
      "High-potency turmeric extract standardized to 95% curcuminoids with BioPerine black pepper extract for enhanced absorption. Supports joint health and provides antioxidant benefits.",
    benefits: [
      "Supports joint health and mobility",
      "Provides antioxidant protection",
      "Helps maintain a healthy inflammatory response",
      "Supports cognitive function",
    ],
    ingredients:
      "Turmeric Root Extract (95% Curcuminoids), BioPerine Black Pepper Extract, Vegetable Cellulose Capsule",
    directions: "Take 1 capsule 1-2 times daily with food or as directed by your healthcare professional.",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4.8,
    reviews: 105,
    stock: 70,
    featured: false,
  },
]

// Get all products or featured products
export async function getProducts(featured = false) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (featured) {
    return mockProducts.filter((product) => product.featured)
  }

  return mockProducts
}

// Get a single product by ID
export async function getProductById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const product = mockProducts.find((product) => product.id === id)

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}

// Create a checkout session with Stripe
export async function createCheckoutSession(cart: CartItem[]) {
  // In a real app, this would call your backend API to create a Stripe checkout session
  // For this demo, we'll simulate a successful response

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate a Stripe checkout session response
  return {
    id: "cs_test_" + Math.random().toString(36).substring(2, 15),
    url: "/checkout/success?session_id=cs_test_" + Math.random().toString(36).substring(2, 15),
  }
}


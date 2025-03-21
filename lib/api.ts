import type { CartItem } from "@/hooks/use-cart"

// Client-side API functions that call server actions
export async function getProducts(featured = false, tag?: string) {
  let url = `/api/products?featured=${featured}`
  if (tag) {
    url += `&tag=${tag}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

export async function getProductById(id: string) {
  const response = await fetch(`/api/products/${id}`)
  if (!response.ok) {
    throw new Error("Product not found")
  }
  return response.json()
}

export async function createCheckoutSession(cart: CartItem[]) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart }),
  })

  if (!response.ok) {
    throw new Error("Checkout failed")
  }

  return response.json()
}

export async function storeSurveyResponse(fitnessGoal: string | null) {
  const response = await fetch("/api/survey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fitnessGoal }),
  })

  if (!response.ok) {
    throw new Error("Failed to store survey response")
  }

  return response.json()
}


"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Recommendation {
  product_id: string;
  similarity_score: number;
  explanation: string;
}

interface ProductRecommendationsProps {
  productId: string;
}

export function ProductRecommendations({
  productId,
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        // Fetch recommendations from our API
        const recommendationsResponse = await fetch(
          `/api/recommendations?productId=${productId}`
        );
        if (!recommendationsResponse.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.recommendations || []);

        // Get product details for the recommended products
        if (
          recommendationsData.recommendations &&
          recommendationsData.recommendations.length > 0
        ) {
          const productIds = recommendationsData.recommendations.map(
            (rec: Recommendation) => rec.product_id
          );

          // Fetch product details
          const productsData = await Promise.all(
            productIds.map(async (id: string) => {
              const response = await fetch(`/api/products/${id}`);
              if (response.ok) {
                return response.json();
              }
              return null;
            })
          );

          setProducts(productsData.filter(Boolean));
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchRecommendations();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Don't show anything if there's an error
  }

  if (recommendations.length === 0 || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">You might also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-2 bg-gray-100 rounded-md overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

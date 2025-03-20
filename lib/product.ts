import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { cache } from "react";

export type Product = {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inventory: number;
  featured?: boolean;
};

// Cache the database calls with React's cache function
export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "shop");

    const products = await db
      .collection("products")
      .find({})
      .sort({ name: 1 })
      .toArray();

    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
});

export const getProductById = cache(
  async (id: string): Promise<Product | null> => {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "shop");

      let objectId;
      try {
        objectId = new ObjectId(id);
      } catch (error) {
        // If the ID is not a valid ObjectId, try to find by the string ID field
        const product = await db.collection("products").findOne({ id });
        if (product) {
          return {
            ...product,
            _id: product._id.toString(),
          } as Product;
        }
        return null;
      }

      const product = await db
        .collection("products")
        .findOne({ _id: objectId });

      if (!product) return null;

      return {
        ...product,
        _id: product._id.toString(),
      } as Product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }
);

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "shop");

    const products = await db
      .collection("products")
      .find({ featured: true })
      .sort({ name: 1 })
      .toArray();

    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
});

export const getProductsByCategory = cache(
  async (category: string): Promise<Product[]> => {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "shop");

      const products = await db
        .collection("products")
        .find({ category })
        .sort({ name: 1 })
        .toArray();

      return products.map((product) => ({
        ...product,
        _id: product._id.toString(),
      })) as Product[];
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  }
);

import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

// Function to run Python script and get recommendations
async function getRecommendationsFromPython(productId: string): Promise<any> {
  try {
    // Path to the Python script that will use our trained model
    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "get_recommendations.py"
    );

    // Execute the Python script with the product ID as an argument
    const { stdout, stderr } = await execAsync(
      `python ${scriptPath} ${productId}`
    );

    if (stderr) {
      console.error("Python script error:", stderr);
      throw new Error("Failed to get recommendations from Python script");
    }

    // Parse the JSON output from the Python script
    return JSON.parse(stdout);
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Get recommendations from Python script
    const recommendations = await getRecommendationsFromPython(productId);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error in recommendations API:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, productId, purchaseAmount } = body;

    if (!customerId || !productId || !purchaseAmount) {
      return NextResponse.json(
        { error: "Customer ID, Product ID, and Purchase Amount are required" },
        { status: 400 }
      );
    }

    // Path to the Python script that will update our model
    const scriptPath = path.join(process.cwd(), "scripts", "update_model.py");

    // Execute the Python script with the new purchase data
    const { stdout, stderr } = await execAsync(
      `python ${scriptPath} ${customerId} ${productId} ${purchaseAmount}`
    );

    if (stderr) {
      console.error("Python script error:", stderr);
      throw new Error("Failed to update model with Python script");
    }

    return NextResponse.json({
      success: true,
      message: "Model updated successfully",
    });
  } catch (error) {
    console.error("Error updating recommendation model:", error);
    return NextResponse.json(
      { error: "Failed to update recommendation model" },
      { status: 500 }
    );
  }
}

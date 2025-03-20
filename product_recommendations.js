import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { KNN } from "ml-knn";

// Function to load and process purchase data
async function loadPurchaseData(filePath) {
  return new Promise((resolve, reject) => {
    const records = [];
    createReadStream(filePath)
      .pipe(parse({ delimiter: ",", columns: true }))
      .on("data", (record) => records.push(record))
      .on("end", () => resolve(records))
      .on("error", (error) => reject(error));
  });
}

// Function to create product feature vectors
function createProductFeatures(purchaseData) {
  // Extract unique products and customers
  const products = [
    ...new Set(purchaseData.map((record) => record.product_id)),
  ];
  const customers = [
    ...new Set(purchaseData.map((record) => record.customer_id)),
  ];

  // Create a product-customer purchase matrix
  const productFeatures = {};
  products.forEach((product) => {
    productFeatures[product] = new Array(customers.length).fill(0);
  });

  // Fill the matrix with purchase data
  purchaseData.forEach((record) => {
    const productId = record.product_id;
    const customerIndex = customers.indexOf(record.customer_id);
    const purchaseValue = parseFloat(record.purchase_amount);

    productFeatures[productId][customerIndex] = purchaseValue;
  });

  console.log(
    `Created feature vectors for ${products.length} products based on ${customers.length} customers`
  );
  return { productFeatures, products, customers };
}

// Function to build the recommendation model
function buildRecommendationModel(productFeatures, products) {
  // Convert product features to array format for KNN
  const featureVectors = products.map((product) => productFeatures[product]);

  // Create and train KNN model
  const knn = new KNN(featureVectors, products, { k: 5 });

  console.log("Recommendation model built successfully");
  return knn;
}

// Function to get product recommendations
function getRecommendations(
  model,
  productFeatures,
  products,
  productId,
  numRecommendations = 5
) {
  if (!products.includes(productId)) {
    console.log(`Product ${productId} not found in the dataset`);
    return [];
  }

  // Get the feature vector for the target product
  const productVector = productFeatures[productId];

  // Find nearest neighbors
  const neighbors = model.predict(productVector, numRecommendations + 1);

  // Filter out the product itself
  const recommendations = neighbors
    .filter((p) => p !== productId)
    .slice(0, numRecommendations);

  return recommendations;
}

// Function to explain recommendations
function explainRecommendations(
  recommendations,
  productFeatures,
  targetProductId
) {
  const explanations = recommendations.map((recProductId) => {
    // Calculate similarity score (cosine similarity)
    const targetVector = productFeatures[targetProductId];
    const recVector = productFeatures[recProductId];

    const similarity = calculateCosineSimilarity(targetVector, recVector);

    // Determine common purchase patterns
    const commonCustomers = countCommonCustomers(targetVector, recVector);

    return {
      product_id: recProductId,
      similarity_score: similarity.toFixed(2),
      common_customers: commonCustomers,
      explanation: `Product ${recProductId} is recommended because it has a similarity score of ${similarity.toFixed(
        2
      )} with the current product. ${commonCustomers} customers have purchased both products.`,
    };
  });

  return explanations;
}

// Helper function to calculate cosine similarity
function calculateCosineSimilarity(vectorA, vectorB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  return dotProduct / (normA * normB) || 0;
}

// Helper function to count common customers
function countCommonCustomers(vectorA, vectorB) {
  let count = 0;
  for (let i = 0; i < vectorA.length; i++) {
    if (vectorA[i] > 0 && vectorB[i] > 0) {
      count++;
    }
  }
  return count;
}

// Main function to demonstrate the recommendation system
async function main() {
  try {
    // Sample data - in a real scenario, this would be loaded from a CSV file
    const samplePurchaseData = [
      { customer_id: "C1", product_id: "P1", purchase_amount: "120" },
      { customer_id: "C1", product_id: "P2", purchase_amount: "85" },
      { customer_id: "C2", product_id: "P1", purchase_amount: "100" },
      { customer_id: "C2", product_id: "P3", purchase_amount: "75" },
      { customer_id: "C3", product_id: "P2", purchase_amount: "90" },
      { customer_id: "C3", product_id: "P3", purchase_amount: "110" },
      { customer_id: "C4", product_id: "P1", purchase_amount: "95" },
      { customer_id: "C4", product_id: "P4", purchase_amount: "120" },
      { customer_id: "C5", product_id: "P2", purchase_amount: "80" },
      { customer_id: "C5", product_id: "P4", purchase_amount: "130" },
      { customer_id: "C6", product_id: "P3", purchase_amount: "70" },
      { customer_id: "C6", product_id: "P5", purchase_amount: "210" },
      { customer_id: "C7", product_id: "P4", purchase_amount: "100" },
      { customer_id: "C7", product_id: "P5", purchase_amount: "180" },
    ];

    console.log("Processing purchase data...");

    // Process the data
    const { productFeatures, products, customers } =
      createProductFeatures(samplePurchaseData);

    // Build the recommendation model
    const model = buildRecommendationModel(productFeatures, products);

    // Get recommendations for a specific product
    const targetProduct = "P1";
    console.log(`\nGetting recommendations for product ${targetProduct}...`);

    const recommendations = getRecommendations(
      model,
      productFeatures,
      products,
      targetProduct,
      3
    );
    console.log(`Top recommendations: ${recommendations.join(", ")}`);

    // Explain the recommendations
    console.log("\nExplanation for recommendations:");
    const explanations = explainRecommendations(
      recommendations,
      productFeatures,
      targetProduct
    );
    explanations.forEach((exp) => {
      console.log(`- ${exp.explanation}`);
    });

    // Demonstrate dynamic recommendations for a new purchase
    console.log("\nDemonstrating dynamic recommendations for a new purchase:");
    const newPurchase = {
      customer_id: "C8",
      product_id: "P2",
      purchase_amount: "95",
    };
    console.log(
      `New purchase: Customer ${newPurchase.customer_id} bought Product ${newPurchase.product_id}`
    );

    // Update the data with the new purchase
    samplePurchaseData.push(newPurchase);
    const updatedData = createProductFeatures(samplePurchaseData);
    const updatedModel = buildRecommendationModel(
      updatedData.productFeatures,
      updatedData.products
    );

    // Get updated recommendations
    const updatedRecommendations = getRecommendations(
      updatedModel,
      updatedData.productFeatures,
      updatedData.products,
      newPurchase.product_id,
      3
    );

    console.log(
      `Updated recommendations for product ${
        newPurchase.product_id
      }: ${updatedRecommendations.join(", ")}`
    );
  } catch (error) {
    console.error("Error in recommendation system:", error);
  }
}

// Run the main function
main();

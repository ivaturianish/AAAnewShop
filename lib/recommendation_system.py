import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import pickle
import os
from typing import List, Dict, Any, Tuple

class ProductRecommendationSystem:
    def __init__(self, n_neighbors: int = 5):
        """
        Initialize the recommendation system with the number of neighbors to consider.

        Args:
            n_neighbors: Number of neighbors to find for each product
        """
        self.n_neighbors = n_neighbors
        self.model = NearestNeighbors(n_neighbors=n_neighbors + 1, algorithm='auto', metric='cosine')
        self.products = None
        self.product_features = None
        self.product_ids = None

    def fit(self, purchase_data: List[Dict[str, Any]]) -> None:
        """
        Process purchase data and build the recommendation model.

        Args:
            purchase_data: List of purchase records with customer_id, product_id, and purchase_amount
        """
        # Convert to DataFrame for easier processing
        df = pd.DataFrame(purchase_data)

        # Create a pivot table: products as rows, customers as columns, values are purchase amounts
        pivot_table = df.pivot_table(
            index='product_id', 
            columns='customer_id', 
            values='purchase_amount', 
            fill_value=0
        )

        # Store product IDs for later reference
        self.product_ids = pivot_table.index.tolist()

        # Store the feature matrix
        self.product_features = pivot_table.values

        # Fit the model
        self.model.fit(self.product_features)

        # Store product data for recommendations
        self.products = {item['product_id']: item for item in purchase_data if 'name' in item}

        return self

    def get_recommendations(self, product_id: str, num_recommendations: int = 5) -> List[Dict[str, Any]]:
        """
        Get product recommendations based on a target product.

        Args:
            product_id: ID of the product to get recommendations for
            num_recommendations: Number of recommendations to return

        Returns:
            List of recommended product objects with similarity scores
        """
        if product_id not in self.product_ids:
            return []

        # Get the index of the product
        product_idx = self.product_ids.index(product_id)

        # Get the feature vector for the product
        product_vector = self.product_features[product_idx].reshape(1, -1)

        # Find nearest neighbors
        distances, indices = self.model.kneighbors(product_vector, n_neighbors=min(self.n_neighbors + 1, len(self.product_ids)))

        # Skip the first result as it's the product itself
        neighbor_indices = indices[0][1:num_recommendations+1]
        neighbor_distances = distances[0][1:num_recommendations+1]

        # Convert distance to similarity score (1 - distance)
        similarity_scores = 1 - neighbor_distances

        # Get the recommended products
        recommendations = []
        for i, idx in enumerate(neighbor_indices):
            product_id = self.product_ids[idx]
            if product_id in self.products:
                recommendation = {
                    'product_id': product_id,
                    'similarity_score': float(similarity_scores[i]),
                    'explanation': f"This product is recommended because it has a similarity score of {similarity_scores[i]:.2f} with the current product."
                }
                recommendations.append(recommendation)

        return recommendations

    def save_model(self, filepath: str) -> None:
        """Save the trained model to a file"""
        with open(filepath, 'wb') as f:
            pickle.dump({
                'model': self.model,
                'product_ids': self.product_ids,
                'product_features': self.product_features,
                'products': self.products
            }, f)

    @classmethod
    def load_model(cls, filepath: str) -> 'ProductRecommendationSystem':
        """Load a trained model from a file"""
        with open(filepath, 'rb') as f:
            data = pickle.load(f)

        instance = cls()
        instance.model = data['model']
        instance.product_ids = data['product_ids']
        instance.product_features = data['product_features']
        instance.products = data['products']

        return instance

    def update_model(self, new_purchase_data: List[Dict[str, Any]]) -> None:
        """
        Update the model with new purchase data.

        Args:
            new_purchase_data: List of new purchase records
        """
        # For simplicity, we'll just retrain the model with the combined data
        # In a production system, you might want to implement incremental updates

        # Convert existing data back to purchase records
        existing_data = []
        for i, product_id in enumerate(self.product_ids):
            for j, customer_id in enumerate(range(self.product_features.shape[1])):
                if self.product_features[i, j] > 0:
                    existing_data.append({
                        'product_id': product_id,
                        'customer_id': f'C{j+1}',  # Assuming customer IDs are in this format
                        'purchase_amount': float(self.product_features[i, j])
                    })

        # Combine with new data
        combined_data = existing_data + new_purchase_data

        # Retrain the model
        self.fit(combined_data)

 
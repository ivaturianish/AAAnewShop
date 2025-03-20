import sys
import os
import json
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from lib.recommendation_system import ProductRecommendationSystem

def load_sample_data():
    """Load sample purchase data for initial training"""
    return [
        {"customer_id": "C1", "product_id": "P1", "purchase_amount": 120, "name": "Premium Headphones"},
        {"customer_id": "C1", "product_id": "P2", "purchase_amount": 85, "name": "Wireless Mouse"},
        {"customer_id": "C2", "product_id": "P1", "purchase_amount": 100, "name": "Premium Headphones"},
        {"customer_id": "C2", "product_id": "P3", "purchase_amount": 75, "name": "Bluetooth Speaker"},
        {"customer_id": "C3", "product_id": "P2", "purchase_amount": 90, "name": "Wireless Mouse"},
        {"customer_id": "C3", "product_id": "P3", "purchase_amount": 110, "name": "Bluetooth Speaker"},
        {"customer_id": "C4", "product_id": "P1", "purchase_amount": 95, "name": "Premium Headphones"},
        {"customer_id": "C4", "product_id": "P4", "purchase_amount": 120, "name": "Mechanical Keyboard"},
        {"customer_id": "C5", "product_id": "P2", "purchase_amount": 80, "name": "Wireless Mouse"},
        {"customer_id": "C5", "product_id": "P4", "purchase_amount": 130, "name": "Mechanical Keyboard"},
        {"customer_id": "C6", "product_id": "P3", "purchase_amount": 70, "name": "Bluetooth Speaker"},
        {"customer_id": "C6", "product_id": "P5", "purchase_amount": 210, "name": "Smartwatch"},
        {"customer_id": "C7", "product_id": "P4", "purchase_amount": 100, "name": "Mechanical Keyboard"},
        {"customer_id": "C7", "product_id": "P5", "purchase_amount": 180, "name": "Smartwatch"},
    ]

def main():
    # Create the model directory if it doesn't exist
    os.makedirs('models', exist_ok=True)

    # Load sample data
    purchase_data = load_sample_data()

    print("Training recommendation model...")

    # Create and train the recommendation system
    recommendation_system = ProductRecommendationSystem(n_neighbors=5)
    recommendation_system.fit(purchase_data)

    # Save the trained model
    model_path = 'models/recommendation_model.pkl'
    recommendation_system.save_model(model_path)
    print(f"Model saved to {model_path}")

    # Test the model
    test_product_id = "P1"
    recommendations = recommendation_system.get_recommendations(test_product_id, num_recommendations=3)

    print(f"\nTest recommendations for product {test_product_id}:")
    for rec in recommendations:
        print(f"- {rec['product_id']} (Similarity: {rec['similarity_score']:.2f})")
        print(f"  {rec['explanation']}")

if __name__ == "__main__":
    main()
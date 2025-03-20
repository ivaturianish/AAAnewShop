import sys
import json
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from lib.recommendation_system import ProductRecommendationSystem

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Product ID is required"}))
        sys.exit(1)

    product_id = sys.argv[1]

    try:
        # Load the trained model
        model_path = 'models/recommendation_model.pkl'
        recommendation_system = ProductRecommendationSystem.load_model(model_path)

        # Get recommendations
        recommendations = recommendation_system.get_recommendations(product_id, num_recommendations=5)

        # Output as JSON
        print(json.dumps(recommendations))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
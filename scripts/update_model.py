import sys
import json
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from lib.recommendation_system import ProductRecommendationSystem

def main():
    if len(sys.argv) < 4:
        print(json.dumps({"error": "Customer ID, Product ID, and Purchase Amount are required"}))
        sys.exit(1)

    customer_id = sys.argv[1]
    product_id = sys.argv[2]
    purchase_amount = float(sys.argv[3])

    try:
        # Load the trained model
        model_path = 'models/recommendation_model.pkl'
        recommendation_system = ProductRecommendationSystem.load_model(model_path)

        # Create new purchase data
        new_purchase = {
            "customer_id": customer_id,
            "product_id": product_id,
            "purchase_amount": purchase_amount
        }

        # Update the model
        recommendation_system.update_model([new_purchase])

        # Save the updated model
        recommendation_system.save_model(model_path)

        # Output success
        print(json.dumps({"success": True}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
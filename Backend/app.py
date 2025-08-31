# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.json_util import dumps # For serializing MongoDB ObjectId to JSON
from dotenv import load_dotenv
import os

load_dotenv()

# Import functions from our utils modules
from utils.rule_based_recommendation import rule_based_recommend
from utils.preprocess import process_json_data
from utils.ml_based_recommendation import ml_based_recommend_mongo
from utils.db_utils import get_mongo_collection # Renamed to reflect MongoDB

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# --- Flask API Endpoint ---

@app.route('/')
def home():
    return 'App is running'

@app.route('/recommend', methods=['POST'])
def recommend_internships():
    try:
        candidate_profile = request.get_json()
        if not candidate_profile:
            return jsonify({"error": "Invalid JSON or empty request body"}), 400

        print(f"Received candidate profile: {candidate_profile}")

        # Get the InternshipListing collection
        internship_collection = get_mongo_collection('InternshipListing')
        
        # Fetch all internship documents
        internships_cursor = internship_collection.find({}, {
            "_id": { "$toString": "$_id" },   # convert ObjectId to string
            "Title": 1,
            "Description": 1,
            "Eligibility Year": 1,
            "Eligibility Degree": 1,
            "Sector": 1,
            "Stipend": 1,
            "Duration": 1,
            "End Date": 1,
            "Required Skills": 1,
            "Location": 1
        })
        internships_list = list(internships_cursor) # Convert cursor to list of dicts

        # preprocess internship data
        internships_processed = process_json_data(internships_list)

        # rule based recommendation
        recommendations = rule_based_recommend(candidate_profile, internships_processed, top_n=10)

        # Ml Based Recommendation
        recommended_internships = ml_based_recommend_mongo(candidate_profile, recommendations)

        return jsonify(recommended_internships)

    except ConnectionError as ce:
        return jsonify({"error": "Database connection error", "details": str(ce)}), 500
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask application with MongoDB...")
    app.run(port=os.environ.get("PORT",5000))
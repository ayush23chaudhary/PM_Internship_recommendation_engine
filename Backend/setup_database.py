# backend/setup_database.py
import json
from utils.db_utils import get_mongo_collection
from pymongo.errors import CollectionInvalid
import time

def setup_mongodb_collections():
    """
    Sets up MongoDB collections and populates them with sample data.
    """
    try:
        internship_collection = get_mongo_collection('InternshipListing')
        
        # Clear existing data for a fresh run
        print("Clearing existing internship data...")
        internship_collection.delete_many({})
        print("Existing data cleared.")

        with open('./Data/internship_dataset.json', 'r') as file:
            sample_internships = json.load(file)

        if sample_internships:
            internship_collection.insert_many(sample_internships)
            print(f"{len(sample_internships)} sample internships populated into 'InternshipListing' collection.")
        else:
            print("No sample internships to populate.")

        # You might also create an index for faster lookups on frequently queried fields
        # internship_collection.create_index([("location", 1)])
        # internship_collection.create_index([("sector", 1)])

    except Exception as e:
        print(f"An error occurred during MongoDB setup: {e}")

if __name__ == '__main__':
    print("Starting MongoDB setup...")
    setup_mongodb_collections()
    print("MongoDB setup complete.")
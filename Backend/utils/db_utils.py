# backend/utils/db_utils.py
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

MONGO_URI = os.environ.get("MONGO_CONNECTION_STRING", "mongodb://localhost:27017/")
MONGO_DB_NAME = os.environ.get("MONGO_DB_NAME", "internship_recommendation_db")

client = None # Global client to potentially reuse connection

def get_mongo_collection(collection_name):
    """
    Establishes and returns a MongoDB collection object.
    Uses a global client to reuse connection if possible.
    """
    global client
    if client is None:
        try:
            client = MongoClient(MONGO_URI)
            # The ping command is cheap and does not require auth.
            client.admin.command('ping')
            print(f"Successfully connected to MongoDB: {MONGO_URI.split('@')[-1].split('/')[0]}")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            client = None
            raise ConnectionError(f"Could not connect to MongoDB: {e}")

    db = client[MONGO_DB_NAME]
    return db[collection_name]
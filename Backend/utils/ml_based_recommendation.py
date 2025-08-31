from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def ml_based_recommend_mongo(user, internships, top_n=5):

    # Eligibility filter
    eligible = internships

    if not eligible:
        return []

    # Combine text for TF-IDF
    texts = [f"{row.get("combined_text")}" for row in eligible]
    user_text = " ".join([ele.lower() for index, ele in enumerate(user.get("Skills",""))]) + " " + user.get("Sector", "").lower() + " " + user.get("Location_preference", "").lower()

    tfidf = TfidfVectorizer(stop_words="english")
    matrix = tfidf.fit_transform(texts + [user_text])
    sims = cosine_similarity(matrix[-1], matrix[:-1]).flatten()

    for i, row in enumerate(eligible):
        
        keys_to_remove = [
            "Description_as_string",
            "Eligibility Degree_processed",
            "Required Skills_processed",
            "Location_processed",
            "Sector_processed",
            "combined_text"
        ]

        for key in list(row.keys()):
            if key in keys_to_remove:
                row.pop(key, None)

        row["Similarity"] = sims[i]

    eligible.sort(key=lambda x: x["Similarity"], reverse=True)
    return eligible[:top_n]

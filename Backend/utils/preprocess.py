import re
# import json
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import nltk
nltk.download('punkt_tab')
nltk.download('wordnet')

# Initialize the lemmatizer
lemmatizer = WordNetLemmatizer()


def preprocess_degree(degree_str):
    """
    Handles cases like:
    'Masters in Technology (M.Tech) / Bachelor of Technology (B.Tech)'
    Returns: ['masters in technology', 'mtech', 'bachelor of technology', 'btech']
    """
    degree_str = degree_str.lower().strip()

    # Split multiple degrees separated by "/" or ","
    parts = re.split(r"[/,]", degree_str)

    processed = []
    for part in parts:
        part = part.strip()

        # Extract short forms inside brackets
        match = re.findall(r"\((.*?)\)", part)
        short_forms = [re.sub(r"\.", "", m).strip() for m in match]

        # Remove bracket text to get full form
        full_form = re.sub(r"\(.*?\)", "", part).strip()
        full_form = re.sub(r"\.", "", full_form)

        # Add full form + short forms
        if full_form:
            processed.append(full_form)
        processed.extend(short_forms)

    return list(set(processed))  # remove duplicates


def preprocess_internship_data(internship_data):
    preprocessed_data = internship_data.copy()
        
    if "Description" in preprocessed_data and isinstance(preprocessed_data["Description"], str):
        description_lower = preprocessed_data["Description"].lower()
        description_no_punc = re.sub(r'[^\w\s]', '', description_lower)
        tokens = word_tokenize(description_no_punc)
        lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens]
        preprocessed_data["Description_as_string"] = ' '.join(lemmatized_tokens)

    if "Eligibility Degree" in preprocessed_data and isinstance(preprocessed_data["Eligibility Degree"], str):
        preprocessed_data["Eligibility Degree_processed"] = preprocess_degree(preprocessed_data["Eligibility Degree"])

    if "Sector" in preprocessed_data and isinstance(preprocessed_data["Sector"], str):
        sector_lower = preprocessed_data["Sector"].lower()
        root_word_sector = lemmatizer.lemmatize(sector_lower)
        preprocessed_data["Sector_processed"] = root_word_sector.strip()
        
    if "Required Skills" in preprocessed_data and isinstance(preprocessed_data["Required Skills"], list):
        preprocessed_data["Required Skills_processed"] = [
            skill.lower().strip() for skill in preprocessed_data["Required Skills"]
        ]
    
    if "Location" in preprocessed_data and isinstance(preprocessed_data["Location"], str):
        locations = [loc.strip().lower() for loc in preprocessed_data["Location"].split(',')]
        preprocessed_data["Location_processed"] = locations

    combined_text = [
        preprocessed_data.get("Title", ""), 
        preprocessed_data.get("Description_as_string", ""),
        preprocessed_data.get("Sector_processed", ""),
        ' '.join(preprocessed_data.get("Eligibility Degree_processed", [])) if isinstance(preprocessed_data.get("Eligibility Degree_processed"), list) else preprocessed_data.get("Eligibility Degree_processed", ""),
        ' '.join(preprocessed_data.get("Required Skills_processed", [])),
        ' '.join(preprocessed_data.get("Location_processed", [])),
    ]
    preprocessed_data["combined_text"] = ' '.join(filter(None, combined_text))

    return preprocessed_data

def process_json_data(internships):
    processed_internships = []
    try:
        if not isinstance(internships, list):
            print("Error: The JSON file does not contain a list of objects.")
            return []
        for internship in internships:
            processed_internship = preprocess_internship_data(internship)
            processed_internships.append(processed_internship)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        
    return processed_internships


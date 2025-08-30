from utils.preprocess import normalize_eligibility, preprocess_degree

def is_eligible(user_input: str, internship_eligibility: str) -> bool:
    user_norm = normalize_eligibility(user_input)
    intern_norm = normalize_eligibility(internship_eligibility)

    if not intern_norm:  
        return True  # internship didn’t specify → open to all

    if intern_norm == "1": return user_norm == "1"
    if intern_norm == "2": return user_norm == "2"
    if intern_norm == "3": return user_norm == "3"
    if intern_norm == "4": return user_norm == "4"
    if intern_norm == "UG": return user_norm in ["1", "2", "3", "4", "UG"]
    if intern_norm == "PG": return user_norm in ["PG"]

    return False



def rule_based_recommend(user, internships, top_n=5):
    user_skills = set([skill.lower().strip() for skill in user.get("Skills", [])])
    user_year = str(user.get("Year", "")).lower().strip()
    user_degree = preprocess_degree(user.get("Degree", "").lower().replace(".", "").strip())

    recs = []
    for row in internships:
        # Check degree (list of processed options)
        degree_reqs = row.get("Eligibility Degree_processed", [])
        if degree_reqs:
            if not any(any(ud in req for ud in user_degree) for req in degree_reqs):
                continue

        if "Eligibility Year" in row and row["Eligibility Year"]:
            if not is_eligible(user_year, row["Eligibility Year"]):
                continue

        # Check skills
        intern_skills = set(row.get("Required Skills_processed", []))
        match_skills = user_skills & intern_skills
        match_count = len(match_skills)
        if match_count == 0:
            continue

        row["Skills_matched"]= list(match_skills)
        row["Score"]= match_count

        recs.append(row)


    recs.sort(key=lambda x: x["Score"], reverse=True)
    return recs
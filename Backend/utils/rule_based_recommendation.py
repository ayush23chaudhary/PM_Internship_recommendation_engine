from utils.preprocess import normalize_eligibility

#change
def is_eligible(user_input: str, internship_eligibility: str) -> bool:
            # Normalize both sides
            user_norm = normalize_eligibility(user_input)
            intern_norm = normalize_eligibility(internship_eligibility)

            # Case 1: Internship allows all UG
            if intern_norm == "UG":
                return user_norm in ["1", "2", "3", "4", "UG"]

            # Case 2: Internship allows all PG
            if intern_norm == "PG":
                return user_norm in ["1", "2", "PG"]

            # Case 3: Internship specifies a year
            if intern_norm in ["1", "2", "3", "4"]:
                if user_norm == intern_norm:
                    return True
                if user_norm == "UG":
                    return True   # UG means any year in UG
                return False

            if intern_norm in ["1", "2"]:  # PG years
                if user_norm == intern_norm:
                    return True
                if user_norm == "PG":
                    return True   # PG means any PG year
                return False

            return False


def rule_based_recommend(user, internships, top_n=5):
    user_skills = set([skill.lower().strip() for skill in user.get("Skills", [])])
    user_year = str(user.get("Year", "")).lower().strip()
    user_degree = user.get("Degree", "").lower().replace(".", "").strip()

    recs = []
    for row in internships:
        # Check degree (list of processed options)
        degree_reqs = row.get("Eligibility Degree_processed", [])
        if degree_reqs:
            if not any(req in user_degree or user_degree in req for req in degree_reqs):
                continue

        #change
        if user_year and is_eligible(user_year, row["Eligibility Year"]) is False:
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
        # recs.append({
        #     "id": row.get("id"),
        #     "title": row.get("Title", ""),
        #     "skills_matched": list(match_skills),
        #     "score": match_count
        # })

    recs.sort(key=lambda x: x["Score"], reverse=True)
    return recs
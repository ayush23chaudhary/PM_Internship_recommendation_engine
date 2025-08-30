def rule_based_recommend(user, internships, top_n=5):
    user_skills = set([skill.lower().strip() for skill in user.get("Skills", [])])
    user_year = str(user.get("Year", "")).lower().strip()
    user_degree = user.get("Degree", "").lower().replace(".", "").strip()

    recs = []
    for row in internships:
        # Check degree
        degree_reqs = row.get("Eligibility Degree_processed", [])
        if degree_reqs:
            if not any(req in user_degree or user_degree in req for req in degree_reqs):
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
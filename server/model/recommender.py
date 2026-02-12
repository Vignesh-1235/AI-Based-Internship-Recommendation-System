
import sys, json, math
from typing import List, Dict

def load_internships(path="server/data/internships.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def normalize(s: str):
    return s.strip().lower()

def skill_score(user_skills: List[str], intern_skills: List[str]) -> float:
    if not intern_skills:
        return 0.0
    u = [normalize(x) for x in user_skills]
    i = [normalize(x) for x in intern_skills]
    matched = 0
    for us in u:
        for is_ in i:
          
            if us in is_ or is_ in us:
                matched += 1
                break
    return matched / max(1, len(i))

def education_score(user_edu: str, required_edu: List[str]) -> float:
    ue = normalize(user_edu)
    for req in required_edu:
        r = normalize(req)
   
        if r in ue or ue in r:
            return 1.0
   
    return 0.15

def interest_score(user_interests: List[str], intern_interest: str) -> float:
    ui = [normalize(x) for x in user_interests]
    ii = normalize(intern_interest)
    return 1.0 if ii in ui else 0.0

def match_internships(user_profile: Dict, internships: List[Dict]) -> List[Dict]:
    results = []
    loc_pref = user_profile.get("location", {})
    loc_type = loc_pref.get("type", "online")
    cities = [normalize(c) for c in loc_pref.get("cities", [])]

 
    filtered = []
    for intern in internships:
        intern_mode = intern.get("mode", "").strip().lower()
        intern_location = normalize(intern.get("location",""))
        if loc_type == "online":
            # online: include remote/online and those explicitly marked Remote
            if intern_mode in ("online","remote") or "remote" in intern_location:
                filtered.append(intern)
        else:
            # offline: prefer exact city matches; still include same-state/fallback only if no exact city hits later
            if any(city in intern_location for city in cities):
                filtered.append(intern)
    # if strict filtering returned empty (e.g., no exact city matches), fallback to relaxed filter
    if not filtered:
        # relaxed: include internships that are either remote (if online) or any onsite nearby (same state) / anything
        for intern in internships:
            intern_mode = intern.get("mode", "").strip().lower()
            intern_location = normalize(intern.get("location",""))
            if loc_type == "online" and (intern_mode in ("online","remote") or "remote" in intern_location):
                filtered.append(intern)
            elif loc_type == "offline":
                # fallback: accept on-site anywhere if no exact city matches
                if intern_mode not in ("online","remote"):
                    filtered.append(intern)
                    
    # Step 2: rank by scores
    for intern in filtered:
        s_score = skill_score(user_profile.get("skills",[]), intern.get("skills",[]))
        i_score = interest_score(user_profile.get("interests",[]), intern.get("interest",""))
        e_score = education_score(user_profile.get("education",""), intern.get("education",[]))
        # weight: location (already filtered), then skills higher, interest medium, education lower
        total = (s_score * 0.55) + (i_score * 0.30) + (e_score * 0.15)
        results.append({
            "internship": intern,
            "score": round(total * 100, 2),
            "breakdown": {"skill": round(s_score*100,2), "interest": round(i_score*100,2), "education": round(e_score*100,2)}
        })

    # sort desc and return top 5 (or fewer if not available)
    results_sorted = sorted(results, key=lambda x: x["score"], reverse=True)
    return results_sorted[:5]

def main():
    # read user profile from stdin (safe to pass because we control inputs)
    raw = sys.stdin.read()
    if not raw:
        print(json.dumps({"error":"no input"}))
        return
    user = json.loads(raw)
    internships = load_internships(path="server/data/internships.json")
    recs = match_internships(user, internships)
    # output only internship objects + score
    output = [{"internship": r["internship"], "score": r["score"], "breakdown": r["breakdown"]} for r in recs]
    print(json.dumps(output, ensure_ascii=False))

if __name__ == "__main__":
    main()
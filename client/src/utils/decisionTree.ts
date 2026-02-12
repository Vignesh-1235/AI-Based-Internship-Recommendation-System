export interface UserProfile {
  education: string;
  interests: string[];
  skills: string[];
  location: {
    type: "online" | "offline";
    cities: string[];
  };
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Remote" | "On-site" | "Hybrid";
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  skills: string[];
  applicationDeadline: string;
  startDate: string;
  applicants: number;
  requiredEducation: string[];
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface MatchResult {
  internship: Internship;
  matchPercentage: number;
  matchReasons: string[];
}

// Comprehensive internship dataset
export const INTERNSHIPS: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechCorp India",
    location: "Bengaluru",
    type: "On-site",
    duration: "3 months",
    stipend: "₹15,000/month",
    description: "Develop modern web applications using React and TypeScript. Work with UI/UX designers to create engaging user experiences.",
    requirements: [
      "Currently pursuing B.Tech/MCA in Computer Science",
      "Knowledge of JavaScript, React, HTML/CSS",
      "Understanding of responsive design",
      "Good problem-solving skills"
    ],
    skills: ["JavaScript", "React", "HTML/CSS", "UI/UX Design"],
    applicationDeadline: "2024-02-15",
    startDate: "2024-03-01",
    applicants: 156,
    requiredEducation: ["B.Tech - Computer Science", "BCA", "BSc - Computer Science", "MCA"],
    category: "web-dev",
    difficulty: "Beginner"
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "Analytics Pro",
    location: "Remote",
    type: "Remote",
    duration: "6 months",
    stipend: "₹18,000/month",
    description: "Work on machine learning projects, analyze large datasets, and build predictive models using Python and R.",
    requirements: [
      "Background in Statistics, Mathematics, or Computer Science",
      "Knowledge of Python and data analysis libraries",
      "Understanding of statistical concepts and machine learning",
      "Experience with SQL databases"
    ],
    skills: ["Python", "Machine Learning", "SQL", "Data Analysis", "Statistics"],
    applicationDeadline: "2024-02-20",
    startDate: "2024-03-15",
    applicants: 89,
    requiredEducation: ["B.Tech - Computer Science", "BSc - Computer Science", "MCA", "BSc - IT"],
    category: "data-science",
    difficulty: "Intermediate"
  },
  {
    id: "3",
    title: "Digital Marketing Intern",
    company: "Brand Builders",
    location: "Mumbai",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹12,000/month",
    description: "Create digital marketing campaigns, manage social media accounts, and analyze marketing metrics.",
    requirements: [
      "Graduate in Marketing, Communications, or related field",
      "Understanding of social media platforms",
      "Creative thinking and content creation skills",
      "Basic knowledge of digital marketing tools"
    ],
    skills: ["Digital Marketing", "Content Writing", "Social Media", "Analytics"],
    applicationDeadline: "2024-02-25",
    startDate: "2024-03-10",
    applicants: 234,
    requiredEducation: ["BBA", "MBA - Marketing", "Other"],
    category: "digital-marketing",
    difficulty: "Beginner"
  },
  {
    id: "4",
    title: "Mobile App Developer Intern",
    company: "AppTech Solutions",
    location: "Hyderabad",
    type: "On-site",
    duration: "4 months",
    stipend: "₹16,000/month",
    description: "Develop mobile applications for Android and iOS platforms using React Native and Flutter.",
    requirements: [
      "Computer Science or IT background",
      "Knowledge of mobile development frameworks",
      "Understanding of mobile UI/UX principles",
      "Problem-solving and debugging skills"
    ],
    skills: ["React Native", "Flutter", "JavaScript", "Mobile Development"],
    applicationDeadline: "2024-02-18",
    startDate: "2024-03-05",
    applicants: 127,
    requiredEducation: ["B.Tech - Computer Science", "BCA", "BSc - IT", "MCA"],
    category: "mobile-dev",
    difficulty: "Intermediate"
  },
  {
    id: "5",
    title: "AI/ML Research Intern",
    company: "AI Research Lab",
    location: "Pune",
    type: "On-site",
    duration: "6 months",
    stipend: "₹20,000/month",
    description: "Conduct research in artificial intelligence and machine learning, work on cutting-edge AI projects.",
    requirements: [
      "Strong background in Computer Science or Mathematics",
      "Experience with Python, TensorFlow, or PyTorch",
      "Understanding of machine learning algorithms",
      "Research aptitude and analytical thinking"
    ],
    skills: ["Python", "Machine Learning", "AI", "TensorFlow", "Research"],
    applicationDeadline: "2024-02-22",
    startDate: "2024-03-20",
    applicants: 67,
    requiredEducation: ["B.Tech - Computer Science", "MCA", "BSc - Computer Science"],
    category: "ai-ml",
    difficulty: "Advanced"
  },
  {
    id: "6",
    title: "Cybersecurity Intern",
    company: "SecureNet Systems",
    location: "Chennai",
    type: "On-site",
    duration: "3 months",
    stipend: "₹14,000/month",
    description: "Learn about network security, ethical hacking, and cybersecurity best practices.",
    requirements: [
      "Computer Science or IT background",
      "Interest in cybersecurity and ethical hacking",
      "Basic understanding of networking concepts",
      "Attention to detail and analytical mindset"
    ],
    skills: ["Cybersecurity", "Networking", "Ethical Hacking", "Security Analysis"],
    applicationDeadline: "2024-02-28",
    startDate: "2024-03-12",
    applicants: 98,
    requiredEducation: ["B.Tech - Computer Science", "BSc - Computer Science", "BCA", "BSc - IT"],
    category: "cybersecurity",
    difficulty: "Intermediate"
  },
  {
    id: "7",
    title: "Business Analysis Intern",
    company: "Consulting Corp",
    location: "Delhi NCR",
    type: "Hybrid",
    duration: "5 months",
    stipend: "₹13,000/month",
    description: "Analyze business processes, create documentation, and support digital transformation initiatives.",
    requirements: [
      "Business, Economics, or Engineering background",
      "Strong analytical and communication skills",
      "Understanding of business processes",
      "Proficiency in Excel and data analysis"
    ],
    skills: ["Business Analysis", "Excel", "Project Management", "Communication"],
    applicationDeadline: "2024-02-26",
    startDate: "2024-03-08",
    applicants: 167,
    requiredEducation: ["BBA", "MBA - Finance", "MBA - Operations", "B.Tech - Mechanical"],
    category: "business-analysis",
    difficulty: "Beginner"
  },
  {
    id: "8",
    title: "Content Writing Intern",
    company: "Media House",
    location: "Remote",
    type: "Remote",
    duration: "3 months",
    stipend: "₹8,000/month",
    description: "Create engaging content for blogs, social media, and marketing campaigns across various industries.",
    requirements: [
      "Any graduate with strong writing skills",
      "Creativity and ability to research topics",
      "Understanding of SEO and content marketing",
      "Good command over English language"
    ],
    skills: ["Content Writing", "SEO", "Creative Writing", "Communication"],
    applicationDeadline: "2024-02-24",
    startDate: "2024-03-06",
    applicants: 289,
    requiredEducation: ["Other", "BBA", "12th Grade"],
    category: "content-writing",
    difficulty: "Beginner"
  }
];

// Decision Tree Algorithm for Internship Matching
export class InternshipDecisionTree {
  private calculateSkillMatch(userSkills: string[], internshipSkills: string[]): number {
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    const internshipSkillsLower = internshipSkills.map(s => s.toLowerCase());
    
    const matchingSkills = userSkillsLower.filter(skill => 
      internshipSkillsLower.some(iSkill => 
        iSkill.includes(skill) || skill.includes(iSkill)
      )
    );
    
    if (internshipSkillsLower.length === 0) return 0;
    return (matchingSkills.length / internshipSkillsLower.length) * 100;
  }

  private calculateEducationMatch(userEducation: string, requiredEducation: string[]): number {
    const userEduLower = userEducation.toLowerCase();
    const matches = requiredEducation.some(reqEdu => {
      const reqEduLower = reqEdu.toLowerCase();
      return userEduLower.includes(reqEduLower) || 
             reqEduLower.includes(userEduLower) ||
             reqEdu === "Other";
    });
    
    return matches ? 100 : 0;
  }

  private calculateInterestMatch(userInterests: string[], internshipCategory: string): number {
    const categoryMap: { [key: string]: string[] } = {
      "web-dev": ["web-dev", "ui-ux", "mobile-dev"],
      "data-science": ["data-science", "ai-ml"],
      "digital-marketing": ["digital-marketing", "content-writing"],
      "mobile-dev": ["mobile-dev", "web-dev", "ui-ux"],
      "ai-ml": ["ai-ml", "data-science"],
      "cybersecurity": ["cybersecurity"],
      "business-analysis": ["business-analysis", "project-mgmt"],
      "content-writing": ["content-writing", "digital-marketing"]
    };

    const relatedInterests = categoryMap[internshipCategory] || [internshipCategory];
    const hasDirectMatch = userInterests.some(interest => relatedInterests.includes(interest));
    
    return hasDirectMatch ? 100 : 0;
  }

  private calculateLocationMatch(userLocation: UserProfile['location'], internshipLocation: string, internshipType: string): number {
    if (userLocation.type === "online") {
      return internshipType === "Remote" ? 100 : 50;
    } else {
      if (internshipType === "Remote") return 80;
      if (internshipType === "Hybrid") return 90;
      
      // Check if user's preferred cities match internship location
      const locationMatch = userLocation.cities.some(city => 
        internshipLocation.toLowerCase().includes(city.toLowerCase()) ||
        city.toLowerCase().includes(internshipLocation.toLowerCase())
      );
      
      return locationMatch ? 100 : 30;
    }
  }

  private getDifficultyScore(internship: Internship, userSkills: string[]): number {
    const skillCount = userSkills.length;
    const difficultyMultiplier = {
      "Beginner": skillCount >= 2 ? 100 : skillCount >= 1 ? 80 : 60,
      "Intermediate": skillCount >= 4 ? 100 : skillCount >= 3 ? 80 : skillCount >= 2 ? 60 : 40,
      "Advanced": skillCount >= 6 ? 100 : skillCount >= 5 ? 80 : skillCount >= 4 ? 60 : 30
    };
    
    return difficultyMultiplier[internship.difficulty];
  }

  public matchInternships(userProfile: UserProfile): MatchResult[] {
    const results: MatchResult[] = [];

    for (const internship of INTERNSHIPS) {
      const skillMatch = this.calculateSkillMatch(userProfile.skills, internship.skills);
      const educationMatch = this.calculateEducationMatch(userProfile.education, internship.requiredEducation);
      const interestMatch = this.calculateInterestMatch(userProfile.interests, internship.category);
      const locationMatch = this.calculateLocationMatch(userProfile.location, internship.location, internship.type);
      const difficultyScore = this.getDifficultyScore(internship, userProfile.skills);

      // Weighted scoring system
      const weights = {
        skills: 0.35,      // 35% - Most important
        education: 0.25,   // 25% - Education match
        interests: 0.20,   // 20% - Interest alignment
        location: 0.15,    // 15% - Location preference
        difficulty: 0.05   // 5% - Difficulty appropriateness
      };

      const matchPercentage = Math.round(
        skillMatch * weights.skills +
        educationMatch * weights.education +
        interestMatch * weights.interests +
        locationMatch * weights.location +
        difficultyScore * weights.difficulty
      );

      // Generate match reasons
      const matchReasons: string[] = [];
      if (skillMatch > 50) matchReasons.push(`${Math.round(skillMatch)}% skill match`);
      if (educationMatch === 100) matchReasons.push("Perfect education fit");
      if (interestMatch === 100) matchReasons.push("Matches your interests");
      if (locationMatch >= 80) matchReasons.push("Great location match");
      if (internship.type === "Remote" && userProfile.location.type === "online") {
        matchReasons.push("Remote work preference");
      }

      results.push({
        internship,
        matchPercentage,
        matchReasons: matchReasons.length > 0 ? matchReasons : ["Basic compatibility match"]
      });
    }

    // Sort by match percentage (descending) and return top matches
    return results
      .filter(result => result.matchPercentage > 20) // Only show reasonable matches
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 8); // Return top 8 matches
  }
}
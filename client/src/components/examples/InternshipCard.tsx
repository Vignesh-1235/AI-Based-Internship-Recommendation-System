import InternshipCard from '../InternshipCard'

const mockInternship = {
  id: "1",
  title: "Software Development Intern",
  company: "TechCorp India",
  location: "Bengaluru",
  type: "On-site" as const,
  duration: "3 months",
  stipend: "₹15,000/month",
  description: "Join our dynamic team to develop cutting-edge software solutions using modern technologies. You'll work alongside experienced developers and contribute to real projects.",
  requirements: [
    "Currently pursuing B.Tech/MCA in Computer Science",
    "Knowledge of JavaScript, React, or Python",
    "Good problem-solving skills",
    "Ability to work in a team environment"
  ],
  skills: ["JavaScript", "React", "Python", "Git"],
  applicationDeadline: "2024-02-15",
  startDate: "2024-03-01",
  applicants: 156
}

export default function InternshipCardExample() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <InternshipCard internship={mockInternship} />
    </div>
  )
}
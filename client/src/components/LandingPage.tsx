import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  MapPin, 
  Clock, 
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Play
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import AuthModal from "./AuthModal";
import ProfileSetup from "./ProfileSetup";
import InternshipCard, { type Internship } from "./InternshipCard";
import RecommendationsPage from "@/pages/RecommendationsPage";
import { type UserProfile } from "@/utils/decisionTree";
import heroBanner from "@assets/generated_images/Government_internship_hero_banner_5b5145ad.png";
import mascotImage from "@assets/generated_images/Friendly_guide_mascot_character_17c4df1b.png";

// Mock data for demonstration
const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Software Development Intern",
    company: "TechCorp India",
    location: "Bengaluru",
    type: "On-site",
    duration: "3 months",
    stipend: "₹15,000/month",
    description: "Join our dynamic team to develop cutting-edge software solutions using modern technologies.",
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
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "Analytics Pro",
    location: "Remote",
    type: "Remote",
    duration: "6 months",
    stipend: "₹12,000/month",
    description: "Work on real-world data science projects and gain hands-on experience with machine learning.",
    requirements: [
      "Background in Statistics, Mathematics, or Computer Science",
      "Knowledge of Python and data analysis libraries",
      "Understanding of statistical concepts",
      "Eagerness to learn new technologies"
    ],
    skills: ["Python", "Machine Learning", "SQL", "Data Analysis"],
    applicationDeadline: "2024-02-20",
    startDate: "2024-03-15",
    applicants: 89
  },
  {
    id: "3",
    title: "Digital Marketing Intern",
    company: "Brand Builders",
    location: "Mumbai",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹10,000/month",
    description: "Learn digital marketing strategies and execute campaigns for leading brands.",
    requirements: [
      "Graduate in Marketing, Communications, or related field",
      "Basic understanding of social media platforms",
      "Creative thinking and content creation skills",
      "Good communication skills"
    ],
    skills: ["Digital Marketing", "Content Writing", "Social Media", "Analytics"],
    applicationDeadline: "2024-02-25",
    startDate: "2024-03-10",
    applicants: 234
  }
];

const stats = [
  { icon: Users, label: "Active Interns", value: "50,000+" },
  { icon: Target, label: "Placement Rate", value: "85%" },
  { icon: Award, label: "Partner Companies", value: "2,500+" },
  { icon: TrendingUp, label: "Average Stipend", value: "₹12,000" }
];

const features = [
  {
    icon: Target,
    title: "AI-Powered Matching",
    description: "Our advanced algorithm matches you with the perfect internship based on your skills and interests."
  },
  {
    icon: BookOpen,
    title: "Skill Development",
    description: "Get access to learning resources and mentorship to enhance your professional skills."
  },
  {
    icon: Users,
    title: "Industry Network",
    description: "Connect with professionals and build valuable relationships in your chosen field."
  },
  {
    icon: Award,
    title: "Certification",
    description: "Receive official certificates upon successful completion of your internship program."
  }
];

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
    // Navigate to greeting page instead of showing ProfileSetup
    setLocation("/greeting");
  };

  const handleProfileComplete = (profileData: UserProfile) => {
    setShowProfileSetup(false);
    setUserProfile(profileData);
    setShowRecommendations(true);
    console.log("Profile completed:", profileData);
  };

  const handleBackToHome = () => {
    setShowRecommendations(false);
    setUserProfile(null);
  };

  // Show recommendations page if user has completed profile
  if (showRecommendations && userProfile) {
    return (
      <RecommendationsPage 
        userProfile={userProfile} 
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">PM</span>
            </div>
            <span className="font-bold text-xl">Internship Scheme</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#internships" className="text-muted-foreground hover:text-foreground transition-colors">
              Internships
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {!isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-primary to-accent text-white font-medium"
                  data-testid="button-login-header"
                >
                  Login
                </Button>
              </motion.div>
            ) : (
              <Button variant="outline" data-testid="button-profile">
                Profile
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="PM Internship Scheme Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  Government of India Initiative
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-display text-foreground leading-tight">
                  Find Your Perfect
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {" "}Internship
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  AI-powered recommendations designed for first-generation learners. 
                  Start your career journey with personalized internship matching.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent text-white font-medium h-12"
                  onClick={() => setShowAuthModal(true)}
                  data-testid="button-get-started"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-12" data-testid="button-watch-demo">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
                <img
                  src={mascotImage}
                  alt="Friendly Guide Mascot"
                  className="w-full max-w-md mx-auto"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full px-4 py-2 font-medium shadow-lg"
                >
                  AI Powered!
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of internship matching with our AI-powered platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to find your dream internship
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Tell us about your education, interests, and skills through our guided setup",
                icon: Users
              },
              {
                step: "02",
                title: "Get AI Recommendations",
                description: "Our smart algorithm analyzes your profile and matches you with suitable internships",
                icon: Target
              },
              {
                step: "03",
                title: "Apply & Start Learning",
                description: "Apply to recommended internships and begin your professional journey",
                icon: CheckCircle2
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Internships or Recommendations */}
      <section id="internships" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display">
              Featured Internships
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing internship opportunities from top companies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockInternships.map((internship, index) => (
              <InternshipCard 
                key={internship.id} 
                internship={internship} 
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-primary to-accent text-white font-medium"
              data-testid="button-get-personalized"
            >
              Get Personalized Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">PM</span>
                </div>
                <span className="font-bold text-xl">Internship Scheme</span>
              </div>
              <p className="text-muted-foreground">
                Empowering the next generation of professionals through AI-powered internship matching.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Government Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">MCA Official Site</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Digital India</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Skill India</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">MyGov</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 PM Internship Scheme. All rights reserved. | Government of India Initiative</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <ProfileSetup
        isOpen={showProfileSetup}
        onClose={() => setShowProfileSetup(false)}
        onComplete={handleProfileComplete}
      />
    </div>
  );
}
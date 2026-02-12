import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, GraduationCap, Heart, Code, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import SkillSelector from "./SkillSelector";

interface ProfileData {
  education: string;
  interests: string[];
  skills: string[];
  location: {
    type: "online" | "offline";
    cities: string[];
  };
}

interface ProfileSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profileData: ProfileData) => void;
}

const educationOptions = [
  "B.Tech - Computer Science",
  "B.Tech - Electronics",
  "B.Tech - Mechanical",
  "BSc - Computer Science",
  "MBA - Marketing",
  "MBA - Finance",
  "MBA - Operations",
  "Diploma - Computer Science",
  "BSc - IT",
  "BBA",
  "BCA",
  "MCA",
  "Other"
];

const interestOptions = [
  { id: "web-dev", name: "Web Development", icon: "", description: "Build websites and web applications" },
  { id: "data-science", name: "Data Science", icon: "", description: "Analyze data to find insights" },
  { id: "ai-ml", name: "AI & Machine Learning", icon: "", description: "Build intelligent systems" },
  { id: "cybersecurity", name: "Cybersecurity", icon: "", description: "Protect digital systems" },
  { id: "mobile-dev", name: "Mobile Development", icon: "", description: "Create mobile applications" },
  { id: "ui-ux", name: "UI/UX Design", icon: "", description: "Design user experiences" },
  { id: "digital-marketing", name: "Digital Marketing", icon: "", description: "Marketing in digital channels" },
  { id: "content-writing", name: "Content Writing", icon: "", description: "Create engaging content" },
  { id: "project-mgmt", name: "Project Management", icon: "", description: "Lead and manage projects" },
  { id: "business-analysis", name: "Business Analysis", icon: "", description: "Analyze business processes" },
  { id: "finance", name: "Finance", icon: "", description: "Financial planning and analysis" },
  { id: "hr", name: "Human Resources", icon: "", description: "People and talent management" }
];

const cities = [
  "Bengaluru", "Hyderabad", "Pune", "Chennai", "Mumbai", "Delhi NCR", 
  "Kolkata", "Ahmedabad", "Jaipur", "Kochi", "Indore", "Chandigarh"
];

export default function ProfileSetup({ isOpen, onClose, onComplete }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    education: "",
    interests: [],
    skills: [],
    location: { type: "online", cities: [] }
  });

  const totalSteps = 4;

  const updateProfileData = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    console.log("Profile setup completed:", profileData);
    onComplete(profileData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return profileData.education !== "";
      case 2: return profileData.interests.length > 0;
      case 3: return profileData.skills.length > 0;
      case 4: return profileData.location.type === "online" || profileData.location.cities.length > 0;
      default: return false;
    }
  };

  const toggleInterest = (interestId: string) => {
    const interests = profileData.interests.includes(interestId)
      ? profileData.interests.filter(id => id !== interestId)
      : [...profileData.interests, interestId];
    updateProfileData("interests", interests);
  };

  const toggleCity = (city: string) => {
    const cities = profileData.location.cities.includes(city)
      ? profileData.location.cities.filter(c => c !== city)
      : [...profileData.location.cities, city];
    updateProfileData("location", { ...profileData.location, cities });
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-testid="modal-profile-setup"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl mx-auto"
          >
            <Card className="bg-background/95 backdrop-blur-lg border border-border/50 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">
                    Complete Your Profile
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-secondary rounded-full h-2 mt-4">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Education */}
                  {currentStep === 1 && (
                    <motion.div
                      key="education"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Education Background</h3>
                        <p className="text-muted-foreground">
                          Help us understand your educational qualification
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Select your highest qualification</label>
                        <Select 
                          value={profileData.education} 
                          onValueChange={(value) => updateProfileData("education", value)}
                        >
                          <SelectTrigger className="h-12" data-testid="select-education">
                            <SelectValue placeholder="Choose your education level" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationOptions.map((option) => (
                              <SelectItem key={option} value={option} data-testid={`option-education-${option.toLowerCase().replace(/\s+/g, '-')}`}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Interests */}
                  {currentStep === 2 && (
                    <motion.div
                      key="interests"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Heart className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">What Interests You?</h3>
                        <p className="text-muted-foreground">
                          Select areas you're passionate about (choose multiple)
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                        {interestOptions.map((interest, index) => (
                          <motion.div
                            key={interest.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={`cursor-pointer transition-all duration-200 ${
                                profileData.interests.includes(interest.id)
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() => toggleInterest(interest.id)}
                              data-testid={`card-interest-${interest.id}`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl">{interest.icon}</span>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{interest.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {interest.description}
                                    </p>
                                  </div>
                                  {profileData.interests.includes(interest.id) && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="bg-primary rounded-full p-1"
                                    >
                                      <Check className="h-3 w-3 text-primary-foreground" />
                                    </motion.div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>

                      {profileData.interests.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-wrap gap-2 p-4 bg-accent/30 rounded-lg"
                        >
                          <span className="text-sm font-medium">Selected:</span>
                          {profileData.interests.map((interestId) => {
                            const interest = interestOptions.find(i => i.id === interestId);
                            return (
                              <Badge key={interestId} variant="secondary">
                                {interest?.name}
                              </Badge>
                            );
                          })}
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Skills */}
                  {currentStep === 3 && (
                    <motion.div
                      key="skills"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Code className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Your Skills</h3>
                        <p className="text-muted-foreground">
                          Add your technical and soft skills
                        </p>
                      </div>

                      <SkillSelector
                        selectedSkills={profileData.skills}
                        onSkillsChange={(skills) => updateProfileData("skills", skills)}
                        maxSkills={15}
                      />
                    </motion.div>
                  )}

                  {/* Step 4: Location Preferences */}
                  {currentStep === 4 && (
                    <motion.div
                      key="location"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <MapPin className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Work Preferences</h3>
                        <p className="text-muted-foreground">
                          Choose your preferred work mode
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Work Mode Selection */}
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={`cursor-pointer transition-all duration-200 ${
                                profileData.location.type === "online"
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() => updateProfileData("location", { type: "online", cities: [] })}
                              data-testid="card-work-online"
                            >
                              <CardContent className="p-4 text-center">
                                <h4 className="font-medium">Remote Work</h4>
                                <p className="text-sm text-muted-foreground">
                                  Work from anywhere
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={`cursor-pointer transition-all duration-200 ${
                                profileData.location.type === "offline"
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() => updateProfileData("location", { type: "offline", cities: [] })}
                              data-testid="card-work-offline"
                            >
                              <CardContent className="p-4 text-center">
                                <h4 className="font-medium">Office Work</h4>
                                <p className="text-sm text-muted-foreground">
                                  Work from office
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>

                        {/* City Selection for Offline */}
                        {profileData.location.type === "offline" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                          >
                            <h4 className="font-medium">Select preferred cities:</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                              {cities.map((city, index) => (
                                <motion.div
                                  key={city}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Card
                                    className={`cursor-pointer transition-all duration-200 ${
                                      profileData.location.cities.includes(city)
                                        ? "border-primary bg-primary/5"
                                        : "hover:border-primary/50"
                                    }`}
                                    onClick={() => toggleCity(city)}
                                    data-testid={`card-city-${city.toLowerCase().replace(/\s+/g, '-')}`}
                                  >
                                    <CardContent className="p-3 text-center">
                                      <h5 className="font-medium text-sm">{city}</h5>
                                      {profileData.location.cities.includes(city) && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="mt-1"
                                        >
                                          <Check className="h-4 w-4 text-primary mx-auto" />
                                        </motion.div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    data-testid="button-previous"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={onClose}
                      data-testid="button-skip"
                    >
                      Skip for now
                    </Button>
                    
                    {currentStep < totalSteps ? (
                      <Button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        data-testid="button-next"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleComplete}
                        disabled={!isStepValid()}
                        data-testid="button-complete"
                      >
                        Complete Profile
                        <Check className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
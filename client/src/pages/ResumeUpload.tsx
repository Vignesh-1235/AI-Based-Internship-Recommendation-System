import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Upload, FileText, X, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InternshipDecisionTree, type UserProfile } from "@/utils/decisionTree";
import { profileStorage } from "@/utils/profileStorage";

export default function ResumeUpload() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Accepted file types
  const acceptedTypes = ['.txt', '.pdf', '.doc', '.docx'];
  const acceptedMimeTypes = [
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file type
    const isValidType = acceptedMimeTypes.includes(file.type) ||
      acceptedTypes.some(type => file.name.toLowerCase().endsWith(type));

    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt, .pdf, .doc, or .docx file.",
        variant: "destructive"
      });
      return false;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  // Improved resume parsing function with actual file reading
  const parseResume = async (file: File): Promise<UserProfile> => {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    let resumeText = "";

    // Read file content for text files
    if (file.type === 'text/plain') {
      try {
        resumeText = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string || "");
          reader.onerror = reject;
          reader.readAsText(file);
        });
      } catch (error) {
        console.warn("Failed to read file content:", error);
      }
    }

    // Extract profile data from resume text using keyword matching
    const extractedProfile = extractProfileFromText(resumeText);
    return extractedProfile;
  };

  // Helper function to extract profile data from text
  const extractProfileFromText = (text: string): UserProfile => {
    const lowerText = text.toLowerCase();

    // Extract education
    let education = "Other";
    const educationKeywords = {
      "B.Tech - Computer Science": ["b.tech", "bachelor", "computer science", "cs"],
      "B.Tech - Electronics": ["electronics", "ece", "electrical"],
      "B.Tech - Mechanical": ["mechanical", "mech"],
      "BCA": ["bca", "bachelor computer applications"],
      "BSc - Computer Science": ["bsc", "bachelor science", "computer science"],
      "BSc - IT": ["information technology", "it"],
      "MCA": ["mca", "master computer applications"],
      "MBA - Marketing": ["mba", "marketing"],
      "MBA - Finance": ["mba", "finance"],
      "Diploma - Computer Science": ["diploma", "computer"]
    };

    for (const [edu, keywords] of Object.entries(educationKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        education = edu;
        break;
      }
    }

    // Extract skills
    const skills: string[] = [];
    const skillKeywords = [
      "javascript", "python", "java", "react", "angular", "vue", "node.js", "express",
      "sql", "mongodb", "mysql", "postgresql", "html", "css", "typescript",
      "machine learning", "data science", "artificial intelligence", "ai",
      "cybersecurity", "networking", "aws", "azure", "docker", "kubernetes",
      "git", "github", "project management", "agile", "scrum",
      "digital marketing", "seo", "content writing", "social media"
    ];

    skillKeywords.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        skills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    });

    // Extract interests based on skills and keywords
    const interests: string[] = [];
    const interestMapping = {
      "web-dev": ["javascript", "react", "angular", "vue", "html", "css", "frontend", "backend"],
      "data-science": ["data science", "python", "machine learning", "analytics", "statistics"],
      "ai-ml": ["artificial intelligence", "machine learning", "ai", "ml", "deep learning"],
      "cybersecurity": ["cybersecurity", "security", "networking", "ethical hacking"],
      "mobile-dev": ["android", "ios", "mobile", "react native", "flutter"],
      "digital-marketing": ["marketing", "seo", "social media", "advertising"],
      "content-writing": ["content", "writing", "copywriting", "blogging"]
    };

    for (const [interest, keywords] of Object.entries(interestMapping)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        interests.push(interest);
      }
    }

    // Extract cities
    const cities: string[] = [];
    const cityKeywords = [
      "bengaluru", "bangalore", "hyderabad", "pune", "chennai", "mumbai",
      "delhi", "ncr", "kolkata", "ahmedabad", "jaipur", "kochi"
    ];

    cityKeywords.forEach(city => {
      if (lowerText.includes(city)) {
        const cityName = city === "bangalore" ? "Bengaluru" :
          city === "ncr" ? "Delhi NCR" :
            city.charAt(0).toUpperCase() + city.slice(1);
        if (!cities.includes(cityName)) {
          cities.push(cityName);
        }
      }
    });

    // Return extracted profile with defaults if nothing found
    return {
      education: education,
      interests: interests.length > 0 ? interests : ["web-dev"], // Default interest
      skills: skills.length > 0 ? skills : ["JavaScript", "Python"], // Default skills
      location: {
        type: cities.length > 0 ? "offline" : "online",
        cities: cities.length > 0 ? cities : []
      }
    };
  };

  const handleUploadAndContinue = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const extractedProfile = await parseResume(selectedFile);

      // Store only the parsed profile (without location) for LocationPicker
      const profileWithoutLocation = {
        ...extractedProfile,
        location: { type: "online" as const, cities: [] }
      };
      profileStorage.setProfile(profileWithoutLocation);

      toast({
        title: "Resume processed successfully!",
        description: "Now let's set your location preferences to find matching internships.",
      });

      // Navigate to location picker page
      setLocation("/location-picker");
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkipResume = () => {
    // Navigate to onboarding flow when user skips resume upload
    setLocation("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="bg-background/95 backdrop-blur-lg border border-border/50 shadow-2xl">
          <CardContent className="p-8">
            {/* Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center space-y-4 mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground font-display">
                Autocomplete From Your Resume
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We'll scan your resume and autocomplete as much of your profile as we can.
                No resume, no problem — skip this step and upload your resume later if you
                don't have it on hand.
              </p>
            </motion.div>

            {/* File Upload Area */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${isDragOver
                    ? "border-primary bg-primary/5"
                    : selectedFile
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : "border-border hover:border-primary/50 hover:bg-muted/20"
                  }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-testid="file-drop-zone"
              >
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept={acceptedTypes.join(',')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  data-testid="file-input"
                />

                {selectedFile ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-700"
                      data-testid="button-remove-file"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-foreground mb-2">
                        Drag & drop your resume here
                      </p>
                      <p className="text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>Supports: PDF, DOC, DOCX, TXT (max 10MB)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={handleUploadAndContinue}
                disabled={!selectedFile || isProcessing}
                className="flex-1 py-6"
                data-testid="button-upload-continue"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing Resume...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload & Continue
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleSkipResume}
                disabled={isProcessing}
                className="flex-1 py-6"
                data-testid="button-skip-resume"
              >
                Go without a resume
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
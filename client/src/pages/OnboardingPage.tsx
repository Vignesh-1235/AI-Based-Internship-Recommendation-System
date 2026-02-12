import { useState } from "react";
import { useLocation } from "wouter";
import ProfileSetup from "@/components/ProfileSetup";
import { type UserProfile, InternshipDecisionTree } from "@/utils/decisionTree";
import { profileStorage } from "@/utils/profileStorage";
import { useToast } from "@/hooks/use-toast";

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleComplete = async (profileData: UserProfile) => {
    try {
      // Use the decision tree to get recommendations
      const decisionTree = new InternshipDecisionTree();
      const recommendations = decisionTree.matchInternships(profileData);

      // Store profile and recommendations for the recommendations page
      profileStorage.setProfile(profileData);
      profileStorage.setRecommendations(recommendations);

      toast({
        title: "Profile completed successfully!",
        description: `Found ${recommendations.length} matching internships for you.`,
      });

      // Navigate to recommendations page
      setLocation("/recommendations");
    } catch (error) {
      toast({
        title: "Error generating recommendations",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    // Navigate back to landing page if user cancels
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <ProfileSetup 
        isOpen={true}
        onClose={handleClose}
        onComplete={handleComplete}
      />
    </div>
  );
}
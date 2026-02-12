import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import RecommendationsPage from "@/pages/RecommendationsPage";
import { profileStorage } from "@/utils/profileStorage";
import { type UserProfile } from "@/utils/decisionTree";
import { useToast } from "@/hooks/use-toast";

export default function RecommendationsPageWrapper() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = profileStorage.getProfile();
    
    if (!storedProfile) {
      // No profile found, redirect to onboarding
      toast({
        title: "Profile not found",
        description: "Please complete your profile first.",
        variant: "destructive"
      });
      setLocation("/onboarding");
      return;
    }

    setUserProfile(storedProfile);
  }, [setLocation, toast]);

  const handleBack = () => {
    // Clear stored data and go back to landing page
    profileStorage.clear();
    setLocation("/");
  };

  if (!userProfile) {
    // Show loading while checking for profile
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <RecommendationsPage 
      userProfile={userProfile}
      onBack={handleBack}
    />
  );
}
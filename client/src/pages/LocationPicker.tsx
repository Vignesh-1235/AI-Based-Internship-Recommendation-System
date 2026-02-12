import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { MapPin, Check, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InternshipDecisionTree, type UserProfile } from "@/utils/decisionTree";
import { profileStorage } from "@/utils/profileStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faSynagogue } from "@fortawesome/free-solid-svg-icons";

const cities = [
  "Bengaluru", "Hyderabad", "Pune", "Chennai", "Mumbai", "Delhi NCR", 
  "Kolkata", "Ahmedabad", "Jaipur", "Kochi", "Indore", "Chandigarh"
];

export default function LocationPicker() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [locationData, setLocationData] = useState<{type: "online" | "offline", cities: string[]}>({
    type: "online",
    cities: []
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleCity = (city: string) => {
    const newCities = locationData.cities.includes(city)
      ? locationData.cities.filter(c => c !== city)
      : [...locationData.cities, city];
    setLocationData({ ...locationData, cities: newCities });
  };

  const isValid = () => {
    return locationData.type === "online" || locationData.cities.length > 0;
  };

  const handleContinue = async () => {
    if (!isValid()) {
      toast({
        title: "Location required",
        description: "Please select your preferred work location.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Get the parsed profile from storage (should have been set by ResumeUpload)
      const parsedProfile = profileStorage.getProfile();
      
      if (!parsedProfile) {
        toast({
          title: "Profile not found",
          description: "Please go back and upload your resume again.",
          variant: "destructive"
        });
        setLocation("/resume-upload");
        return;
      }

      // Combine parsed profile with selected location
      const completeProfile: UserProfile = {
        ...parsedProfile,
        location: locationData
      };

      // Generate recommendations using the complete profile
      const decisionTree = new InternshipDecisionTree();
      const recommendations = decisionTree.matchInternships(completeProfile);

      // Store the complete profile and recommendations
      profileStorage.setProfile(completeProfile);
      profileStorage.setRecommendations(recommendations);

      toast({
        title: "Location preferences saved!",
        description: `Found ${recommendations.length} internships matching your profile and location.`,
      });

      // Navigate to recommendations
      setLocation("/recommendations");
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    setLocation("/resume-upload");
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
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground font-display">
                Work Preferences
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose your preferred work mode to find the best matching internships
              </p>
            </motion.div>

            {/* Work Mode Selection */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-8"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      locationData.type === "online"
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setLocationData({ type: "online", cities: [] })}
                    data-testid="card-work-online"
                  >
                    <CardContent className="p-6 text-center">
                      <FontAwesomeIcon icon={faComputer} size="2x" />
                      <h4 className="font-semibold text-lg">Remote Work</h4>
                      <p className="text-sm text-muted-foreground mt-2">
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
                      locationData.type === "offline"
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setLocationData({ type: "offline", cities: [] })}
                    data-testid="card-work-offline"
                  >
                    <CardContent className="p-6 text-center">
                      <FontAwesomeIcon icon={faSynagogue} size="2x"/>
                      <h4 className="font-semibold text-lg">Office Work</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Work from office locations
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* City Selection for Offline */}
              {locationData.type === "offline" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-lg text-center">Select preferred cities:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
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
                            locationData.cities.includes(city)
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => toggleCity(city)}
                          data-testid={`card-city-${city.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <CardContent className="p-3 text-center">
                            <h5 className="font-medium text-sm">{city}</h5>
                            {locationData.cities.includes(city) && (
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
                variant="outline"
                onClick={handleBack}
                disabled={isProcessing}
                className="flex-1 py-6"
                data-testid="button-back"
              >
                Back
              </Button>

              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!isValid() || isProcessing}
                className="flex-1 py-6"
                data-testid="button-continue"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Finding Matches...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
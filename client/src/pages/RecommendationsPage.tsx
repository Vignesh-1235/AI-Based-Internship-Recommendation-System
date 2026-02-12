import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Target, TrendingUp, Award, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InternshipCard from "@/components/InternshipCard";
import { InternshipDecisionTree, type UserProfile, type MatchResult, type Internship, INTERNSHIPS } from "@/utils/decisionTree";
import { profileStorage } from "@/utils/profileStorage";

interface RecommendationsPageProps {
  userProfile: UserProfile;
  onBack: () => void;
}

export default function RecommendationsPage({ userProfile, onBack }: RecommendationsPageProps) {
  const [recommendations, setRecommendations] = useState<MatchResult[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<MatchResult[]>([]);
  const [sortBy, setSortBy] = useState<"match" | "stipend" | "applicants">("match");
  const [filterByType, setFilterByType] = useState<"all" | "Remote" | "On-site" | "Hybrid">("all");
  const [loading, setLoading] = useState(true);
  const [showAllInternships, setShowAllInternships] = useState(false);
  const [allInternships] = useState<Internship[]>(INTERNSHIPS);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Use stored recommendations from profileStorage or generate new ones
        let storedRecommendations = profileStorage.getRecommendations();
        
        if (!storedRecommendations) {
          // Generate recommendations using the decision tree
          const decisionTree = new InternshipDecisionTree();
          storedRecommendations = decisionTree.matchInternships(userProfile);
          profileStorage.setRecommendations(storedRecommendations);
        }
        
        setRecommendations(storedRecommendations);
        setFilteredRecommendations(storedRecommendations);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        // Fallback to empty recommendations on error
        setRecommendations([]);
        setFilteredRecommendations([]);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userProfile]);

  useEffect(() => {
    let filtered = [...recommendations];

    // Apply type filter
    if (filterByType !== "all") {
      filtered = filtered.filter(result => result.internship.type === filterByType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchPercentage - a.matchPercentage;
        case "stipend":
          const aStipend = parseInt(a.internship.stipend.replace(/[₹,/month]/g, ""));
          const bStipend = parseInt(b.internship.stipend.replace(/[₹,/month]/g, ""));
          return bStipend - aStipend;
        case "applicants":
          return a.internship.applicants - b.internship.applicants;
        default:
          return 0;
      }
    });

    setFilteredRecommendations(filtered);
  }, [recommendations, sortBy, filterByType]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getMatchBadgeColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-700 border-green-300";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-orange-100 text-orange-700 border-orange-300";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Target className="h-8 w-8 text-primary" />
            </motion.div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display">Analyzing Your Profile</h2>
            <p className="text-muted-foreground">
              Our AI is finding the perfect internship matches for you...
            </p>
          </div>
          <div className="w-64 mx-auto space-y-2">
            <Progress value={85} className="h-2" />
            <p className="text-sm text-muted-foreground">Processing your preferences</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back-to-home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Your Personalized Recommendations</h1>
            <p className="text-sm text-muted-foreground">
              {filteredRecommendations.length} matches found
            </p>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Education</h3>
                  <p className="text-sm font-medium">{userProfile.education}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Skills</h3>
                  <p className="text-sm">{userProfile.skills.slice(0, 3).join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Interests</h3>
                  <p className="text-sm">{userProfile.interests.length} selected</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Location</h3>
                  <p className="text-sm capitalize">
                    {userProfile.location.type === "online" ? "Remote preferred" : 
                     `${userProfile.location.cities.slice(0, 2).join(", ")}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Match</p>
                <p className="text-lg font-semibold">
                  {recommendations.length > 0 ? `${recommendations[0].matchPercentage}%` : "0%"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Matches</p>
                <p className="text-lg font-semibold">
                  {recommendations.filter(r => r.matchPercentage >= 70).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Match</p>
                <p className="text-lg font-semibold">
                  {recommendations.length > 0 
                    ? `${Math.round(recommendations.reduce((acc, r) => acc + r.matchPercentage, 0) / recommendations.length)}%`
                    : "0%"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <Select value={filterByType} onValueChange={(value: any) => setFilterByType(value)}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-type">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="On-site">On-site</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-sort">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="stipend">Highest Stipend</SelectItem>
              <SelectItem value="applicants">Least Competition</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Recommendations */}
        {filteredRecommendations.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or updating your profile preferences.
            </p>
            <Button variant="outline" onClick={onBack}>
              Update Profile
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredRecommendations.map((result, index) => (
              <motion.div
                key={result.internship.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                {/* Match Badge */}
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge 
                    className={`${getMatchBadgeColor(result.matchPercentage)} font-bold text-xs px-3 py-1`}
                    data-testid={`match-percentage-${result.internship.id}`}
                  >
                    {result.matchPercentage}% Match
                  </Badge>
                </div>

                <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">
                              {result.internship.company.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">
                              {result.internship.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {result.internship.company}
                            </p>
                          </div>
                        </div>

                        {/* Match Score Visualization */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Match Score</span>
                            <span className={`text-sm font-bold ${getMatchColor(result.matchPercentage)}`}>
                              {result.matchPercentage}%
                            </span>
                          </div>
                          <Progress 
                            value={result.matchPercentage} 
                            className="h-2"
                          />
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.matchReasons.map((reason, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <InternshipCard 
                      internship={result.internship} 
                      index={0}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-muted-foreground">
            Not finding what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={onBack} data-testid="button-update-profile">
              Update Profile Preferences
            </Button>
            <Button 
              variant={showAllInternships ? "outline" : "default"}
              onClick={() => setShowAllInternships(!showAllInternships)}
              data-testid="button-browse-all"
            >
              {showAllInternships ? "Hide All Internships" : "Browse All Internships"}
            </Button>
          </div>
        </motion.div>

        {/* All Internships Section */}
        {showAllInternships && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                All Available Internships
              </h2>
              <p className="text-muted-foreground">
                Browse through all {allInternships.length} internship opportunities
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allInternships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <InternshipCard 
                        internship={internship} 
                        index={index}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
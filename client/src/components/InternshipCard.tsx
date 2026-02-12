import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, ExternalLink, Heart, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  logo?: string;
}

interface InternshipCardProps {
  internship: Internship;
  index?: number;
}

export default function InternshipCard({ internship, index = 0 }: InternshipCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleApply = () => {
    console.log("Applying to internship:", internship.title);
    // TODO: Implement application logic
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log(isBookmarked ? "Removed bookmark" : "Bookmarked", internship.title);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log(isLiked ? "Unliked" : "Liked", internship.title);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      data-testid={`internship-card-${internship.id}`}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {internship.logo && (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {internship.company.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {internship.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {internship.company}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{internship.applicants} applied</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
                data-testid={`button-bookmark-${internship.id}`}
              >
                <Bookmark className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors ${
                  isLiked 
                    ? "bg-red-500 text-white" 
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
                data-testid={`button-like-${internship.id}`}
              >
                <Heart className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {internship.type}
            </Badge>
            <Badge variant="secondary" className="text-xs font-semibold">
              {internship.stipend}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {internship.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {internship.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {internship.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{internship.skills.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground">
              Apply by {new Date(internship.applicationDeadline).toLocaleDateString()}
            </p>
            
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    data-testid={`button-view-details-${internship.id}`}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl">{internship.title}</DialogTitle>
                    <p className="text-muted-foreground">{internship.company}</p>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Location:</span> {internship.location}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {internship.type}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {internship.duration}
                      </div>
                      <div>
                        <span className="font-medium">Stipend:</span> {internship.stipend}
                      </div>
                      <div>
                        <span className="font-medium">Start Date:</span> {internship.startDate}
                      </div>
                      <div>
                        <span className="font-medium">Applicants:</span> {internship.applicants}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{internship.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {internship.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {internship.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleApply} className="flex-1" data-testid={`button-apply-${internship.id}`}>
                        Apply Now
                      </Button>
                      <Button variant="outline" onClick={handleBookmark}>
                        {isBookmarked ? "Bookmarked" : "Save for Later"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                size="sm" 
                onClick={handleApply}
                data-testid={`button-apply-quick-${internship.id}`}
              >
                Apply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
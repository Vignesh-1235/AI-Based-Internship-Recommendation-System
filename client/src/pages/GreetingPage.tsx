import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target } from "lucide-react";
import { useLocation } from "wouter";

export default function GreetingPage() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
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
            {/* Header Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Target className="h-10 w-10 text-primary" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-6"
            >
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground font-display">
                  Welcome to Your Career Journey
                </h1>
                
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Tell us who you are and what you're looking for and we'll bring great fit 
                    opportunities right to you.
                  </p>
                  
                  <p>
                    We'll only match you with active, great fit jobs, giving you a 20x better 
                    chance of landing an interview than a typical applicant. Let's get started!
                  </p>
                </div>
              </div>

              {/* Call to Action Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="px-6 py-2 text-lg font-semibold"
                  data-testid="button-lets-go"
                >
                  Let's Go!
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
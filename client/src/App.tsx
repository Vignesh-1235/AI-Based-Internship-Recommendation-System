import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/components/LandingPage";
import GreetingPage from "@/pages/GreetingPage";
import ResumeUpload from "@/pages/ResumeUpload";
import LocationPicker from "@/pages/LocationPicker";
import OnboardingPage from "@/pages/OnboardingPage";
import RecommendationsPageWrapper from "@/pages/RecommendationsPageWrapper";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/greeting" component={GreetingPage} />
      <Route path="/resume-upload" component={ResumeUpload} />
      <Route path="/location-picker" component={LocationPicker} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/recommendations" component={RecommendationsPageWrapper} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

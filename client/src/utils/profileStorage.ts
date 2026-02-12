import { type UserProfile, type MatchResult } from "./decisionTree";

const PROFILE_KEY = "user_profile";
const RECOMMENDATIONS_KEY = "user_recommendations";

export const profileStorage = {
  // Store user profile
  setProfile: (profile: UserProfile): void => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to store profile:", error);
    }
  },

  // Get user profile
  getProfile: (): UserProfile | null => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to retrieve profile:", error);
      return null;
    }
  },

  // Store recommendations
  setRecommendations: (recommendations: MatchResult[]): void => {
    try {
      localStorage.setItem(RECOMMENDATIONS_KEY, JSON.stringify(recommendations));
    } catch (error) {
      console.error("Failed to store recommendations:", error);
    }
  },

  // Get recommendations
  getRecommendations: (): MatchResult[] | null => {
    try {
      const stored = localStorage.getItem(RECOMMENDATIONS_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to retrieve recommendations:", error);
      return null;
    }
  },

  // Clear stored data
  clear: (): void => {
    try {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(RECOMMENDATIONS_KEY);
    } catch (error) {
      console.error("Failed to clear profile storage:", error);
    }
  }
};
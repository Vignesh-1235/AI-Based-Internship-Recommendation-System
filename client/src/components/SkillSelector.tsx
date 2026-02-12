import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const predefinedSkills = [
  "Python", "JavaScript", "React", "Node.js", "Data Science", "Machine Learning",
  "Communication", "Leadership", "Problem Solving", "SQL", "Git", "HTML/CSS",
  "Java", "C++", "Project Management", "UI/UX Design", "Digital Marketing",
  "Content Writing", "Graphic Design", "Data Analysis", "Excel", "PowerPoint",
  "Team Work", "Time Management", "Critical Thinking", "Creativity"
];

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  maxSkills?: number;
}

export default function SkillSelector({ 
  selectedSkills, 
  onSkillsChange, 
  maxSkills = 10 
}: SkillSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSkills = predefinedSkills.filter(
    skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.includes(skill)
  );

  const addSkill = (skill: string) => {
    if (selectedSkills.length < maxSkills && !selectedSkills.includes(skill)) {
      onSkillsChange([...selectedSkills, skill]);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const addCustomSkill = () => {
    if (searchTerm.trim() && !selectedSkills.includes(searchTerm.trim()) && selectedSkills.length < maxSkills) {
      addSkill(searchTerm.trim());
    }
  };

  return (
    <div className="space-y-4" data-testid="skill-selector">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or add skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 pr-12"
            data-testid="input-skill-search"
          />
          {searchTerm && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={addCustomSkill}
              data-testid="button-add-custom-skill"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && (searchTerm || filteredSkills.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-popover border border-popover-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto"
            >
              {filteredSkills.slice(0, 8).map((skill, index) => (
                <motion.button
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => addSkill(skill)}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors"
                  data-testid={`suggestion-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {skill}
                </motion.button>
              ))}
              {searchTerm && !predefinedSkills.some(skill => 
                skill.toLowerCase() === searchTerm.toLowerCase()
              ) && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={addCustomSkill}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors border-t border-border"
                  data-testid="button-add-new-skill"
                >
                  <Plus className="inline h-3 w-3 mr-2" />
                  Add "{searchTerm}"
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Selected Skills ({selectedSkills.length}/{maxSkills})
            </h4>
            {selectedSkills.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSkillsChange([])}
                className="text-xs text-muted-foreground hover:text-foreground"
                data-testid="button-clear-skills"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {selectedSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    delay: index * 0.05 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`skill-chip-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <Badge 
                    variant="secondary" 
                    className="px-3 py-1 text-sm font-medium hover:bg-secondary/80 cursor-pointer"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-destructive transition-colors"
                      data-testid={`button-remove-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Quick Add Suggestions */}
      {selectedSkills.length < maxSkills && !searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-medium text-foreground">Popular Skills</h4>
          <div className="flex flex-wrap gap-2">
            {predefinedSkills
              .filter(skill => !selectedSkills.includes(skill))
              .slice(0, 8)
              .map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSkill(skill)}
                    className="text-xs hover:bg-accent"
                    data-testid={`quick-add-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill}
                  </Button>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}
import { useState } from 'react'
import SkillSelector from '../SkillSelector'

export default function SkillSelectorExample() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Skill Selector Demo</h3>
      <SkillSelector
        selectedSkills={selectedSkills}
        onSkillsChange={setSelectedSkills}
        maxSkills={10}
      />
    </div>
  )
}
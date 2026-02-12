import { useState } from 'react'
import ProfileSetup from '../ProfileSetup'
import { Button } from '@/components/ui/button'

export default function ProfileSetupExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Profile Setup
      </Button>
      <ProfileSetup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onComplete={(profileData) => {
          setIsOpen(false)
          console.log('Profile setup completed:', profileData)
        }}
      />
    </div>
  )
}
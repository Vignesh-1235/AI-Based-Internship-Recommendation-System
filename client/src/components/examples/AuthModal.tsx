import { useState } from 'react'
import AuthModal from '../AuthModal'
import { Button } from '@/components/ui/button'

export default function AuthModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Auth Modal
      </Button>
      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAuthSuccess={() => {
          setIsOpen(false)
          console.log('Authentication successful!')
        }}
      />
    </div>
  )
}
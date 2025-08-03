'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { RefreshCw } from 'lucide-react'

const PWAUpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setShowUpdatePrompt(true)
      })
    }
  }, [])

  const handleUpdate = () => {
    window.location.reload()
  }

  const handleDismiss = () => {
    setShowUpdatePrompt(false)
  }

  if (!showUpdatePrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <RefreshCw className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            Mise à jour disponible
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Une nouvelle version de l'application est disponible
          </p>
        </div>
      </div>
      <div className="flex space-x-2 mt-3">
        <Button
          onClick={handleUpdate}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          Mettre à jour
        </Button>
        <Button
          onClick={handleDismiss}
          variant="outline"
          className="flex-1 text-sm"
        >
          Plus tard
        </Button>
      </div>
    </div>
  )
}

export default PWAUpdatePrompt 
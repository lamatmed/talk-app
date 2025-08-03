'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      toast('Application installée avec succès !', {
        duration: 3000,
        className: '!bg-green-300 !rounded-3xl !py-8 !px-5 !justify-center'
      })
    } else {
      toast('Installation annulée', {
        duration: 3000,
        className: '!bg-yellow-300 !rounded-3xl !py-8 !px-5 !justify-center'
      })
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <img src="/assets/logo.svg" alt="Logo" className="w-8 h-8" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            Installer Let's Talk
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Ajoutez cette application à votre écran d'accueil pour un accès rapide
          </p>
        </div>
      </div>
      <div className="flex space-x-2 mt-3">
        <Button
          onClick={handleInstallClick}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          Installer
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

export default PWAInstallPrompt 
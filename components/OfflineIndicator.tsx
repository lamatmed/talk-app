'use client'

import { useEffect, useState } from 'react'
import { Wifi, WifiOff } from 'lucide-react'

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Vérifier l'état initial
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white px-4 py-2 text-center z-50">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff size={16} />
        <span className="text-sm font-medium">
          Vous êtes hors ligne. Certaines fonctionnalités peuvent ne pas être disponibles.
        </span>
      </div>
    </div>
  )
}

export default OfflineIndicator 
'use client'

import { WifiOff } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <WifiOff className="mx-auto h-16 w-16 text-gray-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Vous êtes hors ligne
        </h1>
        
        <p className="text-gray-600 mb-8">
          Il semble que vous n'ayez pas de connexion internet. 
          Vérifiez votre connexion et réessayez.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Réessayer
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Fonctionnalités disponibles hors ligne :</p>
          <ul className="mt-2 space-y-1">
            <li>• Consultation des réunions programmées</li>
            <li>• Accès aux enregistrements précédents</li>
            <li>• Configuration de l'application</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 
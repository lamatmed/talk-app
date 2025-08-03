import "react-datepicker/dist/react-datepicker.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import { Toaster } from "@/components/ui/sonner"
import PWAInstallPrompt from "@/components/PWAInstallPrompt"
import PWAUpdatePrompt from "@/components/PWAUpdatePrompt"
import OfflineIndicator from "@/components/OfflineIndicator"

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Let's Talk - Application de Réunion",
  description: "Application de réunion en temps réel pour connecter, communiquer et collaborer",
  keywords: ["réunion", "vidéoconférence", "collaboration", "communication", "travail à distance"],
  authors: [{ name: "Let's Talk Team" }],
  creator: "Let's Talk",
  publisher: "Let's Talk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Let's Talk - Application de Réunion",
    description: "Application de réunion en temps réel pour connecter, communiquer et collaborer",
    url: '/',
    siteName: "Let's Talk",
    images: [
      {
        url: '/assets/logo-512.png',
        width: 512,
        height: 512,
        alt: 'Let\'s Talk Logo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Let's Talk - Application de Réunion",
    description: "Application de réunion en temps réel pour connecter, communiquer et collaborer",
    images: ['/assets/logo-512.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/assets/logo.svg', type: 'image/svg+xml' },
      { url: '/assets/logo-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/logo-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/logo-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Let's Talk",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="application-name" content="Let's Talk" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Let's Talk" />
          <meta name="description" content="Application de réunion en temps réel pour connecter, communiquer et collaborer" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#3b82f6" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#3b82f6" />

          <link rel="apple-touch-icon" href="/assets/logo-192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/logo-192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/logo-192.png" />
          <link rel="mask-icon" href="/assets/logo.svg" color="#3b82f6" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <OfflineIndicator />
          {children}
          <Toaster />
          <PWAInstallPrompt />
          <PWAUpdatePrompt />
        </body>
    </html>
    </ClerkProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../lib/auth'
import { Navbar } from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EducNest - Plateforme Éducative Numérique Panafricaine',
  description: 'La boussole qui guide l\'étudiant dès ses premiers pas académiques. Accédez à des milliers de mémoires, thèses, cours et ressources académiques de l\'UNA et de toute l\'Afrique.',
  keywords: 'éducation, université, recherche, mémoires, thèses, UNA, Bénin, Afrique, plateforme éducative',
  authors: [{ name: 'EducNest Team' }],
  creator: 'Germain NOUMONVI Chancyr',
  publisher: 'EducNest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'EducNest - Plateforme Éducative Numérique',
    description: 'Centralisez toutes les ressources académiques de l\'UNA en un seul endroit.',
    url: 'https://educnest.bj',
    siteName: 'EducNest',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EducNest Platform',
      },
    ],
    locale: 'fr_BJ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EducNest - Plateforme Éducative Numérique',
    description: 'La boussole qui guide l\'étudiant dès ses premiers pas académiques.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-white font-sans selection:bg-[#14532D] selection:text-white`}>
        <AuthProvider>
          <div className="min-h-screen">
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

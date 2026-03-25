/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Metadata } from 'next'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import Footer from '../components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'EducNest - Plateforme Éducative Numérique Panafricaine',
  description: 'La boussole qui guide l\'étudiant dès ses premiers pas académiques. Accédez à des milliers de mémoires, thèses, cours et ressources académiques de l\'UNA et de toute l\'Afrique.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      
      {/* Section d'appel à l'action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer votre voyage académique ?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants et d'enseignants qui utilisent déjà EducNest 
            pour accéder aux meilleures ressources académiques du Bénin et d'Afrique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3">
                S'inscrire gratuitement
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

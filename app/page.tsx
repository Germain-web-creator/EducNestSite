/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Metadata } from 'next'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import Footer from '../components/Footer'

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
      <Footer />
    </div>
  )
}

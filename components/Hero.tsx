/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, PlayCircle, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#14532D]/10 text-[#14532D] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Award size={16} />
            <span>Le berceau du savoir numérique Africain</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-[#1F2937] leading-[1.1] mb-6 text-balance">
            La boussole <span className="text-[#14532D]">universitaire</span>, le socle du savoir.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Accédez à des milliers de mémoires, thèses, cours et ressources académiques de l'UNA et de toute l'Afrique.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/bibliotheque"
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4 rounded-2xl shadow-xl"
            >
              Explorer la bibliothèque
              <ArrowRight size={20} />
            </Link>
            <Link href="/a-propos" className="btn-secondary text-lg px-8 py-4 rounded-2xl">
              En savoir plus
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-[#1F2937]">5000+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Documents</div>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <div className="text-3xl font-bold text-[#1F2937]">12+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Écoles</div>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <div className="text-3xl font-bold text-[#1F2937]">2000+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Étudiants</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://picsum.photos/seed/educnest-hero/800/1000" 
              alt="Student studying" 
              className="w-full h-auto object-cover"
              width={800}
              height={1000}
              priority
            />
          </div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#B45309]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#14532D]/20 rounded-full blur-3xl -z-10"></div>
          
          {/* Floating Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 max-w-[200px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Award size={20} />
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase">Vérifié</div>
            </div>
            <p className="text-sm font-bold text-[#1F2937]">Mémoire validé par le rectorat</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

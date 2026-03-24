/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
  const stats = [
    { number: '5000+', label: 'Documents', suffix: '' },
    { number: '12+', label: 'Écoles', suffix: '' },
    { number: '2000+', label: 'Étudiants', suffix: '' },
    { number: '98%', label: 'Satisfaction', suffix: '' },
    { number: '24/7', label: 'Disponibilité', suffix: '' },
    { number: '50+', label: 'Partenaires', suffix: '' }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1F2937] mb-4">EducNest en Chiffres</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une plateforme qui grandit chaque jour et sert la communauté éducative africaine.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#14532D] mb-2">
                {stat.number}
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-[#14532D]/10 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[#14532D] font-semibold">Plateforme active et en croissance</span>
          </div>
        </div>
      </div>
    </section>
  )
}

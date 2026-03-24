/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, PlayCircle, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      id: 'bibliotheque',
      title: 'Bibliothèque',
      description: 'Accès illimité aux mémoires, thèses et cours validés par les enseignants.',
      icon: BookOpen,
      href: '/bibliotheque',
      color: 'text-[#14532D]',
      bgColor: 'bg-green-100'
    },
    {
      id: 'masterclass',
      title: 'Masterclass',
      description: 'Apprenez des techniques forestières et agricoles via des vidéos immersives.',
      icon: PlayCircle,
      href: '/masterclass',
      color: 'text-[#B45309]',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      description: 'Monétisez vos travaux de recherche et achetez des ressources premium.',
      icon: TrendingUp,
      href: '/marketplace',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link 
              key={feature.id}
              href={feature.href}
              className="card card-hover cursor-pointer group"
            >
              <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1F2937] mb-4">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

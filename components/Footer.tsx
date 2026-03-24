/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-4">
      <div className="container-max grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#14532D] rounded-xl flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="text-2xl font-bold text-[#1F2937]">EducNest</span>
          </div>
          <p className="text-gray-500 max-w-sm leading-relaxed">
            Plateforme Éducative Numérique Panafricaine. La boussole qui guide l'étudiant dès ses premiers pas.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/contact" className="text-[#14532D] hover:underline">
              Contact
            </Link>
            <Link href="/support" className="text-[#14532D] hover:underline">
              Support
            </Link>
            <Link href="/partenaires" className="text-[#14532D] hover:underline">
              Partenaires
            </Link>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-[#1F2937] mb-6 uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li>
              <Link href="/bibliotheque" className="hover:text-[#14532D] transition-colors">
                Bibliothèque
              </Link>
            </li>
            <li>
              <Link href="/portail" className="hover:text-[#14532D] transition-colors">
                Portail Institutionnel
              </Link>
            </li>
            <li>
              <Link href="/masterclass" className="hover:text-[#14532D] transition-colors">
                Masterclass
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="hover:text-[#14532D] transition-colors">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-[#14532D] transition-colors">
                À propos
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-[#1F2937] mb-6 uppercase tracking-wider text-sm">Légal</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li>
              <Link href="/conditions" className="hover:text-[#14532D] transition-colors">
                Conditions d'utilisation
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-[#14532D] transition-colors">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/mentions" className="hover:text-[#14532D] transition-colors">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-[#14532D] transition-colors">
                Politique cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container-max pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs">
          © {currentYear} EducNest. Tous droits réservés.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Germain NOUMONVI Chancyr
          </span>
          <div className="flex gap-4">
            <Link href="https://facebook.com/educnest" className="text-gray-400 hover:text-[#14532D]">
              Facebook
            </Link>
            <Link href="https://twitter.com/educnest" className="text-gray-400 hover:text-[#14532D]">
              Twitter
            </Link>
            <Link href="https://linkedin.com/company/educnest" className="text-gray-400 hover:text-[#14532D]">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

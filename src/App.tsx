/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  School as SchoolIcon, 
  PlayCircle, 
  User as UserIcon, 
  Download, 
  Heart, 
  Menu, 
  X,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SITES, SCHOOLS, MOCK_DOCUMENTS, MOCK_MASTERCLASSES } from './constants';
import { Document, Masterclass, School } from './types';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, onLogin }: { activeTab: string, setActiveTab: (tab: string) => void, onLogin: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: BookOpen },
    { id: 'library', label: 'Bibliothèque', icon: Search },
    { id: 'portal', label: 'Portail', icon: SchoolIcon },
    { id: 'masterclass', label: 'Masterclass', icon: PlayCircle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-[#14532D] rounded-xl flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="text-2xl font-bold text-[#1F2937] tracking-tight">EducNest</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === item.id ? 'text-[#14532D]' : 'text-gray-500 hover:text-[#14532D]'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            <button 
              onClick={onLogin}
              className="bg-[#14532D] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-md"
            >
              Se connecter
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-2"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left ${
                  activeTab === item.id ? 'bg-[#14532D]/10 text-[#14532D]' : 'text-gray-600'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
            <button className="w-full bg-[#14532D] text-white p-3 rounded-xl font-semibold mt-4">
              Se connecter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="pt-32 pb-20 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 bg-[#14532D]/10 text-[#14532D] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <Award size={16} />
          <span>Le berceau du savoir numérique Africain</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold text-[#1F2937] leading-[1.1] mb-6">
          La boussole <span className="text-[#14532D]">universitaire</span>, le socle du savoir.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
          Accédez à des milliers de mémoires, thèses, cours et ressources académiques de l'UNA et de toute l'Afrique.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onExplore}
            className="bg-[#14532D] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
          >
            Explorer la bibliothèque
            <ArrowRight size={20} />
          </button>
          <button className="bg-white border-2 border-gray-100 text-[#1F2937] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors">
            En savoir plus
          </button>
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
            src="https://picsum.photos/seed/student/800/1000" 
            alt="Student studying" 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
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
              <ShieldCheck size={20} />
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase">Vérifié</div>
          </div>
          <p className="text-sm font-bold text-[#1F2937]">Mémoire validé par le rectorat</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Library = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-[#1F2937] mb-4">Bibliothèque Numérique</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Centralisez toutes les ressources académiques de l'UNA en un seul endroit accessible.
          </p>
        </div>

        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher par titre, auteur, école..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#14532D] transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="bg-gray-50 border-none rounded-2xl px-6 py-4 font-semibold text-gray-600 focus:ring-2 focus:ring-[#14532D]">
            <option>Tous les types</option>
            <option>Mémoires</option>
            <option>Thèses</option>
            <option>Cours</option>
          </select>
          <button className="bg-[#14532D] text-white px-8 py-4 rounded-2xl font-bold">
            Filtrer
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocs.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#14532D]/10 text-[#14532D] px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  {doc.type.replace('_', ' ')}
                </div>
                <button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2 line-clamp-2 leading-tight">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">Par <span className="font-semibold">{doc.author}</span></p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Download size={16} />
                  <span>{doc.downloadCount}</span>
                </div>
                <button className="flex items-center gap-2 text-[#14532D] font-bold hover:gap-3 transition-all">
                  Consulter
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portal = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[#1F2937] mb-4">Portail Institutionnel</h2>
        <p className="text-gray-600">Découvrez les sites et écoles de l'Université Nationale d'Agriculture.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {SITES.map((site) => (
            <div key={site.id} className="group cursor-pointer">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm group-hover:border-[#14532D] transition-all">
                <div>
                  <h3 className="text-xl font-bold text-[#1F2937]">{site.name}</h3>
                  <p className="text-gray-500">{site.location}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#14532D] group-hover:text-white transition-all">
                  <ChevronRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6">
          {SCHOOLS.map((school) => (
            <div key={school.id} className="relative rounded-[2.5rem] overflow-hidden h-64 group shadow-lg">
              <img 
                src={school.image} 
                alt={school.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{school.name}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{school.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const MasterclassFeed = () => (
  <section className="py-20 px-4 bg-[#1F2937] text-white min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">Studee Masterclass</h2>
          <p className="text-gray-400">Apprenez des compétences pratiques avec nos experts.</p>
        </div>
        <button className="bg-[#B45309] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
          Voir tout
          <TrendingUp size={20} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_MASTERCLASSES.map((video) => (
          <div key={video.id} className="relative aspect-[9/16] rounded-[2rem] overflow-hidden group shadow-2xl">
            <img 
              src={video.thumbnailUrl} 
              alt={video.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle size={64} className="text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="bg-[#B45309] text-[10px] uppercase font-black px-2 py-1 rounded-md inline-block mb-3">
                {video.category}
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{video.title}</h3>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                <span className="text-xs text-gray-300">{video.authorName}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Placeholder for "TikTok style" feel */}
        {[1, 2, 3].map(i => (
          <div key={i} className="relative aspect-[9/16] rounded-[2rem] overflow-hidden bg-gray-800 animate-pulse">
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div className="w-16 h-4 bg-gray-700 rounded"></div>
              <div className="w-full h-6 bg-gray-700 rounded"></div>
              <div className="w-24 h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
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
      </div>
      <div>
        <h4 className="font-bold text-[#1F2937] mb-6 uppercase tracking-wider text-sm">Navigation</h4>
        <ul className="space-y-4 text-gray-500 text-sm font-medium">
          <li className="hover:text-[#14532D] cursor-pointer">Bibliothèque</li>
          <li className="hover:text-[#14532D] cursor-pointer">Portail Institutionnel</li>
          <li className="hover:text-[#14532D] cursor-pointer">Masterclass</li>
          <li className="hover:text-[#14532D] cursor-pointer">Marketplace</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-[#1F2937] mb-6 uppercase tracking-wider text-sm">Légal</h4>
        <ul className="space-y-4 text-gray-500 text-sm font-medium">
          <li className="hover:text-[#14532D] cursor-pointer">Conditions d'utilisation</li>
          <li className="hover:text-[#14532D] cursor-pointer">Politique de confidentialité</li>
          <li className="hover:text-[#14532D] cursor-pointer">Mentions légales</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-400 text-xs">© 2026 EducNest. Tous droits réservés.</p>
      <div className="flex items-center gap-6">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Germain NOUMONVI Chancyr</span>
      </div>
    </div>
  </footer>
);

const LoginModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#14532D]"></div>
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#14532D]/10 rounded-2xl flex items-center justify-center text-[#14532D] mx-auto mb-4">
              <UserIcon size={32} />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937]">Bienvenue</h2>
            <p className="text-gray-500">Connectez-vous à votre nid de savoir</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Universitaire</label>
              <input 
                type="email" 
                placeholder="etudiant@una.bj"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#14532D] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#14532D] transition-all"
              />
            </div>
            <button className="w-full bg-[#14532D] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all">
              Se connecter
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Pas encore de compte ? <span className="text-[#14532D] font-bold cursor-pointer">S'inscrire</span>
            </p>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Marketplace = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold text-[#1F2937] mb-4">Marketplace Étudiants</h2>
          <p className="text-gray-600 max-w-xl">Monétisez vos travaux de recherche validés et accédez à des ressources premium exclusives.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Commission</div>
            <div className="text-xl font-bold text-[#14532D]">25% EducNest</div>
          </div>
          <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Revenu Créateur</div>
            <div className="text-xl font-bold text-[#B45309]">75% Pour vous</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Fiches de révision : Botanique L2", price: "5000 FCFA", author: "Germain N." },
          { title: "TD corrigés : Irrigation M1", price: "7500 FCFA", author: "Odirick D." },
          { title: "Résumé de cours : Foresterie Urbaine", price: "3500 FCFA", author: "Chancyr G." }
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:border-[#B45309] transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#B45309] mb-6 shadow-sm">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-2">{item.title}</h3>
            <p className="text-gray-500 mb-6">Par {item.author}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-[#1F2937]">{item.price}</span>
              <button className="bg-[#1F2937] text-white px-6 py-3 rounded-xl font-bold group-hover:bg-[#B45309] transition-colors">
                Acheter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#14532D] selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogin={() => setIsLoginOpen(true)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      
      <main>
        {activeTab === 'home' && (
          <>
            <Hero onExplore={() => setActiveTab('library')} />
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                <div 
                  onClick={() => setActiveTab('library')}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-[#14532D] mb-6">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Bibliothèque</h3>
                  <p className="text-gray-500 leading-relaxed">Accès illimité aux mémoires, thèses et cours validés par les enseignants.</p>
                </div>
                <div 
                  onClick={() => setActiveTab('masterclass')}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-[#B45309] mb-6">
                    <PlayCircle size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Masterclass</h3>
                  <p className="text-gray-500 leading-relaxed">Apprenez des techniques forestières et agricoles via des vidéos immersives.</p>
                </div>
                <div 
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Marketplace</h3>
                  <p className="text-gray-500 leading-relaxed">Monétisez vos travaux de recherche et achetez des ressources premium.</p>
                </div>
              </div>
            </section>
          </>
        )}
        
        {activeTab === 'library' && <Library />}
        {activeTab === 'portal' && <Portal />}
        {activeTab === 'masterclass' && <MasterclassFeed />}
        {activeTab === 'marketplace' && <Marketplace />}
      </main>

      <Footer />
    </div>
  );
}

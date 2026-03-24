/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  School, 
  PlayCircle, 
  User, 
  Upload,
  LogOut,
  Menu, 
  X,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../lib/auth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { id: '/', label: 'Accueil', icon: BookOpen },
    { id: '/bibliotheque', label: 'Bibliothèque', icon: Search },
    { id: '/portail', label: 'Portail', icon: School },
    { id: '/masterclass', label: 'Masterclass', icon: PlayCircle },
    { id: '/marketplace', label: 'Marketplace', icon: TrendingUp },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-[#14532D] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="text-2xl font-bold text-[#1F2937] tracking-tight">EducNest</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.id}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-[#14532D]' : 'text-gray-500 hover:text-[#14532D]'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
              
              {user ? (
                <div className="flex items-center gap-3">
                  {user.role !== 'student' && (
                    <Link 
                      href="/deposer"
                      className="flex items-center gap-2 bg-[#B45309] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all"
                    >
                      <Upload size={16} />
                      Déposer
                    </Link>
                  )}
                  <Link 
                    href="/profil"
                    className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all"
                  >
                    <User size={16} />
                    {user.displayName}
                  </Link>
                  <button 
                    onClick={signOut}
                    className="flex items-center gap-2 text-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-50 transition-all"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link 
                  href="/connexion"
                  className="btn-primary"
                >
                  Se connecter
                </Link>
              )}
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
              {navItems.map((item) => {
                const isActive = pathname === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.id}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl text-left ${
                      isActive ? 'bg-[#14532D]/10 text-[#14532D]' : 'text-gray-600'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
              {user ? (
                <>
                  <Link 
                    href="/profil"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-left text-gray-600"
                  >
                    <User size={20} />
                    {user.displayName}
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-left text-red-600"
                  >
                    <LogOut size={20} />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link 
                  href="/connexion"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Se connecter
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

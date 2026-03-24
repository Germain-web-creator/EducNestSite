/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Heart, ChevronRight, Filter, X } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Document } from '../types';

// Mock data - sera remplacé par les vraies données Firebase
const mockDocuments: Document[] = [
  {
    id: 'doc1',
    title: 'Impact du changement climatique sur le maïs au Bénin',
    author: 'Germain NOUMONVI',
    authorId: 'user1',
    schoolId: 'epv',
    siteId: 'akpotokou',
    level: 'L3',
    domain: 'Production Végétale',
    type: 'licence_thesis',
    fileUrl: '#',
    downloadCount: 125,
    status: 'approved',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'doc2',
    title: 'Techniques modernes d\'irrigation maraîchère',
    author: 'Odirick DJAGBA',
    authorId: 'user2',
    schoolId: 'epv',
    siteId: 'akpotokou',
    level: 'M2',
    domain: 'Horticulture',
    type: 'master_thesis',
    fileUrl: '#',
    downloadCount: 89,
    status: 'approved',
    createdAt: '2026-02-15T14:30:00Z',
  },
  // Ajouter plus de documents...
];

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Simuler le chargement des documents
    const loadDocuments = async () => {
      setLoading(true);
      try {
        // Remplacer par l'appel Firebase réel
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDocuments(mockDocuments);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des documents');
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.author.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (documentId: string) => {
    // Implémenter la logique de favoris
    console.log('Toggle favorite:', documentId);
  };

  const downloadDocument = (documentId: string) => {
    // Implémenter la logique de téléchargement
    console.log('Download document:', documentId);
  };

  if (loading) {
    return (
      <section className="section-padding bg-gray-50 min-h-screen">
        <div className="container-max">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14532D] mx-auto"></div>
            <p className="text-gray-500 mt-4">Chargement des documents...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-50 min-h-screen">
        <div className="container-max">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50 min-h-screen">
      <div className="container-max">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1F2937] mb-4">Bibliothèque Numérique</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Centralisez toutes les ressources académiques de l'UNA en un seul endroit accessible.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher par titre, auteur, école..."
                className="input-field pl-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="input-field"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="licence_thesis">Mémoires de Licence</option>
              <option value="master_thesis">Mémoires de Master</option>
              <option value="doctorate_thesis">Thèses</option>
              <option value="course">Cours</option>
              <option value="exam">Examens</option>
            </select>
            <button className="btn-primary flex items-center gap-2">
              <Filter size={18} />
              Filtrer
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredDocs.length} document{filteredDocs.length > 1 ? 's' : ''} trouvé{filteredDocs.length > 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm">
              Plus récents
            </button>
            <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm">
              Plus téléchargés
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocs.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="card card-hover flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#14532D]/10 text-[#14532D] px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  {doc.type.replace('_', ' ')}
                </div>
                <button 
                  onClick={() => toggleFavorite(doc.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Heart size={20} />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-[#1F2937] mb-2 line-clamp-2 leading-tight">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Par <span className="font-semibold">{doc.author}</span>
              </p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">{doc.level}</span>
                <span>{doc.domain}</span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Download size={16} />
                  <span>{doc.downloadCount}</span>
                </div>
                <button 
                  onClick={() => downloadDocument(doc.id)}
                  className="flex items-center gap-2 text-[#14532D] font-bold hover:gap-3 transition-all"
                >
                  Consulter
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-2">Aucun document trouvé</h3>
            <p className="text-gray-500 mb-6">
              Essayez de modifier votre recherche ou vos filtres
            </p>
            <button 
              onClick={() => {
                setSearch('');
                setFilter('all');
              }}
              className="btn-secondary"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredDocs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg">Précédent</button>
              <button className="px-4 py-2 bg-[#14532D] text-white rounded-lg">1</button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg">2</button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg">3</button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg">Suivant</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

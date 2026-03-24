/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, BookOpen, Heart, Download, Star, Edit2, Camera, Mail, School } from 'lucide-react';
import { useAuth } from '../auth';
import { UserRole, Level } from '../types';

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    schoolId: user?.schoolId || '',
    level: user?.level || '',
    bio: ''
  });

  if (!user) return null;

  const handleSave = async () => {
    try {
      await updateUserProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const roleLabels = {
    [UserRole.STUDENT]: 'Étudiant',
    [UserRole.TEACHER]: 'Enseignant',
    [UserRole.MASTER_DOCTORATE]: 'Master/Doctorant',
    [UserRole.ADMIN]: 'Administrateur'
  };

  const levelColors = {
    'L1': 'bg-blue-100 text-blue-700',
    'L2': 'bg-green-100 text-green-700',
    'L3': 'bg-yellow-100 text-yellow-700',
    'M1': 'bg-orange-100 text-orange-700',
    'M2': 'bg-red-100 text-red-700',
    'Doctorat': 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-xl overflow-hidden"
        >
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-[#14532D] to-[#B45309] relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full p-2">
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-[#14532D] rounded-full flex items-center justify-center text-white">
                  <Camera size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pt-20 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#1F2937] mb-2">{user.displayName}</h1>
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${levelColors[user.level || 'L1']}`}>
                      {user.level || 'L1'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-[#14532D]/10 text-[#14532D] rounded-full text-xs font-bold uppercase">
                      {roleLabels[user.role]}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isEditing ? <Settings size={18} /> : <Edit2 size={18} />}
                <span className="font-medium">{isEditing ? 'Annuler' : 'Modifier'}</span>
              </button>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-50 rounded-2xl p-6 mb-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={editForm.displayName}
                      onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#14532D] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">École</label>
                    <select
                      value={editForm.schoolId}
                      onChange={(e) => setEditForm({ ...editForm, schoolId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#14532D] transition-all"
                    >
                      <option value="">Sélectionner une école</option>
                      <option value="epv">École de Production Végétale</option>
                      <option value="eha">École d'Horticulture</option>
                      <option value="ef">École de Foresterie</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Niveau</label>
                    <select
                      value={editForm.level}
                      onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#14532D] transition-all"
                    >
                      <option value="">Sélectionner un niveau</option>
                      {Object.values(Level).map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="bg-[#14532D] text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </motion.div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1F2937]">{user.downloadCountMonth}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Téléchargements ce mois</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1F2937]">{user.favorites.length}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Favoris</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1F2937]">{user.subscriptionStatus === 'premium' ? '∞' : '5'}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Limite mensuelle</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1F2937]">{user.subscriptionStatus === 'premium' ? 'Premium' : 'Gratuit'}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Abonnement</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors">
                <BookOpen className="text-[#14532D]" size={24} />
                <div className="text-left">
                  <div className="font-bold text-[#1F2937]">Mes Documents</div>
                  <div className="text-sm text-gray-500">Gérer mes publications</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors">
                <Heart className="text-red-500" size={24} />
                <div className="text-left">
                  <div className="font-bold text-[#1F2937]">Favoris</div>
                  <div className="text-sm text-gray-500">Voir mes favoris</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors">
                <Download className="text-blue-500" size={24} />
                <div className="text-left">
                  <div className="font-bold text-[#1F2937]">Téléchargements</div>
                  <div className="text-sm text-gray-500">Historique</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;

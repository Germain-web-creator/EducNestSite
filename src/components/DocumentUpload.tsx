/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../auth';
import { uploadDocument } from '../firebase';
import { DocType, DocStatus } from '../types';

const DocumentUpload = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: DocType.LICENCE_THESIS,
    level: 'L1',
    domain: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('Le fichier ne doit pas dépasser 10MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Seuls les fichiers PDF et Word sont acceptés');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !user) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    if (!formData.title.trim()) {
      setError('Veuillez remplir le titre');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const documentData = {
        id: `doc_${Date.now()}_${user.uid}`,
        title: formData.title,
        author: user.displayName,
        authorId: user.uid,
        schoolId: user.schoolId || '',
        siteId: user.siteId || '',
        level: formData.level,
        domain: formData.domain,
        type: formData.type,
        downloadCount: 0,
        status: DocStatus.PENDING,
        createdAt: new Date().toISOString()
      };

      await uploadDocument(file, documentData);
      setSuccess(true);
      
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading document:', error);
      setError('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  const docTypeLabels = {
    [DocType.LICENCE_THESIS]: 'Mémoire de Licence',
    [DocType.MASTER_THESIS]: 'Mémoire de Master',
    [DocType.DOCTORATE_THESIS]: 'Thèse de Doctorat',
    [DocType.RESEARCH]: 'Article de Recherche',
    [DocType.COURSE]: 'Cours',
    [DocType.EXAM]: 'Examen',
    [DocType.BOOK]: 'Livre'
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
            <Check size={40} />
          </div>
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Document envoyé!</h2>
          <p className="text-gray-600 mb-6">Votre document a été soumis pour validation.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-2">Déposer un document</h2>
          <p className="text-gray-500">Partagez vos travaux académiques avec la communauté.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">Fichier</label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#14532D] transition-colors">
              {file ? (
                <div className="flex items-center justify-center gap-4">
                  <FileText className="text-[#14532D]" size={48} />
                  <div className="text-left">
                    <div className="font-medium text-[#1F2937]">{file.name}</div>
                    <div className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="text-gray-400 mx-auto mb-4" size={48} />
                  <div className="text-gray-600 mb-2">Glissez un fichier ici ou cliquez pour sélectionner</div>
                  <div className="text-sm text-gray-500">PDF, Word (max 10MB)</div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-4 bg-[#14532D] text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-opacity-90 transition-all"
                  >
                    Sélectionner un fichier
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Document Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Titre *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Titre du document"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#14532D] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Type de document</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as DocType })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#14532D] transition-all"
              >
                {Object.entries(docTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Niveau</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#14532D] transition-all"
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
                <option value="Doctorat">Doctorat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Domaine</label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                placeholder="Ex: Production Végétale"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#14532D] transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={!file || uploading}
              className="flex-1 bg-[#14532D] text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Téléchargement...
                </>
              ) : (
                'Déposer le document'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
            >
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DocumentUpload;

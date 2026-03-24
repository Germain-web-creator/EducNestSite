/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { getDocuments, incrementDownloadCount, addToFavorites, removeFromFavorites } from '../firebase';
import { Document } from '../types';

export const useDocuments = (filters?: any) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const docs = await getDocuments(filters);
        setDocuments(docs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch documents');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [JSON.stringify(filters)]);

  const downloadDocument = async (documentId: string) => {
    try {
      await incrementDownloadCount(documentId);
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, downloadCount: doc.downloadCount + 1 }
            : doc
        )
      );
    } catch (error) {
      console.error('Error downloading document:', error);
      throw error;
    }
  };

  const toggleFavorite = async (userId: string, documentId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await removeFromFavorites(userId, documentId);
      } else {
        await addToFavorites(userId, documentId);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  return {
    documents,
    loading,
    error,
    downloadDocument,
    toggleFavorite,
    refetch: () => {
      setLoading(true);
      getDocuments(filters).then(docs => {
        setDocuments(docs);
        setLoading(false);
      }).catch(err => {
        setError('Failed to fetch documents');
        setLoading(false);
      });
    }
  };
};

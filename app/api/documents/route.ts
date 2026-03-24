/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const schoolId = searchParams.get('schoolId') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limitPerPage = 12;

    let q = query(
      collection(db, 'documents'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      limit(limitPerPage)
    );

    // Appliquer les filtres
    if (type) {
      q = query(q, where('type', '==', type));
    }
    if (schoolId) {
      q = query(q, where('schoolId', '==', schoolId));
    }

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filtrage par recherche (côté serveur pour le titre/auteur)
    let filteredDocuments = documents;
    if (search) {
      filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      documents: filteredDocuments,
      total: filteredDocuments.length,
      page,
      totalPages: Math.ceil(filteredDocuments.length / limitPerPage)
    });

  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, action } = body;

    if (action === 'download') {
      // Incrémenter le compteur de téléchargement
      const docRef = doc(db, 'documents', documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentCount = docSnap.data().downloadCount || 0;
        await updateDoc(docRef, { downloadCount: currentCount + 1 });
        
        return NextResponse.json({ success: true, downloadCount: currentCount + 1 });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

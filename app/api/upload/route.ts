/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const authorId = formData.get('authorId') as string;
    const schoolId = formData.get('schoolId') as string;
    const siteId = formData.get('siteId') as string;
    const level = formData.get('level') as string;
    const domain = formData.get('domain') as string;
    const type = formData.get('type') as string;

    if (!file || !title || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validation du fichier
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and Word files are allowed.' },
        { status: 400 }
      );
    }

    // Validation de la taille (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Upload du fichier dans Firebase Storage
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `documents/${fileName}`);
    
    const fileBuffer = await file.arrayBuffer();
    await uploadBytes(storageRef, new Uint8Array(fileBuffer));
    
    const fileUrl = await getDownloadURL(storageRef);

    // Création du document dans Firestore
    const documentId = `doc_${timestamp}_${authorId}`;
    const documentData = {
      id: documentId,
      title,
      author,
      authorId,
      schoolId: schoolId || '',
      siteId: siteId || '',
      level,
      domain,
      type,
      fileUrl,
      downloadCount: 0,
      status: 'pending',
      createdAt: serverTimestamp(),
      fileName,
      fileSize: file.size
    };

    await setDoc(doc(db, 'documents', documentId), documentData);

    return NextResponse.json({
      success: true,
      document: documentData,
      message: 'Document uploaded successfully and sent for validation.'
    });

  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}

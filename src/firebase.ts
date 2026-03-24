/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "educnest-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "educnest-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "educnest-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Authentication functions
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Firestore functions
export const createUserProfile = async (uid: string, userData: any) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, userData, { merge: true });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

export const uploadDocument = async (file: File, documentData: any) => {
  // Upload file to storage
  const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const fileUrl = await getDownloadURL(storageRef);

  // Create document record in firestore
  const docRef = doc(db, 'documents', documentData.id);
  await setDoc(docRef, { ...documentData, fileUrl });

  return { fileUrl, docId: documentData.id };
};

export const getDocuments = async (filters?: any) => {
  let q = query(collection(db, 'documents'), where('status', '==', 'approved'));
  
  if (filters?.schoolId) {
    q = query(q, where('schoolId', '==', filters.schoolId));
  }
  
  if (filters?.type) {
    q = query(q, where('type', '==', filters.type));
  }

  q = query(q, orderBy('createdAt', 'desc'), limit(50));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateDocument = async (docId: string, updates: any) => {
  const docRef = doc(db, 'documents', docId);
  await updateDoc(docRef, updates);
};

export const addToFavorites = async (userId: string, documentId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const userData = userSnap.data();
    const favorites = userData.favorites || [];
    if (!favorites.includes(documentId)) {
      favorites.push(documentId);
      await updateDoc(userRef, { favorites });
    }
  }
};

export const removeFromFavorites = async (userId: string, documentId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const userData = userSnap.data();
    const favorites = userData.favorites || [];
    const updatedFavorites = favorites.filter((id: string) => id !== documentId);
    await updateDoc(userRef, { favorites: updatedFavorites });
  }
};

export const incrementDownloadCount = async (documentId: string) => {
  const docRef = doc(db, 'documents', documentId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const currentCount = docSnap.data().downloadCount || 0;
    await updateDoc(docRef, { downloadCount: currentCount + 1 });
  }
};

export default app;

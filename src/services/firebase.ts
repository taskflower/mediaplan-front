// src/services/firebase/websiteService.ts

import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Website } from '../types/marketing';

export const websiteService = {
  // Create - Dodawanie nowej strony
  addWebsite: async (userId: string, websiteData: Partial<Website>): Promise<string> => {
    const websitesRef = collection(db, 'websites');
    const newWebsite = {
      userId,
      url: websiteData.url,
      name: websiteData.name || websiteData.url,
      lastAnalysis: new Date().toISOString(),
      status: 'active' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      analytics: {
        visitors: 0,
        bounceRate: 0,
        avgTimeOnSite: "0:00"
      },
      metaTags: websiteData.metaTags || [],
      description: websiteData.description || ''
    };

    const docRef = await addDoc(websitesRef, newWebsite);
    return docRef.id;
  },

  // Read - Pobieranie wszystkich stron użytkownika
  getWebsites: async (userId: string): Promise<Website[]> => {
    const websitesRef = collection(db, 'websites');
    const q = query(websitesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Website));
  },

  // Read - Pobieranie pojedynczej strony
  getWebsite: async (websiteId: string): Promise<Website | null> => {
    const websiteRef = doc(db, 'websites', websiteId);
    const websiteDoc = await getDoc(websiteRef);
    
    if (!websiteDoc.exists()) {
      return null;
    }

    return { 
      id: websiteDoc.id, 
      ...websiteDoc.data() 
    } as Website;
  },

  // Update - Aktualizacja strony
  updateWebsite: async (websiteId: string, updateData: Partial<Website>): Promise<void> => {
    const websiteRef = doc(db, 'websites', websiteId);
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    };
    await updateDoc(websiteRef, updatePayload);
  },

  // Delete - Usuwanie strony
  deleteWebsite: async (websiteId: string): Promise<void> => {
    const websiteRef = doc(db, 'websites', websiteId);
    await deleteDoc(websiteRef);
  },

  // Aktualizacja statusu strony
  updateWebsiteStatus: async (websiteId: string, status: Website['status']): Promise<void> => {
    const websiteRef = doc(db, 'websites', websiteId);
    await updateDoc(websiteRef, {
      status,
      updatedAt: new Date()
    });
  },

  // Aktualizacja analityki strony
  updateWebsiteAnalytics: async (
    websiteId: string, 
    analytics: Website['analytics']
  ): Promise<void> => {
    const websiteRef = doc(db, 'websites', websiteId);
    await updateDoc(websiteRef, {
      analytics,
      updatedAt: new Date()
    });
  }
};
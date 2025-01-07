// src/services/firebase/campaignService.ts
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
  import { Campaign } from '../types/marketing';
  
  export const campaignService = {
    // Get all campaigns for a user
    getCampaigns: async (userId: string): Promise<Campaign[]> => {
      const campaignsRef = collection(db, 'campaigns');
      const q = query(campaignsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Campaign));
    },
  
    // Get single campaign
    getCampaign: async (campaignId: string): Promise<Campaign | null> => {
      const campaignRef = doc(db, 'campaigns', campaignId);
      const campaignDoc = await getDoc(campaignRef);
      
      if (!campaignDoc.exists()) {
        return null;
      }
      return { 
        id: campaignDoc.id, 
        ...campaignDoc.data() 
      } as Campaign;
    },
  
    // Create new campaign
    addCampaign: async (userId: string, campaignData: Partial<Campaign>): Promise<string> => {
      const campaignsRef = collection(db, 'campaigns');
      const newCampaign = {
        userId,
        websiteId: campaignData.websiteId,
        name: campaignData.name,
        status: campaignData.status || 'draft',
        platforms: campaignData.platforms || [],
        budget: campaignData.budget || 0,
        startDate: campaignData.startDate || new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        performance: {
          clicks: 0,
          impressions: 0,
          conversions: 0
        }
      };
      const docRef = await addDoc(campaignsRef, newCampaign);
      return docRef.id;
    },
  
    // Update campaign
    updateCampaign: async (campaignId: string, updateData: Partial<Campaign>): Promise<void> => {
      const campaignRef = doc(db, 'campaigns', campaignId);
      const updatePayload = {
        ...updateData,
        updatedAt: new Date()
      };
      await updateDoc(campaignRef, updatePayload);
    },
  
    // Delete campaign
    deleteCampaign: async (campaignId: string): Promise<void> => {
      const campaignRef = doc(db, 'campaigns', campaignId);
      await deleteDoc(campaignRef);
    },
  
    // Update campaign performance
    updateCampaignPerformance: async (
      campaignId: string, 
      performance: Campaign['performance']
    ): Promise<void> => {
      const campaignRef = doc(db, 'campaigns', campaignId);
      await updateDoc(campaignRef, {
        performance,
        updatedAt: new Date()
      });
    }
  };
  
  // Re-export for convenience
  export default campaignService;
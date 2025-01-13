import { auth } from '../config/firebase';

interface AnalysisResponse {
  title: string;
  description: string;
  metaTags: Array<{
    name: string;
    content: string;
  }>;
}

export const analysisService = {
  analyzeUrl: async (url: string): Promise<AnalysisResponse> => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : null;
      const userId = user?.uid || 'anonymous'; // Ustaw `anonymous` jeśli użytkownik jest niezalogowany

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/services/analyze-website/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ url, userId }), // Dodaj `userId` do ciała żądania
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during analysis:', error);
      throw error;
    }
  },
};
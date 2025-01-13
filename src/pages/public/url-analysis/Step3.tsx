import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { analysisService } from '../../../services/analysisService';

const Step3: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  useEffect(() => {
    const analyzeUrl = async () => {
      const storedUrl = sessionStorage.getItem('analysisUrl');
      if (!storedUrl) {
        navigate('/pl/public/url-analysis-step1');
        return;
      }

      try {
        const analysisResult = await analysisService.analyzeUrl(storedUrl);
        sessionStorage.setItem('analysisData', JSON.stringify(analysisResult));
        navigate('/pl/public/url-analysis-step4');
      } catch (err) {
        setError('Wystąpił błąd podczas analizy strony. Spróbuj ponownie później.');
        console.error('Analysis error:', err);
      }
    };

    analyzeUrl();
  }, [navigate]);

  if (error) {
    return (
      <div className="px-4 py-8">
        <Card>
          <div>
            <h2 className="text-2xl font-bold mb-4">Krok 3: Analiza strony</h2>
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/pl/public/url-analysis-step2')}
            >
              Wstecz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Card>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Trwa analiza strony...</p>
        </div>
      </Card>
    </div>
  );
};

export default Step3;
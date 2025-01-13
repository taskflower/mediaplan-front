// Step4.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

interface MetaTag {
  name: string;
  content: string;
}

const Step5: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);

  useEffect(() => {
    const storedUrl = sessionStorage.getItem('analysisUrl');
    if (!storedUrl) {
      navigate('/pl/public/url-analysis-step1');
      return;
    }

    // Tutaj możemy dodać faktyczne pobieranie meta tagów
    setUrl(storedUrl);
    setMetaTags([
      { name: 'title', content: 'Przykładowy tytuł' },
      { name: 'description', content: 'Przykładowy opis' }
    ]);
    setIsLoading(false);
  }, [navigate]);

  const handlePreviousStep = () => {
    navigate('/pl/public/url-analysis-step3');
  };

  const handleNextStep = () => {
    try {
      sessionStorage.setItem('metaTags', JSON.stringify(metaTags));
      navigate('/pl/public/url-analysis-processing');
    } catch (err) {
      setError('Wystąpił błąd podczas zapisywania meta tagów');
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-8">
        <Card>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Card>
        <div>
          <h2 className="text-2xl font-bold mb-4">Krok 4: Meta tagi strony</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Analizowany URL
            </label>
            <p className="bg-gray-700 p-3 rounded-lg text-white mb-4">{url}</p>
          </div>

          <div className="space-y-3 mb-6">
            {metaTags.length > 0 ? (
              metaTags.map((tag, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">
                    {tag.name}
                  </div>
                  <div className="text-gray-100">
                    {tag.content}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Nie znaleziono meta tagów na stronie</p>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              Wstecz
            </Button>
            <Button variant="primary" onClick={handleNextStep}>
              Rozpocznij analizę
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Step5;
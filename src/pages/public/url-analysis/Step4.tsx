// src/pages/public/url-analysis/Step4.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

interface MetaTag {
  name: string;
  content: string;
}

const Step4: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [metaTags, setMetaTags] = useState<MetaTag[]>([
    { name: 'title', content: 'Przykładowy tytuł' },
    { name: 'description', content: 'Przykładowy opis' },
    { name: 'keywords', content: 'przykład, meta, tagi' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Jan Kowalski' },
  ]);

  useEffect(() => {
    const storedUrl = sessionStorage.getItem('analysisUrl');
    if (!storedUrl) {
      navigate('/pl/public/url-analysis-step1');
      return;
    }
    setUrl(storedUrl);
    // TODO: Tutaj dodać faktyczne pobieranie meta tagów ze strony
  }, [navigate]);

  const handlePreviousStep = () => {
    navigate('/pl/public/url-analysis-step3');
  };

  const handleNextStep = () => {
    sessionStorage.setItem('metaTags', JSON.stringify(metaTags));
    navigate('/pl/public/url-analysis-processing');
  };

  return (
    <div className="px-4 py-8">
      <Card>
        <div>
          <h2 className="text-2xl font-bold mb-4">Krok 4: Meta tagi strony</h2>
          <p className="text-gray-300 mb-4">
            Przegląd meta tagów znalezionych na stronie:
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Analizowany URL
            </label>
            <p className="bg-gray-700 p-3 rounded-lg text-white mb-4">{url}</p>
          </div>

          <div className="space-y-3 mb-6">
            {metaTags.map((tag, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">
                  {tag.name}
                </div>
                <div className="text-gray-100">
                  {tag.content}
                </div>
              </div>
            ))}
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

export default Step4;
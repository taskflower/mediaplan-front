// src/pages/public/url-analysis/Step3.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

const Step3: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedUrl = sessionStorage.getItem('analysisUrl');
    if (!storedUrl) {
      navigate('/pl/public/url-analysis-step1');
      return;
    }
    setUrl(storedUrl);
    // TODO: Tutaj dodać faktyczne pobieranie title i description ze strony
    setTitle('Przykładowy tytuł strony');
    setDescription('Przykładowy opis strony, który został pobrany z meta tagów.');
  }, [navigate]);

  const handlePreviousStep = () => {
    navigate('/pl/public/url-analysis-step2');
  };

  const handleNextStep = () => {
    sessionStorage.setItem('pageTitle', title);
    sessionStorage.setItem('pageDescription', description);
    navigate('/pl/public/url-analysis-step4');
  };

  return (
    <div className="px-4 py-8">
      <Card>
        <div>
          <h2 className="text-2xl font-bold mb-4">Krok 3: Informacje o stronie</h2>
          <p className="text-gray-300 mb-4">
            Sprawdź i edytuj podstawowe informacje o stronie:
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Analizowany URL
            </label>
            <p className="bg-gray-700 p-3 rounded-lg text-white">{url}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tytuł strony
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Opis strony
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 resize-none"
            />
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              Wstecz
            </Button>
            <Button variant="primary" onClick={handleNextStep}>
              Dalej
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Step3;
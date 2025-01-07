// src/pages/public/url-analysis/Step1.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

const Step1: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (error) {
      setError('');
    }
  };

  const handleNextStep = () => {
    if (!url.trim()) {
      setError('Proszę podać adres URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Proszę podać poprawny adres URL (np. https://example.com)');
      return;
    }

    sessionStorage.setItem('analysisUrl', url);
    navigate('/pl/public/url-analysis-step2');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <div className="px-4 py-8">
      <Card>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Krok 1: Podaj adres URL</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL strony do analizy
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                error ? 'border-red-500' : 'border-gray-600'
              }`}
              value={url}
              onChange={handleUrlChange}
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              Wprowadź pełny adres URL zaczynający się od http:// lub https://
            </p>
            <Button 
              type="submit"
              variant="primary" 
              disabled={!url.trim()}
            >
              Dalej
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Step1;
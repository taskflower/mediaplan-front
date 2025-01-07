// src/pages/public/url-analysis/Processing.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../../components/Button';
import { websiteService } from '../../../services/firebase';


const Processing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessingDone, setIsProcessingDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // Dodajemy stan do kontroli procesu

  useEffect(() => {
    const processAnalysis = async () => {
      // Dodajemy sprawdzenie czy już przetwarzamy
      if (isProcessing) return;
      
      try {
        setIsProcessing(true); // Ustawiamy flagę że rozpoczynamy przetwarzanie
        
        const storedUrl = sessionStorage.getItem('analysisUrl');
        if (!storedUrl) {
          navigate('/pl/public/url-analysis-step1');
          return;
        }

        const storedTitle = sessionStorage.getItem('pageTitle');
        const storedDescription = sessionStorage.getItem('pageDescription');
        const storedMetaTags = sessionStorage.getItem('metaTags');

        // Przygotuj dane do zapisania
        const websiteData = {
          url: storedUrl,
          name: storedTitle || storedUrl,
          description: storedDescription || '',
          metaTags: storedMetaTags ? JSON.parse(storedMetaTags) : []
        };

        // Jeśli użytkownik jest zalogowany, zapisz dane w Firebase
        if (user) {
          await websiteService.addWebsite(user.uid, websiteData);
        }

        // Wyczyść dane z sessionStorage
        sessionStorage.removeItem('analysisUrl');
        sessionStorage.removeItem('pageTitle');
        sessionStorage.removeItem('pageDescription');
        sessionStorage.removeItem('metaTags');

        setIsProcessingDone(true);

        // Automatyczne przekierowanie dla zalogowanych użytkowników
        if (user) {
          navigate('/pl/admin/dashboard');
        }
      } catch (err) {
        console.error('Error processing website:', err);
        setError('Wystąpił błąd podczas przetwarzania strony');
        setIsProcessingDone(true);
      } finally {
        setIsProcessing(false); // Resetujemy flagę przetwarzania
      }
    };

    processAnalysis();
  }, [navigate, user, isProcessing]); // Dodajemy isProcessing do zależności

  const handleLogin = () => {
    navigate('/pl/public/login');
  };

  const handleStartNew = () => {
    navigate('/pl/public/url-analysis-step1');
  };

  return (
    <div className="px-4 py-8">
      <Card>
        <div>
          {!isProcessingDone ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Analiza w toku...</h2>
              <p className="text-gray-300 mb-4">
                Adres URL został przesłany do analizy. Proszę czekać...
              </p>
              <div className="flex justify-center mb-6">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {error ? 'Wystąpił błąd!' : 'Analiza zakończona!'}
              </h2>
              {error ? (
                <p className="text-red-400 mb-6">{error}</p>
              ) : (
                <p className="text-gray-300 mb-6">
                  Adres URL został przeanalizowany pomyślnie.
                </p>
              )}
              {!user ? (
                <div className="text-center">
                  <p className="text-gray-300 mb-4">
                    Zaloguj się, aby zobaczyć szczegółowe wyniki analizy i zachować historię.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="primary" onClick={handleLogin}>
                      Zaloguj się
                    </Button>
                    <Button variant="secondary" onClick={handleStartNew}>
                      Nowa analiza
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Button variant="primary" onClick={() => navigate('/pl/admin/dashboard')}>
                    Przejdź do wyników
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Processing;
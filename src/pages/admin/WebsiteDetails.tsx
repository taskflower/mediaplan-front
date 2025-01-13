import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Website } from '../../types/marketing';
import { StatsCard } from '../../components/marketing/StatsCard';
import StaticAnalitics from '../mixed/staticAnalitics';
import { websiteService } from '../../services/firebase';

const formatDate = (dateValue: any) => {
  try {
    if (typeof dateValue === 'string') {
      return new Date(dateValue).toLocaleDateString('pl-PL');
    }

    if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
      return new Date(dateValue.seconds * 1000).toLocaleDateString('pl-PL');
    }

    return 'Data niedostępna';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data niedostępna';
  }
};

const WebsiteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWebsite = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const websiteData = await websiteService.getWebsite(id);
        setWebsite(websiteData);
      } catch (err) {
        console.error('Error loading website:', err);
        setError('Wystąpił błąd podczas ładowania danych strony');
      } finally {
        setLoading(false);
      }
    };

    loadWebsite();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              {error || 'Nie znaleziono strony'}
            </h2>
            <Button variant="primary" onClick={() => navigate('/pl/admin/websites')}>
              Wróć do listy
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Nagłówek */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="secondary"
          onClick={() => navigate('/pl/admin/websites')}
        >
          <FiChevronLeft className="text-xl" />
        </Button>
        <h1 className="text-3xl font-bold">Szczegóły strony {website.name}</h1>
      </div>

      {/* Szczegóły strony */}
      <div className="flex justify-between items-center mb-8">
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          {website.url}
        </a>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/pl/admin/websites')}
          >
            Wróć
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/pl/public/url-analysis-step1?url=${encodeURIComponent(website.url)}`)}
          >
            Nowa analiza
          </Button>
        </div>
      </div>

      {/* Statystyki */}
      <div className="mt-8">
        <StaticAnalitics initialData={website} />
      </div>
    </div>
  );
};

export default WebsiteDetails;

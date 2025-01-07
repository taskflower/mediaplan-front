// src/pages/admin/CampaignDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Campaign } from '../../types/marketing';

import { StatsCard } from '../../components/marketing/StatsCard';
import campaignService from '../../services/campaignService';

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('pl-PL');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data niedostępna';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(amount);
};

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampaign = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const campaignData = await campaignService.getCampaign(id);
        setCampaign(campaignData);
      } catch (err) {
        console.error('Error loading campaign:', err);
        setError('Wystąpił błąd podczas ładowania danych kampanii');
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [id]);

  const handleStatusChange = async (newStatus: Campaign['status']) => {
    if (!campaign?.id) return;

    try {
      await campaignService.updateCampaign(campaign.id, { status: newStatus });
      setCampaign(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (err) {
      console.error('Error updating campaign status:', err);
      setError('Nie udało się zaktualizować statusu kampanii');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              {error || 'Nie znaleziono kampanii'}
            </h2>
            <Button variant="primary" onClick={() => navigate('/pl/admin/campaigns')}>
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{campaign.name}</h1>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              campaign.status === 'active' ? 'bg-green-500/20 text-green-500' :
              campaign.status === 'draft' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-gray-500/20 text-gray-500'
            }`}>
              {campaign.status === 'active' ? 'Aktywna' :
               campaign.status === 'draft' ? 'Szkic' : 'Zakończona'}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/pl/admin/campaigns')}
          >
            Wróć
          </Button>
          {campaign.status === 'draft' && (
            <Button 
              variant="primary"
              onClick={() => handleStatusChange('active')}
            >
              Aktywuj kampanię
            </Button>
          )}
          {campaign.status === 'active' && (
            <Button 
              variant="danger"
              onClick={() => handleStatusChange('completed')}
            >
              Zakończ kampanię
            </Button>
          )}
        </div>
      </div>

      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Budżet"
          value={formatCurrency(campaign.budget)}
          color="blue"
        />
        <StatsCard
          title="Konwersje"
          value={campaign.performance?.conversions || 0}
          color="green"
        />
        <StatsCard
          title="Wyświetlenia"
          value={campaign.performance?.impressions || 0}
          color="purple"
        />
        <StatsCard
          title="Kliknięcia"
          value={campaign.performance?.clicks || 0}
          color="yellow"
        />
      </div>

      {/* Szczegóły kampanii */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Informacje podstawowe */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Informacje podstawowe</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400">Platformy</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {campaign.platforms.map((platform, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Data rozpoczęcia</h3>
              <p className="text-white">
                {formatDate(campaign.startDate)}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Data utworzenia</h3>
              <p className="text-white">
                {campaign.createdAt instanceof Date 
                  ? formatDate(campaign.createdAt.toISOString())
                  : 'Data niedostępna'}
              </p>
            </div>
          </div>
        </Card>

        {/* Statystyki szczegółowe */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Statystyki szczegółowe</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400">CTR (Click-Through Rate)</h3>
              <p className="text-white">
                {campaign.performance?.impressions
                  ? ((campaign.performance.clicks / campaign.performance.impressions) * 100).toFixed(2) + '%'
                  : '0%'}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Koszt na konwersję</h3>
              <p className="text-white">
                {campaign.performance?.conversions
                  ? formatCurrency(campaign.budget / campaign.performance.conversions)
                  : 'Brak danych'}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Współczynnik konwersji</h3>
              <p className="text-white">
                {campaign.performance?.clicks
                  ? ((campaign.performance.conversions / campaign.performance.clicks) * 100).toFixed(2) + '%'
                  : '0%'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetails;
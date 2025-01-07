// src/pages/admin/NewCampaign.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

import type { Website } from '../../types/marketing';
import campaignService from '../../services/campaignService';
import { websiteService } from '../../services/firebase';

interface CampaignForm {
  name: string;
  websiteId: string;
  platforms: string[];
  budget: number;
  startDate: string;
}

const platformOptions = ['Google Ads', 'Facebook', 'Instagram'];

const NewCampaign: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  
  const [formData, setFormData] = useState<CampaignForm>({
    name: '',
    websiteId: '',
    platforms: [],
    budget: 0,
    startDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const loadWebsites = async () => {
      if (!user?.uid) return;
      try {
        const websitesData = await websiteService.getWebsites(user.uid);
        setWebsites(websitesData);
        if (websitesData.length > 0) {
          setFormData(prev => ({ ...prev, websiteId: websitesData[0].id }));
        }
      } catch (err) {
        console.error('Error loading websites:', err);
        setError('Nie udało się załadować listy stron');
      }
    };

    loadWebsites();
  }, [user]);

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    try {
      setLoading(true);
      setError(null);

      // Walidacja
      if (!formData.name.trim()) {
        throw new Error('Nazwa kampanii jest wymagana');
      }
      if (!formData.websiteId) {
        throw new Error('Wybierz stronę dla kampanii');
      }
      if (formData.platforms.length === 0) {
        throw new Error('Wybierz co najmniej jedną platformę');
      }
      if (formData.budget <= 0) {
        throw new Error('Budżet musi być większy niż 0');
      }

      const campaignId = await campaignService.addCampaign(user.uid, {
        ...formData,
        status: 'draft'
      });

      navigate('/pl/admin/campaigns');
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas tworzenia kampanii');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Nowa kampania</h1>
        <Button
          variant="secondary"
          onClick={() => navigate('/pl/admin/campaigns')}
        >
          Anuluj
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Nazwa kampanii
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
              placeholder="Wprowadź nazwę kampanii"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Strona
            </label>
            <select
              value={formData.websiteId}
              onChange={e => setFormData(prev => ({ ...prev, websiteId: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
            >
              {websites.map(website => (
                <option key={website.id} value={website.id}>
                  {website.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Platformy reklamowe
            </label>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handlePlatformToggle(platform)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.platforms.includes(platform)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Budżet (PLN)
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={e => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
              min="0"
              step="100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Data rozpoczęcia
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Tworzenie...' : 'Utwórz kampanię'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewCampaign;
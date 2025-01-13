import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TextField, SelectField, CheckboxField } from '../../components/form';
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

const platformOptions = [
  { value: 'Google Ads', label: 'Google Ads' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
];

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
    startDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const loadWebsites = async () => {
      if (!user?.uid) return;
      try {
        const websitesData = await websiteService.getWebsites(user.uid);
        setWebsites(websitesData);
        if (websitesData.length > 0) {
          setFormData((prev) => ({ ...prev, websiteId: websitesData[0].id }));
        }
      } catch (err) {
        console.error('Error loading websites:', err);
        setError('Nie udało się załadować listy stron');
      }
    };

    loadWebsites();
  }, [user]);

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    try {
      setLoading(true);
      setError(null);

      if (!formData.name.trim()) throw new Error('Nazwa kampanii jest wymagana');
      if (!formData.websiteId) throw new Error('Wybierz stronę dla kampanii');
      if (formData.platforms.length === 0) throw new Error('Wybierz co najmniej jedną platformę');
      if (formData.budget <= 0) throw new Error('Budżet musi być większy niż 0');

      await campaignService.addCampaign(user.uid, { ...formData, status: 'draft' });
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
      {/* Nagłówek */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="secondary"
          onClick={() => navigate('/pl/admin/campaigns')}
        >
          <FiChevronLeft className="text-xl" />
        </Button>
        <h1 className="text-3xl font-bold">Nowa kampania</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          )}

          <TextField
            label="Nazwa kampanii"
            placeholder="Wprowadź nazwę kampanii"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />

          <SelectField
            label="Strona"
            options={websites.map((website) => ({
              value: website.id,
              label: website.name,
            }))}
            value={formData.websiteId}
            onChange={(e) => setFormData((prev) => ({ ...prev, websiteId: e.target.value }))}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Platformy reklamowe
            </label>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map((platform) => (
                <CheckboxField
                  key={platform.value}
                  label={platform.label}
                  checked={formData.platforms.includes(platform.value)}
                  onChange={() => handlePlatformToggle(platform.value)}
                />
              ))}
            </div>
          </div>

          <TextField
            label="Budżet (PLN)"
            type="number"
            placeholder="Podaj budżet kampanii"
            value={formData.budget}
            onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }))}
            required
            min="0"
            step="100"
          />

          <TextField
            label="Data rozpoczęcia"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
            required
          />

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

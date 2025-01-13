import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TextField, SelectField } from '../../components/form';
import { useAuth } from '../../contexts/AuthContext';
import { Campaign } from '../../types/marketing';
import { Table } from '../../components/ Table';
import campaignService from '../../services/campaignService';

const Campaigns: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) return;
      try {
        setLoading(true);
        const campaignsData = await campaignService.getCampaigns(user.uid);
        setCampaigns(campaignsData);
      } catch (err) {
        console.error('Error loading campaigns:', err);
        setError('Wystąpił błąd podczas ładowania danych');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesPlatform = filterPlatform === 'all' || campaign.platforms.includes(filterPlatform);
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate("/pl/admin/dashboard")}
          >
            <FiChevronLeft className="text-xl h-7" />
          </Button>
          <h1 className="text-3xl font-bold">Kampanie</h1>
        </div>
        <Button 
          variant="primary"
          onClick={() => navigate('/pl/admin/campaigns/new')}
        >
          + Nowa kampania
        </Button>
      </div>

      <Card title="Filtry">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtr: Wyszukiwanie */}
          <TextField
            label="Wyszukaj kampanię"
            placeholder="Wprowadź nazwę kampanii..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />

          {/* Filtr: Platformy */}
          <SelectField
            label="Platforma"
            options={[
              { value: 'all', label: 'Wszystkie platformy' },
              { value: 'Google Ads', label: 'Google Ads' },
              { value: 'Facebook', label: 'Facebook' },
              { value: 'Instagram', label: 'Instagram' },
            ]}
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="mt-1"
          />

          {/* Filtr: Status */}
          <SelectField
            label="Status"
            options={[
              { value: 'all', label: 'Wszystkie statusy' },
              { value: 'active', label: 'Aktywne' },
              { value: 'draft', label: 'Szkice' },
              { value: 'completed', label: 'Zakończone' },
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="mt-1"
          />
        </div>
      </Card>

      <div className="mt-6">
        <Card title="Wszystkie kampanie">
          {error ? (
            <div className="text-red-500 p-4">{error}</div>
          ) : (
            <Table
              headers={['Nazwa', 'Platformy', 'Budżet', 'Konwersje', 'Status']}
              data={filteredCampaigns.map(campaign => ({
                id: campaign.id,
                nazwa: campaign.name,
                platformy: campaign.platforms.join(', '),
                budżet: `${campaign.budget} zł`,
                konwersje: campaign.performance?.conversions || 0,
                status: campaign.status
              }))}
              actions={(row) => (
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => navigate(`/pl/admin/campaign/${row.id}`)}
                >
                  Szczegóły
                </Button>
              )}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Campaigns;

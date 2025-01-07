// src/pages/admin/Websites.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";

import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { StatsCard } from "../../components/marketing/StatsCard";
import { RecommendationCard } from "../../components/marketing/RecommendationCard";
import { Website } from "../../types/marketing";
import { websiteService } from "../../services/firebase";
import { Table } from "../../components/ Table";

const mockRecommendations = [
  {
    type: "warning" as const,
    title: "Aktualizacja meta tagów",
    description:
      "Strona główna wymaga aktualizacji meta tagów dla lepszego SEO",
  },
  {
    type: "suggestion" as const,
    title: "Potencjał reklamowy",
    description:
      "Wykryto nowe słowa kluczowe o wysokim potencjale dla Google Ads",
  },
];

const Websites: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) return;
      try {
        setLoading(true);
        const websitesData = await websiteService.getWebsites(user.uid);
        setWebsites(websitesData);
      } catch (err) {
        console.error("Error loading websites:", err);
        setError("Wystąpił błąd podczas ładowania danych");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

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
        <h1 className="text-3xl font-bold text-white">Strony WWW</h1>
        <Button
          variant="primary"
          onClick={() => navigate("/pl/public/url-analysis-step1")}
        >
          + Analizuj nową stronę
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Monitorowane strony"
          value={websites.length}
          color="blue"
        />
        <StatsCard
          title="Łączny ruch"
          value={websites.reduce(
            (sum, site) => sum + (site.analytics?.visitors || 0),
            0
          )}
          color="green"
        />
        <StatsCard title="Średni czas" value="2:45" color="purple" />
        <StatsCard
          title="Do aktualizacji"
          value={websites.filter((w) => w.status === "needs_update").length}
          color="yellow"
        />
      </div>

      <Card title="Monitorowane strony">
        <Table
          headers={["Nazwa", "URL", "Status", "Ostatnia analiza"]}
          data={websites.map((website) => ({
            id: website.id, // Dodajemy id do danych
            nazwa: website.name,
            url: website.url,
            status: website.status,
            "ostatnia analiza": new Date(
              website.lastAnalysis
            ).toLocaleDateString(),
          }))}
          actions={(row) => (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/pl/admin/website/${row.id}`)}
            >
              Szczegóły
            </Button>
          )}
        />
      </Card>

      <div className="mt-8">
        <RecommendationCard recommendations={mockRecommendations} />
      </div>
    </div>
  );
};

export default Websites;

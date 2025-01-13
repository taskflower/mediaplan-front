import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { websiteService } from "../../services/firebase";
import { Table } from "../../components/ Table";

interface StaticAnaliticsProps {
  initialData?: any; // Opcjonalne dane wejściowe
}

const StaticAnalitics: React.FC<StaticAnaliticsProps> = ({ initialData }) => {
  const { id } = useParams<{ id: string }>(); // Pobierz ID z parametrów routingu
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>("");
  const [websiteData, setWebsiteData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadWebsiteData = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Jeśli mamy `id` w parametrach URL, ładujemy dane z Firebase na podstawie `id`
        if (id) {
          const website = await websiteService.getWebsite(id);
          if (!website) {
            setError("Nie znaleziono strony o podanym ID.");
            return;
          }
          setWebsiteData(website);
          setUrl(website.url);
        } else {
          // Jeśli brak `id`, sprawdź sesję i załaduj dane na podstawie `url`
          const storedUrl = sessionStorage.getItem("analysisUrl");
          if (!storedUrl) {
            navigate("/pl/public/url-analysis-step1");
            return;
          }

          setUrl(storedUrl);

          const website = await websiteService.getWebsiteByUrl(storedUrl);
          if (!website) {
            setError("Nie znaleziono szczegółowych danych analizy.");
            return;
          }

          setWebsiteData(website);
        }
      } catch (err) {
        console.error("Error loading website data:", err);
        setError(
          "Wystąpił błąd podczas ładowania danych strony. Spróbuj ponownie później."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadWebsiteData();
  }, [id, navigate]);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.6) return "bg-green-100 text-green-700";
    if (sentiment >= 0.4) return "bg-blue-100 text-blue-700";
    return "bg-red-100 text-red-700";
  };

  const getFontSize = (sentiment: number) => {
    const baseSize = 14;
    const scale = 1 + sentiment;
    return Math.round(baseSize * scale);
  };

  if (isLoading) {
    return (
      <div className="px-4 py-8">
        <Card>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Wczytywanie wyników analizy...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8">
        <Card>
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        </Card>
      </div>
    );
  }

  // Prepare metrics data for the Table component
  const metricsHeaders = ["Metryka", "Wartość"];
  const metricsData = [
    { metryka: "Liczba znaków", wartość: websiteData?.metrics?.charCount || 0 },
    { metryka: "Liczba słów", wartość: websiteData?.metrics?.wordCount || 0 },
    { metryka: "Liczba akapitów", wartość: websiteData?.metrics?.paragraphCount || 0 },
    { metryka: "Liczba nagłówków", wartość: websiteData?.metrics?.headingsCount || 0 },
    {
      metryka: "Średnia długość słowa",
      wartość: websiteData?.metrics?.averageWordLength?.toFixed(2) || "0.00",
    },
    { metryka: "Język", wartość: websiteData?.metrics?.language || "nieznany" },
  ];

  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-sm text-gray-600">Obrazy</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {websiteData?.images?.length || 0}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600">Linki wewnętrzne</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {websiteData?.links?.internal || 0}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600">Linki zewnętrzne</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {websiteData?.links?.external || 0}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Metrics Table */}
        <div className="lg:col-span-3">
          <Table headers={metricsHeaders} data={metricsData} />
        </div>

        {/* Sentiment Score */}
        {websiteData?.metrics?.sentiment?.score !== undefined && (
          <Card>
            <div className="text-sm text-gray-600 mb-2">
              Ogólny wynik sentymentu
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {(websiteData.metrics.sentiment.score * 100).toFixed()}%
            </div>
          </Card>
        )}
      </div>

      {/* Keywords Cloud */}
      {websiteData?.metrics?.sentiment?.keywords && (
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-4">Kluczowe słowa</div>
          <Card>
            <div className="flex flex-wrap gap-2 justify-center">
              {websiteData.metrics.sentiment.keywords.map(
                (keyword: any, index: number) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full ${getSentimentColor(
                      keyword.sentiment
                    )}`}
                    style={{
                      fontSize: `${getFontSize(keyword.sentiment)}px`,
                    }}
                  >
                    {keyword.word}
                  </span>
                )
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default StaticAnalitics;

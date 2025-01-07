// src/pages/public/url-analysis/Step2.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("analysisUrl");
    if (!storedUrl) {
      navigate("/pl/public/url-analysis-step1");
      return;
    }
    setUrl(storedUrl);
  }, [navigate]);

  const handlePreviousStep = () => {
    navigate("/pl/public/url-analysis-step1");
  };

  const handleFinish = () => {
    if (!isAuthorized) {
      return;
    }
    navigate("/pl/public/url-analysis-step3"); // Zmiana z url-analysis-processing na step3
  };
  return (
    <div className="px-4 py-8">
      <Card>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Krok 2: Potwierdź adres URL
          </h2>
          <p className="text-gray-300 mb-4">
            Proszę potwierdzić, że chcesz przeanalizować poniższy adres URL:
          </p>
          <p className="bg-gray-700 p-3 rounded-lg text-white mb-6">{url}</p>

          {/* Checkbox deklaracji */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAuthorized}
                onChange={(e) => setIsAuthorized(e.target.checked)}
                className="mt-1 checkbox checkbox-primary"
              />
              <span className="text-sm text-gray-300">
                Oświadczam, że jestem osobą uprawnioną do przeglądania i
                analizowania podanej strony internetowej. Rozumiem, że analiza
                strony bez odpowiednich uprawnień może naruszać warunki jej
                użytkowania.
              </span>
            </label>
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              Wstecz
            </Button>
            <Button
              variant="primary"
              onClick={handleFinish}
              disabled={!isAuthorized}
            >
              {!isAuthorized ? "Potwierdź uprawnienia" : "Potwierdź"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Step2;

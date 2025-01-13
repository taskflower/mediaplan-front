// src/pages/public/url-analysis/Step2.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { StepHeader, UrlPreview, CheckboxField } from "../../../components/form";

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

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

  const handleNextStep = () => {
    if (!isAuthorized) {
      setError("Proszę potwierdzić uprawnienia przed kontynuacją");
      return;
    }
    navigate("/pl/public/url-analysis-step3");
  };

  return (
    <div className="container mx-auto px-4">
      <StepHeader
        step={2}
        title="Potwierdzenie adresu URL"
        description="Proszę potwierdzić, że chcesz przeanalizować poniższy adres URL."
      />

      <Card>
        <div className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          )}

          <UrlPreview url={url} />

          <CheckboxField
            label="Oświadczam, że jestem osobą uprawnioną do przeglądania i analizowania podanej strony internetowej."
            checked={isAuthorized}
            onChange={(e) => {
              setIsAuthorized(e.target.checked);
              if (error) setError("");
            }}
            error={!isAuthorized && error}
          />

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={handlePreviousStep}>
              Wstecz
            </Button>
            <Button
              variant="primary"
              onClick={handleNextStep}
              disabled={!isAuthorized}
            >
              {!isAuthorized ? "Potwierdź uprawnienia" : "Dalej"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Step2;

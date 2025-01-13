import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { TextField, StepHeader } from "../../../components/form";

const Step1: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      return "Proszę podać adres URL";
    }
    try {
      const urlObj = new URL(url);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        return "URL musi zaczynać się od http:// lub https://";
      }
      return "";
    } catch {
      return "Proszę podać poprawny adres URL";
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    if (!newUrl.trim()) {
      setError("Proszę podać adres URL");
      return;
    }

    if (newUrl.startsWith("http://") || newUrl.startsWith("https://")) {
      setError("");
    } else if (isTouched) {
      setError(validateUrl(newUrl));
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    setError(validateUrl(url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      sessionStorage.setItem("analysisUrl", url);
      navigate("/pl/public/url-analysis-step2");
    } catch (err) {
      setError("Wystąpił błąd podczas przetwarzania URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <StepHeader
        step={1}
        title="Rozpocznij analizę strony"
        description="Podaj adres URL strony, którą chcesz przeanalizować."
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="URL strony do analizy"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={handleUrlChange}
            onBlur={handleBlur}
            disabled={isLoading}
            error={error}
            required
            helpText="Wprowadź pełny adres URL zaczynający się od http:// lub https://"
          />

          {isLoading && (
            <div className="flex justify-center">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Sprawdzanie..." : "Dalej"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Step1;

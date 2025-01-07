import React from "react";

import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="w-full">
        <div className="sm:pt-12 sm:bg-gray-950/30 sm:rounded-t-2xl sm:min-h-24">
          <div className="w-full flex flex-col">
            <div className="flex flex-col grow justify-start p-4 sm:p-6 md:p-12 w-full mx-auto max-w-5xl">
              <div className="w-full flex flex-col gap-0.5 tracking-tight">
                {/* Hero section */}
                <div className="mb-6 text-center">
                  <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    AI Marketing Planner
                  </h1>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Zautomatyzuj swoją strategię marketingową używając sztucznej
                    inteligencji
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg
          width="500"
          height="80"
          viewBox="0 0 500 80"
          preserveAspectRatio="none"
          className="w-full hidden sm:block fill-gray-950/30"
        >
          <path d="M0,0 L0,40 Q250,80 500,40 L500,0 Z"></path>
        </svg>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card
          title="Analiza Stron"
          subtitle="Automatyczna analiza stron internetowych i generowanie rekomendacji"
        >
          <p className="text-gray-300 mb-4">
            Nasz system analizuje strukturę, treść i meta dane stron www,
            dostarczając szczegółowych wskazówek optymalizacyjnych.
          </p>
          <Button variant="primary" size="sm">
            Dowiedz się więcej
          </Button>
        </Card>

        <Card
          title="AI Marketing"
          subtitle="Personalizowane strategie marketingowe oparte o AI"
        >
          <p className="text-gray-300 mb-4">
            Wykorzystujemy zaawansowane algorytmy AI do tworzenia
            spersonalizowanych strategii marketingowych dostosowanych do Twoich
            potrzeb.
          </p>
          <Button variant="primary" size="sm">
            Sprawdź możliwości
          </Button>
        </Card>

        <Card
          title="Raporty i Analizy"
          subtitle="Szczegółowe raporty i rekomendacje"
        >
          <p className="text-gray-300 mb-4">
            Otrzymuj szczegółowe raporty i konkretne rekomendacje działań do
            podjęcia w celu poprawy efektywności.
          </p>
          <Button variant="primary" size="sm">
            Zobacz przykłady
          </Button>
        </Card>
      </div>

      {/* CTA section */}
      <Card>
  <div className="text-center">
    <h2 className="text-2xl font-bold text-white mb-4">
      Rozpocznij optymalizację swojego marketingu już dziś
    </h2>
    <p className="text-gray-300 mb-6">
      Wypróbuj naszą darmową analizę strony internetowej i przekonaj się o możliwościach AI w marketingu.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/pl/public/url-analysis-step1">
        <Button variant="primary" size="lg">
          Rozpocznij darmową analizę
        </Button>
      </Link>
      <Link to="/pl/public/login">
        <Button variant="secondary" size="lg">
          Zaloguj się do pełnej wersji
        </Button>
      </Link>
    </div>
  </div>
</Card>
    </div>
  );
};

export default Home;

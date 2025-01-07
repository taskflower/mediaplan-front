// src/pages/admin/Analytics.tsx
import React from 'react';
import { Card } from '../../components/Card';

const Analytics: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Analityka</h1>
      
      <div className="space-y-6">
        <Card title="Wydatki na platformach">
          <div className="h-64 flex items-center justify-center text-gray-400">
            Miejsce na wykres wydatków
          </div>
        </Card>
        
        <Card title="Trendy konwersji">
          <div className="h-64 flex items-center justify-center text-gray-400">
            Miejsce na wykres konwersji
          </div>
        </Card>

        <Card title="Wydajność kampanii">
          <div className="h-64 flex items-center justify-center text-gray-400">
            Miejsce na analizę wydajności
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
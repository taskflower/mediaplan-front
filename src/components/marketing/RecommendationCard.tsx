// src/components/marketing/RecommendationCard.tsx
import React from 'react';
import { Card } from '../Card';

interface Recommendation {
  type: 'warning' | 'suggestion';
  title: string;
  description: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => {
  const getIcon = (type: 'warning' | 'suggestion') => {
    return type === 'warning' ? '⚠️' : '💡';
  };

  const getColorClass = (type: 'warning' | 'suggestion') => {
    return type === 'warning' ? 'text-yellow-400' : 'text-blue-400';
  };

  return (
    <Card title="Rekomendacje">
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
            <div className={getColorClass(rec.type)}>
              {getIcon(rec.type)}
            </div>
            <div>
              <h4 className="font-semibold text-white">{rec.title}</h4>
              <p className="text-gray-300">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
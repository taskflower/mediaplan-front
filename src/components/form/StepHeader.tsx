// src/components/form/StepHeader.tsx
import React from 'react';

interface StepHeaderProps {
  step: number;
  title: string;
  description: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ step, title, description }) => {
  return (
    <div className="mb-8 text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-bold mb-4">
        {step}
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-gray-800 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-gray-400 text-lg">
        {description}
      </p>
    </div>
  );
};
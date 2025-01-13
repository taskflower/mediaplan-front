import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-4xl overflow-hidden">
      <div className="p-4 sm:p-6">
        {title && <h2 className="text-xl font-bold  mb-2">{title}</h2>}
        {subtitle && <p className="mb-4">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

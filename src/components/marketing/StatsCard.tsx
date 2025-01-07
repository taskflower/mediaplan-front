// src/components/marketing/StatsCard.tsx
import React from "react";
import { Card } from "../Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  color: "blue" | "green" | "purple" | "yellow" | "red";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  color,
}) => {
  const colorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    yellow: "text-yellow-500",
    red: "text-red-500",
  };

  return (
    <Card>
      <div className="text-center">
        <h3 className="text-lg text-gray-400">{title}</h3>
        <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
      </div>
    </Card>
  );
};

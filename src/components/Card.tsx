import React from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        {title && <h2 className="text-xl font-bold text-white mb-2">{title}</h2>}
        {subtitle && <p className="text-gray-300 mb-4">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
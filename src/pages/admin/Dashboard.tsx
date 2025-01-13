import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Marketing Planner</h1>
          <p className="mt-2">Witaj, {user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div 
            className="cursor-pointer p-6 text-center"
            onClick={() => navigate('/pl/admin/websites')}
          >
            <h2 className="text-xl font-bold mb-2">Strony WWW</h2>
            <p>Zarządzaj i analizuj strony internetowe</p>
          </div>
        </Card>

        <Card>
          <div 
            className="cursor-pointer p-6 text-center"
            onClick={() => navigate('/pl/admin/campaigns')}
          >
            <h2 className="text-xl font-bold mb-2">Kampanie</h2>
            <p>Zarządzaj kampaniami marketingowymi</p>
          </div>
        </Card>

        <Card>
          <div 
            className="cursor-pointer p-6 text-center"
            onClick={() => navigate('/pl/admin/analytics')}
          >
            <h2 className="text-xl font-bold mb-2">Analityka</h2>
            <p>Zobacz statystyki i raporty</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
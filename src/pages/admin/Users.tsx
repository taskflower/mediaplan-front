import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi'; // Import ikony powrotu
import { Button } from '../../components/Button';
import { Table } from '../../components/ Table';
import userService from '../../services/userService';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await userService.getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Wystąpił błąd podczas ładowania użytkowników');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const headers = ['Name', 'Email', 'Role'];

  const renderActions = (user: any) => (
    <>
      <Button variant="primary" size="sm" className="mr-2">
        Edytuj
      </Button>
      <Button variant="danger" size="sm">
        Usuń
      </Button>
    </>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Nagłówek */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/pl/admin/dashboard')}
          >
            <FiChevronLeft className="text-xl h-7" />
          </Button>
          <h1 className="text-3xl font-bold">Zarządzanie Użytkownikami</h1>
        </div>
        <Button
          variant="primary"
          onClick={() => console.log('Dodaj nowego użytkownika')}
        >
          + Dodaj użytkownika
        </Button>
      </div>

      {/* Tabela */}
      <Table
        headers={headers}
        data={users.map(user => ({
          name: user.name || 'Brak danych',
          email: user.email || 'Brak danych',
          role: user.role || 'Użytkownik',
        }))}
        actions={renderActions}
      />
    </div>
  );
};

export default Users;

import React from 'react'
import { Button } from '../../components/Button'
import { Table } from '../../components/ Table'


const Users: React.FC = () => {
  const users = [
    { name: 'Jan Kowalski', email: 'jan@example.com', role: 'Admin' },
    { name: 'Anna Nowak', email: 'anna@example.com', role: 'User' },
    { name: 'Piotr Wiśniewski', email: 'piotr@example.com', role: 'Editor' },
  ]

  const headers = ['Name', 'Email', 'Role']

  const renderActions = (user: any) => (
    <>
      <Button variant="primary" size="sm" className="mr-2">
        Edytuj
      </Button>
      <Button variant="danger" size="sm">
        Usuń
      </Button>
    </>
  )

  return (
    <div className="p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-white">
        Zarządzanie Użytkownikami
      </h1>
      
      <Table
        headers={headers}
        data={users}
        actions={renderActions}
      />
    </div>
  )
}

export default Users
// src/pages/admin/AuthCheck.tsx
import { FC, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { AuthStatus } from '../../components/AuthStatus'

const AuthCheck: FC = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading && user) {
      navigate('/pl/admin/dashboard')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="Dostęp do panelu administratora" subtitle="Zaloguj się aby kontynuować">
        <div className="flex flex-col items-center gap-4">
          <AuthStatus />
        </div>
      </Card>
    </div>
  )
}

export default AuthCheck
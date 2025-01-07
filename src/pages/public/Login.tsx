import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import { Card } from '../../components/Card'


const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/pl/admin/dashboard'

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Error during sign in:', error)
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4">
      {/* Hero section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
          Witaj w AI Marketing Planner
        </h1>
        <p className="text-gray-300 text-lg max-w-md">
          Zaloguj się, aby uzyskać dostęp do zaawansowanych narzędzi marketingowych opartych o AI
        </p>
      </div>

      {/* Login card */}
      <Card
        title="Logowanie"
        subtitle="Wybierz preferowaną metodę logowania"
      >
        <div className="space-y-6">
          {/* Google login button */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-600 hover:border-gray-500 bg-gray-700/50 hover:bg-gray-700 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-white font-medium">
              Kontynuuj z Google
            </span>
          </button>

          {/* Info section */}
          <div className="text-center text-sm text-gray-400">
            <p>Logując się akceptujesz nasze</p>
            <div className="space-x-1">
              <a href="#" className="text-blue-400 hover:text-blue-300">Warunki użytkowania</a>
              <span>oraz</span>
              <a href="#" className="text-blue-400 hover:text-blue-300">Politykę prywatności</a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Login
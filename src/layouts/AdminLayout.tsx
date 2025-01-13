import { FC, PropsWithChildren, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useAuth } from '../contexts/AuthContext'

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/pl/public/login')
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="fixed top-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm bg-gray-950 border-b border-gray-200 z-50">
        <div className="mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/pl/admin/dashboard" className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap">
                AI Marketing Planner
              </Link>
              <div className="hidden sm:flex items-center space-x-4 ml-4">
                <Link to="/pl/admin/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
                <Link to="/pl/admin/users" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Użytkownicy
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-gray-300">{user.email}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Wyloguj
                  </button>
                </div>
              )}
              {/* Mobile logout button */}
              <button 
                onClick={handleLogout}
                className="sm:hidden px-2 py-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all text-sm"
              >
                Wyloguj
              </button>
              <button
                className="sm:hidden ml-2 text-gray-300 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-gray-900 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/pl/admin/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/pl/admin/users"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Użytkownicy
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className="pt-14 sm:pt-16 min-h-screen bg-gray-50">
        <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
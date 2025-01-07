import { FC, PropsWithChildren } from 'react';
import { AuthStatus } from '../components/AuthStatus';
import { Link } from 'react-router-dom';

export const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="fixed top-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm bg-gray-900 border-b border-gray-700 z-50">
        <div className="mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <Link to="/pl/public/home" className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI Marketing Planner
              </Link>
            </div>
            <div className="flex-none">
              <AuthStatus />
            </div>
          </div>
        </div>
      </header>
      <main className="pt-14 sm:pt-16 flex-grow">
        <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {children}
        </div>
      </main>
      <footer className="bg-gray-950 text-gray-300 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2025 AI Marketing Planner. Wszelkie prawa zastrzeżone.</p>
          <div className="flex justify-center mt-4 space-x-6">
            <Link to="/pl/public/privacy" className="text-gray-400 hover:text-white text-sm">
              Polityka prywatności
            </Link>
            <Link to="/pl/public/terms" className="text-gray-400 hover:text-white text-sm">
              Warunki użytkowania
            </Link>
            <Link to="/pl/public/contact" className="text-gray-400 hover:text-white text-sm">
              Kontakt
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

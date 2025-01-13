import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/pl/public/login" state={{ from: location }} replace />
    );
  }
  // Jeśli użytkownik jest zalogowany, renderuj zawartość
  console.log("User authenticated. Rendering protected route.");

  return <>{children}</>;
};

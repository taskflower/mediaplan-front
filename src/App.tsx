import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageWrapper } from "./components/PageWrapper";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Import all pages
import { pages } from "./pages";

const App: FC = () => {
  // Helper function to generate routes from pages object
  const generateRoutes = (section: string, layout: "admin" | "public") => {
    return Object.entries(pages[section]).map(([path, Component]) => (
      <Route 
        key={path} 
        path={`/:lang/${section}/${path}`} 
        element={
          layout === "admin" ? (
            <ProtectedRoute>
              <PageWrapper defaultLayout={layout}>
                <Component />
              </PageWrapper>
            </ProtectedRoute>
          ) : (
            <PageWrapper defaultLayout={layout}>
              <Component />
            </PageWrapper>
          )
        } 
      />
    ));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-100">
        <BrowserRouter>
          <Routes>
            {/* Admin routes */}
            {generateRoutes("admin", "admin")}

            {/* Public routes */}
            {generateRoutes("public", "public")}

            {/* Default redirect */}
            <Route
              path="/*"
              element={<Navigate to="/pl/admin/dashboard" replace />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
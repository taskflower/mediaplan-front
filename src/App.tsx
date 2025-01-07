import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageWrapper } from "./components/PageWrapper";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import WebsiteDetails from "./pages/admin/WebsiteDetails";
import NewCampaign from "./pages/admin/NewCampaign";
import CampaignDetails from "./pages/admin/CampaignDetails";

const App: FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-100">
        <BrowserRouter>
          <Routes>
            {/* Admin auth check route */}
            <Route
              path="/:lang/admin/auth-check"
              element={<PageWrapper defaultLayout="admin" />}
            />

            {/* Admin routes - protected */}
            <Route
              path="/:lang/admin/:page"
              element={
                <ProtectedRoute>
                  <PageWrapper defaultLayout="admin" />
                </ProtectedRoute>
              }
            />

            {/* Admin detail routes */}
            <Route
              path="/:lang/admin/website/:id"
              element={
                <ProtectedRoute>
                  <WebsiteDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:lang/admin/campaigns/new"
              element={
                <ProtectedRoute>
                  <NewCampaign />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:lang/admin/campaign/:id"
              element={
                <ProtectedRoute>
                  <CampaignDetails />
                </ProtectedRoute>
              }
            />

            {/* Public routes */}
            <Route
              path="/:lang/public/:page"
              element={<PageWrapper defaultLayout="public" />}
            />

            {/* Default redirect */}
            <Route
              path="/*"
              element={<Navigate to="/pl/admin/auth-check" replace />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
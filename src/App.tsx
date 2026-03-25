import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// doing lazy load for bonus points
const AuthPage = lazy(() => import('./features/auth/AuthPage'));
const DashboardPage = lazy(() => import('./features/patients/DashboardPage'));
const PatientDetailsPage = lazy(() => import('./features/patients/PatientDetailsPage'));
const AnalyticsPage = lazy(() => import('./features/analytics/AnalyticsPage'));
// using main layout shell
const MainLayout = lazy(() => import('./layouts/MainLayout'));

// showing this while page is loading
const PageLoader = () => (
  <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <div className="spinner" style={{ color: 'hsl(var(--primary))', width: '2rem', height: '2rem' }}></div>
  </div>
);

// checks if user is logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const { isInitialized, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (!isInitialized) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="patients/:id" element={<PatientDetailsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;

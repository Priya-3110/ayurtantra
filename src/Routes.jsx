import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PatientManagement from './pages/patient-management';
import LoginPage from './pages/login';
import PatientProfile from './pages/patient-profile';
import Dashboard from './pages/dashboard';
import FoodDetails from './pages/food-details';
import DietChartGenerator from './pages/diet-chart-generator';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/patient-profile/:patientId" element={<PatientProfile />} />
        <Route path="/food-details" element={<FoodDetails />} />
        <Route path="/food-details/:foodId" element={<FoodDetails />} />
        <Route path="/diet-chart-generator" element={<DietChartGenerator />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<NotFound />} />
        <Route path="/help" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import DashboardHome from "pages/dashboard-home";
import StockDetailsAnalysis from "pages/stock-details-analysis";
import PortfolioTracker from "pages/portfolio-tracker";
import StockScreener from "pages/stock-screener";
import MarketAnalyticsHub from "pages/market-analytics-hub";
import ProfileSettings from "pages/profile-settings";
import APIIntegrationManager from "pages/api-integration-manager";
import APIDataMappingStudio from "pages/api-data-mapping-studio";
import ApiMonitoringDashboard from "pages/api-monitoring-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/stock-details-analysis" element={<StockDetailsAnalysis />} />
          <Route path="/portfolio-tracker" element={<PortfolioTracker />} />
          <Route path="/stock-screener" element={<StockScreener />} />
          <Route path="/market-analytics-hub" element={<MarketAnalyticsHub />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/api-integration-manager" element={<APIIntegrationManager />} />
          <Route path="/api-data-mapping-studio" element={<APIDataMappingStudio />} />
          <Route path="/api-monitoring-dashboard" element={<ApiMonitoringDashboard />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
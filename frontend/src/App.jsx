import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Layout/Sidebar";
import TopBar from "./components/Layout/TopBar";
import DetectionPage from "./components/Detection/DetectionPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import CCTVMapPage from "./components/CCTVMap/CCTVMapPage";
import ReportsPage from "./components/Reports/ReportsPage";
import SettingsPage from "./components/Settings/SettingsPage";
import NVRDevicesPage from "./components/NVR/NVRDevicesPage";
import ResponderUnitsPage from "./components/Responder/ResponderUnitsPage";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <div
            className="flex h-screen overflow-hidden"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <Sidebar
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopBar />
              <main
                className="flex-1 overflow-y-auto p-6"
                style={{ height: "calc(100vh - 64px)" }}
              >
                <Routes>
                  <Route path="/" element={<DetectionPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/cctv" element={<CCTVMapPage />} />
                  <Route path="/nvr" element={<NVRDevicesPage />} />
                  <Route path="/responder" element={<ResponderUnitsPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

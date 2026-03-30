import React from "react";
import { NavLink } from "react-router-dom";
import {
  Zap,
  LayoutDashboard,
  Camera,
  FileBarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Radio,
  Shield,
  Server,
  Siren,
} from "lucide-react";

const navItems = [
  { to: "/", icon: Radio, label: "Detection", end: true },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/cctv", icon: Camera, label: "CCTV & Map", end: false },
  { to: "/nvr", icon: Server, label: "NVR Devices", end: false },
  { to: "/responder", icon: Siren, label: "Responder Units", end: false },
  { to: "/reports", icon: FileBarChart2, label: "Reports", end: false },
  { to: "/settings", icon: Settings, label: "Settings", end: false },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className="flex flex-col transition-all duration-300 ease-in-out relative"
      style={{
        width: collapsed ? "68px" : "230px",
        backgroundColor: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4"
        style={{
          borderBottom: "1px solid var(--sidebar-border)",
          minHeight: "64px",
        }}
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: 38,
            height: 38,
            background: "linear-gradient(135deg, #0d9488, #0891b2)",
          }}
        >
          <img src="/logo.webp" alt="" />
        </div>
        {!collapsed && (
          <div>
            <div
              className="font-bold text-sm leading-tight tracking-tight"
              style={{ color: "var(--sidebar-fg)" }}
            >
              DETECT
            </div>
            <div className="text-xs" style={{ color: "var(--sidebar-label)" }}>
              CCTV Accident AI
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150"
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? "rgba(13,148,136,0.12)"
                : "transparent",
              color: isActive
                ? "var(--sidebar-nav-active)"
                : "var(--sidebar-nav-inactive)",
            })}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* System Status */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <div
            className="px-4 py-3 rounded-xl"
            style={{
              backgroundColor: "var(--sidebar-status)",
              border: "1px solid var(--sidebar-status-border)",
            }}
          >
            <div
              className="text-xs font-semibold mb-2 tracking-wider"
              style={{ color: "var(--sidebar-label)" }}
            >
              SYSTEM STATUS
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">
                All Systems Operational
              </span>
            </div>
            <div
              className="text-xs mt-1"
              style={{ color: "var(--sidebar-label)" }}
            >
              4 Cameras Online
            </div>
          </div>
        </div>
      )}

      {/* Operator Account — bottom of sidebar */}
      <div
        className="px-3 pb-5"
        style={{
          borderTop: "1px solid var(--sidebar-border)",
          paddingTop: "12px",
        }}
      >
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
          style={{
            backgroundColor: "var(--sidebar-status)",
            border: "1px solid var(--sidebar-status-border)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #0d9488, #0891b2)",
              color: "#fff",
            }}
          >
            OA
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-semibold leading-tight"
                  style={{ color: "var(--sidebar-fg)" }}
                >
                  Operator A
                </div>
                <div
                  className="flex items-center gap-1 mt-0.5"
                  style={{ color: "var(--sidebar-label)" }}
                >
                  <Shield size={10} />
                  <span className="text-xs">Admin</span>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
            </>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-10 hover:bg-blue-500 transition-colors"
        style={{
          backgroundColor: "var(--collapse-btn)",
          border: "1px solid var(--collapse-btn-border)",
        }}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight
            size={12}
            style={{ color: "var(--collapse-btn-icon)" }}
          />
        ) : (
          <ChevronLeft
            size={12}
            style={{ color: "var(--collapse-btn-icon)" }}
          />
        )}
      </button>
    </aside>
  );
}

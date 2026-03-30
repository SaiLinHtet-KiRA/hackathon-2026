import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Camera,
  Plus,
  Edit2,
  Play,
  Trash2,
  Wifi,
  WifiOff,
  Wrench,
  MapPin,
  X,
  Save,
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  ChevronDown,
} from "lucide-react";
import { cameras as initialCameras, incidents } from "../../data/mockData";
import InvestigationCenter from "./InvestigationCenter";
import { useGetCCTVsQuery, useUpdateCCTVsMutation } from "../../redux/api/cctv";
import Loader from "../Loader";

// ─── Leaflet div icons ────────────────────────────────────────────────────────
const makeIcon = (color, size = 14, pulse = false) =>
  L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border-radius:50%;
      border:2.5px solid #fff;
      box-shadow:0 0 8px ${color};
      ${pulse ? "animation:leaflet-pulse 1.4s infinite;" : ""}
    "></div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)],
  });

const cameraIcon = makeIcon("#3b82f6", 13);
const activeCameraIcon = makeIcon("#f59e0b", 18, true);
const incidentIcon = makeIcon("#ef4444", 18);

function MapFly({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center[0], center[1], zoom]);
  return null;
}

// ─── Cursor coordinate tracker ────────────────────────────────────────────────
function CoordinateTracker() {
  const [coords, setCoords] = useState(null);
  useMapEvents({
    mousemove: (e) => setCoords({ lat: e.latlng.lat, lng: e.latlng.lng }),
    mouseout: () => setCoords(null),
  });
  if (!coords) return null;
  return (
    <div
      className="leaflet-bottom leaflet-left"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="leaflet-control font-mono"
        style={{
          margin: "0 0 10px 10px",
          padding: "5px 12px",
          borderRadius: "8px",
          fontSize: "12px",
          letterSpacing: "0.02em",
          backgroundColor: "rgba(10,15,28,0.80)",
          backdropFilter: "blur(6px)",
          color: "#e2e8f0",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ color: "#94a3b8", fontSize: "10px" }}>📍</span>
        <span style={{ color: "#64748b" }}>Lat</span>
        <span style={{ color: "#f1f5f9", fontWeight: 600 }}>
          {coords.lat.toFixed(6)}°
        </span>
        <span style={{ color: "#334155" }}>|</span>
        <span style={{ color: "#64748b" }}>Lng</span>
        <span style={{ color: "#f1f5f9", fontWeight: 600 }}>
          {coords.lng.toFixed(6)}°
        </span>
      </div>
    </div>
  );
}

// ─── Status config ────────────────────────────────────────────────────────────
const statusConfig = {
  Online: { color: "#22c55e", label: "Active" },
  Offline: { color: "#6b7280", label: "Offline" },
  Maintenance: { color: "#f59e0b", label: "Maintenance" },
};

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  const color =
    type === "success" ? "#22c55e" : type === "error" ? "#ef4444" : "#3b82f6";
  const Icon =
    type === "success" ? CheckCircle : type === "error" ? AlertTriangle : Info;
  return (
    <div
      className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium z-[9999] shadow-2xl"
      style={{
        backgroundColor: "#fff",
        border: `1px solid ${color}`,
        color: "#111827",
        minWidth: "260px",
      }}
    >
      <Icon size={17} style={{ color, flexShrink: 0 }} />
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="opacity-40 hover:opacity-80 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── NVR options for Link modal ───────────────────────────────────────────────
const NVR_OPTIONS = [
  {
    id: "NVR_001",
    label: "NVR_Siam_Square_001",
    channels: ["Channel 4 (Available)", "Channel 9 (Available)"],
  },
  {
    id: "NVR_002",
    label: "NVR_Sukhumvit_002",
    channels: Array.from(
      { length: 10 },
      (_, i) => `Channel ${i + 3} (Available)`,
    ),
  },
  {
    id: "NVR_003",
    label: "NVR_Silom_003",
    channels: Array.from(
      { length: 16 },
      (_, i) => `Channel ${i + 1} (Available)`,
    ),
  },
  {
    id: "NVR_004",
    label: "NVR_Ari_004",
    channels: [],
  },
];

// ─── Link Camera to NVR Channel Modal ─────────────────────────────────────────
function NVRLinkModal({ onConfirm, onClose }) {
  const [nvrId, setNvrId] = useState("");
  const [channel, setChannel] = useState("");
  const selectedNvr = NVR_OPTIONS.find((n) => n.id === nvrId);
  const channels = selectedNvr?.channels ?? [];

  const inputStyle = {
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
    borderRadius: "0.625rem",
    padding: "0.65rem 0.9rem",
    fontSize: "0.9rem",
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
  };
  const labelStyle = {
    color: "var(--fg)",
    fontSize: "0.875rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    display: "block",
  };

  const canConfirm = nvrId && channel;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.55)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "1.25rem",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.1rem 1.5rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              fontSize: "1.0625rem",
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Link Camera to NVR Channel
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "var(--subtle)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              color: "var(--fg2)",
              cursor: "pointer",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <p
            style={{
              color: "var(--fg2)",
              fontSize: "0.875rem",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Device Information
          </p>

          {/* NVR Device */}
          <div>
            <label style={labelStyle}>NVR Device *</label>
            <div style={{ position: "relative" }}>
              <select
                value={nvrId}
                onChange={(e) => {
                  setNvrId(e.target.value);
                  setChannel("");
                }}
                style={inputStyle}
              >
                <option value="">Select NVR device</option>
                {NVR_OPTIONS.map((n) => (
                  <option
                    key={n.id}
                    value={n.id}
                    disabled={n.channels.length === 0}
                  >
                    {n.label}
                    {n.channels.length === 0 ? " (No available channels)" : ""}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--fg3)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* NVR Channel */}
          <div>
            <label style={labelStyle}>NVR Channel *</label>
            <div style={{ position: "relative" }}>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                disabled={!nvrId || channels.length === 0}
                style={{
                  ...inputStyle,
                  opacity: !nvrId || channels.length === 0 ? 0.5 : 1,
                }}
              >
                <option value="">Select available channel</option>
                {channels.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--fg3)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.625rem",
              color: "var(--fg2)",
              padding: "0.55rem 1.5rem",
              fontSize: "0.9rem",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => canConfirm && onConfirm(nvrId, channel)}
            style={{
              backgroundColor: canConfirm ? "#3b82f6" : "#93c5fd",
              border: "none",
              borderRadius: "0.625rem",
              color: "#fff",
              padding: "0.55rem 1.5rem",
              fontSize: "0.9rem",
              cursor: canConfirm ? "pointer" : "not-allowed",
              fontWeight: 600,
              opacity: canConfirm ? 1 : 0.7,
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Camera Modal ─────────────────────────────────────────────────────────────
function CameraModal({ camera, onNext, onClose, showToast }) {
  const [update] = useUpdateCCTVsMutation();
  const [form, setForm] = useState(
    camera
      ? {
          deviceName: camera.name || "",
          deviceId: camera.id || "",
          status: camera.status === "Online" ? "Live" : camera.status || "Live",
          FPS: camera.FPS || "30 FPS",
          resolution: camera.resolution || "1920x1080P",
          rtsp: camera.rtsp || "",
          port: camera.port || 554,
          location: camera.location || "",
          videoCodec: camera.videoCodec || "H.265+",
        }
      : {
          deviceName: "",
          deviceId: "",
          status: "Live",
          FPS: "30 FPS",
          resolution: "1920x1080P",
          rtsp: "",
          port: 554,
          location: "",
          videoCodec: "H.265+",
        },
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const inputStyle = {
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
  };
  const labelStyle = {
    color: "var(--fg2)",
    fontSize: "0.8rem",
    fontWeight: 600,
    marginBottom: "0.35rem",
    display: "block",
  };

  function buildCamera() {
    const statusMap = {
      Live: "Online",
      Offline: "Offline",
      Maintenance: "Maintenance",
    };
    return {
      ...camera,
      id: form.deviceId,
      name: form.deviceName,
      status: statusMap[form.status] || "Online",
      location: form.location,
      rtsp: form.rtsp,
      port: form.port,
      FPS: form.FPS,
      resolution: form.resolution,
      videoCodec: form.videoCodec,
      aiHealth: camera?.aiHealth ?? 95,
      activityToday: camera?.activityToday ?? 0,
      lat: camera?.lat ?? 13.75,
      lng: camera?.lng ?? 100.52,
      coordinates: { x: 50, y: 50 },
    };
  }

  function handleSaveClick() {
    const camData = buildCamera();
    if (camera) {
      update(camData).then(() => showToast("Camera was successfully updated."));
    } else {
      // Adding new — go to NVR link step
      onNext(camData);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "1.25rem",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.1rem 1.5rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              fontSize: "1.0625rem",
              color: "var(--fg)",
              margin: 0,
            }}
          >
            {camera ? "Edit Camera" : "Add New Camera"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "var(--subtle)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              color: "var(--fg2)",
              cursor: "pointer",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            maxHeight: "68vh",
            overflowY: "auto",
          }}
        >
          {/* Row 1: Device Name / Device ID / Status */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.2fr 0.8fr",
              gap: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>Device Name *</label>
              <input
                style={inputStyle}
                value={form.deviceName}
                placeholder="Cam_001_Changi"
                onChange={(e) => set("deviceName", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Device ID *</label>
              <input
                style={inputStyle}
                value={form.deviceId}
                placeholder="CAM_001_013"
                onChange={(e) => set("deviceId", e.target.value)}
                disabled={!!camera}
              />
            </div>
            <div>
              <label style={labelStyle}>Status *</label>
              <select
                style={inputStyle}
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                {["Live", "Offline", "Maintenance"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Frame Rate / Resolution / RTSP Stream Link */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1fr 1.5fr",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            <div>
              <label style={labelStyle}>Frame Rate (FPS)</label>
              <select
                style={inputStyle}
                value={form.FPS + " FPS"}
                onChange={(e) => set("FPS", e.target.value)}
              >
                {["15 FPS", "24 FPS", "30 FPS", "60 FPS"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Resolution</label>
              <select
                style={inputStyle}
                value={form.resolution}
                onChange={(e) => set("resolution", e.target.value)}
              >
                {["1280x720P", "1920x1080P", "2560x1440P", "3840x2160P"].map(
                  (s) => (
                    <option key={s}>{s}</option>
                  ),
                )}
              </select>
            </div>
            <div>
              <label style={labelStyle}>RTSP Stream Link *</label>
              <input
                style={inputStyle}
                value={form.rtsp}
                placeholder="rtsp://veridian.net/live/stream"
                onChange={(e) => set("rtsp", e.target.value)}
              />
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "var(--fg3)",
                  marginTop: "0.3rem",
                  lineHeight: 1.5,
                  margin: "0.3rem 0 0",
                }}
              >
                Supports HLS (recommended) and FLV formats, and only supports
                H264 encoding.
              </p>
            </div>
          </div>

          {/* Row 3: RTSP Port / Location / Video Codec */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.4fr 0.9fr",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            <div>
              <label style={labelStyle}>RTSP Port *</label>
              <input
                type="number"
                style={inputStyle}
                value={form.port}
                placeholder="554"
                onChange={(e) => set("port", Number(e.target.value))}
              />
            </div>
            <div>
              <label style={labelStyle}>Location *</label>
              <textarea
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 76,
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                }}
                value={form.location}
                placeholder="FedEx Site"
                rows={3}
                onChange={(e) => set("location", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Video Codec</label>
              <select
                style={inputStyle}
                value={form.videoCodec}
                onChange={(e) => set("videoCodec", e.target.value)}
              >
                {["H.264", "H.265+", "HVC133X", "AV1"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.625rem",
              color: "var(--fg2)",
              padding: "0.55rem 1.5rem",
              fontSize: "0.9rem",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            style={{
              backgroundColor: "#3b82f6",
              border: "none",
              borderRadius: "0.625rem",
              color: "#fff",
              padding: "0.55rem 1.5rem",
              fontSize: "0.9rem",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Save size={14} /> Save Camera
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────
function DeleteConfirm({ camera, onConfirm, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 space-y-4"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#fee2e2" }}
          >
            <AlertTriangle size={22} style={{ color: "#ef4444" }} />
          </div>
          <div>
            <h3 className="font-bold" style={{ color: "var(--fg)" }}>
              Delete Camera
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--fg2)" }}>
              This action cannot be undone.
            </p>
          </div>
        </div>
        <p className="text-sm" style={{ color: "var(--fg)" }}>
          Remove <span className="font-mono font-bold">{camera.id}</span> —{" "}
          {camera.name}?
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: "var(--subtle)",
              color: "var(--fg2)",
              border: "1px solid var(--border)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(camera.id)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: "#ef4444", color: "#fff" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Camera Card ──────────────────────────────────────────────────────────────
function CameraCard({
  cam,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onInvestigate,
}) {
  const [hovered, setHovered] = useState(false);
  const sc = statusConfig[cam.status] || statusConfig.Offline;
  const confColor =
    cam.aiHealth >= 90 ? "#22c55e" : cam.aiHealth >= 70 ? "#f59e0b" : "#ef4444";

  // Split location into main address + district
  const parts = cam.location.split(", ");
  const mainAddr =
    parts.length > 2 ? parts.slice(0, -2).join(", ") : cam.location;
  const subAddr = parts.length > 1 ? parts.slice(-2).join(", ") : "";

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: isSelected ? "rgba(59,130,246,0.08)" : "var(--card)",
        border: `1px solid ${isSelected ? "rgba(59,130,246,0.35)" : "var(--border)"}`,
        borderRadius: "12px",
        padding: "14px 16px",
        marginBottom: "8px",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.15s",
      }}
    >
      {/* Top row: Camera ID + Status badge (swaps to actions on hover) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontWeight: "700",
            fontSize: "14px",
            color: "var(--fg)",
            letterSpacing: "0.01em",
          }}
        >
          {cam.id}
        </span>
        {hovered ? (
          /* Action buttons */
          <div
            style={{ display: "flex", gap: "2px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(cam, e);
              }}
              title="Edit"
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                color: "var(--fg2)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--subtle)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Edit2 size={11} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInvestigate(cam);
              }}
              title="Investigate"
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                color: "#3b82f6",
                border: "1px solid rgba(59,130,246,0.3)",
                backgroundColor: "rgba(59,130,246,0.08)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Play size={11} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(cam, e);
              }}
              title="Delete"
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.3)",
                backgroundColor: "rgba(239,68,68,0.08)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Trash2 size={11} />
            </button>
          </div>
        ) : (
          /* Status badge — outlined pill */
          <span
            style={{
              border: `1px solid ${sc.color}`,
              color: sc.color,
              padding: "2px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.02em",
            }}
          >
            {sc.label}
          </span>
        )}
      </div>

      {/* Main address */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: "500",
          color: "var(--fg)",
          marginBottom: "2px",
          lineHeight: "1.4",
        }}
      >
        {mainAddr}
      </div>

      {/* Sub-location / district */}
      {subAddr && (
        <div
          style={{
            fontSize: "11px",
            color: "var(--fg2)",
            marginBottom: "10px",
          }}
        >
          {subAddr}
        </div>
      )}

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--fg2)" }}>
            Avg Conf Score
          </span>
          <span
            style={{ fontSize: "12px", fontWeight: "700", color: confColor }}
          >
            {cam.aiHealth}.00 %
          </span>
        </div>
        <span style={{ fontSize: "11px", color: "var(--fg2)" }}>
          {cam.activityToday} Events Detected
        </span>
      </div>
    </div>
  );
}

const FILTER_TABS = ["All", "Online", "Offline", "Maintenance"];

// All 50 Bangkok districts + surrounding provinces commonly referenced
const BANGKOK_DISTRICTS = [
  "All Districts",
  // Bangkok (50 districts)
  "Bang Bon",
  "Bang Kapi",
  "Bang Khae",
  "Bang Khen",
  "Bang Khun Thian",
  "Bang Na",
  "Bang Phlat",
  "Bang Rak",
  "Bang Sue",
  "Bangkok Noi",
  "Bangkok Yai",
  "Bueng Kum",
  "Chatuchak",
  "Chom Thong",
  "Din Daeng",
  "Don Mueang",
  "Dusit",
  "Huai Khwang",
  "Khan Na Yao",
  "Khlong Sam Wa",
  "Khlong San",
  "Khlong Toei",
  "Lak Si",
  "Lat Krabang",
  "Lat Phrao",
  "Min Buri",
  "Nong Chok",
  "Nong Khaem",
  "Pathum Wan",
  "Phasi Charoen",
  "Phra Khanong",
  "Phra Nakhon",
  "Prawet",
  "Rat Burana",
  "Ratchathewi",
  "Sai Mai",
  "Samphanthawong",
  "Saphan Sung",
  "Sathon",
  "Suan Luang",
  "Taling Chan",
  "Thawi Watthana",
  "Thon Buri",
  "Thung Khru",
  "Wang Thonglang",
  "Watthana",
  "Yan Nawa",
  "Yannawa",
  // Greater Bangkok / surrounding
  "Nonthaburi",
  "Pak Kret",
  "Mueang Nonthaburi",
  "Pathum Thani",
  "Lam Luk Ka",
  "Thanyaburi",
  "Samut Prakan",
  "Mueang Samut Prakan",
  "Bang Phli",
  "Nakhon Pathom",
  "Sam Phran",
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CCTVMapPage() {
  const [cameraList, setCameraList] = useState(initialCameras);
  const [searchQuery, setSearchQuery] = useState({
    field: "",
    value: "",
    search: "",
  });
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [investigationCamera, setInvestigationCamera] = useState(null);
  const [mapCenter, setMapCenter] = useState([13.75, 100.52]);
  const [mapZoom, setMapZoom] = useState(11);
  const [modal, setModal] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [pendingCamera, setPendingCamera] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const { data, isLoading } = useGetCCTVsQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });
  const showToast = (message, type = "success") => setToast({ message, type });

  const handleCameraClick = (cam) => {
    setSelectedCamera((prev) => (prev?.id === cam.id ? null : cam));
    setMapCenter([cam.lat, cam.lng]);
    setMapZoom(15);
  };

  const handleAdd = () => {
    setEditTarget(null);
    setModal("add");
  };
  const handleEdit = (cam, e) => {
    e?.stopPropagation();
    setEditTarget(cam);
    setModal("edit");
  };
  const handleDelete = (cam, e) => {
    e?.stopPropagation();
    setEditTarget(cam);
    setModal("delete");
  };

  // Step 1 (add only): camera form done → go to NVR link step
  const handleCameraNext = (formData) => {
    setPendingCamera(formData);
    setModal("nvr-link");
  };

  // Step 2: NVR link confirmed → actually add the camera
  const handleNVRConfirm = (nvrId, channel) => {
    if (!pendingCamera) return;
    const cam = { ...pendingCamera, nvrId, nvrChannel: channel };
    setCameraList((prev) => [...prev, cam]);
    showToast(`Camera ${cam.id} added & linked to ${nvrId}`);
    setPendingCamera(null);
    setModal(null);
  };

  const saveCamera = (form) => {
    // Edit path — direct save, no NVR step
    setCameraList((prev) =>
      prev.map((c) => (c.id === form.id ? { ...c, ...form } : c)),
    );
    showToast(`Camera ${form.id} updated`);
    setModal(null);
  };

  const deleteCamera = (id) => {
    setCameraList((prev) => prev.filter((c) => c.id !== id));
    if (selectedCamera?.id === id) setSelectedCamera(null);
    showToast(`Camera ${id} removed`, "error");
    setModal(null);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (investigationCamera) {
    return (
      <InvestigationCenter
        camera={investigationCamera}
        onBack={() => setInvestigationCamera(null)}
      />
    );
  }

  const selectedIncidents = selectedCamera
    ? incidents.filter((i) => i.cameraId === selectedCamera.id)
    : [];

  const filteredCameras = data?.filter((cam) => {
    const matchTab = activeTab === "All" || cam.status === activeTab;

    return matchTab;
  });

  const tabCounts = {
    All: data.length,
    Online: data.filter((c) => c.status === "Online").length,
    Offline: data.filter((c) => c.status === "Offline").length,
    Maintenance: data.filter((c) => c.status === "Maintenance").length,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
      }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between flex-shrink-0 flex-wrap gap-3">
        <div>
          <h2
            className="text-lg font-bold flex items-center gap-2"
            style={{ color: "var(--fg)" }}
          >
            <Camera size={18} style={{ color: "#3b82f6" }} />
            CCTV & Map
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--fg2)" }}>
            {selectedCamera
              ? `Showing ${selectedIncidents.length} incident(s) for ${selectedCamera.id} · click again to deselect`
              : "Select a camera to highlight incidents · press ▶ to investigate"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* District Filter */}
          <div className="relative">
            <select
              value={
                searchQuery.value == "" ? "All Districts" : searchQuery.value
              }
              onChange={(e) =>
                setSearchQuery((prev) => ({
                  ...prev,
                  field: "location",
                  value:
                    e.target.value == "All Districts" ? "" : e.target.value,
                }))
              }
              className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                minWidth: "160px",
              }}
            >
              {BANGKOK_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--fg2)" }}
            />
            {searchQuery.value !== "" && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{
                  backgroundColor: "#3b82f6",
                  fontSize: "9px",
                  fontWeight: "700",
                }}
              >
                1
              </span>
            )}
          </div>

          {/* Add Camera */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              boxShadow: "0 1px 4px rgba(59,130,246,0.4)",
            }}
          >
            <Plus size={15} /> Add Camera
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "16px",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* ── Left: Camera List Panel ── */}
        <div
          className="flex flex-col overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          {/* Panel Header */}
          <div
            className="px-4 pt-4 pb-3 flex-shrink-0"
            style={{ borderBottom: "1px solid #f3f4f6" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold" style={{ color: "#111827" }}>
                Cameras List
              </h3>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}
              >
                {data.length} cameras
              </span>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#9ca3af" }}
              />
              <input
                type="text"
                placeholder="Search cameras..."
                value={searchQuery.search}
                onChange={(e) =>
                  setSearchQuery((pre) => ({ ...pre, search: e.target.value }))
                }
                className="w-full text-xs pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  color: "#111827",
                }}
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: "1 1 0",
                    fontSize: "11px",
                    padding: "5px 4px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor:
                      activeTab === tab ? "#3b82f6" : "transparent",
                    color: activeTab === tab ? "#ffffff" : "var(--fg2)",
                    transition: "background-color 0.15s, color 0.15s",
                  }}
                >
                  {tab} ({tabCounts[tab]})
                </button>
              ))}
            </div>
          </div>

          {/* Camera Cards */}
          <div className="overflow-y-auto flex-1 px-3 pt-3 pb-2">
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Camera
                  size={28}
                  style={{ color: "#d1d5db", marginBottom: "8px" }}
                />
                <p className="text-sm font-medium" style={{ color: "#9ca3af" }}>
                  No cameras found
                </p>
                <p className="text-xs mt-1" style={{ color: "#d1d5db" }}>
                  Try adjusting your search or filter
                </p>
              </div>
            ) : (
              filteredCameras?.map((cam) => (
                <CameraCard
                  key={cam.id}
                  cam={cam}
                  isSelected={selectedCamera?.id === cam.id}
                  onSelect={() => handleCameraClick(cam)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onInvestigate={setInvestigationCamera}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Right: Map Panel ── */}
        <div
          className="overflow-hidden relative"
          style={{
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          {/* Map legend overlay */}
          <div
            className="absolute top-3 left-3 z-[1000] flex flex-col gap-1.5 px-3 py-2.5 rounded-xl text-xs"
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="font-semibold mb-0.5"
              style={{ color: "#111827", fontSize: "11px" }}
            >
              {selectedCamera
                ? `${selectedCamera.id} · ${selectedIncidents.length} incident(s)`
                : "Thailand — CCTV Network"}
            </div>
            {[
              { color: "#3b82f6", label: "Camera" },
              { color: "#f59e0b", label: "Selected" },
              { color: "#ef4444", label: "Incident" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: color,
                    border: "2px solid white",
                    boxShadow: `0 0 4px ${color}`,
                  }}
                />
                <span style={{ color: "#6b7280" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Incident badge */}
          {selectedCamera && selectedIncidents.length > 0 && (
            <div
              className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "#ef4444",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(239,68,68,0.4)",
              }}
            >
              🚨 {selectedIncidents.length} INCIDENT
              {selectedIncidents.length > 1 ? "S" : ""} DETECTED
            </div>
          )}

          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <MapFly center={mapCenter} zoom={mapZoom} />
            <CoordinateTracker />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              subdomains="abcd"
              maxZoom={20}
            />

            {/* Camera markers */}
            {filteredCameras?.map((cam) => (
              <Marker
                key={cam.id}
                position={[cam.lat, cam.lng]}
                icon={
                  selectedCamera?.id === cam.id ? activeCameraIcon : cameraIcon
                }
                eventHandlers={{ click: () => handleCameraClick(cam) }}
              >
                <Popup>
                  <div style={{ minWidth: "180px", fontFamily: "sans-serif" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "4px",
                        color: "#1e40af",
                      }}
                    >
                      {cam.id}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        marginBottom: "2px",
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {cam.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      {cam.location}
                    </div>
                    <div style={{ fontSize: "11px" }}>
                      Status:{" "}
                      <span
                        style={{
                          color: statusConfig[cam.status]?.color,
                          fontWeight: "600",
                        }}
                      >
                        {cam.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#374151" }}>
                      Conf Score: <b>{cam.aiHealth}%</b>
                    </div>
                    <div style={{ fontSize: "11px", color: "#374151" }}>
                      Events today: <b>{cam.activityToday}</b>
                    </div>
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "10px",
                        color: "#9ca3af",
                      }}
                    >
                      {cam.lat.toFixed(4)}°N, {cam.lng.toFixed(4)}°E
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Incident markers */}
            {selectedIncidents.map((inc) => (
              <Marker
                key={inc.id}
                position={[inc.lat, inc.lng]}
                icon={incidentIcon}
              >
                <Popup>
                  <div style={{ minWidth: "200px", fontFamily: "sans-serif" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#dc2626",
                        marginBottom: "4px",
                        fontSize: "13px",
                      }}
                    >
                      🚨 {inc.id}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        marginBottom: "4px",
                        color: "#374151",
                      }}
                    >
                      {inc.location}
                    </div>
                    <div style={{ fontSize: "11px", color: "#374151" }}>
                      Type: <b>{inc.vehicleType}</b>
                    </div>
                    <div style={{ fontSize: "11px" }}>
                      Severity:{" "}
                      <span
                        style={{
                          fontWeight: "700",
                          color:
                            inc.severity === "Critical"
                              ? "#dc2626"
                              : inc.severity === "High"
                                ? "#ea580c"
                                : inc.severity === "Medium"
                                  ? "#ca8a04"
                                  : "#2563eb",
                        }}
                      >
                        {inc.severity}
                      </span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#374151" }}>
                      AI Confidence: <b>{inc.aiConfidence}%</b>
                    </div>
                    <div style={{ fontSize: "11px", color: "#374151" }}>
                      Status: <b>{inc.status}</b>
                    </div>
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "10px",
                        color: "#9ca3af",
                      }}
                    >
                      {inc.lat.toFixed(4)}°N, {inc.lng.toFixed(4)}°E
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Modals */}
      {(modal === "add" || modal === "edit") && (
        <CameraModal
          camera={modal === "edit" ? editTarget : null}
          onNext={handleCameraNext}
          onClose={() => setModal(null)}
          showToast={showToast}
        />
      )}
      {modal === "nvr-link" && (
        <NVRLinkModal
          onConfirm={handleNVRConfirm}
          onClose={() => {
            setModal(null);
            setPendingCamera(null);
          }}
        />
      )}
      {modal === "delete" && editTarget && (
        <DeleteConfirm
          camera={editTarget}
          onConfirm={deleteCamera}
          onClose={() => setModal(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

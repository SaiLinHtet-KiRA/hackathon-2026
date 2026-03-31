import React, { useState, useRef, useEffect } from "react";
import {
  Radio,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Activity,
  X,
  Info,
  Trash2,
  Download,
  SkipBack,
  Play,
  Pause,
} from "lucide-react";
import { incidents, witnessReports } from "../../data/mockData";
import { useGetIncidentsQuery } from "../../redux/api/incident";
import { useGetReportsQuery } from "../../redux/api/report";
import formatTime from "../../helper/formatTime";
import Loader from "../Loader";

// ─── Dispatch Unit Modal ───────────────────────────────────────────────────────
const unitOptions = [
  {
    id: "ambulance",
    label: "Ambulance",
    emoji: "🚑",
    color: "#ef4444",
    unitId: "EMS-022",
  },
  {
    id: "police",
    label: "Police",
    emoji: "🚔",
    color: "#3b82f6",
    unitId: "PD-007",
  },
  {
    id: "firetruck",
    label: "Fire Truck",
    emoji: "🚒",
    color: "#f97316",
    unitId: "FD-003",
  },
];

function DispatchUnitModal({ incident, onClose }) {
  const [selectedUnits, setSelectedUnits] = useState(["ambulance"]);
  const [notes, setNotes] = useState("");
  const unit = unitOptions[0];

  function toggleUnit(id) {
    setSelectedUnits((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
    );
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div
        className="rounded-2xl flex flex-col"
        style={{
          width: "520px",
          maxWidth: "96vw",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--subtle)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
          >
            <span style={{ fontSize: "16px" }}>⚡</span>
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: "var(--fg)" }}>
              Dispatch Unit
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--fg3)" }}>
              {unit.unitId}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded-lg transition-colors"
            style={{ color: "var(--fg3)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--border)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-5">
          {/* Assign to incident */}
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--fg3)" }}
            >
              Assign to Incident
            </div>
            <select
              className="w-full px-3 py-2.5 rounded-lg text-sm font-medium focus:outline-none"
              style={{
                backgroundColor: "var(--subtle)",
                border: "1.5px solid #3b82f6",
                color: "var(--fg)",
                boxShadow: "0 0 0 3px rgba(59,130,246,0.1)",
              }}
            >
              <option>
                {incident.id} — {incident.location.split(",")[0]} ·{" "}
                {incident.severity}
              </option>
            </select>
          </div>

          {/* Dispatch unit type */}
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--fg3)" }}
            >
              Dispatch Unit
            </div>
            <div className="grid grid-cols-3 gap-2">
              {unitOptions.map((u) => {
                const active = selectedUnits.includes(u.id);
                return (
                  <button
                    key={u.id}
                    onClick={() => toggleUnit(u.id)}
                    className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: active
                        ? `${u.color}15`
                        : "var(--subtle)",
                      border: `1.5px solid ${active ? u.color : "var(--border)"}`,
                      color: active ? u.color : "var(--fg2)",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{u.emoji}</span>
                    {u.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operator notes */}
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--fg3)" }}
            >
              Operator Notes{" "}
              <span
                style={{
                  color: "var(--fg3)",
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                (Optional)
              </span>
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes before dispatch..."
              className="w-full px-3 py-2.5 rounded-lg text-sm resize-none focus:outline-none"
              style={{
                backgroundColor: "var(--subtle)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
              }}
            />
          </div>

          {/* Audit note */}
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--fg3)" }}
          >
            <Info size={12} />
            This action will be recorded in the Audit Log
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-5 py-4"
          style={{
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--subtle)",
          }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--fg2)",
              border: "1px solid var(--border)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "1px solid #dc2626",
            }}
          >
            <span style={{ fontSize: "13px" }}>⚡</span>
            Confirm Dispatch
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Incident Detail Modal ─────────────────────────────────────────────────────
function IncidentDetailModal({ incident, witnesses, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showDispatch, setShowDispatch] = useState(false);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const sc = sevColors[incident.severity] || sevColors.Low;
  const severityColor = sc.hex;

  const timeline = [
    {
      label: "Accident Detected",
      time: formatTime(new Date(incident.createdAt).getTime() - 1000),
    },
    {
      label: "SMS Alerts Received",
      time: formatTime(new Date(incident.linkedWitnesses.createdAt)),
    },
    {
      label: "Operator Reviewed",
      time: formatTime(
        new Date(incident.linkedWitnesses.createdAt).getTime() + 40000,
      ),
    },
    {
      label: "Awaiting Dispatch",
      time: formatTime(
        new Date(incident.linkedWitnesses.createdAt).getTime() + 90000,
      ),
    },
    {
      label: "Resolution",
      time: false
        ? formatTime(
            new Date(incident.linkedWitnesses.createdAt).getTime() + 120000,
          )
        : "—",
    },
  ];

  const operatorLog = [
    {
      time: formatTime(incident.createdAt),
      actor: "System",
      label: "AI auto-detection triggered",
      color: "#22c55e",
    },
    {
      time: formatTime(incident.linkedWitnesses.updatedAt),
      actor: "System",
      label: `SMS corroborated — ${incident.linkedWitnesses.reports.length} witness reports`,
      color: "#8b5cf6",
    },
    {
      time: formatTime(
        new Date(incident.linkedWitnesses.updatedAt).getTime() + 104000,
      ),
      actor: "Operator A",
      label: `Severity verified as ${incident.severity}`,
      color: "#f59e0b",
    },
  ];

  const dispatchRows = [
    { label: "Unit dispatched", value: null },
    { label: "Dispatch time", value: null },
    { label: "Estimated arrival", value: null },
    { label: "Actual arrival", value: null },
    { label: "Resolution time", value: null },
    { label: "Total response time", value: null },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
    >
      <div
        className="rounded-2xl flex flex-col"
        style={{
          width: "1120px",
          maxWidth: "96vw",
          maxHeight: "92vh",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-start justify-between px-5 py-3.5 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-bold text-base"
                style={{ color: "var(--fg)" }}
              >
                {incident.id}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: `${severityColor}20`,
                  color: severityColor,
                }}
              >
                {incident.severity}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: "var(--subtle)",
                  color: "var(--fg2)",
                  border: "1px solid var(--border)",
                }}
              >
                Pending
              </span>
            </div>
            <div className="text-xs" style={{ color: "var(--fg2)" }}>
              {incident.location} · {incident.timestamp}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium"
              style={{
                minWidth: "120px",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.35)",
                backgroundColor: "transparent",
              }}
            >
              <Trash2 size={12} /> Move to Trash
            </button>
            <button
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium"
              style={{
                minWidth: "140px",
                color: "var(--fg2)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--subtle)",
              }}
            >
              <Download size={12} /> Download Evidence
            </button>
            <button
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium"
              style={{
                minWidth: "130px",
                color: "var(--fg2)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--subtle)",
              }}
            >
              Mark as Reviewed
            </button>
            <button
              onClick={() => setShowDispatch(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
              style={{
                minWidth: "140px",
                color: "#fff",
                backgroundColor: "#ef4444",
                border: "1px solid #dc2626",
              }}
            >
              Dispatch Emergency
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors ml-1"
              style={{ color: "var(--fg2)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--subtle)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Incident Timeline */}
          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="text-xs font-semibold mb-3"
              style={{ color: "var(--fg2)" }}
            >
              Incident Timeline
            </div>
            <div className="relative flex items-start justify-between">
              <div
                className="absolute top-4 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#f59e0b", zIndex: 0 }}
              />
              {timeline.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 relative z-10"
                  style={{ flex: 1 }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor:
                        step.time === "—" ? "var(--border)" : "#f59e0b",
                      border: "3px solid var(--card)",
                    }}
                  >
                    <CheckCircle
                      size={14}
                      color={step.time === "—" ? "var(--fg3)" : "#fff"}
                      fill={step.time === "—" ? "transparent" : "#fff"}
                    />
                  </div>
                  <div
                    className="text-xs font-medium text-center"
                    style={{ color: "var(--fg)" }}
                  >
                    {step.label}
                  </div>
                  <div
                    className="text-xs font-mono"
                    style={{ color: "var(--fg2)" }}
                  >
                    {step.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video + AI Detection + Linked SMS */}
          <div
            className="grid gap-4 p-4"
            style={{ gridTemplateColumns: "1fr 320px" }}
          >
            {/* Left: Video */}
            <div
              className="rounded-xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: "#0d1117",
                border: "1px solid #21262d",
              }}
            >
              <div className="relative w-full" style={{ height: "480px" }}>
                <video
                  ref={videoRef}
                  src="/rangsit_detect3.mov"
                  autoPlay
                  muted
                  loop
                  onTimeUpdate={handleTimeUpdate}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
                {/* Overlays */}
                <div className="absolute top-2 left-2 flex items-center gap-2 px-2 py-1 rounded bg-black/70 border border-white/10">
                  <span className="text-[10px] font-mono text-green-500 font-bold">
                    REPLAY
                  </span>
                  <span className="text-[10px] font-mono text-white/80">
                    {incident.timestamp} | {incident.cameraId}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div
                className="flex items-center gap-3 px-4 py-2.5"
                style={{ borderTop: "1px solid #21262d" }}
              >
                <button
                  onClick={restart}
                  className="p-1 rounded transition-colors hover:bg-white/10"
                >
                  <SkipBack size={14} color="#94a3b8" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-1 rounded transition-colors hover:bg-white/10"
                >
                  {playing ? (
                    <Pause size={14} color="#94a3b8" />
                  ) : (
                    <Play size={14} color="#94a3b8" />
                  )}
                </button>
                <div
                  className="flex-1 h-1 rounded-full"
                  style={{ backgroundColor: "#374151" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: "#ef4444",
                    }}
                  />
                </div>
                <span
                  className="text-xs font-mono"
                  style={{
                    color: "#6b7280",
                    minWidth: "70px",
                    textAlign: "right",
                  }}
                >
                  {videoRef.current
                    ? `00:${Math.floor(videoRef.current.currentTime).toString().padStart(2, "0")}`
                    : "00:00"}{" "}
                  / 00:30
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: "#1f2937", color: "#9ca3af" }}
                >
                  1x
                </span>
              </div>
            </div>

            {/* Right: AI Detection + Linked SMS */}
            <div className="flex flex-col gap-3">
              {/* AI Detection Breakdown */}
              <div
                className="rounded-xl p-3.5"
                style={{
                  backgroundColor: "var(--subtle)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-xs font-semibold mb-3"
                  style={{ color: "var(--fg)" }}
                >
                  AI Detection Breakdown
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {[
                    {
                      label: "Confidence Score",
                      val: (incident.aiConfidence / 100).toFixed(2),
                    },
                    {
                      label: "Precision Score",
                      val: ((incident.aiConfidence - 2) / 100).toFixed(2),
                    },
                  ].map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "var(--fg3)" }}
                      >
                        {s.label}
                      </div>
                      <span
                        className="text-sm font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "rgba(34,197,94,0.1)",
                          color: "#22c55e",
                        }}
                      >
                        {s.val}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-xs mb-2" style={{ color: "var(--fg3)" }}>
                  Detected Classes
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    incident.severity,
                    incident.vehicleType.split("-")[0],
                    incident.vehicleType.split("-")[1],
                  ].map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded text-xs capitalize"
                      style={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--fg)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Linked SMS Alert */}
              <div
                className="rounded-xl flex flex-col flex-1"
                style={{
                  backgroundColor: "var(--subtle)",
                  border: "1px solid var(--border)",
                  minHeight: 0,
                }}
              >
                <div
                  className="flex items-center justify-between px-3.5 py-2.5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--fg)" }}
                  >
                    Linked SMS Alert
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.1)",
                      color: "#8b5cf6",
                    }}
                  >
                    <MessageSquare size={10} /> {incident.linkedWitnesses.size}{" "}
                    SMS Messages
                  </span>
                </div>
                <div
                  className="overflow-y-auto p-2 space-y-2"
                  style={{ maxHeight: "180px" }}
                >
                  {incident.linkedWitnesses.reports.map((w, i) => {
                    const lc = langColors[w.languageCode] || langColors.EN;
                    return (
                      <div
                        key={i}
                        className="px-2.5 py-2 rounded-lg"
                        style={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div
                          className="text-xs font-semibold mb-0.5"
                          style={{
                            color: "var(--fg3)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          WITNESS SMS
                        </div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className="text-xs font-mono"
                            style={{ color: "var(--fg)" }}
                          >
                            {w.phone}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-xs font-bold"
                            style={{ backgroundColor: lc.bg, color: lc.text }}
                          >
                            {w.language}
                          </span>
                          <span
                            className="ml-auto text-xs"
                            style={{ color: "var(--fg3)" }}
                          >
                            {w.time}
                          </span>
                        </div>
                        <div
                          className="text-xs italic mb-0.5"
                          style={{ color: "var(--fg3)" }}
                        >
                          "{w.original}"
                        </div>
                        <div className="text-xs" style={{ color: "var(--fg)" }}>
                          → "{w.translation}"
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Dispatch Details + Operator Action Log */}
          <div className="grid grid-cols-2 gap-4 px-4 pb-4">
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--subtle)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="text-xs font-semibold mb-3"
                style={{ color: "var(--fg)" }}
              >
                Dispatch Details
              </div>
              <div className="space-y-2">
                {dispatchRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-xs py-1"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <span style={{ color: "var(--fg3)" }}>{row.label}</span>
                    <span
                      className="font-medium"
                      style={{ color: row.value ? "var(--fg)" : "var(--fg3)" }}
                    >
                      {row.value ?? "—"}
                    </span>
                  </div>
                ))}
                <div className="pt-1">
                  <div className="text-xs mb-1" style={{ color: "var(--fg3)" }}>
                    Resolution notes
                  </div>
                  <div
                    className="text-xs italic"
                    style={{ color: "var(--fg3)" }}
                  >
                    Not yet resolved.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--subtle)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="text-xs font-semibold mb-3"
                style={{ color: "var(--fg)" }}
              >
                Operator Action Log
              </div>
              <div className="space-y-3">
                {operatorLog.map((log, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: log.color }}
                      />
                      {i < operatorLog.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{
                            backgroundColor: "var(--border)",
                            minHeight: "20px",
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: "var(--fg)" }}
                      >
                        {log.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--fg3)" }}
                      >
                        {log.time} · {log.actor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Outcome (empty) + Post-incident Notes (empty) */}
          <div className="grid grid-cols-2 gap-4 px-4 pb-5">
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--subtle)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="text-xs font-semibold mb-3"
                style={{ color: "var(--fg)" }}
              >
                Final Outcome
              </div>
              <div className="text-xs italic" style={{ color: "var(--fg3)" }}>
                Outcome not yet determined. Incident is pending resolution.
              </div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--subtle)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="text-xs font-semibold mb-3"
                style={{ color: "var(--fg)" }}
              >
                Post-incident Notes
              </div>
              <textarea
                placeholder="Add post-incident notes here..."
                className="w-full text-xs rounded-lg p-2.5 resize-none focus:outline-none"
                rows={4}
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--fg)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showDispatch && (
        <DispatchUnitModal
          incident={incident}
          onClose={() => setShowDispatch(false)}
        />
      )}
    </div>
  );
}

// ─── Language badge config ────────────────────────────────────────────────────
const langColors = {
  MS: { bg: "rgba(59,130,246,0.12)", text: "#3b82f6" },
  MY: { bg: "rgba(234,179,8,0.12)", text: "#d97706" },
  TH: { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
  ZH: { bg: "rgba(239,68,68,0.12)", text: "#dc2626" },
  TA: { bg: "rgba(168,85,247,0.12)", text: "#9333ea" },
  EN: { bg: "rgba(20,184,166,0.12)", text: "#0d9488" },
};

// ─── Severity colours ─────────────────────────────────────────────────────────
const sevColors = {
  Critical: { bg: "rgba(239,68,68,0.1)", text: "#ef4444", hex: "#ef4444" },
  High: { bg: "rgba(249,115,22,0.1)", text: "#f97316", hex: "#f97316" },
  Medium: { bg: "rgba(234,179,8,0.1)", text: "#d97706", hex: "#d97706" },
  Low: { bg: "rgba(59,130,246,0.1)", text: "#3b82f6", hex: "#3b82f6" },
};

// ─── Status colours ───────────────────────────────────────────────────────────
const statusColors = {
  Dispatched: { bg: "rgba(34,197,94,0.1)", text: "#16a34a" },
  "Under Review": { bg: "rgba(234,179,8,0.1)", text: "#d97706" },
  "SMS Confirmed": { bg: "rgba(139,92,246,0.1)", text: "#8b5cf6" },
  "Auto-Detected": { bg: "rgba(59,130,246,0.1)", text: "#3b82f6" },
  "False Alarm": { bg: "rgba(107,114,128,0.1)", text: "#6b7280" },
};

// ─── AI Dispatch units — major emergency response only ────────────────────────
function getEquipment(severity) {
  if (severity === "Critical")
    return [
      {
        emoji: "🚑",
        label: "Ambulance",
        detail: "2 Units · Code 3",
        color: "#ef4444",
        bg: "rgba(239,68,68,0.08)",
        border: "rgba(239,68,68,0.18)",
      },
      {
        emoji: "🚒",
        label: "Fire & Rescue",
        detail: "1 Unit · Full Crew",
        color: "#f97316",
        bg: "rgba(249,115,22,0.08)",
        border: "rgba(249,115,22,0.18)",
      },
      {
        emoji: "🚓",
        label: "Police",
        detail: "2 Units",
        color: "#3b82f6",
        bg: "rgba(59,130,246,0.08)",
        border: "rgba(59,130,246,0.18)",
      },
      {
        emoji: "🚁",
        label: "Med. Helicopter",
        detail: "On Standby",
        color: "#8b5cf6",
        bg: "rgba(139,92,246,0.08)",
        border: "rgba(139,92,246,0.18)",
      },
    ];
  if (severity === "High")
    return [
      {
        emoji: "🚑",
        label: "Ambulance",
        detail: "1 Unit · Code 3",
        color: "#ef4444",
        bg: "rgba(239,68,68,0.08)",
        border: "rgba(239,68,68,0.18)",
      },
      {
        emoji: "🚒",
        label: "Fire & Rescue",
        detail: "1 Unit",
        color: "#f97316",
        bg: "rgba(249,115,22,0.08)",
        border: "rgba(249,115,22,0.18)",
      },
      {
        emoji: "🚓",
        label: "Police",
        detail: "1 Unit",
        color: "#3b82f6",
        bg: "rgba(59,130,246,0.08)",
        border: "rgba(59,130,246,0.18)",
      },
    ];
  if (severity === "Medium")
    return [
      {
        emoji: "🚑",
        label: "Ambulance",
        detail: "1 Unit",
        color: "#ef4444",
        bg: "rgba(239,68,68,0.08)",
        border: "rgba(239,68,68,0.18)",
      },
      {
        emoji: "🚓",
        label: "Police",
        detail: "1 Unit",
        color: "#3b82f6",
        bg: "rgba(59,130,246,0.08)",
        border: "rgba(59,130,246,0.18)",
      },
    ];
  return [
    {
      emoji: "🚓",
      label: "Police",
      detail: "1 Unit",
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
      border: "rgba(59,130,246,0.18)",
    },
  ];
}

// ─── Print / Export Report ────────────────────────────────────────────────────
function exportReport(incident, witnesses, equipment) {
  const sc = sevColors[incident.severity] || sevColors.Low;
  const byCategory = equipment.reduce((acc, e) => {
    if (!acc[e.cat]) acc[e.cat] = [];
    acc[e.cat].push(e);
    return acc;
  }, {});

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>DETECT Detection Report — ${incident.id}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;color:#1f2937;background:#fff;font-size:13px}
    .hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;padding-bottom:18px;border-bottom:3px solid #1e40af}
    .logo{font-size:22px;font-weight:900;color:#1e40af}
    .logo small{display:block;font-size:11px;font-weight:400;color:#6b7280;margin-top:2px}
    .rtitle{font-size:18px;font-weight:700;color:#111827;margin-bottom:4px}
    .rmeta{font-size:11px;color:#6b7280}
    .badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700}
    h2{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#374151;margin:22px 0 10px;padding-bottom:5px;border-bottom:1px solid #e5e7eb}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .f{margin-bottom:10px}
    .f label{font-size:10px;font-weight:600;text-transform:uppercase;color:#9ca3af;display:block;margin-bottom:3px}
    .f .v{font-size:13px;color:#111827;line-height:1.5}
    .sev{color:${sc.hex};font-weight:700}
    .eq-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:4px}
    .eq-item{display:flex;align-items:center;gap:7px;padding:7px 10px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:7px;font-size:12px}
    .cat-hdr{font-size:10px;font-weight:700;text-transform:uppercase;color:#6b7280;margin:10px 0 5px}
    .sms-box{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:8px}
    .sms-lang{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:#dbeafe;color:#1e40af}
    .sms-orig{font-style:italic;color:#6b7280;font-size:12px;margin:5px 0 3px}
    .sms-trans{font-size:13px;color:#111827}
    .footer{margin-top:36px;padding-top:14px;border-top:1px solid #e5e7eb;font-size:10px;color:#9ca3af;display:flex;justify-content:space-between}
    @media print{body{padding:20px}}
  </style>
</head>
<body>
  <div class="hdr">
    <div><div class="logo">⚡ DETECT<small>CCTV Accident AI — Detection Report</small></div></div>
    <div style="text-align:right">
      <div class="rtitle">${incident.id}</div>
      <div class="rmeta">Generated: ${new Date().toLocaleString()}</div>
      <div class="rmeta" style="margin-top:4px">
        Severity: <span class="badge" style="background:${sc.bg};color:${sc.hex}">${incident.severity}</span>
        &nbsp; Status: <b>${incident.status}</b>
      </div>
    </div>
  </div>

  <h2>📍 Incident Overview</h2>
  <div class="g2">
    <div>
      <div class="f"><label>Incident ID</label><div class="v">${incident.id}</div></div>
      <div class="f"><label>Timestamp</label><div class="v">${incident.timestamp}</div></div>
      <div class="f"><label>Camera ID</label><div class="v">${incident.cameraId}</div></div>
      <div class="f"><label>AI Confidence</label><div class="v">${incident.aiConfidence}%</div></div>
    </div>
    <div>
      <div class="f"><label>Location</label><div class="v">${incident.location}</div></div>
      <div class="f"><label>Severity</label><div class="v sev">${incident.severity}</div></div>
      <div class="f"><label>GPS Coordinates</label><div class="v">${incident.lat?.toFixed(5)}°N, ${incident.lng?.toFixed(5)}°E</div></div>
      <div class="f"><label>Model Precision</label><div class="v">${incident.modelPrecision ?? "—"}%</div></div>
    </div>
  </div>

  <h2>🚗 Accident Details</h2>
  <div class="g2">
    <div><div class="f"><label>Vehicle Types Involved</label><div class="v">${incident.vehicleType}</div></div></div>
    <div><div class="f"><label>Road / Weather Condition</label><div class="v">${incident.condition}</div></div></div>
  </div>
  <div class="f"><label>AI Reasoning</label><div class="v">${incident.aiReasoning || "—"}</div></div>

  ${
    witnesses.length > 0
      ? `
  <h2>💬 Witness SMS Reports (${witnesses.length})</h2>
  ${witnesses
    .map(
      (w) => `
    <div class="sms-box">
      <span class="sms-lang">${w.language} (${w.languageCode})</span>
      &nbsp;<b>${w.phone}</b>&nbsp;<span style="color:#9ca3af;font-size:11px">${w.time}</span>
      <div class="sms-orig">"${w.original}"</div>
      <div class="sms-trans">→ "${w.translation}"</div>
    </div>
  `,
    )
    .join("")}`
      : ""
  }

  <h2>🏥 Required Equipment &amp; Dispatch Checklist</h2>
  ${Object.entries(byCategory)
    .map(
      ([cat, items]) => `
    <div class="cat-hdr">${cat}</div>
    <div class="eq-grid">
      ${items.map((e) => `<div class="eq-item">${e.emoji} ${e.item}</div>`).join("")}
    </div>
  `,
    )
    .join("")}

  <div class="footer">
    <div>DETECT — AI-Powered Accident Detection &amp; Response System · Bangkok, Thailand</div>
    <div>Report ID: RPT-${Date.now()} · Operator Verified</div>
  </div>
</body>
</html>`;

  const win = window.open("", "_blank", "width=960,height=720");
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 600);
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DetectionPage() {
  const [selectedSMS, setSelectedSMS] = useState(null);
  const [confirmedIds, setConfirmedIds] = useState(new Set());
  const [falseAlarmIds, setFalseAlarmIds] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [smsLangFilter, setSmsLangFilter] = useState("All");
  const [smsSevFilter, setSmsSevFilter] = useState("All");
  const [smsSortBy, setSmsSortBy] = useState("time");
  const incidentRefs = useRef({});
  const { data, isLoading } = useGetIncidentsQuery({});
  const { data: reportData, isLoading: reportLoading } = useGetReportsQuery({});

  const matchedIncident = selectedSMS
    ? data.find((i) => i.id === selectedSMS.incidentMatch.id)
    : null;

  const incidentWitnesses = matchedIncident
    ? witnessReports.filter((w) => w.incidentMatch === matchedIncident.id)
    : [];

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (matchedIncident && incidentRefs.current[matchedIncident.id]) {
      incidentRefs.current[matchedIncident.id].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [matchedIncident?.id]);

  const handleConfirm = () => {
    if (!matchedIncident) return;
    setConfirmedIds((prev) => new Set([...prev, matchedIncident.id]));
    showToast(
      `${matchedIncident.id} confirmed — dispatch initiated`,
      "success",
    );
  };
  const handleFalseAlarm = () => {
    if (!matchedIncident) return;
    setFalseAlarmIds((prev) => new Set([...prev, matchedIncident.id]));
    showToast(`${matchedIncident.id} marked as false alarm`, "warn");
  };

  const isConfirmed = matchedIncident && confirmedIds.has(matchedIncident.id);
  const isFalseAlarm = matchedIncident && falseAlarmIds.has(matchedIncident.id);

  if (isLoading && !data) {
    return <Loader />;
  }
  if (reportLoading && !reportData) {
    return <Loader />;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1
            className="text-xl font-bold flex items-center gap-2"
            style={{ color: "var(--fg)" }}
          >
            <Radio size={20} className="text-purple-500" />
            Detection Center
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--fg2)" }}>
            Cross-check incoming SMS witness alerts against live CCTV incident
            feed · verify and generate dispatch report
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#ef4444",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
            LIVE MONITORING
          </div>
          <div className="text-xs" style={{ color: "var(--fg3)" }}>
            {reportData.length} SMS · {data.length} Incidents
          </div>
        </div>
      </div>

      {/* ── 2-Column Layout ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "16px",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* ── LEFT: SMS Witness Panel ── */}
        <div
          className="rounded-2xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2 px-4 py-3.5 flex-shrink-0"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <MessageSquare size={15} className="text-purple-500" />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--fg)" }}
            >
              Witness SMS Alerts
            </span>
            <span
              className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "rgba(139,92,246,0.12)",
                color: "#8b5cf6",
              }}
            >
              {reportData.length} New
            </span>
          </div>
          {/* Filter + Sort bar */}
          <div
            className="flex items-center gap-2 px-3 py-2 flex-shrink-0 flex-wrap"
            style={{
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--subtle)",
            }}
          >
            {/* Severity filter */}
            <select
              value={smsSevFilter}
              onChange={(e) => setSmsSevFilter(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-lg focus:outline-none"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
              }}
            >
              {["All", "Critical", "High", "Medium", "Low"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {/* Language filter */}
            <select
              value={smsLangFilter}
              onChange={(e) => setSmsLangFilter(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-lg focus:outline-none"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
              }}
            >
              {[
                "All",
                ...Array.from(
                  new Set(witnessReports.map((w) => w.languageCode)),
                ),
              ].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            {/* Sort */}
            <select
              value={smsSortBy}
              onChange={(e) => setSmsSortBy(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-lg focus:outline-none ml-auto"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
              }}
            >
              <option value="time">Sort: Time</option>
              <option value="severity">Sort: Severity</option>
              <option value="country">Sort: Country</option>
            </select>
          </div>
          {/* SMS cards */}
          <div className="overflow-y-auto flex-1 p-3 space-y-2.5">
            {(() => {
              const sevOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
              const filtered = reportData
                ?.filter(
                  (w) => smsSevFilter === "All" || w.severity === smsSevFilter,
                )
                .filter(
                  (w) =>
                    smsLangFilter === "All" || w.languageCode === smsLangFilter,
                )
                .sort((a, b) => {
                  if (smsSortBy === "severity")
                    return (
                      (sevOrder[a.severity] ?? 9) - (sevOrder[b.severity] ?? 9)
                    );
                  if (smsSortBy === "country")
                    return a.phone.localeCompare(b.phone);
                  return a.time.localeCompare(b.time);
                });
              if (filtered.length === 0)
                return (
                  <div
                    className="text-center py-8 text-xs"
                    style={{ color: "var(--fg3)" }}
                  >
                    No SMS match current filters.
                  </div>
                );
              return filtered.map((w) => {
                const lc = langColors[w.languageCode] || langColors.EN;
                const sc = sevColors[w.severity] || sevColors.Low;
                const isSelected = selectedSMS?.id === w.id;
                const matchInc = incidents.find(
                  (inc) => inc.id === w.incidentMatch,
                );
                // Count how many SMS share the same incident
                const linkedCount = w.incidentMatch.id
                  ? reportData.filter(
                      (x) => x.incidentMatch.id === w.incidentMatch.id,
                    ).length
                  : 0;
                return (
                  <div
                    key={w.id}
                    onClick={() =>
                      setSelectedSMS((prev) => (prev?.id === w.id ? null : w))
                    }
                    className="rounded-xl p-3.5 cursor-pointer transition-all"
                    style={{
                      backgroundColor: isSelected
                        ? "rgba(139,92,246,0.07)"
                        : "var(--subtle)",
                      border: isSelected
                        ? "1.5px solid rgba(139,92,246,0.4)"
                        : "1px solid var(--border)",
                      boxShadow: isSelected
                        ? "0 0 0 3px rgba(139,92,246,0.08)"
                        : "none",
                    }}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-xs font-mono font-semibold"
                          style={{ color: "var(--fg)" }}
                        >
                          {w.phone}
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded text-xs font-bold"
                          style={{ backgroundColor: lc.bg, color: lc.text }}
                        >
                          {w.languageCode}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: sc.bg, color: sc.text }}
                        >
                          {w.severity}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--fg3)" }}
                        >
                          {w.time}
                        </span>
                      </div>
                    </div>
                    {/* Original */}
                    <div
                      className="text-xs italic mb-1 line-clamp-1"
                      style={{ color: "var(--fg3)" }}
                    >
                      "{w.original}"
                    </div>
                    {/* Translation */}
                    <div
                      className="text-xs mb-2 line-clamp-2"
                      style={{ color: "var(--fg)", lineHeight: "1.5" }}
                    >
                      → "{w.translation}"
                    </div>
                    {/* Footer: match badge + linked SMS count */}
                    {w.incidentMatch && (
                      <div
                        className="flex items-center justify-between pt-2"
                        style={{ borderTop: "1px solid var(--border)" }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-xs"
                            style={{ color: "var(--fg3)" }}
                          >
                            Match:
                          </span>
                          <span
                            className="px-2 py-0.5 rounded font-mono text-xs font-semibold"
                            style={{
                              backgroundColor: "rgba(249,115,22,0.1)",
                              color: "#f97316",
                            }}
                          >
                            {w.incidentMatch.id}
                          </span>
                          {matchInc && (
                            <span
                              className="text-xs"
                              style={{ color: "var(--fg3)" }}
                            >
                              · {matchInc.severity}
                            </span>
                          )}
                        </div>
                        {linkedCount > 1 && (
                          <span
                            className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "rgba(139,92,246,0.1)",
                              color: "#8b5cf6",
                            }}
                          >
                            <MessageSquare size={10} />
                            {linkedCount} linked
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* ── CENTER: Live Incident Feed ── */}
        <div
          className="rounded-2xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2 px-4 py-3.5 flex-shrink-0"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <Activity size={15} className="text-blue-500" />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--fg)" }}
            >
              Live Incident Feed
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ml-0.5" />
            <span
              className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "rgba(59,130,246,0.1)",
                color: "#3b82f6",
              }}
            >
              {incidents.length} Active
            </span>
          </div>
          {/* Filter bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0 flex-wrap"
            style={{
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--subtle)",
            }}
          >
            <span
              className="text-xs font-medium mr-1"
              style={{ color: "var(--fg3)" }}
            >
              Severity:
            </span>
            {["All", "Critical", "High", "Medium", "Low"].map((s) => {
              const active = severityFilter === s;
              const col =
                s === "All" ? "#6b7280" : sevColors[s]?.hex || "#6b7280";
              return (
                <button
                  key={s}
                  onClick={() => setSeverityFilter(s)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: active
                      ? s === "All"
                        ? "rgba(107,114,128,0.15)"
                        : `${sevColors[s]?.hex}18`
                      : "transparent",
                    color: active ? col : "var(--fg3)",
                    border: active
                      ? `1px solid ${col}40`
                      : "1px solid transparent",
                  }}
                >
                  {s}
                </button>
              );
            })}
            {selectedSMS && !matchedIncident && (
              <span
                className="ml-auto flex items-center gap-1 text-xs"
                style={{ color: "#ef4444" }}
              >
                <Info size={11} /> No match found
              </span>
            )}
          </div>
          {/* Incident cards */}
          <div className="overflow-y-auto flex-1 p-3 space-y-2.5">
            {data
              ?.filter(
                (inc) =>
                  severityFilter === "All" || inc.severity === severityFilter,
              )
              .map((inc) => {
                const sc = sevColors[inc.severity] || sevColors.Low;
                const stc =
                  statusColors[inc.status] || statusColors["Auto-Detected"];
                const isMatch = matchedIncident?.id === inc.id;
                const isConfirmedInc = confirmedIds.has(inc.id);
                const isFalseAlarmInc = falseAlarmIds.has(inc.id);
                return (
                  <div
                    key={inc.id}
                    ref={(el) => (incidentRefs.current[inc.id] = el)}
                    className="rounded-xl p-3.5 transition-all"
                    style={{
                      backgroundColor: isMatch
                        ? "rgba(249,115,22,0.07)"
                        : "var(--subtle)",
                      border: isMatch
                        ? "1.5px solid rgba(249,115,22,0.4)"
                        : "1px solid var(--border)",
                      boxShadow: isMatch
                        ? "0 0 0 3px rgba(249,115,22,0.08)"
                        : "none",
                    }}
                  >
                    {/* Top row: ID + severity + status */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          {(inc.severity === "Critical" ||
                            inc.severity === "High") && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                          )}
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{ color: isMatch ? "#f97316" : "#3b82f6" }}
                          >
                            {inc.id}
                          </span>
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "var(--fg3)", fontSize: "10px" }}
                        >
                          {inc.timestamp} · {inc.cameraId}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: sc.bg, color: sc.text }}
                        >
                          {inc.severity}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: stc.bg, color: stc.text }}
                        >
                          {inc.status}
                        </span>
                      </div>
                    </div>
                    {/* Location row */}
                    <div
                      className="text-xs mb-2"
                      style={{ color: "var(--fg)", lineHeight: "1.4" }}
                    >
                      {inc.location}
                    </div>
                    {/* Bottom row: AI bar + condition + dispatch status */}
                    <div
                      className="flex items-center gap-3 pt-2"
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-16 h-1.5 rounded-full"
                          style={{ backgroundColor: "var(--border)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${inc.aiConfidence}%`,
                              backgroundColor:
                                inc.aiConfidence >= 80
                                  ? "#22c55e"
                                  : inc.aiConfidence >= 60
                                    ? "#eab308"
                                    : "#ef4444",
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-semibold"
                          style={{
                            color:
                              inc.aiConfidence >= 80
                                ? "#22c55e"
                                : inc.aiConfidence >= 60
                                  ? "#d97706"
                                  : "#ef4444",
                          }}
                        >
                          {inc.aiConfidence}%
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: "var(--fg3)" }}>
                        {inc.condition}
                      </span>
                      {isConfirmedInc && (
                        <span
                          className="ml-auto text-xs font-semibold"
                          style={{ color: "#22c55e" }}
                        >
                          ✓ Dispatched
                        </span>
                      )}
                      {isFalseAlarmInc && (
                        <span
                          className="ml-auto text-xs font-semibold"
                          style={{ color: "var(--fg3)" }}
                        >
                          ✗ False Alarm
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* ── Incident Detail Modal ── */}
      {matchedIncident && (
        <IncidentDetailModal
          incident={matchedIncident}
          witnesses={incidentWitnesses}
          onClose={() => setSelectedSMS(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium z-[9999] shadow-lg"
          style={{
            backgroundColor: "var(--card)",
            border: `1px solid ${toast.type === "success" ? "#22c55e" : toast.type === "warn" ? "#eab308" : "#3b82f6"}`,
            color: "var(--fg)",
            minWidth: "260px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {toast.type === "success" ? (
            <CheckCircle size={16} style={{ color: "#22c55e" }} />
          ) : toast.type === "warn" ? (
            <AlertTriangle size={16} style={{ color: "#eab308" }} />
          ) : (
            <Info size={16} style={{ color: "#3b82f6" }} />
          )}
          <span className="flex-1">{toast.msg}</span>
          <button
            onClick={() => setToast(null)}
            className="opacity-50 hover:opacity-100"
            style={{ color: "var(--fg2)" }}
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

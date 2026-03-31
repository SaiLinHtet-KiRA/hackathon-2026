import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Clock,
  MessageSquare,
  Wifi,
  X,
  Info,
  SkipBack,
  Trash2,
  Edit2,
  CheckCircle,
  HardDrive,
  Activity,
  Radio,
  ChevronRight,
  Maximize,
} from "lucide-react";
import { historicalEvents } from "../../data/mockData";
import formatDate from "../../helper/formatDate";
import { useGetIncidentsByIDQuery } from "../../redux/api/incidents";
import formatTime from "../../helper/formatTime";
import { getResponseData } from "../../helper/DispatchTime";
import Loader from "../Loader";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  const color =
    type === "success" ? "#22c55e" : type === "warning" ? "#eab308" : "#3b82f6";
  return (
    <div
      className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl z-[9999]"
      style={{
        backgroundColor: "var(--card)",
        border: `1px solid ${color}`,
        color: "var(--fg)",
        minWidth: "280px",
      }}
    >
      <Info size={16} style={{ color, flexShrink: 0 }} />
      <span className="flex-1">{message}</span>
      <button onClick={onClose}>
        <X size={14} className="opacity-50 hover:opacity-100" />
      </button>
    </div>
  );
}

// ─── YouTube Stream IDs per camera ────────────────────────────────────────────
const YOUTUBE_IDS = {
  "CAM-N-112": null,
  "CAM-E-045": null,
  "CAM-W-302": null,
  "CAM-S-099": null,
  "CAM-BKK-001": null,
};

// ─── Live Stream Component ────────────────────────────────────────────────────
function LiveStreamView({ camera }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-GB"));
  const [recOn, setRecOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const camId = camera?.id ?? "N/A";
  const camAiHealth = camera?.aiHealth ?? 0;
  const videoId = YOUTUBE_IDS[camId] ?? null;

  const localVideoPath =
    camId === "CAM-N-112"
      ? "/rangsit.MOV"
      : camId === "CAM-E-045"
        ? "/rangsit2.mov"
        : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB"));
      setRecOn((v) => !v);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&fs=1`
    : null;

  const renderOverlays = (isLarge = false) => (
    <>
      <div
        className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
        style={{ backgroundColor: "rgba(0,0,0,0.75)", color: "#fff" }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: "#ef4444" }}
        />
        Live
      </div>
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen(!isFullscreen);
          }}
          className="p-1.5 rounded-lg bg-black/70 text-white hover:bg-black/90 transition-colors pointer-events-auto"
        >
          {isFullscreen ? <X size={16} /> : <Maximize size={16} />}
        </button>
        <div
          className="px-2 py-0.5 rounded text-xs font-mono pointer-events-none"
          style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
        >
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full transition-opacity duration-300"
              style={{ backgroundColor: "#ef4444", opacity: recOn ? 1 : 0 }}
            />
            <span style={{ color: "#fff" }}>REC</span>
          </div>
        </div>
      </div>
      <div
        className={`absolute ${isLarge ? "top-12" : "top-10"} left-3 z-10 px-2 py-0.5 rounded text-xs font-mono pointer-events-none`}
        style={{ backgroundColor: "rgba(0,0,0,0.72)", color: "#22c55e" }}
      >
        {time} | {camId}
      </div>
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <div
          className={`${isLarge ? "text-lg" : "text-sm"} font-semibold`}
          style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
        >
          {camera?.name ?? camId}
        </div>
        <div
          className="text-xs font-mono"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {camId}
        </div>
      </div>
      <div
        className="absolute bottom-3 left-3 pointer-events-none"
        style={{
          width: 28,
          height: 28,
          borderLeft: "2px solid rgba(239,68,68,0.5)",
          borderBottom: "2px solid rgba(239,68,68,0.5)",
        }}
      />
      <div
        className="absolute bottom-3 right-3 pointer-events-none"
        style={{
          width: 28,
          height: 28,
          borderRight: "2px solid rgba(239,68,68,0.5)",
          borderBottom: "2px solid rgba(239,68,68,0.5)",
        }}
      />
      <div
        className="absolute top-3 left-3 pointer-events-none"
        style={{
          width: 28,
          height: 28,
          borderLeft: "2px solid rgba(239,68,68,0.5)",
          borderTop: "2px solid rgba(239,68,68,0.5)",
        }}
      />
      <div
        className="absolute top-3 right-3 pointer-events-none"
        style={{
          width: 28,
          height: 28,
          borderRight: "2px solid rgba(239,68,68,0.5)",
          borderTop: "2px solid rgba(239,68,68,0.5)",
        }}
      />
      <div
        className={`absolute ${isLarge ? "bottom-16" : "bottom-10"} left-3 px-2 py-0.5 rounded text-xs font-mono pointer-events-none`}
        style={{ backgroundColor: "rgba(0,0,0,0.72)", color: "#22c55e" }}
      >
        AI ACTIVE | CONF: {camAiHealth}%
      </div>
    </>
  );

  const videoElement = localVideoPath ? (
    <video
      src={localVideoPath}
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  ) : embedUrl ? (
    <iframe
      src={embedUrl}
      title={`Live stream ${camId}`}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
      allowFullScreen
    />
  ) : (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.015) 3px,rgba(255,255,255,0.015) 4px)",
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "rgba(59,130,246,0.12)",
          border: "1px solid rgba(59,130,246,0.3)",
        }}
      >
        <Wifi size={24} style={{ color: "#3b82f6" }} />
      </div>
      <div
        className="text-sm font-semibold"
        style={{ color: "#8b949e", fontFamily: "monospace" }}
      >
        No stream configured
      </div>
    </div>
  );

  return (
    <>
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ height: "300px", backgroundColor: "#0a0d11" }}
      >
        {videoElement}
        {renderOverlays(false)}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-8">
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {videoElement}
            {renderOverlays(true)}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Incident Detail Modal (replaces simple VideoModal) ───────────────────────
function VideoModal({ event, onClose }) {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const replayVideoPath =
    event.cameraId === "CAM-N-112" || event.location?.includes("Exit 14")
      ? "/rangsit_detact.MOV"
      : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) videoRef.current.pause();
      else videoRef.current.play();
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

  // ── mock detail data (in real app this would come from API) ──
  const severityColor =
    event.severity === "Critical"
      ? "#ef4444"
      : event.severity === "High"
        ? "#f97316"
        : event.severity === "Medium"
          ? "#eab308"
          : "#3b82f6";
  // const timeline = [
  //   { label: "Accident Detected", time: "08:13:03" },
  //   { label: "SMS Alerts Received", time: "08:16:03" },
  //   { label: "Operator Reviewed", time: "08:16:45" },
  //   { label: "Awaiting Dispatch", time: "08:16:57" },
  //   { label: "Resolution", time: "09:16:57" },
  // ];
  // const operatorLog = [
  //   {
  //     time: "08:15:04",
  //     actor: "System",
  //     label: "AI auto-detection triggered",
  //     color: "#22c55e",
  //   },
  //   {
  //     time: "08:16:10",
  //     actor: "System",
  //     label: "SMS corroborated — severity bumped to Critical",
  //     color: "#8b5cf6",
  //   },
  //   {
  //     time: "08:16:45",
  //     actor: "Operator A",
  //     label: "Severity verified as Critical",
  //     color: "#f59e0b",
  //   },
  //   {
  //     time: "08:18:00",
  //     actor: "Operator A (Admin)",
  //     label: "EMS Unit 22 dispatched",
  //     color: "#ef4444",
  //   },
  //   {
  //     time: "08:42:00",
  //     actor: "Operator A (Admin)",
  //     label: "Incident marked as Resolved",
  //     color: "#22c55e",
  //   },
  // ];

  const timeline = [
    {
      label: "Accident Detected",
      time: formatTime(new Date(event.createdAt).getTime() - 1000),
    },
    {
      label: "SMS Alerts Received",
      time: formatTime(new Date(event.linkedWitnesses.createdAt)),
    },
    {
      label: "Operator Reviewed",
      time: formatTime(
        new Date(event.linkedWitnesses.createdAt).getTime() + 40000,
      ),
    },
    {
      label: "Awaiting Dispatch",
      time: formatTime(
        new Date(event.linkedWitnesses.createdAt).getTime() + 90000,
      ),
    },
    {
      label: "Resolution",
      time:
        event.status == "Resolved"
          ? formatTime(
              new Date(event.linkedWitnesses.createdAt).getTime() + 120000,
            )
          : "—",
    },
  ];
  const operatorLog = [
    {
      time: formatTime(event.createdAt),
      actor: "System",
      label: "AI auto-detection triggered",
      color: "#22c55e",
    },
    {
      time: formatTime(
        new Date(event.linkedWitnesses.createdAt).getTime() + 54000,
      ),
      actor: "System",
      label: `SMS corroborated — ${event.linkedWitnesses.reports.length} witness reports`,
      color: "#8b5cf6",
    },
    {
      time: formatTime(
        new Date(event.linkedWitnesses.createdAt).getTime() + 104000,
      ),
      actor: "Operator A",
      label: `Severity verified as ${event.severity}`,
      color: "#f59e0b",
    },
  ];
  const detectedClasses = [
    event.severity + " Accident",
    event.vehicleType.split("-")[0],
    event.vehicleType.split("-")[1],
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
                {event.id}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: `${severityColor}20`,
                  color: severityColor,
                }}
              >
                {event.severity}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor:
                    event.status === "Resolved"
                      ? "rgba(34,197,94,0.1)"
                      : "var(--subtle)",
                  color: event.status === "Resolved" ? "#16a34a" : "var(--fg2)",
                  border: `1px solid ${event.status === "Resolved" ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
                }}
              >
                {event.status || "Pending"}
              </span>
            </div>
            <div className="text-xs" style={{ color: "var(--fg2)" }}>
              {event.location} · Dec 18, 2025 · {event.time} AM
            </div>
          </div>
          <div className="flex items-center gap-2">
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
              Download Evidence
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
              className="p-1.5 rounded-lg transition-colors"
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

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* ── Incident Timeline ── */}
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
              {/* connecting line */}
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

          {/* ── Video + AI/SMS ── */}
          <div
            className="grid gap-4 p-4"
            style={{ gridTemplateColumns: "1fr 320px" }}
          >
            {/* Left: Replay Video Container - Strictly filling container height */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: "#0d1117",
                border: "1px solid #21262d",
              }}
            >
              <div className="relative" style={{ height: "360px" }}>
                {replayVideoPath ? (
                  <video
                    ref={videoRef}
                    src={replayVideoPath}
                    autoPlay
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 font-mono text-sm">
                    No Detect Footage Found
                  </div>
                )}

                {!playing && replayVideoPath && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                    onClick={togglePlay}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.7)",
                        border: "2px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      <Play
                        size={24}
                        style={{ color: "#fff", marginLeft: 3 }}
                      />
                    </div>
                  </div>
                )}
                <div
                  className="absolute top-2 left-2 text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.72)",
                    color: "#22c55e",
                  }}
                >
                  REPLAY LOG
                </div>
              </div>
              <div className="px-4 py-3">
                <div
                  className="w-full h-1 rounded-full mb-3 cursor-pointer"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: "#ef4444",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={restart}
                      className="p-1 rounded"
                      style={{ color: "#94a3b8" }}
                    >
                      <SkipBack size={14} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="p-1 rounded"
                      style={{ color: "#94a3b8" }}
                    >
                      {playing ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      className="p-1 rounded"
                      style={{ color: "#94a3b8" }}
                    >
                      <SkipBack size={14} style={{ transform: "scaleX(-1)" }} />
                    </button>
                  </div>
                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: "#64748b" }}
                  >
                    <span>
                      {videoRef.current
                        ? Math.floor(videoRef.current.currentTime)
                        : 0}
                      s /{" "}
                      {videoRef.current
                        ? Math.floor(videoRef.current.duration)
                        : 0}
                      s
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "#94a3b8",
                      }}
                    >
                      1x
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
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
                  AI Detection Breakdown
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: "var(--fg2)" }}
                    >
                      Confidence Score
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-sm font-bold"
                      style={{
                        backgroundColor: "rgba(34,197,94,0.15)",
                        color: "#22c55e",
                      }}
                    >
                      {(event.aiConfidence / 100).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: "var(--fg2)" }}
                    >
                      Precision Score
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-sm font-bold"
                      style={{
                        backgroundColor: "rgba(34,197,94,0.15)",
                        color: "#22c55e",
                      }}
                    >
                      {(event.reliabilityScore / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-xs mb-2" style={{ color: "var(--fg2)" }}>
                  Detected Classes
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {detectedClasses.map((cls) => (
                    <span
                      key={cls}
                      className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                      style={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--fg)",
                      }}
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-xl overflow-hidden flex flex-col"
                style={{
                  backgroundColor: "var(--subtle)",
                  border: "1px solid var(--border)",
                  flex: 1,
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--fg)" }}
                  >
                    Linked SMS Alert
                  </span>
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.15)",
                      color: "#8b5cf6",
                    }}
                  >
                    💬 {event.linkedWitnesses.size} SMS Messages
                  </span>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
                  {event.linkedWitnesses.reports.map((sms, i) => (
                    <div
                      key={i}
                      className="px-4 py-3"
                      style={{
                        borderBottom:
                          i < event.linkedWitnesses.size - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-mono font-medium"
                          style={{ color: "var(--fg)" }}
                        >
                          {sms.phone}
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded text-xs font-semibold"
                          style={{
                            backgroundColor: "rgba(139,92,246,0.2)",
                            color: "#8b5cf6",
                          }}
                        >
                          {sms.language}
                        </span>
                        <span
                          className="text-xs ml-auto"
                          style={{ color: "var(--fg2)" }}
                        >
                          {sms.time}
                        </span>
                      </div>
                      <div
                        className="text-xs italic mb-1"
                        style={{ color: "var(--fg2)" }}
                      >
                        {sms.original}
                      </div>
                      <div className="text-xs" style={{ color: "var(--fg)" }}>
                        → {sms.translation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Dispatch + Operator Log ── */}
          <div className="grid grid-cols-2 gap-4 px-4 pb-4">
            {/* Dispatch Details */}
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
                Dispatch details
              </div>
              {getResponseData(timeline[3].time).map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-start py-1.5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span className="text-xs" style={{ color: "var(--fg2)" }}>
                    {label}
                  </span>
                  <span
                    className="text-xs font-medium text-right"
                    style={{ color: "var(--fg)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
              <div className="mt-3">
                <div className="text-xs mb-1" style={{ color: "var(--fg2)" }}>
                  Resolution notes
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--fg)" }}
                >
                  Two-vehicle collision. One minor injury transported to
                  Rajavithi Hospital. Road cleared by 08:42. Traffic resumed
                  normally.
                </div>
              </div>
            </div>

            {/* Operator Action Log */}
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
                Operator action log
              </div>
              <div className="space-y-3">
                {operatorLog.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: log.color }}
                      />
                      {i < operatorLog.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{
                            backgroundColor: "var(--border)",
                            minHeight: "16px",
                          }}
                        />
                      )}
                    </div>
                    <div className="pb-1">
                      <div
                        className="text-xs font-medium"
                        style={{ color: "var(--fg)" }}
                      >
                        {log.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--fg2)" }}
                      >
                        {log.time} · {log.actor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Final Outcome + Post-incident Notes ── */}
          <div className="grid grid-cols-2 gap-4 px-4 pb-5">
            {/* Final Outcome */}
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
                Final outcome
              </div>
              <div className="flex gap-2 mb-3">
                {["Resolved", "Ongoing", "False alarm"].map((o, i) => (
                  <span
                    key={o}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor:
                        i === 0 ? "rgba(34,197,94,0.15)" : "var(--card)",
                      color: i === 0 ? "#22c55e" : "var(--fg2)",
                      border:
                        i === 0
                          ? "1px solid rgba(34,197,94,0.3)"
                          : "1px solid var(--border)",
                    }}
                  >
                    {o}
                  </span>
                ))}
              </div>
              {[
                ["Incident type", event.vehicleType + " collision"],
                ["Vehicles involved", "2"],
                [
                  "Injuries",
                  <span style={{ color: "#f97316" }}>1 {event.severity}</span>,
                ],
                ["Weather", event.condition],
                ["Camera", <span style={{ color: "#3b82f6" }}>CAM-N-112</span>],
                ["NVR", "NVR-001 · Ch 1"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-1.5 capitalize"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span className="text-xs " style={{ color: "var(--fg2)" }}>
                    {label}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--fg)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Post-incident Notes */}
            <div
              className="rounded-xl p-4 flex flex-col"
              style={{
                backgroundColor: "var(--subtle)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="text-xs font-semibold mb-3"
                style={{ color: "var(--fg)" }}
              >
                Post-incident notes
              </div>
              <div
                className="text-xs leading-relaxed flex-1"
                style={{ color: "var(--fg)" }}
              >
                {event.note}
              </div>
              <div
                className="flex items-center justify-between mt-4 pt-3"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span className="text-xs" style={{ color: "var(--fg2)" }}>
                  Last edited by Operator A · 08:45 AM
                </span>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--fg)",
                  }}
                >
                  Edit notes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end scrollable body */}
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value, color }) {
  return (
    <div
      className="flex-1 h-2 rounded-full overflow-hidden"
      style={{ backgroundColor: "var(--border)" }}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ title, children, action }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
          {title}
        </span>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

// ─── Info Grid Row ────────────────────────────────────────────────────────────
function InfoRow({ label, value, badge }) {
  return (
    <div>
      <div className="text-xs mb-0.5" style={{ color: "var(--fg2)" }}>
        {label}
      </div>
      {badge ? (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold"
          style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          {value}
        </span>
      ) : (
        <div className="text-sm font-medium" style={{ color: "var(--fg)" }}>
          {value}
        </div>
      )}
    </div>
  );
}

// ─── Severity colors ──────────────────────────────────────────────────────────
const severityColors = {
  Critical: { bg: "rgba(239,68,68,0.15)", text: "#ef4444" },
  High: { bg: "rgba(249,115,22,0.15)", text: "#f97316" },
  Medium: { bg: "rgba(234,179,8,0.15)", text: "#eab308" },
  Low: { bg: "rgba(59,130,246,0.15)", text: "#3b82f6" },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InvestigationCenter({ camera, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);
  const [playingEvent, setPlayingEvent] = useState(null);
  const showToast = (msg, type = "info") => setToast({ message: msg, type });
  const { data, isLoading } = useGetIncidentsByIDQuery(camera.incidents);

  if (!camera) return null;
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <>data is empty</>;
  }
  // Derived / mock device info
  const nvrMock = {
    id: camera.id,
    name: camera.name,
    model: "Hikvision DS",
    channel: "Channel 1",
    status: camera.status,
    ip: "192.168." + camera.id.replace(/\D/g, "").slice(0, 3).padEnd(3, "0"),
    codec: camera.videoCodec,
    fps: camera.FPS + " FPS",
    res: camera.resolution,
    location: camera.location,
    rtspPort: camera.port,
    usedGb: "83.51",
    usedPct: 82,
    recordings: camera.activityToday ?? 8,
    lastAct: formatDate(camera.createdAt),
    createdBy: "Operator A",
  };

  const aiClasses = [
    { label: "Vehicles", value: 93.4, color: "#22c55e" },
    { label: "Human", value: 91.1, color: "#22c55e" },
    { label: "Major Accident", value: 73.4, color: "#f97316" },
    { label: "Minor Accident", value: 53.4, color: "#ef4444" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 0,
      }}
    >
      {/* ── Top header bar ── */}
      <div className="flex-shrink-0 px-1 pb-4">
        <div className="flex items-start justify-between gap-4">
          {/* Left: back + title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{
                color: "var(--fg2)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--fg)" }}
                >
                  {camera.name || camera.id}
                </h2>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold"
                  style={{
                    backgroundColor:
                      camera.status === "Online"
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(239,68,68,0.15)",
                    color: camera.status === "Online" ? "#22c55e" : "#ef4444",
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full inline-block ${camera.status === "Online" ? "animate-pulse" : ""}`}
                    style={{
                      backgroundColor:
                        camera.status === "Online" ? "#22c55e" : "#ef4444",
                    }}
                  />
                  {camera.status === "Online" ? "Live" : camera.status}
                </span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--fg2)" }}>
                {camera.id}
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() =>
                showToast(`Delete request sent for ${camera.id}`, "info")
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#ef4444", color: "#fff" }}
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 mt-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {[
            { id: "overview", label: "Overview" },
            { id: "events", label: "Events Log" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 text-sm font-medium transition-colors relative"
              style={{
                color: activeTab === tab.id ? "#3b82f6" : "var(--fg2)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                  style={{ backgroundColor: "#3b82f6" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {/* ══ OVERVIEW TAB ══ */}
        {activeTab === "overview" && (
          <>
            {/* Camera Overview */}
            <SectionCard title="Camera Overview">
              {/* Live stream */}
              <LiveStreamView camera={camera} />

              {/* Stat cards row */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {/* Recordings */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--subtle)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <HardDrive size={14} style={{ color: "var(--fg2)" }} />
                    <span className="text-xs" style={{ color: "var(--fg2)" }}>
                      Recordings
                    </span>
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--fg)" }}
                  >
                    {nvrMock.recordings}
                  </div>
                </div>

                {/* Network Status */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--subtle)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wifi size={14} style={{ color: "var(--fg2)" }} />
                    <span className="text-xs" style={{ color: "var(--fg2)" }}>
                      Network Status
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#22c55e" }}
                    >
                      Strong
                    </span>
                    <Activity size={13} style={{ color: "#22c55e" }} />
                  </div>
                </div>

                {/* NVR Recording */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--subtle)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Radio size={14} style={{ color: "var(--fg2)" }} />
                    <span className="text-xs" style={{ color: "var(--fg2)" }}>
                      NVR Recording Status
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#22c55e" }}
                    >
                      Recording
                    </span>
                  </div>
                </div>

                {/* Last Activity */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--subtle)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} style={{ color: "var(--fg2)" }} />
                    <span className="text-xs" style={{ color: "var(--fg2)" }}>
                      Last Activity
                    </span>
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: "var(--fg)" }}
                  >
                    {nvrMock.lastAct}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* AI Detection Configuration */}
            <SectionCard
              title="AI Detection Configuration"
              action={
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ border: "1px solid #22c55e", color: "#22c55e" }}
                  >
                    Active
                  </span>
                  <button
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: "var(--subtle)",
                      border: "1px solid var(--border)",
                      color: "var(--fg2)",
                    }}
                  >
                    Auto Detect
                  </button>
                </div>
              }
            >
              {/* Model info */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  {
                    label: "Model",
                    value: "YOLOv11",
                    sub: "Object Detection (Fast)",
                  },
                  {
                    label: "Avg Confidence",
                    value: `${camera.aiHealth}.00%`,
                    sub: "Last 24h on this camera",
                  },
                ].map(({ label, value, sub }) => (
                  <div
                    key={label}
                    className="rounded-xl p-5"
                    style={{
                      backgroundColor: "var(--subtle)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="text-xs mb-2"
                      style={{ color: "var(--fg2)" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--fg)" }}
                    >
                      {value}
                    </div>
                    <div className="text-xs" style={{ color: "var(--fg2)" }}>
                      {sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detection class bars */}
              <div className="mb-1">
                <div
                  className="text-xs font-semibold mb-3"
                  style={{ color: "var(--fg2)" }}
                >
                  Detection Classes (mAP@50)
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {aiClasses.map((cls) => (
                    <div key={cls.label} className="flex items-center gap-3">
                      <span
                        className="text-xs w-28 flex-shrink-0"
                        style={{ color: "var(--fg)" }}
                      >
                        {cls.label}
                      </span>
                      <ProgressBar value={cls.value} color={cls.color} />
                      <span
                        className="text-xs font-semibold w-14 text-right flex-shrink-0"
                        style={{ color: "var(--fg2)" }}
                      >
                        {cls.value.toFixed(2)} %
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threshold footer */}
              <div
                className="flex items-center gap-6 mt-4 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {[
                  ["Confidence Threshold", "30%"],
                  ["Overlap Threshold", "50%"],
                  ["Inference", "~45ms/frame"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="text-xs"
                    style={{ color: "var(--fg2)" }}
                  >
                    {k}:{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "var(--fg)" }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Device Information */}
            <SectionCard
              title="Device Information"
              action={
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: "var(--subtle)",
                    border: "1px solid var(--border)",
                    color: "var(--fg2)",
                  }}
                >
                  <Edit2 size={12} /> Edit Details
                </button>
              }
            >
              <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                <InfoRow
                  label="Camera Name"
                  value={nvrMock.name || nvrMock.id}
                />
                <InfoRow label="Camera ID" value={nvrMock.id} />
                <InfoRow label="Status" value="Live" badge />
                <InfoRow label="Frame Rate (FPS)" value={nvrMock.fps} />
                <InfoRow label="Resolution" value={nvrMock.res} />
                <InfoRow
                  label="RTSP Link"
                  value={nvrMock.rtsp || "rtsp://10.0.0.1:554/stream1"}
                />
                <InfoRow label="RTSP Port" value={nvrMock.rtspPort} />
                <InfoRow label="Location" value={nvrMock.location} />
                <InfoRow label="Created By" value={nvrMock.createdBy} />
                <InfoRow label="Video Codec" value={nvrMock.codec} />
                <InfoRow label="Last Activity Date" value={nvrMock.lastAct} />
              </div>
            </SectionCard>

            {/* Recording & Storage */}
            <SectionCard
              title="Recording & Storage"
              action={
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: "var(--subtle)",
                      border: "1px solid var(--border)",
                      color: "var(--fg2)",
                    }}
                  >
                    Unlink
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: "var(--subtle)",
                      border: "1px solid var(--border)",
                      color: "var(--fg2)",
                    }}
                  >
                    View Details <ChevronRight size={12} />
                  </button>
                </div>
              }
            >
              {/* Recording active banner */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg mb-5 text-sm"
                style={{
                  backgroundColor: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#16a34a",
                }}
              >
                <CheckCircle size={15} />
                Recording Active: This camera is linked to an NVR and currently
                recording footage as scheduled.
              </div>

              <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                <InfoRow label="NVR Name" value={nvrMock.name} />
                <InfoRow label="NVR Model" value={nvrMock.model} />
                <InfoRow label="Channel Number" value={nvrMock.channel} />
                <InfoRow label="Channel Number" value={nvrMock.channel} />
                <InfoRow label="NVR Status" value="Live" badge />
                <InfoRow label="NVR IP" value={nvrMock.ip} />
                <div>
                  <div
                    className="text-xs mb-0.5"
                    style={{ color: "var(--fg2)" }}
                  >
                    NVR Recording Status
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#22c55e" }}
                    >
                      Recording
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: "var(--fg2)" }}>
                    Used Space
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--fg)" }}
                    >
                      {nvrMock.usedGb} Gb
                    </span>
                    <span
                      className="text-xs font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: "rgba(249,115,22,0.15)",
                        color: "#f97316",
                      }}
                    >
                      {nvrMock.usedPct}%
                    </span>
                  </div>
                  <div
                    className="mt-1.5 w-full h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${nvrMock.usedPct}%`,
                        backgroundColor: "#f97316",
                      }}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>
          </>
        )}

        {/* ══ EVENTS LOG TAB ══ */}
        {activeTab === "events" && (
          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="flex items-center gap-2 px-5 py-3.5"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <Clock size={14} style={{ color: "#3b82f6" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--fg)" }}
              >
                Historical Event Archive
              </span>
              <span className="ml-auto text-xs" style={{ color: "var(--fg2)" }}>
                Click ▶ to replay footage
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid var(--border)",
                      backgroundColor: "var(--subtle)",
                    }}
                  >
                    {[
                      "Video Clip",
                      "Time & Location",
                      "Type",
                      "Severity & AI Score",
                      "Linked SMS",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left font-semibold"
                        style={{ color: "var(--fg2)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.incidents?.map((evt, i) => {
                    const sc =
                      severityColors[evt.severity] || severityColors.Low;
                    return (
                      <tr
                        key={evt.id}
                        className="hover:bg-slate-50 transition-colors"
                        style={{
                          borderBottom:
                            i < historicalEvents.length - 1
                              ? "1px solid var(--border)"
                              : "none",
                        }}
                      >
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setPlayingEvent(evt)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors hover:opacity-80"
                            style={{
                              backgroundColor: "rgba(59,130,246,0.12)",
                              color: "#3b82f6",
                              border: "1px solid rgba(59,130,246,0.25)",
                            }}
                          >
                            <Play size={11} />
                            <span>Play</span>
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className="font-semibold"
                            style={{ color: "var(--fg)" }}
                          >
                            {formatTime(evt.createdAt)}
                          </div>
                          <div style={{ color: "var(--fg2)" }}>
                            {evt.location}
                          </div>
                        </td>
                        <td
                          className="px-4 py-3 capitalize"
                          style={{ color: "var(--fg2)" }}
                        >
                          {evt.vehicleType}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: sc.bg, color: sc.text }}
                          >
                            {evt.severity}
                          </span>
                          <div
                            className="text-xs mt-1 font-mono"
                            style={{ color: "var(--fg2)" }}
                          >
                            AI: {evt.aiConfidence}%
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {evt.linkedWitnesses.size > 0 ? (
                            <span
                              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{
                                backgroundColor: "rgba(139,92,246,0.15)",
                                color: "#8b5cf6",
                              }}
                            >
                              <MessageSquare size={10} />
                              {evt.linkedWitnesses.size} SMS
                            </span>
                          ) : (
                            <span style={{ color: "var(--fg2)" }}>—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-0.5 rounded text-xs font-semibold"
                            style={{
                              backgroundColor:
                                evt.status === "Resolved"
                                  ? "rgba(34,197,94,0.1)"
                                  : "var(--subtle)",
                              color:
                                evt.status === "Resolved"
                                  ? "#16a34a"
                                  : "var(--fg2)",
                              border: `1px solid ${evt.status === "Resolved" ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
                            }}
                          >
                            {evt.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {playingEvent && (
        <VideoModal
          event={playingEvent}
          onClose={() => setPlayingEvent(null)}
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

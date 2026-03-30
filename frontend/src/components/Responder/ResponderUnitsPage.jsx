import { useState } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CornerUpLeft,
  Info,
  Zap,
} from "lucide-react";
import { responderUnits, incidents } from "../../data/mockData";
import { useGetUnitsQuery } from "../../redux/api/unit";
import formatTime from "../../helper/formatTime";
import {
  useCreateIncidentMutation,
  useGetIncidentQuery,
  useGetIncidentsQuery,
} from "../../redux/api/incident";
import formatDate from "../../helper/formatDate";
import {
  useCreateResponderUnitMutation,
  useUpdateResponderUnitMutation,
} from "../../redux/api/responderUnits";
import Loader from "../Loader";

// ---------------------------------------------------------------------------
// RecallModal – dark themed
// ---------------------------------------------------------------------------
function RecallModal({ unit, onClose }) {
  const [reason, setReason] = useState("Incident resolved");
  const [update] = useUpdateResponderUnitMutation();

  const updateHandler = () => {
    const data = {
      recalled: { state: true, reason: "Incident resolved" },
    };
    update({ id: unit.ResponderUnit._id, body: data }).then(() => onClose());
  };
  if (!unit) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 460,
          maxWidth: "96vw",
          backgroundColor: "var(--card)",
          borderRadius: "1rem",
          border: "1px solid var(--border)",
          overflow: "hidden",
          boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--subtle)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "0.625rem",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CornerUpLeft size={16} color="#ef4444" />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "var(--fg)",
                fontWeight: 700,
                fontSize: "0.9375rem",
              }}
            >
              Recall Unit
            </div>
            <div
              style={{
                color: "var(--fg3)",
                fontSize: "0.75rem",
                fontFamily: "monospace",
              }}
            >
              {unit.id}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--fg3)",
              cursor: "pointer",
              padding: "0.25rem",
              fontSize: "1.1rem",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
          }}
        >
          {/* Warning box */}
          <div
            style={{
              backgroundColor: "var(--subtle)",
              borderRadius: "0.75rem",
              padding: "0.875rem 1rem",
              color: "var(--fg2)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              border: "1px solid var(--border)",
            }}
          >
            Are you sure you want to recall{" "}
            <strong style={{ color: "var(--fg)" }}>{unit.id}</strong>? It will
            be marked as <strong style={{ color: "#22c55e" }}>Available</strong>{" "}
            and unassigned from its current incident.
          </div>

          {/* Recall reason */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <label
              style={{
                color: "var(--fg3)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Recall Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                backgroundColor: "var(--subtle)",
                border: "1.5px solid #3b82f6",
                borderRadius: "0.5rem",
                color: "var(--fg)",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                outline: "none",
                cursor: "pointer",
                width: "100%",
                boxShadow: "0 0 0 3px rgba(59,130,246,0.1)",
              }}
            >
              <option value="Incident resolved">Incident resolved</option>
              <option value="False alarm">False alarm</option>
              <option value="Unit reassigned">Unit reassigned</option>
              <option value="Unit damaged">Unit damaged</option>
              <option value="Operator request">Operator request</option>
            </select>
          </div>

          {/* Audit log note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--fg3)",
              fontSize: "0.75rem",
            }}
          >
            <Info size={13} />
            <span>This action will be recorded in the Audit Log</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
            padding: "0.875rem 1.25rem",
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--subtle)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              color: "var(--fg2)",
              padding: "0.45rem 1.25rem",
              fontSize: "0.875rem",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => updateHandler()}
            style={{
              background: "#ef4444",
              border: "1px solid #dc2626",
              borderRadius: "0.5rem",
              color: "#fff",
              padding: "0.45rem 1.25rem",
              fontSize: "0.875rem",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <CornerUpLeft size={14} />
            Confirm Recall
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DispatchModal
// ---------------------------------------------------------------------------
const PRIORITIES = [
  { id: "Critical", dot: "#ef4444" },
  { id: "High", dot: "#f59e0b" },
  { id: "Standard", dot: "#22c55e" },
];

function DispatchModal({ unit, onClose, incidents }) {
  const [incidentId, setIncidentId] = useState(incidents[0]?._id || "");
  const [priority, setPriority] = useState("Critical");
  const [notes, setNotes] = useState("");
  const [create] = useCreateResponderUnitMutation();
  if (!unit) return null;

  const onSubmitHandler = () => {
    const data = {
      DispatchUnit: [unit._id],
      Incident: incidentId,
      Priority: priority,
      resolved: true,
      ResolutionNotes: notes,
    };
    create(data).then(() => onClose());
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 500,
          maxWidth: "96vw",
          backgroundColor: "var(--card)",
          borderRadius: "1rem",
          border: "1px solid var(--border)",
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
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--subtle)",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #f97316, #ef4444)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "var(--fg)",
                fontWeight: 700,
                fontSize: "0.9375rem",
              }}
            >
              Dispatch Unit
            </div>
            <div
              style={{
                color: "var(--fg3)",
                fontSize: "0.75rem",
                fontFamily: "monospace",
              }}
            >
              {unit.id}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--fg3)",
              cursor: "pointer",
              padding: "0.25rem",
              fontSize: "1.2rem",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
          }}
        >
          {/* Assign to Incident */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <label
              style={{
                color: "var(--fg3)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Assign to Incident
            </label>
            <select
              value={incidentId}
              onChange={(e) => setIncidentId(e.target.value)}
              style={{
                backgroundColor: "var(--subtle)",
                border: "1.5px solid #3b82f6",
                borderRadius: "0.5rem",
                color: "var(--fg)",
                padding: "0.55rem 0.75rem",
                fontSize: "0.875rem",
                outline: "none",
                cursor: "pointer",
                width: "100%",
                boxShadow: "0 0 0 3px rgba(59,130,246,0.1)",
              }}
            >
              {incidents.map((inc) => (
                <option key={inc.id} value={inc._id}>
                  {inc.id} — {inc.location.split(",")[0]} · {inc.severity}
                </option>
              ))}
            </select>
          </div>

          {/* Dispatch Priority */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label
              style={{
                color: "var(--fg3)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Dispatch Priority
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.5rem",
              }}
            >
              {PRIORITIES.map((p) => {
                const active = priority === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPriority(p.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      padding: "0.6rem 0.5rem",
                      borderRadius: "0.5rem",
                      border: active
                        ? `1.5px solid ${p.dot}`
                        : "1px solid var(--border)",
                      background: active ? `${p.dot}18` : "var(--subtle)",
                      color: active ? p.dot : "var(--fg2)",
                      fontWeight: active ? 700 : 500,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: p.dot,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {p.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <label
              style={{
                color: "var(--fg3)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Operator Notes{" "}
              <span style={{ textTransform: "none", fontWeight: 400 }}>
                (Optional)
              </span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes before dispatch..."
              rows={3}
              style={{
                backgroundColor: "var(--subtle)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                color: "var(--fg)",
                padding: "0.6rem 0.75rem",
                fontSize: "0.875rem",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Audit log note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--fg3)",
              fontSize: "0.75rem",
            }}
          >
            <Info size={13} />
            <span>This action will be recorded in the Audit Log</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
            padding: "0.875rem 1.25rem",
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--subtle)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              color: "var(--fg2)",
              padding: "0.45rem 1.25rem",
              fontSize: "0.875rem",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmitHandler()}
            style={{
              background: "linear-gradient(135deg, #f97316, #ef4444)",
              border: "none",
              borderRadius: "0.5rem",
              color: "#fff",
              padding: "0.45rem 1.25rem",
              fontSize: "0.875rem",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Zap size={14} fill="#fff" />
            Confirm Dispatch
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const TYPE_COLOR = {
  Ambulance: "#ef4444",
  Police: "#3b82f6",
  "Fire & Rescue": "#f97316",
};

const STATUS_BADGE = {
  Available: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", dot: "#22c55e" },
  "En Route": { bg: "rgba(59,130,246,0.12)", color: "#3b82f6", dot: "#3b82f6" },
  "On Scene": { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", dot: "#f59e0b" },
};

function StatusBadge({ status }) {
  const s = STATUS_BADGE[status] || {
    bg: "rgba(107,114,128,0.15)",
    color: "#9ca3af",
    dot: "#9ca3af",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        background: s.bg,
        color: s.color,
        borderRadius: "9999px",
        padding: "0.2rem 0.65rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
          display: "inline-block",
        }}
      />
      {status}
    </span>
  );
}

const DISPATCH_INCIDENT = "INC-2023-8901";
const DISPATCH_LOCATION = "Vibhavadi-Rangsit Rd, Exit 14, Bang Sue";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function ResponderUnitsPage() {
  const [units, setUnits] = useState(() =>
    responderUnits.map((u) => ({ ...u })),
  );
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [recallUnit, setRecallUnit] = useState(null);
  const [dispatchUnit, setDispatchUnit] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    field: "",
    value: "",
    search: "",
  });
  const { data, isLoading } = useGetUnitsQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });
  const { data: IncidentData, isLoading: IncidentIsLoading } =
    useGetIncidentsQuery(searchQuery, {
      refetchOnMountOrArgChange: true,
    });
  if (isLoading && IncidentIsLoading) {
    return <Loader />;
  }
  if (!IncidentData) {
    return <Loader />;
  }
  // ---- derived counts for tabs ----
  const countAll = data.length || 0;
  const countAmbulance = data.filter((u) => u.type === "Ambulance").length;
  const countPolice = data.filter((u) => u.type === "Police").length;
  const countFire = data.filter((u) => u.type === "Fire & Rescue").length;

  // ---- filtering ----
  const filtered = data.filter((u) => {
    if (typeFilter !== "All" && u.type !== typeFilter) return false;
    if (statusFilter !== "All Statuses" && u.status !== statusFilter)
      return false;
    if (search) {
      const q = search.toLowerCase();
      if (!u.id.toLowerCase().includes(q) && !u.type.toLowerCase().includes(q))
        return false;
    }
    return true;
  });

  const totalEntries = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / perPage));
  const safePage = Math.min(page, totalPages);
  const start = totalEntries === 0 ? 0 : (safePage - 1) * perPage + 1;
  const end = Math.min(safePage * perPage, totalEntries);
  const pageData = filtered.slice(start - 1, end);

  // ---- actions ----
  function handleDispatchConfirm(unitId, incident, priority, notes) {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? {
              ...u,
              status: "En Route",
              incidentId: incident?.id || DISPATCH_INCIDENT,
              location: incident?.location || DISPATCH_LOCATION,
            }
          : u,
      ),
    );
    setDispatchUnit(null);
  }

  function handleRecallConfirm(unitId) {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? { ...u, status: "Available", incidentId: null, location: null }
          : u,
      ),
    );
    setRecallUnit(null);
  }

  const TABS = [
    { label: "All", count: countAll },
    { label: "Ambulance", count: countAmbulance },
    { label: "Police", count: countPolice },
    { label: "Fire & Rescue", count: countFire },
  ];

  const iconBtn = {
    background: "var(--subtle)",
    border: "1px solid var(--border)",
    borderRadius: "0.375rem",
    color: "var(--fg2)",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  };

  return (
    <>
      <RecallModal
        unit={recallUnit}
        onClose={() => setRecallUnit(null)}
        onConfirm={handleRecallConfirm}
      />
      <DispatchModal
        incidents={IncidentData}
        unit={dispatchUnit}
        onClose={() => setDispatchUnit(null)}
        onConfirm={handleDispatchConfirm}
      />

      <div
        style={{
          padding: "1.5rem",
          minHeight: "100vh",
          background: "var(--bg)",
        }}
      >
        {/* ---- Header ---- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Responder Units
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: "0.6rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--fg3)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search units..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{
                  paddingLeft: "2rem",
                  paddingRight: "0.75rem",
                  paddingTop: "0.45rem",
                  paddingBottom: "0.45rem",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  background: "var(--card)",
                  color: "var(--fg)",
                  fontSize: "0.875rem",
                  outline: "none",
                  width: 200,
                }}
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              style={{
                padding: "0.45rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                background: "var(--card)",
                color: "var(--fg)",
                fontSize: "0.875rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option>All Statuses</option>
              <option>Available</option>
              <option>En Route</option>
              <option>On Scene</option>
            </select>

            {/* Dispatch button */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 1rem",
                background: "#ef4444",
                border: "none",
                borderRadius: "0.5rem",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <Plus size={15} />
              Dispatch Unit
            </button>
          </div>
        </div>

        {/* ---- Type filter tabs ---- */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          {TABS.map((tab) => {
            const active = typeFilter === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => {
                  setTypeFilter(tab.label);
                  setPage(1);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: active ? 700 : 500,
                  fontSize: "0.8125rem",
                  background: active ? "var(--fg)" : "var(--subtle)",
                  color: active ? "var(--bg)" : "var(--fg2)",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {tab.label}
                <span
                  style={{
                    background: active
                      ? "rgba(255,255,255,0.25)"
                      : "var(--border)",
                    color: active ? "#fff" : "var(--fg3)",
                    borderRadius: "9999px",
                    padding: "0 0.45rem",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    lineHeight: "1.4",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---- Table card ---- */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "0.75rem",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 700,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {[
                    "Unit ID",
                    "Unit Type",
                    "Status",
                    "Location Assignment",
                    "Connected On",
                    "Action",
                  ].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--fg3)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        background: "var(--subtle)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "2.5rem",
                        textAlign: "center",
                        color: "var(--fg3)",
                        fontSize: "0.875rem",
                      }}
                    >
                      No units match the current filters.
                    </td>
                  </tr>
                ) : (
                  pageData?.map((unit, idx) => (
                    <tr
                      key={unit.id}
                      style={{
                        borderBottom:
                          idx < pageData.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--subtle)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {/* Unit ID */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            color: TYPE_COLOR[unit.type] || "var(--fg)",
                          }}
                        >
                          {unit.id}
                        </span>
                      </td>

                      {/* Unit Type */}
                      <td
                        style={{
                          padding: "0.75rem 1rem",
                          color: "var(--fg)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {unit.type}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <StatusBadge status={unit.status} />
                      </td>

                      {/* Location */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {unit?.ResponderUnit?.Incident?.location ? (
                          <div>
                            <div
                              style={{
                                fontWeight: 700,
                                fontSize: "0.8rem",
                                color: "var(--fg)",
                              }}
                            >
                              Dispatched for {unit.incidentId}
                            </div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--fg3)",
                                marginTop: "0.1rem",
                              }}
                            >
                              {unit.ResponderUnit.Incident.location}
                            </div>
                          </div>
                        ) : (
                          <span
                            style={{
                              color: "var(--fg3)",
                              fontSize: "0.875rem",
                            }}
                          >
                            —
                          </span>
                        )}
                      </td>

                      {/* Connected On */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--fg)",
                            fontWeight: 500,
                          }}
                        >
                          {formatDate(unit.updatedAt)}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--fg3)",
                            marginTop: "0.1rem",
                          }}
                        >
                          {unit.connectedTime}
                        </div>
                      </td>

                      {/* Action */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {unit.status === "Available" ? (
                          <button
                            onClick={() => setDispatchUnit(unit)}
                            style={{
                              background: "#ef4444",
                              border: "none",
                              borderRadius: "0.375rem",
                              color: "#fff",
                              padding: "0.35rem 0.9rem",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Dispatch
                          </button>
                        ) : (
                          <button
                            onClick={() => setRecallUnit(unit)}
                            style={{
                              background: "transparent",
                              border: "1px solid #ef4444",
                              borderRadius: "0.375rem",
                              color: "#ef4444",
                              padding: "0.35rem 0.9rem",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            <CornerUpLeft size={12} />
                            Recall
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ---- Pagination ---- */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderTop: "1px solid var(--border)",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {/* Left: per-page + range info */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span style={{ fontSize: "0.8rem", color: "var(--fg3)" }}>
                Entries per page
              </span>
              <input
                type="number"
                min={1}
                value={perPage}
                onChange={(e) => {
                  const v = Math.max(1, parseInt(e.target.value) || 1);
                  setPerPage(v);
                  setPage(1);
                }}
                style={{
                  width: 52,
                  padding: "0.25rem 0.4rem",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  background: "var(--subtle)",
                  color: "var(--fg)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  outline: "none",
                }}
              />
              <span style={{ fontSize: "0.8rem", color: "var(--fg3)" }}>
                {totalEntries === 0
                  ? "0 entries"
                  : `${start} - ${end} of ${totalEntries} entries`}
              </span>
            </div>

            {/* Right: page controls */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <button
                onClick={() => setPage(1)}
                disabled={safePage === 1}
                style={{ ...iconBtn, opacity: safePage === 1 ? 0.4 : 1 }}
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                style={{ ...iconBtn, opacity: safePage === 1 ? 0.4 : 1 }}
              >
                <ChevronLeft size={14} />
              </button>

              <input
                type="number"
                min={1}
                max={totalPages}
                value={safePage}
                onChange={(e) => {
                  const v = Math.min(
                    totalPages,
                    Math.max(1, parseInt(e.target.value) || 1),
                  );
                  setPage(v);
                }}
                style={{
                  width: 44,
                  padding: "0.25rem 0.4rem",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  background: "var(--subtle)",
                  color: "var(--fg)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  outline: "none",
                }}
              />
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--fg3)",
                  whiteSpace: "nowrap",
                }}
              >
                of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                style={{
                  ...iconBtn,
                  opacity: safePage === totalPages ? 0.4 : 1,
                }}
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={safePage === totalPages}
                style={{
                  ...iconBtn,
                  opacity: safePage === totalPages ? 0.4 : 1,
                }}
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

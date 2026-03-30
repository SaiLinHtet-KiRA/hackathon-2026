import React, { useState, useEffect } from 'react'
import { X, MapPin, Camera, Car, Cpu, MessageSquare, Clock, AlertTriangle } from 'lucide-react'
import { witnessReports } from '../../data/mockData'

const severityColors = {
  Critical: { bg: 'rgba(239,68,68,0.15)', text: '#ef4444', border: 'rgba(239,68,68,0.4)' },
  High: { bg: 'rgba(249,115,22,0.15)', text: '#f97316', border: 'rgba(249,115,22,0.4)' },
  Medium: { bg: 'rgba(234,179,8,0.15)', text: '#eab308', border: 'rgba(234,179,8,0.4)' },
  Low: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', border: 'rgba(59,130,246,0.4)' },
}

const statusColors = {
  'Auto-Detected': { bg: 'rgba(99,102,241,0.15)', text: '#6366f1' },
  'Under Review': { bg: 'rgba(234,179,8,0.15)', text: '#eab308' },
  'Dispatched': { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' },
  'SMS Confirmed': { bg: 'rgba(139,92,246,0.15)', text: '#8b5cf6' },
  'False Alarm': { bg: 'rgba(107,114,128,0.15)', text: '#6b7280' },
}

const langColors = {
  Malay: '#3b82f6',
  Burmese: '#8b5cf6',
  Thai: '#f97316',
  Chinese: '#ef4444',
  Tamil: '#22c55e',
  English: '#06b6d4',
}

function InfoRow({ icon: Icon, label, value, valueStyle }) {
  return (
    <div className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid #21262d' }}>
      <Icon size={14} style={{ color: '#8b949e', marginTop: 2, flexShrink: 0 }} />
      <div className="flex-1 min-w-0">
        <div className="text-xs" style={{ color: '#8b949e' }}>{label}</div>
        <div className="text-sm font-medium mt-0.5" style={valueStyle || { color: '#e6edf3' }}>{value}</div>
      </div>
    </div>
  )
}

export default function IncidentDetailPanel({ incident, onClose }) {
  const [notes, setNotes] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  const linkedWitnesses = witnessReports.filter(w => incident.linkedWitnesses?.includes(w.id))
  const sevColors = severityColors[incident.severity] || severityColors.Low
  const statColors = statusColors[incident.status] || statusColors['Auto-Detected']

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ backgroundColor: `rgba(0,0,0,${visible ? 0.6 : 0})` }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 overflow-y-auto flex flex-col transition-transform duration-300 ease-out"
        style={{
          width: '420px',
          backgroundColor: '#0d1117',
          borderLeft: '1px solid #30363d',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #21262d', background: 'linear-gradient(90deg, rgba(59,130,246,0.08), transparent)' }}
        >
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: '#8b949e' }}>INCIDENT DETAILS</div>
            <div className="font-bold text-white font-mono">{incident.id}</div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            style={{ color: '#8b949e' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Status + Severity */}
          <div className="flex gap-2 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: statColors.bg, color: statColors.text }}
            >
              {incident.status}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: sevColors.bg, color: sevColors.text, border: `1px solid ${sevColors.border}` }}
            >
              {incident.severity} Severity
            </span>
          </div>

          {/* Basic Info */}
          <div
            className="rounded-lg px-4 py-1"
            style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
          >
            <InfoRow icon={Clock} label="Timestamp" value={incident.timestamp} />
            <InfoRow icon={Camera} label="Camera ID" value={incident.cameraId} valueStyle={{ color: '#3b82f6', fontFamily: 'monospace' }} />
            <InfoRow icon={MapPin} label="Location" value={incident.location} />
            <InfoRow icon={Car} label="Vehicle Type" value={incident.vehicleType} />
          </div>

          {/* AI Fusion Analysis */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid #21262d' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ backgroundColor: 'rgba(59,130,246,0.08)', borderBottom: '1px solid #21262d' }}
            >
              <Cpu size={14} className="text-blue-400" />
              <span className="text-xs font-semibold text-white">AI Fusion Analysis</span>
            </div>
            <div className="p-4 space-y-3" style={{ backgroundColor: '#161b22' }}>
              {/* Score grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'CCTV Conf.', value: `${incident.aiConfidence}%`, color: '#3b82f6' },
                  { label: 'Model Prec.', value: `${incident.modelPrecision}%`, color: '#8b5cf6' },
                  { label: 'Reliability', value: `${incident.reliabilityScore}%`, color: '#ef4444' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="rounded-lg p-2.5 text-center"
                    style={{ backgroundColor: `${s.color}10`, border: `1px solid ${s.color}30` }}
                  >
                    <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* AI Reasoning */}
              <div
                className="rounded-lg p-3 text-xs leading-relaxed"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: '#8b949e', border: '1px solid #21262d' }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: '#c9d1d9' }}>AI Reasoning:</div>
                {incident.aiReasoning}
              </div>
            </div>
          </div>

          {/* Linked Witness Reports */}
          {linkedWitnesses.length > 0 && (
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: '1px solid #21262d' }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ backgroundColor: 'rgba(139,92,246,0.08)', borderBottom: '1px solid #21262d' }}
              >
                <MessageSquare size={14} className="text-purple-400" />
                <span className="text-xs font-semibold text-white">
                  Linked Witness Reports ({linkedWitnesses.length})
                </span>
              </div>
              <div className="divide-y" style={{ borderColor: '#21262d', backgroundColor: '#161b22' }}>
                {linkedWitnesses.map(w => {
                  const wSev = severityColors[w.severity] || severityColors.Low
                  const langColor = langColors[w.language] || '#8b949e'
                  return (
                    <div key={w.id} className="p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold" style={{ color: '#c9d1d9' }}>
                            {w.phone}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-xs font-bold"
                            style={{ backgroundColor: `${langColor}20`, color: langColor }}
                          >
                            {w.language}
                          </span>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: wSev.bg, color: wSev.text }}
                        >
                          {w.severity}
                        </span>
                      </div>
                      <div
                        className="text-xs italic px-2 py-1.5 rounded"
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: '#8b949e', border: '1px solid #21262d' }}
                      >
                        &ldquo;{w.original}&rdquo;
                      </div>
                      <div className="text-xs" style={{ color: '#c9d1d9' }}>
                        {w.translation}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Condition */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
            style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}
          >
            <AlertTriangle size={13} />
            <span className="font-semibold">Road Condition:</span>
            <span>{incident.condition}</span>
          </div>

          {/* Operator Notes */}
          <div>
            <div className="text-xs font-semibold mb-2" style={{ color: '#8b949e' }}>OPERATOR NOTES</div>
            <textarea
              className="w-full px-3 py-2.5 text-sm rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={{
                backgroundColor: '#161b22',
                border: '1px solid #30363d',
                color: '#e6edf3',
                minHeight: '80px',
              }}
              placeholder="Add operator notes here..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pb-2">
            <button
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: '#3b82f6', color: '#fff' }}
            >
              Save Notes
            </button>
            <button
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{ backgroundColor: '#161b22', color: '#8b949e', border: '1px solid #30363d' }}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

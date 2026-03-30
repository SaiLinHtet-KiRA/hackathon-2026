import React, { useState } from 'react'
import { Activity, ChevronDown, ChevronUp } from 'lucide-react'
import { incidents } from '../../data/mockData'

const severityColors = {
  Critical: { bg: 'rgba(239,68,68,0.15)', text: '#ef4444', border: 'rgba(239,68,68,0.4)' },
  High: { bg: 'rgba(249,115,22,0.15)', text: '#f97316', border: 'rgba(249,115,22,0.4)' },
  Medium: { bg: 'rgba(234,179,8,0.15)', text: '#eab308', border: 'rgba(234,179,8,0.4)' },
  Low: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', border: 'rgba(59,130,246,0.4)' },
}

const statusColors = {
  'Auto-Detected': { bg: 'rgba(99,102,241,0.15)', text: '#6366f1', border: 'rgba(99,102,241,0.3)' },
  'Under Review': { bg: 'rgba(234,179,8,0.15)', text: '#eab308', border: 'rgba(234,179,8,0.3)' },
  'Dispatched': { bg: 'rgba(34,197,94,0.15)', text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  'SMS Confirmed': { bg: 'rgba(139,92,246,0.15)', text: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
  'False Alarm': { bg: 'rgba(107,114,128,0.15)', text: '#6b7280', border: 'rgba(107,114,128,0.3)' },
}

function Badge({ label, colorSet }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: colorSet.bg,
        color: colorSet.text,
        border: `1px solid ${colorSet.border}`,
      }}
    >
      {label}
    </span>
  )
}

export default function LiveFeed({ onSelectIncident, selectedIncidentId }) {
  const [sortField, setSortField] = useState('timestamp')
  const [sortDir, setSortDir] = useState('desc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ field }) =>
    sortField === field
      ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
      : <ChevronDown size={12} className="opacity-30" />

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid #21262d' }}
      >
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-blue-400" />
          <span className="font-semibold text-sm text-white">Live Incident Feed</span>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}
          >
            {incidents.length} Active
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs" style={{ color: '#8b949e' }}>Live</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: '1px solid #21262d', backgroundColor: '#0d1117' }}>
              {[
                { label: 'INC ID', field: 'id' },
                { label: 'Timestamp', field: 'timestamp' },
                { label: 'Camera ID', field: 'cameraId' },
                { label: 'Location', field: 'location' },
                { label: 'Vehicle Type', field: 'vehicleType' },
                { label: 'AI %', field: 'aiConfidence' },
                { label: 'Severity', field: 'severity' },
                { label: 'Status', field: 'status' },
              ].map(col => (
                <th
                  key={col.field}
                  className="px-4 py-2.5 text-left font-semibold cursor-pointer hover:text-white transition-colors select-none"
                  style={{ color: '#8b949e' }}
                  onClick={() => handleSort(col.field)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon field={col.field} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc, i) => {
              const isSelected = selectedIncidentId === inc.id
              const sev = severityColors[inc.severity] || severityColors.Low
              const stat = statusColors[inc.status] || statusColors['Auto-Detected']
              return (
                <tr
                  key={inc.id}
                  onClick={() => onSelectIncident(inc)}
                  className="cursor-pointer transition-colors hover:bg-gray-800"
                  style={{
                    borderBottom: i < incidents.length - 1 ? '1px solid #21262d' : 'none',
                    backgroundColor: isSelected ? 'rgba(59,130,246,0.08)' : 'transparent',
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {inc.severity === 'Critical' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                      )}
                      <span className="font-mono font-semibold" style={{ color: '#3b82f6' }}>
                        {inc.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#8b949e' }}>{inc.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs" style={{ color: '#c9d1d9' }}>{inc.cameraId}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#c9d1d9', maxWidth: '160px' }}>
                    <div className="truncate">{inc.location}</div>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#8b949e' }}>{inc.vehicleType}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-1 rounded-full"
                        style={{
                          width: '40px',
                          backgroundColor: '#21262d',
                        }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${inc.aiConfidence}%`,
                            backgroundColor: inc.aiConfidence >= 80 ? '#22c55e' : inc.aiConfidence >= 60 ? '#eab308' : '#ef4444',
                          }}
                        />
                      </div>
                      <span
                        className="font-mono font-semibold"
                        style={{ color: inc.aiConfidence >= 80 ? '#22c55e' : inc.aiConfidence >= 60 ? '#eab308' : '#ef4444' }}
                      >
                        {inc.aiConfidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={inc.severity} colorSet={sev} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={inc.status} colorSet={stat} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

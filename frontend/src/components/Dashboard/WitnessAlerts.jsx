import React from 'react'
import { MessageSquare, Phone } from 'lucide-react'
import { witnessReports } from '../../data/mockData'

const severityColors = {
  Critical: { bg: 'rgba(239,68,68,0.15)', text: '#ef4444', border: 'rgba(239,68,68,0.4)' },
  High: { bg: 'rgba(249,115,22,0.15)', text: '#f97316', border: 'rgba(249,115,22,0.4)' },
  Medium: { bg: 'rgba(234,179,8,0.15)', text: '#eab308', border: 'rgba(234,179,8,0.4)' },
  Low: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', border: 'rgba(59,130,246,0.4)' },
}

const langColors = {
  Malay: '#3b82f6',
  Burmese: '#8b5cf6',
  Thai: '#f97316',
  Chinese: '#ef4444',
  Tamil: '#22c55e',
  English: '#06b6d4',
}

export default function WitnessAlerts() {
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
          <MessageSquare size={15} className="text-purple-400" />
          <span className="text-sm font-semibold text-white">Witness SMS Alerts</span>
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: 'rgba(139,92,246,0.2)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.4)' }}
        >
          {witnessReports.length} New
        </span>
      </div>

      {/* Alert List */}
      <div className="divide-y" style={{ borderColor: '#21262d' }}>
        {witnessReports.map(report => {
          const sev = severityColors[report.severity] || severityColors.Low
          const langColor = langColors[report.language] || '#8b949e'
          return (
            <div key={report.id} className="px-4 py-3 hover:bg-gray-800 transition-colors">
              {/* Phone + Language + Severity */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Phone size={11} style={{ color: '#8b949e' }} />
                  <span className="font-mono text-xs font-semibold" style={{ color: '#c9d1d9' }}>
                    {report.phone}
                  </span>
                  <span
                    className="px-1.5 py-0.5 rounded text-xs font-bold"
                    style={{ backgroundColor: `${langColor}20`, color: langColor, border: `1px solid ${langColor}40` }}
                  >
                    {report.languageCode}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs" style={{ color: '#8b949e' }}>{report.time}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: sev.bg, color: sev.text, border: `1px solid ${sev.border}` }}
                  >
                    {report.severity}
                  </span>
                </div>
              </div>

              {/* Original */}
              <div
                className="text-xs mb-1 italic px-2 py-1.5 rounded"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: '#8b949e', border: '1px solid #21262d' }}
              >
                &ldquo;{report.original}&rdquo;
              </div>

              {/* Translation */}
              <div className="text-xs mb-1.5" style={{ color: '#c9d1d9' }}>
                {report.translation}
              </div>

              {/* Incident Match */}
              <div className="flex items-center gap-1">
                <span className="text-xs" style={{ color: '#8b949e' }}>Match:</span>
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: '#3b82f6' }}
                >
                  {report.incidentMatch}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

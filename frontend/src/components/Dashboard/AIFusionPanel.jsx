import React from 'react'
import { Cpu, ShieldAlert, Siren, AlertTriangle } from 'lucide-react'

export default function AIFusionPanel() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)', background: 'linear-gradient(90deg, rgba(59,130,246,0.07), rgba(139,92,246,0.07))' }}
      >
        <Cpu size={15} className="text-blue-500" />
        <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>AI Fusion Analysis</span>
        <span
          className="ml-auto px-2 py-0.5 text-xs rounded-full font-bold animate-pulse"
          style={{ backgroundColor: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
        >
          ACTIVE
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Combined Risk Score */}
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="text-xs font-semibold mb-1 tracking-wider" style={{ color: 'var(--fg3)' }}>COMBINED RISK SCORE</div>
          <div className="text-4xl font-bold" style={{ color: '#ef4444' }}>96.8%</div>
          <div className="flex items-center justify-center gap-1 mt-1.5">
            <AlertTriangle size={12} style={{ color: '#ef4444' }} />
            <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>CRITICAL THRESHOLD EXCEEDED</span>
          </div>
        </div>

        {/* Confidence Meters */}
        <div className="space-y-3">
          {[
            { label: 'CCTV Confidence', value: 94.2, color: '#3b82f6' },
            { label: 'Model Precision', value: 91.5, color: '#8b5cf6' },
            { label: 'SMS Corroboration', value: 88.0, color: '#22c55e' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: 'var(--fg2)' }}>{item.label}</span>
                <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Siren size={14} style={{ color: '#ef4444' }} />
            <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>FINAL RECOMMENDATION</span>
          </div>
          <div className="text-sm font-bold mb-1" style={{ color: 'var(--fg)' }}>Dispatch Ambulance & Police</div>
          <div className="text-xs leading-relaxed" style={{ color: 'var(--fg2)' }}>
            High-confidence multi-source detection. Critical severity confirmed by CCTV AI and witness SMS reports.
          </div>
        </div>

        {/* Source Fusion */}
        <div>
          <div className="text-xs font-semibold mb-2.5 tracking-wider" style={{ color: 'var(--fg3)' }}>SOURCE FUSION</div>
          <div className="flex gap-2">
            {[
              { label: 'CCTV', active: true, color: '#3b82f6' },
              { label: 'SMS',  active: true, color: '#8b5cf6' },
              { label: 'GPS',  active: false, color: 'var(--fg3)' },
            ].map(s => (
              <div
                key={s.label}
                className="flex-1 py-2 rounded-lg text-center text-xs font-semibold"
                style={{
                  backgroundColor: s.active ? `${s.color}18` : 'var(--subtle)',
                  color: s.active ? s.color : 'var(--fg3)',
                  border: `1px solid ${s.active ? `${s.color}35` : 'var(--border)'}`,
                }}
              >
                {s.label} {s.active ? '✓' : '—'}
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch Button */}
        <button
          className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #ef4444, #dc2626)', color: '#fff' }}
        >
          <ShieldAlert size={15} />
          Dispatch Emergency Response
        </button>
      </div>
    </div>
  )
}

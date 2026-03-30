import React from 'react'
import DashboardCharts from './DashboardCharts'
import AIFusionPanel from './AIFusionPanel'
import { AlertTriangle, Camera, MessageSquare, CheckCircle, Zap } from 'lucide-react'

const statCards = [
  {
    label: 'Total Incidents Today',
    value: '47',
    delta: '+8 from yesterday',
    deltaType: 'up',
    icon: AlertTriangle,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
  },
  {
    label: 'Active Cameras',
    value: '4 / 5',
    delta: '1 offline',
    deltaType: 'warn',
    icon: Camera,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    label: 'SMS Reports (Today)',
    value: '10',
    delta: 'Multi-language',
    deltaType: 'neutral',
    icon: MessageSquare,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    label: 'Resolved / Dispatched',
    value: '31',
    delta: '66% resolution rate',
    deltaType: 'up',
    icon: CheckCircle,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2.5" style={{ color: 'var(--fg)' }}>
            <Zap size={22} className="text-blue-500" />
            Operations Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--fg2)' }}>
            Analytics, trend charts & AI fusion summary
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg3)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Last updated: just now
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="rounded-2xl p-5 flex items-start gap-4"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
            >
              <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: card.bg }}>
                <Icon size={20} style={{ color: card.color }} />
              </div>
              <div>
                <div className="text-3xl font-bold leading-tight" style={{ color: 'var(--fg)' }}>{card.value}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--fg2)' }}>{card.label}</div>
                <div className="text-xs mt-1.5 font-semibold" style={{
                  color: card.deltaType === 'up' ? '#22c55e' : card.deltaType === 'warn' ? '#f97316' : 'var(--fg3)',
                }}>
                  {card.delta}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts + AI Panel */}
      <div className="flex gap-6" style={{ alignItems: 'flex-start' }}>
        <div className="flex-1 min-w-0">
          <DashboardCharts />
        </div>
        <div className="w-80 flex-shrink-0">
          <AIFusionPanel />
        </div>
      </div>
    </div>
  )
}

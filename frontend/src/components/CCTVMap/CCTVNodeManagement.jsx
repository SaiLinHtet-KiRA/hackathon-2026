import React from 'react'
import { Camera, Plus, Edit2, Play, Trash2, Wifi, WifiOff, Wrench } from 'lucide-react'
import { cameras } from '../../data/mockData'

const statusConfig = {
  Online: { color: '#22c55e', bg: 'rgba(34,197,94,0.15)', icon: Wifi },
  Offline: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', icon: WifiOff },
  Maintenance: { color: '#eab308', bg: 'rgba(234,179,8,0.15)', icon: Wrench },
}

function HealthBar({ value }) {
  const color = value >= 90 ? '#22c55e' : value >= 70 ? '#eab308' : '#ef4444'
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full" style={{ backgroundColor: '#21262d' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{value}%</span>
    </div>
  )
}

export default function CCTVNodeManagement({ onSelectCamera }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Camera size={18} className="text-blue-400" />
            CCTV Node Management
          </h2>
          <p className="text-sm mt-0.5" style={{ color: '#8b949e' }}>
            Manage all surveillance camera nodes, AI health, and activity logs.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
          style={{ backgroundColor: '#3b82f6', color: '#fff' }}
        >
          <Plus size={15} />
          Add New Camera
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Online', count: cameras.filter(c => c.status === 'Online').length, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
          { label: 'Offline', count: cameras.filter(c => c.status === 'Offline').length, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
          { label: 'Maintenance', count: cameras.filter(c => c.status === 'Maintenance').length, color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
              <div className="text-xs" style={{ color: '#8b949e' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: '1px solid #21262d', backgroundColor: '#0d1117' }}
        >
          <Camera size={14} className="text-blue-400" />
          <span className="text-sm font-semibold text-white">Camera Nodes</span>
          <span
            className="ml-auto px-2 py-0.5 rounded-full text-xs"
            style={{ backgroundColor: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}
          >
            {cameras.length} total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: '1px solid #21262d' }}>
                {['Status', 'Camera ID / Name', 'Location', 'AI Health', 'Activity Log', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold"
                    style={{ color: '#8b949e' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cameras.map((cam, i) => {
                const sc = statusConfig[cam.status] || statusConfig.Offline
                const StatusIcon = sc.icon
                return (
                  <tr
                    key={cam.id}
                    className="cursor-pointer hover:bg-gray-800 transition-colors"
                    style={{ borderBottom: i < cameras.length - 1 ? '1px solid #21262d' : 'none' }}
                    onClick={() => onSelectCamera(cam)}
                  >
                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sc.color }} />
                        <span className="font-medium" style={{ color: sc.color }}>{cam.status}</span>
                      </div>
                    </td>

                    {/* Camera ID / Name */}
                    <td className="px-4 py-3">
                      <div className="font-mono font-semibold" style={{ color: '#3b82f6' }}>{cam.id}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{cam.name}</div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3" style={{ color: '#c9d1d9' }}>{cam.location}</td>

                    {/* AI Health */}
                    <td className="px-4 py-3">
                      <HealthBar value={cam.aiHealth} />
                    </td>

                    {/* Activity Log */}
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: cam.activityToday > 0 ? 'rgba(59,130,246,0.15)' : 'rgba(107,114,128,0.15)',
                          color: cam.activityToday > 0 ? '#3b82f6' : '#6b7280',
                        }}
                      >
                        {cam.activityToday} Today
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <button
                          className="p-1.5 rounded hover:bg-gray-700 transition-colors"
                          style={{ color: '#8b949e' }}
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="p-1.5 rounded hover:bg-blue-900 transition-colors"
                          style={{ color: '#3b82f6' }}
                          title="View Stream"
                          onClick={() => onSelectCamera(cam)}
                        >
                          <Play size={13} />
                        </button>
                        <button
                          className="p-1.5 rounded hover:bg-red-900 transition-colors"
                          style={{ color: '#ef4444' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

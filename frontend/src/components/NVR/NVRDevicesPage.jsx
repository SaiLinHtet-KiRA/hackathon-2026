import React, { useState } from 'react'
import {
  Server, Plus, Search, HardDrive, CheckCircle, AlertTriangle,
  X, WifiOff, ChevronRight, Upload, Database, Clock, Edit2, Trash2,
  RefreshCw, RotateCcw, Save, Info, Link
} from 'lucide-react'

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const initialNVRs = [
  {
    id: 'NVR_001',
    displayName: 'NVR_Siam_Square_001',
    nvrName: 'Siam Center Hub',
    status: 'Recording',
    availableChannels: 4,
    usedChannels: 8,
    maxChannels: 12,
    storageTB: 8,
    usedTB: 6.2,
    storagePct: 77.5,
    model: 'Hikvision DS-73482NI',
    ip: '10.10.20.45',
    createdBy: 'Arkar',
    location: 'Siam Square One, Pathum Wan, Bangkok',
    maxChannelsConfig: 16,
    videoCodec: 'H.265+',
    maxResolution: '4K / 8 MP',
    lastActivityDate: 'Mar 28, 2026 : 01:15:00 AM',
    lastActivity: 'Mar 28, 2026 : 01:15:00 AM',
    retentionDays: 30,
    estDaysRemaining: 18,
    availableTB: 1.8,
    availablePct: 22.5,
    channels: [
      { no: 'Channel 1', name: 'Entrance_Main_Gate', camId: 'CAM_S1_01', nvrStatus: 'Recording',     camStatus: 'Live',      storage: '12.5 Gb', recordings: 45, location: 'Pathum Wan, Bangkok', connectedOn: 'Mar 28, 2026\n01:00:00 AM' },
      { no: 'Channel 2', name: 'Lobby_North_A', camId: 'CAM_S1_02', nvrStatus: 'Recording',     camStatus: 'Live',      storage: '10.2 Gb', recordings: 38, location: 'Pathum Wan, Bangkok', connectedOn: 'Mar 28, 2026\n01:05:00 AM' },
      { no: 'Channel 3', name: 'Parking_Zone_B1', camId: 'CAM_S1_03', nvrStatus: 'Not Recording',  camStatus: 'Offline',   storage: '8.32 Gb', recordings: 31, location: 'Pathum Wan, Bangkok', connectedOn: 'Mar 27, 2026\n11:45:00 PM' },
      { no: 'Channel 4', name: null,                camId: null,       nvrStatus: 'Not Configured', camStatus: 'Available', storage: '-',        recordings: 0,  location: '-',                                        connectedOn: null },
      { no: 'Channel 5', name: 'Elevator_Hall_L3', camId: 'CAM_S1_04', nvrStatus: 'Recording',     camStatus: 'Live',      storage: '9.8 Gb',  recordings: 40, location: 'Pathum Wan, Bangkok', connectedOn: 'Mar 28, 2026\n01:10:00 AM' },
      { no: 'Channel 6', name: null,                camId: null,       nvrStatus: 'Recording',     camStatus: 'Live',      storage: '4.5 Gb',  recordings: 12, location: 'Pathum Wan, Bangkok', connectedOn: 'Mar 28, 2026\n01:12:00 AM' },
      { no: 'Channel 7', name: 'Fire_Exit_Rear', camId: 'CAM_S1_05', nvrStatus: 'Not Recording',  camStatus: 'Offline',   storage: '7.1 Gb',  recordings: 22, location: 'Pathum Wan, Bangkok', connectedOn: 'Mar 27, 2026\n10:30:00 PM' },
      { no: 'Channel 8', name: 'Loading_Dock_01', camId: 'CAM_S1_06', nvrStatus: 'Not Recording',  camStatus: 'Offline',   storage: '15.4 Gb', recordings: 67, location: 'Pathum Wan, Bangkok', connectedOn: 'Mar 27, 2026\n09:15:00 PM' },
      { no: 'Channel 9', name: null,                camId: null,       nvrStatus: 'Not Configured', camStatus: 'Available', storage: '-',        recordings: 0,  location: '-',                                        connectedOn: null },
    ],
  },
  {
    id: 'NVR_002',
    displayName: 'NVR_Sukhumvit_002',
    nvrName: 'Asoke Branch Recorder',
    status: 'Recording',
    availableChannels: 10,
    usedChannels: 6,
    maxChannels: 16,
    storageTB: 4,
    usedTB: 1.8,
    storagePct: 45.0,
    model: 'Dahua NVR5216-4KS2',
    ip: '192.168.1.101',
    createdBy: 'Arkar',
    location: 'Exchange Tower, Asoke, Bangkok',
    maxChannelsConfig: 16,
    videoCodec: 'H.265+',
    maxResolution: '4K / 8 MP',
    lastActivityDate: 'Mar 28, 2026 : 01:10:00 AM',
    lastActivity: 'Mar 28, 2026 : 01:10:00 AM',
    retentionDays: 30,
    estDaysRemaining: 37,
    availableTB: 2.2,
    availablePct: 55.0,
    channels: [
      { no: 'Channel 1', name: 'Asoke_Entrance', camId: 'CAM_A1_01', status: 'Recording',     storage: '4.12 Gb', recordings: 15, location: 'Wattana, Bangkok' },
      { no: 'Channel 2', name: 'Asoke_Lobby', camId: 'CAM_A1_02', status: 'Not Recording',  storage: '4.12 Gb', recordings: 15, location: 'Wattana, Bangkok' },
    ],
  },
  {
    id: 'NVR_003',
    displayName: 'NVR_Silom_003',
    nvrName: 'Silom Financial District',
    status: 'Offline',
    availableChannels: 16,
    usedChannels: 0,
    maxChannels: 16,
    storageTB: 12,
    usedTB: 11.8,
    storagePct: 98.3,
    model: 'Uniview NVR302-16S',
    ip: '172.16.5.102',
    createdBy: 'Arkar',
    location: 'United Center, Silom Rd, Bangkok',
    maxChannelsConfig: 16,
    videoCodec: 'H.264',
    maxResolution: '1080p',
    lastActivityDate: 'Mar 27, 2026 : 04:32:00 PM',
    lastActivity: 'Mar 27, 2026 : 04:32:00 PM',
    retentionDays: 14,
    estDaysRemaining: 0,
    availableTB: 0.2,
    availablePct: 1.7,
    channels: [],
  },
  {
    id: 'NVR_004',
    displayName: 'NVR_Ari_004',
    nvrName: 'Phaya Thai Zone',
    status: 'Maintenance',
    availableChannels: 4,
    usedChannels: 4,
    maxChannels: 8,
    storageTB: 4,
    usedTB: 2.0,
    storagePct: 50.0,
    model: 'Hikvision DS-7608NI-I2',
    ip: '10.20.30.103',
    createdBy: 'Arkar',
    location: 'La Villa Ari, Phaya Thai, Bangkok',
    maxChannelsConfig: 8,
    videoCodec: 'H.265',
    maxResolution: '4K / 8 MP',
    lastActivityDate: 'Mar 28, 2026 : 12:15:00 AM',
    lastActivity: 'Mar 28, 2026 : 12:15:00 AM',
    retentionDays: 30,
    estDaysRemaining: 25,
    availableTB: 2.0,
    availablePct: 50.0,
    channels: [],
  },
]

// ─── Status helpers ────────────────────────────────────────────────────────────
function getStatusStyle(status) {
  switch (status) {
    case 'Recording':    return { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.25)' }
    case 'Offline':      return { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.25)' }
    case 'Maintenance':  return { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' }
    default:             return { color: '#6b7280', bg: 'rgba(107,114,128,0.12)',border: 'rgba(107,114,128,0.25)' }
  }
}

function getChannelStatusStyle(status) {
  switch (status) {
    case 'Recording':     return { color: '#22c55e', dot: true }
    case 'Not Recording': return { color: '#f59e0b', dot: true }
    case 'Scheduled Off': return { color: '#6b7280', dot: true }
    case 'Not Configured':return { color: '#4b5563', dot: false }
    default:              return { color: '#6b7280', dot: false }
  }
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, type = 'info', onClose }) {
  React.useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  const color = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium z-[9999] shadow-2xl"
      style={{ backgroundColor: 'var(--card)', border: `1px solid ${color}`, color: 'var(--fg)', minWidth: '260px' }}>
      <Info size={16} style={{ color, flexShrink: 0 }} />
      <span className="flex-1">{message}</span>
      <button onClick={onClose}><X size={14} style={{ color: 'var(--fg2)' }} /></button>
    </div>
  )
}

// ─── NVR List Card (shown in list view) ───────────────────────────────────────
function NVRListCard({ nvr, onClick }) {
  const ss = getStatusStyle(nvr.status)
  const storagePct = nvr.storagePct
  const storageColor = storagePct >= 90 ? '#ef4444' : storagePct >= 70 ? '#f59e0b' : '#22c55e'

  return (
    <div
      onClick={onClick}
      className="rounded-xl p-5 cursor-pointer transition-all"
      style={{
        backgroundColor: 'var(--card)', border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Server size={18} style={{ color: '#3b82f6' }} />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: 'var(--fg)' }}>{nvr.displayName}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--fg2)' }}>{nvr.id} · {nvr.nvrName}</div>
          </div>
        </div>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ss.color }} />
          {nvr.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-0.5" style={{ color: 'var(--fg2)' }}>Channels</div>
          <div className="text-sm font-bold" style={{ color: '#22c55e' }}>{nvr.usedChannels}<span style={{ color: 'var(--fg2)', fontWeight: 400 }}>/{nvr.maxChannels}</span></div>
        </div>
        <div className="rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-0.5" style={{ color: 'var(--fg2)' }}>Storage</div>
          <div className="text-sm font-bold" style={{ color: storageColor }}>{nvr.storagePct}%</div>
        </div>
        <div className="rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-0.5" style={{ color: 'var(--fg2)' }}>Model</div>
          <div className="text-xs font-medium truncate" style={{ color: 'var(--fg)' }}>{nvr.model}</div>
        </div>
      </div>

      <div className="mb-2">
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <div className="h-full rounded-full" style={{ width: `${storagePct}%`, backgroundColor: storageColor }} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--fg2)' }}>{nvr.location}</span>
        <ChevronRight size={14} style={{ color: 'var(--fg3)' }} />
      </div>
    </div>
  )
}

// ─── Channel Status Badge ──────────────────────────────────────────────────────
function CamStatusBadge({ status }) {
  const styles = {
    Live:      { color: '#22c55e', border: '#22c55e' },
    Offline:   { color: '#6b7280', border: '#6b7280' },
    Available: { color: '#f97316', border: '#f97316' },
  }
  const s = styles[status] || styles.Offline
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ color: s.color, border: `1px solid ${s.border}`, backgroundColor: 'transparent' }}>
      {status}
    </span>
  )
}

// ─── Channel Management Tab ────────────────────────────────────────────────────
function ChannelManagementTab({ nvr }) {
  const [search, setSearch] = useState('')
  const [page, setPage]     = useState(1)
  const [perPage, setPerPage] = useState(9)

  const filtered = nvr.channels.filter(ch => {
    const q = search.toLowerCase()
    return !q || ch.no.toLowerCase().includes(q) || (ch.name || '').toLowerCase().includes(q) || (ch.camId || '').toLowerCase().includes(q)
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems  = filtered.slice((page - 1) * perPage, page * perPage)

  // Defines consistent grid layout to align headers and row items
  const gridLayout = "grid grid-cols-[100px_220px_200px_110px_1fr_180px_100px] items-center px-4"

  return (
    <div className="space-y-0">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Channel Management</span>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--fg2)' }} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="text-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--border)', color: 'var(--fg)', width: '200px' }}
          />
        </div>
      </div>

      {/* Table — horizontally scrollable */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div style={{ overflowX: 'auto' }}>
        {/* Header row */}
        <div className={`${gridLayout} min-w-[1000px] bg-subtle py-3 border-b border-gray-100 text-xs font-semibold text-gray-500`}>
          <div>Channel No</div>
          <div>Camera Name</div>
          <div>NVR Recording Status</div>
          <div>Status</div>
          <div>Site Location</div>
          <div>Connected On</div>
          <div className="text-center pr-4">Action</div>
        </div>

        {/* Rows */}
        {pageItems.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm" style={{ color: 'var(--fg2)', backgroundColor: 'var(--card)', minWidth: '1000px' }}>No channels found</div>
        ) : pageItems.map((ch, i) => {
          const nvrSt = getChannelStatusStyle(ch.nvrStatus)
          const isLinked = !!ch.name
          return (
            <div
              key={i}
              className={`${gridLayout} min-w-[1000px] py-6 transition-colors border-b border-gray-50 bg-card last:border-b-0`}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card)'}
            >
              {/* Channel No */}
              <div className="text-sm" style={{ color: 'var(--fg)' }}>{ch.no}</div>

              {/* Camera Name */}
              <div>
                {isLinked ? (
                  <>
                    <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{ch.name}</div>
                    <div className="text-xs" style={{ color: 'var(--fg2)' }}>{ch.camId}</div>
                  </>
                ) : (
                  <div className="text-sm" style={{ color: 'var(--fg3)' }}>No Camera Linked</div>
                )}
              </div>

              {/* NVR Recording Status */}
              <div className="flex items-center gap-1.5">
                {nvrSt.dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: nvrSt.color }} />}
                <span className="text-sm" style={{ color: nvrSt.color }}>{ch.nvrStatus}</span>
              </div>

              {/* Camera Status badge */}
              <div><CamStatusBadge status={ch.camStatus} /></div>

              {/* Site Location */}
              <div className="text-sm pr-2 truncate" style={{ color: ch.location === '-' ? 'var(--fg3)' : 'var(--fg)' }}>{ch.location}</div>

              {/* Connected On */}
              <div className="flex flex-col text-left">
                {ch.connectedOn ? ch.connectedOn.split('\n').map((line, j) => (
                  <div key={j} className="text-xs leading-tight" style={{ color: j === 0 ? 'var(--fg)' : 'var(--fg2)', fontWeight: j === 0 ? '500' : '400' }}>{line}</div>
                )) : <span style={{ color: 'var(--fg3)' }}>-</span>}
              </div>

              {/* Action */}
              <div className="flex justify-center pr-4">
                {isLinked ? (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={{ color: 'var(--fg2)', border: '1px solid var(--border)', backgroundColor: 'var(--subtle)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--border)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}>
                    <RefreshCw size={11} /> Unlink
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ color: '#fff', backgroundColor: '#ef4444', border: '1px solid #ef4444' }}>
                    <Link size={11} /> Link
                  </button>
                )}
              </div>
            </div>
          )
        })}
        </div>{/* end overflow-x-auto */}
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg2)' }}>
          <span>Entries per page</span>
          <input
            type="number" min="1" max="50"
            value={perPage}
            onChange={e => { setPerPage(Number(e.target.value) || 9); setPage(1) }}
            className="w-12 px-2 py-1 rounded text-center text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
            style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
          />
          <span>{(page - 1) * perPage + 1} – {Math.min(page * perPage, filtered.length)} of {filtered.length} entries</span>
        </div>
        <div className="flex items-center gap-1">
          {/* First */}
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="w-7 h-7 rounded flex items-center justify-center text-xs transition-colors"
            style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)', color: page === 1 ? 'var(--fg3)' : 'var(--fg2)' }}>
            ««
          </button>
          {/* Prev */}
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="w-7 h-7 rounded flex items-center justify-center text-xs transition-colors"
            style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)', color: page === 1 ? 'var(--fg3)' : 'var(--fg2)' }}>
            ‹
          </button>
          {/* Page input */}
          <input
            type="number" min="1" max={totalPages}
            value={page}
            onChange={e => setPage(Math.min(totalPages, Math.max(1, Number(e.target.value) || 1)))}
            className="w-10 h-7 rounded text-center text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--fg)' }}
          />
          <span className="text-xs px-1" style={{ color: 'var(--fg2)' }}>of {totalPages}</span>
          {/* Next */}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-7 h-7 rounded flex items-center justify-center text-xs transition-colors"
            style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)', color: page === totalPages ? 'var(--fg3)' : 'var(--fg2)' }}>
            ›
          </button>
          {/* Last */}
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="w-7 h-7 rounded flex items-center justify-center text-xs transition-colors"
            style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)', color: page === totalPages ? 'var(--fg3)' : 'var(--fg2)' }}>
            »»
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── NVR Detail View ──────────────────────────────────────────────────────────
function NVRDetailView({ nvr, onClose, onDelete, onRestart }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const tabs = ['Overview', 'Channel Management']
  const ss = getStatusStyle(nvr.status)
  const storageColor = nvr.storagePct >= 90 ? '#ef4444' : nvr.storagePct >= 70 ? '#f59e0b' : '#22c55e'

  return (
    <div className="flex flex-col min-h-full" style={{ color: 'var(--fg)' }}>
      {/* ── Header ── */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-base" style={{ color: 'var(--fg)' }}>{nvr.displayName}</span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold"
              style={{ backgroundColor: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ss.color }} />
              {nvr.status}
            </span>
          </div>
          <div className="text-sm mt-0.5" style={{ color: 'var(--fg2)' }}>{nvr.id}</div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--fg2)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <X size={18} />
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center px-6 gap-0" style={{ borderBottom: '1px solid var(--border)' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-sm font-medium transition-colors relative"
            style={{
              color: activeTab === tab ? 'var(--fg)' : 'var(--fg2)',
              borderBottom: activeTab === tab ? '2px solid var(--fg)' : '2px solid transparent',
              marginBottom: '-1px',
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

        {activeTab === 'Overview' && (
          <>
            {/* NVR Overview heading + buttons */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>NVR Overview</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDelete(nvr.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)', backgroundColor: 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Trash2 size={12} /> Delete
                </button>
                <button
                  onClick={() => onRestart(nvr.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={{ color: 'var(--fg)', border: '1px solid var(--border)', backgroundColor: 'var(--subtle)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}>
                  <RotateCcw size={12} /> Restart NVR
                </button>
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-4 gap-3">
              {/* Available Channels */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Database size={15} style={{ color: 'var(--fg2)' }} />
                  <span className="text-xs" style={{ color: 'var(--fg2)' }}>Available Channels</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>{nvr.availableChannels}</div>
              </div>
              {/* Used Channels */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Server size={15} style={{ color: 'var(--fg2)' }} />
                  <span className="text-xs" style={{ color: 'var(--fg2)' }}>Used Channels</span>
                </div>
                <div className="text-2xl font-bold">
                  <span style={{ color: '#22c55e' }}>{nvr.usedChannels}</span>
                  <span className="text-sm font-normal ml-1" style={{ color: 'var(--fg2)' }}>/{nvr.maxChannels}</span>
                </div>
              </div>
              {/* Storage */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive size={15} style={{ color: 'var(--fg2)' }} />
                  <span className="text-xs" style={{ color: 'var(--fg2)' }}>Storage</span>
                </div>
                <div className="text-xl font-bold">
                  <span style={{ color: storageColor }}>{nvr.usedTB}</span>
                  <span className="text-sm font-normal mx-1" style={{ color: 'var(--fg2)' }}>/ {nvr.storageTB} TB</span>
                  <span className="text-xs" style={{ color: storageColor }}>({nvr.storagePct}%)</span>
                </div>
              </div>
              {/* Last Activity */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={15} style={{ color: 'var(--fg2)' }} />
                  <span className="text-xs" style={{ color: 'var(--fg2)' }}>Last Activity</span>
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{nvr.lastActivity}</div>
              </div>
            </div>

            {/* Device Information */}
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Device Information</span>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ color: 'var(--fg2)', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card)'}>
                  <Edit2 size={11} /> Edit Details
                </button>
              </div>
              <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                {[
                  ['NVR Name', nvr.nvrName],
                  ['NVR ID', nvr.id],
                  ['Status', nvr.status, true],
                  ['Model', nvr.model],
                  ['IP Address', nvr.ip],
                  ['Created By', nvr.createdBy],
                  ['Location', nvr.location],
                  ['Max Channels', String(nvr.maxChannelsConfig)],
                  ['Video Codec', nvr.videoCodec],
                  ['Max Resolution', nvr.maxResolution],
                  ['Last Activity Date', nvr.lastActivityDate],
                ].map(([label, value, isStatus]) => (
                  <div key={label}>
                    <div className="text-xs mb-1" style={{ color: 'var(--fg2)' }}>{label}</div>
                    {isStatus ? (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                        {value}
                      </span>
                    ) : (
                      <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* NVR Recording Storage */}
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
              <div className="text-sm font-semibold mb-4" style={{ color: 'var(--fg)' }}>NVR Recording Storage</div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium" style={{ color: 'var(--fg)' }}>Storage Capacity</span>
                <span className="text-xs" style={{ color: 'var(--fg2)' }}>{nvr.usedTB} of {nvr.storageTB} TB used</span>
              </div>
              {/* Orange progress bar */}
              <div className="w-full h-4 rounded-full overflow-hidden mb-1 relative" style={{ backgroundColor: 'var(--border)' }}>
                <div className="h-full rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${nvr.storagePct}%`, backgroundColor: '#f97316' }}>
                  <span className="text-xs font-bold text-white" style={{ fontSize: '10px' }}>{nvr.storagePct}%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-xs mb-1" style={{ color: 'var(--fg2)' }}>Total Storage</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{nvr.storageTB} TB</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'var(--fg2)' }}>Retention Period</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{nvr.retentionDays} Days</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'var(--fg2)' }}>Used Space</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{nvr.usedTB} Gb ({nvr.storagePct}%)</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'var(--fg2)' }}>Est Time Remaining</div>
                  <div className="text-sm font-semibold" style={{ color: nvr.estDaysRemaining <= 14 ? '#ef4444' : '#22c55e' }}>
                    {nvr.estDaysRemaining} Days
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'var(--fg2)' }}>Available Space</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{nvr.availableTB} TB ({nvr.availablePct}%)</div>
                </div>
              </div>
            </div>

            {/* Linked Cameras Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Linked Cameras</span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={{ color: 'var(--fg2)', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card)'}>
                    <Upload size={11} /> Export Recordings
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={{ color: 'var(--fg2)', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card)'}>
                    <RefreshCw size={11} /> Clean Up Storage
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                {/* Header */}
                <div className="grid text-xs font-semibold px-4 py-3"
                  style={{
                    gridTemplateColumns: '120px 1fr 160px 100px 90px 1fr 48px',
                    backgroundColor: 'var(--subtle)',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--fg2)',
                  }}>
                  <div>Channel No</div>
                  <div>Camera Name</div>
                  <div>NVR Recording Status</div>
                  <div>Storage Used</div>
                  <div>Recordings</div>
                  <div>Site Location</div>
                  <div>Action</div>
                </div>
                {/* Rows */}
                {nvr.channels.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--fg2)' }}>No linked cameras</div>
                ) : nvr.channels.map((ch, i) => {
                  const cs = getChannelStatusStyle(ch.status)
                  return (
                    <div
                      key={i}
                      className="grid items-center px-4 py-3 transition-colors"
                      style={{
                        gridTemplateColumns: '120px 1fr 160px 100px 90px 1fr 48px',
                        borderBottom: i < nvr.channels.length - 1 ? '1px solid var(--border)' : 'none',
                        backgroundColor: 'var(--card)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card)'}
                    >
                      <div className="text-sm" style={{ color: 'var(--fg)' }}>{ch.no}</div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{ch.name}</div>
                        <div className="text-xs" style={{ color: 'var(--fg2)' }}>{ch.camId}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {cs.dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cs.color }} />}
                        <span className="text-sm" style={{ color: cs.color }}>{ch.status}</span>
                      </div>
                      <div className="text-sm" style={{ color: 'var(--fg)' }}>{ch.storage}</div>
                      <div className="text-sm" style={{ color: 'var(--fg)' }}>{ch.recordings}</div>
                      <div className="text-sm" style={{ color: 'var(--fg)' }}>{ch.location}</div>
                      <div>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--subtle)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--border)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--subtle)'}>
                          <ChevronRight size={13} style={{ color: 'var(--fg2)' }} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'Channel Management' && (
          <ChannelManagementTab nvr={nvr} />
        )}

      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function NVRDevicesPage() {
  const [nvrList, setNvrList] = useState(initialNVRs)
  const [selectedNVR, setSelectedNVR] = useState(null)
  const [search, setSearch]   = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [toast, setToast]     = useState(null)
  const showToast = (msg, type = 'success') => setToast({ message: msg, type })

  const counts = {
    All: nvrList.length,
    Recording: nvrList.filter(n => n.status === 'Recording').length,
    Offline: nvrList.filter(n => n.status === 'Offline').length,
    Maintenance: nvrList.filter(n => n.status === 'Maintenance').length,
  }

  const filtered = nvrList.filter(n => {
    const matchStatus = statusFilter === 'All' || n.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch = !q || n.displayName.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)
      || n.ip.toLowerCase().includes(q) || n.location.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const handleDelete = (id) => {
    setNvrList(prev => prev.filter(n => n.id !== id))
    setSelectedNVR(null)
    showToast(`NVR ${id} removed`, 'error')
  }

  const handleRestart = (id) => {
    showToast(`NVR ${id} restarting…`, 'info')
  }

  const handleSelectNVR = (id) => {
    setSelectedNVR(id)
  }

  // If an NVR is selected, show the detail view full-page
  if (selectedNVR) {
    const nvr = nvrList.find(n => n.id === selectedNVR)
    if (!nvr) { setSelectedNVR(null); return null }
    return (
      <div className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', minHeight: '80vh' }}>
        <NVRDetailView
          nvr={nvr}
          onClose={() => setSelectedNVR(null)}
          onDelete={handleDelete}
          onRestart={handleRestart}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    )
  }

  // List view
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Server size={18} style={{ color: '#3b82f6' }} />
            NVR Devices
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--fg2)' }}>
            Manage and monitor all Network Video Recorders
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: '#3b82f6', color: '#fff' }}>
          <Plus size={15} /> Add NVR
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total NVRs', value: nvrList.length, color: '#3b82f6', Icon: Server },
          { label: 'Recording', value: counts.Recording, color: '#22c55e', Icon: CheckCircle },
          { label: 'Offline', value: counts.Offline, color: '#ef4444', Icon: WifiOff },
          { label: 'Maintenance', value: counts.Maintenance, color: '#f59e0b', Icon: AlertTriangle },
        ].map(({ label, value, color, Icon }) => (
          <div key={label} className="rounded-xl p-4 flex items-center gap-4"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <div className="text-xs" style={{ color: 'var(--fg2)' }}>{label}</div>
              <div className="text-xl font-bold" style={{ color: 'var(--fg)' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--fg2)' }} />
          <input
            type="text"
            placeholder="Search NVR devices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full text-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--fg)' }}
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          {['All', 'Recording', 'Offline', 'Maintenance'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{
                backgroundColor: statusFilter === tab ? '#3b82f6' : 'transparent',
                color: statusFilter === tab ? '#fff' : 'var(--fg2)',
              }}>
              {tab} ({counts[tab] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {/* NVR Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          <Server size={32} style={{ color: 'var(--fg3)', marginBottom: '8px' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--fg2)' }}>No NVR devices found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(nvr => (
            <NVRListCard key={nvr.id} nvr={nvr} onClick={() => handleSelectNVR(nvr.id)} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
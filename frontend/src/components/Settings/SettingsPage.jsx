import React, { useState, useMemo } from 'react'
import { Settings, Sliders, Bell, Globe, Users, Camera, ShieldCheck, Plus, Edit2, Trash2, ClipboardList, Download, Search, Filter } from 'lucide-react'
import { users } from '../../data/mockData'

// ─── Audit Log mock data ──────────────────────────────────────────────────────
const auditLogs = [
  { id: 'AUD-001', timestamp: '2025-12-18 08:42:11', operator: 'Operator A', role: 'Admin',    action: 'Dispatched',         target: 'INC-2023-8901', before: '—',           after: 'EMS Unit 22 dispatched' },
  { id: 'AUD-002', timestamp: '2025-12-18 08:16:45', operator: 'Operator A', role: 'Admin',    action: 'Marked False Alarm',  target: 'INC-2023-8906', before: 'Auto-Detected', after: 'False Alarm' },
  { id: 'AUD-003', timestamp: '2025-12-18 07:55:02', operator: 'Operator B', role: 'Operator', action: 'Edited Camera',       target: 'CAM-E-045',     before: 'aiHealth: 88', after: 'aiHealth: 95' },
  { id: 'AUD-004', timestamp: '2025-12-18 07:30:17', operator: 'Operator A', role: 'Admin',    action: 'Added User',          target: 'USR-008',       before: '—',           after: 'Role: Analyst' },
  { id: 'AUD-005', timestamp: '2025-12-18 07:12:44', operator: 'Operator A', role: 'Admin',    action: 'Changed Threshold',   target: 'AI Threshold',  before: '65%',         after: '70%' },
  { id: 'AUD-006', timestamp: '2025-12-17 21:08:33', operator: 'Operator C', role: 'Analyst',  action: 'Exported Report',     target: 'INC-2023-8904', before: '—',           after: 'PDF exported' },
  { id: 'AUD-007', timestamp: '2025-12-17 18:44:21', operator: 'Operator B', role: 'Operator', action: 'Dispatched',          target: 'INC-2023-8902', before: '—',           after: 'Police Unit 5 dispatched' },
  { id: 'AUD-008', timestamp: '2025-12-17 16:30:09', operator: 'Operator A', role: 'Admin',    action: 'Changed Threshold',   target: 'SMS Threshold', before: '55%',         after: '60%' },
  { id: 'AUD-009', timestamp: '2025-12-17 14:15:55', operator: 'Operator A', role: 'Admin',    action: 'Edited Camera',       target: 'CAM-W-302',     before: 'status: Online', after: 'status: Maintenance' },
  { id: 'AUD-010', timestamp: '2025-12-17 11:03:28', operator: 'Operator C', role: 'Analyst',  action: 'Exported Report',     target: 'INC-2023-8903', before: '—',           after: 'CSV exported' },
  { id: 'AUD-011', timestamp: '2025-12-17 09:22:14', operator: 'Operator B', role: 'Operator', action: 'Marked False Alarm',  target: 'INC-2023-8905', before: 'Auto-Detected', after: 'False Alarm' },
  { id: 'AUD-012', timestamp: '2025-12-16 20:11:47', operator: 'Operator A', role: 'Admin',    action: 'Added User',          target: 'USR-007',       before: '—',           after: 'Role: Operator' },
  { id: 'AUD-013', timestamp: '2025-12-16 15:44:02', operator: 'Operator A', role: 'Admin',    action: 'Dispatched',          target: 'INC-2023-8900', before: '—',           after: 'Fire Unit 3 dispatched' },
  { id: 'AUD-014', timestamp: '2025-12-16 12:30:19', operator: 'Operator C', role: 'Analyst',  action: 'Exported Report',     target: 'INC-2023-8899', before: '—',           after: 'PDF exported' },
  { id: 'AUD-015', timestamp: '2025-12-16 08:05:33', operator: 'Operator B', role: 'Operator', action: 'Edited Camera',       target: 'CAM-S-099',     before: 'aiHealth: 72', after: 'aiHealth: 99' },
]

const actionColors = {
  'Dispatched':        { bg: 'rgba(34,197,94,0.1)',   text: '#16a34a' },
  'Marked False Alarm':{ bg: 'rgba(107,114,128,0.1)', text: '#6b7280' },
  'Edited Camera':     { bg: 'rgba(59,130,246,0.1)',  text: '#3b82f6' },
  'Added User':        { bg: 'rgba(139,92,246,0.1)',  text: '#8b5cf6' },
  'Changed Threshold': { bg: 'rgba(234,179,8,0.1)',   text: '#d97706' },
  'Exported Report':   { bg: 'rgba(20,184,166,0.1)',  text: '#0d9488' },
}

function AuditLogTab() {
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')

  const actionTypes = ['All', 'Dispatched', 'Marked False Alarm', 'Edited Camera', 'Added User', 'Changed Threshold', 'Exported Report']
  const dateOptions = ['All', 'Today', 'Last 7 days', 'Last 30 days']

  const filtered = useMemo(() => {
    const now = new Date('2025-12-18')
    return auditLogs.filter(log => {
      const matchSearch = search === '' ||
        log.operator.toLowerCase().includes(search.toLowerCase()) ||
        log.target.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase())
      const matchAction = actionFilter === 'All' || log.action === actionFilter
      const logDate = new Date(log.timestamp)
      const diffDays = (now - logDate) / (1000 * 60 * 60 * 24)
      const matchDate = dateFilter === 'All' ||
        (dateFilter === 'Today' && diffDays < 1) ||
        (dateFilter === 'Last 7 days' && diffDays <= 7) ||
        (dateFilter === 'Last 30 days' && diffDays <= 30)
      return matchSearch && matchAction && matchDate
    })
  }, [search, actionFilter, dateFilter])

  const exportCSV = () => {
    const header = ['ID', 'Timestamp', 'Operator', 'Role', 'Action', 'Target', 'Before', 'After']
    const rows = filtered.map(l => [l.id, l.timestamp, l.operator, l.role, l.action, l.target, l.before, l.after])
    const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'audit_log.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Admin-only banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium"
        style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
        <ShieldCheck size={13} />
        Visible to Admin role only · Full system activity log
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[200px]"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          <Search size={13} style={{ color: 'var(--fg3)', flexShrink: 0 }} />
          <input
            className="flex-1 bg-transparent text-xs focus:outline-none"
            style={{ color: 'var(--fg)' }}
            placeholder="Search operator, target, action..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Action type filter */}
        <div className="flex items-center gap-1.5">
          <Filter size={12} style={{ color: 'var(--fg3)' }} />
          <select
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
            className="text-xs px-2.5 py-2 rounded-lg focus:outline-none"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--fg)' }}
          >
            {actionTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        {/* Date filter */}
        <select
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="text-xs px-2.5 py-2 rounded-lg focus:outline-none"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--fg)' }}
        >
          {dateOptions.map(d => <option key={d}>{d}</option>)}
        </select>
        {/* Export */}
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ml-auto"
          style={{ backgroundColor: '#3b82f6', color: '#fff' }}
        >
          <Download size={12} /> Export CSV
        </button>
      </div>

      {/* Log count */}
      <div className="text-xs" style={{ color: 'var(--fg3)' }}>
        Showing <span className="font-semibold" style={{ color: 'var(--fg)' }}>{filtered.length}</span> of {auditLogs.length} entries
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ minWidth: '900px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--subtle)', borderBottom: '1px solid var(--border)' }}>
                {['Timestamp', 'Operator', 'Role', 'Action Type', 'Target', 'Before', 'After'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--fg2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xs" style={{ color: 'var(--fg3)' }}>
                    No log entries match your filters.
                  </td>
                </tr>
              ) : filtered.map((log, i) => {
                const ac = actionColors[log.action] || { bg: 'var(--subtle)', text: 'var(--fg2)' }
                const rc = roleColors[log.role] || roleColors.Viewer
                return (
                  <tr key={log.id} className="transition-colors hover:bg-slate-50"
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                    <td className="px-4 py-3 font-mono whitespace-nowrap" style={{ color: 'var(--fg2)', fontSize: '11px' }}>{log.timestamp}</td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--fg)' }}>{log.operator}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: rc.bg, color: rc.text }}>{log.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
                        style={{ backgroundColor: ac.bg, color: ac.text }}>{log.action}</span>
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: '#3b82f6', fontSize: '11px' }}>{log.target}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--fg3)', fontSize: '11px' }}>{log.before}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--fg)', fontSize: '11px' }}>{log.after}</td>
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

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
    >
      <div
        className="flex items-center gap-2 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--subtle)' }}
      >
        <Icon size={15} className="text-blue-500" />
        <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function Toggle({ value, onChange, label, sublabel }) {
  return (
    <div className="flex items-center justify-between py-3.5" style={{ borderBottom: '1px solid var(--divider)' }}>
      <div>
        <div className="text-sm" style={{ color: 'var(--fg)' }}>{label}</div>
        {sublabel && <div className="text-xs mt-0.5" style={{ color: 'var(--fg2)' }}>{sublabel}</div>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className="relative flex-shrink-0 transition-colors"
        style={{
          width: '40px',
          height: '22px',
          borderRadius: '11px',
          backgroundColor: value ? '#3b82f6' : 'var(--border)',
        }}
      >
        <span
          className="absolute top-0.5 rounded-full transition-all"
          style={{
            width: '18px',
            height: '18px',
            backgroundColor: '#fff',
            left: value ? '20px' : '2px',
            transition: 'left 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        />
      </button>
    </div>
  )
}

function SliderInput({ value, onChange, min, max, label, sublabel, unit, color }) {
  return (
    <div className="py-3" style={{ borderBottom: '1px solid var(--divider)' }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm" style={{ color: 'var(--fg)' }}>{label}</div>
          {sublabel && <div className="text-xs" style={{ color: 'var(--fg2)' }}>{sublabel}</div>}
        </div>
        <span className="text-sm font-bold" style={{ color: color || '#3b82f6' }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color || '#3b82f6'} ${((value - min) / (max - min)) * 100}%, var(--border) ${((value - min) / (max - min)) * 100}%)`,
          accentColor: color || '#3b82f6',
        }}
      />
      <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--fg3)' }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

function CameraToggle({ label, defaultVal }) {
  const [val, setVal] = useState(defaultVal)
  return <Toggle value={val} onChange={setVal} label={label} />
}

const roleColors = {
  Admin: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444' },
  Operator: { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6' },
  Analyst: { bg: 'rgba(139,92,246,0.1)', text: '#8b5cf6' },
  Viewer: { bg: 'rgba(107,114,128,0.1)', text: '#6b7280' },
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General')
  const [aiThreshold, setAiThreshold] = useState(70)
  const [smsMinThreshold, setSmsMinThreshold] = useState(60)
  const [retentionDays, setRetentionDays] = useState(30)
  const [notifCritical, setNotifCritical] = useState(true)
  const [notifHigh, setNotifHigh] = useState(true)
  const [notifMedium, setNotifMedium] = useState(false)
  const [notifLow, setNotifLow] = useState(false)
  const [notifSMS, setNotifSMS] = useState(true)
  const [notifCamera, setNotifCamera] = useState(true)
  const [emailReports, setEmailReports] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedLang, setSelectedLang] = useState('en')

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'Thai' },
    { code: 'ms', label: 'Malay' },
    { code: 'my', label: 'Burmese' },
    { code: 'zh', label: 'Chinese (Simplified)' },
    { code: 'ta', label: 'Tamil' },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Settings size={20} className="text-blue-500" />
            System Settings
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--fg2)' }}>
            Configure AI parameters, notifications, and user access
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ backgroundColor: 'var(--subtle)', border: '1px solid var(--border)' }}>
        {[
          { id: 'General', icon: Settings },
          { id: 'Audit Log', icon: ClipboardList },
        ].map(({ id, icon: Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: active ? 'var(--card)' : 'transparent',
                color: active ? 'var(--fg)' : 'var(--fg3)',
                boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <Icon size={14} />
              {id}
            </button>
          )
        })}
      </div>

      {activeTab === 'Audit Log' && <AuditLogTab />}

      {activeTab === 'General' && (<><div className="grid grid-cols-2 gap-5">
        {/* AI Configuration */}
        <SectionCard title="AI Detection Configuration" icon={Sliders}>
          <SliderInput
            label="AI Detection Threshold"
            sublabel="Minimum confidence to trigger incident alert"
            value={aiThreshold}
            onChange={setAiThreshold}
            min={30}
            max={99}
            unit="%"
            color="#3b82f6"
          />
          <SliderInput
            label="SMS Corroboration Threshold"
            sublabel="Min confidence for SMS to count as corroboration"
            value={smsMinThreshold}
            onChange={setSmsMinThreshold}
            min={20}
            max={95}
            unit="%"
            color="#8b5cf6"
          />
          <SliderInput
            label="Video Retention Period"
            sublabel="Days to retain CCTV footage"
            value={retentionDays}
            onChange={setRetentionDays}
            min={7}
            max={90}
            unit=" days"
            color="#22c55e"
          />

          <div className="mt-2 p-3 rounded-lg text-xs" style={{ backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: 'var(--fg2)' }}>
            <span className="font-semibold text-blue-500">Current Mode:</span> Fusion (CCTV + SMS). Incidents below {aiThreshold}% threshold will be flagged for manual review only.
          </div>
        </SectionCard>

        {/* Notifications */}
        <SectionCard title="Notification Preferences" icon={Bell}>
          <Toggle value={notifCritical} onChange={setNotifCritical} label="Critical Severity Alerts" sublabel="Instant push + SMS dispatch" />
          <Toggle value={notifHigh} onChange={setNotifHigh} label="High Severity Alerts" sublabel="Push notification" />
          <Toggle value={notifMedium} onChange={setNotifMedium} label="Medium Severity Alerts" sublabel="Dashboard notification only" />
          <Toggle value={notifLow} onChange={setNotifLow} label="Low Severity Alerts" sublabel="Log only" />
          <Toggle value={notifSMS} onChange={setNotifSMS} label="New SMS Witness Reports" sublabel="Notify when multi-language SMS arrives" />
          <Toggle value={notifCamera} onChange={setNotifCamera} label="Camera Offline Alerts" sublabel="Alert when a CCTV node goes offline" />
          <Toggle value={emailReports} onChange={setEmailReports} label="Email Weekly Reports" sublabel="Automated PDF report every Monday 08:00" />
        </SectionCard>

        {/* Language Preferences */}
        <SectionCard title="Language Preferences" icon={Globe}>
          <div className="mb-3">
            <label className="text-xs font-semibold block mb-2" style={{ color: 'var(--fg3)' }}>SYSTEM INTERFACE LANGUAGE</label>
            <div className="space-y-1.5">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: selectedLang === lang.code ? 'rgba(59,130,246,0.08)' : 'var(--subtle)',
                    color: selectedLang === lang.code ? '#3b82f6' : 'var(--fg)',
                    border: `1px solid ${selectedLang === lang.code ? 'rgba(59,130,246,0.3)' : 'var(--border)'}`,
                  }}
                >
                  {lang.label}
                  {selectedLang === lang.code && (
                    <ShieldCheck size={14} className="text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--divider)' }}>
            <Toggle value={darkMode} onChange={setDarkMode} label="Dark Theme" sublabel="CrashFusion dark interface" />
          </div>
        </SectionCard>

        {/* Camera Management */}
        <SectionCard title="Camera Management Settings" icon={Camera}>
          <div className="space-y-5">
            {[
              { label: 'Auto-reconnect offline cameras', defaultVal: true },
              { label: 'AI health monitoring', defaultVal: true },
              { label: 'Auto-backup RTSP stream on incident', defaultVal: true },
              { label: 'Motion pre-buffer (30s before incident)', defaultVal: false },
            ].map((item, i) => (
              <CameraToggle key={i} label={item.label} defaultVal={item.defaultVal} />
            ))}

            <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--divider)' }}>
              <label className="text-xs font-semibold block mb-2" style={{ color: 'var(--fg3)' }}>DEFAULT STREAM QUALITY</label>
              <select
                className="w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
              >
                <option>1080p HD (Recommended)</option>
                <option>720p HD</option>
                <option>480p SD</option>
              </select>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* User Management */}
      <SectionCard title="User Management" icon={Users}>
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs" style={{ color: 'var(--fg2)' }}>
            Manage operator access and roles for the CrashFusion system.
          </p>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: '#3b82f6', color: '#fff' }}
          >
            <Plus size={13} />
            Add User
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: 'var(--subtle)', borderBottom: '1px solid var(--border)' }}>
                {['User ID', 'Name', 'Role', 'Email', 'Status', 'Last Login', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--fg2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                const rc = roleColors[user.role] || roleColors.Viewer
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors"
                    style={{ borderBottom: i < users.length - 1 ? '1px solid var(--divider)' : 'none' }}
                  >
                    <td className="px-4 py-3 font-mono" style={{ color: 'var(--fg3)' }}>{user.id}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--fg)' }}>{user.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: rc.bg, color: rc.text }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--fg2)' }}>{user.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: user.status === 'Active' ? '#22c55e' : 'var(--fg3)' }}
                        />
                        <span style={{ color: user.status === 'Active' ? '#22c55e' : 'var(--fg3)' }}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--fg2)' }}>{user.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-1.5 rounded hover:bg-slate-100 transition-colors"
                          style={{ color: 'var(--fg2)' }}
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="p-1.5 rounded hover:bg-red-50 transition-colors"
                          style={{ color: '#ef4444' }}
                          title="Remove"
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
      </SectionCard>

      {/* Save button */}
      <div className="flex justify-end gap-4 pb-4">
        <button
          className="px-6 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-100"
          style={{ backgroundColor: 'var(--card)', color: 'var(--fg2)', border: '1px solid var(--border)' }}
        >
          Reset to Defaults
        </button>
        <button
          className="px-6 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', color: '#fff' }}
        >
          Save Changes
        </button>
      </div>
      </>)}
    </div>
  )
}

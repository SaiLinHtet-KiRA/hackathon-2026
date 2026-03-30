import React, { useState } from 'react'
import { Search, Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function TopBar() {
  const [searchVal, setSearchVal] = useState('')
  const { isDark, toggleTheme } = useTheme()

  return (
    <header
      className="flex items-center justify-between px-6 h-16 flex-shrink-0"
      style={{ backgroundColor: 'var(--topbar)', borderBottom: '1px solid var(--topbar-border)' }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--fg3)' }} />
        <input
          type="text"
          placeholder="Search incidents, cameras..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          style={{
            backgroundColor: 'var(--input-bg)',
            border: '1px solid var(--border)',
            color: 'var(--fg)',
          }}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 ml-4">
        {/* Live Badge */}
        <div
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          LIVE
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{
            backgroundColor: isDark ? 'rgba(13,148,136,0.12)' : 'var(--subtle)',
            border: '1px solid var(--border)',
            color: isDark ? '#14b8a6' : '#0d9488',
          }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg transition-colors"
          style={{ color: 'var(--fg2)', backgroundColor: 'transparent' }}
        >
          <Bell size={18} />
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 text-xs flex items-center justify-center rounded-full font-bold"
            style={{ backgroundColor: '#ef4444', color: '#fff' }}
          >
            5
          </span>
        </button>

      </div>
    </header>
  )
}

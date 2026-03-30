import React, { useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
  AreaChart, Area,
  ComposedChart,
} from 'recharts'
import {
  severityData, vehicleTypeData, hourlyTrendData, detectionSourceData,
  historicalPerformanceData, yearlyData, monthlyData, weeklyData, conditionData,
} from '../../data/mockData'
import { BarChart2, TrendingUp, PieChartIcon, Activity } from 'lucide-react'

const tooltipStyle = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '10px',
  color: '#f1f5f9',
  fontSize: '12px',
}

function CardWrapper({ title, icon: Icon, children, className = '' }) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col ${className}`}
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={15} className="text-blue-500" />
        <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (percent < 0.05) return null
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function DashboardCharts() {
  const [trendFilter, setTrendFilter] = useState('Yearly')
  const trendDataMap = { Yearly: yearlyData, Monthly: monthlyData, Weekly: weeklyData }
  const trendData = trendDataMap[trendFilter]

  const GRID  = 'var(--border)'
  const AXIS  = 'var(--fg3)'

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CardWrapper title="Incidents by Severity" icon={PieChartIcon}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={severityData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" labelLine={false} label={PieLabel}>
                {severityData.map(e => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', color: 'var(--fg2)' }} />
            </PieChart>
          </ResponsiveContainer>
        </CardWrapper>

        <CardWrapper title="Accident Types by Vehicle" icon={BarChart2}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={vehicleTypeData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="type" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[5, 5, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </CardWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CardWrapper title="Incident Trend Today (Hourly)" icon={Activity}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={hourlyTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="hour" tick={{ fill: AXIS, fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} name="Incidents" />
            </LineChart>
          </ResponsiveContainer>
        </CardWrapper>

        <CardWrapper title="Detection Source Comparison" icon={BarChart2}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={detectionSourceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="source" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(139,92,246,0.05)' }} />
              <Bar dataKey="count" radius={[5, 5, 0, 0]} name="Count">
                {detectionSourceData.map((_, i) => <Cell key={i} fill={['#3b82f6','#8b5cf6','#22c55e'][i % 3]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardWrapper>
      </div>

      <CardWrapper title="Historical Performance: Frequency vs Deaths" icon={TrendingUp}>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={historicalPerformanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '11px', color: 'var(--fg2)' }} />
            <Area yAxisId="left" type="monotone" dataKey="accidents" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth={2} name="Accidents" />
            <Line yAxisId="right" type="monotone" dataKey="deaths" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 3 }} name="Deaths" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CardWrapper title="Accident Tracking" icon={TrendingUp}>
          <div className="flex gap-1.5 mb-4">
            {['Yearly', 'Monthly', 'Weekly'].map(f => (
              <button
                key={f}
                onClick={() => setTrendFilter(f)}
                className="px-3 py-1 text-xs rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: trendFilter === f ? '#3b82f6' : 'var(--subtle)',
                  color: trendFilter === f ? '#fff' : 'var(--fg2)',
                  border: `1px solid ${trendFilter === f ? '#3b82f6' : 'var(--border)'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="period" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="accidents" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth={2} name="Accidents" />
            </AreaChart>
          </ResponsiveContainer>
        </CardWrapper>

        <CardWrapper title="Accident Conditions" icon={BarChart2}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={conditionData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="condition" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
              <Bar dataKey="count" radius={[5, 5, 0, 0]} name="Count">
                {conditionData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardWrapper>
      </div>
    </div>
  )
}

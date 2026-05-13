import { useEffect, useState } from 'react'
import { getDashboard } from '../services/api'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const COLORS = ['#2563eb', '#22c55e', '#ef4444', '#f59e0b']

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then(res => setData(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Loading dashboard...</div>
  if (!data) return <div className="loading">Gagal memuat data.</div>

  const { summary, final_result_distribution, avg_clicks_by_group, education_distribution } = data

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Ringkasan data siswa e-learning</p>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Siswa</div>
          <div className="stat-value primary">{summary.total_students.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Siswa Berisiko</div>
          <div className="stat-value danger">{summary.at_risk.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Siswa Aman</div>
          <div className="stat-value success">{summary.safe.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Persentase Risiko</div>
          <div className="stat-value danger">{summary.risk_percentage}%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Pie chart final result */}
        <div className="card">
          <div className="card-title">Distribusi Hasil Akhir</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={final_result_distribution}
                dataKey="count"
                nameKey="final_result"
                cx="50%" cy="50%"
                outerRadius={80}
                label={({ final_result, percent }) => `${final_result} ${(percent * 100).toFixed(0)}%`}
              >
                {final_result_distribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart avg clicks */}
        <div className="card">
          <div className="card-title">Rata-rata Klik: Aman vs Berisiko</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={avg_clicks_by_group}>
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg_clicks" fill="#2563eb" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart education */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-title">Distribusi Pendidikan Siswa</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={education_distribution} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="highest_education" type="category" width={180} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { getDashboard } from '../services/api'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
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

  const {
    summary,
    final_result_distribution = [],
    avg_clicks_by_group = [],
    education_distribution = []
  } = data

  const finalResultData = final_result_distribution.map(item => ({
    final_result: item.final_result,
    count: Number(item.count)
  }))

  return (
    <div>

      <h1 className="page-title">Dashboard</h1>

      <p className="page-subtitle">
        Ringkasan data siswa e-learning
      </p>

      <p className="page-description">
        Dashboard ini menampilkan ringkasan data siswa, distribusi hasil akhir,
        tingkat risiko, serta pola aktivitas belajar untuk membantu pemantauan
        performa siswa.
      </p>

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

      <div className="charts-grid">
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Distribusi Hasil Akhir

            <span
              title="Grafik ini menunjukkan perbandingan hasil akhir siswa, seperti lulus, gagal, mengundurkan diri, maupun memperoleh nilai distinction."
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#e2e8f0',
                color: '#475569',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                cursor: 'help'
              }}
            >
              i
            </span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={finalResultData}
                dataKey="count"
                nameKey="final_result"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={90}
                paddingAngle={3}
              >
                {finalResultData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginTop: 10,
              flexWrap: 'wrap'
            }}
          >
            {finalResultData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#f8fafc',
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: '1px solid #e2e8f0',
                  fontSize: 13,
                  fontWeight: 600
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: COLORS[index % COLORS.length]
                  }}
                />

                <span style={{ color: '#334155' }}>{item.final_result}</span>
                <span style={{ color: '#64748b' }}>({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Rata-rata Klik: Aman vs Berisiko</div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avg_clicks_by_group}>
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="avg_clicks" radius={[6, 6, 0, 0]}>
                {avg_clicks_by_group.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      String(entry.group).toLowerCase().includes('berisiko')
                        ? '#ef4444'
                        : '#2563eb'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Distribusi Pendidikan Siswa

            <span
              title="Grafik ini menunjukkan jumlah siswa berdasarkan tingkat pendidikan terakhir."
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#e2e8f0',
                color: '#475569',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                cursor: 'help'
              }}
            >
              i
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={education_distribution} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="highest_education" type="category" width={180} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
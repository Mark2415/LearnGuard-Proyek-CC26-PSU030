import { useEffect, useState } from 'react'
import { getStudents } from '../services/api'

const riskBadge = (label) =>
  label === 1
    ? <span className="badge risk">Berisiko</span>
    : <span className="badge safe">Aman</span>

const resultBadge = (result) => {
  const map = { Pass: 'pass', Fail: 'fail', Withdrawn: 'withdrawn', Distinction: 'distinction' }
  return <span className={`badge ${map[result] || ''}`}>{result}</span>
}

export default function Students() {
  const [students, setStudents] = useState([])
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)
  const [riskFilter, setRiskFilter] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteStudents')
    return saved ? JSON.parse(saved) : []
  })
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    setLoading(true)
    const params = {
      page: search || showFavorites ? 1 : page,
      limit: search || showFavorites ? 9999 : 20,
      search
    }
    if (riskFilter !== '') params.risk_label = riskFilter
    getStudents(params)
      .then(res => {
        setStudents(res.data.data)
        setPagination(res.data.pagination)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [page, riskFilter, search, showFavorites])

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]

      localStorage.setItem('favoriteStudents', JSON.stringify(updated))
      return updated
    })
  }
  const filteredStudents = students.filter(s => {
    const matchSearch = search
      ? String(s.id_student).includes(search)
      : true

    const matchFavorite = showFavorites
      ? favorites.includes(s.id_student)
      : true

    return matchSearch && matchFavorite
  })
  return (
    <div>
      <h1 className="page-title">Data Siswa</h1>
      <p className="page-subtitle">Daftar seluruh siswa beserta status risiko</p>

      {/* Filter */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Cari ID siswa..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontFamily: 'inherit',
              minWidth: 220
            }}
          />
          <label style={{ fontSize: 14, fontWeight: 600 }}>Filter Risiko:</label>
          <select
            value={riskFilter}
            onChange={e => { setRiskFilter(e.target.value); setPage(1) }}
            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
          >
            <option value="">Semua</option>
            <option value="0">Aman</option>
            <option value="1">Berisiko</option>
          </select>
          <button
            className="btn"
            onClick={() => setShowFavorites(prev => !prev)}
            style={{
              background: showFavorites ? '#facc15' : '#f1f5f9'
            }}
          >
            {showFavorites ? '⭐ Favorit Aktif' : '☆ Lihat Favorit'}
          </button>
          {pagination.total && (
            <span style={{ fontSize: 13, color: '#64748b', marginLeft: 'auto' }}>
              Total: {pagination.total.toLocaleString()} siswa
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Favorit</th>
                  <th>ID Siswa</th>
                  <th>Modul</th>
                  <th>Avg Klik</th>
                  <th>Total Klik</th>
                  <th>Aktif (minggu)</th>
                  <th>Skor</th>
                  <th>Hasil Akhir</th>
                  <th>Status Risiko</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <button
                        onClick={() => toggleFavorite(s.id_student)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: 18
                        }}
                      >
                        {favorites.includes(s.id_student) ? '⭐' : '☆'}
                      </button>
                    </td>
                    <td>{s.id_student}</td>
                    <td>{s.code_module}</td>
                    <td>{s.avg_clicks}</td>
                    <td>{s.total_clicks}</td>
                    <td>{s.active_weeks}</td>
                    <td>{s.score ?? '-'}</td>
                    <td>{resultBadge(s.final_result)}</td>
                    <td>{riskBadge(s.risk_label)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!search && !showFavorites && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              ← Prev
            </button>

            <span style={{ fontSize: 13, color: '#64748b' }}>
              Halaman {page} / {pagination.total_pages}
            </span>

            <button
              disabled={page === pagination.total_pages}
              onClick={() => setPage(p => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
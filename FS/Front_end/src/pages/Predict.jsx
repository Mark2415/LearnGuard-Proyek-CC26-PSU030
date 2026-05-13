import { useState } from 'react'
import { predictStudent } from '../services/api'

const initialForm = {
  id_student: '',
  avg_clicks: '',
  total_clicks: '',
  active_weeks: '',
  is_late: '0',
  is_submitted: '1',
  highest_education: 'HE Qualification',
  disability: 'N',
}

export default function Predict() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setError('')
    setResult(null)
    if (!form.avg_clicks || !form.total_clicks || !form.active_weeks) {
      setError('Harap isi semua field yang wajib diisi.')
      return
    }
    setLoading(true)
    try {
      const res = await predictStudent(form)
      console.log(res.data.data)
      setResult(res.data.data)
    } catch (err) {
      setError('Gagal melakukan prediksi. Pastikan backend & AI API sudah berjalan.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(initialForm)
    setResult(null)
    setError('')
  }

  return (
    <div>
      <h1 className="page-title">Prediksi Risiko Siswa</h1>
      <p className="page-subtitle">Masukkan data aktivitas siswa untuk memprediksi tingkat risiko</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Form */}
        <div className="card">
          <div className="card-title">Input Data Siswa</div>
          <div className="form-grid">
            <div className="form-group">
              <label>ID Siswa (opsional)</label>
              <input name="id_student" value={form.id_student} onChange={handleChange} placeholder="cth: 12345" />
            </div>
            <div className="form-group">
              <label>Rata-rata Klik *</label>
              <input name="avg_clicks" type="number" value={form.avg_clicks} onChange={handleChange} placeholder="cth: 77.5" />
            </div>
            <div className="form-group">
              <label>Total Klik *</label>
              <input name="total_clicks" type="number" value={form.total_clicks} onChange={handleChange} placeholder="cth: 310" />
            </div>
            <div className="form-group">
              <label>Minggu Aktif *</label>
              <input name="active_weeks" type="number" value={form.active_weeks} onChange={handleChange} placeholder="cth: 4" />
            </div>
            <div className="form-group">
              <label>Terlambat Submit?</label>
              <select name="is_late" value={form.is_late} onChange={handleChange}>
                <option value="0">Tidak</option>
                <option value="1">Ya</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sudah Submit?</label>
              <select name="is_submitted" value={form.is_submitted} onChange={handleChange}>
                <option value="1">Ya</option>
                <option value="0">Tidak</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Pendidikan Tertinggi</label>
              <select name="highest_education" value={form.highest_education} onChange={handleChange}>
                <option>HE Qualification</option>
                <option>Lower Than A Level</option>
                <option>No Formal quals</option>
                <option>Post Graduate Qualification</option>
                <option>A Level or Equivalent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Disabilitas?</label>
              <select name="disability" value={form.disability} onChange={handleChange}>
                <option value="N">Tidak</option>
                <option value="Y">Ya</option>
              </select>
            </div>
          </div>

          {error && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#fef2f2', borderRadius: 8, color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Memproses...' : '🔮 Prediksi Sekarang'}
            </button>
            <button className="btn" style={{ background: '#f1f5f9' }} onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Result */}
        <div className="card">
          <div className="card-title">Hasil Prediksi</div>

          {!result ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔮</div>
              <div style={{ fontSize: 14 }}>
                Isi form dan klik Prediksi untuk melihat hasil
              </div>
            </div>
          ) : (
            (() => {
              const isLowRisk = result.risk_probability < 0.5

              return (
                <div className={`result-box ${isLowRisk ? 'low' : 'high'}`}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>
                    {isLowRisk ? '✅' : '⚠️'}
                  </div>

                  <div className={`result-level ${isLowRisk ? 'low' : 'high'}`}>
                    {isLowRisk ? 'Risiko Rendah' : 'Risiko Tinggi'}
                  </div>

                  <div className="result-msg">
                    {isLowRisk
                      ? 'Risiko rendah, kondisi pembelajaran stabil.'
                      : 'Mahasiswa berisiko tinggi mengalami kesulitan belajar.'}
                  </div>

                  <div className="result-prob">
                    Probabilitas Risiko:{' '}
                    {(result.risk_probability * 100).toFixed(1)}%
                  </div>
                </div>
              )
            })()
          )}
        </div>
      </div>
    </div>
  )
}


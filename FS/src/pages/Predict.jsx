import { useEffect, useState } from 'react'
import { predictStudent, getStudents } from '../services/api'
import { TbChartInfographic } from "react-icons/tb";

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
  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents({ page: 1, limit: 100 })
      .then(res => setStudents(res.data.data))
      .catch(err => console.error(err))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => {
      let updatedForm = {
        ...prev,
        [name]: value,
      }

      if (name === 'id_student') {
        const selectedStudent = students.find(
          student => String(student.id_student) === String(value)
        )

        if (selectedStudent) {
          updatedForm = {
            ...updatedForm,
            total_clicks: selectedStudent.total_clicks,
            active_weeks: selectedStudent.active_weeks,
            avg_clicks: selectedStudent.avg_clicks,
          }
        }
      }

      if (name === 'total_clicks' || name === 'active_weeks') {
        const totalClicks = Number(updatedForm.total_clicks)
        const activeWeeks = Number(updatedForm.active_weeks)

        if (totalClicks > 0 && activeWeeks > 0) {
          updatedForm.avg_clicks = (totalClicks / activeWeeks).toFixed(1)
        } else {
          updatedForm.avg_clicks = ''
        }
      }

      return updatedForm
    })
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
      setError('Gagal melakukan prediksi. Pastikan Backend & AI API sudah berjalan.')
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
          <div className="card-title">Form Prediksi Risiko Siswa</div>
          <div className="form-grid">
            <div className="form-group">
              <label>ID Siswa *</label>
              <select name="id_student" value={form.id_student} onChange={handleChange} required>
                <option value="">Pilih ID Siswa</option>
                {students.map((student, index) => (
                  <option key={index} value={student.id_student}>
                    {student.id_student}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Rata-rata Klik *</label>
              <input
                name="avg_clicks"
                type="number"
                value={form.avg_clicks}
                readOnly
                placeholder="Otomatis dari total klik ÷ minggu aktif"
              />
            </div>
            <div className="form-group">
              <label>Total Klik *</label>
              <input
                name="total_clicks"
                type="number"
                value={form.total_clicks}
                readOnly
                placeholder="Otomatis dari data siswa"
              />
            </div>
            <div className="form-group">
              <label>Minggu Aktif *</label>
              <input
                name="active_weeks"
                type="number"
                value={form.active_weeks}
                readOnly
                placeholder="Otomatis dari data siswa"
              />
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
          </div>

          {error && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#fef2f2', borderRadius: 8, color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button
              className="btn btn-primary"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Memproses...' : (
                <>
                  <TbChartInfographic size={18} />
                  <span>Prediksi Sekarang</span>
                </>
              )}
            </button>

            <button
              className="btn"
              style={{ background: '#f1f5f9' }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="card">
          <div className="card-title">Hasil Prediksi</div>

          {!result ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
              <div style={{ marginBottom: 12 }}>
                <TbChartInfographic size={48} />
              </div>
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

                  <div className={`insight-box ${isLowRisk ? 'low' : 'high'}`}>
                    <strong>Insight:</strong>

                    <p>
                      {isLowRisk
                        ? 'Siswa menunjukkan aktivitas belajar yang cukup stabil. Pertahankan konsistensi interaksi, kehadiran, dan penyelesaian tugas agar performa tetap baik.'
                        : 'Siswa memerlukan perhatian lebih. Disarankan untuk memantau aktivitas mingguan, memberikan pendampingan belajar, dan mengevaluasi modul yang masih sulit dipahami.'}
                    </p>
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


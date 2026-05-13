# LearnGuard Frontend

Frontend React + Vite untuk Capstone Project.

## Struktur Folder

```
capstone-frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          ← entry point
    ├── App.jsx           ← routing utama
    ├── index.css         ← global styling
    ├── components/
    │   └── Sidebar.jsx   ← navigasi sidebar
    ├── pages/
    │   ├── Dashboard.jsx ← halaman dashboard + chart
    │   ├── Students.jsx  ← halaman tabel siswa
    │   └── Predict.jsx   ← halaman form prediksi
    └── services/
        └── api.js        ← semua fungsi axios ke backend
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Jalankan
```bash
npm run dev
```

Buka browser: `http://localhost:5173`

> ⚠️ Pastikan backend sudah jalan di `http://localhost:3000` sebelum membuka frontend

## Halaman

| Halaman | URL | Fungsi |
|---------|-----|--------|
| Dashboard | `/` | Chart & ringkasan data |
| Students | `/students` | Tabel daftar siswa |
| Predict | `/predict` | Form prediksi risiko |

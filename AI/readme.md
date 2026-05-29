# Pengembangan Artificial Intelligence pada Learn Guard

## Deskripsi Umum

Learn Guard merupakan platform prediktif berbasis kecerdasan buatan yang dirancang untuk membantu proses deteksi dini risiko ketertinggalan siswa. Pengembangan Artificial Intelligence memanfaatkan data aktivitas pembelajaran siswa untuk menghasilkan prediksi risiko akademik secara otomatis.

---

## Persiapan Data

Tahap awal dimulai melalui pemuatan dataset hasil pengolahan tim *Data Science*. Dataset telah melalui proses pembersihan data dan transformasi sehingga siap digunakan pada proses pemodelan.

Fitur yang digunakan meliputi:

- *avg_clicks*
- *total_clicks*
- *active_weeks*
- *is_late*
- *is_submitted*
- *highest_education*
- *disability*
- *risk_label* sebagai target prediksi

Data kemudian dipisahkan menjadi data pelatihan dan data pengujian menggunakan metode *train-test split*.

Normalisasi fitur numerik dilakukan menggunakan *StandardScaler* untuk menyamakan skala nilai antar fitur.

---

## Pengembangan Model Deep Learning

Model dikembangkan menggunakan *TensorFlow Functional API*.

Arsitektur model terdiri atas:

- Lapisan input
- Dua *hidden layer* dengan aktivasi *ReLU*
- Lapisan *Dropout*
- Lapisan output dengan aktivasi *Sigmoid*

Arsitektur tersebut digunakan untuk menghasilkan probabilitas risiko ketertinggalan siswa berdasarkan pola aktivitas pembelajaran.

---

## Implementasi Komponen Kustom

### Custom Callback

Implementasi *Custom Callback* digunakan untuk memantau nilai akurasi selama proses pelatihan berlangsung.

Proses pelatihan dapat dihentikan secara otomatis apabila target performa telah tercapai sehingga penggunaan sumber daya menjadi lebih efisien.

### Custom Training Loop

Implementasi *Custom Training Loop* menggunakan *tf.GradientTape*.

Pendekatan tersebut memberikan kendali terhadap:

- Perhitungan *loss*
- Proses *forward pass*
- Proses *backpropagation*
- Pembaruan bobot model

---

## Monitoring Pelatihan

Monitoring proses pelatihan dilakukan menggunakan *TensorBoard*.

Pencatatan metrik pelatihan mencakup:

- *Loss*
- *Accuracy*
- Perkembangan pelatihan pada setiap *epoch*

Log yang dihasilkan digunakan untuk visualisasi performa model selama proses pelatihan.

---

## Training dan Evaluasi Model

Model dilatih menggunakan data pelatihan yang telah dinormalisasi.

Proses optimisasi menggunakan:

- *Adam Optimizer*
- *Binary Crossentropy*

Evaluasi model dilakukan menggunakan:

- *Accuracy*
- *Mean Absolute Error (MAE)*
- *Confusion Matrix*
- *Classification Report*

Hasil evaluasi digunakan untuk mengukur kualitas prediksi model terhadap data pengujian.

---

## Penyimpanan Model

Model yang telah selesai dilatih disimpan menggunakan format *.keras*.

Penyimpanan dilakukan agar model dapat digunakan kembali tanpa menjalankan proses pelatihan ulang.

Objek *scaler* juga disimpan untuk menjaga konsistensi proses normalisasi pada tahap prediksi.

---

## Implementasi Inference

Tahap inference digunakan untuk menghasilkan prediksi risiko berdasarkan data siswa yang baru.

Alur proses terdiri atas:

1. Memuat model yang telah disimpan.
2. Memuat objek *scaler*.
3. Melakukan normalisasi data masukan.
4. Menghasilkan probabilitas risiko.
5. Menentukan hasil klasifikasi.

---

## Pengembangan REST API

Integrasi model dilakukan menggunakan *FastAPI*.

Fungsi utama API meliputi:

- Menerima data aktivitas siswa.
- Mengirim data ke model prediksi.
- Menghasilkan prediksi risiko secara otomatis.
- Mengembalikan hasil prediksi ke aplikasi.

---

## Hasil Implementasi

Implementasi Artificial Intelligence pada Learn Guard mencakup:

- Pengolahan data
- Pengembangan model *Deep Learning*
- Implementasi *Custom Callback*
- Implementasi *Custom Training Loop*
- Monitoring menggunakan *TensorBoard*
- Evaluasi model
- Penyimpanan model format *.keras*
- Implementasi inference
- Pengembangan *REST API*

Seluruh komponen tersebut mendukung proses deteksi dini risiko ketertinggalan siswa pada platform Learn Guard.

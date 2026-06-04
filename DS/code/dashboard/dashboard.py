# --- BAGIAN 2: VISUALISASI GAMBAR (FRAME HITAM & BACKGROUND PUTIH) ---
st.subheader("Visualisasi Data")

    img_folder = "DS/code/dashboard/data/img" 
    img_folder = "data/img" 
images = [
"01_data_quality.png",
"02_distribution mingguan.png",
"03_distribusi_risk_data.png",
"04_data_lost.png",
"05_distribusi_korelasi.png"
]

# Styling CSS untuk membuat efek frame hitam dan background putih
# Kita gunakan container HTML untuk memastikan background putih di sekitar gambar
css_frame = """
   <style>
   .img-frame {
       border: 3px solid black;
       background-color: white;
       padding: 15px;
       margin-bottom: 30px;
       border-radius: 8px;
       display: flex;
       justify-content: center;
       align-items: center;
   }
   .img-frame img {
       max-width: 100%;
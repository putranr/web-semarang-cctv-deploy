// ======================================================
// HERO SECTION
// ======================================================
// Hero adalah bagian pertama yang dilihat pengunjung.
//
// Tujuan Hero:
// 1. Menjelaskan bisnis
// 2. Menjelaskan layanan
// 3. Memberikan tombol tindakan / CTA
// 4. Memberikan visual yang menarik
// ======================================================

export function Hero() {
  return (
    <section className="hero">

      {/* ================================================
          KONTEN UTAMA HERO
          ================================================ */}

      <div className="hero-container">

        {/* ==============================================
            BAGIAN TEXT
            ============================================== */}

        <div className="hero-content">

          {/* Label kecil di atas judul */}
          <div className="hero-label">
            <span></span>
            PROFESSIONAL CCTV SOLUTION
          </div>


          {/* Judul utama */}
          <h1>
            Keamanan Lebih
            <br />
            <span>Cerdas & Terpercaya.</span>
          </h1>


          {/* Deskripsi */}
          <p>
            Solusi installation dan maintenance CCTV
            profesional untuk rumah, kantor, bisnis,
            gudang, dan berbagai kebutuhan keamanan.
          </p>


          {/* ==========================================
              BUTTON / CALL TO ACTION
              ========================================== */}

          <div className="hero-buttons">

            <a
              href="#contact"
              className="primary-button"
            >
              Konsultasi Sekarang
            </a>


            <a
              href="#portfolio"
              className="secondary-button"
            >
              Lihat Portfolio
            </a>

          </div>


          {/* ==========================================
              INFORMASI KEPERCAYAAN
              ========================================== */}

          <div className="hero-trust">

            <span>✓ Teknisi Profesional</span>

            <span>✓ Garansi Pekerjaan</span>

            <span>✓ Support</span>

          </div>

        </div>


        {/* ==============================================
            BAGIAN GAMBAR
            ============================================== */}

        <div className="hero-visual">

          {/* 
            Untuk sementara kita menggunakan
            placeholder terlebih dahulu.

            Nanti bisa diganti dengan foto CCTV asli.
          */}

          <div className="camera-placeholder">

            <div className="camera-icon">
              CCTV
            </div>

            <span>
              CCTV SECURITY SYSTEM
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}
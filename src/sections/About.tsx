// ======================================================
// ABOUT SECTION
// ======================================================
// Section ini menjelaskan identitas perusahaan.
//
// Isi:
// 1. Judul
// 2. Deskripsi perusahaan
// 3. Statistik perusahaan
// 4. Tombol informasi
// ======================================================

export function About() {
  return (
    <section id="about" className="about-section">

      {/* ================================================
          BAGIAN ATAS
          ================================================ */}

      <div className="about-container">

        <div className="about-heading">

          {/* Label kecil */}
          <span className="section-label">
            ABOUT COMPANY
          </span>

          {/* Judul */}
          <h2>
            Solusi Keamanan yang
            <span> Dibangun untuk Anda.</span>
          </h2>

        </div>


        {/* ==============================================
            DESKRIPSI
            ============================================== */}

        <div className="about-description">

          <p>
            Kami menyediakan layanan installation,
            maintenance, dan pengembangan sistem CCTV
            untuk membantu menjaga keamanan rumah,
            bisnis, kantor, gudang, dan berbagai
            kebutuhan profesional.
          </p>

          <p>
            Dengan dukungan teknisi berpengalaman dan
            sistem yang disesuaikan dengan kebutuhan
            pelanggan, kami berkomitmen memberikan
            solusi keamanan yang efektif dan terpercaya.
          </p>

        </div>

      </div>


      {/* ================================================
          STATISTICS
          ================================================ */}

      <div className="about-stats">

        {/* STAT 1 */}
        <div className="stat-card">

          <strong>
            10+
          </strong>

          <span>
            Tahun Pengalaman
          </span>

        </div>


        {/* STAT 2 */}
        <div className="stat-card">

          <strong>
            500+
          </strong>

          <span>
            Project Selesai
          </span>

        </div>


        {/* STAT 3 */}
        <div className="stat-card">

          <strong>
            24/7
          </strong>

          <span>
            Support
          </span>

        </div>


        {/* STAT 4 */}
        <div className="stat-card">

          <strong>
            100%
          </strong>

          <span>
            Komitmen
          </span>

        </div>

      </div>


      {/* ================================================
          BOTTOM CTA
          ================================================ */}

      <div className="about-bottom">

        <div>
          <span className="section-label">
            WHY CHOOSE US
          </span>

          <h3>
            Keamanan bukan sekadar
            memasang kamera.
          </h3>
        </div>


        <a
          href="#services"
          className="about-button"
        >
          Lihat Layanan →
        </a>

      </div>

    </section>
  );
}
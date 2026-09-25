// ======================================================
// IMPORT
// ======================================================

// useState digunakan untuk menyimpan data yang bisa berubah
// ketika user berinteraksi dengan website.
import { useState } from "react";

// Icon dari Lucide React
import {
  ArrowRight,
  Camera,
  CheckCircle,
} from "lucide-react";

// Component Navbar
import { Navbar } from "./components/Navbar";

// Data layanan
import { services } from "./data/services";

// Component kartu layanan
import { ServiceCard } from "./components/ServiceCard";

// Data portfolio
import { portfolios } from "./data/portfolio";

import type { Portfolio } from "./data/portfolio";

// Component kartu portfolio
import { PortfolioCard } from "./components/PortfolioCard";

import { PortfolioModal } from "./components/PortfolioModal";

//KOmponen Article
import { articles } from "./data/articles";

import { ArticleCard } from "./components/ArticleCard";

// Component Brand Partner
import { BrandPartner } from "./components/BrandPartner";

//bussiness partner
import { BusinessPartners } from "./components/BusinessPartners";

//component footer
import { Footer } from "./components/Footer";

//
import { Contact } from "./components/Contact";
// ======================================================
// APP COMPONENT
// ======================================================

function App() {

  // ====================================================
  // PORTFOLIO FILTER
  // ====================================================
  //
  // selectedCategory = kategori yang sedang dipilih
  //
  // setSelectedCategory = fungsi untuk mengubah kategori
  //
  // "Semua" = nilai awal
  // ====================================================

  const [selectedCategory, setSelectedCategory] =
    useState("Semua");

    // ====================================================
// SELECTED PORTFOLIO
// ====================================================
//
// Menyimpan project yang sedang dibuka.
//
// null = belum ada project yang dipilih.
// ====================================================

const [selectedPortfolio, setSelectedPortfolio] =
  useState<Portfolio | null>(null);

  // ====================================================
  // DAFTAR KATEGORI PORTFOLIO
  // ====================================================

  const categories = [
    "Semua",
    "Rumah",
    "Kantor",
    "Gudang",
    "Toko",
  ];


  // ====================================================
  // FILTER PORTFOLIO
  // ====================================================
  //
  // Kalau kategori yang dipilih "Semua",
  // tampilkan seluruh portfolio.
  //
  // Kalau bukan "Semua",
  // tampilkan portfolio yang kategorinya sesuai.
  // ====================================================

  const filteredPortfolios =
    selectedCategory === "Semua"
      ? portfolios
      : portfolios.filter(
          (portfolio) =>
            portfolio.category === selectedCategory
        );


  // ====================================================
  // RETURN
  // ====================================================
  //
  // Semua tampilan website berada di dalam return.
  // ====================================================

  return (
    <>

      {/* ==================================================
          NAVBAR
          ================================================== */}

      <Navbar />


      {/* ==================================================
          HERO SECTION
          ================================================== */}

      <section className="hero">

        {/* Background decoration */}
        <div className="hero-glow"></div>


        <div className="hero-container">

          {/* ==============================================
              HERO TEXT
              ============================================== */}

          <div className="hero-content">

            <div className="hero-label">

              <span></span>

              PROFESSIONAL CCTV SOLUTION

            </div>


            <h1>

              Keamanan Lebih

              <span>
                {" "}Cerdas & Terpercaya.
              </span>

            </h1>


            <p>

              Solusi installation dan maintenance CCTV
              profesional untuk rumah, bisnis, kantor,
              gudang, dan berbagai kebutuhan keamanan.

            </p>


            {/* Tombol Hero */}

            <div className="hero-buttons">

              <a
                href="#contact"
                className="primary-button"
              >

                Konsultasi Sekarang

                <ArrowRight size={18} />

              </a>


              <a
                href="#portfolio"
                className="secondary-button"
              >

                Lihat Portfolio

              </a>

            </div>


            {/* Keunggulan */}

            <div className="hero-trust">

              <div>

                <CheckCircle size={17} />

                Teknisi Profesional

              </div>


              <div>

                <CheckCircle size={17} />

                Garansi Pekerjaan

              </div>

            </div>

          </div>


          {/* ==============================================
              HERO VISUAL
              ============================================== */}

          <div className="hero-visual">

            <div className="camera-card">

              <Camera
                size={100}
                strokeWidth={1}
              />

              <div className="camera-text">

                <strong>
                  SECURITY
                </strong>

                <span>
                  MONITORING SYSTEM
                </span>

              </div>

            </div>
          </div>

        </div>

      </section>


      {/* ==================================================
          ABOUT
          ================================================== */}

      <section
        id="about"
        className="section"
      >

        <div className="section-container">

          <span className="section-label">
            ABOUT COMPANY
          </span>


          <h2>

            Solusi Keamanan untuk

            <span>
              {" "}Kebutuhan Anda.
            </span>

          </h2>


          <p className="section-description">

            Kami menyediakan layanan installation,
            maintenance, troubleshooting, dan upgrade
            sistem CCTV dengan mengutamakan kualitas
            dan kebutuhan pelanggan.

          </p>

        </div>

      </section>


      {/* ==================================================
          SERVICES
          ================================================== */}

      <section
        id="services"
        className="section section-dark"
      >

        <div className="section-container">

          <span className="section-label">
            OUR SERVICES
          </span>


          <h2>
            Jasa & Layanan
          </h2>


          <p className="section-description">

            Berbagai layanan CCTV untuk membantu menjaga
            keamanan properti dan bisnis Anda.

          </p>


          {/* ==============================================
              SERVICE GRID
              ============================================== */}

          <div className="services-grid">

            {services.map((service) => (

              <ServiceCard
                key={service.title}
                service={service}
              />

            ))}

          </div>

        </div>

      </section>


      {/* ==================================================
          ARTICLES
          ================================================== */}

{/* ==================================================
    ARTIKEL & INSIGHT
    ================================================== */}

<section
  id="articles"
  className="section"
>

  <div className="section-container">


    {/* ==================================================
        JUDUL SECTION
        ================================================== */}

    <span className="section-label">

      ARTICLES & INSIGHT

    </span>


    <h2>

      Artikel & Insight

    </h2>


    <p className="section-description">

      Informasi, tips, dan wawasan seputar CCTV,
      keamanan, serta teknologi monitoring.

    </p>


    {/* ==================================================
        ARTICLE GRID
        ================================================== */}

    <div className="article-grid">

      {articles.map((article) => (

        <ArticleCard

          key={article.title}

          article={article}

          onClick={() => {

            console.log(
              "Artikel dipilih:",
              article.title
            );

          }}

        />

      ))}

    </div>


  </div>

</section>


      {/* ==================================================
          PORTFOLIO
          ================================================== */}

      <section
        id="portfolio"
        className="section section-dark"
      >

        <div className="section-container">


          {/* ==============================================
              PORTFOLIO HEADER
              ============================================== */}

          <span className="section-label">
            OUR PROJECT
          </span>


          <h2>
            Portfolio Pekerjaan
          </h2>


          <p className="section-description">

            Beberapa project installation dan maintenance
            CCTV yang telah kami kerjakan.

          </p>


          {/* ==============================================
              FILTER BUTTON
              ============================================== */}

          <div className="portfolio-filter">

            {categories.map((category) => (

              <button

                key={category}

                className={
                  selectedCategory === category
                    ? "filter-button active"
                    : "filter-button"
                }

                onClick={() =>
                  setSelectedCategory(category)
                }

              >

                {category}

              </button>

            ))}

          </div>


          {/* ==============================================
              PORTFOLIO GRID
              ============================================== */}

          <div className="portfolio-grid">

            {filteredPortfolios.map((portfolio) => (
              
              <PortfolioCard
              
              key={portfolio.title}
              
              portfolio={portfolio}
              
              onClick={() => {
                
                // Menyimpan project yang diklik
                setSelectedPortfolio(portfolio);
              
              }}
              
              />

            ))}

          </div>

        </div>

      </section>

{/* ==================================================
    BRAND PARTNER
    ================================================== */}

<BrandPartner />

{/* ==================================================
    MITRA BISNIS
    ================================================== */}

<BusinessPartners />
      {/* ==================================================
          CONTACT
          ================================================== */}

{/* ==================================================
    CONTACT
    ================================================== */}

<Contact />

{/* ==================================================
    PORTFOLIO DETAIL MODAL
    ================================================== */}
<Footer />

<PortfolioModal

  portfolio={selectedPortfolio}

  onClose={() => {

    // Mengembalikan state menjadi null
    // sehingga modal ditutup.

    setSelectedPortfolio(null);

  }}

/>
    </>
  );
}


// ======================================================
// EXPORT APP
// ======================================================

export default App;
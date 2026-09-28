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

import { Reveal } from "./components/Reveal";

// Component Navbar
import { Navbar } from "./components/Navbar";

// Data layanan
import { services } from "./data/services";

// Component kartu layanan
import { ServiceModal } from "./components/ServiceModal";
import type { Service } from "./data/services";
import { ServiceCard } from "./components/ServiceCard";

// Component kartu portfolio
import { PortfolioCard } from "./components/PortfolioCard";

import { PortfolioModal } from "./components/PortfolioModal";

// Component Brand Partner
import { BrandPartner } from "./components/BrandPartner";

//bussiness partner
import { BusinessPartners } from "./components/BusinessPartners";

// Data portfolio
import { portfolios } from "./data/portfolio";

import type { Portfolio } from "./data/portfolio";

// Component Brand yang digunakan
import { BrandUsed } from "./components/BrandUsed";

import type { Brand } from "./data/brands";

import { BrandUsedModal } from "./components/BrandUsedModal";

//KOmponen Article
import { articles } from "./data/articles";

import type { Article } from "./data/articles";

import { ArticleCard } from "./components/ArticleCard";
import { ArticleModal } from "./components/ArticleModal";

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
// SELECTED ARTICLE
// ====================================================
//
// Menyimpan artikel yang sedang dipilih.
//
// null = belum ada artikel yang dipilih.
// ====================================================

// ====================================================
// SELECTED SERVICE
// ====================================================
//
// Menyimpan layanan yang sedang dipilih.
// ====================================================

const [selectedService, setSelectedService] =
  useState<Service | null>(null);

const [selectedArticle, setSelectedArticle] =
  useState<Article | null>(null);  

// ====================================================
// ARTICLE VIEW MODE
// ====================================================
//
// false = mode preview horizontal
// true  = semua artikel ditampilkan
// ====================================================

const [showAllArticles, setShowAllArticles] =
  useState(false);

// ====================================================
// SELECTED BRAND
// ====================================================
//
// Menyimpan brand yang sedang dipilih.
//
// null = belum ada brand yang dipilih.
// ====================================================

const [selectedBrand, setSelectedBrand] =
  useState<Brand | null>(null);

// ====================================================
// PORTFOLIO VIEW MODE
// ====================================================
//
// false = horizontal preview
// true  = semua project
// ====================================================

const [showAllPortfolio, setShowAllPortfolio] =
  useState(false);

// ====================================================
// ARTICLE DISPLAY
// ====================================================
//
// Kalau showAllArticles = false
// hanya tampilkan 3 artikel.
//
// Kalau true
// tampilkan semua artikel.
// ====================================================

const displayedArticles = showAllArticles
  ? articles
  : articles.slice(0, 3);

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
// PORTFOLIO DISPLAY
// ====================================================
//
// Preview:
// hanya 3 project.
//
// See All:
// semua project yang sesuai filter.
// ====================================================

const displayedPortfolios = showAllPortfolio
  ? filteredPortfolios
  : filteredPortfolios.slice(0, 3);      

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
            
                onClick={() => {
                
                  // Simpan service yang dipilih
                  setSelectedService(service);
                
                }}
              
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
        SECTION HEADER
        ================================================== */}

    <div className="article-section-header">

      <div>

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

      </div>


      {/* =================================================
          SEE ALL BUTTON
          ================================================= */}

      <button
        className="see-all-button"

        onClick={() =>
          setShowAllArticles(!showAllArticles)
        }
      >

        {showAllArticles
          ? "Show Less"
          : "See All"}

      </button>

    </div>


    {/* ==================================================
        ARTICLE LIST
        ================================================== */}

    <div
      className={
        showAllArticles
          ? "article-grid article-all"
          : "article-grid article-horizontal"
      }
    >

      {displayedArticles.map((article) => (

        <ArticleCard
      
          key={article.title}
      
          article={article}
      
          onClick={() => {
      
            // Simpan artikel yang dipilih
            setSelectedArticle(article);
      
          }}
      
        />
      
      ))}

    </div>


  </div>

</section>


 {/* ==================================================
    PORTFOLIO PEKERJAAN
    ================================================== */}

<section
  id="portfolio"
  className="section section-dark"
>

  <div className="section-container">


    {/* =================================================
        HEADER
        ================================================= */}

    <div className="portfolio-section-header">

      <div>

        <span className="section-label">
          OUR PROJECT
        </span>


        <h2>
          Portfolio Pekerjaan
        </h2>


        <p className="section-description">

          Beberapa project installation dan
          maintenance CCTV yang telah kami kerjakan.

        </p>

      </div>


      {/* =================================================
          SEE ALL
          ================================================= */}

      <button
        className="see-all-button portfolio-see-all"

        onClick={() =>
          setShowAllPortfolio(!showAllPortfolio)
        }
      >

        {showAllPortfolio
          ? "Show Less"
          : "See All"}

      </button>

    </div>


    {/* =================================================
        FILTER
        ================================================= */}

    <div className="portfolio-filter">

      {categories.map((category) => (

        <button

          key={category}

          className={
            selectedCategory === category
              ? "filter-button active"
              : "filter-button"
          }

          onClick={() => {

            setSelectedCategory(category);

            // Saat kategori berubah,
            // kita kembali ke mode preview.

            setShowAllPortfolio(false);

          }}

        >

          {category}

        </button>

      ))}

    </div>


    {/* =================================================
        PORTFOLIO LIST
        ================================================= */}

    <div
      className={
        showAllPortfolio
          ? "portfolio-grid portfolio-all"
          : "portfolio-grid portfolio-horizontal"
      }
    >

      {displayedPortfolios.map(
        (portfolio) => (

          <PortfolioCard

            key={portfolio.title}

            portfolio={portfolio}

            onClick={() => {

              setSelectedPortfolio(portfolio);

            }}

          />

        )
      )}

    </div>


  </div>

</section>

{/* ==================================================
    BRAND PARTNER
    ================================================== */}

<BrandPartner />


{/* ==================================================
    BRAND YANG KAMI GUNAKAN
    ================================================== */}

<BrandUsed
  onSelectBrand={(brand) => {

    setSelectedBrand(brand);

  }}
/>

{/* ==================================================
    BRAND DETAIL MODAL
    ================================================== */}

<BrandUsedModal

  brand={selectedBrand}

  onClose={() => {

    setSelectedBrand(null);

  }}

/>

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

{/* ==================================================
    SERVICE DETAIL MODAL
    ================================================== */}

<ServiceModal

  service={selectedService}

  onClose={() => {

    setSelectedService(null);

  }}

/>

{/* ==================================================
    ARTICLE DETAIL MODAL
    ================================================== */}

<ArticleModal

  article={selectedArticle}

  onClose={() => {

    setSelectedArticle(null);

  }}

/>

    </>
  );
}


// ======================================================
// EXPORT APP
// ======================================================

export default App;
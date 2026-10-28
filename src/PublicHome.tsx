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

import {
  PublicServicesSection,
} from './components/PublicServicesSection';

// Component Brand Partner
import { BrandPartner } from "./components/BrandPartner";
// Component Brand yang digunakan
import { BrandUsed } from "./components/BrandUsed";

import type { Brand } from "./data/brands";

import { BrandUsedModal } from "./components/BrandUsedModal";


//bussiness partner
import { BusinessPartners } from "./components/BusinessPartners";

// Data portfolio
import {
  PublicPortfolioSection,
} from './components/PublicPortfolioSection';



//KOmponen Article
import {
  PublicArticlesSection,
} from './components/PublicArticlesSection';

//component footer
import { Footer } from "./components/Footer";

//
import { Contact } from "./components/Contact";

// ======================================================
// APP COMPONENT
// ======================================================

function App() {

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


<Reveal>
  <PublicServicesSection />
</Reveal>

<Reveal>
  <PublicArticlesSection />
</Reveal>

<Reveal>
  <PublicPortfolioSection />
</Reveal>


{/* ==================================================
    BRAND PARTNER
    ================================================== */}

<BrandPartner />


{/* ==================================================
    BRAND YANG KAMI GUNAKAN
    ================================================== */}

<BrandUsed
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


    </>
  );
}


// ======================================================
// EXPORT APP
// ======================================================

export default App;
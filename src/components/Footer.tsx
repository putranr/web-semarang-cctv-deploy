// ======================================================
// FOOTER
// ======================================================
//
// Footer adalah bagian paling bawah website.
//
// Isi footer:
// 1. Identitas perusahaan
// 2. Navigasi website
// 3. Layanan
// 4. Kontak
// 5. Copyright
// ======================================================

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

// Data kontak perusahaan
import { contactInfo } from "../data/contact";


// ======================================================
// FOOTER COMPONENT
// ======================================================

export function Footer() {

  // Tahun otomatis mengikuti tahun sekarang.
  // Jadi tidak perlu mengubah tahun secara manual.
  const currentYear = new Date().getFullYear();

  return (

    <footer className="footer">

      {/* ==================================================
          MAIN FOOTER
          ================================================== */}

      <div className="footer-container">


        {/* ==================================================
            BRAND / COMPANY
            ================================================== */}

        <div className="footer-brand">

          {/* Logo */}

        {/* ==================================================
            FOOTER LOGO
            ================================================== */}
        
        <a
          href="#"
          className="footer-logo"
        >
        
          <img
            src="/images/logo.png"
            alt="Logo perusahaan"
            className="footer-logo-image"
          />
        
        </a>


          {/* Deskripsi */}

          <p>

            Solusi installation dan maintenance CCTV
            profesional untuk kebutuhan rumah,
            bisnis, kantor, dan properti lainnya.

          </p>


          {/* CTA */}

          <a
            href="#contact"
            className="footer-cta"
          >

            Hubungi Kami

            <ArrowUpRight size={16} />

          </a>

        </div>


        {/* ==================================================
            NAVIGATION
            ================================================== */}

        <div className="footer-column">

          <h3>
            Navigasi
          </h3>


          <a href="#about">
            Tentang Kami
          </a>

          <a href="#articles">
            Artikel & Insight
          </a>

          <a href="#services">
            Jasa & Layanan
          </a>

          <a href="#portfolio">
            Portfolio
          </a>

          <a href="#partners">
            Brand Partner
          </a>

          <a href="#business-partners">
            Mitra Bisnis
          </a>

          <a href="#contact">
            Kontak Kami
          </a>

        </div>


        {/* ==================================================
            SERVICES
            ================================================== */}

        <div className="footer-column">

          <h3>
            Layanan
          </h3>


          <a href="#services">
            Installation CCTV
          </a>

          <a href="#services">
            Maintenance CCTV
          </a>

          <a href="#services">
            Troubleshooting
          </a>

          <a href="#services">
            Upgrade System
          </a>

        </div>


        {/* ==================================================
            CONTACT
            ================================================== */}

        <div className="footer-column footer-contact">

          <h3>
            Kontak
          </h3>


          {/* WhatsApp */}

          <a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >

            <Phone size={15} />

            {contactInfo.whatsappDisplay}

          </a>


          {/* Email */}

          <a
            href={`mailto:${contactInfo.email}`}
          >

            <Mail size={15} />

            {contactInfo.email}

          </a>


          {/* Address */}

          <div className="footer-address">

            <MapPin size={15} />

            <span>
              {contactInfo.address}
            </span>

          </div>

        </div>

      </div>


      {/* ==================================================
          BOTTOM FOOTER
          ================================================== */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">


          {/* Copyright */}

          <p>

            © {currentYear}{" "}

            {contactInfo.companyName}.

            {" "}All rights reserved.

          </p>


          {/* Back to top */}

          <a
            href="#"
            className="back-to-top"
          >

            Kembali ke atas

            <ArrowUpRight size={15} />

          </a>

        </div>

      </div>

    </footer>

  );

}
// ======================================================
// NAVBAR
// ======================================================
//
// Navbar bertugas menyediakan navigasi utama website.
//
// Fitur:
// 1. Sticky navbar
// 2. Desktop navigation
// 3. Partner dropdown
// 4. Mobile hamburger menu
// 5. Mobile partner submenu
// ======================================================

import { useState } from "react";

import {
  ChevronDown,
  Menu,
  Phone,
  X,
} from "lucide-react";


// ======================================================
// COMPONENT
// ======================================================

export function Navbar() {

  // ====================================================
  // MOBILE MENU STATE
  // ====================================================

  const [isOpen, setIsOpen] =
    useState(false);


  // ====================================================
  // PARTNER DROPDOWN STATE
  // ====================================================

  const [partnerOpen, setPartnerOpen] =
    useState(false);


  // ====================================================
  // CLOSE MOBILE MENU
  // ====================================================

  const closeMobileMenu = () => {

    setIsOpen(false);

    setPartnerOpen(false);

  };


  return (

    <nav className="navbar">


      {/* ==================================================
          LOGO
          ================================================== */}

      {/* ==================================================
          COMPANY LOGO
          ================================================== */}

      <a
        href="#"
        className="logo"
        onClick={closeMobileMenu}
      >
      
        <img
          src="/images/logo.png"
          alt="Logo perusahaan"
          className="logo-image"
        />

      </a>


      {/* ==================================================
          DESKTOP NAVIGATION
          ================================================== */}

      <div className="nav-links">


        <a href="#about">
          Tentang Kami
        </a>

        <a href="#services">
          Layanan
        </a>

        <a href="#articles">
          Artikel
        </a>

        <a href="#portfolio">
          Portofolio
        </a>


        {/* =================================================
            PARTNER DROPDOWN
            ================================================= */}

        <div className="nav-dropdown">


          <button
            className="nav-dropdown-button"
            onClick={() =>
              setPartnerOpen(!partnerOpen)
            }
          >

            Partner

            <ChevronDown
              size={15}
              className={
                partnerOpen
                  ? "rotate-icon"
                  : ""
              }
            />

          </button>


          {/* Dropdown menu */}

          {partnerOpen && (

            <div className="nav-dropdown-menu">

              <a
                href="#brand-partner"
                onClick={() =>
                  setPartnerOpen(false)
                }
              >

                Brand Partner

              </a>


              <a
                href="#business-partners"
                onClick={() =>
                  setPartnerOpen(false)
                }
              >

                Mitra Bisnis

              </a>

            </div>

          )}

        </div>


        <a href="#contact">
          Kontak
        </a>

      </div>


      {/* ==================================================
          DESKTOP CTA
          ================================================== */}

      <a
        href="#contact"
        className="nav-button"
      >

        <Phone size={17} />

        Konsultasi

      </a>


      {/* ==================================================
          MOBILE MENU BUTTON
          ================================================== */}

      <button
        className="menu-button"

        onClick={() =>
          setIsOpen(!isOpen)
        }

        aria-label="Toggle navigation menu"
      >

        {isOpen ? (
          <X size={26} />
        ) : (
          <Menu size={26} />
        )}

      </button>


      {/* ==================================================
          MOBILE MENU
          ================================================== */}

      {isOpen && (

        <div className="mobile-menu">


          <a
            href="#about"
            onClick={closeMobileMenu}
          >
            Tentang Kami
          </a>


          <a
            href="#articles"
            onClick={closeMobileMenu}
          >
            Artikel
          </a>


          <a
            href="#services"
            onClick={closeMobileMenu}
          >
            Layanan
          </a>


          <a
            href="#portfolio"
            onClick={closeMobileMenu}
          >
            Portfolio
          </a>


          {/* =================================================
              MOBILE PARTNER
              ================================================= */}

          <div className="mobile-partner">


            <button
              className="mobile-partner-button"

              onClick={() =>
                setPartnerOpen(!partnerOpen)
              }
            >

              <span>
                Partner
              </span>


              <ChevronDown
                size={17}
                className={
                  partnerOpen
                    ? "rotate-icon"
                    : ""
                }
              />

            </button>


            {/* Submenu */}

            {partnerOpen && (

              <div className="mobile-partner-submenu">

                <a
                  href="#partners"
                  onClick={closeMobileMenu}
                >

                  Brand Partner

                </a>


                <a
                  href="#business-partners"
                  onClick={closeMobileMenu}
                >

                  Mitra Bisnis

                </a>

              </div>

            )}

          </div>


          <a
            href="#contact"
            onClick={closeMobileMenu}
          >
            Kontak
          </a>


          {/* Mobile CTA */}

          <a
            href="#contact"
            className="mobile-cta"
            onClick={closeMobileMenu}
          >

            <Phone size={17} />

            Konsultasi

          </a>

        </div>

      )}

    </nav>

  );

}
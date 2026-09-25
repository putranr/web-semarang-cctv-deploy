// ======================================================
// PORTFOLIO MODAL
// ======================================================
//
// Component ini menampilkan detail project ketika
// user mengklik portfolio.
// ======================================================

import {
  X,
  MapPin,
  Camera,
  Calendar,
} from "lucide-react";

import type { Portfolio } from "../data/portfolio";


// ======================================================
// PROPS
// ======================================================

type PortfolioModalProps = {

  // Project yang sedang dipilih
  portfolio: Portfolio | null;

  // Fungsi untuk menutup modal
  onClose: () => void;

};


// ======================================================
// COMPONENT
// ======================================================

export function PortfolioModal({

  portfolio,

  onClose,

}: PortfolioModalProps) {


  // ====================================================
  // JIKA TIDAK ADA PROJECT
  // ====================================================
  //
  // Kalau portfolio bernilai null,
  // modal tidak perlu ditampilkan.
  // ====================================================

  if (!portfolio) {

    return null;

  }


  // ====================================================
  // MODAL
  // ====================================================

  return (

    <div
      className="portfolio-modal-backdrop"
      onClick={onClose}
    >

      {/* =================================================
          MODAL CONTENT
          ================================================= */}

      <div
        className="portfolio-modal"
        onClick={(event) => event.stopPropagation()}
      >


        {/* =================================================
            CLOSE BUTTON
            ================================================= */}

        <button
          className="portfolio-modal-close"
          onClick={onClose}
          aria-label="Close portfolio detail"
        >

          <X size={20} />

        </button>


        {/* =================================================
            IMAGE
            ================================================= */}

        <div className="portfolio-modal-image">

          <img
            src={portfolio.image}
            alt={portfolio.title}
          />

        </div>


        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="portfolio-modal-content">


          {/* Category */}

          <span className="portfolio-category">

            {portfolio.category}

          </span>


          {/* Title */}

          <h2>

            {portfolio.title}

          </h2>


          {/* Description */}

          <p>

            {portfolio.description}

          </p>


          {/* =================================================
              PROJECT INFORMATION
              ================================================= */}

          <div className="portfolio-modal-info">


            {/* LOCATION */}

            <div className="portfolio-info-item">

              <MapPin size={17} />

              <div>

                <span>
                  Lokasi
                </span>

                <strong>
                  {portfolio.location}
                </strong>

              </div>

            </div>


            {/* CAMERA */}

            <div className="portfolio-info-item">

              <Camera size={17} />

              <div>

                <span>
                  Kamera
                </span>

                <strong>

                  {portfolio.cameras} Camera

                </strong>

              </div>

            </div>


            {/* YEAR */}

            <div className="portfolio-info-item">

              <Calendar size={17} />

              <div>

                <span>
                  Tahun
                </span>

                <strong>
                  {portfolio.year}
                </strong>

              </div>

            </div>


          </div>


        </div>

      </div>

    </div>

  );

}
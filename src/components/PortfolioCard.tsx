// ======================================================
// PORTFOLIO CARD
// ======================================================
//
// Component ini bertugas menampilkan SATU project.
//
// Data project akan dikirim melalui props.
// ======================================================

import { MapPin, ArrowUpRight } from "lucide-react";

import type { Portfolio } from "../data/portfolio";


// ======================================================
// PROPS
// ======================================================

type PortfolioCardProps = {

  // Data project
  portfolio: Portfolio;

  // Fungsi ketika card diklik
  onClick: () => void;
};


// ======================================================
// COMPONENT
// ======================================================

export function PortfolioCard({
  portfolio,
  onClick,
}: PortfolioCardProps) {

  return (

    <article
      className="portfolio-card"
      onClick={onClick}
    >

      {/* =================================================
          IMAGE
          ================================================= */}

      <div className="portfolio-image">

        <img
          src={portfolio.image}
          alt={portfolio.title}
        />


        {/* Overlay ketika hover */}

        <div className="portfolio-overlay">

          <div className="portfolio-view">

            Lihat Project

            <ArrowUpRight size={18} />

          </div>

        </div>

      </div>


      {/* =================================================
          CONTENT
          ================================================= */}

      <div className="portfolio-content">

        {/* Category */}

        <span className="portfolio-category">
          {portfolio.category}
        </span>


        {/* Title */}

        <h3>
          {portfolio.title}
        </h3>


        {/* Location */}

        <div className="portfolio-location">

          <MapPin size={14} />

          {portfolio.location}

        </div>

      </div>

    </article>

  );
}
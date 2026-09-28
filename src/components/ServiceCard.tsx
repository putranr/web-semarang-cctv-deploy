// ======================================================
// SERVICE CARD
// ======================================================

import {
  ArrowUpRight,
} from "lucide-react";

import type {
  Service,
} from "../data/services";


// ======================================================
// PROPS
// ======================================================

type ServiceCardProps = {

  service: Service;

  // Fungsi yang dijalankan ketika card diklik
  onClick: () => void;

};


// ======================================================
// COMPONENT
// ======================================================

export function ServiceCard({

  service,

  onClick,

}: ServiceCardProps) {

  // Mengambil icon dari data
  const Icon = service.icon;


  return (

    <article
      className="service-card"

      // Card sekarang bisa diklik
      onClick={onClick}

      // Memberi tahu browser bahwa element
      // dapat menerima interaksi keyboard
      tabIndex={0}

      // Ketika user menekan Enter
      onKeyDown={(event) => {

        if (event.key === "Enter") {

          onClick();

        }

      }}

      role="button"
    >


      {/* =================================================
          ICON
          ================================================= */}

      <div className="service-icon">

        <Icon
          size={28}
          strokeWidth={1.5}
        />

      </div>


      {/* =================================================
          CONTENT
          ================================================= */}

      <div className="service-content">

        <h3>
          {service.title}
        </h3>

        <p>
          {service.description}
        </p>

      </div>


      {/* =================================================
          CTA
          ================================================= */}

      <div className="service-link">

        <span>
          Pelajari
        </span>

        <ArrowUpRight
          size={17}
        />

      </div>


    </article>

  );

}
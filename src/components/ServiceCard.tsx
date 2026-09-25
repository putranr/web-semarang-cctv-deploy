// ======================================================
// SERVICE CARD
// ======================================================
// Component ini bertugas menampilkan SATU layanan.
//
// Contoh:
//
// Installation CCTV
// Maintenance CCTV
// Troubleshooting
//
// Nanti services.ts akan memberikan data
// kepada component ini.
// ======================================================

import { ArrowUpRight } from "lucide-react";
import type { Service } from "../data/services";


// ======================================================
// PROPS
// ======================================================

type ServiceCardProps = {
  service: Service;
};


// ======================================================
// COMPONENT
// ======================================================

export function ServiceCard({
  service,
}: ServiceCardProps) {

  // Mengambil icon dari data service
  const Icon = service.icon;

  return (

    <article className="service-card">

      {/* ================================================
          ICON
          ================================================ */}

      <div className="service-icon">
        <Icon
          size={28}
          strokeWidth={1.5}
        />
      </div>


      {/* ================================================
          CONTENT
          ================================================ */}

      <div className="service-content">

        <h3>
          {service.title}
        </h3>

        <p>
          {service.description}
        </p>

      </div>


      {/* ================================================
          LINK
          ================================================ */}

      <div className="service-link">

        Pelajari

        <ArrowUpRight size={17} />

      </div>

    </article>

  );
}
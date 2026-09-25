// ======================================================
// BUSINESS PARTNERS
// ======================================================
//
// Component ini digunakan untuk menampilkan
// daftar mitra bisnis perusahaan.
// ======================================================

import { businessPartners } from "../data/businessPartners";


// ======================================================
// COMPONENT
// ======================================================

export function BusinessPartners() {

  return (

    <section
      id="business-partners"
      className="business-partners-section"
    >

      {/* =================================================
          CONTAINER
          ================================================= */}

      <div className="business-partners-container">


        {/* =================================================
            HEADER
            ================================================= */}

        <div className="business-partners-header">

          <span className="section-label">
            BUSINESS PARTNERS
          </span>


          <h2>
            Mitra Bisnis
          </h2>


          <p>
            Kami membangun kerja sama dengan berbagai
            perusahaan dan mitra untuk menghadirkan
            solusi keamanan yang sesuai dengan kebutuhan.
          </p>

        </div>


        {/* =================================================
            PARTNER GRID
            ================================================= */}

        <div className="business-partner-grid">

          {businessPartners.map((partner) => (

            <div
              className="business-partner-item"
              key={partner.name}
            >

              {/* LOGO */}

              <div className="business-partner-logo">

                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  loading="lazy"
                />

              </div>


              {/* NAMA MITRA */}

              <span>
                {partner.name}
              </span>

            </div>

          ))}

        </div>


      </div>

    </section>

  );

}
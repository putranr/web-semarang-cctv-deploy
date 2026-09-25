// ======================================================
// BRAND PARTNER COMPONENT
// ======================================================
//
// Component ini menampilkan kumpulan logo partner.
//
// Desain dibuat:
// - Minimal
// - Bersih
// - Responsive
// - Logo grayscale
// - Warna muncul ketika hover
// ======================================================


import { partners } from "../data/partners";


// ======================================================
// COMPONENT
// ======================================================

export function BrandPartner() {

  return (

    <section
      id="partners"
      className="brand-partner-section"
    >


      {/* ==================================================
          CONTAINER
          ================================================== */}

      <div className="brand-partner-container">


        {/* ==================================================
            SECTION HEADER
            ================================================== */}

        <div className="brand-partner-header">


          <span className="section-label">

            BRAND PARTNER

          </span>


          <h2>

            Brand Partner

          </h2>


          <p>

            Kami bekerja dengan berbagai brand
            terpercaya untuk menghadirkan solusi
            keamanan yang optimal.

          </p>


        </div>


        {/* ==================================================
            LOGO GRID
            ================================================== */}

        <div className="partner-grid">

          {partners.map((partner) => (

            <div
              className="partner-logo"
              key={partner.name}
            >

              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
              />

            </div>

          ))}

        </div>


      </div>

    </section>

  );

}
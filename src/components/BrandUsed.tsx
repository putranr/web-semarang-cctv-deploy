// ======================================================
// BRAND USED
// ======================================================
//
// Section ini menampilkan brand yang digunakan perusahaan.
//
// Tampilan:
// - Horizontal card
// - Bisa digeser
// - See All
// - Klik card untuk melihat detail
// ======================================================

import { ArrowUpRight } from "lucide-react";

import { brands } from "../data/brands";


// ======================================================
// PROPS
// ======================================================

type BrandUsedProps = {

  // Fungsi ketika user mengklik brand
  onSelectBrand: (
    brand: (typeof brands)[number]
  ) => void;

};


// ======================================================
// COMPONENT
// ======================================================

export function BrandUsed({
  onSelectBrand,
}: BrandUsedProps) {

  return (

    <section
      id="brands-used"
      className="brand-used-section"
    >

      <div className="brand-used-container">


        {/* ==================================================
            HEADER
            ================================================== */}

        <div className="brand-used-header">

          <div>

            <span className="section-label">
              BRANDS WE USE
            </span>


            <h2>
              Brand yang Kami Gunakan
            </h2>


            <p className="section-description">

              Berbagai brand dan perangkat yang
              digunakan untuk mendukung kebutuhan
              sistem keamanan CCTV.

            </p>

          </div>

        </div>


        {/* ==================================================
            BRAND HORIZONTAL LIST
            ================================================== */}

        <div className="brand-used-horizontal">


          {brands.map((brand) => (

            <article
              className="brand-used-card"
              key={brand.name}
              onClick={() => onSelectBrand(brand)}
            >


              {/* =================================================
                  LOGO
                  ================================================= */}

              <div className="brand-used-logo">

                <img
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  loading="lazy"
                />

              </div>


              {/* =================================================
                  CONTENT
                  ================================================= */}

              <div className="brand-used-content">


                <span className="brand-used-category">

                  {brand.category}

                </span>


                <h3>

                  {brand.name}

                </h3>


                <p>

                  {brand.shortDescription}

                </p>


                {/* CTA */}

                <div className="brand-used-link">

                  Pelajari

                  <ArrowUpRight size={16} />

                </div>


              </div>


            </article>

          ))}


        </div>


      </div>

    </section>

  );

}
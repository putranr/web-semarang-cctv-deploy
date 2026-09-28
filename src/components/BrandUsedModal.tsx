// ======================================================
// BRAND USED MODAL
// ======================================================
//
// Modal untuk menampilkan informasi lengkap tentang
// brand yang digunakan perusahaan.
// ======================================================

import {
  X,
  CheckCircle2,
} from "lucide-react";

import type { Brand } from "../data/brands";


// ======================================================
// PROPS
// ======================================================

type BrandUsedModalProps = {

  // Brand yang sedang dipilih
  brand: Brand | null;

  // Fungsi menutup modal
  onClose: () => void;

};


// ======================================================
// COMPONENT
// ======================================================

export function BrandUsedModal({
  brand,
  onClose,
}: BrandUsedModalProps) {


  // ====================================================
  // JIKA BELUM ADA BRAND
  // ====================================================

  if (!brand) {

    return null;

  }


  return (

    <div
      className="brand-used-modal-backdrop"
      onClick={onClose}
    >


      {/* =================================================
          MODAL
          ================================================= */}

      <article
        className="brand-used-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >


        {/* =================================================
            CLOSE
            ================================================= */}

        <button
          className="brand-used-modal-close"
          onClick={onClose}
          aria-label="Tutup detail brand"
        >

          <X size={20} />

        </button>


        {/* =================================================
            LOGO
            ================================================= */}

        <div className="brand-used-modal-logo">

          <img
            src={brand.logo}
            alt={`Logo ${brand.name}`}
          />

        </div>


        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="brand-used-modal-content">


          {/* Category */}

          <span className="brand-used-category">

            {brand.category}

          </span>


          {/* Name */}

          <h2>

            {brand.name}

          </h2>


          {/* Description */}

          <p>

            {brand.description}

          </p>


          {/* =================================================
              FEATURES
              ================================================= */}

          <div className="brand-used-features">


            <h3>
              Penggunaan
            </h3>


            {brand.features.map(
              (feature) => (

                <div
                  className="brand-feature"
                  key={feature}
                >

                  <CheckCircle2 size={17} />

                  <span>
                    {feature}
                  </span>

                </div>

              )
            )}

          </div>


        </div>

      </article>

    </div>

  );

}
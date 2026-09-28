// ======================================================
// SERVICE MODAL
// ======================================================
//
// Menampilkan detail lengkap sebuah layanan.
// ======================================================

import {
  X,
  CheckCircle2,
} from "lucide-react";

import type {
  Service,
} from "../data/services";


// ======================================================
// PROPS
// ======================================================

type ServiceModalProps = {

  // Service yang dipilih
  service: Service | null;

  // Fungsi menutup modal
  onClose: () => void;

};


// ======================================================
// COMPONENT
// ======================================================

export function ServiceModal({

  service,

  onClose,

}: ServiceModalProps) {


  // ====================================================
  // JIKA BELUM ADA SERVICE
  // ====================================================

  if (!service) {

    return null;

  }


  return (

    <div
      className="service-modal-backdrop"

      onClick={onClose}
    >


      {/* =================================================
          MODAL
          ================================================= */}

      <article
        className="service-modal"

        onClick={(event) =>
          event.stopPropagation()
        }
      >


        {/* =================================================
            CLOSE BUTTON
            ================================================= */}

        <button
          className="service-modal-close"

          onClick={onClose}

          aria-label="Tutup detail layanan"
        >

          <X size={20} />

        </button>


        {/* =================================================
            ICON
            ================================================= */}

        <div className="service-modal-icon">

          {(() => {

            const Icon = service.icon;

            return (
              <Icon
                size={35}
                strokeWidth={1.5}
              />
            );

          })()}

        </div>


        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="service-modal-content">


          <span className="service-modal-label">

            OUR SERVICE

          </span>


          <h2>
            {service.title}
          </h2>


          <p>
            {service.detail}
          </p>


          {/* =================================================
              FEATURES
              ================================================= */}

          <div className="service-feature-list">

            <h3>
              Yang Kami Kerjakan
            </h3>


            {service.features.map(
              (feature) => (

                <div
                  className="service-feature"
                  key={feature}
                >

                  <CheckCircle2
                    size={17}
                  />

                  <span>
                    {feature}
                  </span>

                </div>

              )
            )}

          </div>


          {/* =================================================
              CTA
              ================================================= */}

          <a
            href="#contact"

            className="service-modal-button"

            onClick={onClose}
          >

            Konsultasi Sekarang

          </a>


        </div>

      </article>

    </div>

  );

}
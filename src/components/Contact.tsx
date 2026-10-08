// ======================================================
// CONTACT SECTION
// ======================================================
//
// Section ini berisi:
// 1. WhatsApp
// 2. Telepon
// 3. Email
// 4. Alamat
// 5. Facebook
// 6. Instagram
// 7. Google Maps
//
// Tidak ada form kirim pesan.
// ======================================================

import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

// Data kontak
import { contactInfo } from "../data/contact";


// ======================================================
// FACEBOOK ICON
// ======================================================

function FacebookIcon({
  size = 21,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.3v3h2.8v8h3.4Z"
      />
    </svg>
  );
}


// ======================================================
// INSTAGRAM ICON
// ======================================================

function InstagramIcon({
  size = 21,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Kotak utama */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      {/* Lingkaran kamera */}
      <circle
        cx="12"
        cy="12"
        r="4"
      />

      {/* Titik kecil kanan atas */}
      <circle
        cx="17.5"
        cy="6.5"
        r="0.8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}


// ======================================================
// COMPONENT
// ======================================================

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="contact-container">

        {/* ==================================================
            HEADER
            ================================================== */}

        <div className="contact-header">

          <span className="section-label">
            CONTACT US
          </span>

          <h2>
            Hubungi Kami
          </h2>

          <p>
            Punya kebutuhan installation atau
            maintenance CCTV? Hubungi kami untuk
            mendapatkan informasi lebih lanjut.
          </p>

        </div>


        {/* ==================================================
            CONTACT CONTENT
            ================================================== */}

        <div className="contact-grid">

          {/* =================================================
              INFORMASI KONTAK
              ================================================= */}

          <div className="contact-information">


            {/* =================================================
                WHATSAPP
                ================================================= */}

            <div className="contact-item">

              <div className="contact-icon">
                <MessageCircle size={21} />
              </div>

              <div className="contact-item-content">

                <span>
                  WhatsApp
                </span>

                <strong>
                  {contactInfo.whatsappDisplay}
                </strong>

              </div>

              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action"
                aria-label="Hubungi WhatsApp"
              >
                <ExternalLink size={16} />
              </a>

            </div>


            {/* =================================================
                TELEPON
                ================================================= */}

            <div className="contact-item">

              <div className="contact-icon">
                <Phone size={21} />
              </div>

              <div className="contact-item-content">

                <span>
                  Telepon
                </span>

                <strong>
                  {contactInfo.phoneDisplay}
                </strong>

              </div>

              <a
                href={`tel:${contactInfo.phone}`}
                className="contact-action"
                aria-label="Telepon"
              >
                <Phone size={16} />
              </a>

            </div>


            {/* =================================================
                EMAIL
                ================================================= */}

            <div className="contact-item">

              <div className="contact-icon">
                <Mail size={21} />
              </div>

              <div className="contact-item-content">

                <span>
                  Email
                </span>

                <strong>
                  {contactInfo.email}
                </strong>

              </div>

              <a
                href={`mailto:${contactInfo.email}`}
                className="contact-action"
                aria-label="Kirim email"
              >
                <Mail size={16} />
              </a>

            </div>


            {/* =================================================
                ALAMAT
                ================================================= */}

            <div className="contact-item contact-address">

              <div className="contact-icon">
                <MapPin size={21} />
              </div>

              <div className="contact-item-content">

                <span>
                  Alamat
                </span>

                <strong>
                  {contactInfo.address}
                </strong>

              </div>

            </div>


            {/* =================================================
                FACEBOOK
                ================================================= */}

            <div className="contact-item">

              <div className="contact-icon">
                <FacebookIcon size={21} />
              </div>

              <div className="contact-item-content">

                <span>
                  Facebook
                </span>

                <strong>
                  {contactInfo.facebookDisplay}
                </strong>

              </div>

              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action"
                aria-label="Buka Facebook"
              >
                <ExternalLink size={16} />
              </a>

            </div>


            {/* =================================================
                INSTAGRAM
                ================================================= */}

            <div className="contact-item">

              <div className="contact-icon">
                <InstagramIcon size={21} />
              </div>

              <div className="contact-item-content">

                <span>
                  Instagram
                </span>

                <strong>
                  {contactInfo.instagramDisplay}
                </strong>

              </div>

              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action"
                aria-label="Buka Instagram"
              >
                <ExternalLink size={16} />
              </a>

            </div>


            {/* =================================================
                CTA WHATSAPP
                ================================================= */}

            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp-button"
            >

              <MessageCircle size={19} />

              Hubungi via WhatsApp

              <ExternalLink size={17} />

            </a>

          </div>


          {/* =================================================
              GOOGLE MAPS
              ================================================= */}

          <div className="contact-map">

            {/* =================================================
                MAP HEADER
                ================================================= */}

            <div className="contact-map-header">

              <div>

                <span>
                  OUR LOCATION
                </span>

                <h3>
                  Lokasi Kami
                </h3>

              </div>

              <a
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                Buka Maps

                <ExternalLink size={15} />
              </a>

            </div>


            {/* =================================================
                MAP
                ================================================= */}

            <div className="map-wrapper">

              <iframe
                src={contactInfo.mapEmbedUrl}
                title="Lokasi perusahaan"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
// ======================================================
// CONTACT SECTION
// ======================================================
//
// Section ini berisi:
// 1. Informasi kontak
// 2. Tombol WhatsApp
// 3. Telepon
// 4. Email
// 5. Alamat
// 6. Google Maps
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
// COMPONENT
// ======================================================

export function Contact() {

  return (

    <section
      id="contact"
      className="contact-section"
    >

      {/* ==================================================
          CONTAINER
          ================================================== */}

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


              {/* Tombol WhatsApp */}

              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action"
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
                CTA WHATSAPP BESAR
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


              {/* Buka Google Maps */}

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
                GOOGLE MAP IFRAME
                ================================================= */}

            <div className="map-wrapper">

              <iframe
                src={contactInfo.mapEmbedUrl}
                title="Lokasi perusahaan"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>


          </div>

        </div>

      </div>

    </section>

  );

}
import {
  useEffect,
  useState,
} from 'react';

import {
  ImageOff,
} from 'lucide-react';

import {
  getBusinessPartnerImageUrl,
  getPublicBusinessPartners,
  type PublicBusinessPartner,
} from '../lib/publicBusinessPartnersApi';

export function BusinessPartners() {
  // =====================================================
  // DATA MITRA BISNIS
  // =====================================================

  const [
    partners,
    setPartners,
  ] = useState<
    PublicBusinessPartner[]
  >([]);

  // =====================================================
  // LOADING
  // =====================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =====================================================
  // ERROR
  // =====================================================

  const [
    error,
    setError,
  ] = useState('');

  // =====================================================
  // LOAD DATA DARI BACKEND
  // =====================================================

  useEffect(() => {
    const loadPartners =
      async () => {
        try {
          setLoading(true);
          setError('');

          // Ambil semua mitra bisnis
          // yang sudah dipublish dari backend.
          const data =
            await getPublicBusinessPartners();

          setPartners(data);
        } catch (error) {
          console.error(error);

          setError(
            'Mitra bisnis belum dapat dimuat.',
          );
        } finally {
          setLoading(false);
        }
      };

    loadPartners();
  }, []);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      id="business-partners"
      className="business-partners-section"
    >
      <div className="business-partners-container">

        {/* =================================================
            HEADER
           ================================================= */}

        <div className="business-partners-heading">

          <span className="section-label">
            BUSINESS NETWORK
          </span>

          <h2>
            Mitra Bisnis
          </h2>

          <p className="section-description">
            Mitra bisnis yang bekerja sama
            dengan kami dalam mendukung
            kebutuhan dan pengerjaan proyek.
          </p>

        </div>

        {/* =================================================
            LOADING
           ================================================= */}

        {loading && (
          <div className="business-partners-state">
            Memuat mitra bisnis...
          </div>
        )}

        {/* =================================================
            ERROR
           ================================================= */}

        {!loading &&
          error && (
            <div className="business-partners-state">
              {error}
            </div>
          )}

        {/* =================================================
            EMPTY
           ================================================= */}

        {!loading &&
          !error &&
          partners.length === 0 && (
            <div className="business-partners-state">
              Belum ada mitra bisnis yang
              dipublikasikan.
            </div>
          )}

        {/* =================================================
            SEMUA LOGO MITRA BISNIS
           ================================================= */}

        {!loading &&
          !error &&
          partners.length > 0 && (
            <div className="business-partners-grid">

              {partners.map(
                (partner) => {
                  const imageUrl =
                    getBusinessPartnerImageUrl(
                      partner.image,
                    );

                  return (
                    <article
                      key={partner.id}
                      className="business-partner-card"
                    >

                      {/* ===================================
                          LOGO / GAMBAR MITRA
                         =================================== */}

                      <div className="business-partner-image">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Mitra bisnis"
                          />
                        ) : (
                          <ImageOff
                            size={32}
                          />
                        )}

                      </div>

                    </article>
                  );
                },
              )}

            </div>
          )}

      </div>
    </section>
  );
}
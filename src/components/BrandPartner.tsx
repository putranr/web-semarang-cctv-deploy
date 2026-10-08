import {
  useEffect,
  useState,
} from 'react';

import {
  ExternalLink,
  ImageOff,
} from 'lucide-react';

import {
  getBrandLogoUrl,
  getPublicBrands,
  type PublicBrand,
} from '../lib/publicBrandsApi';

export function BrandPartner() {
  // ====================================================
  // STATE DATA
  // ====================================================

  const [brands, setBrands] =
    useState<PublicBrand[]>([]);

  // ====================================================
  // LOADING
  // ====================================================

  const [loading, setLoading] =
    useState(true);

  // ====================================================
  // ERROR
  // ====================================================

  const [error, setError] =
    useState('');

  // ====================================================
  // LOAD DATA
  // ====================================================

  useEffect(() => {
    const loadBrands =
      async () => {
        try {
          setLoading(true);
          setError('');

          const data =
            await getPublicBrands();

          setBrands(data);
        } catch (error) {
          console.error(
            error,
          );

          setError(
            'Brand Partner belum dapat dimuat.',
          );
        } finally {
          setLoading(false);
        }
      };

    loadBrands();
  }, []);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      id="brand-partner"
      className="brand-partner-section"
    >
      <div className="section-container">

        {/* ============================================
            HEADER
           ============================================ */}

        <div className="section-header">

          <span className="section-label">
            OUR PARTNERS
          </span>

          <h2 className="brand-partner-title">
            Brand Partner
          </h2>

          <p className="section-description">
            Kami bekerja sama dengan berbagai
            brand terpercaya untuk menyediakan
            perangkat keamanan dan sistem CCTV
            berkualitas.
          </p>

        </div>

        {/* ============================================
            LOADING
           ============================================ */}

        {loading && (
          <div className="brand-partner-state">
            Memuat brand partner...
          </div>
        )}

        {/* ============================================
            ERROR
           ============================================ */}

        {!loading && error && (
          <div className="brand-partner-state">
            {error}
          </div>
        )}

        {/* ============================================
            EMPTY
           ============================================ */}

        {!loading &&
          !error &&
          brands.length === 0 && (
            <div className="brand-partner-state">
              Belum ada brand partner yang
              dipublikasikan.
            </div>
          )}

        {/* ============================================
            BRAND LIST
           ============================================ */}

        {!loading &&
          !error &&
          brands.length > 0 && (
            <div className="brand-partner-grid">

              {brands.map(
                (brand) => {
                  const logoUrl =
                    getBrandLogoUrl(
                      brand.logo,
                    );

                  return (
                    <a
                      key={brand.id}
                      href={
                        brand.website ??
                        undefined
                      }
                      target={
                        brand.website
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        brand.website
                          ? 'noreferrer'
                          : undefined
                      }
                      className={
                        brand.website
                          ? 'brand-partner-card brand-partner-card-link'
                          : 'brand-partner-card'
                      }
                    >

                      {/* --------------------------------
                          LOGO
                         -------------------------------- */}

                      <div className="brand-partner-logo">

                        {logoUrl ? (
                          <img
                            src={
                              logoUrl
                            }
                            alt={
                              brand.name
                            }
                          />
                        ) : (
                          <ImageOff
                            size={28}
                          />
                        )}

                      </div>

                      {/* --------------------------------
                          NAME
                         -------------------------------- */}

                      <h3>
                        {brand.name}
                      </h3>

                      {/* --------------------------------
                          DESCRIPTION
                         -------------------------------- */}

                      {brand.description && (
                        <p>
                          {
                            brand.description
                          }
                        </p>
                      )}

                      {/* --------------------------------
                          WEBSITE
                         -------------------------------- */}

                      {brand.website && (
                        <span className="brand-partner-website">
                          <ExternalLink
                            size={14}
                          />

                          Kunjungi Website
                        </span>
                      )}

                    </a>
                  );
                },
              )}

            </div>
          )}

      </div>
    </section>
  );
}
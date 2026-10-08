import {
  useEffect,
  useState,
} from 'react';

import {
  PortfolioCard,
} from './PortfolioCard';

import {
  PortfolioModal,
} from './PortfolioModal';

import type {
  Portfolio,
} from '../data/portfolio';

import {
  fetchPublicPortfolio,
  getPortfolioImageUrl,
} from '../lib/publicPortfolioApi';

const categories = [
  'Semua',
  'Rumah',
  'Kantor',
  'Gudang',
  'Toko',
];

function mapPortfolio(
  item: {
    title: string;
    category: string;
    location: string;
    cameras: number;
    year: number;
    image: string | null;
    description: string;
  },
): Portfolio {
  return {
    title: item.title,
    category: item.category,
    location: item.location,
    cameras: item.cameras,
    year: item.year,

    image:
      getPortfolioImageUrl(
        item.image,
      ) ??
      '/images/logo.png',

    description:
      item.description,
  };
}

export function PublicPortfolioSection() {
  const [
    portfolios,
    setPortfolios,
  ] = useState<
    Awaited<
      ReturnType<
        typeof fetchPublicPortfolio
      >
    >
  >([]);

  const [
    category,
    setCategory,
  ] = useState('Semua');

  const [
    showAll,
    setShowAll,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  const [
    selected,
    setSelected,
  ] =
    useState<Portfolio | null>(
      null,
    );

  useEffect(() => {
    const load =
      async () => {
        try {
          setLoading(true);
          setError('');

          const data =
            await fetchPublicPortfolio(
              category,
              showAll
                ? 12
                : 3,
            );

          setPortfolios(data);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : 'Gagal mengambil portfolio',
          );
        } finally {
          setLoading(false);
        }
      };

    load();
  }, [
    category,
    showAll,
  ]);

  return (
    <>
      <section
        id="portfolio"
        className="public-portfolio-section"
      >
        <div className="public-portfolio-container">
          {/* ============================
              HEADER
             ============================ */}
          <div className="public-portfolio-heading">
            <div>
              <span>
                OUR PROJECT
              </span>

              <h2>
                Portofolio Pekerjaan
              </h2>

              <p>
                Beberapa project
                installation dan
                maintenance CCTV yang
                telah kami kerjakan.
              </p>
            </div>

            {!showAll && (
              <button
                type="button"
                className="public-portfolio-see-all"
                onClick={() =>
                  setShowAll(
                    true,
                  )
                }
              >
                See All →
              </button>
            )}
          </div>

          {/* ============================
              FILTER
             ============================ */}
          {showAll && (
            <div className="public-portfolio-filters">
              {categories.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      category ===
                      item
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      setCategory(
                        item,
                      )
                    }
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                className="close"
                onClick={() => {
                  setShowAll(
                    false,
                  );

                  setCategory(
                    'Semua',
                  );
                }}
              >
                Kembali
              </button>
            </div>
          )}

          {/* ============================
              ERROR
             ============================ */}
          {error && (
            <div className="public-articles-error">
              {error}
            </div>
          )}

          {/* ============================
              CONTENT
             ============================ */}
          {loading ? (
            <div className="public-articles-status">
              Memuat portfolio...
            </div>
          ) : portfolios.length ===
            0 ? (
            <div className="public-articles-status">
              Belum ada portfolio.
            </div>
          ) : (
            <div
              className={
                showAll
                  ? 'portfolio-public-grid'
                  : 'portfolio-public-row'
              }
            >
              {portfolios.map(
                (item) => {
                  const portfolio =
                    mapPortfolio(
                      item,
                    );

                  return (
                    <PortfolioCard
                      key={
                        item.id
                      }
                      portfolio={
                        portfolio
                      }
                      onClick={() =>
                        setSelected(
                          portfolio,
                        )
                      }
                    />
                  );
                },
              )}
            </div>
          )}
        </div>
      </section>

      <PortfolioModal
        portfolio={
          selected
        }
        onClose={() =>
          setSelected(null)
        }
      />
    </>
  );
}
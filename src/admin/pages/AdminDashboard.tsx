import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  Handshake,
  Package,
  RefreshCw,
  Wrench,
} from 'lucide-react';

import {
  getDashboardSummary,
  type DashboardSummary,
} from '../../lib/adminDashboardApi';

import {
  Link,
} from 'react-router';

// ======================================================
// TYPE CARD
// ======================================================

type DashboardCard = {
  title: string;

  total: number;

  published: number;

  icon: typeof FileText;

  path: string;

  description: string;
};

// ======================================================
// COMPONENT
// ======================================================

export default function AdminDashboard() {
  // ====================================================
  // DATA
  // ====================================================

  const [
    dashboard,
    setDashboard,
  ] = useState<
    DashboardSummary | null
  >(null);

  // ====================================================
  // LOADING
  // ====================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ====================================================
  // ERROR
  // ====================================================

  const [
    error,
    setError,
  ] = useState('');

  // ====================================================
  // LOAD
  // ====================================================

  const loadDashboard =
    async () => {
      try {
        setLoading(true);

        setError('');

        const data =
          await getDashboardSummary();

        setDashboard(data);
      } catch (error) {
        console.error(
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : 'Gagal memuat dashboard.',
        );
      } finally {
        setLoading(false);
      }
    };

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    loadDashboard();
  }, []);

  // ====================================================
  // LOADING VIEW
  // ====================================================

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-page-heading">

          <div>

            <span>
              ADMINISTRATOR
            </span>

            <h1>
              Dashboard
            </h1>

            <p>
              Memuat ringkasan data website...
            </p>

          </div>

        </div>

        <div className="admin-dashboard-loading">

          <RefreshCw
            size={20}
            className="admin-loading-icon"
          />

          <span>
            Memuat dashboard...
          </span>

        </div>

      </div>
    );
  }

  // ====================================================
  // ERROR VIEW
  // ====================================================

  if (error || !dashboard) {
    return (
      <div className="admin-page">

        <div className="admin-page-heading">

          <div>

            <span>
              ADMINISTRATOR
            </span>

            <h1>
              Dashboard
            </h1>

            <p>
              Ringkasan pengelolaan konten
              website.
            </p>

          </div>

        </div>

        <div className="admin-error">

          <strong>
            Gagal memuat dashboard
          </strong>

          <span>
            {error ||
              'Data dashboard tidak tersedia.'}
          </span>

          <button
            type="button"
            className="admin-secondary-button"
            onClick={
              loadDashboard
            }
          >
            <RefreshCw
              size={15}
            />

            Coba Lagi
          </button>

        </div>

      </div>
    );
  }

  // ====================================================
  // CARDS
  // ====================================================

  const cards: DashboardCard[] = [
    {
      title: 'Artikel',
      total:
        dashboard.articles.total,
      published:
        dashboard.articles.published,
      icon: FileText,
      path: '/admin/articles',
      description:
        'Konten artikel dan insight',
    },

    {
      title: 'Portfolio',
      total:
        dashboard.portfolios.total,
      published:
        dashboard.portfolios.published,
      icon: BriefcaseBusiness,
      path: '/admin/portfolio',
      description:
        'Project pekerjaan perusahaan',
    },

    {
      title: 'Jasa & Layanan',
      total:
        dashboard.services.total,
      published:
        dashboard.services.published,
      icon: Wrench,
      path: '/admin/services',
      description:
        'Layanan yang tersedia',
    },

    {
      title: 'Brand Partner',
      total:
        dashboard.brandPartners.total,
      published:
        dashboard.brandPartners.published,
      icon: Handshake,
      path: '/admin/brands',
      description:
        'Logo brand partner',
    },

    {
      title: 'Produk Digunakan',
      total:
        dashboard.usedProducts.total,
      published:
        dashboard.usedProducts.published,
      icon: Package,
      path: '/admin/brands-used',
      description:
        'Katalog produk yang digunakan',
    },

    {
      title: 'Mitra Bisnis',
      total:
        dashboard.businessPartners.total,
      published:
        dashboard.businessPartners.published,
      icon: Building2,
      path: '/admin/business-partners',
      description:
        'Logo mitra bisnis',
    },
  ];

  return (
    <div className="admin-page">

      {/* =================================================
          HEADER
         ================================================= */}

      <div className="admin-page-heading">

        <div>

          <span>
            ADMINISTRATOR
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Ringkasan konten dan data yang
            dikelola melalui Admin Panel.
          </p>

        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={
            loadDashboard
          }
        >
          <RefreshCw
            size={15}
          />

          Refresh Data
        </button>

      </div>

      {/* =================================================
          STATISTICS
         ================================================= */}

      <section className="admin-dashboard-grid">

        {cards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <article
                key={
                  card.title
                }
                className="admin-dashboard-card"
              >

                {/* -----------------------------------------
                    TOP
                   ----------------------------------------- */}

                <div className="admin-dashboard-card-top">

                  <div className="admin-dashboard-icon">
                    <Icon
                      size={20}
                    />
                  </div>

                  <span>
                    {card.published}{' '}
                    Published
                  </span>

                </div>

                {/* -----------------------------------------
                    VALUE
                   ----------------------------------------- */}

                <div className="admin-dashboard-card-value">

                  <strong>
                    {card.total}
                  </strong>

                  <span>
                    item
                  </span>

                </div>

                {/* -----------------------------------------
                    INFO
                   ----------------------------------------- */}

                <h2>
                  {card.title}
                </h2>

                <p>
                  {card.description}
                </p>

                {/* -----------------------------------------
                    LINK
                   ----------------------------------------- */}

                <Link
                  to={card.path}
                  className="admin-dashboard-link"
                >
                  Kelola Data

                  <ArrowRight
                    size={15}
                  />
                </Link>

              </article>
            );
          },
        )}

      </section>

      {/* =================================================
          QUICK SUMMARY
         ================================================= */}

      <section className="admin-dashboard-summary">

        <div className="admin-list-card">

          <div className="admin-list-heading">

            <div>

              <span>
                CONTENT OVERVIEW
              </span>

              <h2>
                Ringkasan Website
              </h2>

            </div>

          </div>

          <div className="admin-dashboard-overview">

            <div>
              <span>
                Total Konten
              </span>

              <strong>
                {
                  dashboard.articles.total +
                  dashboard.portfolios.total +
                  dashboard.services.total +
                  dashboard.brandPartners.total +
                  dashboard.usedProducts.total +
                  dashboard.businessPartners.total
                }
              </strong>
            </div>

            <div>
              <span>
                Konten Published
              </span>

              <strong>
                {
                  dashboard.articles.published +
                  dashboard.portfolios.published +
                  dashboard.services.published +
                  dashboard.brandPartners.published +
                  dashboard.usedProducts.published +
                  dashboard.businessPartners.published
                }
              </strong>
            </div>

            <div>
              <span>
                Status
              </span>

              <strong className="admin-dashboard-status">
                Sistem Aktif
              </strong>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
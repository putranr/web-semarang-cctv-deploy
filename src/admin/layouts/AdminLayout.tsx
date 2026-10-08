import { useEffect, useState } from 'react';

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router';

import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  Wrench,
  Handshake,
  Building2,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

import {
  clearAuth,
  getUser,
} from '../auth';

import '../admin.css';

/**
 * =========================================================
 * ADMIN LAYOUT
 * =========================================================
 *
 * Layout utama untuk seluruh halaman admin.
 *
 * Desktop:
 * - Sidebar selalu terlihat
 *
 * Mobile:
 * - Sidebar disembunyikan
 * - Dibuka menggunakan hamburger
 * - Ada overlay ketika sidebar terbuka
 * - Sidebar otomatis tertutup ketika pindah halaman
 */
export default function AdminLayout() {
  /**
   * Menentukan apakah sidebar mobile sedang terbuka.
   *
   * false = tertutup
   * true  = terbuka
   */
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  /**
   * React Router navigation.
   */
  const navigate = useNavigate();

  /**
   * Mengambil URL/path yang sedang aktif.
   *
   * Dipakai agar sidebar mobile bisa
   * otomatis ditutup ketika route berubah.
   */
  const location = useLocation();

  /**
   * Data admin yang sedang login.
   */
  const user = getUser();

  /**
   * =========================================================
   * AUTO CLOSE SIDEBAR
   * =========================================================
   *
   * Kalau pindah halaman:
   *
   * /admin
   *      ↓
   * /admin/articles
   *
   * sidebar mobile langsung ditutup.
   */
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  /**
   * =========================================================
   * CLOSE SIDEBAR
   * =========================================================
   */
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  /**
   * =========================================================
   * TOGGLE SIDEBAR
   * =========================================================
   */
  const toggleSidebar = () => {
    setSidebarOpen(
      (current) => !current,
    );
  };

  /**
   * =========================================================
   * LOGOUT
   * =========================================================
   */
  const handleLogout = () => {
    /**
     * Hapus JWT dan data admin
     * dari localStorage.
     */
    clearAuth();

    /**
     * Tutup sidebar kalau sedang terbuka.
     */
    setSidebarOpen(false);

    /**
     * Kembali ke halaman login.
     */
    navigate(
      '/admin/login',
      {
        replace: true,
      },
    );
  };

  return (
    <div className="admin-layout">
      {/* =====================================================
          SIDEBAR
         ===================================================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? 'open'
            : ''
        }`}
      >
        {/* ===================================================
            SIDEBAR BRAND
           =================================================== */}

        <div className="admin-sidebar-brand">
          <img
            src="/images/logo.png"
            alt="Logo perusahaan"
          />

          <div>
            <strong>
              Admin Panel
            </strong>

            <span>
              CCTV Semarang
            </span>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
           =================================================== */}

        <nav className="admin-navigation">
          {/* ===============================
              DASHBOARD
             =============================== */}

          <NavLink
            to="/admin"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <LayoutDashboard
              size={19}
            />

            <span>
              Dashboard
            </span>
          </NavLink>

          {/* ===============================
              CONTENT LABEL
             =============================== */}

          <div className="admin-nav-label">
            CONTENT
          </div>

          {/* ===============================
              ARTIKEL
             =============================== */}

          <NavLink
            to="/admin/articles"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <FileText
              size={19}
            />

            <span>
              Artikel
            </span>
          </NavLink>

          {/* ===============================
              PORTFOLIO
             =============================== */}

          <NavLink
            to="/admin/portfolio"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <BriefcaseBusiness
              size={19}
            />

            <span>
              Portfolio
            </span>
          </NavLink>

          {/* ===============================
              JASA & LAYANAN
             =============================== */}

          <NavLink
            to="/admin/services"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <Wrench
              size={19}
            />

            <span>
              Jasa & Layanan
            </span>
          </NavLink>

          {/* ===============================
              BRAND PARTNER
             =============================== */}

          <NavLink
            to="/admin/brands"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <Handshake
              size={19}
            />

            <span>
              Brand Partner
            </span>
          </NavLink>

          <NavLink
            to="/admin/brands-used"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <Handshake size={19} />
            <span>Brand yang Digunakan</span>
          </NavLink>

          {/* ===============================
              MITRA BISNIS
             =============================== */}

          <NavLink
            to="/admin/business-partners"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <Building2
              size={19}
            />

            <span>
              Mitra Bisnis
            </span>
          </NavLink>
        </nav>

        {/* ===================================================
            SIDEBAR BOTTOM
           =================================================== */}

        <div className="admin-sidebar-bottom">
          {/* ===============================
              LIHAT WEBSITE
             =============================== */}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-public-link"
            onClick={
              closeSidebar
            }
          >
            <ExternalLink
              size={17}
            />

            <span>
              Lihat Website
            </span>
          </a>

          {/* ===============================
              LOGOUT
             =============================== */}

          <button
            type="button"
            onClick={
              handleLogout
            }
            className="admin-logout"
          >
            <LogOut
              size={17}
            />

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE OVERLAY
         =====================================================
         
         Hanya muncul ketika sidebar mobile terbuka.
         Klik area gelap → sidebar ditutup.
         ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={
            closeSidebar
          }
          aria-label="Tutup menu"
        />
      )}

      {/* =====================================================
          MAIN AREA
         ===================================================== */}

      <section className="admin-main">
        {/* ===================================================
            TOPBAR
           =================================================== */}

        <header className="admin-topbar">
          {/* ================================================
              MOBILE MENU BUTTON
             ================================================= */}

          <div className="admin-mobile-controls">
            <button
              type="button"
              className="admin-menu-button"
              onClick={
                toggleSidebar
              }
              aria-label={
                sidebarOpen
                  ? 'Tutup menu'
                  : 'Buka menu'
              }
              aria-expanded={
                sidebarOpen
              }
            >
              {sidebarOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>

          {/* ================================================
              CURRENT PAGE
             ================================================= */}

          <div className="admin-topbar-title">
            <span className="admin-topbar-label">
              ADMINISTRATOR
            </span>

            <h2>
              Dashboard
            </h2>
          </div>

          {/* ================================================
              ADMIN USER
             ================================================= */}

          <div className="admin-user">
            {/* Avatar */}
            <div className="admin-avatar">
              {(
                user?.name ??
                user?.username ??
                'A'
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            {/* User information */}
            <div>
              <strong>
                {user?.name ??
                  user?.username ??
                  'Administrator'}
              </strong>

              <span>
                {user?.email ??
                  'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* ===================================================
            PAGE CONTENT
           =================================================== */}

        <main className="admin-content">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
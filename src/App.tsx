import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

import PublicHome from './PublicHome';

import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminArticles from './admin/pages/AdminArticles';
import AdminPortfolio from './admin/pages/AdminPortfolio';
import AdminServices from './admin/pages/AdminServices';
import AdminBrands from './admin/pages/AdminBrands';
import AdminBrandsUsed from './admin/pages/AdminBrandsUsed';
import AdminBusinessPartners from './admin/pages/AdminBusinessPartners';

import AdminLayout from './admin/layouts/AdminLayout';
import { ProtectedRoute } from './admin/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================
            WEBSITE PUBLIK
           ===================================== */}

        <Route
          path="/"
          element={<PublicHome />}
        />

        {/* =====================================
            ADMIN LOGIN
           ===================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =====================================
            ADMIN AREA
            Semua route di bawah ini
            membutuhkan JWT.
           ===================================== */}

        <Route
          element={
            <ProtectedRoute />
          }
        >
          <Route
            path="/admin"
            element={
              <AdminLayout />
            }
          >
            {/* Dashboard */}
            <Route
              index
              element={
                <AdminDashboard />
              }
            />

            {/* Artikel */}
            <Route
              path="articles"
              element={
                <AdminArticles />
              }
            />

            {/* Portfolio */}
            <Route
              path="portfolio"
              element={
                <AdminPortfolio />
              }
            />

            {/* Jasa */}
            <Route
              path="services"
              element={
                <AdminServices />
              }
            />

            {/* Brand */}
            <Route
              path="brands"
              element={
                <AdminBrands />
              }
            />

            <Route
              path="brands-used"
              element={
                <AdminBrandsUsed />
              }
            />

            {/* Mitra Bisnis */}
            <Route
              path="business-partners"
              element={
                <AdminBusinessPartners />
              }
            />
          </Route>
        </Route>

        {/* =====================================
            FALLBACK

            Kalau URL tidak ditemukan,
            kembali ke website publik.
           ===================================== */}

        <Route
          path="*"
          element={<PublicHome />}
        />
      </Routes>
    </BrowserRouter>
  );
}
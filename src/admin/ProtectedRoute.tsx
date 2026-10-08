import {
  useEffect,
  useState,
} from 'react';

import {
  Navigate,
  Outlet,
} from 'react-router';

import {
  clearAuth,
  getToken,
} from './auth';

import { API_URL } from '../lib/api';

export function ProtectedRoute() {
  /**
   * null   = masih mengecek
   * true   = token valid
   * false  = token tidak valid
   */
  const [authenticated, setAuthenticated] =
    useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();

      /**
       * Tidak ada token.
       */
      if (!token) {
        setAuthenticated(false);
        return;
      }

      try {
        /**
         * Kirim token ke backend.
         *
         * Backend akan menjalankan:
         * JwtAuthGuard
         * ↓
         * JwtStrategy
         */
        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        /**
         * Token valid.
         */
        if (response.ok) {
          setAuthenticated(true);
          return;
        }

        /**
         * Token invalid/expired.
         */
        clearAuth();
        setAuthenticated(false);
      } catch {
        /**
         * API tidak bisa dihubungi.
         */
        setAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  /**
   * Saat backend sedang diperiksa.
   */
  if (authenticated === null) {
    return (
      <div className="admin-loading">
        Memeriksa sesi admin...
      </div>
    );
  }

  /**
   * Tidak authenticated:
   * arahkan ke login.
   */
  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  /**
   * Token valid:
   * tampilkan halaman admin.
   */
  return <Outlet />;
}
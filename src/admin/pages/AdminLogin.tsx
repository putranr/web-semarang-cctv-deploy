import '../admin.css';
import {
  type FormEvent,
  useState,
} from 'react';

import {
  Navigate,
  useNavigate,
} from 'react-router';

import {
  getToken,
  saveAuth,
} from '../auth';

import { API_URL } from '../../lib/api';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  /**
   * Kalau user sudah login,
   * tidak perlu membuka halaman login lagi.
   */
  if (getToken()) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            'Login gagal',
        );
      }

      /**
       * Simpan JWT + informasi admin.
       */
      saveAuth(
        data.access_token,
        data.user,
      );

      /**
       * Pindah ke dashboard.
       */
      navigate('/admin', {
        replace: true,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Login gagal',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <img
            src="/images/logo.png"
            alt="Logo perusahaan"
          />

          <span>
            ADMIN PANEL
          </span>
        </div>

        <div className="admin-login-heading">
          <h1>
            Selamat Datang
          </h1>

          <p>
            Masuk ke dashboard admin
            CCTV Semarang.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >
          <div className="admin-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              required
            />
          </div>

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-login-button"
          >
            {loading
              ? 'Memproses...'
              : 'Login Admin'}
          </button>
        </form>
      </div>
    </main>
  );
}
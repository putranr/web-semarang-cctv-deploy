/**
 * Nama key yang digunakan untuk menyimpan
 * JWT di browser.
 */
const TOKEN_KEY = 'cctv_admin_token';

/**
 * Nama key untuk menyimpan informasi
 * user yang sedang login.
 */
const USER_KEY = 'cctv_admin_user';

export type AdminUser = {
  id: number;
  email: string;
  username: string | null;
  name: string | null;
  role: string;
};

/**
 * Simpan JWT setelah login berhasil.
 */
export function saveAuth(
  token: string,
  user: AdminUser,
) {
  localStorage.setItem(
    TOKEN_KEY,
    token,
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user),
  );
}

/**
 * Ambil JWT dari browser.
 */
export function getToken() {
  return localStorage.getItem(
    TOKEN_KEY,
  );
}

/**
 * Ambil informasi user.
 */
export function getUser(): AdminUser | null {
  const user =
    localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AdminUser;
  } catch {
    return null;
  }
}

/**
 * Hapus session admin.
 */
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Mengecek apakah browser memiliki token.
 */
export function hasToken() {
  return Boolean(getToken());
}
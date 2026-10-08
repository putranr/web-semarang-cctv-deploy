import {
  useLocation,
} from 'react-router';

export default function AdminPlaceholder() {
  const location = useLocation();

  const pageName =
    location.pathname
      .split('/')
      .filter(Boolean)
      .pop() ?? 'content';

  const title =
    pageName === 'business-partners'
      ? 'Mitra Bisnis'
      : pageName.charAt(0).toUpperCase() +
        pageName.slice(1);

  return (
    <div className="admin-placeholder">
      <span>
        ADMIN CONTENT
      </span>

      <h1>
        {title}
      </h1>

      <p>
        Halaman ini akan kita
        hubungkan ke PostgreSQL
        pada tahap CRUD berikutnya.
      </p>
    </div>
  );
}
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import {
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import { authFetch } from '../../lib/api';

// ======================================================
// TYPE DATA
// ======================================================

type Brand = {
  id: number;
  name: string;
  logo: string | null;
  website: string | null;
  description: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type BrandForm = {
  isPublished: boolean;
};

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

const emptyForm: BrandForm = {
  isPublished: true,
};

// ======================================================
// COMPONENT
// ======================================================

export default function AdminBrands() {
  // Data brand dari backend.
  const [brands, setBrands] = useState<Brand[]>([]);

  // Data form.
  const [form, setForm] = useState<BrandForm>(emptyForm);

  // ID brand yang sedang diedit.
  const [editingId, setEditingId] = useState<number | null>(null);

  // File logo yang dipilih.
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // URL pratinjau gambar.
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Status tampilan dan request.
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // ====================================================
  // LOAD DATA
  // ====================================================

  const loadBrands = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await authFetch('/brands');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message ?? 'Gagal mengambil brand.',
        );
      }

      setBrands(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal mengambil brand.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBrands();
  }, []);

  // ====================================================
  // PILIH LOGO
  // ====================================================

  const handleLogoChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Logo harus berupa JPG, PNG, atau WebP.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran logo maksimal 5 MB.');
      event.target.value = '';
      return;
    }

    // Bersihkan URL pratinjau sebelumnya jika berupa blob.
    setLogoPreview((previous) => {
      if (previous?.startsWith('blob:')) {
        URL.revokeObjectURL(previous);
      }

      return URL.createObjectURL(file);
    });

    setLogoFile(file);
    setError('');
  };

  // ====================================================
  // RESET FORM
  // ====================================================

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setLogoFile(null);

    setLogoPreview((previous) => {
      if (previous?.startsWith('blob:')) {
        URL.revokeObjectURL(previous);
      }

      return null;
    });

    setError('');

    const fileInput = document.getElementById(
      'brand-logo',
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = '';
    }
  };

  // ====================================================
  // TAMBAH BRAND
  // ====================================================

  const handleAdd = () => {
    resetForm();
    setModalOpen(true);
  };

  // ====================================================
  // EDIT BRAND
  // ====================================================

  const handleEdit = (brand: Brand) => {
    resetForm();

    setEditingId(brand.id);

    setForm({
      isPublished: brand.isPublished,
    });

    setLogoPreview(
      brand.logo
        ? `${API_URL}${brand.logo}`
        : null,
    );

    setModalOpen(true);
  };

  // ====================================================
  // TUTUP MODAL
  // ====================================================

  const handleCloseModal = () => {
    if (saving) return;

    setModalOpen(false);
    resetForm();
  };

  // ====================================================
  // SIMPAN BRAND
  // ====================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (editingId === null && !logoFile) {
      setError('Silakan pilih logo brand terlebih dahulu.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const formData = new FormData();

      // Nama field tetap "image" sesuai backend.
      if (logoFile) {
        formData.append('image', logoFile);
      }

      formData.append(
        'isPublished',
        String(form.isPublished),
      );

      const endpoint =
        editingId !== null
          ? `/brands/${editingId}`
          : '/brands';

      const method =
        editingId !== null
          ? 'PATCH'
          : 'POST';

      const response = await authFetch(endpoint, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message ?? 'Gagal menyimpan brand.',
        );
      }

      setModalOpen(false);
      resetForm();

      await loadBrands();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal menyimpan brand.',
      );
    } finally {
      setSaving(false);
    }
  };

  // ====================================================
  // HAPUS BRAND
  // ====================================================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Yakin ingin menghapus logo brand ini?',
    );

    if (!confirmed) return;

    try {
      setError('');

      const response = await authFetch(`/brands/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message ?? 'Gagal menghapus brand.',
        );
      }

      await loadBrands();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal menghapus brand.',
      );
    }
  };

  // ====================================================
  // UBAH STATUS PUBLIKASI
  // ====================================================

  const handleTogglePublish = async (brand: Brand) => {
    try {
      setError('');

      const formData = new FormData();

      formData.append(
        'isPublished',
        String(!brand.isPublished),
      );

      const response = await authFetch(
        `/brands/${brand.id}`,
        {
          method: 'PATCH',
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message ?? 'Gagal mengubah status.',
        );
      }

      await loadBrands();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal mengubah status.',
      );
    }
  };

  // ====================================================
  // RENDER HALAMAN
  // ====================================================

  return (
    <div className="admin-page">

      {/* HEADER HALAMAN */}

      <div className="admin-page-heading">
        <div>
          <span>PARTNER MANAGEMENT</span>

          <h1>Brand Partner</h1>

          <p>
            Kelola logo brand partner yang ditampilkan
            pada website.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={handleAdd}
        >
          <Plus size={16} />
          Tambah Brand
        </button>
      </div>

      {/* PESAN ERROR HALAMAN */}

      {error && !modalOpen && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {/* DAFTAR BRAND */}

      <section className="admin-list-card">
        <div className="admin-list-heading">
          <div>
            <span>BRAND DATABASE</span>
            <h2>Daftar Brand Partner</h2>
          </div>

          <span className="admin-count">
            {brands.length} brand
          </span>
        </div>

        {loading ? (
          <div className="admin-empty">
            Memuat brand...
          </div>
        ) : brands.length === 0 ? (
          <div className="admin-empty">
            Belum ada brand partner.
          </div>
        ) : (
          <div className="admin-brand-list">
            {brands.map((brand) => (
              <article
                key={brand.id}
                className="admin-brand-row"
              >
                <div className="admin-brand-image">
                  {brand.logo ? (
                    <img
                      src={`${API_URL}${brand.logo}`}
                      alt="Logo brand partner"
                    />
                  ) : (
                    <ImagePlus size={26} />
                  )}
                </div>

                <div className="admin-brand-info">
                  <div className="admin-article-meta">
                    <span>Brand Partner</span>

                    <span
                      className={
                        brand.isPublished
                          ? 'published'
                          : 'draft'
                      }
                    >
                      {brand.isPublished
                        ? 'Published'
                        : 'Draft'}
                    </span>
                  </div>

                  <h3>Logo Brand</h3>

                  <p>
                    Logo ini akan ditampilkan pada bagian
                    Brand Partner di website.
                  </p>
                </div>

                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => handleTogglePublish(brand)}
                  >
                    {brand.isPublished
                      ? 'Sembunyikan'
                      : 'Publish'}
                  </button>

                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => handleEdit(brand)}
                  >
                    <Pencil size={15} />
                    Ganti Logo
                  </button>

                  <button
                    type="button"
                    className="admin-danger-button"
                    onClick={() => handleDelete(brand.id)}
                  >
                    <Trash2 size={15} />
                    Hapus
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ==================================================
          MODAL TAMBAH / GANTI LOGO
         ================================================== */}

      {modalOpen && (
        <div className="partner-image-modal-backdrop">
          <div
            className="partner-image-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-image-modal-title"
          >
            {/* HEADER MODAL */}

            <div className="partner-image-modal-header">
              <div>
                <span className="partner-image-eyebrow">
                  BRAND PARTNER MANAGEMENT
                </span>

                <h2 id="partner-image-modal-title">
                  {editingId !== null
                    ? 'Ganti Logo Brand'
                    : 'Tambah Brand Partner'}
                </h2>

                <p>
                  Unggah logo brand yang menjadi partner
                  perusahaan.
                </p>
              </div>

              <button
                type="button"
                className="partner-image-close"
                onClick={handleCloseModal}
                disabled={saving}
                aria-label="Tutup formulir"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM UPLOAD */}

            <form
              className="partner-image-form"
              onSubmit={handleSubmit}
            >
              <div className="partner-image-field">
                <label className="partner-image-label">
                  Logo Brand
                  {editingId === null && (
                    <span className="partner-image-required">
                      *
                    </span>
                  )}
                </label>

                {/* AREA PILIH GAMBAR */}

                <div className="partner-image-upload">
                  <div className="partner-image-upload-icon">
                    <ImagePlus size={30} />
                  </div>

                  <h3>
                    {logoFile
                      ? 'Logo berhasil dipilih'
                      : 'Pilih gambar atau logo'}
                  </h3>

                  <p className="partner-image-upload-description">
                    {logoFile
                      ? logoFile.name
                      : 'Pilih file gambar dari komputer kamu.'}
                  </p>

                  <p className="partner-image-upload-hint">
                    JPG, PNG, atau WebP · Maksimal 5 MB
                  </p>

                  <label
                    htmlFor="brand-logo"
                    className="partner-image-pick-button"
                  >
                    <Upload size={16} />
                    {logoFile
                      ? 'Ganti Gambar'
                      : 'Pilih Gambar'}
                  </label>

                  <input
                    id="brand-logo"
                    className="partner-image-file-input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleLogoChange}
                  />
                </div>

                {editingId !== null && (
                  <small className="partner-image-helper">
                    Pilih gambar baru hanya jika ingin
                    mengganti logo sebelumnya.
                  </small>
                )}
              </div>

              {/* PREVIEW LOGO */}

              {logoPreview && (
                <div className="partner-image-preview-section">
                  <div className="partner-image-preview-heading">
                    <span>Preview Logo</span>

                    <span className="partner-image-preview-badge">
                      <ImagePlus size={12} />
                      Pratinjau
                    </span>
                  </div>

                  <div className="partner-image-preview-card">
                    <div className="partner-image-preview-canvas">
                      <img
                        src={logoPreview}
                        alt="Preview logo brand"
                      />
                    </div>

                    <div className="partner-image-preview-copy">
                      <strong>
                        {logoFile?.name ??
                          'Logo saat ini'}
                      </strong>

                      <span>
                        Logo akan ditampilkan sesuai
                        perbandingan gambar aslinya.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STATUS PUBLIKASI */}

              <div className="partner-image-publish">
                <div className="partner-image-publish-copy">
                  <strong>Tampilkan di website</strong>

                  <span>
                    {form.isPublished
                      ? 'Logo ditampilkan kepada pengunjung.'
                      : 'Logo disimpan sebagai draft.'}
                  </span>
                </div>

                <label className="partner-image-switch">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        isPublished: event.target.checked,
                      }))
                    }
                    aria-label="Tampilkan logo di website"
                  />

                  <span className="partner-image-switch-slider" />
                </label>
              </div>

              {/* PESAN ERROR */}

              {error && (
                <div
                  className="partner-image-form-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* TOMBOL AKSI */}

              <div className="partner-image-form-actions">
                <button
                  type="button"
                  className="partner-image-button partner-image-button-secondary"
                  onClick={handleCloseModal}
                  disabled={saving}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="partner-image-button partner-image-button-primary"
                  disabled={saving}
                >
                  {saving
                    ? 'Menyimpan...'
                    : editingId !== null
                      ? 'Simpan Logo'
                      : 'Tambah Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
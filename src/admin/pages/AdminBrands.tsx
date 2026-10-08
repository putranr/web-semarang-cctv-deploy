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
  X,
} from 'lucide-react';

import {
  authFetch,
} from '../../lib/api';

/**
 * ======================================================
 * TYPE BRAND
 * ======================================================
 *
 * Data dari backend tetap boleh mempunyai
 * name / website / description.
 *
 * Tetapi untuk Brand Partner,
 * bagian tersebut tidak digunakan di UI.
 */
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

/**
 * ======================================================
 * TYPE FORM
 * ======================================================
 *
 * Brand Partner sekarang hanya membutuhkan:
 *
 * - logo
 * - isPublished
 */
type BrandForm = {
  isPublished: boolean;
};

/**
 * ======================================================
 * BACKEND URL
 * ======================================================
 */

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

/**
 * ======================================================
 * INITIAL FORM
 * ======================================================
 */

const emptyForm: BrandForm = {
  isPublished: true,
};

/**
 * ======================================================
 * COMPONENT
 * ======================================================
 */

export default function AdminBrands() {
  /**
   * ----------------------------------------------------
   * DATA BRAND
   * ----------------------------------------------------
   */

  const [
    brands,
    setBrands,
  ] = useState<Brand[]>([]);

  /**
   * ----------------------------------------------------
   * FORM
   * ----------------------------------------------------
   */

  const [
    form,
    setForm,
  ] = useState<BrandForm>(
    emptyForm,
  );

  /**
   * ----------------------------------------------------
   * EDITING
   * ----------------------------------------------------
   */

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(
    null,
  );

  /**
   * ----------------------------------------------------
   * FILE
   * ----------------------------------------------------
   */

  const [
    logoFile,
    setLogoFile,
  ] = useState<File | null>(
    null,
  );

  /**
   * ----------------------------------------------------
   * PREVIEW
   * ----------------------------------------------------
   */

  const [
    logoPreview,
    setLogoPreview,
  ] = useState<string | null>(
    null,
  );

  /**
   * ----------------------------------------------------
   * LOADING
   * ----------------------------------------------------
   */

  const [
    loading,
    setLoading,
  ] = useState(true);

  /**
   * ----------------------------------------------------
   * SAVING
   * ----------------------------------------------------
   */

  const [
    saving,
    setSaving,
  ] = useState(false);

  /**
   * ----------------------------------------------------
   * ERROR
   * ----------------------------------------------------
   */

  const [
    error,
    setError,
  ] = useState('');

  /**
   * ----------------------------------------------------
   * MODAL
   * ----------------------------------------------------
   */

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  /**
   * ====================================================
   * LOAD BRANDS
   * ====================================================
   */

  const loadBrands =
    async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await authFetch(
            '/brands',
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            Array.isArray(
              data.message,
            )
              ? data.message.join(
                  ', ',
                )
              : data.message ??
                  'Gagal mengambil brand.',
          );
        }

        setBrands(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Gagal mengambil brand.',
        );
      } finally {
        setLoading(false);
      }
    };

  /**
   * ====================================================
   * INITIAL LOAD
   * ====================================================
   */

  useEffect(() => {
    loadBrands();
  }, []);

  /**
   * ====================================================
   * FILE CHANGE
   * ====================================================
   */

  const handleLogoChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    /**
     * --------------------------------------------------
     * VALIDASI FORMAT
     * --------------------------------------------------
     */

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (
      !allowedTypes.includes(
        file.type,
      )
    ) {
      alert(
        'Logo harus berupa JPG, PNG, atau WebP.',
      );

      event.target.value = '';

      return;
    }

    /**
     * --------------------------------------------------
     * VALIDASI UKURAN
     * --------------------------------------------------
     */

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        'Ukuran logo maksimal 5 MB.',
      );

      event.target.value = '';

      return;
    }

    /**
     * --------------------------------------------------
     * SET FILE
     * --------------------------------------------------
     */

    setLogoFile(file);

    /**
     * --------------------------------------------------
     * PREVIEW
     * --------------------------------------------------
     */

    const previewUrl =
      URL.createObjectURL(
        file,
      );

    setLogoPreview(
      previewUrl,
    );
  };

  /**
   * ====================================================
   * RESET FORM
   * ====================================================
   */

  const resetForm = () => {
    setForm(
      emptyForm,
    );

    setEditingId(null);

    setLogoFile(null);

    setLogoPreview(null);

    setError('');

    const fileInput =
      document.getElementById(
        'brand-logo',
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = '';
    }
  };

  /**
   * ====================================================
   * ADD
   * ====================================================
   */

  const handleAdd = () => {
    resetForm();

    setError('');

    setModalOpen(true);
  };

  /**
   * ====================================================
   * EDIT
   * ====================================================
   */

  const handleEdit = (
    brand: Brand,
  ) => {
    setEditingId(
      brand.id,
    );

    setForm({
      isPublished:
        brand.isPublished,
    });

    /**
     * Tidak perlu mengisi nama,
     * website, atau description.
     */

    setLogoFile(null);

    setLogoPreview(
      brand.logo
        ? `${API_URL}${brand.logo}`
        : null,
    );

    setError('');

    setModalOpen(true);
  };

  /**
   * ====================================================
   * CLOSE MODAL
   * ====================================================
   */

  const handleCloseModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);

    resetForm();
  };

  /**
   * ====================================================
   * SUBMIT
   * ====================================================
   */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    /**
     * --------------------------------------------------
     * VALIDASI
     * --------------------------------------------------
     */

    if (
      editingId === null &&
      !logoFile
    ) {
      setError(
        'Silakan pilih logo brand terlebih dahulu.',
      );

      return;
    }

    try {
      setSaving(true);

      setError('');

      /**
       * ------------------------------------------------
       * FORM DATA
       * ------------------------------------------------
       */

      const formData =
        new FormData();

      /**
       * ------------------------------------------------
       * LOGO
       * ------------------------------------------------
       */

      if (logoFile) {
        formData.append(
          'image',
          logoFile,
        );
      }

      /**
       * ------------------------------------------------
       * PUBLISH
       * ------------------------------------------------
       */

      formData.append(
        'isPublished',
        String(
          form.isPublished,
        ),
      );

      /**
       * ------------------------------------------------
       * ENDPOINT
       * ------------------------------------------------
       */

      const endpoint =
        editingId !== null
          ? `/brands/${editingId}`
          : '/brands';

      /**
       * ------------------------------------------------
       * METHOD
       * ------------------------------------------------
       */

      const method =
        editingId !== null
          ? 'PATCH'
          : 'POST';

      /**
       * ------------------------------------------------
       * REQUEST
       * ------------------------------------------------
       */

      const response =
        await authFetch(
          endpoint,
          {
            method,
            body: formData,
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(
            data.message,
          )
            ? data.message.join(
                ', ',
              )
            : data.message ??
                'Gagal menyimpan brand.',
        );
      }

      /**
       * ------------------------------------------------
       * CLOSE
       * ------------------------------------------------
       */

      setModalOpen(false);

      resetForm();

      /**
       * ------------------------------------------------
       * REFRESH DATA
       * ------------------------------------------------
       */

      await loadBrands();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan brand.',
      );
    } finally {
      setSaving(false);
    }
  };

  /**
   * ====================================================
   * DELETE
   * ====================================================
   */

  const handleDelete = async (
    id: number,
  ) => {
    const confirmed =
      window.confirm(
        'Yakin ingin menghapus logo brand ini?',
      );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      const response =
        await authFetch(
          `/brands/${id}`,
          {
            method: 'DELETE',
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(
            data.message,
          )
            ? data.message.join(
                ', ',
              )
            : data.message ??
                'Gagal menghapus brand.',
        );
      }

      await loadBrands();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus brand.',
      );
    }
  };

  /**
   * ====================================================
   * TOGGLE PUBLISH
   * ====================================================
   */

  const handleTogglePublish = async (
    brand: Brand,
  ) => {
    try {
      setError('');

      const formData =
        new FormData();

      /**
       * Tidak perlu mengirim:
       *
       * name
       * website
       * description
       *
       * karena Brand Partner sekarang
       * hanya menggunakan logo.
       */

      formData.append(
        'isPublished',
        String(
          !brand.isPublished,
        ),
      );

      const response =
        await authFetch(
          `/brands/${brand.id}`,
          {
            method: 'PATCH',
            body: formData,
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(
            data.message,
          )
            ? data.message.join(
                ', ',
              )
            : data.message ??
                'Gagal mengubah status.',
        );
      }

      await loadBrands();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal mengubah status.',
      );
    }
  };

  /**
   * ====================================================
   * RENDER
   * ====================================================
   */

  return (
    <div className="admin-page">

      {/* =================================================
          PAGE HEADER
         ================================================= */}

      <div className="admin-page-heading">

        <div>

          <span>
            PARTNER MANAGEMENT
          </span>

          <h1>
            Brand Partner
          </h1>

          <p>
            Kelola logo brand partner
            yang ditampilkan pada website.
          </p>

        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={
            handleAdd
          }
        >
          <Plus
            size={16}
          />

          Tambah Brand
        </button>

      </div>

      {/* =================================================
          ERROR
         ================================================= */}

      {error &&
        !modalOpen && (
          <div className="admin-error">
            {error}
          </div>
        )}

      {/* =================================================
          LIST
         ================================================= */}

      <section className="admin-list-card">

        <div className="admin-list-heading">

          <div>

            <span>
              BRAND DATABASE
            </span>

            <h2>
              Daftar Brand Partner
            </h2>

          </div>

          <span className="admin-count">
            {brands.length}{' '}
            brand
          </span>

        </div>

        {/* =================================================
            LOADING
           ================================================= */}

        {loading ? (
          <div className="admin-empty">
            Memuat brand...
          </div>

        ) : brands.length ===
          0 ? (

          <div className="admin-empty">
            Belum ada brand partner.
          </div>

        ) : (

          <div className="admin-brand-list">

            {brands.map(
              (brand) => (
                <article
                  key={
                    brand.id
                  }
                  className="admin-brand-row"
                >

                  {/* ======================================
                      LOGO
                     ====================================== */}

                  <div className="admin-brand-image">

                    {brand.logo ? (
                      <img
                        src={`${API_URL}${brand.logo}`}
                        alt="Logo brand partner"
                      />
                    ) : (
                      <ImagePlus
                        size={26}
                      />
                    )}

                  </div>

                  {/* ======================================
                      INFO
                     ====================================== */}

                  <div className="admin-brand-info">

                    <div className="admin-article-meta">

                      <span>
                        Brand Partner
                      </span>

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

                    <h3>
                      Logo Brand
                    </h3>

                    <p>
                      Logo ini akan
                      ditampilkan pada
                      bagian Brand Partner
                      di website.
                    </p>

                  </div>

                  {/* ======================================
                      ACTION
                     ====================================== */}

                  <div className="admin-row-actions">

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleTogglePublish(
                          brand,
                        )
                      }
                    >
                      {brand.isPublished
                        ? 'Sembunyikan'
                        : 'Publish'}
                    </button>

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleEdit(
                          brand,
                        )
                      }
                    >
                      <Pencil
                        size={15}
                      />

                      Ganti Logo
                    </button>

                    <button
                      type="button"
                      className="admin-danger-button"
                      onClick={() =>
                        handleDelete(
                          brand.id,
                        )
                      }
                    >
                      <Trash2
                        size={15}
                      />

                      Hapus
                    </button>

                  </div>

                </article>
              ),
            )}

          </div>

        )}

      </section>

      {/* =================================================
          MODAL
         ================================================= */}

      {modalOpen && (
        <div className="admin-modal-backdrop">

          <div className="admin-modal">

            {/* ============================================
                MODAL HEADER
               ============================================ */}

            <div className="admin-modal-header">

              <div>

                <span>
                  BRAND MANAGEMENT
                </span>

                <h2>
                  {editingId !== null
                    ? 'Ganti Logo Brand'
                    : 'Tambah Brand Partner'}
                </h2>

              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={
                  handleCloseModal
                }
                disabled={
                  saving
                }
              >
                <X
                  size={20}
                />
              </button>

            </div>

            {/* ============================================
                FORM
               ============================================ */}

            <form
              className="admin-form"
              onSubmit={
                handleSubmit
              }
            >

              {/* ==========================================
                  LOGO
                 ========================================== */}

              <div className="admin-form-group">

                <label htmlFor="brand-logo">
                  Logo Brand *
                </label>

                <input
                  id="brand-logo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handleLogoChange
                  }
                  required={
                    editingId ===
                    null
                  }
                />

                <small>
                  JPG, PNG, atau WebP.
                  Maksimal 5 MB.
                </small>

              </div>

              {/* ==========================================
                  PREVIEW
                 ========================================== */}

              {logoPreview && (
                <div className="admin-image-preview">

                  <span>
                    Preview Logo
                  </span>

                  <div>

                    <img
                      src={
                        logoPreview
                      }
                      alt="Preview logo brand"
                    />

                  </div>

                </div>
              )}

              {/* ==========================================
                  PUBLISH
                 ========================================== */}

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  checked={
                    form.isPublished
                  }
                  onChange={(
                    event,
                  ) =>
                    setForm(
                      (
                        previous,
                      ) => ({
                        ...previous,
                        isPublished:
                          event
                            .target
                            .checked,
                      }),
                    )
                  }
                />

                <span>
                  Tampilkan di website
                </span>

              </label>

              {/* ==========================================
                  ERROR
                 ========================================== */}

              {error && (
                <div className="admin-error">
                  {error}
                </div>
              )}

              {/* ==========================================
                  ACTION
                 ========================================== */}

              <div className="admin-form-actions">

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={
                    saving
                  }
                >
                  {saving
                    ? 'Menyimpan...'
                    : editingId !==
                        null
                      ? 'Simpan Logo'
                      : 'Tambah Brand'}
                </button>

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={
                    handleCloseModal
                  }
                  disabled={
                    saving
                  }
                >
                  Batal
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
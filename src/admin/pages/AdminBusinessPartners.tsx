import {
  FormEvent,
  useEffect,
  useState,
  type ChangeEvent,
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

// ======================================================
// TYPE
// ======================================================

type BusinessPartner = {
  id: number;

  image: string | null;

  isPublished: boolean;

  createdAt: string;

  updatedAt: string;
};

// ======================================================
// TYPE FORM
// ======================================================

type PartnerForm = {
  isPublished: boolean;
};

// ======================================================
// EMPTY FORM
// ======================================================

const emptyForm:
  PartnerForm = {
    isPublished: true,
  };

// ======================================================
// BACKEND URL
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

// ======================================================
// COMPONENT
// ======================================================

export default function AdminBusinessPartners() {
  // ====================================================
  // DATA
  // ====================================================

  const [
    partners,
    setPartners,
  ] = useState<
    BusinessPartner[]
  >([]);

  // ====================================================
  // FORM
  // ====================================================

  const [
    form,
    setForm,
  ] = useState<PartnerForm>(
    emptyForm,
  );

  // ====================================================
  // EDITING
  // ====================================================

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(
    null,
  );

  // ====================================================
  // FILE
  // ====================================================

  const [
    imageFile,
    setImageFile,
  ] = useState<File | null>(
    null,
  );

  // ====================================================
  // PREVIEW
  // ====================================================

  const [
    imagePreview,
    setImagePreview,
  ] = useState<string | null>(
    null,
  );

  // ====================================================
  // MODAL
  // ====================================================

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  // ====================================================
  // LOADING
  // ====================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ====================================================
  // SAVING
  // ====================================================

  const [
    saving,
    setSaving,
  ] = useState(false);

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

  const loadPartners =
    async () => {
      try {
        setLoading(true);

        setError('');

        const response =
          await authFetch(
            '/business-partners',
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
                  'Gagal mengambil data mitra bisnis.',
          );
        }

        setPartners(data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : 'Gagal mengambil data mitra bisnis.',
        );
      } finally {
        setLoading(false);
      }
    };

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    loadPartners();
  }, []);

  // ====================================================
  // FILE CHANGE
  // ====================================================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // --------------------------------------------------
    // FORMAT
    // --------------------------------------------------

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
        'Gambar harus JPG, PNG, atau WebP.',
      );

      event.target.value = '';

      return;
    }

    // --------------------------------------------------
    // SIZE
    // --------------------------------------------------

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        'Ukuran gambar maksimal 5 MB.',
      );

      event.target.value = '';

      return;
    }

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(
        file,
      ),
    );
  };

  // ====================================================
  // RESET
  // ====================================================

  const resetForm = () => {
    setForm(
      emptyForm,
    );

    setEditingId(null);

    setImageFile(null);

    setImagePreview(null);

    setError('');

    const input =
      document.getElementById(
        'business-partner-image',
      ) as HTMLInputElement | null;

    if (input) {
      input.value = '';
    }
  };

  // ====================================================
  // ADD
  // ====================================================

  const handleAdd = () => {
    resetForm();

    setModalOpen(true);
  };

  // ====================================================
  // EDIT
  // ====================================================

  const handleEdit = (
    partner: BusinessPartner,
  ) => {
    setEditingId(
      partner.id,
    );

    setForm({
      isPublished:
        partner.isPublished,
    });

    setImageFile(
      null,
    );

    setImagePreview(
      partner.image
        ? `${API_URL}${partner.image}`
        : null,
    );

    setError('');

    setModalOpen(true);
  };

  // ====================================================
  // CLOSE MODAL
  // ====================================================

  const handleClose = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);

    resetForm();
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // --------------------------------------------------
    // CREATE HARUS PUNYA GAMBAR
    // --------------------------------------------------

    if (
      editingId === null &&
      !imageFile
    ) {
      setError(
        'Gambar mitra bisnis wajib diupload.',
      );

      return;
    }

    try {
      setSaving(true);

      setError('');

      // =================================================
      // FORM DATA
      // =================================================

      const formData =
        new FormData();

      // -------------------------------------------------
      // PUBLISH
      // -------------------------------------------------

      formData.append(
        'isPublished',
        String(
          form.isPublished,
        ),
      );

      // -------------------------------------------------
      // IMAGE
      // -------------------------------------------------

      if (imageFile) {
        formData.append(
          'image',
          imageFile,
        );
      }

      // =================================================
      // ENDPOINT
      // =================================================

      const endpoint =
        editingId !== null
          ? `/business-partners/${editingId}`
          : '/business-partners';

      const method =
        editingId !== null
          ? 'PATCH'
          : 'POST';

      // =================================================
      // REQUEST
      // =================================================

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
                'Gagal menyimpan mitra bisnis.',
        );
      }

      setModalOpen(false);

      resetForm();

      await loadPartners();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan mitra bisnis.',
      );
    } finally {
      setSaving(false);
    }
  };

  // ====================================================
  // DELETE
  // ====================================================

  const handleDelete = async (
    id: number,
  ) => {
    if (
      !window.confirm(
        'Yakin ingin menghapus mitra bisnis ini?',
      )
    ) {
      return;
    }

    try {
      const response =
        await authFetch(
          `/business-partners/${id}`,
          {
            method: 'DELETE',
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            'Gagal menghapus mitra bisnis.',
        );
      }

      await loadPartners();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus mitra bisnis.',
      );
    }
  };

  // ====================================================
  // TOGGLE PUBLISH
  // ====================================================

  const handleTogglePublish =
    async (
      partner: BusinessPartner,
    ) => {
      try {
        const formData =
          new FormData();

        formData.append(
          'isPublished',
          String(
            !partner.isPublished,
          ),
        );

        const response =
          await authFetch(
            `/business-partners/${partner.id}`,
            {
              method: 'PATCH',
              body: formData,
            },
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              'Gagal mengubah status.',
          );
        }

        await loadPartners();
      } catch (error) {
        console.error(error);

        alert(
          error instanceof Error
            ? error.message
            : 'Gagal mengubah status.',
        );
      }
    };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="admin-page">

      {/* =================================================
          HEADER
         ================================================= */}

      <div className="admin-page-heading">

        <div>

          <span>
            BUSINESS PARTNER MANAGEMENT
          </span>

          <h1>
            Mitra Bisnis
          </h1>

          <p>
            Kelola gambar mitra bisnis yang
            ditampilkan pada website.
          </p>

        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={handleAdd}
        >
          <Plus size={16} />

          Tambah Mitra
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
              BUSINESS PARTNER DATABASE
            </span>

            <h2>
              Daftar Mitra Bisnis
            </h2>

          </div>

          <span className="admin-count">
            {partners.length}{' '}
            mitra
          </span>

        </div>

        {loading ? (
          <div className="admin-empty">
            Memuat mitra bisnis...
          </div>
        ) : partners.length ===
          0 ? (
          <div className="admin-empty">
            Belum ada mitra bisnis.
          </div>
        ) : (
          <div className="admin-brand-list">

            {partners.map(
              (partner) => (
                <article
                  key={
                    partner.id
                  }
                  className="admin-brand-row"
                >

                  {/* IMAGE */}

                  <div className="admin-brand-image">

                    {partner.image ? (
                      <img
                        src={`${API_URL}${partner.image}`}
                        alt="Mitra bisnis"
                      />
                    ) : (
                      <ImagePlus
                        size={26}
                      />
                    )}

                  </div>

                  {/* INFO */}

                  <div className="admin-brand-info">

                    <div className="admin-article-meta">

                      <span>
                        Mitra Bisnis
                      </span>

                      <span
                        className={
                          partner.isPublished
                            ? 'published'
                            : 'draft'
                        }
                      >
                        {partner.isPublished
                          ? 'Published'
                          : 'Draft'}
                      </span>

                    </div>

                  </div>

                  {/* ACTION */}

                  <div className="admin-row-actions">

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleTogglePublish(
                          partner,
                        )
                      }
                    >
                      {partner.isPublished
                        ? 'Sembunyikan'
                        : 'Publish'}
                    </button>

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleEdit(
                          partner,
                        )
                      }
                    >
                      <Pencil
                        size={15}
                      />

                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-danger-button"
                      onClick={() =>
                        handleDelete(
                          partner.id,
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

            {/* HEADER */}

            <div className="admin-modal-header">

              <div>

                <span>
                  BUSINESS PARTNER MANAGEMENT
                </span>

                <h2>
                  {editingId !== null
                    ? 'Edit Mitra'
                    : 'Tambah Mitra'}
                </h2>

              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={
                  handleClose
                }
                disabled={
                  saving
                }
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              className="admin-form"
              onSubmit={
                handleSubmit
              }
            >

              {/* IMAGE */}

              <div className="admin-form-group">

                <label htmlFor="business-partner-image">
                  Gambar Mitra Bisnis *
                </label>

                <input
                  id="business-partner-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handleImageChange
                  }
                />

                <small>
                  JPG, PNG, atau WebP.
                  Maksimal 5 MB.
                </small>

              </div>

              {/* PREVIEW */}

              {imagePreview && (
                <div className="admin-image-preview">

                  <span>
                    Preview Gambar
                  </span>

                  <div>

                    <img
                      src={
                        imagePreview
                      }
                      alt="Preview mitra"
                    />

                  </div>

                </div>
              )}

              {/* PUBLISH */}

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  checked={
                    form.isPublished
                  }
                  onChange={(event) =>
                    setForm(
                      (previous) => ({
                        ...previous,

                        isPublished:
                          event.target
                            .checked,
                      }),
                    )
                  }
                />

                <span>
                  Tampilkan di website
                </span>

              </label>

              {/* ERROR */}

              {error && (
                <div className="admin-error">
                  {error}
                </div>
              )}

              {/* ACTION */}

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
                    : editingId !== null
                      ? 'Simpan Perubahan'
                      : 'Tambah Mitra'}
                </button>

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={
                    handleClose
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
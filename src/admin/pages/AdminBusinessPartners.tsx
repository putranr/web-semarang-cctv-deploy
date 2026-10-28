import {
  type FormEvent,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react';

import {
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import { authFetch, getAssetUrl } from '../../lib/api';

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

    setImagePreview(getAssetUrl(partner.image));

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
                        src={getAssetUrl(partner.image) ?? undefined}
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
          <div className="partner-image-modal-backdrop">
            <div
              className="partner-image-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="business-partner-modal-title"
            >
              {/* HEADER */}
        
              <div className="partner-image-modal-header">
                <div>
                  <span className="partner-image-eyebrow">
                    BUSINESS PARTNER MANAGEMENT
                  </span>
        
                  <h2 id="business-partner-modal-title">
                    {editingId !== null
                      ? 'Ganti Gambar Mitra'
                      : 'Tambah Mitra Bisnis'}
                  </h2>
        
                  <p>
                    Unggah gambar mitra bisnis yang akan
                    ditampilkan pada website.
                  </p>
                </div>
        
                <button
                  type="button"
                  className="partner-image-close"
                  onClick={handleClose}
                  disabled={saving}
                  aria-label="Tutup formulir"
                >
                  <X size={20} />
                </button>
              </div>
        
              {/* FORM */}
        
              <form
                className="partner-image-form"
                onSubmit={handleSubmit}
              >
                {/* AREA UPLOAD */}
        
                <div className="partner-image-field">
                  <label className="partner-image-label">
                    Gambar Mitra Bisnis
                    {editingId === null && (
                      <span className="partner-image-required">
                        *
                      </span>
                    )}
                  </label>
        
                  <div className="partner-image-upload">
                    <div className="partner-image-upload-icon">
                      <ImagePlus size={30} />
                    </div>
        
                    <h3>
                      {imageFile
                        ? 'Gambar berhasil dipilih'
                        : 'Pilih gambar mitra bisnis'}
                    </h3>
        
                    <p className="partner-image-upload-description">
                      {imageFile
                        ? imageFile.name
                        : 'Pilih gambar dari komputer kamu.'}
                    </p>
        
                    <p className="partner-image-upload-hint">
                      JPG, PNG, atau WebP · Maksimal 5 MB
                    </p>
        
                    <label
                      htmlFor="business-partner-image"
                      className="partner-image-pick-button"
                    >
                      <Upload size={16} />
                      {imageFile
                        ? 'Ganti Gambar'
                        : 'Pilih Gambar'}
                    </label>
        
                    <input
                      id="business-partner-image"
                      className="partner-image-file-input"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                    />
                  </div>
        
                  {editingId !== null && (
                    <small className="partner-image-helper">
                      Pilih gambar baru hanya jika ingin mengganti
                      gambar mitra yang sudah tersimpan.
                    </small>
                  )}
                </div>
        
                {/* PREVIEW */}
        
                {imagePreview && (
                  <div className="partner-image-preview-section">
                    <div className="partner-image-preview-heading">
                      <span>Preview Gambar</span>
        
                      <span className="partner-image-preview-badge">
                        <ImagePlus size={12} />
                        Pratinjau
                      </span>
                    </div>
        
                    <div className="partner-image-preview-card">
                      <div className="partner-image-preview-canvas">
                        <img
                          src={imagePreview}
                          alt="Preview gambar mitra bisnis"
                        />
                      </div>
        
                      <div className="partner-image-preview-copy">
                        <strong>
                          {imageFile?.name ?? 'Gambar saat ini'}
                        </strong>
        
                        <span>
                          Gambar akan ditampilkan sesuai proporsi
                          aslinya di bagian Mitra Bisnis.
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
                        ? 'Gambar mitra dapat dilihat pengunjung.'
                        : 'Gambar disimpan sebagai draft.'}
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
                      aria-label="Tampilkan mitra bisnis di website"
                    />
        
                    <span className="partner-image-switch-slider" />
                  </label>
                </div>
        
                {/* ERROR */}
        
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
                    onClick={handleClose}
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
                        ? 'Simpan Perubahan'
                        : 'Tambah Mitra'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}
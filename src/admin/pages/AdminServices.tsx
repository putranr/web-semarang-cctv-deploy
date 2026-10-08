import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  authFetch,
} from '../../lib/api';

type Service = {
  id: number;
  title: string;
  description: string;
  detail: string;
  features: string;
  icon: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type ServiceForm = {
  title: string;
  description: string;
  detail: string;
  features: string;
  icon: string;
  displayOrder: string;
  isPublished: boolean;
};

const emptyForm: ServiceForm = {
  title: '',
  description: '',
  detail: '',
  features: '',
  icon: 'Camera',
  displayOrder: '0',
  isPublished: true,
};

export default function AdminServices() {
  const [
    services,
    setServices,
  ] = useState<Service[]>([]);

  const [
    form,
    setForm,
  ] = useState<ServiceForm>(
    emptyForm,
  );

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(
    null,
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  /**
   * ==========================================
   * LOAD
   * ==========================================
   */
  const loadServices =
    async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await authFetch(
            '/services',
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              'Gagal mengambil layanan',
          );
        }

        setServices(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Gagal mengambil layanan',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadServices();
  }, []);

  /**
   * ==========================================
   * UPDATE FORM
   * ==========================================
   */
  const updateForm = (
    field: keyof ServiceForm,
    value:
      | string
      | boolean,
  ) => {
    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      }),
    );
  };

  /**
   * ==========================================
   * SUBMIT
   * ==========================================
   */
  const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  try {
    setSaving(true);
    setError('');

    const isEditing =
      editingId !== null;

    /**
     * Services TIDAK memiliki upload file,
     * jadi kita gunakan JSON biasa.
     */
    const body = {
      title: form.title.trim(),

      description:
        form.description.trim(),

      detail:
        form.detail.trim(),

      features:
        form.features.trim(),

      icon:
        form.icon,

      displayOrder:
        Number(
          form.displayOrder,
        ),

      isPublished:
        form.isPublished,
    };

    /**
     * Debug sementara.
     *
     * Ini membantu memastikan
     * data memang terisi sebelum
     * dikirim ke backend.
     */
    console.log(
      'SERVICE BODY:',
      body,
    );

    const response =
      await authFetch(
        isEditing
          ? `/services/${editingId}`
          : '/services',
        {
          method:
            isEditing
              ? 'PATCH'
              : 'POST',

          /**
           * Kirim JSON.
           */
          body: JSON.stringify(
            body,
          ),
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
              'Gagal menyimpan layanan',
      );
    }

    /**
     * Berhasil.
     */
    resetForm();

    /**
     * Ambil data terbaru
     * dari database.
     */
    await loadServices();
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : 'Gagal menyimpan layanan',
    );
  } finally {
    setSaving(false);
  }
};

  /**
   * ==========================================
   * EDIT
   * ==========================================
   */
  const handleEdit = (
    service: Service,
  ) => {
    setEditingId(
      service.id,
    );

    setForm({
      title: service.title,
      description:
        service.description,
      detail: service.detail,
      features:
        service.features,
      icon:
        service.icon,
      displayOrder:
        String(
          service.displayOrder,
        ),
      isPublished:
        service.isPublished,
    });

    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * ==========================================
   * DELETE
   * ==========================================
   */
  const handleDelete = async (
    id: number,
  ) => {
    if (
      !window.confirm(
        'Yakin ingin menghapus layanan ini?',
      )
    ) {
      return;
    }

    try {
      setError('');

      const response =
        await authFetch(
          `/services/${id}`,
          {
            method: 'DELETE',
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            'Gagal menghapus layanan',
        );
      }

      await loadServices();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus layanan',
      );
    }
  };

  /**
   * ==========================================
   * RESET
   * ==========================================
   */
  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  return (
    <div className="admin-articles-page">
      {/* ===================================
          HEADER
         =================================== */}
      <div className="admin-page-heading">
        <div>
          <span>
            SERVICE MANAGEMENT
          </span>

          <h1>
            Jasa & Layanan
          </h1>

          <p>
            Kelola layanan CCTV yang
            ditampilkan pada website.
          </p>
        </div>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {/* ===================================
          FORM
         =================================== */}
      <section className="admin-editor-card">
        <div className="admin-editor-heading">
          <div>
            <span>
              {editingId
                ? 'EDIT LAYANAN'
                : 'LAYANAN BARU'}
            </span>

            <h2>
              {editingId
                ? 'Edit Layanan'
                : 'Tambah Layanan'}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              className="admin-secondary-button"
              onClick={
                resetForm
              }
            >
              Batal Edit
            </button>
          )}
        </div>

        <form
          className="admin-article-form"
          onSubmit={
            handleSubmit
          }
        >
          <div className="admin-form-grid">
            <div className="admin-field">
              <label>
                Nama Layanan
              </label>

              <input
                type="text"
                value={
                  form.title
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'title',
                    event.target
                      .value,
                  )
                }
                placeholder="Installation CCTV"
                required
              />
            </div>

            <div className="admin-field">
              <label>
                Icon
              </label>

              <select
                value={
                  form.icon
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'icon',
                    event.target
                      .value,
                  )
                }
              >
                <option value="Camera">
                  Camera
                </option>

                <option value="Wrench">
                  Wrench
                </option>

                <option value="Settings">
                  Settings
                </option>

                <option value="Cable">
                  Cable
                </option>
              </select>
            </div>

            <div className="admin-field">
              <label>
                Urutan Tampilan
              </label>

              <input
                type="number"
                min="0"
                value={
                  form.displayOrder
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'displayOrder',
                    event.target
                      .value,
                  )
                }
              />
            </div>
          </div>

          <div className="admin-field">
            <label>
              Deskripsi Singkat
            </label>

            <textarea
              rows={3}
              value={
                form.description
              }
              onChange={(
                event,
              ) =>
                updateForm(
                  'description',
                  event.target
                    .value,
                )
              }
              placeholder="Deskripsi singkat layanan..."
              required
            />
          </div>

          <div className="admin-field">
            <label>
              Detail Layanan
            </label>

            <textarea
              rows={6}
              value={
                form.detail
              }
              onChange={(
                event,
              ) =>
                updateForm(
                  'detail',
                  event.target
                    .value,
                )
              }
              placeholder="Jelaskan layanan secara lengkap..."
              required
            />
          </div>

          <div className="admin-field">
            <label>
              Fitur Layanan
            </label>

            <textarea
              rows={7}
              value={
                form.features
              }
              onChange={(
                event,
              ) =>
                updateForm(
                  'features',
                  event.target
                    .value,
                )
              }
              placeholder={`Satu fitur per baris.

Survey lokasi
Penentuan titik kamera
Pemasangan kamera
Konfigurasi DVR/NVR`}
            />

            <small
              style={{
                color:
                  '#687581',
                fontSize:
                  '11px',
              }}
            >
              Tulis satu fitur pada
              setiap baris.
            </small>
          </div>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={
                form.isPublished
              }
              onChange={(
                event,
              ) =>
                updateForm(
                  'isPublished',
                  event.target
                    .checked,
                )
              }
            />

            <span>
              Tampilkan di website
            </span>
          </label>

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
                : editingId
                  ? 'Simpan Perubahan'
                  : 'Tambah Layanan'}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-secondary-button"
                onClick={
                  resetForm
                }
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ===================================
          LIST
         =================================== */}
      <section className="admin-list-card">
        <div className="admin-list-heading">
          <div>
            <span>
              SERVICE DATABASE
            </span>

            <h2>
              Daftar Layanan
            </h2>
          </div>

          <span className="admin-count">
            {services.length}{' '}
            layanan
          </span>
        </div>

        {loading ? (
          <div className="admin-empty">
            Memuat layanan...
          </div>
        ) : services.length ===
          0 ? (
          <div className="admin-empty">
            Belum ada layanan.
          </div>
        ) : (
          <div className="admin-article-list">
            {services.map(
              (service) => (
                <article
                  key={
                    service.id
                  }
                  className="admin-article-row"
                >
                  <div className="admin-stat-icon">
                    {service.icon}
                  </div>

                  <div className="admin-article-info">
                    <div className="admin-article-meta">
                      <span>
                        Urutan #
                        {
                          service.displayOrder
                        }
                      </span>

                      <span
                        className={
                          service.isPublished
                            ? 'published'
                            : 'draft'
                        }
                      >
                        {service.isPublished
                          ? 'Published'
                          : 'Draft'}
                      </span>
                    </div>

                    <h3>
                      {
                        service.title
                      }
                    </h3>

                    <p>
                      {
                        service.description
                      }
                    </p>

                    <small>
                      {
                        service.features
                          .split(
                            /\r?\n/,
                          )
                          .filter(
                            Boolean,
                          )
                          .slice(
                            0,
                            3,
                          )
                          .join(
                            ' · ',
                          )
                      }
                    </small>
                  </div>

                  <div className="admin-row-actions">
                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleEdit(
                          service,
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-danger-button"
                      onClick={() =>
                        handleDelete(
                          service.id,
                        )
                      }
                    >
                      Hapus
                    </button>
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </section>
    </div>
  );
}
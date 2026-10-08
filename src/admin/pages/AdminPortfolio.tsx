import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  authFetch,
} from '../../lib/api';

import {
  API_URL,
} from '../../lib/api';

type Portfolio = {
  id: number;
  title: string;
  category: string;
  location: string;
  cameras: number;
  year: number;
  image: string | null;
  description: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type PortfolioForm = {
  title: string;
  category: string;
  location: string;
  cameras: string;
  year: string;
  description: string;
  isPublished: boolean;
};

const emptyForm:
  PortfolioForm = {
  title: '',
  category: 'Rumah',
  location: '',
  cameras: '1',
  year: String(
    new Date().getFullYear(),
  ),
  description: '',
  isPublished: true,
};

function getImageUrl(
  image:
    | string
    | null
    | undefined,
) {
  if (!image) {
    return null;
  }

  if (
    image.startsWith(
      'http://',
    ) ||
    image.startsWith(
      'https://',
    )
  ) {
    return image;
  }

  return `${API_URL}${
    image.startsWith('/')
      ? image
      : `/${image}`
  }`;
}

export default function AdminPortfolio() {
  const [
    portfolios,
    setPortfolios,
  ] = useState<Portfolio[]>([]);

  const [
    form,
    setForm,
  ] = useState<PortfolioForm>(
    emptyForm,
  );

  const [
    selectedImage,
    setSelectedImage,
  ] = useState<File | null>(
    null,
  );

  const [
    imagePreview,
    setImagePreview,
  ] = useState<
    string | null
  >(null);

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
   * ======================================
   * LOAD
   * ======================================
   */
  const loadPortfolios =
    async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await authFetch(
            '/portfolio',
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              'Gagal mengambil portfolio',
          );
        }

        setPortfolios(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Gagal mengambil portfolio',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadPortfolios();
  }, []);

  /**
   * ======================================
   * CLEANUP PREVIEW
   * ======================================
   */
  useEffect(() => {
    return () => {
      if (
        imagePreview?.startsWith(
          'blob:',
        )
      ) {
        URL.revokeObjectURL(
          imagePreview,
        );
      }
    };
  }, [imagePreview]);

  /**
   * ======================================
   * UPDATE FORM
   * ======================================
   */
  const updateForm = (
    field: keyof PortfolioForm,
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
   * ======================================
   * IMAGE CHANGE
   * ======================================
   */
  const handleImageChange = (
    file:
      | File
      | null,
  ) => {
    if (!file) {
      return;
    }

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
      setError(
        'Format gambar harus JPG, PNG, atau WebP.',
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        'Ukuran gambar maksimal 5 MB.',
      );

      return;
    }

    setError('');
    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(
        file,
      );

    setImagePreview(
      previewUrl,
    );
  };

  /**
   * ======================================
   * EDIT
   * ======================================
   */
  const handleEdit = (
    portfolio: Portfolio,
  ) => {
    setEditingId(
      portfolio.id,
    );

    setForm({
      title:
        portfolio.title,

      category:
        portfolio.category,

      location:
        portfolio.location,

      cameras:
        String(
          portfolio.cameras,
        ),

      year:
        String(
          portfolio.year,
        ),

      description:
        portfolio.description,

      isPublished:
        portfolio.isPublished,
    });

    setSelectedImage(
      null,
    );

    setImagePreview(
      getImageUrl(
        portfolio.image,
      ),
    );

    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * ======================================
   * RESET
   * ======================================
   */
  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedImage(null);
    setImagePreview(null);
    setError('');
  };

  /**
   * ======================================
   * SUBMIT
   * ======================================
   */
  const handleSubmit = async (
    event:
      FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');

      const formData =
        new FormData();

      formData.append(
        'title',
        form.title,
      );

      formData.append(
        'category',
        form.category,
      );

      formData.append(
        'location',
        form.location,
      );

      formData.append(
        'cameras',
        form.cameras,
      );

      formData.append(
        'year',
        form.year,
      );

      formData.append(
        'description',
        form.description,
      );

      formData.append(
        'isPublished',
        String(
          form.isPublished,
        ),
      );

      if (selectedImage) {
        formData.append(
          'image',
          selectedImage,
        );
      }

      const response =
        await authFetch(
          editingId !== null
            ? `/portfolio/${editingId}`
            : '/portfolio',
          {
            method:
              editingId !== null
                ? 'PATCH'
                : 'POST',

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
                'Gagal menyimpan portfolio',
        );
      }

      resetForm();

      await loadPortfolios();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan portfolio',
      );
    } finally {
      setSaving(false);
    }
  };

  /**
   * ======================================
   * DELETE
   * ======================================
   */
  const handleDelete = async (
    id: number,
  ) => {
    if (
      !window.confirm(
        'Yakin ingin menghapus portfolio ini?',
      )
    ) {
      return;
    }

    try {
      setError('');

      const response =
        await authFetch(
          `/portfolio/${id}`,
          {
            method: 'DELETE',
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            'Gagal menghapus portfolio',
        );
      }

      await loadPortfolios();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus portfolio',
      );
    }
  };

  return (
    <div className="admin-articles-page">
      {/* =================================
          HEADER
         ================================= */}
      <div className="admin-page-heading">
        <div>
          <span>
            PROJECT MANAGEMENT
          </span>

          <h1>
            Portofolio
          </h1>

          <p>
            Kelola project CCTV yang
            tampil di website.
          </p>
        </div>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {/* =================================
          EDITOR
         ================================= */}
      <section className="admin-editor-card">
        <div className="admin-editor-heading">
          <div>
            <span>
              {editingId
                ? 'EDIT PORTFOLIO'
                : 'PORTFOLIO BARU'}
            </span>

            <h2>
              {editingId
                ? 'Edit Portfolio'
                : 'Tambah Portfolio'}
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
          onSubmit={
            handleSubmit
          }
          className="admin-article-form"
        >
          <div className="admin-form-grid">
            <div className="admin-field">
              <label>
                Nama Project
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
                placeholder="Installation CCTV Office"
                required
              />
            </div>

            <div className="admin-field">
              <label>
                Kategori
              </label>

              <select
                value={
                  form.category
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'category',
                    event.target
                      .value,
                  )
                }
              >
                <option value="Rumah">
                  Rumah
                </option>

                <option value="Kantor">
                  Kantor
                </option>

                <option value="Gudang">
                  Gudang
                </option>

                <option value="Toko">
                  Toko
                </option>
              </select>
            </div>

            <div className="admin-field">
              <label>
                Lokasi
              </label>

              <input
                type="text"
                value={
                  form.location
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'location',
                    event.target
                      .value,
                  )
                }
                placeholder="Semarang"
                required
              />
            </div>

            <div className="admin-field">
              <label>
                Jumlah Kamera
              </label>

              <input
                type="number"
                min="1"
                value={
                  form.cameras
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'cameras',
                    event.target
                      .value,
                  )
                }
                required
              />
            </div>

            <div className="admin-field">
              <label>
                Tahun
              </label>

              <input
                type="number"
                min="2000"
                max="2100"
                value={
                  form.year
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'year',
                    event.target
                      .value,
                  )
                }
                required
              />
            </div>
          </div>

          {/* =================================
              IMAGE
             ================================= */}
          <div className="admin-image-uploader">
            <div className="admin-image-uploader-heading">
              <div>
                <label>
                  Foto Project
                </label>

                <p>
                  JPG, PNG, atau WebP.
                  Maksimal 5 MB.
                </p>
              </div>
            </div>

            {imagePreview ? (
              <div className="admin-image-preview-wrapper">
                <div className="admin-image-preview">
                  <img
                    src={
                      imagePreview
                    }
                    alt="Preview portfolio"
                  />
                </div>

                <div className="admin-image-preview-info">
                  <div>
                    <strong>
                      {selectedImage
                        ?.name ??
                        'Foto saat ini'}
                    </strong>

                    <span>
                      {selectedImage
                        ? `${(
                            selectedImage.size /
                            1024 /
                            1024
                          ).toFixed(
                            2,
                          )} MB`
                        : 'Pilih gambar baru untuk mengganti'}
                    </span>
                  </div>

                  <div className="admin-image-actions">
                    <label className="admin-upload-button">
                      Pilih Gambar
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        hidden
                        onChange={(
                          event,
                        ) =>
                          handleImageChange(
                            event.target
                              .files?.[0] ??
                              null,
                          )
                        }
                      />
                    </label>

                    {selectedImage && (
                      <button
                        type="button"
                        className="admin-secondary-button"
                        onClick={() => {
                          setSelectedImage(
                            null,
                          );

                          if (
                            editingId !==
                            null
                          ) {
                            const current =
                              portfolios.find(
                                (
                                  item,
                                ) =>
                                  item.id ===
                                  editingId,
                              );

                            setImagePreview(
                              getImageUrl(
                                current?.image,
                              ),
                            );
                          } else {
                            setImagePreview(
                              null,
                            );
                          }
                        }}
                      >
                        Batalkan Gambar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <label className="admin-dropzone">
                <div className="admin-dropzone-icon">
                  ↑
                </div>

                <strong>
                  Pilih foto project
                </strong>

                <span>
                  Klik untuk memilih
                  file dari komputer.
                </span>

                <small>
                  JPG / PNG / WebP ·
                  Maks. 5 MB
                </small>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(
                    event,
                  ) =>
                    handleImageChange(
                      event.target
                        .files?.[0] ??
                        null,
                    )
                  }
                />
              </label>
            )}
          </div>

          <div className="admin-field">
            <label>
              Deskripsi
            </label>

            <textarea
              rows={7}
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
              placeholder="Deskripsikan project CCTV..."
              required
            />
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
                  : 'Tambah Portfolio'}
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

      {/* =================================
          LIST
         ================================= */}
      <section className="admin-list-card">
        <div className="admin-list-heading">
          <div>
            <span>
              PROJECT DATABASE
            </span>

            <h2>
              Daftar Portfolio
            </h2>
          </div>

          <span className="admin-count">
            {portfolios.length}{' '}
            project
          </span>
        </div>

        {loading ? (
          <div className="admin-empty">
            Memuat portfolio...
          </div>
        ) : portfolios.length ===
          0 ? (
          <div className="admin-empty">
            Belum ada portfolio.
          </div>
        ) : (
          <div className="admin-article-list">
            {portfolios.map(
              (portfolio) => (
                <article
                  key={
                    portfolio.id
                  }
                  className="admin-article-row"
                >
                  <div className="admin-article-image">
                    {portfolio.image ? (
                      <img
                        src={
                          getImageUrl(
                            portfolio.image,
                          ) ??
                          undefined
                        }
                        alt={
                          portfolio.title
                        }
                      />
                    ) : (
                      <span>
                        NO IMAGE
                      </span>
                    )}
                  </div>

                  <div className="admin-article-info">
                    <div className="admin-article-meta">
                      <span>
                        {
                          portfolio.category
                        }
                      </span>

                      <span
                        className={
                          portfolio.isPublished
                            ? 'published'
                            : 'draft'
                        }
                      >
                        {portfolio.isPublished
                          ? 'Published'
                          : 'Draft'}
                      </span>
                    </div>

                    <h3>
                      {
                        portfolio.title
                      }
                    </h3>

                    <p>
                      {
                        portfolio.location
                      }{' '}
                      ·{' '}
                      {
                        portfolio.cameras
                      }{' '}
                      kamera ·{' '}
                      {
                        portfolio.year
                      }
                    </p>

                    <small>
                      {
                        portfolio.description
                      }
                    </small>
                  </div>

                  <div className="admin-row-actions">
                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleEdit(
                          portfolio,
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
                          portfolio.id,
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
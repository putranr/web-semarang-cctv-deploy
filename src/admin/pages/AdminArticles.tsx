import {
  type FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  authFetch,
} from '../../lib/api';

import {
  getArticleImageUrl,
} from '../../lib/publicArticlesApi';

type Article = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string | null;
  publishedAt: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type ArticleForm = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
};

const emptyForm: ArticleForm = {
  title: '',
  slug: '',
  category: '',
  excerpt: '',
  content: '',
  isPublished: true,
};

export default function AdminArticles() {
  const [
    articles,
    setArticles,
  ] = useState<Article[]>([]);

  const [
    form,
    setForm,
  ] = useState<ArticleForm>(
    emptyForm,
  );

  /**
   * File yang dipilih admin.
   */
  const [
    selectedImage,
    setSelectedImage,
  ] = useState<File | null>(
    null,
  );

  /**
   * Preview gambar.
   *
   * Bisa berupa:
   * - object URL dari File baru
   * - URL gambar lama dari backend
   */
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
   * ==================================================
   * LOAD ARTICLES
   * ==================================================
   */
  const loadArticles =
    async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await authFetch(
            '/articles',
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              'Gagal mengambil artikel',
          );
        }

        setArticles(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Gagal mengambil artikel',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadArticles();
  }, []);

  /**
   * ==================================================
   * CLEANUP PREVIEW OBJECT URL
   * ==================================================
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
   * ==================================================
   * UPDATE FORM
   * ==================================================
   */
  const updateForm = (
    field: keyof ArticleForm,
    value: string | boolean,
  ) => {
    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      }),
    );
  };

  /**
   * ==================================================
   * GENERATE SLUG
   * ==================================================
   */
  const generateSlug = (
    title: string,
  ) => {
    return title
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9\s-]/g,
        '',
      )
      .replace(
        /\s+/g,
        '-',
      )
      .replace(
        /-+/g,
        '-',
      );
  };

  /**
   * ==================================================
   * IMAGE SELECT
   * ==================================================
   */
  const handleImageChange = (
    file:
      | File
      | null,
  ) => {
    /**
     * Kalau user membatalkan
     * file selection.
     */
    if (!file) {
      setSelectedImage(null);

      /**
       * Jangan langsung menghapus preview
       * gambar lama ketika user membatalkan
       * file picker.
       */
      return;
    }

    /**
     * Cek tipe file di frontend
     * untuk memberikan feedback cepat.
     *
     * Backend tetap melakukan validasi
     * sebagai pengamanan utama.
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
      setError(
        'Format gambar harus JPG, PNG, atau WebP.',
      );

      return;
    }

    /**
     * Maksimum 5 MB.
     */
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

    /**
     * Simpan file.
     */
    setSelectedImage(file);

    /**
     * Buat preview sementara.
     */
    const previewUrl =
      URL.createObjectURL(
        file,
      );

    setImagePreview(
      previewUrl,
    );
  };

  /**
   * ==================================================
   * REMOVE SELECTED IMAGE
   * ==================================================
   */
  const removeSelectedImage =
    () => {
      setSelectedImage(null);

      /**
       * Saat create,
       * benar-benar kembali ke no image.
       */
      if (
        editingId === null
      ) {
        setImagePreview(null);
      } else {
        /**
         * Saat edit, kembali ke
         * gambar lama.
         */
        const currentArticle =
          articles.find(
            (article) =>
              article.id ===
              editingId,
          );

        setImagePreview(
          getArticleImageUrl(
            currentArticle?.image,
          ),
        );
      }
    };

  /**
   * ==================================================
   * SUBMIT
   * ==================================================
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
       * FormData diperlukan karena
       * kita mengirim text + file.
       */
      const formData =
        new FormData();

      formData.append(
        'title',
        form.title,
      );

      formData.append(
        'slug',
        form.slug,
      );

      formData.append(
        'category',
        form.category,
      );

      formData.append(
        'excerpt',
        form.excerpt,
      );

      formData.append(
        'content',
        form.content,
      );

      formData.append(
        'isPublished',
        String(
          form.isPublished,
        ),
      );

      /**
       * Kalau admin memilih file,
       * masukkan ke FormData dengan nama:
       *
       * image
       *
       * Nama ini harus sama dengan:
       *
       * FileInterceptor('image')
       */
      if (selectedImage) {
        formData.append(
          'image',
          selectedImage,
        );
      }

      const response =
        await authFetch(
          isEditing
            ? `/articles/${editingId}`
            : '/articles',
          {
            method:
              isEditing
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
            ? data.message.join(', ')
            : data.message ??
                'Gagal menyimpan artikel',
        );
      }

      /**
       * Reset editor.
       */
      resetForm();

      /**
       * Reload daftar artikel.
       */
      await loadArticles();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan artikel',
      );
    } finally {
      setSaving(false);
    }
  };

  /**
   * ==================================================
   * EDIT
   * ==================================================
   */
  const handleEdit = (
    article: Article,
  ) => {
    setEditingId(
      article.id,
    );

    setForm({
      title: article.title,
      slug: article.slug,
      category:
        article.category,
      excerpt:
        article.excerpt,
      content:
        article.content,
      isPublished:
        article.isPublished,
    });

    /**
     * Tidak ada file baru
     * sampai admin memilih file.
     */
    setSelectedImage(null);

    /**
     * Tampilkan gambar lama.
     */
    setImagePreview(
      getArticleImageUrl(
        article.image,
      ),
    );

    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * ==================================================
   * DELETE
   * ==================================================
   */
  const handleDelete = async (
    id: number,
  ) => {
    const confirmed =
      window.confirm(
        'Yakin ingin menghapus artikel ini?',
      );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      const response =
        await authFetch(
          `/articles/${id}`,
          {
            method: 'DELETE',
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            'Gagal menghapus artikel',
        );
      }

      await loadArticles();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus artikel',
      );
    }
  };

  /**
   * ==================================================
   * RESET FORM
   * ==================================================
   */
  const resetForm = () => {
    setEditingId(null);

    setForm(
      emptyForm,
    );

    setSelectedImage(null);

    setImagePreview(null);

    setError('');
  };

  return (
    <div className="admin-articles-page">
      {/* ============================================
          HEADER
         ============================================ */}
      <div className="admin-page-heading">
        <div>
          <span>
            CONTENT MANAGEMENT
          </span>

          <h1>
            Artikel
          </h1>

          <p>
            Tambah, edit, publikasikan,
            dan hapus artikel website.
          </p>
        </div>
      </div>

      {/* ============================================
          ERROR
         ============================================ */}
      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {/* ============================================
          EDITOR
         ============================================ */}
      <section className="admin-editor-card">
        <div className="admin-editor-heading">
          <div>
            <span>
              {editingId
                ? 'EDIT ARTIKEL'
                : 'ARTIKEL BARU'}
            </span>

            <h2>
              {editingId
                ? 'Edit Artikel'
                : 'Tambah Artikel'}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={
                resetForm
              }
              className="admin-secondary-button"
            >
              Batal Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="admin-article-form"
        >
          {/* ========================================
              BASIC DATA
             ======================================== */}
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="article-title">
                Judul
              </label>

              <input
                id="article-title"
                type="text"
                value={
                  form.title
                }
                onChange={(
                  event,
                ) => {
                  const title =
                    event.target
                      .value;

                  updateForm(
                    'title',
                    title,
                  );

                  /**
                   * Slug otomatis hanya
                   * ketika membuat baru.
                   */
                  if (
                    editingId ===
                    null
                  ) {
                    updateForm(
                      'slug',
                      generateSlug(
                        title,
                      ),
                    );
                  }
                }}
                placeholder="Judul artikel"
                required
              />
            </div>

            <div className="admin-field">
              <label htmlFor="article-slug">
                Slug
              </label>

              <input
                id="article-slug"
                type="text"
                value={
                  form.slug
                }
                onChange={(
                  event,
                ) =>
                  updateForm(
                    'slug',
                    event.target
                      .value,
                  )
                }
                placeholder="judul-artikel"
                required
              />
            </div>

            <div className="admin-field">
              <label htmlFor="article-category">
                Kategori
              </label>

              <input
                id="article-category"
                type="text"
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
                placeholder="Tips CCTV"
                required
              />
            </div>
          </div>

          {/* ========================================
              IMAGE UPLOADER
             ======================================== */}
          <div className="admin-image-uploader">
            <div className="admin-image-uploader-heading">
              <div>
                <label>
                  Gambar Artikel
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
                    alt="Preview gambar artikel"
                  />
                </div>

                <div className="admin-image-preview-info">
                  {selectedImage ? (
                    <div>
                      <strong>
                        {selectedImage.name}
                      </strong>

                      <span>
                        {(
                          selectedImage.size /
                          1024 /
                          1024
                        ).toFixed(2)}{' '}
                        MB
                      </span>
                    </div>
                  ) : (
                    <div>
                      <strong>
                        Gambar saat ini
                      </strong>

                      <span>
                        Pilih gambar baru
                        untuk menggantinya.
                      </span>
                    </div>
                  )}

                  <div className="admin-image-actions">
                    <label className="admin-upload-button">
                      Pilih Gambar
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(
                          event,
                        ) =>
                          handleImageChange(
                            event.target
                              .files?.[0] ??
                              null,
                          )
                        }
                        hidden
                      />
                    </label>

                    {selectedImage && (
                      <button
                        type="button"
                        className="admin-secondary-button"
                        onClick={
                          removeSelectedImage
                        }
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
                  Pilih gambar artikel
                </strong>

                <span>
                  Klik untuk memilih file
                  dari komputer kamu.
                </span>

                <small>
                  JPG / PNG / WebP · Maks.
                  5 MB
                </small>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(
                    event,
                  ) =>
                    handleImageChange(
                      event.target
                        .files?.[0] ??
                        null,
                    )
                  }
                  hidden
                />
              </label>
            )}
          </div>

          {/* ========================================
              EXCERPT
             ======================================== */}
          <div className="admin-field">
            <label htmlFor="article-excerpt">
              Ringkasan
            </label>

            <textarea
              id="article-excerpt"
              value={
                form.excerpt
              }
              onChange={(
                event,
              ) =>
                updateForm(
                  'excerpt',
                  event.target
                    .value,
                )
              }
              placeholder="Ringkasan artikel..."
              rows={3}
              required
            />
          </div>

          {/* ========================================
              CONTENT
             ======================================== */}
          <div className="admin-field">
            <label htmlFor="article-content">
              Isi Artikel
            </label>

            <textarea
              id="article-content"
              value={
                form.content
              }
              onChange={(
                event,
              ) =>
                updateForm(
                  'content',
                  event.target
                    .value,
                )
              }
              placeholder="Tulis isi artikel..."
              rows={10}
              required
            />
          </div>

          {/* ========================================
              PUBLISH
             ======================================== */}
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
              Publikasikan artikel
            </span>
          </label>

          {/* ========================================
              ACTIONS
             ======================================== */}
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
                  : 'Tambah Artikel'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={
                  resetForm
                }
                className="admin-secondary-button"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ============================================
          ARTICLE LIST
         ============================================ */}
      <section className="admin-list-card">
        <div className="admin-list-heading">
          <div>
            <span>
              ARTICLE DATABASE
            </span>

            <h2>
              Daftar Artikel
            </h2>
          </div>

          <span className="admin-count">
            {articles.length}{' '}
            artikel
          </span>
        </div>

        {loading ? (
          <div className="admin-empty">
            Memuat artikel...
          </div>
        ) : articles.length ===
          0 ? (
          <div className="admin-empty">
            Belum ada artikel.
          </div>
        ) : (
          <div className="admin-article-list">
            {articles.map(
              (article) => (
                <article
                  key={
                    article.id
                  }
                  className="admin-article-row"
                >
                  <div className="admin-article-image">
                    {article.image ? (
                      <img
                        src={
                          getArticleImageUrl(
                            article.image,
                          ) ??
                          undefined
                        }
                        alt={
                          article.title
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
                          article.category
                        }
                      </span>

                      <span
                        className={
                          article.isPublished
                            ? 'published'
                            : 'draft'
                        }
                      >
                        {article.isPublished
                          ? 'Published'
                          : 'Draft'}
                      </span>
                    </div>

                    <h3>
                      {
                        article.title
                      }
                    </h3>

                    <p>
                      {
                        article.excerpt
                      }
                    </p>

                    <small>
                      /{article.slug}
                    </small>
                  </div>

                  <div className="admin-row-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          article,
                        )
                      }
                      className="admin-secondary-button"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          article.id,
                        )
                      }
                      className="admin-danger-button"
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
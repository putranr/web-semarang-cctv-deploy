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
  X,
} from 'lucide-react';

import { authFetch, getAssetUrl } from '../../lib/api';

// ======================================================
// TYPE DATA
// ======================================================

type UsedProduct = {
  id: number;
  name: string;
  productName: string;
  category: string;
  productImage: string | null;
  description: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

// ======================================================
// TYPE FORM
// ======================================================

type ProductForm = {
  name: string;
  productName: string;
  category: string;
  description: string;
  isPublished: boolean;
};

// ======================================================
// EMPTY FORM
// ======================================================

const emptyForm: ProductForm = {
  name: '',
  productName: '',
  category: '',
  description: '',
  isPublished: true,
};

// ======================================================
// BACKEND URL
// ======================================================



// ======================================================
// COMPONENT
// ======================================================

export default function AdminBrandsUsed() {
  // ====================================================
  // DATA
  // ====================================================

  const [
    products,
    setProducts,
  ] = useState<UsedProduct[]>([]);

  // ====================================================
  // FORM
  // ====================================================

  const [
    form,
    setForm,
  ] = useState<ProductForm>(
    emptyForm,
  );

  // ====================================================
  // EDITING
  // ====================================================

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(null);

  // ====================================================
  // PRODUCT IMAGE FILE
  // ====================================================

  const [
    productImageFile,
    setProductImageFile,
  ] = useState<File | null>(null);

  // ====================================================
  // IMAGE PREVIEW
  // ====================================================

  const [
    imagePreview,
    setImagePreview,
  ] = useState<string | null>(null);

  // ====================================================
  // MODAL
  // ====================================================

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  // ====================================================
  // STATE
  // ====================================================

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

  // ====================================================
  // LOAD PRODUCTS
  // ====================================================

  const loadProducts =
    async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await authFetch(
            '/used-brands',
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
                  'Gagal mengambil data produk.',
          );
        }

        setProducts(data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : 'Gagal mengambil data produk.',
        );
      } finally {
        setLoading(false);
      }
    };

  // ====================================================
  // LOAD SAAT HALAMAN DIBUKA
  // ====================================================

  useEffect(() => {
    loadProducts();
  }, []);

  // ====================================================
  // UPDATE FORM
  // ====================================================

  const updateForm = (
    field: keyof ProductForm,
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

  // ====================================================
  // PILIH GAMBAR PRODUK
  // ====================================================

  const handleProductImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // --------------------------------------------------
    // VALIDASI FORMAT
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
        'Gambar produk harus JPG, PNG, atau WebP.',
      );

      event.target.value = '';

      return;
    }

    // --------------------------------------------------
    // VALIDASI UKURAN
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

    // --------------------------------------------------
    // SIMPAN FILE
    // --------------------------------------------------

    setProductImageFile(file);

    // --------------------------------------------------
    // PREVIEW
    // --------------------------------------------------

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(
      previewUrl,
    );
  };

  // ====================================================
  // RESET FORM
  // ====================================================

  const resetForm = () => {
    setForm(
      emptyForm,
    );

    setEditingId(null);

    setProductImageFile(null);

    setImagePreview(null);

    setError('');

    const input =
      document.getElementById(
        'product-image',
      ) as HTMLInputElement | null;

    if (input) {
      input.value = '';
    }
  };

  // ====================================================
  // TAMBAH PRODUK
  // ====================================================

  const handleAdd = () => {
    resetForm();

    setModalOpen(true);
  };

  // ====================================================
  // EDIT PRODUK
  // ====================================================

  const handleEdit = (
    product: UsedProduct,
  ) => {
    setEditingId(
      product.id,
    );

    setForm({
      name:
        product.name,

      productName:
        product.productName,

      category:
        product.category,

      description:
        product.description ?? '',

      isPublished:
        product.isPublished,
    });

    setProductImageFile(
      null,
    );

    // --------------------------------------------------
    // Tampilkan gambar lama
    // --------------------------------------------------

    if (product.productImage) {
      setImagePreview(getAssetUrl(product.productImage));
    } else {
      setImagePreview(null);
    }

    setError('');

    setModalOpen(true);
  };

  // ====================================================
  // TUTUP MODAL
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
    // VALIDASI
    // --------------------------------------------------

    if (!form.name.trim()) {
      setError(
        'Nama brand wajib diisi.',
      );

      return;
    }

    if (
      !form.productName.trim()
    ) {
      setError(
        'Nama produk wajib diisi.',
      );

      return;
    }

    if (
      !form.category.trim()
    ) {
      setError(
        'Kategori produk wajib diisi.',
      );

      return;
    }

    // Saat tambah, gambar wajib ada
    if (
      editingId === null &&
      !productImageFile
    ) {
      setError(
        'Gambar produk wajib diupload.',
      );

      return;
    }

    try {
      setSaving(true);

      setError('');

      // =================================================
      // FORMDATA
      // =================================================

      const formData =
        new FormData();

      // Nama brand
      formData.append(
        'name',
        form.name.trim(),
      );

      // Nama produk
      formData.append(
        'productName',
        form.productName.trim(),
      );

      // Kategori
      formData.append(
        'category',
        form.category.trim(),
      );

      // Deskripsi
      formData.append(
        'description',
        form.description.trim(),
      );

      // Publish
      formData.append(
        'isPublished',
        String(
          form.isPublished,
        ),
      );

      // =================================================
      // GAMBAR PRODUK
      // =================================================

      if (productImageFile) {
        formData.append(
          'productImage',
          productImageFile,
        );
      }

      // =================================================
      // ENDPOINT
      // =================================================

      const endpoint =
        editingId !== null
          ? `/used-brands/${editingId}`
          : '/used-brands';

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
                'Gagal menyimpan produk.',
        );
      }

      // Tutup modal
      setModalOpen(false);

      // Reset
      resetForm();

      // Reload
      await loadProducts();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan produk.',
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
    const confirmed =
      window.confirm(
        'Yakin ingin menghapus produk ini?',
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await authFetch(
          `/used-brands/${id}`,
          {
            method: 'DELETE',
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            'Gagal menghapus produk.',
        );
      }

      await loadProducts();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus produk.',
      );
    }
  };

  // ====================================================
  // TOGGLE PUBLISH
  // ====================================================

  const handleTogglePublish =
    async (
      product: UsedProduct,
    ) => {
      try {
        const formData =
          new FormData();

        formData.append(
          'name',
          product.name,
        );

        formData.append(
          'productName',
          product.productName,
        );

        formData.append(
          'category',
          product.category,
        );

        formData.append(
          'description',
          product.description ?? '',
        );

        formData.append(
          'isPublished',
          String(
            !product.isPublished,
          ),
        );

        const response =
          await authFetch(
            `/used-brands/${product.id}`,
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

        await loadProducts();
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
            PRODUCT MANAGEMENT
          </span>

          <h1>
            Brand yang Kami Gunakan
          </h1>

          <p>
            Kelola brand dan produk yang
            digunakan dalam pengerjaan
            proyek CCTV.
          </p>

        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={handleAdd}
        >
          <Plus size={16} />

          Tambah Produk
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
              USED PRODUCT DATABASE
            </span>

            <h2>
              Daftar Produk
            </h2>

          </div>

          <span className="admin-count">
            {products.length}{' '}
            produk
          </span>

        </div>

        {loading ? (
          <div className="admin-empty">
            Memuat produk...
          </div>
        ) : products.length ===
          0 ? (
          <div className="admin-empty">
            Belum ada produk yang
            ditambahkan.
          </div>
        ) : (
          <div className="admin-brand-list">

            {products.map(
              (product) => (
                <article
                  key={product.id}
                  className="admin-brand-row"
                >

                  {/* =====================================
                      IMAGE
                     ===================================== */}

                  <div className="admin-brand-image">

                    {product.productImage ? (
                      <img
                        src={getAssetUrl(product.productImage) ?? undefined}
                        alt={
                          product.productName
                        }
                      />
                    ) : (
                      <ImagePlus
                        size={26}
                      />
                    )}

                  </div>

                  {/* =====================================
                      INFO
                     ===================================== */}

                  <div className="admin-brand-info">

                    <div className="admin-article-meta">

                      <span>
                        {
                          product.category
                        }
                      </span>

                      <span
                        className={
                          product.isPublished
                            ? 'published'
                            : 'draft'
                        }
                      >
                        {product.isPublished
                          ? 'Published'
                          : 'Draft'}
                      </span>

                    </div>

                    <h3>
                      {
                        product.productName
                      }
                    </h3>

                    <strong
                      className="admin-product-brand"
                    >
                      {
                        product.name
                      }
                    </strong>

                    {product.description && (
                      <p>
                        {
                          product.description
                        }
                      </p>
                    )}

                  </div>

                  {/* =====================================
                      ACTION
                     ===================================== */}

                  <div className="admin-row-actions">

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleTogglePublish(
                          product,
                        )
                      }
                    >
                      {product.isPublished
                        ? 'Sembunyikan'
                        : 'Publish'}
                    </button>

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        handleEdit(
                          product,
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
                          product.id,
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

      
      {/* =================================================
          MODAL TAMBAH / EDIT PRODUK
         ================================================= */}

      {modalOpen && (
        <div className="used-product-modal-backdrop">
          <div
            className="used-product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="used-product-modal-title"
          >
            {/* HEADER MODAL */}
            <div className="used-product-modal-header">
              <div>
                <span className="used-product-eyebrow">
                  USED PRODUCT MANAGEMENT
                </span>

                <h2 id="used-product-modal-title">
                  {editingId !== null
                    ? 'Edit Produk'
                    : 'Tambah Produk'}
                </h2>

                <p>
                  Lengkapi informasi produk yang akan
                  ditampilkan pada website.
                </p>
              </div>

              <button
                type="button"
                className="used-product-close"
                onClick={handleClose}
                disabled={saving}
                aria-label="Tutup formulir"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM PRODUK */}
            <form
              className="used-product-form"
              onSubmit={handleSubmit}
            >
              <div className="used-product-form-grid">
                {/* NAMA BRAND */}
                <div className="used-product-field">
                  <label htmlFor="brand-name">
                    Nama Brand <span>*</span>
                  </label>

                  <input
                    id="brand-name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateForm('name', event.target.value)
                    }
                    placeholder="Contoh: Hikvision"
                    autoComplete="organization"
                    required
                  />
                </div>

                {/* NAMA PRODUK */}
                <div className="used-product-field">
                  <label htmlFor="product-name">
                    Nama Produk <span>*</span>
                  </label>

                  <input
                    id="product-name"
                    type="text"
                    value={form.productName}
                    onChange={(event) =>
                      updateForm(
                        'productName',
                        event.target.value,
                      )
                    }
                    placeholder="Contoh: DS-2CD2043G2-I"
                    required
                  />
                </div>

                {/* KATEGORI */}
                <div className="used-product-field used-product-field-full">
                  <label htmlFor="product-category">
                    Kategori Produk <span>*</span>
                  </label>

                  <input
                    id="product-category"
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      updateForm('category', event.target.value)
                    }
                    placeholder="Contoh: Kamera IP"
                    required
                  />

                  <small>
                    Contoh: Kamera IP, Kamera Analog, DVR / NVR,
                    Hard Disk, Access Point, atau Aksesori.
                  </small>
                </div>

                {/* DESKRIPSI */}
                <div className="used-product-field used-product-field-full">
                  <label htmlFor="product-description">
                    Deskripsi Produk
                  </label>

                  <textarea
                    id="product-description"
                    rows={4}
                    value={form.description}
                    onChange={(event) =>
                      updateForm(
                        'description',
                        event.target.value,
                      )
                    }
                    placeholder="Jelaskan fungsi, spesifikasi, dan keunggulan produk..."
                  />

                  <small>
                    Tulis deskripsi singkat yang mudah dipahami
                    calon pelanggan.
                  </small>
                </div>

                {/* UPLOAD GAMBAR */}
                <div className="used-product-field used-product-field-full">
                  <label htmlFor="product-image">
                    Gambar Produk{' '}
                    {editingId === null && <span>*</span>}
                  </label>

                  <div className="used-product-upload">
                    <div className="used-product-upload-icon">
                      <ImagePlus size={24} />
                    </div>

                    <div className="used-product-upload-info">
                      <strong>
                        {productImageFile
                          ? productImageFile.name
                          : 'Pilih gambar produk'}
                      </strong>

                      <small>
                        JPG, PNG, atau WebP. Maksimal 5 MB.
                      </small>
                    </div>

                    <label
                      htmlFor="product-image"
                      className="used-product-upload-button"
                    >
                      Pilih File
                    </label>

                    <input
                      id="product-image"
                      className="used-product-file-input"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleProductImageChange}
                      required={
                        editingId === null &&
                        !productImageFile
                      }
                    />
                  </div>

                  {editingId !== null && (
                    <small>
                      Kosongkan jika ingin tetap menggunakan
                      gambar sebelumnya.
                    </small>
                  )}
                </div>

                {/* PREVIEW GAMBAR */}
                {imagePreview && (
                  <div className="used-product-field used-product-field-full">
                    <label>Preview Gambar</label>

                    <div className="used-product-preview">
                      <img
                        src={imagePreview}
                        alt="Preview gambar produk"
                      />

                      <div className="used-product-preview-info">
                        <strong>
                          {productImageFile
                            ? 'Gambar baru'
                            : 'Gambar saat ini'}
                        </strong>

                        <small>
                          Gambar ini akan digunakan untuk produk.
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* STATUS PUBLISH */}
              <div className="used-product-publish">
                <div className="used-product-publish-copy">
                  <strong>Tampilkan di website</strong>

                  <span>
                    {form.isPublished
                      ? 'Produk akan ditampilkan kepada pengunjung.'
                      : 'Produk disimpan sebagai draft dan disembunyikan.'}
                  </span>
                </div>

                <label className="used-product-switch">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(event) =>
                      updateForm(
                        'isPublished',
                        event.target.checked,
                      )
                    }
                    aria-label="Tampilkan produk di website"
                  />

                  <span className="used-product-switch-slider" />
                </label>
              </div>

              {/* ERROR VALIDASI */}
              {error && (
                <div className="used-product-form-error" role="alert">
                  {error}
                </div>
              )}

              {/* TOMBOL AKSI */}
              <div className="used-product-form-actions">
                <button
                  type="button"
                  className="used-product-button used-product-button-secondary"
                  onClick={handleClose}
                  disabled={saving}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="used-product-button used-product-button-primary"
                  disabled={saving}
                >
                  {saving
                    ? 'Menyimpan...'
                    : editingId !== null
                      ? 'Simpan Perubahan'
                      : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
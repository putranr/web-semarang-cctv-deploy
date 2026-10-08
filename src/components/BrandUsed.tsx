import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ArrowRight,
  Search,
  ImageOff,
} from 'lucide-react';

import {
  getPublicUsedBrands,
  getUsedProductImageUrl,
  type PublicUsedProduct,
} from '../lib/publicBrandsUsedApi';

export function BrandUsed() {
  // =====================================================
  // DATA
  // =====================================================

  const [
    products,
    setProducts,
  ] = useState<
    PublicUsedProduct[]
  >([]);

  // =====================================================
  // SEARCH
  // =====================================================

  const [
    search,
    setSearch,
  ] = useState('');

  // =====================================================
  // CATEGORY
  // =====================================================

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(
    'Semua',
  );

  // =====================================================
  // SEE ALL
  // =====================================================

  const [
    showAllProducts,
    setShowAllProducts,
  ] = useState(false);

  // =====================================================
  // LOADING
  // =====================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =====================================================
  // ERROR
  // =====================================================

  const [
    error,
    setError,
  ] = useState('');

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    const loadProducts =
      async () => {
        try {
          setLoading(true);

          setError('');

          const data =
            await getPublicUsedBrands();

          setProducts(data);
        } catch (error) {
          console.error(
            error,
          );

          setError(
            'Produk belum dapat dimuat.',
          );
        } finally {
          setLoading(false);
        }
      };

    loadProducts();
  }, []);

  // =====================================================
  // CATEGORY LIST
  // =====================================================

  const categories =
    useMemo(() => {
      const values =
        products
          .map(
            (product) =>
              product.category,
          )
          .filter(Boolean);

      return [
        'Semua',
        ...Array.from(
          new Set(values),
        ),
      ];
    }, [products]);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredProducts =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {
          const matchesSearch =
            !keyword ||
            product.name
              .toLowerCase()
              .includes(
                keyword,
              ) ||
            product.productName
              .toLowerCase()
              .includes(
                keyword,
              ) ||
            product.category
              .toLowerCase()
              .includes(
                keyword,
              );

          const matchesCategory =
            selectedCategory ===
              'Semua' ||
            product.category ===
              selectedCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        },
      );
    }, [
      products,
      search,
      selectedCategory,
    ]);

  // =====================================================
  // DISPLAY
  // =====================================================

  const shouldShowAll =
    showAllProducts ||
    search.trim() !== '' ||
    selectedCategory !==
      'Semua';

  const displayedProducts =
    shouldShowAll
      ? filteredProducts
      : filteredProducts.slice(
          0,
          3,
        );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      id="brand-used"
      className="brand-used-section"
    >
      <div className="brand-used-container">

        {/* ===============================================
            HEADER
           =============================================== */}

        <div className="brand-used-heading">

          <div>

            <span className="section-label">
              PRODUCTS WE USE
            </span>

            <h2>
              Brand yang Kami Gunakan
            </h2>

            <p className="section-description">
              Temukan brand dan produk yang kami
              gunakan untuk kebutuhan instalasi
              sistem keamanan dan CCTV.
            </p>

          </div>

          {!loading &&
            !error &&
            products.length > 3 && (
              <button
                type="button"
                className="see-all-button"
                onClick={() =>
                  setShowAllProducts(
                    !showAllProducts,
                  )
                }
              >
                {showAllProducts
                  ? 'Show Less'
                  : 'See All'}

                <ArrowRight
                  size={16}
                />
              </button>
            )}

        </div>

        {/* ===============================================
            SEARCH + CATEGORY
           =============================================== */}

        {!loading &&
          !error &&
          products.length > 0 && (
            <div className="brand-used-tools">

              {/* SEARCH */}

              <div className="brand-used-search">

                <Search
                  size={17}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.target.value,
                    );

                    setShowAllProducts(
                      true,
                    );
                  }}
                  placeholder="Cari brand atau produk..."
                  aria-label="Cari brand atau produk"
                />

              </div>

              {/* CATEGORY */}

              <select
                value={
                  selectedCategory
                }
                onChange={(
                  event,
                ) => {
                  setSelectedCategory(
                    event.target.value,
                  );

                  setShowAllProducts(
                    true,
                  );
                }}
                className="brand-used-category"
                aria-label="Filter kategori"
              >
                {categories.map(
                  (category) => (
                    <option
                      key={
                        category
                      }
                      value={
                        category
                      }
                    >
                      {category}
                    </option>
                  ),
                )}
              </select>

            </div>
          )}

        {/* ===============================================
            LOADING
           =============================================== */}

        {loading && (
          <div className="brand-used-state">
            Memuat produk...
          </div>
        )}

        {/* ===============================================
            ERROR
           =============================================== */}

        {!loading &&
          error && (
            <div className="brand-used-state">
              {error}
            </div>
          )}

        {/* ===============================================
            EMPTY
           =============================================== */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="brand-used-state">
              Belum ada produk yang
              dipublikasikan.
            </div>
          )}

        {/* ===============================================
            NO SEARCH RESULT
           =============================================== */}

        {!loading &&
          !error &&
          products.length > 0 &&
          filteredProducts.length ===
            0 && (
            <div className="brand-used-state">
              Produk yang kamu cari tidak
              ditemukan.
            </div>
          )}

        {/* ===============================================
            PRODUCT CARDS
           =============================================== */}

        {!loading &&
          !error &&
          displayedProducts.length >
            0 && (
            <div
              className={
                shouldShowAll
                  ? 'brand-used-grid brand-used-all'
                  : 'brand-used-grid brand-used-horizontal'
              }
            >

              {displayedProducts.map(
                (product) => {
                  const imageUrl =
                    getUsedProductImageUrl(
                      product.productImage,
                    );

                  return (
                    <article
                      key={
                        product.id
                      }
                      className="brand-used-card"
                    >

                      {/* IMAGE */}

                      <div className="brand-used-card-image">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              product.productName
                            }
                          />
                        ) : (
                          <ImageOff
                            size={34}
                          />
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="brand-used-card-content">

                        <div className="brand-used-card-meta">

                          <span className="brand-used-category-badge">
                            {
                              product.category
                            }
                          </span>

                        </div>

                        <h3>
                          {
                            product.productName
                          }
                        </h3>

                        <strong className="brand-used-brand-name">
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

                    </article>
                  );
                },
              )}

            </div>
          )}

      </div>
    </section>
  );
}
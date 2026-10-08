import {
  useEffect,
  useState,
} from 'react';

import { ArticleCard } from './ArticleCard';
import { ArticleModal } from './ArticleModal';

import type { Article } from '../data/articles';

import {
  fetchPublicArticles,
  formatArticleDate,
  getArticleImageUrl,
} from '../lib/publicArticlesApi';

type PublicArticle = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string | null;
  publishedAt: string;
};

/**
 * Mengubah format artikel API
 * menjadi format yang saat ini
 * digunakan ArticleCard / ArticleModal.
 *
 * Ini hanya adapter sementara.
 */
function mapToExistingArticle(
  article: PublicArticle,
): Article {
  return {
    title: article.title,
    category: article.category,

    date: formatArticleDate(
      article.publishedAt,
    ),

    /**
     * Gunakan logo sebagai fallback
     * kalau artikel belum memiliki gambar.
     */
image:
  getArticleImageUrl(
    article.image,
  ) ??
  '/images/logo.png',

    excerpt: article.excerpt,
    content: article.content,
  };
}

export function PublicArticlesSection() {
  /**
   * Data artikel.
   */
  const [articles, setArticles] =
    useState<
      PublicArticle[]
    >([]);

  /**
   * Loading state.
   */
  const [loading, setLoading] =
    useState(true);

  /**
   * Error state.
   */
  const [error, setError] =
    useState('');

  /**
   * Mode homepage preview atau
   * mode semua artikel.
   */
  const [
    showAllArticles,
    setShowAllArticles,
  ] = useState(false);

  /**
   * Pagination.
   */
  const [page, setPage] =
    useState(1);

  const [
    totalPages,
    setTotalPages,
  ] = useState(0);

  /**
   * Search.
   */
  const [
    search,
    setSearch,
  ] = useState('');

  /**
   * Filter kategori.
   */
  const [
    category,
    setCategory,
  ] = useState('');

  /**
   * Sorting.
   */
  const [
    sort,
    setSort,
  ] = useState<
    | 'newest'
    | 'oldest'
    | 'title-asc'
    | 'title-desc'
  >('newest');

  /**
   * Artikel yang sedang dibuka
   * pada modal.
   */
  const [
    selectedArticle,
    setSelectedArticle,
  ] =
    useState<Article | null>(
      null,
    );

  /**
   * Ambil artikel dari API.
   */
  useEffect(() => {
    const loadArticles =
      async () => {
        try {
          setLoading(true);
          setError('');

          /**
           * Homepage:
           * 3 artikel.
           *
           * Mode semua:
           * 6 artikel per halaman.
           */
          const limit =
            showAllArticles
              ? 6
              : 3;

          const response =
            await fetchPublicArticles({
              page,
              limit,
              search,
              category,
              sort,
            });

          setArticles(
            response.data,
          );

          setTotalPages(
            response.meta
              .totalPages,
          );
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

    loadArticles();
  }, [
    page,
    search,
    category,
    sort,
    showAllArticles,
  ]);

  /**
   * Ketika user memilih pencarian,
   * filter, atau sorting,
   * kembali ke halaman pertama.
   */
  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setPage(1);
    setShowAllArticles(true);
  };

  const handleCategoryChange = (
    value: string,
  ) => {
    setCategory(value);
    setPage(1);
    setShowAllArticles(true);
  };

  const handleSortChange = (
    value:
      | 'newest'
      | 'oldest'
      | 'title-asc'
      | 'title-desc',
  ) => {
    setSort(value);
    setPage(1);
    setShowAllArticles(true);
  };

  /**
   * Buka artikel modal.
   */
  const handleOpenArticle = (
    article: PublicArticle,
  ) => {
    setSelectedArticle(
      mapToExistingArticle(
        article,
      ),
    );
  };

  return (
    <>
      <section
        id="articles"
        className="public-articles-section"
      >
        <div className="public-articles-container">
          {/* =========================
              HEADING
             ========================= */}
          <div className="public-articles-heading">
            <div>
              <span>
                ARTIKEL & INSIGHT
              </span>

              <h2>
                Pengetahuan Keamanan
              </h2>

              <p>
                Informasi, tips, dan
                insight seputar CCTV
                dan sistem keamanan.
              </p>
            </div>

            {!showAllArticles && (
              <button
                type="button"
                className="public-articles-see-all"
                onClick={() => {
                  setShowAllArticles(
                    true,
                  );
                  setPage(1);
                }}
              >
                See All Articles →
              </button>
            )}
          </div>

          {/* =========================
              FILTERS
             ========================= */}
          {showAllArticles && (
            <div className="public-articles-filters">
              <input
                type="search"
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value,
                  )
                }
                placeholder="Cari artikel..."
              />

              <select
                value={category}
                onChange={(event) =>
                  handleCategoryChange(
                    event.target.value,
                  )
                }
              >
                <option value="">
                  Semua Kategori
                </option>

                {/* 
                  Untuk sementara kategori
                  belum diambil dari API.
                */}
                <option value="Tips CCTV">
                  Tips CCTV
                </option>

                <option value="Teknologi">
                  Teknologi
                </option>

                <option value="Keamanan">
                  Keamanan
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>
              </select>

              <select
                value={sort}
                onChange={(event) =>
                  handleSortChange(
                    event.target
                      .value as
                      | 'newest'
                      | 'oldest'
                      | 'title-asc'
                      | 'title-desc',
                  )
                }
              >
                <option value="newest">
                  Terbaru
                </option>

                <option value="oldest">
                  Terlama
                </option>

                <option value="title-asc">
                  Judul A-Z
                </option>

                <option value="title-desc">
                  Judul Z-A
                </option>
              </select>

              <button
                type="button"
                className="public-articles-close-all"
                onClick={() => {
                  setShowAllArticles(
                    false,
                  );

                  setPage(1);
                  setSearch('');
                  setCategory('');
                  setSort('newest');
                }}
              >
                Kembali
              </button>
            </div>
          )}

          {/* =========================
              ERROR
             ========================= */}
          {error && (
            <div className="public-articles-error">
              {error}
            </div>
          )}

          {/* =========================
              LOADING
             ========================= */}
          {loading ? (
            <div className="public-articles-status">
              Memuat artikel...
            </div>
          ) : articles.length ===
            0 ? (
            <div className="public-articles-status">
              Belum ada artikel yang
              cocok dengan pencarian.
            </div>
          ) : (
            <>
              {/* =========================
                  ARTICLE LIST
                 ========================= */}
              <div
                className={
                  showAllArticles
                    ? 'public-articles-grid'
                    : 'public-articles-row'
                }
              >
                {articles.map(
                  (article) => (
                    <ArticleCard
                      key={article.id}
                      article={mapToExistingArticle(
                        article,
                      )}
                      onClick={() =>
                        handleOpenArticle(
                          article,
                        )
                      }
                    />
                  ),
                )}
              </div>

              {/* =========================
                  PAGINATION
                 ========================= */}
              {showAllArticles &&
                totalPages > 1 && (
                  <div className="public-articles-pagination">
                    <button
                      type="button"
                      disabled={
                        page === 1
                      }
                      onClick={() =>
                        setPage(
                          (current) =>
                            current - 1,
                        )
                      }
                    >
                      ← Sebelumnya
                    </button>

                    <span>
                      Halaman {page}{' '}
                      dari{' '}
                      {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={
                        page ===
                        totalPages
                      }
                      onClick={() =>
                        setPage(
                          (current) =>
                            current + 1,
                        )
                      }
                    >
                      Berikutnya →
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </section>

      {/* =========================
          ARTICLE MODAL
         ========================= */}
      <ArticleModal
        article={
          selectedArticle
        }
        onClose={() =>
          setSelectedArticle(
            null,
          )
        }
      />
    </>
  );
}
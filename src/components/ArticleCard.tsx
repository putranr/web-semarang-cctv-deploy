// ======================================================
// ARTICLE CARD
// ======================================================
//
// Component ini bertugas menampilkan SATU kartu artikel.
//
// Data artikel berasal dari articles.ts
// dan dikirim melalui props.
// ======================================================


import {
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import type { Article } from "../data/articles";


// ======================================================
// PROPS
// ======================================================
//
// Kita menerima:
// 1. article → data artikel
// 2. onClick → fungsi ketika kartu diklik
// ======================================================

type ArticleCardProps = {

  article: Article;

  onClick: () => void;

};


// ======================================================
// COMPONENT
// ======================================================

export function ArticleCard({

  article,

  onClick,

}: ArticleCardProps) {


  return (

    <article
      className="article-card"
      onClick={onClick}
    >


      {/* ==================================================
          GAMBAR ARTIKEL
          ================================================== */}

      <div className="article-image">

        <img
          src={article.image}
          alt={article.title}
        />


        {/* Overlay ketika hover */}

        <div className="article-overlay">

          <div className="article-view">

            Baca Artikel

            <ArrowUpRight size={17} />

          </div>

        </div>

      </div>


      {/* ==================================================
          INFORMASI ARTIKEL
          ================================================== */}

      <div className="article-content">


        {/* KATEGORI */}

        <span className="article-category">

          {article.category}

        </span>


        {/* JUDUL */}

        <h3>

          {article.title}

        </h3>


        {/* RINGKASAN */}

        <p>

          {article.excerpt}

        </p>


        {/* =================================================
            FOOTER CARD
            ================================================= */}

        <div className="article-meta">


          <div>

            <CalendarDays size={14} />

            {article.date}

          </div>


          <ArrowUpRight size={16} />

        </div>


      </div>

    </article>

  );

}
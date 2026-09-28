// ======================================================
// ARTICLE MODAL
// ======================================================

import {
  X,
  CalendarDays,
} from "lucide-react";

import type {
  Article,
} from "../data/articles";


// ======================================================
// PROPS
// ======================================================

type ArticleModalProps = {

  article: Article | null;

  onClose: () => void;

};


// ======================================================
// COMPONENT
// ======================================================

export function ArticleModal({

  article,

  onClose,

}: ArticleModalProps) {


  // Tidak ada artikel
  if (!article) {

    return null;

  }


  return (

    <div
      className="article-modal-backdrop"

      onClick={onClose}
    >


      <article
        className="article-modal"

        onClick={(event) =>
          event.stopPropagation()
        }
      >


        {/* =================================================
            CLOSE
            ================================================= */}

        <button

          className="article-modal-close"

          onClick={onClose}

          aria-label="Tutup artikel"
        >

          <X size={20} />

        </button>


        {/* =================================================
            IMAGE
            ================================================= */}

        <div className="article-modal-image">

          <img

            src={article.image}

            alt={article.title}

          />

        </div>


        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="article-modal-content">


          <span className="article-category">

            {article.category}

          </span>


          <h2>

            {article.title}

          </h2>


          <div className="article-modal-date">

            <CalendarDays size={15} />

            {article.date}

          </div>


          {/* =================================================
              ARTICLE BODY
              ================================================= */}

          <div className="article-body">

            <p>

              {article.content}

            </p>

          </div>


        </div>

      </article>

    </div>

  );

}
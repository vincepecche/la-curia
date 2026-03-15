import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import { formatDate } from "@/lib/utils";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <Link
      href={`/articolo/${article.slug.current}`}
      className="article-list-item"
    >
      <div>
        {article.category && (
          <span
            className="category-tag"
            style={{ color: article.category.color }}
          >
            {article.category.title}
          </span>
        )}
        <div className="list-item-title">{article.title}</div>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-meta">
          <span>{article.author?.name}</span>
          <span className="meta-divider" />
          <span>{formatDate(article.publishedAt)}</span>
          {article.readTime && (
            <>
              <span className="meta-divider" />
              <span>{article.readTime}</span>
            </>
          )}
        </div>
      </div>
      {article.mainImage ? (
        <img
          className="list-item-img"
          src={urlFor(article.mainImage).width(320).height(220).url()}
          alt={article.mainImage.alt || article.title}
        />
      ) : (
        <div className="no-img-placeholder">❝</div>
      )}
    </Link>
  );
}

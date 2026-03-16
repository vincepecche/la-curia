import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ArticleCard from "@/components/ArticleCard";
import { getFeaturedArticles, getLatestArticles, getAllArticles } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { formatDate } from "@/lib/utils";

export const revalidate = 60; // Ricarica i dati ogni 60 secondi

export default async function HomePage() {
  const [featured, latest, allArticles] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(),
    getAllArticles(),
  ]);

  const main = featured[0];
  const side = featured[1];
  const sidebarArticles = allArticles.slice(0, 4);

  return (
    <>
      <Header />

      {/* Breaking bar */}
      {main && (
        <div className="breaking-bar">
          <span className="breaking-label">Ultima Ora</span>
          <div className="breaking-scroll">
            <span className="breaking-text">
              {allArticles
                .slice(0, 3)
                .map((a: any) => a.title)
                .join(" — ")}
            </span>
          </div>
        </div>
      )}

      <div className="content-area">
        {/* Featured section */}
        {main && (
          <div className="featured-section">
            <Link
              href={`/articolo/${main.slug.current}`}
              className="featured-main"
            >
              {main.mainImage && (
                <img
                  className="featured-main-img"
                  src={urlFor(main.mainImage).width(800).height(520).url()}
                  alt={main.mainImage.alt || main.title}
                />
              )}
              {main.category && (
                <span
                  className="category-tag"
                  style={{ color: main.category.color }}
                >
                  {main.category.title}
                </span>
              )}
              <div className="featured-main-title">{main.title}</div>
              <p className="article-excerpt">{main.excerpt}</p>
              <div className="article-meta">
                <span>{main.author?.name}</span>
                <span className="meta-divider" />
                <span>{formatDate(main.publishedAt)}</span>
                {main.readTime && (
                  <>
                    <span className="meta-divider" />
                    <span>{main.readTime} di lettura</span>
                  </>
                )}
              </div>
            </Link>

            {side && (
              <Link
                href={`/articolo/${side.slug.current}`}
                className="featured-side"
              >
                {side.mainImage && (
                  <img
                    className="featured-side-img"
                    src={urlFor(side.mainImage).width(600).height(360).url()}
                    alt={side.mainImage.alt || side.title}
                  />
                )}
                {side.category && (
                  <span
                    className="category-tag"
                    style={{ color: side.category.color }}
                  >
                    {side.category.title}
                  </span>
                )}
                <div className="featured-side-title">{side.title}</div>
                <p className="article-excerpt">{side.excerpt}</p>
                <div className="article-meta">
                  <span>{side.author?.name}</span>
                  <span className="meta-divider" />
                  <span>{formatDate(side.publishedAt)}</span>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Main content + sidebar */}
        <div className="home-grid">
          <div className="home-main">
            <div className="section-header">
              Ultime Notizie
              <span className="section-header-line" />
            </div>
            {latest.length > 0 ? (
              latest.map((article: any) => (
                <ArticleCard key={article._id} article={article} />
              ))
            ) : (
              <div className="empty-state">
                <h2>Nessun articolo ancora</h2>
                <p>
                  Gli articoli appariranno qui non appena verranno pubblicati
                  nel pannello Sanity.
                </p>
              </div>
            )}
          </div>

          <div className="home-sidebar">
            <Newsletter />
            {sidebarArticles.length > 0 && (
              <div className="sidebar-section">
                <h4>Più letti</h4>
                {sidebarArticles.map((article: any, i: number) => (
                  <Link
                    key={article._id}
                    href={`/articolo/${article.slug.current}`}
                    className="sidebar-article"
                  >
                    <div className="sidebar-article-title">
                      <span className="sidebar-article-num">{i + 1}</span>
                      {article.title}
                    </div>
                    <div className="sidebar-article-meta">
                      {article.author?.name} · {article.readTime}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

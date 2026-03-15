import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
 
export const revalidate = 60;
 
type Props = {
  params: { slug: string };
};
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Articolo non trovato" };
  return {
    title: `${article.title} — La Curia`,
    description: article.excerpt,
  };
}
 
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((s: any) => ({ slug: s.slug }));
}
 
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure style={{ margin: "1.5em 0" }}>
          <img
            src={urlFor(value).width(720).url()}
            alt={value.caption || ""}
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption && (
            <figcaption
              style={{
                fontFamily: "var(--sans)",
                fontSize: 12,
                color: "var(--text-secondary)",
                marginTop: 8,
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
 
export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
 
  if (!article) notFound();
 
  return (
    <>
      <Header />
      <article className="article-view">
        <Link href="/" className="back-link">
          ← Torna alla home
        </Link>
 
        {article.category && (
          <div
            className="article-view-category"
            style={{ color: article.category.color }}
          >
            {article.category.title}
          </div>
        )}
 
        <h1>{article.title}</h1>
 
        <p className="article-view-excerpt">{article.excerpt}</p>
 
        <div className="article-view-meta">
          <strong>{article.author?.name}</strong>
          <span className="meta-divider" />
          <span>{article.author?.role}</span>
          <span className="meta-divider" />
          <span>{formatDate(article.publishedAt)}</span>
          {article.readTime && (
            <>
              <span className="meta-divider" />
              <span>{article.readTime} di lettura</span>
            </>
          )}
        </div>
 
        {article.mainImage && (
          <img
            className="article-view-hero"
            src={urlFor(article.mainImage).width(1200).height(600).url()}
            alt={article.mainImage.alt || article.title}
          />
        )}
 
        {article.body && (
          <div className="article-body">
            <PortableText
              value={article.body}
              components={portableTextComponents}
            />
          </div>
        )}
      </article>
      <Footer />
    </>
  );
}
 

import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, getCategoryBySlug, getAllCategories } from "@/lib/sanity.queries";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return { title: "Categoria non trovata" };
  return {
    title: `${category.title} — La Curia`,
    description: `Tutti gli articoli nella sezione ${category.title}`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c: any) => ({ slug: c.slug.current }));
}

export default async function CategoryPage({ params }: Props) {
  const [category, articles] = await Promise.all([
    getCategoryBySlug(params.slug),
    getArticlesByCategory(params.slug),
  ]);

  if (!category) notFound();

  return (
    <>
      <Header />
      <div className="content-area">
        <div className="section-header" style={{ borderBottomColor: category.color }}>
          <span style={{ color: category.color }}>{category.title}</span>
          <span className="section-header-line" />
        </div>

        {articles.length > 0 ? (
          articles.map((article: any) => (
            <ArticleCard key={article._id} article={article} />
          ))
        ) : (
          <div className="empty-state">
            <h2>Nessun articolo in questa categoria</h2>
            <p>
              Gli articoli appariranno qui non appena verranno pubblicati con
              la categoria &ldquo;{category.title}&rdquo;.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

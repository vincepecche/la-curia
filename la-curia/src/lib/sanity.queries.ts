import { client } from "./sanity.client";

// Tutti gli articoli (homepage)
export async function getAllArticles() {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      featured,
      readTime,
      tipo,
      publishedAt,
      "category": category->{title, slug, color},
      "author": author->{name, role, slug}
    }
  `);
}

// Articoli in evidenza
export async function getFeaturedArticles() {
  return client.fetch(`
    *[_type == "article" && featured == true] | order(publishedAt desc) [0...2] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      featured,
      readTime,
      tipo,
      publishedAt,
      "category": category->{title, slug, color},
      "author": author->{name, role, slug}
    }
  `);
}

// Articoli non in evidenza
export async function getLatestArticles() {
  return client.fetch(`
    *[_type == "article" && featured != true] | order(publishedAt desc) [0...20] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      readTime,
      tipo,
      publishedAt,
      "category": category->{title, slug, color},
      "author": author->{name, role, slug}
    }
  `);
}

// Singolo articolo per slug
export async function getArticleBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      mainImage,
      readTime,
      tipo,
      publishedAt,
      "category": category->{title, slug, color},
      "author": author->{name, role, slug, bio, image}
    }
  `,
    { slug }
  );
}

// Tutti gli slug degli articoli (per generazione statica)
export async function getAllArticleSlugs() {
  return client.fetch(`
    *[_type == "article" && defined(slug.current)]{
      "slug": slug.current
    }
  `);
}

// Articoli per categoria
export async function getArticlesByCategory(categorySlug: string) {
  return client.fetch(
    `
    *[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      readTime,
      tipo,
      publishedAt,
      "category": category->{title, slug, color},
      "author": author->{name, role, slug}
    }
  `,
    { categorySlug }
  );
}

// Tutte le categorie
export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] | order(order asc) {
      _id,
      title,
      slug,
      color,
      order
    }
  `);
}

// Singola categoria per slug
export async function getCategoryBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      color
    }
  `,
    { slug }
  );
}

// Tutti gli autori
export async function getAllAuthors() {
  return client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      role,
      bio,
      image
    }
  `);
}

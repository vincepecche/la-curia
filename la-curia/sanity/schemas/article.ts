import { defineType, defineField } from "sanity";

export default defineType({
  name: "article",
  title: "Articolo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 120 },
      validation: (Rule) => Rule.required(),
      description: "Clicca 'Generate' per creare automaticamente dall'titolo",
    }),
    defineField({
      name: "excerpt",
      title: "Sommario",
      type: "text",
      rows: 3,
      description: "Breve descrizione dell'articolo, visibile in homepage",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "body",
      title: "Corpo dell'articolo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normale", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citazione", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Grassetto", value: "strong" },
              { title: "Corsivo", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Didascalia",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Immagine principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Testo alternativo",
          description: "Descrizione dell'immagine per accessibilità",
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autore",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data di pubblicazione",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      type: "boolean",
      description: "Mostra questo articolo nella sezione in evidenza della homepage",
      initialValue: false,
    }),
    defineField({
      name: "readTime",
      title: "Tempo di lettura",
      type: "string",
      description: "Es: 5 min",
    }),
  ],
  orderings: [
    {
      title: "Data di pubblicazione (recenti prima)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      category: "category.title",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, author, category, media } = selection;
      return {
        title,
        subtitle: `${category || "Senza categoria"} — ${author || "Senza autore"}`,
        media,
      };
    },
  },
});

import { defineType, defineField } from "sanity";

export default defineType({
  name: "author",
  title: "Autore",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome completo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Ruolo in redazione",
      type: "string",
      description: "Es: Caporedattrice Giustizia, Inviato Politico...",
    }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});

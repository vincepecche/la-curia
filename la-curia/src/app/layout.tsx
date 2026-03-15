import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Curia — Politica, Giustizia, Attualità",
  description:
    "Quotidiano indipendente di politica, giustizia e attualità. Analisi, commenti e approfondimenti.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}

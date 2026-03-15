import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllAuthors } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Redazione — La Curia",
  description: "Scopri chi siamo: la redazione de La Curia.",
};

export const revalidate = 60;

export default async function ChiSiamoPage() {
  const authors = await getAllAuthors();

  return (
    <>
      <Header />
      <div className="about-page">
        <h1>La Redazione</h1>
        <p className="about-intro">
          La Curia nasce dalla convinzione che un&apos;informazione rigorosa,
          indipendente e accessibile sia il fondamento di ogni democrazia sana.
          La nostra redazione riunisce giornalisti con esperienza nel racconto
          della politica, della giustizia e dell&apos;economia italiana, con
          l&apos;obiettivo di offrire ai lettori analisi approfondite e punti di
          vista autorevoli sui temi che contano.
        </p>

        {authors.length > 0 ? (
          <div>
            {authors.map((author: any) => (
              <div key={author._id} className="team-member">
                <div className="team-avatar">
                  {author.image ? (
                    <img
                      src={urlFor(author.image).width(144).height(144).url()}
                      alt={author.name}
                    />
                  ) : (
                    author.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                  )}
                </div>
                <div>
                  <div className="team-name">{author.name}</div>
                  {author.role && <div className="team-role">{author.role}</div>}
                  {author.bio && <div className="team-bio">{author.bio}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>La redazione è in arrivo</h2>
            <p>
              I profili dei redattori appariranno qui non appena verranno
              inseriti nel pannello Sanity.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { getAllCategories } from "@/lib/sanity.queries";

export default async function Footer() {
  const categories = await getAllCategories();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>LA CURIA</h3>
          <p>
            Quotidiano indipendente di politica, giustizia e attualità.
          </p>
        </div>
        <div className="footer-links">
          <h4>Sezioni</h4>
          <ul>
            {categories.map((cat: any) => (
              <li key={cat._id}>
                <Link href={`/categoria/${cat.slug.current}`}>{cat.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/chi-siamo">Chi Siamo</Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contatti</h4>
          <p>redazione@lacuria.it</p>
          <p>Roma, Italia</p>
          <p style={{ marginTop: 12, fontSize: 11, color: "#555" }}>
            Testata giornalistica — Roma
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} La Curia — Tutti i diritti riservati
      </div>
    </footer>
  );
}

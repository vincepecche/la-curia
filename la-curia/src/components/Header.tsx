import Link from "next/link";
import { getAllCategories } from "@/lib/sanity.queries";
import { getTodayFormatted } from "@/lib/utils";

export default async function Header() {
  const categories = await getAllCategories();
  const today = getTodayFormatted();

  return (
    <header className="site-header">
      <div className="header-top">
        <span className="header-date">{today}</span>
        <Link href="/chi-siamo" className="header-link">
          Chi Siamo
        </Link>
      </div>
      <div className="masthead">
        <h1>
          <Link href="/">LA CURIA</Link>
        </h1>
        <div className="masthead-subtitle">Politica · Giustizia · Attualità</div>
      </div>
      <nav className="main-nav">
        <Link href="/" className="nav-item">
          In Evidenza
        </Link>
        {categories.map((cat: any) => (
          <Link
            key={cat._id}
            href={`/categoria/${cat.slug.current}`}
            className="nav-item"
          >
            {cat.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}

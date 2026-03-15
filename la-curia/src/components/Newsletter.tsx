"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSent(true);
      setEmail("");
    }
  };

  return (
    <div className="newsletter-box">
      <h3>La Rassegna</h3>
      <p>
        Ogni mattina, le notizie che contano nella tua casella email. Analisi,
        commenti e approfondimenti dalla redazione de La Curia.
      </p>
      {!sent ? (
        <form onSubmit={handleSubmit}>
          <input
            className="newsletter-input"
            placeholder="La tua email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">
            Iscriviti gratis
          </button>
        </form>
      ) : (
        <p style={{ color: "#4ade80", fontFamily: "var(--sans)", fontSize: 13 }}>
          ✓ Iscrizione confermata. A domani!
        </p>
      )}
    </div>
  );
}

"use client";

export default function Newsletter() {
  return (
    <div className="newsletter-box">
      <h3>La Rassegna</h3>
      <p>
        Ogni mattina, le notizie che contano nella tua casella email. Analisi,
        commenti e approfondimenti dalla redazione de La Curia.
      </p>
      <div style={{
        border: "1px dashed #555",
        padding: "12px 16px",
        textAlign: "center",
        fontFamily: "var(--sans)",
        fontSize: "13px",
        color: "#aaa",
        lineHeight: 1.5,
      }}>
        La newsletter è in arrivo.<br />
        Stiamo lavorando per portartela presto.
      </div>
    </div>
  );
}

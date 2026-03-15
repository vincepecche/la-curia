# LA CURIA — Guida completa al deploy

Questa guida ti porta dal pacchetto scaricato al sito online funzionante.

---

## PASSO 1 — Configurare Sanity (il CMS)

### 1a. Aggiungi le origini CORS

Vai su https://www.sanity.io/manage/personal/project/t27qeggk/api

Clicca su **"CORS origins"** e aggiungi:

- `http://localhost:3000` (per sviluppo locale)
- `https://la-curia.vercel.app` (dopo il deploy — modifica con il tuo dominio Vercel effettivo)

Per entrambi, spunta **"Allow credentials"**.

### 1b. Crea un Token API

Sempre nella pagina API del progetto Sanity:

1. Vai nella sezione **"Tokens"**
2. Clicca **"Add API token"**
3. Nome: `Frontend Read`
4. Permessi: **Viewer** (sola lettura)
5. Copia il token generato — ti servirà dopo

---

## PASSO 2 — Caricare il progetto su GitHub

### Opzione A: Da browser (più facile)

1. Vai su https://github.com/new
2. Nome repository: `la-curia`
3. Lascia tutto il resto come default, clicca **"Create repository"**
4. Nella pagina del repository vuoto, clicca **"uploading an existing file"**
5. Trascina TUTTI i file e le cartelle del progetto
6. Clicca **"Commit changes"**

### Opzione B: Da terminale (se hai Git installato)

```bash
cd la-curia
git init
git add .
git commit -m "Primo commit: La Curia"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/la-curia.git
git push -u origin main
```

---

## PASSO 3 — Deploy su Vercel

1. Vai su https://vercel.com/dashboard
2. Clicca **"Add New" → "Project"**
3. Seleziona il repository `la-curia` da GitHub
4. Nella sezione **"Environment Variables"** aggiungi:

| Chiave | Valore |
|--------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `t27qeggk` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

5. Clicca **"Deploy"**
6. Attendi 2-3 minuti — Vercel costruirà il sito

Al termine avrai un URL tipo `la-curia.vercel.app`. Il tuo sito è online!

**IMPORTANTE:** Torna su Sanity (Passo 1a) e aggiungi l'URL Vercel effettivo alle origini CORS.

---

## PASSO 4 — Popolare il sito con i contenuti

Vai su `https://la-curia.vercel.app/studio` (o `http://localhost:3000/studio` se lavori in locale).

Questo è il tuo pannello di gestione. Ecco cosa fare nell'ordine:

### 4a. Crea le Categorie

Clicca su **"Categoria"** nel menu a sinistra, poi **"+"** per aggiungerne una nuova.

Categorie suggerite:

| Nome | Slug | Colore | Ordine |
|------|------|--------|--------|
| Politica | politica | #B91C1C | 1 |
| Giustizia | giustizia | #1E40AF | 2 |
| Economia | economia | #047857 | 3 |
| Cultura | cultura | #7C3AED | 4 |
| Opinioni | opinioni | #B45309 | 5 |

Per lo slug, clicca il pulsante **"Generate"** accanto al campo.

### 4b. Crea gli Autori

Clicca su **"Autore"** → **"+"** e inserisci nome, ruolo, biografia e foto.

### 4c. Pubblica il primo Articolo

Clicca su **"Articolo"** → **"+"**:

1. **Titolo**: scrivi il titolo
2. **Slug**: clicca "Generate"
3. **Sommario**: breve descrizione (appare in homepage)
4. **Corpo dell'articolo**: scrivi con l'editor visuale (grassetto, corsivo, titoli, citazioni, immagini — tutto supportato)
5. **Immagine principale**: carica una foto
6. **Categoria**: seleziona dal menu
7. **Autore**: seleziona dal menu
8. **In evidenza**: attiva per mostrare l'articolo nella sezione grande in homepage
9. **Tempo di lettura**: es. "5 min"
10. Clicca **"Publish"** in basso a destra

L'articolo apparirà sul sito entro 60 secondi.

---

## PASSO 5 (opzionale) — Collegare un dominio personalizzato

1. Compra un dominio (es. `lacuria.it`) su Namecheap, Aruba o simili
2. Su Vercel, vai in **Settings → Domains**
3. Aggiungi il tuo dominio
4. Vercel ti mostrerà i **record DNS** da configurare
5. Vai nel pannello del registrar dove hai comprato il dominio
6. Aggiungi i record DNS come indicato da Vercel
7. Attendi 5-30 minuti per la propagazione

Il sito sarà raggiungibile dal tuo dominio con HTTPS automatico.

---

## Sviluppo locale (opzionale)

Se vuoi modificare il design sul tuo computer:

```bash
# Installa Node.js da https://nodejs.org (versione LTS)
cd la-curia
npm install
npm run dev
```

Il sito sarà su http://localhost:3000
Il pannello Sanity su http://localhost:3000/studio

---

## Struttura del progetto

```
la-curia/
├── sanity/schemas/       ← Struttura dei contenuti (articolo, autore, categoria)
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Homepage
│   │   ├── articolo/[slug]/      ← Pagina singolo articolo
│   │   ├── categoria/[slug]/     ← Pagina categoria
│   │   ├── chi-siamo/            ← Pagina redazione
│   │   └── studio/               ← Pannello Sanity (CMS)
│   ├── components/               ← Componenti riutilizzabili
│   └── lib/                      ← Configurazione Sanity e query
├── sanity.config.ts              ← Configurazione CMS
├── next.config.mjs               ← Configurazione Next.js
└── package.json                  ← Dipendenze
```

---

## Operazioni quotidiane — Cheat sheet

| Cosa vuoi fare | Come |
|----------------|------|
| Pubblicare un articolo | Studio → Articolo → + → Compila → Publish |
| Mettere in evidenza | Studio → Articolo → attiva "In evidenza" |
| Rimuovere un articolo | Studio → Articolo → seleziona → Unpublish o Delete |
| Aggiungere una categoria | Studio → Categoria → + → Compila → Publish |
| Modificare un autore | Studio → Autore → seleziona → modifica → Publish |
| Aggiornare il design | Modifica i file CSS/TSX → push su GitHub → Vercel aggiorna |

---

## Supporto

- **Sanity docs**: https://www.sanity.io/docs
- **Next.js docs**: https://nextjs.org/docs
- **Vercel docs**: https://vercel.com/docs

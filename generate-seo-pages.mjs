/*
 * Generates static SEO pages from the English deck data.
 * Run manually whenever questions change:  node generate-seo-pages.mjs
 * Output is committed to the repo — Netlify just serves the files.
 */
import { mkdir, writeFile } from "node:fs/promises";
import decks from "./data/decks-en.js";

const SITE = "https://convo-kicker.netlify.app";

const PAGES = [
  {
    slug: "couples-playful",
    cat: "lovers",
    mood: "playful",
    theme: { g1: "#c73c71", g2: "#842d54", glow: "rgba(255, 95, 150, 0.22)" },
    title: "20 Playful Conversation Starters for Couples",
    description:
      "Fun, lighthearted questions to spark laughter and connection with your partner. No sign-up — swipe through them as interactive cards.",
    intro:
      "Light, curious questions that turn an ordinary evening with your partner into something memorable. Pick one, take turns answering, and see where it goes.",
    h1: "Playful Questions for Couples",
  },
  {
    slug: "couples-deep",
    cat: "lovers",
    mood: "deep",
    theme: { g1: "#c73c71", g2: "#842d54", glow: "rgba(255, 95, 150, 0.22)" },
    title: "20 Deep Questions for Couples",
    description:
      "Meaningful, vulnerable questions to deepen intimacy with your partner. No sign-up — swipe through them as interactive cards.",
    intro:
      "Reflective questions for the conversations that matter — the ones about trust, growth, and what you are building together. Best asked slowly, one at a time.",
    h1: "Deep Questions for Couples",
  },
  {
    slug: "friends-playful",
    cat: "friends",
    mood: "playful",
    theme: { g1: "#3a77d9", g2: "#214783", glow: "rgba(92, 160, 255, 0.22)" },
    title: "20 Fun Conversation Starters for Friends",
    description:
      "Playful icebreaker questions for hangouts, road trips, and group chats. No sign-up — swipe through them as interactive cards.",
    intro:
      "Easy, funny questions for hangouts, long drives, or reviving a quiet group chat. No wrong answers — the tangents are the point.",
    h1: "Fun Questions for Friends",
  },
  {
    slug: "friends-deep",
    cat: "friends",
    mood: "deep",
    theme: { g1: "#3a77d9", g2: "#214783", glow: "rgba(92, 160, 255, 0.22)" },
    title: "20 Deep Questions to Ask Friends",
    description:
      "Thoughtful questions that take friendships past small talk. No sign-up — swipe through them as interactive cards.",
    intro:
      "Questions for the friends you want to know better — the ones worth going past small talk with. Ask them around a table, not over text.",
    h1: "Deep Questions for Friends",
  },
];

const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function pageHtml(page, questions) {
  const others = PAGES.filter((p) => p.slug !== page.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    itemListElement: questions.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: q,
    })),
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#090b14" />
    <title>${esc(page.title)} — Convo Kicker</title>
    <meta name="description" content="${esc(page.description)}" />
    <link rel="canonical" href="${SITE}/questions/${page.slug}.html" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${SITE}/questions/${page.slug}.html" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Open Sans", system-ui, sans-serif;
        background:
          radial-gradient(circle at 50% 4%, ${page.theme.glow}, transparent 55%),
          linear-gradient(180deg, #090b14, #111521);
        color: rgba(255, 247, 251, 0.92);
        line-height: 1.6;
        min-height: 100vh;
      }
      main { max-width: 640px; margin: 0 auto; padding: 48px 24px 64px; }
      .brand {
        display: inline-block;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(255, 247, 251, 0.6);
        text-decoration: none;
        margin-bottom: 28px;
      }
      .brand:hover { color: rgba(255, 247, 251, 0.9); }
      h1 {
        font-size: clamp(28px, 6vw, 38px);
        font-weight: 800;
        line-height: 1.2;
        margin: 0 0 16px;
        background: linear-gradient(135deg, ${page.theme.g1}, ${page.theme.g2});
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        filter: brightness(1.6);
      }
      .intro { font-size: 17px; color: rgba(255, 247, 251, 0.72); margin: 0 0 36px; }
      ol { margin: 0; padding: 0; list-style: none; counter-reset: q; }
      ol li {
        counter-increment: q;
        position: relative;
        padding: 0 0 0 44px;
        margin-bottom: 22px;
        color: rgba(255, 247, 251, 0.88);
        font-size: 17px;
        font-weight: 600;
      }
      ol li::before {
        content: counter(q);
        position: absolute;
        left: 0;
        top: 1px;
        font-size: 14px;
        font-weight: 800;
        color: rgba(255, 247, 251, 0.88);
      }
      .cta-stack {
        display: block;
        max-width: 240px;
        margin: 48px auto 56px;
        text-decoration: none;
        text-align: center;
      }
      .stack { position: relative; display: block; height: 120px; }
      .mini-card {
        position: absolute;
        inset: 0;
        border-radius: 24px;
        background: linear-gradient(160deg, ${page.theme.g1}, ${page.theme.g2});
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.32);
      }
      .mini-far  { transform: translateY(10px) scale(0.93) rotate(-5deg); opacity: 0.85; }
      .mini-near { transform: translateY(5px)  scale(0.965) rotate(5deg); opacity: 0.95; }
      .mini-top {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        color: #fff7fb;
        font-size: 15px;
        font-weight: 700;
        line-height: 1.4;
        transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
      }
      .cta-stack:hover .mini-top,
      .cta-stack:focus-visible .mini-top { transform: translateY(-8px) rotate(-1.5deg); }
      .more { border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 32px; }
      .more h2 {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(255, 247, 251, 0.5);
        margin: 0 0 16px;
      }
      .more a {
        display: block;
        color: rgba(255, 247, 251, 0.78);
        text-decoration: none;
        padding: 8px 0;
        font-weight: 600;
      }
      .more a:hover { color: #fff; }
    </style>
  </head>
  <body>
    <main>
      <a class="brand" href="/">Convo Kicker</a>
      <h1>${esc(page.h1)}</h1>
      <p class="intro">${esc(page.intro)}</p>
      <ol>
${questions.map((q) => `        <li>${esc(q)}</li>`).join("\n")}
      </ol>
      <a class="cta-stack" href="/" aria-label="Open the interactive card deck">
        <span class="stack">
          <span class="mini-card mini-far"></span>
          <span class="mini-card mini-near"></span>
          <span class="mini-card mini-top">Tap to swipe all 20 &rarr;</span>
        </span>
      </a>
      <nav class="more" aria-label="More question lists">
        <h2>More questions</h2>
${others.map((p) => `        <a href="/questions/${p.slug}.html">${esc(p.title)}</a>`).join("\n")}
      </nav>
    </main>
  </body>
</html>
`;
}

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod></url>
${PAGES.map((p) => `  <url><loc>${SITE}/questions/${p.slug}.html</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

await mkdir("questions", { recursive: true });
for (const page of PAGES) {
  const questions = decks[page.cat][page.mood];
  if (questions.length !== 20) {
    throw new Error(`${page.cat}/${page.mood} has ${questions.length} questions, expected 20`);
  }
  await writeFile(`questions/${page.slug}.html`, pageHtml(page, questions));
  console.log(`wrote questions/${page.slug}.html`);
}
await writeFile("sitemap.xml", sitemap);
await writeFile("robots.txt", robots);
console.log("wrote sitemap.xml, robots.txt");

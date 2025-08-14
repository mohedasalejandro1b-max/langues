import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Check, ChevronDown, Star, MessageCircle } from "lucide-react";
// --- (Code identique à la version fournie dans la canvas) ---
// Pour lisibilité, ce fichier contient tout l'app en un seul composant.
// Vous pouvez séparer par fichiers si besoin.

// ---------- Mock Data ----------
const COURSES = [
  { id: "es-a1", lang: "es", track: "Traditionnel", level: "Débutant", title: "Espagnol A1", desc: "Bases de communication, prononciation et grammaire essentielle.", price: 149, badge: "Populaire" },
  { id: "es-b1", lang: "es", track: "Traditionnel", level: "Intermédiaire", title: "Espagnol B1", desc: "Fluidité, temps du passé, conversation pratique.", price: 199 },
  { id: "es-c1", lang: "es", track: "Traditionnel", level: "Avancé", title: "Espagnol C1", desc: "Nuances, débats et rédaction avancée.", price: 249 },
  { id: "es-intense", lang: "es", track: "Intensif", level: "Unique", title: "Bootcamp Espagnol", desc: "Programme intensif sur 4 semaines.", price: 299, badge: "Intensif" },
  { id: "es-conv", lang: "es", track: "Conversation", level: "Tous", title: "Club Conversation ES", desc: "Sessions orales thématiques avec feedback.", price: 99 },
  { id: "es-fos-uni", lang: "es", track: "FOS", level: "Universitaire", title: "Espagnol académique", desc: "Méthodologie, exposés, écrits universitaires.", price: 219 },
  { id: "es-fos-pro", lang: "es", track: "FOS", level: "Professionnel", title: "Espagnol professionnel", desc: "Réunions, mails, négociation.", price: 229 },
  { id: "es-cine", lang: "es", track: "Atelier cinéma", level: "Tous", title: "Atelier cinéma (ES)", desc: "Compréhension & débat autour de films hispanophones.", price: 129 },
  { id: "fr-a1", lang: "fr", track: "Traditionnel", level: "Débutant", title: "Français A1", desc: "Bases de phonétique et grammaire essentielle.", price: 149 },
  { id: "fr-b1", lang: "fr", track: "Traditionnel", level: "Intermédiaire", title: "Français B1", desc: "Confiance à l'oral et à l'écrit.", price: 199 },
  { id: "fr-c1", lang: "fr", track: "Traditionnel", level: "Avancé", title: "Français C1", desc: "Style, précision et argumentation.", price: 249 },
  { id: "fr-intense", lang: "fr", track: "Intensif", level: "Unique", title: "Bootcamp Français", desc: "Programme intensif sur 4 semaines.", price: 299, badge: "Intensif" },
  { id: "fr-conv", lang: "fr", track: "Conversation", level: "Tous", title: "Club Conversation FR", desc: "Pratique guidée orientée situations réelles.", price: 99 },
  { id: "fr-fos-uni", lang: "fr", track: "FOS", level: "Universitaire", title: "Français académique", desc: "Exposés, méthodologie, citations.", price: 219 },
  { id: "fr-fos-pro", lang: "fr", track: "FOS", level: "Professionnel", title: "Français professionnel", desc: "Réunions, emails, négociation.", price: 229 },
  { id: "fr-cine", lang: "fr", track: "Atelier cinéma", level: "Tous", title: "Atelier cinéma (FR)", desc: "Analyse & discussion de films francophones.", price: 129 },
];

const REVIEWS = [
  { name: "Marie Dubois", text: "Cours dynamiques et structurés. J'ai progressé très vite !", stars: 5 },
  { name: "Carlos López", text: "Beaucoup de pratique orale, prof très attentif.", stars: 5 },
  { name: "Lucía Pérez", text: "Plateforme claire et devoirs utiles.", stars: 4 },
];

const FAQS = [
  { q: "Comment s'inscrire à un cours ?", a: "Choisissez votre langue, ajoutez le cours au caddie puis validez votre paiement. Vous recevez un email avec les accès." },
  { q: "Proposez‑vous des remises ?", a: "Oui, des codes promo ponctuels (ex: BIENVENUE10). Saisissez le code au paiement." },
  { q: "Puis‑je me faire rembourser ?", a: "Remboursement possible sous 14 jours avant le début de la première séance. Voir Conditions d'utilisation." },
  { q: "Comment contacter le professeur ?", a: "Depuis la messagerie intégrée dans l'espace utilisateur (accessible après inscription)." },
];

const COUPONS = { BIENVENUE10: 0.1, VERANO15: 0.15 };
const formatPrice = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const Pill = ({ children }) => <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-neutral-100">{children}</span>;
const Section = ({ id, children, className = "" }) => <section id={id} className={`snap-start min-h-dvh w-full ${className}`}>{children}</section>;

function CourseCard({ c, onAdd }) {
  return (
    <div className="relative rounded-2xl p-5 shadow-sm ring-1 ring-black/5 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold leading-tight">{c.title}</h4>
          <p className="text-sm text-neutral-600 mt-1">{c.desc}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Pill>{c.track}</Pill>
            <Pill>Niveau: {c.level}</Pill>
            {c.badge && <Pill>{c.badge}</Pill>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">{formatPrice(c.price)}</div>
          <button onClick={() => onAdd(c)} className="mt-2 inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold bg-black text-white hover:bg-black/90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14m-8-4a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border p-4 bg-white">
      <button onClick={() => setOpen(v=>!v)} className="w-full flex items-center justify-between text-left">
        <span className="font-medium">{q}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <p className="mt-3 text-sm text-neutral-700">{a}</p>}
    </div>
  );
}

function ReviewCard({ name, text, stars }) {
  return (
    <div className="rounded-2xl border p-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-neutral-200" />
        <div>
          <p className="font-medium">{name}</p>
          <div className="text-yellow-500 text-sm" aria-label={`${stars} étoiles`}>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
        </div>
      </div>
      <p className="mt-3 text-sm text-neutral-700">{text}</p>
    </div>
  );
}

export default function App() {
  const [activeLang, setActiveLang] = useState(null); // 'es' or 'fr'
  const [cart, setCart] = useState([]); // {id, qty}
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const catalogRef = useRef(null);

  const items = useMemo(() => cart.map(ci => ({ ...COURSES.find(c => c.id === ci.id), qty: ci.qty })), [cart]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const discount = useMemo(() => (appliedCoupon ? Math.round(subtotal * appliedCoupon * 100) / 100 : 0), [subtotal, appliedCoupon]);
  const total = useMemo(() => Math.max(subtotal - discount, 0), [subtotal, discount]);

  const addToCart = (c) => {
    setCart(prev => {
      const found = prev.find(p => p.id === c.id);
      if (found) return prev.map(p => p.id === c.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { id: c.id, qty: 1 }];
    });
    setDrawerOpen(true);
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) setAppliedCoupon(COUPONS[code]);
  };

  const filtered = useMemo(() => COURSES.filter(c => !activeLang || c.lang === activeLang), [activeLang]);
  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleCheckout = async () => {
    alert(`Paiement simulé\nTotal: ${formatPrice(total)}\n\n➡️ Ajoutez Stripe/PayPal plus tard.`);
  };

  return (
    <div className="h-dvh w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-neutral-50 text-neutral-900">
      {/* Floating Cart */}
      <button onClick={() => setDrawerOpen(true)} className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white shadow-lg">
        🛒 {items.length} · {formatPrice(total)}
      </button>

      {/* SECTION 1 — Hero */}
      <Section id="accueil" className="relative flex items-stretch justify-center">
        <div className="absolute inset-0 grid md:grid-cols-2">
          {[
            { key: "es", title: "Cours d'espagnol pour francophones", cta: "Voir les cours", onClick: () => { setActiveLang("es"); scrollToCatalog(); } },
            { key: "fr", title: "Cours de français pour hispanophones", cta: "Ver cursos", onClick: () => { setActiveLang("fr"); scrollToCatalog(); } },
          ].map((p, i) => (
            <div key={p.key} className="relative flex items-center justify-center p-8">
              <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{p.title}</h1>
                <p className="mt-3 text-sm text-neutral-600">One‑page · Défilement sans clic · Paiement en ligne</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <button onClick={p.onClick} className="rounded-2xl px-4 py-2 bg-black text-white font-semibold">{p.cta}</button>
                  <a href="#apropos" className="rounded-2xl px-4 py-2 bg-neutral-100 font-semibold">À propos</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,_rgba(0,0,0,0.06),_transparent)]" />
      </Section>

      {/* SECTION 2 — À propos */}
      <Section id="apropos" className="flex items-center">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="text-2xl font-bold">À propos du professeur</h2>
              <dl className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
                <div><dt className="font-semibold">Études</dt><dd className="text-neutral-700">Master Didactique des Langues · DELE / DALF</dd></div>
                <div><dt className="font-semibold">Expérience</dt><dd className="text-neutral-700">+8 ans d'enseignement, université & entreprises</dd></div>
                <div><dt className="font-semibold">Parcours</dt><dd className="text-neutral-700">Programmes FOS, ateliers cinéma, coaching oral</dd></div>
              </dl>
              <div className="mt-6 text-sm">✅ Méthode communicative & feedback personnalisé</div>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="aspect-square w-full rounded-2xl bg-neutral-100" />
              <p className="mt-3 text-sm text-neutral-600">Votre photo / bio détaillée ici.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3 — Avis */}
      <Section id="avis" className="flex items-center">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="text-2xl font-bold">Avis des utilisateurs</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r) => <ReviewCard key={r.name} {...r} />)}
          </div>
        </div>
      </Section>

      {/* SECTION 4 — FAQ */}
      <Section id="faq" className="flex items-center">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-6 grid gap-3">{FAQS.map((f) => <FAQItem key={f.q} {...f} />)}</div>
        </div>
      </Section>

      {/* SECTION 5 — Catalogue */}
      <Section id="catalogue" className="flex items-center" ref={catalogRef}>
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Choisissez votre cours</h2>
              <p className="text-sm text-neutral-600">Filtrez par langue, ajoutez au caddie et réglez en ligne.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveLang(null)} className={`rounded-full px-3 py-1.5 text-sm font-medium border ${activeLang === null ? "bg-black text-white" : "bg-white"}`}>Toutes langues</button>
              <button onClick={() => setActiveLang("es")} className={`rounded-full px-3 py-1.5 text-sm font-medium border ${activeLang === "es" ? "bg-black text-white" : "bg-white"}`}>Español → FR</button>
              <button onClick={() => setActiveLang("fr")} className={`rounded-full px-3 py-1.5 text-sm font-medium border ${activeLang === "fr" ? "bg-black text-white" : "bg-white"}`}>Français → ES</button>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => <CourseCard key={c.id} c={c} onAdd={addToCart} />)}
          </div>
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold">Conditions d'utilisation</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Inscription nominative. Remboursement possible jusqu'à 14 jours avant la première séance.
              Accès à l'espace utilisateur (cours, devoirs, séances, messagerie) après paiement.
            </p>
          </div>
        </div>
      </Section>

      {/* Drawer: Cart */}
      {drawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-neutral-200 shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Votre caddie</h3>
            <button onClick={() => setDrawerOpen(false)} className="rounded-full p-2 hover:bg-neutral-100" aria-label="Fermer">✕</button>
          </div>
          <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-sm text-neutral-600">Votre caddie est vide. Ajoutez des cours pour continuer.</p>
            ) : (
              <div className="flex h-full flex-col">
                <ul className="space-y-3">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-start justify-between gap-3 rounded-2xl border p-3">
                      <div>
                        <p className="font-medium">{it.title}</p>
                        <p className="text-xs text-neutral-600">{it.track} · {it.level}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button onClick={() => setCart(prev => prev.map(p => p.id === it.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))} className="rounded-full px-2 border">−</button>
                          <span className="text-sm">{it.qty}</span>
                          <button onClick={() => setCart(prev => prev.map(p => p.id === it.id ? { ...p, qty: p.qty + 1 } : p))} className="rounded-full px-2 border">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatPrice(it.price * it.qty)}</div>
                        <button onClick={() => setCart(prev => prev.filter(p => p.id !== it.id))} className="mt-2 text-xs text-red-600">Retirer</button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-2xl border p-3">
                  <label className="text-xs font-medium">Code promo</label>
                  <div className="mt-1 flex gap-2">
                    <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="BIENVENUE10" className="flex-1 rounded-xl border px-3 py-2" />
                    <button onClick={() => applyCoupon()} className="rounded-xl px-3 py-2 border font-medium">Appliquer</button>
                  </div>
                  {appliedCoupon && <p className="mt-1 text-xs text-green-700">Remise appliquée: {Math.round(appliedCoupon * 100)}%</p>}
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between"><span>Sous‑total</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Remise</span><span>−{formatPrice(discount)}</span></div>
                  <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{formatPrice(total)}</span></div>
                </div>

                <div className="mt-4 grid gap-2">
                  <button onClick={handleCheckout} className="rounded-2xl px-4 py-3 bg-black text-white font-semibold">Payer maintenant</button>
                  <button onClick={() => setDrawerOpen(false)} className="rounded-2xl px-4 py-3 border font-semibold">Payer plus tard</button>
                </div>

                <p className="mt-3 text-[11px] text-neutral-600">
                  En payant vous acceptez les Conditions d'utilisation. Intégration Stripe possible (Checkout Session côté serveur).
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

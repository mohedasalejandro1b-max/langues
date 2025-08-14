# Langues — Site React (gratuit à déployer)

Ce projet correspond au site **one‑page** avec sections coulissantes, catalogue, caddie et coupons.

## Déploiement sans rien installer (100% gratuit)
### Option A — Vercel (+ GitHub)
1. Créez un compte **GitHub** et **Vercel** (gratuits).
2. Importez ce dossier dans un dépôt GitHub (Upload files).
3. Sur Vercel > *New Project* > *Import Git Repository* > choisissez le dépôt.
4. Laissez les réglages par défaut (Vite). Cliquez **Deploy**.
5. En ~1 minute, votre site est en ligne (URL `*.vercel.app`).

### Option B — Netlify (+ GitHub) ou Drag‑and‑drop
1. Connectez votre dépôt à Netlify **ou** construisez localement `npm run build` puis glissez le dossier `dist/` sur https://app.netlify.com/drop.

> **Paiement :** le bouton **Payer maintenant** est simulé. Ajoutez Stripe plus tard (aucun abonnement, mais frais par transaction).

## Modifier le contenu
- **Cours :** `src/App.jsx` — tableau `COURSES` (prix, niveaux, textes).
- **Avis :** `REVIEWS`.
- **FAQ :** `FAQS`.
- **Coupons :** `COUPONS` (ex: `BIENVENUE10: 0.1`).

## Lancer en local (optionnel)
```bash
npm i
npm run dev
```

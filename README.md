# Modest Pearl — Boutique Mode Modeste

Plateforme e-commerce complète pour une boutique de mode modeste basée à Dakar, Sénégal.

## Stack technique

- **Frontend** : React 18 + TypeScript + Vite
- **Styling** : Tailwind CSS + shadcn/ui
- **Backend** : Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Déploiement** : Vercel

## Fonctionnalités

**Côté client**
- Catalogue produits avec filtres (taille, couleur, tissu, prix)
- Fiche produit avec galerie photos et sélection de variantes
- Panier et processus de commande complet
- Paiement Wave / Orange Money (confirmation manuelle)
- Suivi de commande en temps réel par référence

**Côté admin**
- Dashboard avec KPIs et graphiques de ventes
- Gestion des commandes avec mise à jour de statut
- Notifications push navigateur pour les nouvelles commandes
- Gestion du catalogue produits (ajout, modification, suppression)
- Gestion du stock avec alertes de rupture
- Statistiques et meilleures ventes
- Authentification sécurisée

## Installation

```bash
git clone https://github.com/SeydinaAliouneDiop/noor-abaya-studio.git
cd noor-abaya-studio
npm install --legacy-peer-deps
```

Créer un fichier `.env` à la racine :

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

## Structure du projet

```
src/
├── components/
│   ├── layout/          # Header, Footer, AdminLayout
│   └── admin/           # Composants admin
├── contexts/            # React Context (Auth, Cart, Orders, Products)
├── hooks/               # Custom hooks (usePushNotifications)
├── lib/
│   ├── supabase/        # Client Supabase
│   ├── types.ts         # Types TypeScript
│   └── utils.ts         # Utilitaires (formatCFA, formatWhatsApp)
└── pages/
    ├── admin/           # Dashboard admin
    └── ...              # Pages publiques
```

## Base de données

Le schéma SQL complet est disponible dans `supabase_schema.sql`. Tables principales : `products`, `product_variants`, `orders`, `order_items`, `order_status_history`.

## Déploiement

Le projet est configuré pour un déploiement continu sur Vercel. Chaque push sur `main` déclenche un nouveau déploiement automatiquement.

Variables d'environnement à configurer sur Vercel :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

# EducNest - Bibliothèque Numérique UNA

EducNest est la bibliothèque numérique de référence pour l'Université Nationale d'Agriculture (UNA) du Bénin. Elle permet aux étudiants et enseignants d'accéder à des milliers de ressources académiques.

## 🚀 Fonctionnalités

### 🎓 Pour les Étudiants
- **Accès gratuit** à des milliers de documents académiques
- **Recherche avancée** par catégorie, école et niveau
- **Téléchargement sécurisé** des mémoires, cours, et épreuves
- **Interface moderne** et intuitive adaptée aux mobiles

### 👨‍🏫 Pour les Enseignants
- **Partage de documents** avec les étudiants
- **Gestion des ressources** pédagogiques
- **Suivi des téléchargements** et statistiques

### 🏛️ Pour l'Administration
- **Portail d'orientation** complet avec informations sur les écoles
- **Gestion centralisée** des utilisateurs et documents
- **Statistiques détaillées** sur l'utilisation

## 📋 Écoles et Directeurs

L'UNA comprend 8 écoles spécialisées :

- **École d'Aquaculture (EAQ)** - M. Darius TOSSAVI
- **École d'Agrobusiness et de Politiques Agricoles (EAPA)** - M. Nounagnon Emile HOUNGBO
- **École de Sociologie Rurale et Vulgarisation Agricole (SRVA)** - M. Wilfried PADONOU
- **École de Gestion de la Production Végétale et Semencière (EGPVS)** - M. Apollinaire ADANDONON
- **Directeur Adjoint de l'EGPVS** - M. David Koffi MONTCHO HAMBADA
- **École de Gestion et d'Exploitation des Systèmes d'Élevage (EGESE)** - M. Sabbas ATTINDEHOU
- **École de Foresterie Tropicale (EForT)** - M. Olou Toussaint LOUGBEGNON
- **École des Sciences et Techniques de Conservation (ESTC)** - Mme Flora CHADARE

## 🛠️ Stack Technique

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend**: Supabase (PostgreSQL), API Routes
- **Authentification**: Supabase Auth
- **Déploiement**: Vercel
- **Animations**: Framer Motion

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation locale
```bash
# Cloner le projet
git clone <repository-url>
cd EducNestSite

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Ajouter vos clés Supabase

# Démarrer le serveur de développement
npm run dev
```

### Variables d'environnement
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

## 🚀 Déploiement

### Déploiement sur Vercel
1. Connecter votre repository GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel
3. Déployer automatiquement

### Build de production
```bash
npm run build
npm start
```

## 📁 Structure du Projet

```
EducNestSite/
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # API routes
│   ├── dashboard/          # Bibliothèque numérique
│   ├── orientation/        # Portail d'orientation UNA
│   ├── profile/           # Profil utilisateur
│   └── login/            # Page de connexion
├── components/            # Composants React
│   ├── ui/               # Composants UI (Shadcn)
│   └── auth/             # Composants d'authentification
├── lib/                  # Bibliothèques utilitaires
│   ├── auth.ts           # Contexte d'authentification Supabase
│   ├── supabase.ts       # Client Supabase
│   └── utils.ts          # Fonctions utilitaires
└── public/               # Fichiers statiques
```

## 🎯 Fonctionnalités Clés

### Bibliothèque Numérique
- **Recherche intelligente** avec filtres multiples
- **Aperçu des documents** avant téléchargement
- **Système de notation** et de commentaires
- **Catégorisation** par type (mémoire, cours, épreuve, etc.)

### Système d'Authentification
- **Inscription** avec validation des données
- **Rôles utilisateurs** (étudiant, enseignant, administrateur)
- **Profils personnalisés** avec informations académiques
- **Connexion sécurisée** via Supabase

### Portail d'Orientation
- **Informations détaillées** sur chaque école
- **Présentation des directeurs** et programmes
- **Interface interactive** avec cartes d'information
- **Contact direct** avec les services d'orientation

## 📊 Statistiques et Performance

- **10,000+** documents disponibles
- **5,000+** utilisateurs actifs
- **50,000+** téléchargements mensuels
- **8 écoles** spécialisées
- **Temps de chargement** < 2 secondes
- **Note moyenne** 4.8/5 étoiles

## 🔒 Sécurité

- **Authentification sécurisée** via Supabase
- **Protection contre les attaques** XSS et CSRF
- **Validation des entrées** utilisateur
- **Politiques de sécurité** des en-têtes HTTP
- **HTTPS obligatoire** en production

## 🤝 Contribution

1. Fork le projet
2. Créer une branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commiter les changements (`git commit -m 'Add amazing feature'`)
4. Pusher vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous license MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

- **Email**: contact@educnest.bj
- **Site**: https://educnest.bj
- **Localisation**: Parakou, Bénin

---

**EducNest** - La bibliothèque numérique qui transforme l'éducation agricole au Bénin 🌱📚

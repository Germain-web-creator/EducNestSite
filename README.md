<div align="center">
<img width="1200" height="475" alt="EducNest Banner" src="https://picsum.photos/seed/educnest/1200/475" />
</div>

# EducNest - Plateforme Éducative Numérique Panafricaine

**La boussole qui guide l'étudiant dès ses premiers pas académiques**

EducNest est une plateforme éducative moderne conçue pour centraliser les ressources académiques de l'Université Nationale d'Agriculture (UNA) et au-delà. Elle permet aux étudiants de partager, consulter et monétiser leurs travaux de recherche dans un écosystème numérique sécurisé.

## 🚀 Fonctionnalités Clés

### 📚 Bibliothèque Numérique
- Accès centralisé aux mémoires, thèses, cours et examens
- Recherche avancée par titre, auteur, école ou domaine
- Système de favoris et téléchargements
- Validation des documents par le corps enseignant

### 🎓 Portail Institutionnel
- Présentation des sites et écoles de l'UNA
- Informations détaillées sur chaque formation
- Navigation intuitive entre les différents campus

### 🎥 Masterclass Éducatives
- Contenus vidéo style TikTok pour l'apprentissage
- Techniques pratiques et démonstrations
- Catégorisation par domaine d'expertise

### 💰 Marketplace Étudiants
- Monétisation des travaux de recherche validés
- Achat de ressources premium
- Système de commission transparent (25% EducNest, 75% créateur)

### 👥 Gestion Utilisateurs
- Rôles multiples : Étudiant, Enseignant, Master/Doctorant, Administrateur
- Profils personnalisables avec statistiques
- Système d'abonnements Free/Premium

## 🛠️ Stack Technique

- **Frontend** : React 19 + TypeScript + Vite
- **Styling** : TailwindCSS + Framer Motion
- **Backend** : Firebase (Auth, Firestore, Storage)
- **Icons** : Lucide React
- **Déploiement** : Vercel/Netlify/Firebase Hosting

## 📦 Installation

### Prérequis
- Node.js 18+ et npm
- Compte Firebase configuré

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/votre-org/educnest.git
cd educnest

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditez .env.local avec vos clés Firebase

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🔧 Configuration

### Firebase Setup

1. **Créer un projet Firebase** sur [Firebase Console](https://console.firebase.google.com/)
2. **Activer Authentication** avec Google Sign-In
3. **Configurer Firestore Database** avec les règles de sécurité appropriées
4. **Configurer Cloud Storage** pour le stockage des fichiers
5. **Copier les clés de configuration** dans `.env.local`

### Variables d'Environnement

```env
VITE_FIREBASE_API_KEY="votre_cle_api"
VITE_FIREBASE_AUTH_DOMAIN="votre_projet.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="votre_id_projet"
VITE_FIREBASE_STORAGE_BUCKET="votre_projet.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="votre_sender_id"
VITE_FIREBASE_APP_ID="votre_app_id"
```

## 🚀 Déploiement

### Build de Production

```bash
npm run build
```

### Déploiement sur Vercel (Recommandé)

```bash
npm install -g vercel
vercel
```

### Déploiement sur Firebase Hosting

```bash
npm install -g firebase-tools
firebase deploy
```

Pour plus d'options, consultez [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── UserProfile.tsx  # Profil utilisateur
│   └── DocumentUpload.tsx # Upload de documents
├── hooks/              # Hooks personnalisés
│   └── useDocuments.ts  # Gestion des documents
├── auth.tsx            # Contexte d'authentification
├── firebase.ts         # Configuration Firebase
├── App.tsx             # Composant principal
├── constants.ts        # Données constantes
└── types.ts           # Types TypeScript
```

## 🔐 Sécurité

- **Authentication** : Firebase Auth avec Google Sign-In
- **Autorisations** : Rôles basés sur le statut utilisateur
- **Validation** : Documents approuvés par les enseignants
- **Storage** : Règles de sécurité Firebase Storage
- **Firestore** : Règles de sécurité base de données

## 🤝 Contribuer

Nous sommes ouverts aux contributions ! Voici comment vous pouvez aider :

1. Fork le repository
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Roadmap

- [ ] Application mobile (React Native)
- [ ] Système de paiement intégré
- [ ] Notifications push
- [ ] API REST pour intégrations tierces
- [ ] Tableaux de bord analytiques
- [ ] Système de commentaires et notations
- [ ] Mode offline avec PWA

## 📄 Licence

Ce projet est sous licence Apache-2.0. Consultez [LICENSE](LICENSE) pour plus d'informations.

## 📞 Contact

- **Email** : contact@educnest.bj
- **Site Web** : https://educnest.bj
- **Support** : support@educnest.bj

## 🙏 Remerciements

- Université Nationale d'Agriculture (UNA)
- Corps enseignant pour la validation des documents
- Étudiants contributeurs
- Communauté open-source

---

<div align="center">
  <p>Made with ❤️ in Africa for African Education</p>
  <p>© 2026 EducNest. Tous droits réservés.</p>
</div>

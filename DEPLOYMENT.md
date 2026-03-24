# Guide de Déploiement EducNest

## Prérequis

- Node.js 18+ et npm
- Compte Firebase avec projet configuré
- Hébergement web (Vercel, Netlify, Firebase Hosting, etc.)

## Configuration Firebase

1. **Créer un projet Firebase**
   - Allez sur [Firebase Console](https://console.firebase.google.com/)
   - Créez un nouveau projet "EducNest"

2. **Configurer Authentication**
   - Activez "Google Sign-In" dans Authentication > Sign-in method
   - Configurez les domaines autorisés pour votre application

3. **Configurer Firestore**
   - Créez une base de données Firestore
   - Appliquez les règles de sécurité suivantes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read approved documents
    match /documents/{docId} {
      allow read: if resource.data.status == 'approved';
      allow write: if request.auth != null;
    }
    
    // Anyone can read schools and masterclasses
    match /schools/{schoolId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /masterclasses/{videoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. **Configurer Storage**
   - Activez Cloud Storage
   - Appliquez les règles de sécurité :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{docId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Configuration Locale

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Éditez `.env.local` avec vos vraies clés Firebase :
```env
VITE_FIREBASE_API_KEY="votre_vraie_cle_api"
VITE_FIREBASE_AUTH_DOMAIN="votre-projet.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="votre-id-projet"
VITE_FIREBASE_STORAGE_BUCKET="votre-projet.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="votre_sender_id"
VITE_FIREBASE_APP_ID="votre_app_id"
```

## Développement Local

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## Production Build

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## Déploiement

### Option 1: Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Initialiser Firebase Hosting
firebase init hosting

# Déployer
firebase deploy
```

### Option 2: Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

### Option 3: Netlify

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Déployer
netlify deploy --prod --dir=dist
```

## Fonctionnalités Post-Déploiement

1. **Test d'authentification**
   - Vérifiez que la connexion Google fonctionne
   - Testez la création de profils utilisateurs

2. **Test d'upload**
   - Vérifiez que les enseignants peuvent déposer des documents
   - Testez le système de validation

3. **Test de téléchargement**
   - Vérifiez que les étudiants peuvent télécharger des documents
   - Testez les limites de téléchargement mensuelles

## Maintenance

- Surveillance des logs Firebase
- Mise à jour des règles de sécurité
- Sauvegarde régulière des données Firestore
- Optimisation des performances et coûts

## Support

Pour toute question technique :
- Documentation Firebase : https://firebase.google.com/docs
- Issues GitHub : Créez une issue dans le repo du projet
- Support technique : contact@educnest.bj

# Nom du projet
share-json-data
Description courte du projet:  
Une application Next.js pour gérer et partager des données JSON avec authentification via Clerk et base de données Prisma.

---

## Fonctionnalités

- Authentification utilisateur avec Clerk
- Gestion des utilisateurs avec Prisma
- CRUD de données JSON
- Interface utilisateur avec Tailwind CSS
- Déploiement facile sur Vercel

---

## Installation

1. Cloner le dépôt  
```bash
git clone https://github.com/ton-utilisateur/nom-du-repo.git
cd nom-du-repo

    Installer les dépendances

npm install

    Configurer les variables d’environnement
    Créer un fichier .env.local à la racine avec les clés nécessaires, par exemple :

DATABASE_URL="ton_url_prisma"
NEXT_PUBLIC_CLERK_FRONTEND_API="..."
CLERK_API_KEY="..."

    Lancer le serveur en mode développement

npm run dev

    Accéder à l’application à http://localhost:3000

Scripts disponibles

    npm run dev — démarre le serveur en mode développement

    npm run build — compile le projet pour la production

    npm start — démarre le projet en production

    npm run lint — lance l’analyse du code


Technologies utilisées

    Next.js

    Prisma

    Clerk

    Tailwind CSS

    React


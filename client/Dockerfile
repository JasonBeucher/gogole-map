# Utilisation de l'image Node.js version 14 comme base
FROM node:14

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie des fichiers du projet
COPY . .

# Exposition du port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer le serveur Node.js
ENTRYPOINT ["node", "index.js"]

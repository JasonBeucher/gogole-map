# Notice d'utilisation
1. Cloner le projet dans un répertoire vierge : 
```bash
git clone git@gitlab.esiea.fr:jbeucher/gogole-map.git .
```

2. Entrez dans le repertoire du projet: 
```bash
cd gogole-map
```

3. Build le projet :
```bash
docker-compose build
```

4. On lance l'application depuis ce répertoire, les container sont automatiquement lancé :
```bash
docker-compose up
```

5. Ouvrir le client : http://localhost:3000

6. Vous pouvez désormais utiliser l'application en plaçant un point sur la carte. 

# Documentation de l'API
1. Ouvrir : http://localhost:3000/api-doc

2. Entrer les paramètre

3. Envoyer la requête

# Test d'acceptation
Le chemin du fichier qui contient les tests d'acceptation est /client/cypress/e2e/spec.cy.js

# Nos choix architecturaux
## L'application global
Notre application est a but pédagogique, elle n'aura pas besoin d'être maintenu par la suite. Donc, nous avons décidé de partir sur unearchitecture monolithique morderne, séparé en 3 parties : base de données, backend et front.
Chaque partie a sont propre conteneur. Ils sont répartis en sur 2 réseaux. Les conteneurs gogole-map-bdd et gogole-map-back sont sur leréseau back et les conteneurs gogole-map-back et gogole-map-front sont sur le réseau front.

## Le backend
	├── server
	│   ├── City 
	│   ├── CityService
	│   ├── CityController
	│   ├── DatabaseQuery
	│   ├── DemoApplication

Le backend comporte 5 classes :
- La classe City représentant une entité de la ville dans l'application.
- La classe CityController est un contrôleur REST responsable de la gestion des requêtes HTTP liées aux villes. Le choix d'utiliser un contrôleur REST facilite l'exposition d'une API web pour interagir avec les données des villes. 
- La classe classe CityService est responsable de la logique métier liée aux villes dans l'application. Le choix de séparer la logique métier dans un service distinct favorise la réutilisabilité et la testabilité du code.
- Ce composant nous sert a exécuter des requêtes SQL sur la base de données. Le choix de séparer la logique d'accès aux données dans un composant distinct favorise la modularité et la maintenabilité du code. Elle est utilisé pour lire les villes de la base de données.
# Langages, technologies, packages et middlewares utilisés
## Le back
Nous avons choisi Java pour le backend. Java est un choix populaire pour le développement backend en raison de sa robustesse, de saperformance et de sa portabilité. Il dispose du framework backend Spring Boot qui facilite le développement d'application Java basées surdes services web, en fournissant des fonctionnalités telles que l'injection de dépendances, la configuration automatique et la prise encharge de l'application web.
## Le front
Nous avons choisi Node js plus précisément Javascript pour le front c'est le langage de programmation de facto pour le développementwebfrontend. Il est largement pris en charge par tous les navigateurs modernes.
Nous avons utilisé le framework Express.js qui est le framework le plus standard pour du développement Node.js nous ne voyons pasl'utilitéd'utiliser un framework plus complexe pour ce projet.
En ce qui concerne les appels à l'API nous avons utilisé Axios qui permet de faire des requêtes asynchrones assez simplement.
Pour les tests d'acceptation nous avons choisi d'utiliser Cypress pour sa simplicité et notre expérience sur celui-ci.
Pour le style de l'application nous utilisons à Bootstrap ainsi que FontAwesome pour nous permettre d'utiliser des icônes.
### Alternatives
Nous aurions pu utiliser Vue, react ou Angular pour le front mais a préféré faire le choix de la simplicité n'importe lequel de ses autrestechniques aurait pu fonctionner.
Pour les tests d'acceptation nous aurions pu utiliser Selenium mais nous avions moins d'expérience sur celui-ci et ont donc préféré lasyntaxe 	simple et la rapidité de Cypress qui était un choix cohérent avec express.
	
## Les technologies
### API REST
Imposé par le sujet, les api REST permettent de maniere sécurisé de transférer des données via http.
### La base de données
Nous avons choisi le Système de gestion de base de données relationnelle mysql utilisé pour stocker les données de l'application.

## Les packages
### Bibliothèque Java
Nous avons utilisé Lombok efficace pour réduire le code en générant automatiquement des méthodes comme les getters, setters.

Jackson utilisée pour la sérialisation et la désérialisation des objets City Java en JSON et vice versa. Même si on ne l'utilise plus carmaintenant on stocke les données en bdd. On l'a donc remplacé par la package my-sql pour faire la connection avec la base de données.

On utilise également JUnit pour réalisé les tests unitaires. Mais aussi Mockito, qui permet de créer des objets de tests facilement.

On a aurait pu utilisé la biblitothèque Hibernate qui est un middleware de mappage objet-relationnel (ORM) il simplifie l'accès aux bases dedonnées relationnelles en permettant aux développeurs de manipuler les données sous forme d'objets Java. Mais, comme on ne fait pas demodification dans la base de données, il n'est pas vraiment utile dans notre cas. Il l'aurait été si, par exemple, on avait ajouté unformulaire pour ajouter/modifier des villes.

# Notre expérience
Nous avons trouvé ce projet très intéressant et complet. En effet, l'utilisation de docker et d'une API nous a permis de découvrir de nouvelle méthode de création d'application. Nous avons aussi apprécié la liberté laissée tout au cours de ce projet, nous avons pu découvrir les technologies souhaitées ainsi que de renforcer des connaissances sur d'autres déjà connus.
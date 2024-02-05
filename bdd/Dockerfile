FROM mysql:latest

# Définissez les variables d'environnement pour le mot de passe root
ENV MYSQL_ROOT_PASSWORD root

# Facultatif : définissez d'autres variables d'environnement si nécessaire, par exemple pour le nom de la base de données par défaut
# ENV MYSQL_DATABASE gogolemap

# Copiez les scripts SQL dans le conteneur
COPY create_database.sql /docker-entrypoint-initdb.d/
COPY insert_script.sql /docker-entrypoint-initdb.d/


# Facultatif : exposez le port MySQL
EXPOSE 3306


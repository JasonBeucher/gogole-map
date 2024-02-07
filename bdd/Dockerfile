FROM mysql:latest

# Définir l'encodage par défaut pour la base de données
ENV MYSQL_DATABASE=gogolemap \
    MYSQL_USER=user \
    MYSQL_PASSWORD=user \
    MYSQL_ROOT_PASSWORD=root \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# Copiez un script SQL pour initialiser la base de données
COPY create_database.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
docker build -t gogole-bdd .

docker run -d --name gogole-map_bdd_1 -p 3306:3306 gogole-bdd

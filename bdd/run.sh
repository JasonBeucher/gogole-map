docker build -t gogole-bdd .

docker run -d --name gogole-bdd -p 3306:3306 gogole-bdd

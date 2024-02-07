FROM maven:latest
LABEL authors="thomas"

WORKDIR /server

COPY ./target/demo-0.0.1-SNAPSHOT.jar /server

ENTRYPOINT ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]
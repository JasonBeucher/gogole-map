CREATE DATABASE IF NOT EXISTS gogolemap
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE gogolemap;
CREATE TABLE City (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    region VARCHAR(255),
    population INT
);


CREATE DATABASE smishingDb;

USE smishingDb;

CREATE TABLE Users (id INT PRIMARY KEY AUTO_INCREMENT, password VARCHAR(31), email VARCHAR(63), typeofuser VARCHAR(31));

CREATE TABLE Twittdata (id VARCHAR(30), comment TEXT, nickname VARCHAR(40), creation DATE, imageurl TEXT, imagetext TEXT, organization VARCHAR(30), link TEXT);

CREATE TABLE Telldata (number VARCHAR(30), comment TEXT, type VARCHAR(30), researchs INT, score INT, source VARCHAR(30), organization VARCHAR(31));


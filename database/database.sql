CREATE DATABASE atto;

CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(40),
    password VARCHAR(255),
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE actions(
    id UUID PRIMARY KEY,
    userId UUID,
    task VARCHAR(255),
    board VARCHAR(25),
    createdAt DATE,
    updatedAt DATE
);
DROP DATABASE IF EXISTS atto;

CREATE DATABASE atto;

\c atto

CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(40),
    password VARCHAR(255),
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE IF NOT EXISTS actions(
    id UUID PRIMARY KEY,
    userId UUID,
    task VARCHAR(255),
    board VARCHAR(25),
    createdAt DATE,
    updatedAt DATE
);

ALTER TABLE users
    OWNER to postgres;
ALTER TABLE actions
    OWNER to postgres;
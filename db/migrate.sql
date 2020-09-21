DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS reports (
    week INT NOT NULL,
    content VARCHAR(1000) NOT NULL,
    UNIQUE(week)
);

INSERT INTO reports (week,content)
VALUES(1,'REPORT WEEK 1 with deep analysing text.');

INSERT INTO reports (week,content)
VALUES(2,'REPORT WEEK 2. The end is near and the API has a mind of its own.');

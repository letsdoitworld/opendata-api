DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username text UNIQUE,
  password text
);

-- INSERT INTO users (username, password) VALUES ('', '');

DROP TABLE IF EXISTS pastes;

CREATE TABLE pastes (
  id SERIAL PRIMARY KEY,
  paste_title TEXT NOT NULL,
  paste_body TEXT NOT NULL
  );
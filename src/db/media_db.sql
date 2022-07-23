PRAGMA foreign_keys = false;


DROP TABLE IF EXISTS media_types;
CREATE TABLE media_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  media_type text NOT NULL
);

DROP TABLE IF EXISTS media_instances;
CREATE TABLE media_instances (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type_id INTEGER NOT NULL,
  artist_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  source TEXT NOT NULL,
  uri TEXT NOT NULL
);

DROP TABLE IF EXISTS artists;
CREATE TABLE artists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  artist_name TEXT NOT NULL
);

PRAGMA foreign_keys = true;

INSERT INTO media_types (id, media_type) VALUES (1, 'music');
-- SQLite schema for writophony

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS players_quests;
DROP TABLE IF EXISTS players_cosmetics;
DROP TABLE IF EXISTS quests;
DROP TABLE IF EXISTS cosmetics;
DROP TABLE IF EXISTS players;

-- Registered players
CREATE TABLE players (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    money         INTEGER NOT NULL DEFAULT 0 CHECK (money >= 0),
    created_at    TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Cosmetics sold in the shop (rarity: 1 = common, 2 = rare, ...)
CREATE TABLE cosmetics (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    description TEXT,
    price       INTEGER NOT NULL DEFAULT 0 CHECK (price >= 0),
    rarity      INTEGER NOT NULL DEFAULT 1 CHECK (rarity >= 1)
);

-- Cosmetics owned by players (a player can own a cosmetic only once)
CREATE TABLE players_cosmetics (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    players_id   INTEGER NOT NULL,
    cosmetics_id INTEGER NOT NULL,
    CONSTRAINT uq_players_cosmetics_players_id_cosmetics_id
        UNIQUE (players_id, cosmetics_id),
    CONSTRAINT fk_players_cosmetics_players_id
        FOREIGN KEY (players_id) REFERENCES players (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_players_cosmetics_cosmetics_id
        FOREIGN KEY (cosmetics_id) REFERENCES cosmetics (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Achievements that give money and/or a cosmetic
CREATE TABLE quests (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT NOT NULL UNIQUE,
    description      TEXT,
    money_reward     INTEGER CHECK (money_reward IS NULL OR money_reward >= 0),
    cosmetics_reward INTEGER,
    CONSTRAINT fk_quests_cosmetics_reward
        FOREIGN KEY (cosmetics_reward) REFERENCES cosmetics (id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Quests completed by players
CREATE TABLE players_quests (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    players_id   INTEGER NOT NULL,
    quests_id    INTEGER NOT NULL,
    completed_at TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_players_quests_players_id_quests_id
        UNIQUE (players_id, quests_id),
    CONSTRAINT fk_players_quests_players_id
        FOREIGN KEY (players_id) REFERENCES players (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_players_quests_quests_id
        FOREIGN KEY (quests_id) REFERENCES quests (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexes on foreign keys (the UNIQUE constraints already cover players_id)
CREATE INDEX idx_players_cosmetics_cosmetics_id ON players_cosmetics (cosmetics_id);
CREATE INDEX idx_players_quests_quests_id ON players_quests (quests_id);
CREATE INDEX idx_quests_cosmetics_reward ON quests (cosmetics_reward);

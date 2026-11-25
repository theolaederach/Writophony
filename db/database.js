const Database = require("better-sqlite3");
const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");

const DB_PATH = path.join(__dirname, "src/writophony.db");
const SCHEMA_PATH = path.join(__dirname, "src/create_database.sql");

/**
 * Open the database and create the schema only if the file did not exist.
 *
 * Args :
 *     dbPath (string): path of the SQLite file.
 *
 * Return :
 *     The database connection (Database)
 */
function openDatabase(dbPath) {
  const isNew = !existsSync(dbPath);

  // open (or create) the file
  const db = new Database(dbPath);

  // must be set on every connection, otherwise foreign keys are ignored
  db.pragma("foreign_keys = ON");

  // run the schema only on a fresh database
  if (isNew) {
    db.exec(readFileSync(SCHEMA_PATH, "utf8"));
  }
  return db;
}

module.exports = { db: openDatabase(DB_PATH) };

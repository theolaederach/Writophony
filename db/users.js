const { db } = require("./database.js");

const players = {
  /**
   * Create a player.
   *
   * Args :
   *     name (string): unique name of the player.
   *     passwordHash (string): hashed password.
   *
   * Return :
   *     The id of the new player (number)
   *
   * @param {string} name
   * @param {string} passwordHash
   * @returns {number}
   */
  createPlayer: (name, passwordHash) => {
    try {
      // run() executes INSERT / UPDATE / DELETE
      const result = db
        .prepare("INSERT INTO players (name, password_hash) VALUES (?, ?)")
        .run(name, passwordHash);
      return Number(result.lastInsertRowid);
    } catch (err) {
      // UNIQUE constraint on players.name: expected error, not logged
      if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
        throw new Error("name already taken");
      }
      // unexpected error: log it, then let the caller handle it
      console.error("createPlayer failed:", err);
      throw err;
    }
  },
};

module.exports = { players };

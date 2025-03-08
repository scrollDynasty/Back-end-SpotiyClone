import BaseUserRepository from "../baseUserRepository.js";
import sqlite3 from "sqlite3";
import UserError from "../../errors/userError.js";

class SQliteUserRepository extends BaseUserRepository {
  constructor(db) {
    super();
    this.db = db || new sqlite3.Database(":memory:");
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        fullName TEXT NOT NULL,
        avatarUrl TEXT,
        passwordHash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('user', 'artist', 'admin')) DEFAULT 'user',
        createdAt INTEGER, -- Для timestamps
        updatedAt INTEGER  -- Для timestamps
      )
    `);
  }

  async create(data) {
    const sql =
      "INSERT INTO users (email, fullName, avatarUrl, passwordHash, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const now = Date.now();
    return new Promise((resolve, reject) => {
      this.db.run(
        sql,
        [
          data.email,
          data.fullName,
          data.avatarUrl || null,
          data.passwordHash,
          data.role || "user",
          now,
          now
        ],
        function (err) {
          if (err) {
            reject(new UserError(err.message));
          } else {
            resolve({
              id: this.lastID,
              email: data.email,
              fullName: data.fullName,
              avatarUrl: data.avatarUrl || null,
              role: data.role,
              createdAt: now,
              updatedAt: now
            });
          }
        }
      );
    });
  }

  async delete(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  async update(id, data) {
    const sql = "UPDATE users SET fullName = ?, avatarUrl = ?, role = ?, updatedAt = ? WHERE id = ?";
    const now = Date.now();
    return new Promise((resolve, reject) => {
      this.db.run(sql, [data.fullName, data.avatarUrl, data.role, now, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0 ? { id, ...data } : null);
        }
      });
    });
  }

  async findById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: row.id,
            fullName: row.fullName,
            email: row.email,
            avatarUrl: row.avatarUrl,
            role: row.role,
          });
        }
      });
    });
  }

  async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      this.db.get(sql, [email], (err, row) => {
        if (err) {
          reject(new UserError(err.message));
        } else {
          resolve({
            id: row.id,
            fullName: row.fullName,
            email: row.email,
            avatarUrl: row.avatarUrl,
            role: row.role,
            passwordHash: row.passwordHash
          });
        }
      });
    });
  }
}

export default SQliteUserRepository;
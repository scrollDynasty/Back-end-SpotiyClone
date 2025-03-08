import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import sqlite3Module from 'sqlite3';
const sqlite3 = sqlite3Module.verbose();
import SQliteUserRepository from "../repositories/sqlite/userRepository.js";
import MongoUserRepository from "../repositories/mongodb/userRepository.js";

class DBFactory {
  constructor() {
    this.env = process.env.NODE_ENV || "development";
    this.db =
      this.env === "production" ? null : new sqlite3.Database(":memory:");
    if (this.env === "production") {
      mongoose
        .connect(process.env.DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("Подключено к MongoDB");
        })
        .catch((err) => {
          console.error("Ошибка подключения к MongoDB:", err);
        });
    }
  }

  getRepository(entity) {
    switch (entity) {
      case "user":
        return this.env === "production"
          ? new MongoUserRepository()
          : new SQliteUserRepository(this.db);
      default:
        throw new Error(`Repository for entity "${entity}" not found`);
    }
  }
}

export default new DBFactory();
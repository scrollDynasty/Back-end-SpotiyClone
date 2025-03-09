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
    // Используем SQLite с сохранением данных в файл
    this.db = new sqlite3.Database("./database.sqlite");
    console.log("Используется SQLite с сохранением данных в файл database.sqlite");
  }

  getRepository(entity) {
    switch (entity) {
      case "user":
        return new SQliteUserRepository(this.db);
      default:
        throw new Error(`Repository for entity "${entity}" not found`);
    }
  }
}

export default new DBFactory();
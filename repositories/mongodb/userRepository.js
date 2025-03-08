import e from "express";
import BaseUserRepository from "../baseUserRepository.js";

class MongoUserRepository extends BaseUserRepository {
  constructor() {
    super();
    console.log("MongoUserRepository not implemented");
  }
}

export default MongoUserRepository;
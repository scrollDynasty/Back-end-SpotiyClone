import BaseService from "./baseService.js";
import DBFactory from "../config/dbFactory.js";

class UserService extends BaseService {
  constructor() {
    const userRepository = DBFactory.getRepository("user");
    super(userRepository);
    this.userRepository = userRepository;
  }

  async findByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }
}

export default UserService;

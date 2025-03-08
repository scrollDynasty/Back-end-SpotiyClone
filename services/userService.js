import DBFactory from "../config/dbFactory.js";

class UserService {
    constructor() {
        this.userRepository = DBFactory.getRepository("user");
    }
    async create(data) {
        return await this.userRepository.create(data);
    }
    async update(id, data) {
        return this.userRepository.update(id, data);
    }
    async delete(id) {
        return this.userRepository.delete(id);
    }
    async findById(id) {
        return this.userRepository.findById(id);
    }

    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
}

export default UserService;
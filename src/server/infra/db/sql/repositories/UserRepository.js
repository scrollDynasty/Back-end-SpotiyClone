import { UserMapper } from '../mappers/UserMapper.js';

export default class UserRepository {
  constructor({ prisma }) {
    this.user = prisma.client.user;
  }

  async create(user) {
    const entity = UserMapper.toEntity(user);
    const createdEntity = await this.user.create({ data: entity });
    return UserMapper.toDomain(createdEntity);
  }

  async findByEmail(email) {
    const entity = await this.user.findUnique({ where: { email } });
    return UserMapper.toDomain(entity);
  }
}

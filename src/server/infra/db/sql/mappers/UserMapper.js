import { filterObj } from '#common/infra/Helpers.js';
import { User } from '#server/domain/entities/User.js';

export class UserMapper {
  static toDomain(entity) {
    if (!entity) {
      return null;
    }

    const { id, fullName, email, password, avatarUrl } = entity;
    return new User(id, fullName, email, password, avatarUrl);
  }

  static toEntity({ id, fullName, email, password, avatarUrl }) {
    return filterObj({ id, fullName, email, password, avatarUrl });
  }
}

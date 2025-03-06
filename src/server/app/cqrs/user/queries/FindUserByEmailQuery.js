import { Query } from '#common/app/Query.js';

export default class CreateUserQuery extends Query {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async implementation() {
    return this.userRepository.findByEmail(this.input.email);
  }
}

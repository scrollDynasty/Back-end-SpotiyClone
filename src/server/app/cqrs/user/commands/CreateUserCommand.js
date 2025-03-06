import { Command } from '#common/app/Command.js';

export default class CreateUserCommand extends Command {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async implementation() {
    return this.userRepository.create(this.input);
  }
}

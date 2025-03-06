import { Command } from '#common/app/Command.js';
import { UnauthorizedError } from '#server/app/errors/UnauthorizedError.js';

export default class LoginCommand extends Command {
  constructor({ eventDispatcher, userFactory, encryption, jwt }) {
    super(eventDispatcher);
    this.userFactory = userFactory;
    this.encryption = encryption;
    this.jwt = jwt;
  }

  async implementation() {
    const { email, password } = this.input;

    const user = await this.userFactory.getQuery('findByEmail').execute({ email });
    const isPasswordEqual = this.encryption.compare(password, user?.password);
    if (!isPasswordEqual) {
      throw new UnauthorizedError();
    }

    const token = this.jwt.sign(user);
    return { token };
  }
}

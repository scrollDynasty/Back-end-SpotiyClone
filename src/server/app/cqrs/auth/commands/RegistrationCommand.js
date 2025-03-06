import { Command } from '#common/app/Command.js';
import { ConflictError } from '#server/app/errors/ConflictError.js';

export default class RegistrationCommand extends Command {
  constructor({ eventDispatcher, userFactory, encryption, jwt }) {
    super(eventDispatcher);
    this.userFactory = userFactory;
    this.encryption = encryption;
    this.jwt = jwt;
  }

  async implementation() {
    const { fullName, email, password, avatarUrl } = this.input;

    const candidate = await this.userFactory.getQuery('findByEmail').execute({ email });
    if (candidate) {
      throw new ConflictError('email is already taken');
    }

    const passwordHash = this.encryption.encrypt(password, 10);
    const user = await this.userFactory
      .getCommand('create')
      .execute({ fullName, email, password: passwordHash, avatarUrl });

    user.startVerification(this._eventDispatcher);

    const token = this.jwt.sign(user);
    return { token };
  }
}

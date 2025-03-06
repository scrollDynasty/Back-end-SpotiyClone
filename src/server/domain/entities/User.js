import { UserVerificationEvent } from '../events/UserVerificationEvent.js';

export class User {
  constructor(id, fullName, email, password, avatarUrl) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
  }

  startVerification(eventDispatcher) {
    eventDispatcher.register(new UserVerificationEvent({ email: this.email }));
  }
}

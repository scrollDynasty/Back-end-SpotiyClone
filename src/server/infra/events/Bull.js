export default class Bull {
  constructor({ userVerificationEventHandler }) {
    this.handlers = {
      userVerification: userVerificationEventHandler,
    };
  }

  add({ type, payload }) {
    this.handlers[type].add(payload);
  }
}

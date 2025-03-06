export class Command {
  input;

  constructor(eventDispatcher) {
    this._eventDispatcher = eventDispatcher;
  }

  async execute(input) {
    this.input = input;

    const result = await this.implementation();
    this._eventDispatcher?.dispatch();

    return result;
  }

  async implementation() {}
}

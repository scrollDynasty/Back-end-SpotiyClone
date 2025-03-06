export class Query {
  input;

  async execute(input) {
    this.input = input;
    return this.implementation();
  }

  async implementation() {}
}

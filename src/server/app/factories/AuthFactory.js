export default class AuthFactory {
  constructor({ loginCommand, registrationCommand }) {
    this.loginCommand = loginCommand;
    this.registrationCommand = registrationCommand;
  }

  getCommand(name) {
    switch (name) {
      case 'login': {
        return this.loginCommand;
      }
      case 'registration': {
        return this.registrationCommand;
      }
      default: {
        throw new Error('Command not found');
      }
    }
  }
}

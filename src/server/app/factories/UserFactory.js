export default class UserFactory {
  constructor({ createUserCommand, findUserByEmailQuery }) {
    this.createUserCommand = createUserCommand;
    this.findUserByEmailQuery = findUserByEmailQuery;
  }

  getCommand(name) {
    switch (name) {
      case 'create': {
        return this.createUserCommand;
      }
      default: {
        throw new Error('Command not found');
      }
    }
  }

  getQuery(name) {
    switch (name) {
      case 'findByEmail': {
        return this.findUserByEmailQuery;
      }
      default: {
        throw new Error('Query not found');
      }
    }
  }
}

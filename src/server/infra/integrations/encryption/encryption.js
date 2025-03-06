import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export default class Encryption {
  compare(password, encodedPassword = '') {
    return compareSync(password, encodedPassword);
  }

  encrypt(password) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}

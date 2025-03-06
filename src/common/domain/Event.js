export class Event {
  date = Date.now();

  constructor(payload) {
    this.payload = Object.freeze(payload);
  }
}

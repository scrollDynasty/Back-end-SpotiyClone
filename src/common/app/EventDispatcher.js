export default class EventDispatcher {
  #publishedEvents = new Set();

  constructor({ bull }) {
    this.bull = bull;
  }

  register(event) {
    this.#publishedEvents.add(event);
  }

  dispatch() {
    const events = Array.from(this.#publishedEvents.values());
    for (const event of events) {
      this.bull.add(event);
    }
  }
}

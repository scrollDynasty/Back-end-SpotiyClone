import { Event } from '#common/domain/Event.js';

export class UserEventType extends Event {
  static VERIFICATION = 'userVerification';
}

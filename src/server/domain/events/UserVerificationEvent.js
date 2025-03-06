import { Event } from '#common/domain/Event.js';
import { UserEventType } from '../enums/UserEventType.js';

export class UserVerificationEvent extends Event {
  type = UserEventType.VERIFICATION;
}

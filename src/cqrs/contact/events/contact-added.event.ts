import { CqrsContact } from '../entities/cqrs-contact.entity';

export class ContactAddedEvent {
  constructor(public contact: CqrsContact) {}
}

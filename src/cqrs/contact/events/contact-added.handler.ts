import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContactAddedEvent } from './contact-added.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ContactAddedEvent)
export class ContactAddedHandler implements IEventHandler<ContactAddedEvent> {
  private readonly logger = new Logger('ContactAddedHandler');
  constructor() {}

  handle(event: ContactAddedEvent): any {
    this.logger.debug('Contact added', { ...event.contact.dataValues });
  }
}

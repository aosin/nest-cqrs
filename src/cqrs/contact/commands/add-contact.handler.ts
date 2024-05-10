import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AddContactCommand } from './add-contact.command';
import { InjectModel } from '@nestjs/sequelize';
import { CqrsContact } from '../entities/cqrs-contact.entity';
import { ContactAddedEvent } from '../events/contact-added.event';

@CommandHandler(AddContactCommand)
export class AddContactHandler implements ICommandHandler<AddContactCommand> {
  constructor(
    @InjectModel(CqrsContact) private readonly contactModel: typeof CqrsContact,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: AddContactCommand) {
    const contact = await this.contactModel.create({ ...command });
    this.eventBus.publish(new ContactAddedEvent(contact));
    return contact;
  }
}

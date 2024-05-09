import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddContactCommand } from './add-contact.command';
import { InjectModel } from '@nestjs/sequelize';
import { CqrsContact } from '../entities/cqrs-contact.entity';

@CommandHandler(AddContactCommand)
export class AddContactHandler implements ICommandHandler<AddContactCommand> {
  constructor(
    @InjectModel(CqrsContact) private readonly contactModel: typeof CqrsContact,
  ) {}
  execute(command: AddContactCommand) {
    return this.contactModel.create({ ...command });
  }
}

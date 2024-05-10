import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { CqrsContact } from '../entities/cqrs-contact.entity';
import { UpdateCountersCommand } from './update-counters.command';
import { Counters } from '../entities/counters.entity';

@CommandHandler(UpdateCountersCommand)
export class UpdateCountersHandler
  implements ICommandHandler<UpdateCountersCommand>
{
  constructor(
    @InjectModel(CqrsContact) private readonly contactModel: typeof CqrsContact,
    @InjectModel(Counters, 'read')
    private readonly countersModel: typeof Counters,
  ) {}
  async execute(command: UpdateCountersCommand) {
    const [counters] = await this.countersModel.findOrCreate({
      where: { id: 0 },
    });
    if (command.changes.contacts) {
      counters.numberOfContacts = await this.contactModel.count();
    }
    await counters.save();
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { CqrsContact } from '../entities/cqrs-contact.entity';
import { UpdateCountersCommand } from './update-counters.command';
import { Counters, CounterType } from '../entities/counters.entity';

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
    if (command.changes.contacts) {
      this.countersModel.upsert({
        key: CounterType.numberOfContacts,
        value: await this.contactModel.count(),
      });
    }
  }
}

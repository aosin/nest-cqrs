import { Module } from '@nestjs/common';
import { CqrsContactController } from './cqrs-contact.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsContact } from './entities/cqrs-contact.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AddContactHandler } from './commands/add-contact.handler';
import { GetAllContactsHandler } from './queries/get-all-contacts.handler';
import { GetCountersHandler } from './queries/get-counters.handler';
import { Counters } from './entities/counters.entity';
import { UpdateCountersHandler } from './commands/update-counters.handler';
import { ContactAddedHandler } from './events/contact-added.handler';

const commandHandlers = [AddContactHandler, UpdateCountersHandler];
const queryHandlers = [GetAllContactsHandler, GetCountersHandler];
const eventHandlers = [ContactAddedHandler];

@Module({
  imports: [
    CqrsModule,
    SequelizeModule.forFeature([CqrsContact]),
    SequelizeModule.forFeature([Counters], 'read'),
  ],
  controllers: [CqrsContactController],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
})
export class CqrsContactModule {}

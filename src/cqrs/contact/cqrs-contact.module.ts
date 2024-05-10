import { Module } from '@nestjs/common';
import { CqrsContactController } from './cqrs-contact.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsContact } from './entities/cqrs-contact.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AddContactHandler } from './commands/add-contact.handler';
import { GetAllContactsHandler } from './queries/get-all-contacts.handler';
import { GetCountersHandler } from './queries/get-counters.handler';
import { Counters } from './entities/counters.entity';

const commandHandlers = [AddContactHandler];
const queryHandlers = [GetAllContactsHandler, GetCountersHandler];

@Module({
  imports: [
    CqrsModule,
    SequelizeModule.forFeature([CqrsContact]),
    SequelizeModule.forFeature([Counters], 'read'),
  ],
  controllers: [CqrsContactController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class CqrsContactModule {}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllContactsQuery } from './get-all-contacts.query';
import { InjectModel } from '@nestjs/sequelize';
import { CqrsContact } from '../entities/cqrs-contact.entity';

@QueryHandler(GetAllContactsQuery)
export class GetAllContactsHandler
  implements IQueryHandler<GetAllContactsQuery>
{
  constructor(
    @InjectModel(CqrsContact) private readonly contactModel: typeof CqrsContact,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(query: GetAllContactsQuery) {
    return this.contactModel.findAll({ where: { deleted: false } });
  }
}

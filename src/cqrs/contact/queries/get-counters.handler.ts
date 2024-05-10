import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Counters } from '../entities/counters.entity';
import { GetCountersQuery } from './get-counters.query';

@QueryHandler(GetCountersQuery)
export class GetCountersHandler implements IQueryHandler<GetCountersQuery> {
  constructor(
    @InjectModel(Counters, 'read')
    private readonly countersModel: typeof Counters,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetCountersQuery) {
    const counters = await this.countersModel.findAll();
    return counters || [];
  }
}

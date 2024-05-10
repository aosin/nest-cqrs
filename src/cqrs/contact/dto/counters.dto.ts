import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { Counters } from '../entities/counters.entity';

export class CountersDto {
  @ApiProperty({ example: '42' }) @Expose() numberOfContacts: number = 0;

  static fromCollection(entities: Counters[]) {
    const data = Object.fromEntries(
      entities.map(({ key, value }) => [key, value]),
    );
    return plainToInstance(CountersDto, data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}

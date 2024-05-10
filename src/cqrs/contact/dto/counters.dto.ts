import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { Counters } from '../entities/counters.entity';

export class CountersDto {
  @ApiProperty({ example: '42' }) @Expose() numberOfContacts: number;

  static fromEntity(entity: Counters) {
    return plainToInstance(CountersDto, entity.dataValues, {
      excludeExtraneousValues: true,
    });
  }
}

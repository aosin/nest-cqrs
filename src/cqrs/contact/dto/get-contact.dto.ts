import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { CqrsContact } from '../entities/cqrs-contact.entity';

export class GetContactDto {
  @ApiProperty({ format: 'uuid' }) @Expose() id: string;

  @ApiProperty({ example: 'Krumm' }) @Expose() name: string;

  @ApiPropertyOptional({ nullable: true, example: '#no_head' })
  @Expose()
  tags: string;

  @ApiProperty({ default: false }) @Expose() deleted: boolean;
  static fromEntity(entity: CqrsContact) {
    return plainToInstance(GetContactDto, entity.dataValues, {
      excludeExtraneousValues: true,
    });
  }
}

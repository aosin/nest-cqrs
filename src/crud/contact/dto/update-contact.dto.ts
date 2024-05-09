import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  deleted: boolean;
}

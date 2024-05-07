import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiPropertyOptional()
  deleted: boolean;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() tags: string;
}

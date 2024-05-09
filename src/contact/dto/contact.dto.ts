import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional({ nullable: true }) tags: string;
  @ApiProperty({ default: false }) deleted: boolean;
}

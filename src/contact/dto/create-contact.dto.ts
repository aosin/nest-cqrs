import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateContactDto {
  @ApiProperty() name: string;
  @ApiPropertyOptional() tags: string;
}

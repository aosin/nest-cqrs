import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddContactDto {
  @ApiProperty({ example: 'Krumm' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ nullable: true, example: '#no_head #those_eyes' })
  @IsString()
  @IsOptional()
  tags?: string;
}

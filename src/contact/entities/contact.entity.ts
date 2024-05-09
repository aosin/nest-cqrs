import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'contacts' })
export class Contact extends Model<
  InferAttributes<Contact>,
  InferCreationAttributes<Contact>
> {
  @ApiProperty()
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  id: string;

  @ApiProperty()
  @Column
  name: string;

  @ApiProperty({ nullable: true })
  @AllowNull
  @Default(null)
  @Column
  tags?: string;

  @ApiProperty()
  @Default(false)
  @Column
  deleted: boolean;
}

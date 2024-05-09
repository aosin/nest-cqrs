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

@Table({ tableName: 'contacts' })
export class CqrsContact extends Model<
  InferAttributes<CqrsContact>,
  InferCreationAttributes<CqrsContact>
> {
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @AllowNull
  @Default(null)
  @Column
  tags?: string;

  @Default(false)
  @Column
  deleted: boolean;
}

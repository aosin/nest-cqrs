import {
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'counters' })
export class Counters extends Model<
  InferAttributes<Counters>,
  InferCreationAttributes<Counters>
> {
  @PrimaryKey
  @Default(0)
  @Column
  id: number;

  @Default(0)
  @Column
  numberOfContacts: number;
}

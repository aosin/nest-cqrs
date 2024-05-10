import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

export enum CounterType {
  numberOfContacts = 'numberOfContacts',
}

@Table({ tableName: 'counters' })
export class Counters extends Model<
  InferAttributes<Counters>,
  InferCreationAttributes<Counters>
> {
  @PrimaryKey
  @Column(DataType.STRING)
  key: CounterType;

  @Default(0)
  @Column
  value: number;
}

import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'counters' })
export class Counters extends Model<
  InferAttributes<Counters>,
  InferCreationAttributes<Counters>
> {
  @PrimaryKey
  @Column({ defaultValue: 0 })
  numberOfContacts: number;
}

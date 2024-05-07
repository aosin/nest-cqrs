import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'contacts' })
export class Contact extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column name: string;
  @Column tags: string;
  @Column deleted: boolean;
}

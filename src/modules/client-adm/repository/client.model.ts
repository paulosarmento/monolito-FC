import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderModel from "../../checkout/repository/order.model";

@Table({
  modelName: "clients-adm-table",
  tableName: "clients",
  timestamps: false,
})
export class ClientAdmModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: false })
  complement: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zipCode: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}

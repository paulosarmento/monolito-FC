import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
  tableName: "client",
  timestamps: false,
})
export default class ClientCheckoutModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: true })
  address: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  orderId: string;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}

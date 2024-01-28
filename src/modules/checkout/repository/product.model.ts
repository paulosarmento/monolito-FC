import {
  Column,
  Model,
  ForeignKey,
  Table,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
  modelName: "product-checkout-table",
  tableName: "product",
  timestamps: false,
})
export default class ProductCheckoutModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  salesPrice: number;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;
}

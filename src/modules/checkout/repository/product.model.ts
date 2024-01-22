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
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
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
  orderId: string;

  @BelongsTo(() => OrderModel)
  order: OrderModel;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}

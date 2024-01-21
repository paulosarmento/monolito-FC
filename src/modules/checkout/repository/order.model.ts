import {
  Column,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from "sequelize-typescript";
import ProductModel from "./product.model";
import { ClientModel } from "./client.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @HasMany(() => ClientModel, { foreignKey: "orderId" })
  client: ClientModel[];

  @HasMany(() => ProductModel, { foreignKey: "orderId" })
  products: ProductModel[];

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}

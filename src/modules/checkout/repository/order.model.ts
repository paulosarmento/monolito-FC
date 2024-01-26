import {
  Column,
  Model,
  PrimaryKey,
  Table,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import ProductCheckoutModel from "./product.model";
import ClientCheckoutModel from "./client.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @HasOne(() => ClientCheckoutModel)
  client: ClientCheckoutModel;

  @HasMany(() => ProductCheckoutModel)
  products: ProductCheckoutModel[];

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}

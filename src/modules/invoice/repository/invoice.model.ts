import {
  Column,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from "sequelize-typescript";
import ProductInvoiceModel from "./product.model";

@Table({ tableName: "invoices", timestamps: false })
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

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
  zipCode: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  total: number;

  @HasMany(() => ProductInvoiceModel, { foreignKey: "invoiceId" })
  items: ProductInvoiceModel[];

  @Column({ allowNull: false })
  createdAt: Date;
}

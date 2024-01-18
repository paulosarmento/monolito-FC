import {
  Column,
  Model,
  ForeignKey,
  Table,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({ tableName: "items", timestamps: false })
export default class ItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;
}

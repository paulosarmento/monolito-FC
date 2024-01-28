import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";
export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("invoice-products", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    invoiceId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: "invoices",
        key: "id",
      },
    },
  });
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("invoice-products");
};

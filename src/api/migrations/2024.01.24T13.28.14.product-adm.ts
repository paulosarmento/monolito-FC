// 2024.01.24T16.00.00_create_products_table.ts

import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("products", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    purchasePrice: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    salesPrice: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: "orders",
        key: "id",
      },
    },
    invoiceId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: "invoices",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("products");
};

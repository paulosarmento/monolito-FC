// 2024.01.24T18.00.00_create_client_order_product_tables.ts

import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  // Criação da tabela 'orders'
  await sequelize.getQueryInterface().createTable("orders", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  // Remoção da tabela 'products'
  await sequelize.getQueryInterface().dropTable("products");

  // Remoção da tabela 'orders'
  await sequelize.getQueryInterface().dropTable("orders");

  // Remoção da tabela 'clients'
  await sequelize.getQueryInterface().dropTable("clients");
};

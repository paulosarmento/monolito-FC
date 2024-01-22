import { Umzug } from "umzug";
import { migrator } from "../config-migrations/migrator";
import { app, migration, sequelize } from "../express";
import request from "supertest";

describe("Checkout e2e", () => {
  let migration: Umzug<any>;
  // Entender melhor essa parte
  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });
  it("should place an order", async () => {});
});

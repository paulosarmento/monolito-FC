import { app, migration, sequelize } from "../express";
import request from "supertest";

describe("Checkout e2e", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  // Entender melhor essa parte
  // afterEach(async () => {
  //   if (!migration || !sequelize) {
  //     return;
  //   }
  //   migration = migrator(sequelize);
  //   await migration.down();
  //   await sequelize.close();
  // });
  it("should place an order", async () => {});
});

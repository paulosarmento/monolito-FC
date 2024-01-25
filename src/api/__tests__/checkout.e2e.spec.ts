import { Umzug } from "umzug";
import { migrator } from "../config-migrations/migrator";
import { app, migration, sequelize } from "../express";
import request from "supertest";

describe("Checkout e2e", () => {
  let migration: Umzug<any>;
  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });
  it("should create a checkout", async () => {});
});

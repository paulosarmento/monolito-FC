import { Umzug } from "umzug";
import { migrator } from "../config-migrations/migrator";
import { sequelize } from "../express";

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
  it("should on checkout", async () => {});
});

import { Umzug } from "umzug";
import { app, sequelize } from "../express";
import request from "supertest";
import { migrator } from "../config-migrations/migrator";

describe("Products e2e", () => {
  let migration: Umzug<any>;
  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });
  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Product 1 description");
    expect(response.body.purchasePrice).toBe(100);
    expect(response.body.stock).toBe(10);
  });
  it("should not create a product", async () => {
    const response = await request(app).post("/products").send({});
    expect(response.status).toBe(400);
  });
});

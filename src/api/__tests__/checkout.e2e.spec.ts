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
  it("should create a checkout", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        id: "1o",
        client: [
          {
            id: "1c",
            name: "client 1",
            email: "client@example.com",
            document: "document",
            street: "street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
          },
        ],

        products: [
          {
            id: "1p",
            name: "products 1",
            description: "products",
            salesPrice: "price",
          },
          {
            id: "1p",
            name: "products 1",
            description: "products",
            salesPrice: "price",
          },
        ],

        status: "approved",
      });
    expect(response.status).toBe(200);
  });
});

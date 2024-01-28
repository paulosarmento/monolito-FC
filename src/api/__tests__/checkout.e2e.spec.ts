import { Umzug } from "umzug";
import { migrator } from "../config-migrations/migrator";
import { app, sequelize } from "../express";
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
  it("should on checkout", async () => {
    const client = await request(app).post("/clients").send({
      name: "Client 5",
      email: "email",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zipCode: "zipCode",
    });
    const products1 = await request(app).post("/products").send({
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });
    const products2 = await request(app).post("/products").send({
      name: "Product 2",
      description: "Product 2 description",
      purchasePrice: 500,
      stock: 10,
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: client.body.id,
        products: [
          { productId: products1.body.id },
          { productId: products2.body.id },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("approved");
    expect(response.body.total).toBe(600);
    expect(response.body.products).toHaveLength(2);
  });
  it("should not on checkout", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1c",
        products: [{ productId: "1p" }, { productId: "2p" }],
      });
    expect(response.status).toBe(500);
  });
});

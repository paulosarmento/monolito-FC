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
  it("should create a checkout", async () => {
    const client = await request(app).post("/clients").send({
      name: "Client 1",
      email: "email",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zipCode: "zipCode",
    });

    const product = await request(app).post("/products").send({
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });

    const product2 = await request(app).post("/products").send({
      name: "Product 2",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });
    // Entender melhor essa parte
    console.log(client.body.id, product.body.id, product2.body.id);

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: client.body.id,
        products: [
          {
            productId: product.body.id,
          },
          {
            productId: product2.body.id,
          },
        ],
      });
    expect(response.status).toBe(200);
  });
});

import { Umzug } from "umzug";
import { app, sequelize } from "../express";
import request from "supertest";
import { migrator } from "../config-migrations/migrator";

describe("Invoice e2e", () => {
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
  it("should create an invoice", async () => {
    const response = await request(app)
      .post("/invoice")
      .send({
        id: "1",
        name: "Client 1",
        document: "Document 1",
        street: "Street 1",
        number: "Number 1",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "ZipCode 1",
        total: 300,
        items: [
          {
            id: "1",
            name: "Item 1",
            price: 100,
          },
          {
            id: "2",
            name: "Item 2",
            price: 200,
          },
        ],
      });
    expect(response.status).toBe(200);
  });
});

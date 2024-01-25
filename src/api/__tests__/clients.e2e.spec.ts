import { Umzug } from "umzug";
import { app, sequelize } from "../express";
import request from "supertest";
import { migrator } from "../config-migrations/migrator";

describe("Clients e2e", () => {
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
  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
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
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(200);
  });
});

import { Umzug } from "umzug";
import { app, sequelize } from "../express";
import request from "supertest";
import { migrator } from "../config-migrations/migrator";

describe("Clients e2e", () => {
  let migration: Umzug<any>;
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
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Client 1");
    expect(response.body.email).toBe("email");
    expect(response.body.document).toBe("document");
    expect(response.body.street).toBe("street");
    expect(response.body.number).toBe("number");
    expect(response.body.complement).toBe("complement");
    expect(response.body.city).toBe("city");
    expect(response.body.state).toBe("state");
    expect(response.body.zipCode).toBe("zipCode");
  });
  it("Should not create a new client", async () => {
    const response = await request(app).post("/clients").send({});
    expect(response.status).toBe(400);
  });
});

import { app, sequelize } from "../express";
import request from "supertest";

describe("Clients e2e", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
  it("should place an order", async () => {});
});

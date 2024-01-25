import { Umzug } from "umzug";
import { app, sequelize } from "../express";
import request from "supertest";
import { migrator } from "../config-migrations/migrator";

describe("Invoice e2e", () => {
  let migration: Umzug<any>;
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
            name: "Item 1",
            price: 100,
          },
          {
            name: "Item 2",
            price: 200,
          },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Client 1");
    expect(response.body.document).toBe("Document 1");
    expect(response.body.street).toBe("Street 1");
    expect(response.body.number).toBe("Number 1");
    expect(response.body.complement).toBe("Complement 1");
    expect(response.body.city).toBe("City 1");
    expect(response.body.state).toBe("State 1");
    expect(response.body.zipCode).toBe("ZipCode 1");
    expect(response.body.total).toBe(300);
    expect(response.body.items.length).toBe(2);
    expect(response.body.items[0].name).toBe("Item 1");
    expect(response.body.items[0].price).toBe(100);
    expect(response.body.items[1].name).toBe("Item 2");
    expect(response.body.items[1].price).toBe(200);
  });
  it("should not create an invoice", async () => {
    const response = await request(app).post("/invoice").send({});
    expect(response.status).toBe(500);
  });
  it("should find an invoice", async () => {
    const invoice = await request(app)
      .post("/invoice")
      .send({
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
            name: "Item 1",
            price: 100,
          },
          {
            name: "Item 2",
            price: 200,
          },
        ],
      });
    expect(invoice.status).toBe(200);
    const response = await request(app).get(`/invoice/${invoice.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Client 1");
    expect(response.body.document).toBe("Document 1");
    expect(response.body.address.street).toBe("Street 1");
    expect(response.body.address.number).toBe("Number 1");
    expect(response.body.address.complement).toBe("Complement 1");
    expect(response.body.address.city).toBe("City 1");
    expect(response.body.address.state).toBe("State 1");
    expect(response.body.address.zipCode).toBe("ZipCode 1");
    expect(response.body.total).toBe(300);
    expect(response.body.items.length).toBe(2);
    expect(response.body.items[0].name).toBe("Item 1");
    expect(response.body.items[0].price).toBe(100);
    expect(response.body.items[1].name).toBe("Item 2");
    expect(response.body.items[1].price).toBe(200);
  });
});

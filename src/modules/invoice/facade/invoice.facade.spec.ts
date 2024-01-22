import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
// import ItemModel from "../repository/item.model";
import InvoiceFacadeFactory from "../factory/facade.factory";
import { FindInvoiceFacadeInputDto } from "./invoice.facade.dto";
import ProductModel from "../repository/item.model";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });
  it("Should generate a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    const input = {
      name: "name",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city 1",
      zipCode: "zipCode 1",
      state: "state 1",
      items: [
        {
          name: "name",
          price: 100,
        },
        {
          name: "name 2",
          price: 200,
        },
      ],
    };
    const output = await facade.generate(input);
    expect(output).toBeDefined();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);
    expect(output.total).toBe(300);
    expect(output.items.length).toBe(2);
    expect(output.items[0].id).toBeDefined();
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBeDefined();
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
  });
  it("Should find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    const input = {
      name: "name",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city 1",
      zipCode: "zipCode 1",
      state: "state 1",
      items: [
        {
          name: "name",
          price: 100,
        },
        {
          name: "name 2",
          price: 200,
        },
      ],
    };
    const input2 = {
      name: "name",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city 1",
      zipCode: "zipCode 1",
      state: "state 1",
      items: [
        {
          name: "name",
          price: 100,
        },
        {
          name: "name 2",
          price: 200,
        },
      ],
    };

    const generatedInvoice = await facade.generate(input);
    await facade.generate(input2);
    const findInput: FindInvoiceFacadeInputDto = {
      id: generatedInvoice.id,
    };
    const foundInvoice = await facade.find(findInput);

    expect(foundInvoice).toBeDefined();
    expect(foundInvoice.id).toBe(generatedInvoice.id);
    expect(foundInvoice.name).toBe(input.name);
    expect(foundInvoice.document).toBe(input.document);
    expect(foundInvoice.address.street).toBe(input.street);
    expect(foundInvoice.address.number).toBe(input.number);
    expect(foundInvoice.address.complement).toBe(input.complement);
    expect(foundInvoice.address.state).toBe(input.state);
    expect(foundInvoice.address.zipCode).toBe(input.zipCode);
    expect(foundInvoice.address.city).toBe(input.city);
    expect(foundInvoice.items[0].id).toBe(generatedInvoice.items[0].id);
    expect(foundInvoice.items[0].name).toBe(input.items[0].name);
    expect(foundInvoice.items[0].price).toBe(input.items[0].price);
    expect(foundInvoice.items[1].id).toBe(generatedInvoice.items[1].id);
    expect(foundInvoice.items[1].name).toBe(input.items[1].name);
    expect(foundInvoice.items[1].price).toBe(input.items[1].price);
    expect(foundInvoice.total).toBe(300);
    expect(foundInvoice.items.length).toBe(2);
  });
});

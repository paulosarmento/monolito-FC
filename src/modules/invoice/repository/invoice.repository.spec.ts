import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceModel from "./invoice.model";
// import ItemModel from "./item.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice.entity";
import Address from "../value-object/address";
// import InvoiceItems from "../domain/invoice.items.entity";
import ProductModel from "./item.model";
import Product from "../domain/invoice.items.entity";

describe("InvoiceRepository test", () => {
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

  it("should create a invoice", async () => {
    const invoiceRepository = new InvoiceRepository();
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 1",
      address: new Address(
        "Street 1",
        "Number 1",
        "Complement 1",
        "City 1",
        "State 1",
        "ZipCode 1"
      ),
      items: [
        new Product({
          id: new Id("1"),
          name: "Item 1",
          price: 100,
        }),
        new Product({
          id: new Id("2"),
          name: "Item 2",
          price: 200,
        }),
      ],
    });
    await invoiceRepository.generate(invoice);
    const invoiceModel = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [ProductModel],
    });
    expect(invoiceModel.toJSON()).toStrictEqual({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zip,
      total: invoice.total,
      createdAt: expect.any(Date),
      items: [
        {
          id: invoice.items[0].id.id,
          invoiceId: invoice.id.id,
          name: invoice.items[0].name,
          price: invoice.items[0].price,
        },
        {
          id: invoice.items[1].id.id,
          invoiceId: invoice.id.id,
          name: invoice.items[1].name,
          price: invoice.items[1].price,
        },
      ],
    });
  });
  it("should find a invoice", async () => {
    const invoiceModel = await InvoiceModel.create({
      id: "1",
      name: "Product 1",
      document: "Product 1 description",
      street: "Street 1",
      number: "Number 1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "ZipCode 1",
      total: 300,
      createdAt: new Date(),
    });
    await InvoiceModel.create({
      id: "2",
      name: "Product 2",
      document: "Product 2 description",
      street: "Street 2",
      number: "Number 2",
      complement: "Complement 2",
      city: "City 2",
      state: "State 2",
      zipCode: "ZipCode 2",
      total: 300,
      createdAt: new Date(),
    });

    const items = [
      {
        id: "1",
        name: "Item 1",
        price: 100,
        invoiceId: invoiceModel.id,
      },
      {
        id: "2",
        name: "Item 2",
        price: 200,
        invoiceId: invoiceModel.id,
      },
    ];

    await ProductModel.bulkCreate(items);
    const invoiceRepository = new InvoiceRepository();

    const invoice = await invoiceRepository.find("1");
    expect(invoice.id.id).toEqual("1");
    expect(invoice.name).toEqual("Product 1");
    expect(invoice.document).toEqual("Product 1 description");
    expect(invoice.address.street).toEqual("Street 1");
    expect(invoice.address.number).toEqual("Number 1");
    expect(invoice.address.complement).toEqual("Complement 1");
    expect(invoice.address.state).toEqual("State 1");
    expect(invoice.address.zip).toEqual("ZipCode 1");
    expect(invoice.address.city).toEqual("City 1");
    expect(invoice.items[0].id.id).toEqual("1");
    expect(invoice.items[0].name).toEqual("Item 1");
    expect(invoice.items[0].price).toEqual(100);
    expect(invoice.items[1].id.id).toEqual("2");
    expect(invoice.items[1].name).toEqual("Item 2");
    expect(invoice.items[1].price).toEqual(200);
    expect(invoice.total).toEqual(300);
    expect(invoice.items.length).toEqual(2);
  });
});

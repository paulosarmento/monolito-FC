import { Sequelize } from "sequelize-typescript";
import CheckoutFacadeFactory from "../factory/facade.factory";
import { ClientCheckoutModel } from "../repository/client.model";
import OrderModel from "../repository/order.model";
import ProductCheckoutModel from "../repository/product.model";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

describe("CheckoutFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([
      OrderModel,
      ClientCheckoutModel,
      ProductCheckoutModel,
    ]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const facade = CheckoutFacadeFactory.create();
    const client = new Client({
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
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    });
    const product2 = new Product({
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 200,
    });

    const orderDto = {
      clientId: client.id.id,
      products: [{ productId: product.id.id }, { productId: product2.id.id }],
    };
    const output = await facade.placeOrder(orderDto);
    expect(output).toBeDefined();
  });
});

import { Sequelize } from "sequelize-typescript";
import CheckoutFacadeFactory from "../factory/facade.factory";
import { ClientCheckoutModel } from "../repository/client.model";
import OrderModel from "../repository/order.model";
import ProductCheckoutModel from "../repository/product.model";

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
    // Entender melhor essa parte ...
    // const facade = CheckoutFacadeFactory.create();
    // const orderDto = {
    //   id: "1",
    //   client: [
    //     {
    //       id: "1c",
    //       name: "client 1",
    //       email: "client 1",
    //       document: "client 1",
    //       street: "client 1",
    //       number: "client 1",
    //       complement: "client 1",
    //       city: "client 1",
    //       state: "client 1",
    //       zipCode: "client 1",
    //     },
    //   ],
    //   products: [
    //     {
    //       id: "1",
    //       name: "product 1",
    //       description: "product 1",
    //       salesPrice: 10,
    //     },
    //     {
    //       id: "2",
    //       name: "product 2",
    //       description: "product 2",
    //       salesPrice: 20,
    //     },
    //   ],
    //   status: "created",
    // };
    // const output = await facade.placeOrder(orderDto);
    // expect(output).toBeDefined();
  });
});

import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/order.model";
import { ClientModel } from "../repository/client.model";
import ProductModel from "../repository/product.model";
import CheckoutFacadeFactory from "../factory/facade.factory";

describe("CheckoutFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([OrderModel, ClientModel, ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });
  it("should create a order", async () => {
    // Entender melhor essa parte
    const facade = CheckoutFacadeFactory.create();
    const input = {
      clientId: "1",
      products: [
        {
          productId: "1",
        },
      ],
    };
  });
});

import { Sequelize } from "sequelize-typescript";
import ProductCheckoutModel from "../repository/product.model";
import ClientCheckoutModel from "../repository/client.model";
import OrderModel from "../repository/order.model";
import CheckoutFacadeFactory from "../factory/facade.factory";
import { ClientAdmModel } from "../../client-adm/repository/client.model";
import { ProductAdmModel } from "../../product-adm/repository/product.model";
import InvoiceModel from "../../invoice/repository/invoice.model";
import ProductInvoiceModel from "../../invoice/repository/product.model";
import TransactionModel from "../../payment/repository/transaction.model";
import ProductStoreModel from "../../store-catalog/repository/product.model";

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
      ProductAdmModel,
      ClientAdmModel,
      InvoiceModel,
      ProductInvoiceModel,
      TransactionModel,
      ProductStoreModel,
      ProductCheckoutModel,
      ClientCheckoutModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a checkout", async () => {
    // Mock dependencies
    // const productAdmModel = await ProductAdmModel.create({});
    // const clientAdmModel = await ClientAdmModel.create({});
    // const invoiceModel = await InvoiceModel.create({});
    // const productInvoiceModel = await ProductInvoiceModel.create({});
    // const transactionModel = await TransactionModel.create({});
    // const productStoreModel = await ProductStoreModel.create({});
    // const productCheckoutModel = await ProductCheckoutModel.create({});
    // const clientCheckoutModel = await ClientCheckoutModel.create({});
    // const orderModel = await OrderModel.create({});

    const input = {
      clientId: "1",
      products: [
        {
          productId: "1",
        },
        {
          productId: "2",
        },
      ],
    };

    const facade = CheckoutFacadeFactory.create();
    // const output = await facade.placeOrder(input);
    // expect(output).toBeDefined();
  });
});

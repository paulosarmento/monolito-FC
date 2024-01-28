import { Sequelize } from "sequelize-typescript";
import { ClientAdmModel } from "../../client-adm/repository/client.model";
import { ProductAdmModel } from "../../product-adm/repository/product.model";
import InvoiceModel from "../../invoice/repository/invoice.model";
import ProductInvoiceModel from "../../invoice/repository/product.model";
import TransactionModel from "../../payment/repository/transaction.model";
import ProductStoreModel from "../../store-catalog/repository/product.model";
import ProductCheckoutModel from "../repository/product.model";
import ClientCheckoutModel from "../repository/client.model";
import OrderModel from "../repository/order.model";
import CheckoutFacadeFactory from "../factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";

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
      ClientAdmModel,
      InvoiceModel,
      ProductInvoiceModel,
      TransactionModel,
      ProductCheckoutModel,
      ProductStoreModel,
      ProductAdmModel,
      ClientCheckoutModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should place a order", async () => {
    const facadeCheckout = CheckoutFacadeFactory.create();
    const facadeClient = ClientAdmFacadeFactory.create();
    const facadeProduct = ProductAdmFacadeFactory.create();

    await facadeClient.add({
      id: "1c",
      name: "Client 1",
      email: "Email 1",
      document: "Document 1",
      street: "Street 1",
      number: "Number 1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "ZipCode 1",
    });
    await facadeProduct.addProduct({
      id: "1p",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
    });
    await facadeProduct.addProduct({
      id: "2p",
      name: "Product 2",
      description: "Description 2",
      purchasePrice: 300,
      stock: 10,
    });

    const result = await facadeCheckout.placeOrder({
      clientId: "1c",
      products: [
        {
          productId: "1p",
        },
        {
          productId: "2p",
        },
      ],
    });

    expect(result.status).toEqual("approved");
    expect(result.total).toEqual(400);
    expect(result.products).toHaveLength(2);
    expect(result.products[0].productId).toEqual("1p");
    expect(result.products[1].productId).toEqual("2p");
  });
  it("should not be able to place an order", async () => {
    const facadeCheckout = CheckoutFacadeFactory.create();
    await expect(
      facadeCheckout.placeOrder({
        clientId: "1p",
        products: [
          {
            productId: "1p",
          },
          {
            productId: "2p",
          },
        ],
      })
    ).rejects.toThrow("Client not found");
  });
});

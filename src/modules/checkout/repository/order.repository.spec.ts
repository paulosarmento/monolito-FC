import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model";
import Order from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";
import ClientCheckoutModel from "./client.model";
import ProductCheckoutModel from "./product.model";
import OrderRepository from "./order.repository";

describe("CheckoutRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      OrderModel,
      ClientCheckoutModel,
      ProductCheckoutModel,
    ]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });
  it("should add an order", async () => {
    const order = new Order({
      id: new Id("1o"),
      client: new Client({
        id: new Id("1c"),
        name: "Client 1",
        email: "Email 1",
        address: "Address 1",
      }),
      products: [
        new Product({
          id: new Id("1p"),
          name: "Product 1",
          description: "Description 1",
          salesPrice: 100,
        }),
        new Product({
          id: new Id("2p"),
          name: "Product 2",
          description: "Description 2",
          salesPrice: 200,
        }),
      ],
      status: "approved",
    });
    const checkoutRepository = new OrderRepository();
    await checkoutRepository.addOrder(order);
    const orderModel = await OrderModel.findOne({
      where: { id: "1o" },
      include: [ClientCheckoutModel, ProductCheckoutModel],
    });
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id.id,
      client: {
        id: order.client.id.id,
        orderId: order.id.id,
        name: order.client.name,
        email: order.client.email,
        address: order.client.address,
      },

      products: [
        {
          id: order.products[0].id.id,
          orderId: order.id.id,
          name: order.products[0].name,
          description: order.products[0].description,
          salesPrice: order.products[0].salesPrice,
        },
        {
          id: order.products[1].id.id,
          orderId: order.id.id,
          name: order.products[1].name,
          description: order.products[1].description,
          salesPrice: order.products[1].salesPrice,
        },
      ],
      status: order.status,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
  it("should find an order", async () => {
    const orderModel = await OrderModel.create(
      {
        id: "1o",
        client: [
          {
            id: "1",
            name: "Client 1",
            email: "email",
            address: "Address 1",
          },
        ],
        products: [
          {
            id: "1p",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
          },
          {
            id: "2p",
            name: "Product 2",
            description: "Description 2",
            salesPrice: 200,
          },
        ],

        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [ClientCheckoutModel, ProductCheckoutModel],
      }
    );
    const checkoutRepository = new OrderRepository();
    const order = await checkoutRepository.findOrder("1o");
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id.id,
      client: {
        id: order.client.id.id,
        orderId: order.id.id,
        name: order.client.name,
        email: order.client.email,
        address: order.client.address,
      },

      products: [
        {
          id: order.products[0].id.id,
          orderId: order.id.id,
          name: order.products[0].name,
          description: order.products[0].description,
          salesPrice: order.products[0].salesPrice,
        },
        {
          id: order.products[1].id.id,
          orderId: order.id.id,
          name: order.products[1].name,
          description: order.products[1].description,
          salesPrice: order.products[1].salesPrice,
        },
      ],
      status: order.status,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});

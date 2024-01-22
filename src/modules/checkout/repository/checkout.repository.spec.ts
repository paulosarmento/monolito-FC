import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model";
import CheckoutRepository from "./checkout.repository";
import Order from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";
import { ClientCheckoutModel } from "./client.model";
import ProductCheckoutModel from "./product.model";

describe("CheckoutRepository test", () => {
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
  it("should add an order", async () => {
    const order = new Order({
      id: new Id("1o"),
      client: [
        new Client({
          id: new Id("1c"),
          name: "Client 1",
          email: "Email 1",
          document: "Document 1",
          street: "Street 1",
          number: "Number 1",
          complement: "Complement 1",
          city: "City 1",
          state: "State 1",
          zipCode: "ZipCode 1",
        }),
      ],
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
    const checkoutRepository = new CheckoutRepository();
    await checkoutRepository.addOrder(order);
    const orderModel = await OrderModel.findOne({
      where: { id: "1o" },
      include: [ClientCheckoutModel, ProductCheckoutModel],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id.id,
      client: [
        {
          id: order.client[0].id.id,
          orderId: order.id.id,
          name: order.client[0].name,
          email: order.client[0].email,
          document: order.client[0].document,
          street: order.client[0].street,
          number: order.client[0].number,
          complement: order.client[0].complement,
          city: order.client[0].city,
          state: order.client[0].state,
          zipCode: order.client[0].zipCode,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],

      products: [
        {
          id: order.products[0].id.id,
          orderId: order.id.id,
          name: order.products[0].name,
          description: order.products[0].description,
          salesPrice: order.products[0].salesPrice,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: order.products[1].id.id,
          orderId: order.id.id,
          name: order.products[1].name,
          description: order.products[1].description,
          salesPrice: order.products[1].salesPrice,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
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
            document: "document",
            street: "street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        products: [
          {
            id: "1p",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2p",
            name: "Product 2",
            description: "Description 2",
            salesPrice: 200,
            createdAt: new Date(),
            updatedAt: new Date(),
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
    const checkoutRepository = new CheckoutRepository();
    const order = await checkoutRepository.findOrder("1o");
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id.id,
      client: [
        {
          id: order.client[0].id.id,
          orderId: order.id.id,
          name: order.client[0].name,
          email: order.client[0].email,
          document: order.client[0].document,
          street: order.client[0].street,
          number: order.client[0].number,
          complement: order.client[0].complement,
          city: order.client[0].city,
          state: order.client[0].state,
          zipCode: order.client[0].zipCode,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],

      products: [
        {
          id: order.products[0].id.id,
          orderId: order.id.id,
          name: order.products[0].name,
          description: order.products[0].description,
          salesPrice: order.products[0].salesPrice,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: order.products[1].id.id,
          orderId: order.id.id,
          name: order.products[1].name,
          description: order.products[1].description,
          salesPrice: order.products[1].salesPrice,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],
      status: order.status,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});

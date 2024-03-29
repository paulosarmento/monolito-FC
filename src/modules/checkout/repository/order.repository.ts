import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientCheckoutModel from "./client.model";

import OrderModel from "./order.model";
import ProductCheckoutModel from "./product.model";

export default class OrderRepository implements CheckoutGateway {
  async addClient(client: Client): Promise<void> {
    await ClientCheckoutModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
    });
  }
  async add(product: Product): Promise<void> {
    await ProductCheckoutModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
  async addOrder(order: Order): Promise<Order> {
    const createdOrder = await OrderModel.create(
      {
        id: order.id.id,
        client: {
          id: order.client.id.id,
          orderId: order.id.id,
          name: order.client.name,
          email: order.client.email,
          address: order.client.address,
        },

        products: order.products.map((product) => ({
          id: product.id.id,
          orderId: order.id.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })),

        status: order.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [ClientCheckoutModel, ProductCheckoutModel],
      }
    );
    const result = new Order({
      id: new Id(createdOrder.id),
      client: new Client({
        id: new Id(createdOrder.client.id),
        name: createdOrder.client.name,
        email: createdOrder.client.email,
        address: createdOrder.client.address,
      }),
      products: createdOrder.products.map(
        (product) =>
          new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
          })
      ),
      status: createdOrder.status,
    });
    return result;
  }
  async findOrder(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id: "1o" },
      include: [ClientCheckoutModel, ProductCheckoutModel],
    });

    if (!order) {
      throw new Error(`Order ${id} not found`);
    }
    const client = new Client({
      id: new Id(order.client.id),
      name: order.client.name,
      email: order.client.email,
      address: order.client.address,
    });

    const product = order.products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );

    const result = new Order({
      id: new Id(order.id),
      client: client,
      products: product,
      status: order.status,
    });

    return result;
  }
}

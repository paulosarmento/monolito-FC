import Id from "../../@shared/domain/value-object/id.value-object";
import ClientCheckout from "../domain/client.entity";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { ClientModel } from "./client.model";

import OrderModel from "./order.model";
import ProductModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<Order> {
    const createdOrder = await OrderModel.create(
      {
        id: order.id.id,
        client: order.client.map((client) => ({
          id: client.id.id,
          name: client.name,
          email: client.email,
          document: client.document,
          street: client.street,
          number: client.number,
          complement: client.complement,
          city: client.city,
          state: client.state,
          zipCode: client.zipCode,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        products: order.products.map((product) => ({
          id: product.id.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        })),

        status: order.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [ClientModel, ProductModel],
      }
    );
    const result = new Order({
      id: new Id(createdOrder.id),
      client: createdOrder.client.map(
        (client) =>
          new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
      ),
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
      include: [ClientModel, ProductModel],
    });

    if (!order) {
      throw new Error(`Order ${id} not found`);
    }
    const client = order.client.map(
      (client) =>
        new Client({
          id: new Id(client.id),
          name: client.name,
          email: client.email,
          document: client.document,
          street: client.street,
          number: client.number,
          complement: client.complement,
          city: client.city,
          state: client.state,
          zipCode: client.zipCode,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
    );

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

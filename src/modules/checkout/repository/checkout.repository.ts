import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";

export default class CheckoutRepository implements CheckoutGateway {
  async addClient(client: Client): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async add(product: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async addOrder(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async findOrder(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

import {
  RepositoryInterface,
  RepositoryClientInterface,
} from "../../@shared/repository/repository-interface";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";

export default interface CheckoutGateway
  extends RepositoryInterface<Product>,
    RepositoryClientInterface<Client> {
  add(product: Product): Promise<void>;
  addOrder(order: Order): Promise<Order>;
  findOrder(id: string): Promise<Order | null>;
  addClient(client: Client): Promise<void>;
}

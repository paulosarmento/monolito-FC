import RepositoryInterface from "../../@shared/repository/repository-interface";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";

export default interface CheckoutGateway extends RepositoryInterface<Product> {
  add(product: Product): Promise<void>;
  addOrder(order: Order): Promise<Order>;
  findOrder(id: string): Promise<Order | null>;
}

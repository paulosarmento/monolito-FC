import { RepositoryInterface } from "../../@shared/repository/repository-interface";
import Product from "../domain/product.entity";

export default interface ProductGateway extends RepositoryInterface<Product> {
  add(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}

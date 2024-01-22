import RepositoryInterface from "../../@shared/repository/repository-interface";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/invoice.items.entity";
export default interface InvoiceGateway extends RepositoryInterface<Product> {
  add(product: Product): Promise<void>;
  generate(input: Invoice): Promise<Invoice>;
  find(id: string): Promise<Invoice>;
}

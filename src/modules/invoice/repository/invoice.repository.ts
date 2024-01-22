import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/invoice.items.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../value-object/address";
import InvoiceModel from "./invoice.model";
import ItemModel from "./item.model";

export default class InvoiceRepository implements InvoiceGateway {
  async add(product: Product): Promise<void> {
    await ItemModel.create({
      id: product.id.id,
      name: product.name,
      price: product.price,
    });
  }
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [ItemModel],
    });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    // console.log("Items loaded:", invoice.items);

    const result = new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipCode
      ),
      items: invoice.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
      createdAt: invoice.createdAt,
    });

    return result;
  }
  async generate(input: Invoice): Promise<Invoice> {
    const createdInvoice = await InvoiceModel.create(
      {
        id: input.id.id,
        name: input.name,
        document: input.document,
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        city: input.address.city,
        state: input.address.state,
        zipCode: input.address.zip,
        total: input.total,
        createdAt: new Date(),
        items: input.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
      },
      {
        include: [ItemModel],
      }
    );

    const result = new Invoice({
      id: new Id(createdInvoice.id),
      name: createdInvoice.name,
      document: createdInvoice.document,
      address: new Address(
        createdInvoice.street,
        createdInvoice.number,
        createdInvoice.complement,
        createdInvoice.city,
        createdInvoice.state,
        createdInvoice.zipCode
      ),
      items: createdInvoice.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
      createdAt: createdInvoice.createdAt,
    });

    return result;
  }
}

import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase {
  constructor(private readonly invoiceRepository: InvoiceGateway) {}

  async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
    const invoice = await this.invoiceRepository.find(input.id);
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        state: invoice.address.state,
        zipCode: invoice.address.zip,
        city: invoice.address.city,
      },
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
    };
  }
}

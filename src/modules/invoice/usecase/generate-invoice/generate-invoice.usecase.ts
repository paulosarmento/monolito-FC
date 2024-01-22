import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Address from "../../value-object/address";
import {
  GenerateInvoiceInputDto,
  GenerateInvoiceOutputDto,
} from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceInputDto
  ): Promise<GenerateInvoiceOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    );
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: address,
      items: input.items.map((item) => {
        return new Product({
          name: item.name,
          price: item.price,
        });
      }),
    });

    const generateInvoice = await this.invoiceRepository.generate(invoice);

    return {
      id: generateInvoice.id.id,
      name: generateInvoice.name,
      document: generateInvoice.document,
      street: generateInvoice.address.street,
      number: generateInvoice.address.number,
      complement: generateInvoice.address.complement,
      zipCode: generateInvoice.address.zip,
      city: generateInvoice.address.city,
      state: generateInvoice.address.state,
      items: generateInvoice.items.map((item) => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
        };
      }),
      total: generateInvoice.total,
    };
  }
}

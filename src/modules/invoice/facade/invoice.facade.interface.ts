import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.dto";

export default interface InvoiceFacadeInterface {
  find(id: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto>;
}

import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export interface UseCasesProps {
  findUseCase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _generateUseCase: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this._findUseCase = useCasesProps.findUseCase;
    this._generateUseCase = useCasesProps.generateUseCase;
  }
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }
  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateUseCase.execute(input);
  }
}

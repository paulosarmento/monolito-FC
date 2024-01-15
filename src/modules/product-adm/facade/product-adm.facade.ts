import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}
export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUseCase = usecasesProps.addUseCase;
    this._checkStockUseCase = usecasesProps.addUseCase;
  }
  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for != do dto do facade, converter o dtoda facade para o dto do caso de uso
    return this._addUseCase.execute(input);
  }
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input);
  }
}

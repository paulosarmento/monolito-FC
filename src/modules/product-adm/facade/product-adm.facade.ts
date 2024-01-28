import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
  FindAllProductsDto,
  FindProductFacadeInputDto,
  FindProductFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
  findAllUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;
  private _findAllUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUseCase = usecasesProps.addUseCase;
    this._checkStockUseCase = usecasesProps.stockUseCase;
    this._findUseCase = usecasesProps.findUseCase;
    this._findAllUseCase = usecasesProps.findAllUseCase;
  }
  findAll(): Promise<FindAllProductsDto> {
    return this._findAllUseCase.execute({});
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
    return await this._addUseCase.execute(input);
  }
  async checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return await this._checkStockUseCase.execute(input);
  }

  async find(
    input: FindProductFacadeInputDto
  ): Promise<FindProductFacadeOutputDto> {
    return await this._findUseCase.execute(input);
  }
}

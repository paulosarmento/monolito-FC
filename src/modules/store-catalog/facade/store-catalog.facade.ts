import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  AddProductFacadeInputDto,
  AddProductFacadeOutputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUseCase;
  addUseCase: AddProductUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: FindProductUseCase;
  private _findAllUseCase: FindAllProductsUseCase;
  private _addUseCase: AddProductUseCase;

  constructor(useCaseProps: UseCaseProps) {
    this._findUseCase = useCaseProps.findUseCase;
    this._findAllUseCase = useCaseProps.findAllUseCase;
    this._addUseCase = useCaseProps.addUseCase;
  }

  async find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findUseCase.execute(id);
  }
  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllUseCase.execute();
  }
  async add(
    input: AddProductFacadeInputDto
  ): Promise<AddProductFacadeOutputDto> {
    return await this._addUseCase.execute(input);
  }
}

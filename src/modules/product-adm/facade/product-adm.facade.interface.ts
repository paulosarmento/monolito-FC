export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadeOutputDto {
  productId: string;
  stock: number;
}

export interface FindProductFacadeInputDto {
  id: string;
}
export interface FindProductFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}
export interface FindAllProductsDto {
  products: {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
  }[];
}

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>;
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto>;
  find(input: FindProductFacadeInputDto): Promise<FindProductFacadeOutputDto>;
  findAll(): Promise<FindAllProductsDto>;
}

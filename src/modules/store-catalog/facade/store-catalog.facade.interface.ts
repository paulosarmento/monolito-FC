export interface FindStoreCatalogFacadeInputDto {
  id: string;
}
export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface AddProductFacadeInputDto {
  name: string;
  description: string;
  salesPrice: number;
}
export interface AddProductFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export default interface StoreCatalogFacadeInterface {
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>;

  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
  add(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto>;
}

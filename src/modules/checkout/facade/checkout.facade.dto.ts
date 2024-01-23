export interface PlaceOrderFacadeInputDto {
  id: string;
  client: {
    id: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  }[];

  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];

  status: string;
}

export interface PlaceOrderFacadeOutputDto {
  id: string;
  client: {
    id: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  }[];

  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];

  status: string;
}

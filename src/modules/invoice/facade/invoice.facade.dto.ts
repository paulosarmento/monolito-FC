export interface FindInvoiceFacadeInputDto {
  id: string;
}
export interface FindInvoiceFacadeOutputDto {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    state: string;
    complement: string;
    zipCode: string;
    city: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}
export interface GenerateInvoiceFacadeInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  state: string;
  city: string;
  zipCode: string;
  items: {
    name: string;
    price: number;
  }[];
}
export interface GenerateInvoiceFacadeOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  state: string;
  city: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

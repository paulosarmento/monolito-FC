export interface GenerateInvoiceInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  city: string;
  state: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}
export interface GenerateInvoiceOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  city: string;
  state: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

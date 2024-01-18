export interface FindInvoiceInputDto {
  id: string;
}
export interface FindInvoiceOutputDto {
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

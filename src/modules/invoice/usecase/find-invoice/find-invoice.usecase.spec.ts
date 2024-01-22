import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "Document 1",
  address: new Address(
    "Street 1",
    "Number 1",
    "Complement 1",
    "City 1",
    "State 1",
    "ZipCode 1"
  ),
  items: [
    new Product({
      id: new Id("1"),
      name: "Item 1",
      price: 100,
    }),
    new Product({
      id: new Id("2"),
      name: "Item 2",
      price: 200,
    }),
  ],
});
const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  };
};

describe("find invoice useCase unit test", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = MockRepository();
    const useCase = new FindInvoiceUseCase(invoiceRepository);
    const input = {
      id: "1",
    };
    const result = await useCase.execute(input);
    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zip);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.items[0].id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBe(invoice.items[1].id.id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(300);
  });
});

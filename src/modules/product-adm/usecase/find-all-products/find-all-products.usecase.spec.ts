import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 10,
  stock: 100,
});
const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product 2 description",
  purchasePrice: 20,
  stock: 200,
});
const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    find: jest.fn(),
    add: jest.fn(),
  };
};

describe("find all products useCase unit test", () => {
  it("should find all products", async () => {
    const productRepository = MockRepository();
    const useCase = new FindAllProductsUseCase(productRepository);

    const result = await useCase.execute();
    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product.id.id);
    expect(result.products[0].name).toBe(product.name);
    expect(result.products[0].description).toBe(product.description);
    expect(result.products[0].purchasePrice).toBe(product.purchasePrice);
    expect(result.products[0].stock).toBe(product.stock);
    expect(result.products[1].id).toBe(product2.id.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].description).toBe(product2.description);
    expect(result.products[1].purchasePrice).toBe(product2.purchasePrice);
    expect(result.products[1].stock).toBe(product2.stock);
  });
});

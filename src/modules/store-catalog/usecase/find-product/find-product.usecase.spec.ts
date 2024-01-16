import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 10,
});
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe("find product useCase unit test", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);
    const input = {
      id: "1",
    };
    const result = await useCase.execute(input);
    expect(productRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(product.id.id);
    expect(result.name).toBe(product.name);
    expect(result.description).toBe(product.description);
    expect(result.salesPrice).toBe(product.salesPrice);
  });
});

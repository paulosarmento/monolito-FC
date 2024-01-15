import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import ProductRepository from "./product.repository";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });
    await productRepository.add(product);
    const productModel = await ProductModel.findOne({
      where: { id: product.id.id },
    });
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  });
});

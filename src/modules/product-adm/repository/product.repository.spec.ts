import { Sequelize } from "sequelize-typescript";
import { ProductAdmModel } from "./product.model";
import Product from "../domain/product.entity";
import ProductAdmRepository from "./product.repository";
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
    await sequelize.addModels([ProductAdmModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductAdmRepository();
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });
    await productRepository.add(product);
    const productModel = await ProductAdmModel.findOne({
      where: { id: product.id.id },
    });
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
  it("should find a product", async () => {
    const productRepository = new ProductAdmRepository();

    ProductAdmModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const product = await productRepository.find("1");

    expect(product.id.id).toEqual("1");
    expect(product.name).toEqual("Product 1");
    expect(product.description).toEqual("Product 1 description");
    expect(product.purchasePrice).toEqual(100);
    expect(product.stock).toEqual(10);
  });
});

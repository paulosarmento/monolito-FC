import express, { Request, Response } from "express";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductAdmRepository from "../../../modules/product-adm/repository/product.repository";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const useCase = ProductAdmFacadeFactory.create();
  try {
    const requiredFields = ["name", "description", "purchasePrice", "stock"];

    const missingFields = requiredFields.filter(
      (field) => !req.body.hasOwnProperty(field)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const productDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };
    const output = await useCase.addProduct(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
productsRoute.get("/", async (req: Request, res: Response) => {
  const useCase = ProductAdmFacadeFactory.create();
  try {
    const output = await useCase.findAll();
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
productsRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = ProductAdmFacadeFactory.create();
  try {
    const productDto = {
      id: req.params.id,
    };

    const output = await useCase.find(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

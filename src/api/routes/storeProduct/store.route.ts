import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import express, { Request, Response } from "express";

export const storeRoute = express.Router();

storeRoute.post("/", async (req: Request, res: Response) => {
  const useCase = StoreCatalogFacadeFactory.create();
  try {
    const productDto = {
      name: req.body.name,
      description: req.body.description,
      salesPrice: req.body.salesPrice,
    };
    const output = await useCase.add(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
storeRoute.get("/", async (req: Request, res: Response) => {
  const useCase = StoreCatalogFacadeFactory.create();
  try {
    const output = await useCase.findAll();
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
storeRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = StoreCatalogFacadeFactory.create();
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

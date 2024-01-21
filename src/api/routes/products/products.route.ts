import express, { Request, Response } from "express";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  // const useCase = new AddProductUseCase(new ProductRepository());
  // try {
  //   const customerDto = {
  //     name: req.body.name,
  //     address: {
  //       street: req.body.address.street,
  //       city: req.body.address.city,
  //       number: req.body.address.number,
  //       zip: req.body.address.zip,
  //     },
  //   };
  // const output = await useCase.execute(customerDto);
  // res.send(output);
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});

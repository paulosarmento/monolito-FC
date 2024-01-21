import express, { Request, Response } from "express";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  // Entender melhor essa parte
  // const useCase = new PlaceOrderUseCase(new CheckoutRepository());
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

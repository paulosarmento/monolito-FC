import express, { Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/facade.factory";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  // Entender melhor essa parte ...
  try {
    const useCase = CheckoutFacadeFactory.create();

    const orderDto = {
      clientId: req.body.clientId,
      products: req.body.products.map((product: { productId: string }) => ({
        productId: product.productId,
      })),
    };

    const output = await useCase.placeOrder(orderDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

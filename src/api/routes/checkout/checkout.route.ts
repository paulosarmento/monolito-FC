import express, { Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/facade.factory";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  // Entender melhor essa parte ...
  try {
    const useCase = CheckoutFacadeFactory.create();

    const orderDto = {
      id: req.body.id,
      client: [
        {
          id: req.body.client.id,
          name: req.body.client.name,
          email: req.body.client.email,
          document: req.body.client.document,
          street: req.body.client.street,
          number: req.body.client.number,
          complement: req.body.client.complement,
          city: req.body.client.city,
          state: req.body.client.state,
          zipCode: req.body.client.zipCode,
        },
      ],

      products: [
        {
          id: req.body.products[0].id,
          name: req.body.products[0].name,
          description: req.body.products[0].description,
          salesPrice: req.body.products[0].salesPrice,
        },
      ],

      status: req.body.status,
    };

    const output = await useCase.placeOrder(orderDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

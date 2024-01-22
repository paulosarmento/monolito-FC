import express, { Request, Response } from "express";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  // Entender melhor essa parte
  try {
    const useCase = new PlaceOrderUseCase(
      ClientAdmFacadeFactory.create(),
      ProductAdmFacadeFactory.create(),
      StoreCatalogFacadeFactory.create(),
      new CheckoutRepository(),
      InvoiceFacadeFactory.create(),
      PaymentFacadeFactory.create()
    );
    const orderDto = {
      clientId: req.body.clientId,
      products: [
        {
          productId: req.body.products[0].productId,
        },
        {
          productId: req.body.products[1].productId,
        },
      ],
    };

    const output = await useCase.execute(orderDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

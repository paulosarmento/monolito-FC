import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = InvoiceFacadeFactory.create();
  try {
    const invoiceDto = {
      id: req.params.id,
    };
    const output = await useCase.find(invoiceDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
invoiceRoute.post("/", async (req: Request, res: Response) => {
  const useCase = InvoiceFacadeFactory.create();
  try {
    const invoiceDto = {
      id: req.body.id,
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      total: req.body.total,
      items: req.body.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        invoiceId: item.invoiceId,
        createdAt: new Date(),
      })),
    };
    const output = await useCase.generate(invoiceDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

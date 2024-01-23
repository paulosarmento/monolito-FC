import express, { Request, Response } from "express";
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find-invoice/find-invoice.usecase";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import GenerateInvoiceUseCase from "../../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
export const invoiceRoute = express.Router();

invoiceRoute.get("/", async (req: Request, res: Response) => {
  const useCase = InvoiceFacadeFactory.create();
  try {
    const invoiceDto = {
      id: req.body.id,
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
      id: req.body.invoice.id,
      name: req.body.invoice.name,
      document: req.body.invoice.document,
      street: req.body.invoice.street,
      number: req.body.invoice.number,
      complement: req.body.invoice.complement,
      city: req.body.invoice.city,
      state: req.body.invoice.state,
      zipCode: req.body.invoice.zipCode,
      items: [
        {
          id: req.body.invoice.items[0].id,
          name: req.body.invoice.items[0].name,
          price: req.body.invoice.items[0].price,
        },
        {
          id: req.body.invoice.items[1].id,
          name: req.body.invoice.items[1].name,
          price: req.body.invoice.items[1].price,
        },
      ],
    };
    const output = await useCase.generate(invoiceDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

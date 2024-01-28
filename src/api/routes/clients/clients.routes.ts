import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
  const useCase = ClientAdmFacadeFactory.create();
  try {
    const requiredFields = [
      "name",
      "email",
      "document",
      "street",
      "number",
      "city",
      "state",
      "zipCode",
    ];

    const missingFields = requiredFields.filter(
      (field) => !req.body.hasOwnProperty(field)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const clientDto = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };

    const output = await useCase.add(clientDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
clientsRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = ClientAdmFacadeFactory.create();
  try {
    const clientDto = {
      id: req.params.id,
    };
    const output = await useCase.find(clientDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

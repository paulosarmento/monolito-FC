import express, { Request, Response } from "express";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
  // const useCase = new AddClientUseCase(new ClientRepository());
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

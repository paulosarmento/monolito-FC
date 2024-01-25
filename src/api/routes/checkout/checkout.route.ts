import express, { Request, Response } from "express";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  // Entender melhor essa parte ...
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

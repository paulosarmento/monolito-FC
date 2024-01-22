import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/products/products.route";
import { clientsRoute } from "./routes/clients/clients.route";
import { invoiceRoute } from "./routes/invoice/invoice.route";
import { checkoutRoute } from "./routes/checkout/checkout.route";
import { Umzug } from "umzug";
import { migrator } from "./config-migrations/migrator";
import OrderModel from "../modules/checkout/repository/order.model";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import ProductModel from "../modules/checkout/repository/product.model";
import ItemModel from "../modules/invoice/repository/item.model";

export const app: Express = express();
app.use(express.json());
app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice/<id>", invoiceRoute);

export let sequelize: Sequelize;
export let migration: Umzug<any>;
async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  // Entender melhor essa parte
  sequelize.addModels([
    ProductModel,
    OrderModel,
    InvoiceModel,
    ClientModel,
    ItemModel,
  ]);
  migration = migrator(sequelize);
  await migration.up();
}
setupDb();

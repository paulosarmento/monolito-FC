import express, { Express } from "express";
import { join } from "path";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/products/products.route";
import { invoiceRoute } from "./routes/invoice/invoice.route";
import { checkoutRoute } from "./routes/checkout/checkout.route";
import { Umzug } from "umzug";
import { migrator } from "./config-migrations/migrator";
import { ClientAdmModel } from "../modules/client-adm/repository/client.model";
import { ProductAdmModel } from "../modules/product-adm/repository/product.model";
import { clientsRoute } from "./routes/clients/clients.routes";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import ProductInvoiceModel from "../modules/invoice/repository/product.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import ProductStoreModel from "../modules/store-catalog/repository/product.model";
import ProductCheckoutModel from "../modules/checkout/repository/product.model";
import ClientCheckoutModel from "../modules/checkout/repository/client.model";
import OrderModel from "../modules/checkout/repository/order.model";
import { storeRoute } from "./routes/storeProduct/store.route";

export const app: Express = express();
app.use(express.json());
app.use("/products", productsRoute);
app.use("/invoice", invoiceRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/store", storeRoute);

export let sequelize: Sequelize;
export let migration: Umzug<any>;
async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([
    ClientCheckoutModel,
    ClientAdmModel,
    InvoiceModel,
    ProductInvoiceModel,
    TransactionModel,
    ProductCheckoutModel,
    ProductStoreModel,
    ProductAdmModel,
    OrderModel,
  ]);
  migration = migrator(sequelize);
  // await sequelize.sync();
  await migration.up();
}
setupDb();

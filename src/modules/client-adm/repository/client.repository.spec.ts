import { Sequelize } from "sequelize-typescript";
import { ClientAdmModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ClientAdmModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const clientRepository = new ClientRepository();
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "email",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zipCode: "zipCode",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await clientRepository.add(client);

    const clientDb = await ClientAdmModel.findOne({
      where: {
        id: "1",
      },
    });
    expect(clientDb).toBeDefined();
    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.document).toEqual(client.document);
    expect(clientDb.street).toEqual(client.street);
    expect(clientDb.number).toEqual(client.number);
    expect(clientDb.complement).toEqual(client.complement);
    expect(clientDb.city).toEqual(client.city);
    expect(clientDb.state).toEqual(client.state);
    expect(clientDb.zipCode).toEqual(client.zipCode);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  });

  it("should find a client", async () => {
    const client = await ClientAdmModel.create({
      id: "1",
      name: "Client 1",
      email: "email",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zipCode: "zipCode",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientRepository();
    const result = await clientRepository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.street).toEqual(client.street);
    expect(result.number).toEqual(client.number);
    expect(result.complement).toEqual(client.complement);
    expect(result.city).toEqual(client.city);
    expect(result.state).toEqual(client.state);
    expect(result.zipCode).toEqual(client.zipCode);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});

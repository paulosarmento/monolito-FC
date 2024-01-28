import { Sequelize } from "sequelize-typescript";
import { ClientAdmModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("ClientAdmFacade test", () => {
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
  it("Should create a client", async () => {
    const clientRepository = new ClientRepository();
    const addUseCase = new AddClientUseCase(clientRepository);
    const facade = new ClientAdmFacade({
      addUseCase: addUseCase,
      findUseCase: undefined,
    });

    const input = {
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
    };
    await facade.add(input);
    const client = await ClientAdmModel.findOne({ where: { id: "1" } });
    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.document).toBe(input.document);
    expect(client.street).toBe(input.street);
    expect(client.number).toBe(input.number);
    expect(client.complement).toBe(input.complement);
    expect(client.city).toBe(input.city);
    expect(client.state).toBe(input.state);
    expect(client.zipCode).toBe(input.zipCode);
  });

  it("Should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();
    const input = {
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
    };
    await facade.add(input);
    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.document).toBe(input.document);
    expect(client.street).toBe(input.street);
    expect(client.number).toBe(input.number);
    expect(client.complement).toBe(input.complement);
    expect(client.city).toBe(input.city);
    expect(client.state).toBe(input.state);
    expect(client.zipCode).toBe(input.zipCode);
  });
});

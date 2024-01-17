import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
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
    await sequelize.addModels([ClientModel]);
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
      address: "address",
    };
    await facade.add(input);
    const client = await ClientModel.findOne({ where: { id: "1" } });
    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });

  it("Should find a client", async () => {
    // const clientRepository = new ClientRepository();
    // const findUseCase = new FindClientUseCase(clientRepository);
    // const addUseCase = new AddClientUseCase(clientRepository);

    // const facade = new ClientAdmFacade({
    //   addUseCase: addUseCase,
    //   findUseCase: findUseCase,
    // });
    const facade = ClientAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Client 1",
      email: "email",
      address: "address",
    };
    await facade.add(input);
    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });
});

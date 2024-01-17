import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

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
});

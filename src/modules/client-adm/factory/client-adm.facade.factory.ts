import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const clientRepository = new ClientRepository();
    const findUseCase = new FindClientUseCase(clientRepository);
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const facade = new ClientAdmFacade({
      addUseCase: addClientUseCase,
      findUseCase: findUseCase,
    });
    return facade;
  }
}

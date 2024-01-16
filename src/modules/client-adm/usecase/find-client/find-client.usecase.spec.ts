import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "email",
  address: "address",
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe("Find Client Usecase unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();
    const useCase = new FindClientUseCase(clientRepository);

    const input = {
      id: "1",
    };

    const result = await useCase.execute(input);

    expect(clientRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(input.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
    expect(result.createdAt).toBe(client.createdAt);
    expect(result.updatedAt).toBe(client.updatedAt);
  });
});

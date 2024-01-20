import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

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
    expect(result.document).toBe(client.document);
    expect(result.street).toBe(client.street);
    expect(result.number).toBe(client.number);
    expect(result.complement).toBe(client.complement);
    expect(result.city).toBe(client.city);
    expect(result.state).toBe(client.state);
    expect(result.zipCode).toBe(client.zipCode);
    expect(result.createdAt).toBe(client.createdAt);
    expect(result.updatedAt).toBe(client.updatedAt);
  });
});

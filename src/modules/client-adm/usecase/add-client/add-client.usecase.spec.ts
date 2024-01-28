import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    addClient: jest.fn(),
    find: jest.fn(),
  };
};

describe("AddClientUseCase unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();
    const useCase = new AddClientUseCase(clientRepository);

    const input = {
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

    const result = await useCase.execute(input);
    expect(clientRepository.addClient).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
  });
});

import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("AddClientUsecase unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();
    const useCase = new AddClientUseCase(clientRepository);

    const input = {
      name: "Client 1",
      email: "email",
      address: "address",
    };

    const result = await useCase.execute(input);
    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address).toBe(input.address);
  });
});

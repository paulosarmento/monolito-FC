import PlaceOrderUseCase from "./place-order.usecase";
import { PlaceOrderInputDto } from "./prace-order.dto";

describe("PlaceOrderUseCase unit test", () => {
  describe("execute method", () => {
    it("Should throw an error when client not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockReturnValue(null),
      };
      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      };
      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        "Client not found"
      );
    });
  });
});

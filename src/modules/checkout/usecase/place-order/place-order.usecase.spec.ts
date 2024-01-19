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

    it("Should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockReturnValue(true),
      };
      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();

      const mockValidateProducts = jest
        //@ts-expect-error - Spy on private method
        .spyOn(placeOrderUseCase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };
      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        "No products selected"
      );
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });
  });
});

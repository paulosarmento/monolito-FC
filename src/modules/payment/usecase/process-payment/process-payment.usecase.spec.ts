import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};
const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
});
const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
  };
};
describe("Transaction usecase unit test", () => {
  it("should approve a transaction", async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      amount: 100,
      orderId: "1",
    };
    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(transaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(input.amount);
    expect(result.orderId).toBe(input.orderId);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });
  it("Should decline a transaction", async () => {
    const paymentRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      amount: 50,
      orderId: "1",
    };

    const result = await usecase.execute(input);
    expect(result.transactionId).toBe(transaction2.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(input.amount);
    expect(result.orderId).toBe(input.orderId);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });
});

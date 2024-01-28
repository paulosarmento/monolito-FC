import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import {
  PlaceOrderFacadeInputDto,
  PlaceOrderFacadeOutputDto,
} from "./checkout.facade.dto";
import CheckoutFacadeInterface from "./checkout.facade.interface";

export interface UseCaseProps {
  placeOrderUseCase: PlaceOrderUseCase;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
  private _placeOrderUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCaseProps) {
    this._placeOrderUseCase = usecasesProps.placeOrderUseCase;
  }
  async placeOrder(
    input: PlaceOrderFacadeInputDto
  ): Promise<PlaceOrderFacadeOutputDto> {
    return await this._placeOrderUseCase.execute(input);
  }
}

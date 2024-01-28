import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  PlaceOrderFacadeInputDto,
  PlaceOrderFacadeOutputDto,
} from "./checkout.facade.dto";
import CheckoutFacadeInterface from "./checkout.facade.interface";

export interface UseCaseProps {
  placeOrderUseCase: UseCaseInterface;
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

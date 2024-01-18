import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./prace-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  constructor() {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    //buscar o cliente. Caso nao encontre => Client not found
    // validar produto
    // recuperar os produtos

    // criar o objeto do cliente
    // criar o objeto da order (client, products  )

    // processpayment -> paymentfacade.process (orderId, amount)

    // caso o pagamento seja aprovado. -> Gerar invoice
    // mudar o status da minha order para approved
    // retornar dto

    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [],
    };
  }
}

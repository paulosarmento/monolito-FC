import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFacadeFactory {
  // Entender melhor essa parte
  static create() {
    const clientFactory = ClientAdmFacadeFactory.create();
    const productFactory = ProductAdmFacadeFactory.create();
    const catalogFactory = StoreCatalogFacadeFactory.create();
    const checkoutRepository = new CheckoutRepository();
    const invoiceRepository = InvoiceFacadeFactory.create();
    const paymentFactory = PaymentFacadeFactory.create();

    const placeOrderUseCase = new PlaceOrderUseCase(
      clientFactory,
      productFactory,
      catalogFactory,
      checkoutRepository,
      invoiceRepository,
      paymentFactory
    );

    const checkoutFacade = new CheckoutFacade({
      placeOrderUseCase: placeOrderUseCase,
    });

    return checkoutFacade;
  }
}

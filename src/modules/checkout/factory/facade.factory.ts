import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import OrderRepository from "../repository/order.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFacadeFactory {
  static create() {
    const clientFactory = ClientAdmFacadeFactory.create();
    const catalogFactory = StoreCatalogFacadeFactory.create();
    const productFactory = ProductAdmFacadeFactory.create();
    const checkoutRepository = new OrderRepository();
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

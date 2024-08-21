import { cart } from "../../data/cart.js";
import { getDeliveryoptions } from "../../data/deliveryOptions.js";
import { getProducts } from "../../data/products.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let deliveryDayscharges = 0;
  cart.forEach((cartItem) => {
    const product = getProducts(cartItem.productid);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryoptions(cartItem.deliveryOptionId);
    console.log(deliveryOption.priceCents);
    deliveryDayscharges += deliveryOption.priceCents;
  });
  console.log(productPriceCents);
  console.log(deliveryDayscharges);
  console.log(deliveryDayscharges + productPriceCents);
  const totalBeforeTaxCents = deliveryDayscharges + productPriceCents;
  const totalAftreTax = (totalBeforeTaxCents * 10) / 100;
  const finalPrice = totalBeforeTaxCents + totalAftreTax;
  console.log(finalPrice);

  document.querySelector(
    ".payment-summary"
  ).innerHTML = `<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${(
              productPriceCents / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${(
              deliveryDayscharges / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(
              totalBeforeTaxCents / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(totalAftreTax / 100).toFixed(
              2
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(finalPrice / 100).toFixed(
              2
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
}

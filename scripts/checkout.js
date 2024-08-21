import { cart, deletFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { centsToDollar } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

hello();
var today = dayjs();
today.add(7, "days");
console.log(today.format("dddd,MMMM D"));

function renderOrderSummary() {
  let cartSummary = "";

  function deliveryDate(cartItem) {
    let del = 0;
    deliveryOptions.map((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        del = option.deliveryDays;
      }
    });
    return del;
  }

  cart.forEach((cartItem) => {
    const productId = cartItem.productid;
    console.log(productId);
    let matchedProduct;
    products.forEach((product) => {
      if (productId === product.id) {
        matchedProduct = product;
      }
    });
    console.log(matchedProduct);
    const today = dayjs();
    const day = deliveryDate(cartItem);
    console.log(day);
    const deliverydate = today.add(day, "days");
    const dateString = deliverydate.format("dddd,MMMM D");

    cartSummary += `
    <div class="cart-item-container js-cart-item-${cartItem.productid}">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src=${matchedProduct.image}
        />

        <div class="cart-item-details">
          <div class="product-name">
           ${matchedProduct.name}
          </div>
          <div class="product-price">$${centsToDollar(
            matchedProduct.priceCents
          )}</div>
          <div class="product-quantity">
            <span>
           
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary js-delete-from-cart" data-product-id=${
              matchedProduct.id
            }>Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option: </div>
          ${deliveryOptionsHtml(matchedProduct, cartItem)}       

          
        </div>
      </div>
    </div>`;
  });
  document.querySelector(".js-order-summary").innerHTML = cartSummary;

  function deliveryOptionsHtml(matchedProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((option) => {
      console.log(option.priceCents);
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd,MMMM D");
      const priceString =
        option.priceCents === 0
          ? "Free"
          : `${centsToDollar(+option.priceCents)}`;
      const isChecked = option.id === cartItem.deliveryOptionId;

      html += `<div class="delivery-option js-delivery-option" data-product-id="${
        matchedProduct.id
      }" data-delivery-option-id="${option.id}">
            <input
              type="radio"
            ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${matchedProduct.id}"
            />
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString}</div>
            </div>
          </div>`;
    });
    return html;
  }

  const deleteOption = document.querySelectorAll(".js-delete-from-cart");
  deleteOption.forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      deletFromCart(productId);
      const matcheCartItem = document.querySelector(
        `.js-cart-item-${productId}`
      );
      matcheCartItem.remove();
      renderOrderSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      console.log(option.dataset);
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();

import { cart, addTocart } from "../data/cart.js ";
import { products } from "../data/products.js";

const productContainer = document.querySelector(".js-products-grid");

let productHtml = "";
products.forEach((item) => {
  productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src=${item.image}
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              item.rating.count
            }</div>
          </div>

          <div class="product-price">$ ${(item.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="is-quantity-selctor-${item.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart product-${item.id}" >
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button  class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            item.id
          }" data-wel="hai">Add to Cart</button>
        </div>
`;
});
productContainer.innerHTML = productHtml;

let total = {};
let timeout = {};
products.forEach((item) => {
  document
    .querySelector(`.is-quantity-selctor-${item.id}`)
    .addEventListener("change", (e) => {
      total.productId = item.id;
      total.value = +e.target.value;
    });
});

function totalProductsinCart() {
  let totalQuantity = cart.reduce((total, product) => {
    return (total += product.quantity);
  }, 0);
  return totalQuantity;
}

function addedCheckButton(productid) {
  document
    .querySelector(`.product-${productid}`)
    .classList.add("js-added-to-cart-check");

  timeout.productid = setTimeout(() => {
    document
      .querySelector(`.product-${productid}`)
      .classList.remove("js-added-to-cart-check");
  }, 3000);

  if (timeout[productid]) {
    clearTimeout(timeout[productid]);
  }
}
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.dataset.productId);

    const productid = button.dataset.productId;
    addTocart(productid, total);
    const totalProducts = totalProductsinCart();
    document.querySelector(".js-cart-quantity").innerHTML = totalProducts;
    addedCheckButton(productid);
    console.log(cart);
    console.log(totalProducts);
  });
});
